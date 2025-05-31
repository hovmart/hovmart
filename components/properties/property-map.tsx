"use client"

import { useState } from "react"
import { MapPin } from "lucide-react"

interface PropertyMapProps {
  location: string
}

export function PropertyMap({ location }: PropertyMapProps) {
  const [isLoaded, setIsLoaded] = useState(false)

  // For demo purposes, we'll use a static map image
  // In a real application, you would integrate with Google Maps or similar

  return (
    <div className="space-y-4">
      <div className="flex items-start">
        <MapPin className="h-5 w-5 text-hovmart-purple mt-0.5 mr-3 flex-shrink-0" />
        <div>
          <h3 className="font-medium">{location}</h3>
          <p className="text-gray-600 text-sm mt-1">
            Great location in the heart of the city. Easy access to public transportation, restaurants, and attractions.
          </p>
        </div>
      </div>

      <div className="relative h-[300px] rounded-xl overflow-hidden bg-gray-100">
        <iframe
          src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=${encodeURIComponent(location)}`}
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen={false}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          onLoad={() => setIsLoaded(true)}
          className={`absolute inset-0 transition-opacity duration-500 ${isLoaded ? "opacity-100" : "opacity-0"}`}
        ></iframe>

        {!isLoaded && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-hovmart-purple"></div>
          </div>
        )}
      </div>
    </div>
  )
}
