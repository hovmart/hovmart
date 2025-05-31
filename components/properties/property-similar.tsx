"use client"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Star, ChevronLeft, ChevronRight } from "lucide-react"
import { properties } from "@/data/properties"

interface PropertySimilarProps {
  currentPropertyId: number
  categories: string[]
}

export function PropertySimilar({ currentPropertyId, categories }: PropertySimilarProps) {
  const [similarProperties, setSimilarProperties] = useState<typeof properties>([])
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [showLeftArrow, setShowLeftArrow] = useState(false)
  const [showRightArrow, setShowRightArrow] = useState(true)

  // Find similar properties based on categories
  useEffect(() => {
    const filtered = properties
      .filter((p) => p.id !== currentPropertyId && p.categories.some((c) => categories.includes(c)))
      .slice(0, 6)

    setSimilarProperties(filtered)
  }, [currentPropertyId, categories])

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -300, behavior: "smooth" })
    }
  }

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 300, behavior: "smooth" })
    }
  }

  // Check scroll position to show/hide arrows
  const checkScroll = () => {
    if (!scrollContainerRef.current) return

    const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current
    setShowLeftArrow(scrollLeft > 0)
    setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10) // 10px buffer
  }

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current
    if (scrollContainer) {
      scrollContainer.addEventListener("scroll", checkScroll)
      // Initial check
      checkScroll()

      // Check on resize
      window.addEventListener("resize", checkScroll)

      return () => {
        scrollContainer.removeEventListener("scroll", checkScroll)
        window.removeEventListener("resize", checkScroll)
      }
    }
  }, [similarProperties])

  if (similarProperties.length === 0) return null

  return (
    <div className="mt-16">
      <h2 className="text-2xl font-semibold mb-6">Similar Properties</h2>

      <div className="relative">
        {showLeftArrow && (
          <button
            onClick={scrollLeft}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full shadow-md p-2 hover:shadow-lg transition-shadow"
            aria-label="Scroll left"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
        )}

        <div
          ref={scrollContainerRef}
          className="flex overflow-x-auto scrollbar-hide gap-6 py-4 px-1"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {similarProperties.map((property) => (
            <div key={property.id} className="flex-shrink-0 w-[280px]">
              <Link href={`/properties/${property.id}`} className="block group">
                <div className="relative aspect-[4/3] rounded-xl overflow-hidden mb-3">
                  <Image
                    src={property.images[0] || "/placeholder.svg"}
                    alt={property.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>

                <div className="flex justify-between items-start">
                  <h3 className="font-medium text-gray-900 group-hover:text-hovmart-purple transition-colors line-clamp-1">
                    {property.title}
                  </h3>
                  <div className="flex items-center gap-1 text-sm whitespace-nowrap ml-2">
                    <Star className="h-4 w-4 fill-hovmart-purple text-hovmart-purple flex-shrink-0" />
                    <span>{property.rating}</span>
                  </div>
                </div>

                <p className="text-gray-600 text-sm line-clamp-1">{property.location}</p>
                <p className="text-gray-600 text-sm">{property.dates}</p>

                <p className="mt-2">
                  <span className="font-semibold text-gray-900">₦{property.price.toLocaleString()}</span>
                  <span className="text-gray-600"> night</span>
                </p>
              </Link>
            </div>
          ))}
        </div>

        {showRightArrow && (
          <button
            onClick={scrollRight}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full shadow-md p-2 hover:shadow-lg transition-shadow"
            aria-label="Scroll right"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        )}
      </div>
    </div>
  )
}
