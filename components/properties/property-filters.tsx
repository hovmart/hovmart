"use client"

import { useState, useEffect } from "react"
import { X, Check, ChevronDown, ChevronUp } from "lucide-react"
import { motion } from "framer-motion"

interface PropertyFiltersProps {
  onClose: () => void
  onApplyFilters: (filters: any) => void
  initialPriceRange?: { min: number; max: number }
  initialPropertyTypes?: string[]
  initialAmenities?: string[]
  totalProperties?: number
}

export function PropertyFilters({
  onClose,
  onApplyFilters,
  initialPriceRange = { min: 0, max: 1000000 },
  initialPropertyTypes = [],
  initialAmenities = [],
  totalProperties = 0,
}: PropertyFiltersProps) {
  // Price range state
  const [priceRange, setPriceRange] = useState(initialPriceRange)
  const [minPrice, setMinPrice] = useState(initialPriceRange.min.toString())
  const [maxPrice, setMaxPrice] = useState(initialPriceRange.max.toString())

  // Property type state
  const [propertyTypes, setPropertyTypes] = useState<string[]>(initialPropertyTypes)

  // Amenities state
  const [amenities, setAmenities] = useState<string[]>(initialAmenities)

  // Rooms state
  const [beds, setBeds] = useState<string>("")
  const [baths, setBaths] = useState<string>("")

  // Expanded sections
  const [expandedSections, setExpandedSections] = useState({
    price: true,
    type: true,
    rooms: true,
    amenities: true,
  })

  // Toggle section expansion
  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections({
      ...expandedSections,
      [section]: !expandedSections[section],
    })
  }

  // Handle property type selection
  const togglePropertyType = (type: string) => {
    if (propertyTypes.includes(type)) {
      setPropertyTypes(propertyTypes.filter((t) => t !== type))
    } else {
      setPropertyTypes([...propertyTypes, type])
    }
  }

  // Handle amenity selection
  const toggleAmenity = (amenity: string) => {
    if (amenities.includes(amenity)) {
      setAmenities(amenities.filter((a) => a !== amenity))
    } else {
      setAmenities([...amenities, amenity])
    }
  }

  // Update price range when min/max inputs change
  useEffect(() => {
    const min = Number.parseInt(minPrice) || 0
    const max = Number.parseInt(maxPrice) || 1000000

    // Ensure min <= max
    if (min <= max) {
      setPriceRange({ min, max })
    }
  }, [minPrice, maxPrice])

  // Apply filters
  const handleApplyFilters = () => {
    onApplyFilters({
      priceRange,
      propertyTypes,
      amenities,
      beds,
      baths,
    })
  }

  // Reset all filters
  const resetFilters = () => {
    setPriceRange({ min: 0, max: 1000000 })
    setMinPrice("0")
    setMaxPrice("1000000")
    setPropertyTypes([])
    setAmenities([])
    setBeds("")
    setBaths("")
  }

  // Count active filters
  const activeFiltersCount =
    (priceRange.min > 0 || priceRange.max < 1000000 ? 1 : 0) +
    (propertyTypes.length > 0 ? 1 : 0) +
    (amenities.length > 0 ? 1 : 0) +
    (beds ? 1 : 0) +
    (baths ? 1 : 0)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="bg-white rounded-xl shadow-xl border border-gray-200 overflow-hidden"
    >
      <div className="p-4 border-b border-gray-200 flex items-center justify-between">
        <h2 className="text-lg font-semibold">Filters</h2>
        <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-100">
          <X className="h-5 w-5" />
        </button>
      </div>

      <div className="p-6 max-h-[70vh] overflow-y-auto">
        {/* Price Range Section */}
        <div className="mb-6 pb-6 border-b border-gray-200">
          <button
            onClick={() => toggleSection("price")}
            className="flex items-center justify-between w-full text-left mb-4"
          >
            <h3 className="text-lg font-medium">Price range</h3>
            {expandedSections.price ? (
              <ChevronUp className="h-5 w-5 text-gray-500" />
            ) : (
              <ChevronDown className="h-5 w-5 text-gray-500" />
            )}
          </button>

          {expandedSections.price && (
            <>
              <div className="flex items-center justify-between mb-6">
                <div className="w-[45%]">
                  <label className="block text-sm text-gray-600 mb-1">Minimum</label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">₦</span>
                    <input
                      type="number"
                      value={minPrice}
                      onChange={(e) => setMinPrice(e.target.value)}
                      min="0"
                      className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-hovmart-purple/20 focus:border-hovmart-purple"
                    />
                  </div>
                </div>
                <div className="w-[10%] flex items-center justify-center">
                  <div className="w-full h-[1px] bg-gray-300"></div>
                </div>
                <div className="w-[45%]">
                  <label className="block text-sm text-gray-600 mb-1">Maximum</label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">₦</span>
                    <input
                      type="number"
                      value={maxPrice}
                      onChange={(e) => setMaxPrice(e.target.value)}
                      min={minPrice}
                      className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-hovmart-purple/20 focus:border-hovmart-purple"
                    />
                  </div>
                </div>
              </div>

              {/* Price range presets */}
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: "Under ₦50,000", min: 0, max: 50000 },
                  { label: "₦50,000 - ₦100,000", min: 50000, max: 100000 },
                  { label: "₦100,000 - ₦200,000", min: 100000, max: 200000 },
                  { label: "₦200,000+", min: 200000, max: 1000000 },
                ].map((preset) => (
                  <button
                    key={preset.label}
                    onClick={() => {
                      setMinPrice(preset.min.toString())
                      setMaxPrice(preset.max.toString())
                    }}
                    className={`px-4 py-2 border rounded-lg text-sm transition-colors ${
                      Number.parseInt(minPrice) === preset.min && Number.parseInt(maxPrice) === preset.max
                        ? "border-hovmart-purple bg-hovmart-purple/5 text-hovmart-purple"
                        : "border-gray-300 hover:border-hovmart-purple/50"
                    }`}
                  >
                    {preset.label}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>

        {/* Property Type Section */}
        <div className="mb-6 pb-6 border-b border-gray-200">
          <button
            onClick={() => toggleSection("type")}
            className="flex items-center justify-between w-full text-left mb-4"
          >
            <h3 className="text-lg font-medium">Property type</h3>
            {expandedSections.type ? (
              <ChevronUp className="h-5 w-5 text-gray-500" />
            ) : (
              <ChevronDown className="h-5 w-5 text-gray-500" />
            )}
          </button>

          {expandedSections.type && (
            <div className="grid grid-cols-2 gap-3">
              {["Apartment", "House", "Villa", "Condo", "Townhouse", "Penthouse", "Studio", "Cottage"].map((type) => (
                <button
                  key={type}
                  onClick={() => togglePropertyType(type)}
                  className={`px-4 py-3 border rounded-lg text-sm transition-colors flex items-center justify-between ${
                    propertyTypes.includes(type)
                      ? "border-hovmart-purple bg-hovmart-purple/5 text-hovmart-purple"
                      : "border-gray-300 hover:border-hovmart-purple/50"
                  }`}
                >
                  <span>{type}</span>
                  {propertyTypes.includes(type) && <Check className="h-4 w-4 text-hovmart-purple" />}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Rooms Section */}
        <div className="mb-6 pb-6 border-b border-gray-200">
          <button
            onClick={() => toggleSection("rooms")}
            className="flex items-center justify-between w-full text-left mb-4"
          >
            <h3 className="text-lg font-medium">Rooms and beds</h3>
            {expandedSections.rooms ? (
              <ChevronUp className="h-5 w-5 text-gray-500" />
            ) : (
              <ChevronDown className="h-5 w-5 text-gray-500" />
            )}
          </button>

          {expandedSections.rooms && (
            <>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Bedrooms</label>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => setBeds("")}
                    className={`px-4 py-2 rounded-full text-sm ${
                      beds === "" ? "bg-hovmart-purple text-white" : "bg-gray-100 hover:bg-gray-200"
                    }`}
                  >
                    Any
                  </button>
                  {["1", "2", "3", "4", "5+"].map((num) => (
                    <button
                      key={num}
                      onClick={() => setBeds(num)}
                      className={`px-4 py-2 rounded-full text-sm ${
                        beds === num ? "bg-hovmart-purple text-white" : "bg-gray-100 hover:bg-gray-200"
                      }`}
                    >
                      {num}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Bathrooms</label>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => setBaths("")}
                    className={`px-4 py-2 rounded-full text-sm ${
                      baths === "" ? "bg-hovmart-purple text-white" : "bg-gray-100 hover:bg-gray-200"
                    }`}
                  >
                    Any
                  </button>
                  {["1", "2", "3", "4", "5+"].map((num) => (
                    <button
                      key={num}
                      onClick={() => setBaths(num)}
                      className={`px-4 py-2 rounded-full text-sm ${
                        baths === num ? "bg-hovmart-purple text-white" : "bg-gray-100 hover:bg-gray-200"
                      }`}
                    >
                      {num}
                    </button>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>

        {/* Amenities Section */}
        <div className="mb-6">
          <button
            onClick={() => toggleSection("amenities")}
            className="flex items-center justify-between w-full text-left mb-4"
          >
            <h3 className="text-lg font-medium">Amenities</h3>
            {expandedSections.amenities ? (
              <ChevronUp className="h-5 w-5 text-gray-500" />
            ) : (
              <ChevronDown className="h-5 w-5 text-gray-500" />
            )}
          </button>

          {expandedSections.amenities && (
            <div className="grid grid-cols-1 gap-3">
              {[
                "Wi-Fi",
                "Air conditioning",
                "Kitchen",
                "Washing machine",
                "Pool",
                "Free parking",
                "Gym",
                "TV",
                "Balcony",
                "Beachfront",
                "Pet friendly",
                "Wheelchair accessible",
              ].map((amenity) => (
                <div key={amenity} className="flex items-center">
                  <input
                    type="checkbox"
                    id={`amenity-${amenity}`}
                    checked={amenities.includes(amenity)}
                    onChange={() => toggleAmenity(amenity)}
                    className="h-4 w-4 text-hovmart-purple focus:ring-hovmart-purple/20 border-gray-300 rounded"
                  />
                  <label htmlFor={`amenity-${amenity}`} className="ml-2 text-sm text-gray-700">
                    {amenity}
                  </label>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="p-4 border-t border-gray-200 flex items-center justify-between bg-white sticky bottom-0">
        <button onClick={resetFilters} className="text-hovmart-purple underline font-medium text-sm">
          Clear all
        </button>
        <button
          onClick={handleApplyFilters}
          className="bg-hovmart-purple text-white px-6 py-2.5 rounded-lg font-medium hover:bg-hovmart-purple/90 transition-colors flex items-center"
        >
          <span>Show {totalProperties} properties</span>
          {activeFiltersCount > 0 && (
            <span className="ml-2 bg-white text-hovmart-purple text-xs rounded-full h-5 w-5 flex items-center justify-center">
              {activeFiltersCount}
            </span>
          )}
        </button>
      </div>
    </motion.div>
  )
}
