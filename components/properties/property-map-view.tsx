"use client"

import { useState, useEffect } from "react"
import { MapPin } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { properties } from "@/data/properties"

interface MapProperty {
  id: number
  title: string
  price: number
  location: string
  lat: number
  lng: number
  image: string
  rating: number
  type: string
}

export function PropertyMapView({ filteredProperties = properties }) {
  const [selectedProperty, setSelectedProperty] = useState<MapProperty | null>(null)
  const [mapLoaded, setMapLoaded] = useState(false)

  // Mock map properties with coordinates
  // In a real implementation, you would use actual coordinates from your data
  const mapProperties: MapProperty[] = filteredProperties.map((property, index) => ({
    id: property.id,
    title: property.title,
    price: property.price,
    location: property.location,
    // Generate mock coordinates (in a real app, these would come from your database)
    lat: 6.5244 + (Math.random() * 0.1 - 0.05),
    lng: 3.3792 + (Math.random() * 0.1 - 0.05),
    image: property.images[0] || "/placeholder.svg",
    rating: property.rating,
    type: property.type,
  }))

  useEffect(() => {
    // Simulate map loading
    const timer = setTimeout(() => {
      setMapLoaded(true)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden h-[calc(100vh-220px)] min-h-[600px]">
      {!mapLoaded ? (
        <div className="h-full w-full flex items-center justify-center bg-gray-100">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-hovmart-purple mb-4"></div>
            <p className="text-gray-600">Loading map...</p>
          </div>
        </div>
      ) : (
        <div className="relative h-full">
          {/* Mock Map Background */}
          <div className="absolute inset-0 bg-[#f2f3f4]">
            <div className="absolute inset-0 opacity-30">
              <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                    <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#9CA3AF" strokeWidth="0.5" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid)" />
              </svg>
            </div>

            {/* Mock Roads */}
            <div className="absolute inset-0">
              <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M0,200 C100,180 300,250 500,200 S700,120 900,200 S1100,280 1300,200"
                  stroke="#CBD5E1"
                  strokeWidth="6"
                  fill="none"
                />
                <path
                  d="M0,400 C200,380 400,450 600,400 S800,320 1000,400 S1200,480 1400,400"
                  stroke="#CBD5E1"
                  strokeWidth="8"
                  fill="none"
                />
                <path
                  d="M200,0 C180,100 250,300 200,500 S120,700 200,900"
                  stroke="#CBD5E1"
                  strokeWidth="5"
                  fill="none"
                />
                <path
                  d="M600,0 C580,200 650,400 600,600 S520,800 600,1000"
                  stroke="#CBD5E1"
                  strokeWidth="7"
                  fill="none"
                />
              </svg>
            </div>
          </div>

          {/* Property Markers */}
          {mapProperties.map((property) => (
            <button
              key={property.id}
              className={`absolute transform -translate-x-1/2 -translate-y-1/2 z-10 transition-all duration-200 ${
                selectedProperty?.id === property.id ? "scale-110 z-20" : "hover:scale-110 hover:z-20"
              }`}
              style={{ left: `${property.lng * 100 - 370}px`, top: `${property.lat * 100 - 620}px` }}
              onClick={() => setSelectedProperty(property)}
            >
              <div
                className={`flex items-center justify-center ${
                  selectedProperty?.id === property.id
                    ? "bg-hovmart-purple text-white"
                    : "bg-white text-hovmart-purple hover:bg-hovmart-purple/10"
                } rounded-full p-1 shadow-md transition-colors`}
              >
                <MapPin className="h-5 w-5" />
              </div>
              {selectedProperty?.id === property.id && (
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 w-64 bg-white rounded-lg shadow-lg z-30 overflow-hidden animate-in fade-in slide-in-from-bottom-2 duration-200">
                  <Link href={`/properties/${property.id}`} className="block">
                    <div className="relative h-32 w-full">
                      <Image
                        src={property.image || "/placeholder.svg"}
                        alt={property.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="p-3">
                      <h3 className="font-medium text-gray-900 line-clamp-1">{property.title}</h3>
                      <p className="text-sm text-gray-600 mt-1 line-clamp-1">{property.location}</p>
                      <div className="flex justify-between items-center mt-2">
                        <span className="text-sm text-gray-600">{property.type}</span>
                        <span className="font-semibold text-hovmart-purple">₦{property.price.toLocaleString()}</span>
                      </div>
                    </div>
                  </Link>
                  <button
                    onClick={(e) => {
                      e.preventDefault()
                      e.stopPropagation()
                      setSelectedProperty(null)
                    }}
                    className="absolute top-2 right-2 bg-white/80 rounded-full p-1 shadow-sm"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 text-gray-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              )}
            </button>
          ))}

          {/* Map Controls */}
          <div className="absolute top-4 right-4 bg-white rounded-lg shadow-md">
            <button className="p-2 hover:bg-gray-100 rounded-t-lg border-b border-gray-200">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-gray-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-b-lg">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-gray-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
              </svg>
            </button>
          </div>

          {/* Map Legend */}
          <div className="absolute bottom-4 left-4 bg-white p-3 rounded-lg shadow-md text-sm">
            <div className="flex items-center mb-2">
              <div className="w-3 h-3 rounded-full bg-hovmart-purple mr-2"></div>
              <span>Selected Property</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-white border border-hovmart-purple mr-2"></div>
              <span>Available Property</span>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
