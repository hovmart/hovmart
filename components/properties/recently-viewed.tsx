"use client"

import React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { ChevronLeft, ChevronRight, Star } from "lucide-react"
import { properties } from "@/data/properties"

export function RecentlyViewed() {
  const [recentProperties, setRecentProperties] = useState<typeof properties>([])

  useEffect(() => {
    // In a real app, you would get this from localStorage or a database
    // For demo purposes, we'll just use a random selection of properties
    const getRandomProperties = () => {
      const shuffled = [...properties].sort(() => 0.5 - Math.random())
      return shuffled.slice(0, 4)
    }

    setRecentProperties(getRandomProperties())
  }, [])

  const scrollContainerRef = React.useRef<HTMLDivElement>(null)

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const { current } = scrollContainerRef
      const scrollAmount = 320 // Approximate width of a card + gap

      if (direction === "left") {
        current.scrollBy({ left: -scrollAmount, behavior: "smooth" })
      } else {
        current.scrollBy({ left: scrollAmount, behavior: "smooth" })
      }
    }
  }

  if (recentProperties.length === 0) return null

  return (
    <div className="mt-12 mb-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-gray-900">Recently Viewed</h2>
        <div className="flex space-x-2">
          <button
            onClick={() => scroll("left")}
            className="p-2 rounded-full border border-gray-300 hover:bg-gray-100 transition-colors"
            aria-label="Scroll left"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            onClick={() => scroll("right")}
            className="p-2 rounded-full border border-gray-300 hover:bg-gray-100 transition-colors"
            aria-label="Scroll right"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>

      <div
        ref={scrollContainerRef}
        className="flex space-x-4 overflow-x-auto pb-4 scrollbar-hide scroll-smooth"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {recentProperties.map((property) => (
          <Link
            key={property.id}
            href={`/properties/${property.id}`}
            className="flex-shrink-0 w-72 bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow"
          >
            <div className="relative h-40 w-full">
              <Image
                src={property.images[0] || "/placeholder.svg"}
                alt={property.title}
                fill
                className="object-cover"
              />
            </div>
            <div className="p-3">
              <div className="flex justify-between items-start">
                <h3 className="font-medium text-gray-900 line-clamp-1">{property.title}</h3>
                <div className="flex items-center gap-1 text-sm">
                  <Star className="h-4 w-4 fill-hovmart-purple text-hovmart-purple" />
                  <span>{property.rating}</span>
                </div>
              </div>
              <p className="text-sm text-gray-600 mt-1">{property.location}</p>
              <div className="mt-2">
                <span className="font-semibold">₦{property.price.toLocaleString()}</span>
                <span className="text-sm text-gray-600 ml-1">/ night</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
