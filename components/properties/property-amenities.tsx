"use client"

import type React from "react"

import { useState } from "react"
import {
  Wifi,
  UtensilsCrossed,
  Wind,
  Shirt,
  Car,
  PocketIcon as Pool,
  ShieldCheck,
  Dumbbell,
  Waves,
  ChevronDown,
  ChevronUp,
  Check,
} from "lucide-react"

interface PropertyAmenitiesProps {
  amenities: string[]
}

export function PropertyAmenities({ amenities }: PropertyAmenitiesProps) {
  const [showAll, setShowAll] = useState(false)

  // Map amenities to icons
  const amenityIcons: Record<string, React.ReactNode> = {
    Wifi: <Wifi className="h-5 w-5" />,
    Kitchen: <UtensilsCrossed className="h-5 w-5" />,
    "Air conditioning": <Wind className="h-5 w-5" />,
    "Washing machine": <Shirt className="h-5 w-5" />,
    "Free parking": <Car className="h-5 w-5" />,
    Pool: <Pool className="h-5 w-5" />,
    Security: <ShieldCheck className="h-5 w-5" />,
    "Gym access": <Dumbbell className="h-5 w-5" />,
    "Beach access": <Waves className="h-5 w-5" />,
  }

  // Display 6 amenities initially, show all when expanded
  const displayedAmenities = showAll ? amenities : amenities.slice(0, 6)

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Amenities</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {displayedAmenities.map((amenity) => (
          <div key={amenity} className="flex items-center">
            <div className="w-8 h-8 flex items-center justify-center text-hovmart-purple mr-3">
              {amenityIcons[amenity] || <Check className="h-5 w-5" />}
            </div>
            <span>{amenity}</span>
          </div>
        ))}
      </div>

      {amenities.length > 6 && (
        <button
          onClick={() => setShowAll(!showAll)}
          className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium hover:border-hovmart-purple/50 transition-colors"
        >
          {showAll ? (
            <>
              <ChevronUp className="h-4 w-4" />
              <span>Show less</span>
            </>
          ) : (
            <>
              <ChevronDown className="h-4 w-4" />
              <span>Show all {amenities.length} amenities</span>
            </>
          )}
        </button>
      )}
    </div>
  )
}
