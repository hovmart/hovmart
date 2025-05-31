"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { sampleProperties } from "./property-grid-data"
import { Search, Filter, Star, Heart, MapPin, Bed, Bath, Users, ChevronDown, Grid, List } from "lucide-react"

export function PropertyListingView() {
  const router = useRouter()
  const [properties, setProperties] = useState(sampleProperties)
  const [filteredProperties, setFilteredProperties] = useState(sampleProperties)
  const [searchQuery, setSearchQuery] = useState("")
  const [viewType, setViewType] = useState<"grid" | "list">("grid")
  const [showFilters, setShowFilters] = useState(false)
  const [favorites, setFavorites] = useState<number[]>([])
  const [sortBy, setSortBy] = useState<string>("featured")
  const [showSortOptions, setShowSortOptions] = useState(false)
  const [activeSection, setActiveSection] = useState<string>("header")
  const [isScrolling, setIsScrolling] = useState(false)

  // Refs for scroll animations
  const sectionRefs = useRef<{ [key: string]: HTMLElement | null }>({
    header: null,
    filters: null,
    properties: null,
  })
  const scrollProgressRef = useRef<HTMLDivElement | null>(null)
  const scrollToTopRef = useRef<HTMLButtonElement | null>(null)
  const observerRef = useRef<IntersectionObserver | null>(null)

  // Filter states
  const [filters, setFilters] = useState({
    propertyType: [] as string[],
    minPrice: "",
    maxPrice: "",
    beds: "",
    baths: "",
    location: [] as string[],
  })

  // Get unique locations for filter
  const locations = Array.from(new Set(properties.map((p) => p.location)))

  // Get unique property types for filter
  const propertyTypes = Array.from(new Set(properties.map((p) => p.type)))

  // Initialize intersection observer for scroll animations
  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Set active section for scroll indicator
            const id = entry.target.id
            if (id) {
              setActiveSection(id)
            }

            // Add visible class for animations
            entry.target.classList.add("visible")

            // For property items, add visible class to all children with animation classes
            if (entry.target.classList.contains("property-container")) {
              const animatedElements = entry.target.querySelectorAll(".property-detail-animation, .amenity-item")
              animatedElements.forEach((el, index) => {
                setTimeout(() => {
                  el.classList.add("visible")
                }, index * 100) // Staggered animation
              })
            }
          }
        })
      },
      { threshold: 0.2, rootMargin: "-100px 0px" },
    )

    // Get scroll progress element
    scrollProgressRef.current = document.getElementById("scroll-progress") as HTMLDivElement
    scrollToTopRef.current = document.getElementById("scroll-to-top") as HTMLButtonElement

    // Observe sections
    Object.values(sectionRefs.current).forEach((ref) => {
      if (ref && observerRef.current) {
        observerRef.current.observe(ref)
      }
    })

    // Add scroll event listener
    const handleScroll = () => {
      if (!isScrolling) {
        setIsScrolling(true)
        window.requestAnimationFrame(() => {
          // Update scroll progress
          if (scrollProgressRef.current) {
            const scrollTop = document.documentElement.scrollTop || document.body.scrollTop
            const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight
            const scrollPercentage = (scrollTop / scrollHeight) * 100
            scrollProgressRef.current.style.width = `${scrollPercentage}%`
          }

          // Show/hide scroll to top button
          if (scrollToTopRef.current) {
            if (document.documentElement.scrollTop > 300) {
              scrollToTopRef.current.classList.add("visible")
            } else {
              scrollToTopRef.current.classList.remove("visible")
            }
          }

          setIsScrolling(false)
        })
      }
    }

    window.addEventListener("scroll", handleScroll)

    // Add click event to scroll to top button
    if (scrollToTopRef.current) {
      scrollToTopRef.current.addEventListener("click", () => {
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        })
      })
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect()
      }
      window.removeEventListener("scroll", handleScroll)
    }
  }, [isScrolling])

  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
  }

  // Toggle property in favorites
  const toggleFavorite = (e: React.MouseEvent, id: number) => {
    e.preventDefault()
    e.stopPropagation()
    setFavorites((prev) => (prev.includes(id) ? prev.filter((favId) => favId !== id) : [...prev, id]))
  }

  // Handle filter changes
  const handleFilterChange = (filterType: keyof typeof filters, value: string | string[]) => {
    setFilters((prev) => ({
      ...prev,
      [filterType]: value,
    }))
  }

  // Toggle property type in filter
  const togglePropertyType = (type: string) => {
    setFilters((prev) => ({
      ...prev,
      propertyType: prev.propertyType.includes(type)
        ? prev.propertyType.filter((t) => t !== type)
        : [...prev.propertyType, type],
    }))
  }

  // Toggle location in filter
  const toggleLocation = (location: string) => {
    setFilters((prev) => ({
      ...prev,
      location: prev.location.includes(location)
        ? prev.location.filter((l) => l !== location)
        : [...prev.location, location],
    }))
  }

  // Clear all filters
  const clearFilters = () => {
    setFilters({
      propertyType: [],
      minPrice: "",
      maxPrice: "",
      beds: "",
      baths: "",
      location: [],
    })
    setSearchQuery("")
  }

  // Navigate to property detail page
  const viewProperty = (id: number) => {
    router.push(`/properties/view/${id}`)
  }

  // Apply filters and search
  useEffect(() => {
    let result = [...properties]

    // Apply search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      result = result.filter(
        (property) =>
          property.title.toLowerCase().includes(query) ||
          property.location.toLowerCase().includes(query) ||
          property.type.toLowerCase().includes(query),
      )
    }

    // Apply property type filter
    if (filters.propertyType.length > 0) {
      result = result.filter((property) => filters.propertyType.includes(property.type))
    }

    // Apply location filter
    if (filters.location.length > 0) {
      result = result.filter((property) => filters.location.includes(property.location))
    }

    // Apply price filters
    if (filters.minPrice) {
      result = result.filter((property) => property.price >= Number.parseInt(filters.minPrice))
    }

    if (filters.maxPrice) {
      result = result.filter((property) => property.price <= Number.parseInt(filters.maxPrice))
    }

    // Apply beds filter
    if (filters.beds) {
      result = result.filter((property) => property.beds >= Number.parseInt(filters.beds))
    }

    // Apply baths filter
    if (filters.baths) {
      result = result.filter((property) => property.baths >= Number.parseInt(filters.baths))
    }

    // Apply sorting
    switch (sortBy) {
      case "price-low":
        result.sort((a, b) => a.price - b.price)
        break
      case "price-high":
        result.sort((a, b) => b.price - a.price)
        break
      case "rating":
        result.sort((a, b) => b.rating - a.rating)
        break
      case "featured":
        result.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0))
        break
      default:
        break
    }

    setFilteredProperties(result)
  }, [searchQuery, filters, sortBy, properties])

  // Format price
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      maximumFractionDigits: 0,
    }).format(price)
  }

  // Scroll to section
  const scrollToSection = (sectionId: string) => {
    const section = sectionRefs.current[sectionId]
    if (section) {
      section.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Scroll Indicator */}
      <div className="scroll-indicator hidden lg:flex">
        {Object.keys(sectionRefs.current).map((section) => (
          <button
            key={section}
            className={`scroll-indicator-dot ${activeSection === section ? "active" : ""}`}
            onClick={() => scrollToSection(section)}
            aria-label={`Scroll to ${section}`}
          />
        ))}
      </div>

      {/* Page Header */}
      <div id="header" ref={(el) => (sectionRefs.current.header = el)} className="mb-8 reveal-section visible">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">All Properties</h1>
        <p className="text-gray-600">Browse our collection of {properties.length} premium properties</p>
      </div>

      {/* Search and Filters Bar */}
      <div
        id="filters"
        ref={(el) => (sectionRefs.current.filters = el)}
        className="bg-white/80 backdrop-blur-md rounded-2xl shadow-sm p-4 mb-8 reveal-section visible"
      >
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search Input */}
          <div className="relative flex-grow">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search by location, property type, or name..."
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-hovmart-purple focus:border-hovmart-purple"
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </div>

          {/* Filter Button */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:border-hovmart-purple/50 transition-colors elegant-button"
          >
            <Filter className="h-5 w-5" />
            <span>Filters</span>
          </button>

          {/* Sort Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowSortOptions(!showSortOptions)}
              className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:border-hovmart-purple/50 transition-colors elegant-button"
            >
              <span>Sort By</span>
              <ChevronDown className="h-4 w-4" />
            </button>

            {showSortOptions && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg z-10 py-1 border border-gray-200 modal-transition entered">
                {[
                  { id: "featured", label: "Featured" },
                  { id: "price-low", label: "Price: Low to High" },
                  { id: "price-high", label: "Price: High to Low" },
                  { id: "rating", label: "Top Rated" },
                ].map((option) => (
                  <button
                    key={option.id}
                    className={`w-full text-left px-4 py-2 hover:bg-gray-100 ${
                      sortBy === option.id ? "text-hovmart-purple font-medium" : ""
                    }`}
                    onClick={() => {
                      setSortBy(option.id)
                      setShowSortOptions(false)
                    }}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* View Type Toggle */}
          <div className="flex rounded-lg border border-gray-300 overflow-hidden">
            <button
              className={`px-4 py-2 ${
                viewType === "grid" ? "bg-hovmart-purple text-white" : "bg-white text-gray-700 hover:bg-gray-100"
              }`}
              onClick={() => setViewType("grid")}
              aria-label="Grid view"
            >
              <Grid className="h-4 w-4" />
            </button>
            <button
              className={`px-4 py-2 ${
                viewType === "list" ? "bg-hovmart-purple text-white" : "bg-white text-gray-700 hover:bg-gray-100"
              }`}
              onClick={() => setViewType("list")}
              aria-label="List view"
            >
              <List className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Expanded Filters */}
        {showFilters && (
          <div className="mt-4 pt-4 border-t border-gray-200 animate-in slide-in-from-top duration-200">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Property Type Filter */}
              <div>
                <h3 className="font-medium mb-2">Property Type</h3>
                <div className="flex flex-wrap gap-2">
                  {propertyTypes.map((type) => (
                    <button
                      key={type}
                      onClick={() => togglePropertyType(type)}
                      className={`px-3 py-1.5 rounded-full text-sm ${
                        filters.propertyType.includes(type)
                          ? "bg-hovmart-purple text-white"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      } elegant-button`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Range Filter */}
              <div>
                <h3 className="font-medium mb-2">Price Range</h3>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    placeholder="Min"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    value={filters.minPrice}
                    onChange={(e) => handleFilterChange("minPrice", e.target.value)}
                  />
                  <span>-</span>
                  <input
                    type="number"
                    placeholder="Max"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    value={filters.maxPrice}
                    onChange={(e) => handleFilterChange("maxPrice", e.target.value)}
                  />
                </div>
              </div>

              {/* Beds & Baths Filter */}
              <div>
                <h3 className="font-medium mb-2">Beds & Baths</h3>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-sm text-gray-600">Beds</label>
                    <select
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                      value={filters.beds}
                      onChange={(e) => handleFilterChange("beds", e.target.value)}
                    >
                      <option value="">Any</option>
                      <option value="1">1+</option>
                      <option value="2">2+</option>
                      <option value="3">3+</option>
                      <option value="4">4+</option>
                      <option value="5">5+</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-sm text-gray-600">Baths</label>
                    <select
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                      value={filters.baths}
                      onChange={(e) => handleFilterChange("baths", e.target.value)}
                    >
                      <option value="">Any</option>
                      <option value="1">1+</option>
                      <option value="2">2+</option>
                      <option value="3">3+</option>
                      <option value="4">4+</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Location Filter */}
              <div>
                <h3 className="font-medium mb-2">Location</h3>
                <div className="flex flex-wrap gap-2 max-h-24 overflow-y-auto property-gallery">
                  {locations.map((location) => (
                    <button
                      key={location}
                      onClick={() => toggleLocation(location)}
                      className={`px-3 py-1.5 rounded-full text-sm ${
                        filters.location.includes(location)
                          ? "bg-hovmart-purple text-white"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      } elegant-button`}
                    >
                      {location}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Filter Actions */}
            <div className="flex justify-end mt-4 pt-4 border-t border-gray-200">
              <button
                onClick={clearFilters}
                className="px-4 py-2 text-gray-700 hover:text-hovmart-purple mr-2 elegant-button"
              >
                Clear All
              </button>
              <button
                onClick={() => setShowFilters(false)}
                className="px-6 py-2 bg-hovmart-purple text-white rounded-lg hover:bg-hovmart-light transition-colors elegant-button"
              >
                Apply Filters
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Results Count */}
      <div className="flex justify-between items-center mb-6 reveal-section visible">
        <div className="text-gray-600">
          Showing {filteredProperties.length} of {properties.length} properties
        </div>
      </div>

      {/* No Results Message */}
      {filteredProperties.length === 0 && (
        <div className="text-center py-12 reveal-section visible">
          <div className="inline-flex items-center justify-center p-4 bg-hovmart-purple/10 rounded-full mb-4">
            <MapPin className="h-8 w-8 text-hovmart-purple" />
          </div>
          <h2 className="text-2xl font-bold mb-2">No properties found</h2>
          <p className="text-gray-600 max-w-md mx-auto mb-6">
            We couldn't find any properties matching your criteria. Try adjusting your filters or search query.
          </p>
          <button
            onClick={clearFilters}
            className="px-6 py-3 bg-hovmart-purple text-white rounded-lg hover:bg-hovmart-light transition-colors elegant-button"
          >
            Clear All Filters
          </button>
        </div>
      )}

      {/* Property Grid View */}
      <div id="properties" ref={(el) => (sectionRefs.current.properties = el)} className="property-container">
        {viewType === "grid" && filteredProperties.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProperties.map((property) => (
              <div
                key={property.id}
                className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow cursor-pointer property-card"
                onClick={() => viewProperty(property.id)}
              >
                <div className="relative">
                  <div className="relative aspect-[4/3] overflow-hidden image-gallery">
                    <Image
                      src={property.images[0] || "/placeholder.svg"}
                      alt={property.title}
                      fill
                      className="object-cover property-image"
                    />

                    {/* Favorite Button */}
                    <button
                      onClick={(e) => toggleFavorite(e, property.id)}
                      className="absolute top-3 right-3 p-2 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white transition-colors z-10 interactive-element"
                      aria-label={favorites.includes(property.id) ? "Remove from favorites" : "Add to favorites"}
                    >
                      <Heart
                        className={`h-5 w-5 ${
                          favorites.includes(property.id) ? "fill-hovmart-purple text-hovmart-purple" : "text-gray-600"
                        }`}
                      />
                    </button>

                    {/* Featured Badge */}
                    {property.featured && (
                      <div className="absolute top-3 left-3 px-3 py-1 bg-hovmart-purple text-white text-xs font-medium rounded-full z-10">
                        Featured
                      </div>
                    )}
                  </div>

                  <div className="p-4">
                    <div className="flex justify-between items-start">
                      <h3 className="font-medium text-gray-900 hover:text-hovmart-purple transition-colors line-clamp-1">
                        {property.title}
                      </h3>
                      <div className="flex items-center gap-1 text-sm whitespace-nowrap ml-2">
                        <Star className="h-4 w-4 fill-hovmart-purple text-hovmart-purple flex-shrink-0" />
                        <span>{property.rating}</span>
                      </div>
                    </div>

                    <div className="flex items-center text-gray-600 text-sm mt-1">
                      <MapPin className="h-4 w-4 mr-1 flex-shrink-0" />
                      <span className="line-clamp-1">{property.location}</span>
                    </div>

                    <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
                      {property.beds > 0 && (
                        <div className="flex items-center">
                          <Bed className="h-4 w-4 mr-1" />
                          <span>{property.beds}</span>
                        </div>
                      )}
                      {property.baths > 0 && (
                        <div className="flex items-center">
                          <Bath className="h-4 w-4 mr-1" />
                          <span>{property.baths}</span>
                        </div>
                      )}
                      <div className="flex items-center">
                        <Users className="h-4 w-4 mr-1" />
                        <span>{property.maxGuests}</span>
                      </div>
                    </div>

                    <div className="mt-3 flex items-baseline">
                      <span className="text-lg font-semibold text-gray-900">₦{property.price.toLocaleString()}</span>
                      <span className="text-gray-600 text-sm ml-1">/ night</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Property List View */}
        {viewType === "list" && filteredProperties.length > 0 && (
          <div className="space-y-6">
            {filteredProperties.map((property) => (
              <div
                key={property.id}
                className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow cursor-pointer property-card"
                onClick={() => viewProperty(property.id)}
              >
                <div className="flex flex-col md:flex-row">
                  <div className="relative md:w-1/3 aspect-[4/3] md:aspect-auto image-gallery">
                    <Image
                      src={property.images[0] || "/placeholder.svg"}
                      alt={property.title}
                      fill
                      className="object-cover property-image"
                    />

                    {/* Favorite Button */}
                    <button
                      onClick={(e) => toggleFavorite(e, property.id)}
                      className="absolute top-3 right-3 p-2 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white transition-colors z-10 interactive-element"
                      aria-label={favorites.includes(property.id) ? "Remove from favorites" : "Add to favorites"}
                    >
                      <Heart
                        className={`h-5 w-5 ${
                          favorites.includes(property.id) ? "fill-hovmart-purple text-hovmart-purple" : "text-gray-600"
                        }`}
                      />
                    </button>

                    {/* Featured Badge */}
                    {property.featured && (
                      <div className="absolute top-3 left-3 px-3 py-1 bg-hovmart-purple text-white text-xs font-medium rounded-full z-10">
                        Featured
                      </div>
                    )}
                  </div>

                  <div className="p-4 md:p-6 md:w-2/3">
                    <div className="flex justify-between items-start">
                      <h3 className="text-xl font-medium text-gray-900 hover:text-hovmart-purple transition-colors">
                        {property.title}
                      </h3>
                      <div className="flex items-center gap-1 text-sm whitespace-nowrap ml-2">
                        <Star className="h-4 w-4 fill-hovmart-purple text-hovmart-purple flex-shrink-0" />
                        <span>{property.rating}</span>
                        <span className="text-gray-600">({property.reviews})</span>
                      </div>
                    </div>

                    <div className="flex items-center text-gray-600 mt-1">
                      <MapPin className="h-4 w-4 mr-1 flex-shrink-0" />
                      <span>{property.location}</span>
                    </div>

                    <div className="flex flex-wrap items-center gap-x-6 gap-y-2 mt-3">
                      <div className="flex items-center text-gray-600">
                        <Bed className="h-4 w-4 mr-1" />
                        <span>{property.beds} beds</span>
                      </div>
                      <div className="flex items-center text-gray-600">
                        <Bath className="h-4 w-4 mr-1" />
                        <span>{property.baths} baths</span>
                      </div>
                      <div className="flex items-center text-gray-600">
                        <Users className="h-4 w-4 mr-1" />
                        <span>Up to {property.maxGuests} guests</span>
                      </div>
                    </div>

                    <div className="mt-4 flex items-center justify-between">
                      <div>
                        <span className="text-xl font-semibold text-gray-900">₦{property.price.toLocaleString()}</span>
                        <span className="text-gray-600 ml-1">/ night</span>
                      </div>
                      <div className="px-4 py-2 bg-hovmart-purple text-white rounded-lg hover:bg-hovmart-light transition-colors elegant-button">
                        View Details
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
