"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { properties } from "@/data/properties"
import {
  Search,
  Star,
  Heart,
  Filter,
  ChevronDown,
  Home,
  MapPin,
  Bed,
  Bath,
  Users,
  ArrowUpDown,
  Check,
  Map,
  Grid,
} from "lucide-react"
import { PropertyMapView } from "./property-map-view"
import { PropertyPagination } from "./property-pagination"
import { RecentlyViewed } from "./recently-viewed"
import { PropertyComparisonTool } from "./property-comparison-tool"

export function ViewAllProperties() {
  const [filteredProperties, setFilteredProperties] = useState(properties)
  const [displayedProperties, setDisplayedProperties] = useState<typeof properties>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [showFilters, setShowFilters] = useState(false)
  const [viewType, setViewType] = useState<"grid" | "list" | "map">("grid")
  const [sortOption, setSortOption] = useState<string>("featured")
  const [showSortOptions, setShowSortOptions] = useState(false)
  const [favorites, setFavorites] = useState<number[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [showComparisonTool, setShowComparisonTool] = useState(false)

  // Pagination settings
  const propertiesPerPage = 12
  const totalPages = Math.ceil(filteredProperties.length / propertiesPerPage)

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

  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
    setCurrentPage(1) // Reset to first page on search
  }

  // Toggle property in favorites
  const toggleFavorite = (id: number) => {
    setFavorites((prev) => (prev.includes(id) ? prev.filter((favId) => favId !== id) : [...prev, id]))
  }

  // Handle filter changes
  const handleFilterChange = (filterType: keyof typeof filters, value: string | string[]) => {
    setFilters((prev) => ({
      ...prev,
      [filterType]: value,
    }))
    setCurrentPage(1) // Reset to first page on filter change
  }

  // Toggle property type in filter
  const togglePropertyType = (type: string) => {
    setFilters((prev) => ({
      ...prev,
      propertyType: prev.propertyType.includes(type)
        ? prev.propertyType.filter((t) => t !== type)
        : [...prev.propertyType, type],
    }))
    setCurrentPage(1) // Reset to first page on filter change
  }

  // Toggle location in filter
  const toggleLocation = (location: string) => {
    setFilters((prev) => ({
      ...prev,
      location: prev.location.includes(location)
        ? prev.location.filter((l) => l !== location)
        : [...prev.location, location],
    }))
    setCurrentPage(1) // Reset to first page on filter change
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
    setCurrentPage(1) // Reset to first page on filter clear
  }

  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    // Scroll to top of results
    window.scrollTo({ top: 0, behavior: "smooth" })
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
    switch (sortOption) {
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
  }, [searchQuery, filters, sortOption])

  // Update displayed properties based on pagination
  useEffect(() => {
    const startIndex = (currentPage - 1) * propertiesPerPage
    const endIndex = startIndex + propertiesPerPage
    setDisplayedProperties(filteredProperties.slice(startIndex, endIndex))
  }, [filteredProperties, currentPage])

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">All Properties</h1>
        <p className="text-gray-600">Browse our collection of {properties.length} premium properties</p>
      </div>

      {/* Search and Filters Bar */}
      <div className="bg-white rounded-xl shadow-md p-4 mb-8">
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
            className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:border-hovmart-purple/50 transition-colors"
          >
            <Filter className="h-5 w-5" />
            <span>Filters</span>
          </button>

          {/* Sort Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowSortOptions(!showSortOptions)}
              className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:border-hovmart-purple/50 transition-colors"
            >
              <ArrowUpDown className="h-5 w-5" />
              <span>Sort By</span>
              <ChevronDown className="h-4 w-4 ml-1" />
            </button>

            {showSortOptions && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg z-10 py-1 border border-gray-200">
                {[
                  { id: "featured", label: "Featured" },
                  { id: "price-low", label: "Price: Low to High" },
                  { id: "price-high", label: "Price: High to Low" },
                  { id: "rating", label: "Top Rated" },
                ].map((option) => (
                  <button
                    key={option.id}
                    className={`w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center ${
                      sortOption === option.id ? "text-hovmart-purple font-medium" : ""
                    }`}
                    onClick={() => {
                      setSortOption(option.id)
                      setShowSortOptions(false)
                    }}
                  >
                    {sortOption === option.id && <Check className="h-4 w-4 mr-2" />}
                    <span className={sortOption === option.id ? "ml-0" : "ml-6"}>{option.label}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* View Type Toggle */}
          <div className="flex rounded-lg border border-gray-300 overflow-hidden">
            <button
              className={`px-4 py-2 flex items-center ${
                viewType === "grid" ? "bg-hovmart-purple text-white" : "bg-white text-gray-700 hover:bg-gray-100"
              }`}
              onClick={() => setViewType("grid")}
              aria-label="Grid view"
            >
              <Grid className="h-4 w-4" />
            </button>
            <button
              className={`px-4 py-2 flex items-center ${
                viewType === "list" ? "bg-hovmart-purple text-white" : "bg-white text-gray-700 hover:bg-gray-100"
              }`}
              onClick={() => setViewType("list")}
              aria-label="List view"
            >
              <div className="flex flex-col gap-0.5">
                <div className="w-4 h-1 bg-current rounded-sm"></div>
                <div className="w-4 h-1 bg-current rounded-sm"></div>
                <div className="w-4 h-1 bg-current rounded-sm"></div>
              </div>
            </button>
            <button
              className={`px-4 py-2 flex items-center ${
                viewType === "map" ? "bg-hovmart-purple text-white" : "bg-white text-gray-700 hover:bg-gray-100"
              }`}
              onClick={() => setViewType("map")}
              aria-label="Map view"
            >
              <Map className="h-4 w-4" />
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
                      }`}
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
                <div className="flex flex-wrap gap-2 max-h-24 overflow-y-auto">
                  {locations.map((location) => (
                    <button
                      key={location}
                      onClick={() => toggleLocation(location)}
                      className={`px-3 py-1.5 rounded-full text-sm ${
                        filters.location.includes(location)
                          ? "bg-hovmart-purple text-white"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      {location}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Filter Actions */}
            <div className="flex justify-end mt-4 pt-4 border-t border-gray-200">
              <button onClick={clearFilters} className="px-4 py-2 text-gray-700 hover:text-hovmart-purple mr-2">
                Clear All
              </button>
              <button
                onClick={() => setShowFilters(false)}
                className="px-6 py-2 bg-hovmart-purple text-white rounded-lg hover:bg-hovmart-light transition-colors"
              >
                Apply Filters
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Results Count and Compare Button */}
      <div className="flex justify-between items-center mb-6">
        <div className="text-gray-600">
          Showing {Math.min(filteredProperties.length, displayedProperties.length)} of {filteredProperties.length}{" "}
          properties
        </div>

        {/* Compare Properties Button */}
        <button
          onClick={() => setShowComparisonTool(!showComparisonTool)}
          className="flex items-center gap-2 px-4 py-2 text-hovmart-purple border border-hovmart-purple rounded-lg hover:bg-hovmart-purple/5 transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
            />
          </svg>
          <span>Compare Properties</span>
        </button>
      </div>

      {/* Property Comparison Tool */}
      {showComparisonTool && <PropertyComparisonTool />}

      {/* No Results Message */}
      {filteredProperties.length === 0 && (
        <div className="text-center py-12">
          <div className="inline-flex items-center justify-center p-4 bg-hovmart-purple/10 rounded-full mb-4">
            <Home className="h-8 w-8 text-hovmart-purple" />
          </div>
          <h2 className="text-2xl font-bold mb-2">No properties found</h2>
          <p className="text-gray-600 max-w-md mx-auto mb-6">
            We couldn't find any properties matching your criteria. Try adjusting your filters or search query.
          </p>
          <button
            onClick={clearFilters}
            className="px-6 py-3 bg-hovmart-purple text-white rounded-lg hover:bg-hovmart-light transition-colors"
          >
            Clear All Filters
          </button>
        </div>
      )}

      {/* Map View */}
      {viewType === "map" && filteredProperties.length > 0 && (
        <PropertyMapView filteredProperties={filteredProperties} />
      )}

      {/* Property Grid View */}
      {viewType === "grid" && filteredProperties.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {displayedProperties.map((property) => (
            <div
              key={property.id}
              className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow"
            >
              <Link href={`/properties/${property.id}`} className="block relative">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={property.images[0] || "/placeholder.svg"}
                    alt={property.title}
                    fill
                    className="object-cover transition-transform duration-500 hover:scale-105"
                  />

                  {/* Favorite Button */}
                  <button
                    onClick={(e) => {
                      e.preventDefault()
                      toggleFavorite(property.id)
                    }}
                    className="absolute top-3 right-3 p-2 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white transition-colors z-10"
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
              </Link>
            </div>
          ))}
        </div>
      )}

      {/* Property List View */}
      {viewType === "list" && filteredProperties.length > 0 && (
        <div className="space-y-6">
          {displayedProperties.map((property) => (
            <div
              key={property.id}
              className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow"
            >
              <Link href={`/properties/${property.id}`} className="block">
                <div className="flex flex-col md:flex-row">
                  <div className="relative md:w-1/3 aspect-[4/3] md:aspect-auto">
                    <Image
                      src={property.images[0] || "/placeholder.svg"}
                      alt={property.title}
                      fill
                      className="object-cover"
                    />

                    {/* Favorite Button */}
                    <button
                      onClick={(e) => {
                        e.preventDefault()
                        toggleFavorite(property.id)
                      }}
                      className="absolute top-3 right-3 p-2 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white transition-colors z-10"
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
                        <Home className="h-4 w-4 mr-1" />
                        <span>{property.type}</span>
                      </div>
                      {property.beds > 0 && (
                        <div className="flex items-center text-gray-600">
                          <Bed className="h-4 w-4 mr-1" />
                          <span>{property.beds} beds</span>
                        </div>
                      )}
                      {property.baths > 0 && (
                        <div className="flex items-center text-gray-600">
                          <Bath className="h-4 w-4 mr-1" />
                          <span>{property.baths} baths</span>
                        </div>
                      )}
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
                      <div className="px-4 py-2 bg-hovmart-purple text-white rounded-lg hover:bg-hovmart-light transition-colors">
                        View Details
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      )}

      {/* Pagination */}
      {filteredProperties.length > propertiesPerPage && (
        <PropertyPagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
      )}

      {/* Recently Viewed Section */}
      <RecentlyViewed />
    </div>
  )
}
