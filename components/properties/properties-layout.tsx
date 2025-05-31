"use client"

import { useState, useEffect } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { PropertyCategoryFilter } from "@/components/properties/property-category-filter"
import { PropertyGrid } from "@/components/properties/property-grid"
import { PropertyFilters } from "@/components/properties/property-filters"
import { properties as allProperties } from "@/data/properties"
import { Filter, X, Calendar, Users, MapPin, Search, Settings } from "lucide-react"
import { parseISO, isValid } from "date-fns"
import { Button } from "@/components/ui/button"

interface GuestCounts {
  adults: number
  children: number
  infants: number
}

interface SearchParams {
  location: string
  checkIn: string
  checkOut: string
  guests: number
  guestDetails?: GuestCounts
  isFlexibleDates?: boolean
  flexibleOption?: string | null
}

export function PropertiesLayout() {
  const [searchParams, setSearchParams] = useState<SearchParams>({
    location: "",
    checkIn: "",
    checkOut: "",
    guests: 0,
    guestDetails: {
      adults: 1,
      children: 0,
      infants: 0,
    },
    isFlexibleDates: false,
    flexibleOption: null,
  })

  const [activeCategory, setActiveCategory] = useState("all")
  const [showFilters, setShowFilters] = useState(false)
  const [filteredProperties, setFilteredProperties] = useState(allProperties)
  const [priceRange, setPriceRange] = useState({ min: 0, max: 1000000 })
  const [selectedPropertyTypes, setSelectedPropertyTypes] = useState<string[]>([])
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([])
  const [activeFiltersCount, setActiveFiltersCount] = useState(0)
  const [isMobileView, setIsMobileView] = useState(false)
  const [searchHistory, setSearchHistory] = useState<SearchParams[]>([])
  const [showMap, setShowMap] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [selectedBeds, setSelectedBeds] = useState("")
  const [selectedBaths, setSelectedBaths] = useState("")
  const [scrollPosition, setScrollPosition] = useState(0)
  const [activeField, setActiveField] = useState<"dates" | "guests" | null>(null)

  // Check if mobile view
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobileView(window.innerWidth < 768)
    }

    checkIfMobile()
    window.addEventListener("resize", checkIfMobile)

    return () => {
      window.removeEventListener("resize", checkIfMobile)
    }
  }, [])

  // Load search history from localStorage on mount
  useEffect(() => {
    const savedHistory = localStorage.getItem("propertySearchHistory")
    if (savedHistory) {
      try {
        setSearchHistory(JSON.parse(savedHistory))
      } catch (e) {
        console.error("Error parsing search history:", e)
      }
    }
  }, [])

  // Save search to history
  const saveToSearchHistory = (params: SearchParams) => {
    // Only save if there's a location or dates
    if (params.location || params.checkIn || params.guests > 0) {
      const newHistory = [
        params,
        ...searchHistory
          .filter(
            (item) =>
              item.location !== params.location || item.checkIn !== params.checkIn || item.checkOut !== params.checkOut,
          )
          .slice(0, 4),
      ]
      setSearchHistory(newHistory)
      localStorage.setItem("propertySearchHistory", JSON.stringify(newHistory))
    }
  }

  // Apply filters whenever search params, category, or other filters change
  useEffect(() => {
    setIsLoading(true)

    // Use setTimeout to simulate loading for better UX
    const timer = setTimeout(() => {
      let result = [...allProperties]

      // Filter by search location
      if (searchParams.location) {
        const searchTerm = searchParams.location.toLowerCase()
        result = result.filter(
          (property) =>
            property.title.toLowerCase().includes(searchTerm) || property.location.toLowerCase().includes(searchTerm),
        )
      }

      // Filter by date range if both dates are provided
      if (searchParams.checkIn && searchParams.checkOut) {
        try {
          const checkInDate = parseISO(searchParams.checkIn)
          const checkOutDate = parseISO(searchParams.checkOut)

          if (isValid(checkInDate) && isValid(checkOutDate)) {
            // Filter properties that are available during the selected date range
            // This is a simplified example - in a real app, you'd check against actual booking data
            result = result.filter((property) => {
              // For this example, we'll just assume all properties are available
              // In a real app, you'd check against the property's availability calendar
              return property.available !== false
            })
          }
        } catch (e) {
          console.error("Error parsing dates:", e)
        }
      }

      // Filter by guest count
      if (searchParams.guests > 0) {
        result = result.filter((property) => property.maxGuests >= searchParams.guests)
      }

      // Filter by category
      if (activeCategory !== "all") {
        result = result.filter((property) => property.categories.includes(activeCategory))
      }

      // Filter by price range
      result = result.filter((property) => property.price >= priceRange.min && property.price <= priceRange.max)

      // Filter by property types
      if (selectedPropertyTypes.length > 0) {
        result = result.filter((property) => selectedPropertyTypes.includes(property.type))
      }

      // Filter by amenities
      if (selectedAmenities.length > 0) {
        result = result.filter((property) => selectedAmenities.every((amenity) => property.amenities.includes(amenity)))
      }

      // Filter by beds
      if (selectedBeds) {
        const bedsCount = selectedBeds === "5+" ? 5 : Number.parseInt(selectedBeds)
        result = result.filter((property) => property.beds >= bedsCount)
      }

      // Filter by baths
      if (selectedBaths) {
        const bathsCount = selectedBaths === "5+" ? 5 : Number.parseInt(selectedBaths)
        result = result.filter((property) => property.baths >= bathsCount)
      }

      setFilteredProperties(result)
      setIsLoading(false)

      // Count active filters
      let count = 0
      if (priceRange.min > 0 || priceRange.max < 1000000) count++
      if (selectedPropertyTypes.length > 0) count++
      if (selectedAmenities.length > 0) count++
      if (selectedBeds) count++
      if (selectedBaths) count++
      setActiveFiltersCount(count)
    }, 500) // 500ms delay for loading effect

    return () => clearTimeout(timer)
  }, [searchParams, activeCategory, priceRange, selectedPropertyTypes, selectedAmenities, selectedBeds, selectedBaths])

  const handleSearch = (params: SearchParams) => {
    setSearchParams(params)
    saveToSearchHistory(params)
  }

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category)
  }

  const handleFilterChange = (filters: any) => {
    setPriceRange(filters.priceRange)
    setSelectedPropertyTypes(filters.propertyTypes || [])
    setSelectedAmenities(filters.amenities || [])
    setSelectedBeds(filters.beds || "")
    setSelectedBaths(filters.baths || "")
    setShowFilters(false)
  }

  const toggleFilters = () => {
    setShowFilters(!showFilters)
  }

  const toggleMap = () => {
    setShowMap(!showMap)
  }

  // Clear a specific search filter
  const clearSearchFilter = (filterType: keyof SearchParams) => {
    if (filterType === "location") {
      setSearchParams({ ...searchParams, location: "" })
    } else if (filterType === "checkIn" || filterType === "checkOut") {
      setSearchParams({ ...searchParams, checkIn: "", checkOut: "", isFlexibleDates: false, flexibleOption: null })
    } else if (filterType === "guests") {
      setSearchParams({
        ...searchParams,
        guests: 0,
        guestDetails: { adults: 1, children: 0, infants: 0 },
      })
    }
  }

  // Format date for display
  const formatDate = (dateString: string) => {
    if (!dateString) return ""
    try {
      const date = parseISO(dateString)
      if (!isValid(date)) return ""
      return new Date(dateString).toLocaleDateString("en-US", { month: "short", day: "numeric" })
    } catch (e) {
      return ""
    }
  }

  // Clear all filters
  const clearAllFilters = () => {
    setSearchParams({
      location: "",
      checkIn: "",
      checkOut: "",
      guests: 0,
      guestDetails: {
        adults: 1,
        children: 0,
        infants: 0,
      },
      isFlexibleDates: false,
      flexibleOption: null,
    })
    setActiveCategory("all")
    setPriceRange({ min: 0, max: 1000000 })
    setSelectedPropertyTypes([])
    setSelectedAmenities([])
    setSelectedBeds("")
    setSelectedBaths("")
  }

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Navbar />
      <main className="flex-1 pt-20">
        {/* Search header - fixed at top */}
        <div className="sticky top-20 z-30 backdrop-blur-md bg-white/80 py-4 sm:py-6 rounded-2xl mx-3 sm:mx-6 lg:mx-8 my-2 shadow-sm">
          <div className="container mx-auto px-4">
            {/* Fully responsive search bar with filters button beside it */}
            <div className="relative w-full max-w-3xl mx-auto flex flex-row items-center gap-2 sm:gap-3">
              <div className="relative rounded-full overflow-hidden flex-grow min-w-0">
                <input
                  type="text"
                  placeholder="Search properties..."
                  className="w-full py-2 sm:py-3 pl-3 sm:pl-6 pr-10 sm:pr-14 bg-white border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-hovmart-purple/30 text-xs sm:text-sm text-gray-700"
                  value={searchParams.location}
                  onChange={(e) => setSearchParams({ ...searchParams, location: e.target.value })}
                  onKeyDown={(e) => e.key === "Enter" && handleSearch(searchParams)}
                />
                <button
                  className="absolute right-1.5 sm:right-2 top-1/2 transform -translate-y-1/2 bg-hovmart-purple text-white p-1.5 sm:p-3 rounded-full hover:bg-hovmart-purple/90 transition-all duration-300"
                  onClick={() => handleSearch(searchParams)}
                  aria-label="Search properties"
                >
                  <Search className="h-3 w-3 sm:h-5 sm:w-5" />
                </button>
              </div>

              {/* Filters button - now beside search bar on desktop */}
              <button
                className="px-3 py-2 sm:px-4 sm:py-3 bg-white rounded-full text-sm border border-gray-200 hover:border-hovmart-purple/50 transition-colors flex items-center justify-center gap-1 w-auto flex-shrink-0"
                onClick={() => setShowFilters(true)}
              >
                <Filter className="h-3.5 w-3.5 text-hovmart-purple" />
                <span>Filters</span>
                {activeFiltersCount > 0 && (
                  <span className="ml-1 bg-hovmart-purple text-white text-xs w-4 h-4 rounded-full flex items-center justify-center">
                    {activeFiltersCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Category filter */}
        <div className="border-b border-gray-200 pb-4">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-gray-700">Categories</h3>
              {/* Admin controls - This would typically check if user is admin */}
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="text-xs h-8"
                  onClick={() => (window.location.href = "/admin/properties/categories")}
                >
                  <Settings className="h-3 w-3 mr-1" />
                  Manage Categories
                </Button>
              </div>
            </div>
            <PropertyCategoryFilter
              activeCategory={activeCategory}
              onCategoryChange={handleCategoryChange}
              isAdmin={true} // This would typically be determined by auth check
            />
          </div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {/* Active Search Filters Summary */}
          {(searchParams.location || searchParams.checkIn || searchParams.guests > 0 || activeFiltersCount > 0) && (
            <div className="flex flex-wrap gap-2 my-4">
              {searchParams.location && (
                <div className="bg-white rounded-full px-3 py-1.5 text-sm flex items-center shadow-sm border border-gray-100">
                  <MapPin className="h-3.5 w-3.5 text-hovmart-purple mr-1.5" />
                  <span className="mr-2">{searchParams.location}</span>
                  <button
                    onClick={() => clearSearchFilter("location")}
                    className="text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                </div>
              )}

              {searchParams.checkIn && searchParams.checkOut && (
                <div className="bg-white rounded-full px-3 py-1.5 text-sm flex items-center shadow-sm border border-gray-100">
                  <Calendar className="h-3.5 w-3.5 text-hovmart-purple mr-1.5" />
                  <span className="mr-2">
                    {searchParams.isFlexibleDates
                      ? `Flexible: ${searchParams.flexibleOption}`
                      : `${formatDate(searchParams.checkIn)} - ${formatDate(searchParams.checkOut)}`}
                  </span>
                  <button
                    onClick={() => clearSearchFilter("checkIn")}
                    className="text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                </div>
              )}

              {searchParams.guests > 0 && (
                <div className="bg-white rounded-full px-3 py-1.5 text-sm flex items-center shadow-sm border border-gray-100">
                  <Users className="h-3.5 w-3.5 text-hovmart-purple mr-1.5" />
                  <span className="mr-2">{`${searchParams.guests} ${
                    searchParams.guests === 1 ? "guest" : "guests"
                  }`}</span>
                  <button
                    onClick={() => clearSearchFilter("guests")}
                    className="text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                </div>
              )}

              {activeFiltersCount > 0 && (
                <div className="bg-white rounded-full px-3 py-1.5 text-sm flex items-center shadow-sm border border-gray-100">
                  <Filter className="h-3.5 w-3.5 text-hovmart-purple mr-1.5" />
                  <span className="mr-2">{`${activeFiltersCount} filter${activeFiltersCount !== 1 ? "s" : ""}`}</span>
                  <button onClick={clearAllFilters} className="text-gray-400 hover:text-gray-600 transition-colors">
                    <X className="h-3.5 w-3.5" />
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Filters Header */}
          <div className="flex justify-between items-center my-6">
            <h1 className="text-xl font-semibold text-gray-900">
              {filteredProperties.length} {filteredProperties.length === 1 ? "Property" : "Properties"} Available
            </h1>
            <div className="flex items-center gap-2">
              <button
                onClick={toggleFilters}
                className="flex items-center gap-2 px-4 py-2 rounded-full border border-gray-200 text-sm font-medium hover:border-hovmart-purple/50 transition-colors relative shadow-sm bg-white"
              >
                <Filter className="h-4 w-4 text-hovmart-purple" />
                <span>Filters</span>
                {activeFiltersCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-hovmart-purple text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                    {activeFiltersCount}
                  </span>
                )}
              </button>
            </div>
          </div>

          {/* Mobile Filters (Full Screen) */}
          {isMobileView && showFilters && (
            <div className="fixed inset-0 bg-white z-50 overflow-y-auto scroll-smooth">
              <div className="sticky top-0 bg-white p-4 border-b border-gray-200 flex items-center justify-between">
                <h2 className="text-lg font-semibold">Filters</h2>
                <button onClick={() => setShowFilters(false)} className="p-2 rounded-full hover:bg-gray-100">
                  <X className="h-5 w-5" />
                </button>
              </div>
              <div className="p-4">
                <PropertyFilters
                  onClose={() => setShowFilters(false)}
                  onApplyFilters={handleFilterChange}
                  initialPriceRange={priceRange}
                  initialPropertyTypes={selectedPropertyTypes}
                  initialAmenities={selectedAmenities}
                  totalProperties={filteredProperties.length}
                />
              </div>
            </div>
          )}

          {/* Desktop Filters */}
          {!isMobileView && showFilters && (
            <PropertyFilters
              onClose={() => setShowFilters(false)}
              onApplyFilters={handleFilterChange}
              initialPriceRange={priceRange}
              initialPropertyTypes={selectedPropertyTypes}
              initialAmenities={selectedAmenities}
              totalProperties={filteredProperties.length}
            />
          )}

          <PropertyGrid properties={filteredProperties} isLoading={isLoading} />
        </div>
      </main>
      <Footer />
    </div>
  )
}
