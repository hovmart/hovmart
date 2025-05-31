"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { X, Bed, Bath, Users, MapPin, Home, ArrowRight } from "lucide-react"
import { properties } from "@/data/properties"

export function PropertyComparisonTool() {
  const [selectedProperties, setSelectedProperties] = useState<number[]>([])
  const [showComparison, setShowComparison] = useState(false)

  const toggleProperty = (id: number) => {
    if (selectedProperties.includes(id)) {
      setSelectedProperties(selectedProperties.filter((propId) => propId !== id))
    } else if (selectedProperties.length < 3) {
      setSelectedProperties([...selectedProperties, id])
    }
  }

  const clearSelection = () => {
    setSelectedProperties([])
    setShowComparison(false)
  }

  const selectedPropertyData = properties.filter((property) => selectedProperties.includes(property.id))

  return (
    <div className="mt-8 mb-12">
      {!showComparison ? (
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-900">Compare Properties</h2>
            {selectedProperties.length > 0 && (
              <button
                onClick={clearSelection}
                className="text-sm text-hovmart-purple hover:underline flex items-center"
              >
                <X className="h-4 w-4 mr-1" />
                Clear selection
              </button>
            )}
          </div>

          <p className="text-gray-600 mb-6">Select up to 3 properties to compare their features side by side.</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            {selectedPropertyData.map((property) => (
              <div key={property.id} className="relative bg-gray-50 rounded-lg p-3 border border-gray-200">
                <button
                  onClick={() => toggleProperty(property.id)}
                  className="absolute top-2 right-2 p-1 rounded-full bg-white shadow-sm"
                  aria-label="Remove from comparison"
                >
                  <X className="h-4 w-4 text-gray-600" />
                </button>
                <div className="flex items-center space-x-3">
                  <div className="relative h-16 w-16 rounded-md overflow-hidden flex-shrink-0">
                    <Image
                      src={property.images[0] || "/placeholder.svg"}
                      alt={property.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900 line-clamp-1">{property.title}</h3>
                    <p className="text-sm text-gray-600">{property.location}</p>
                    <p className="text-sm font-semibold mt-1">₦{property.price.toLocaleString()}</p>
                  </div>
                </div>
              </div>
            ))}

            {Array.from({ length: 3 - selectedProperties.length }).map((_, index) => (
              <div
                key={`empty-${index}`}
                className="border border-dashed border-gray-300 rounded-lg p-4 flex items-center justify-center text-gray-500"
              >
                <span>Select a property</span>
              </div>
            ))}
          </div>

          <div className="flex justify-between items-center">
            <p className="text-sm text-gray-600">{selectedProperties.length} of 3 properties selected</p>
            <button
              onClick={() => setShowComparison(true)}
              disabled={selectedProperties.length < 2}
              className={`px-4 py-2 rounded-lg flex items-center ${
                selectedProperties.length < 2
                  ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                  : "bg-hovmart-purple text-white hover:bg-hovmart-light transition-colors"
              }`}
            >
              Compare Properties
              <ArrowRight className="h-4 w-4 ml-2" />
            </button>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="p-4 bg-hovmart-purple/10 border-b border-hovmart-purple/20 flex justify-between items-center">
            <h2 className="text-xl font-semibold text-hovmart-purple">Property Comparison</h2>
            <button
              onClick={() => setShowComparison(false)}
              className="text-sm text-hovmart-purple hover:underline flex items-center"
            >
              Back to selection
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[800px]">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="p-4 text-left text-gray-600 font-medium w-1/4">Property</th>
                  {selectedPropertyData.map((property) => (
                    <th key={property.id} className="p-4 text-center">
                      <div className="relative h-24 w-full rounded-md overflow-hidden mb-2">
                        <Image
                          src={property.images[0] || "/placeholder.svg"}
                          alt={property.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <h3 className="font-medium text-gray-900 line-clamp-1">{property.title}</h3>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-200">
                  <td className="p-4 text-gray-600 font-medium">Price</td>
                  {selectedPropertyData.map((property) => (
                    <td key={property.id} className="p-4 text-center">
                      <span className="font-semibold text-hovmart-purple">₦{property.price.toLocaleString()}</span>
                      <span className="text-sm text-gray-600 ml-1">/ night</span>
                    </td>
                  ))}
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="p-4 text-gray-600 font-medium">Location</td>
                  {selectedPropertyData.map((property) => (
                    <td key={property.id} className="p-4 text-center">
                      <div className="flex items-center justify-center">
                        <MapPin className="h-4 w-4 text-gray-500 mr-1" />
                        <span>{property.location}</span>
                      </div>
                    </td>
                  ))}
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="p-4 text-gray-600 font-medium">Type</td>
                  {selectedPropertyData.map((property) => (
                    <td key={property.id} className="p-4 text-center">
                      <div className="flex items-center justify-center">
                        <Home className="h-4 w-4 text-gray-500 mr-1" />
                        <span>{property.type}</span>
                      </div>
                    </td>
                  ))}
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="p-4 text-gray-600 font-medium">Bedrooms</td>
                  {selectedPropertyData.map((property) => (
                    <td key={property.id} className="p-4 text-center">
                      <div className="flex items-center justify-center">
                        <Bed className="h-4 w-4 text-gray-500 mr-1" />
                        <span>{property.beds}</span>
                      </div>
                    </td>
                  ))}
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="p-4 text-gray-600 font-medium">Bathrooms</td>
                  {selectedPropertyData.map((property) => (
                    <td key={property.id} className="p-4 text-center">
                      <div className="flex items-center justify-center">
                        <Bath className="h-4 w-4 text-gray-500 mr-1" />
                        <span>{property.baths}</span>
                      </div>
                    </td>
                  ))}
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="p-4 text-gray-600 font-medium">Max Guests</td>
                  {selectedPropertyData.map((property) => (
                    <td key={property.id} className="p-4 text-center">
                      <div className="flex items-center justify-center">
                        <Users className="h-4 w-4 text-gray-500 mr-1" />
                        <span>{property.maxGuests}</span>
                      </div>
                    </td>
                  ))}
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="p-4 text-gray-600 font-medium">Rating</td>
                  {selectedPropertyData.map((property) => (
                    <td key={property.id} className="p-4 text-center">
                      <div className="flex items-center justify-center">
                        <span className="bg-hovmart-purple/10 text-hovmart-purple px-2 py-1 rounded-full text-sm font-medium">
                          {property.rating} / 5
                        </span>
                      </div>
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="p-4"></td>
                  {selectedPropertyData.map((property) => (
                    <td key={property.id} className="p-4 text-center">
                      <Link
                        href={`/properties/${property.id}`}
                        className="inline-block px-4 py-2 bg-hovmart-purple text-white rounded-lg hover:bg-hovmart-light transition-colors"
                      >
                        View Details
                      </Link>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}
