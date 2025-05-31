"use client"

import { useState, useEffect } from "react"
import { PropertyCard } from "./property-card"
import { properties } from "@/data/properties"

interface Property {
  id: string
  title: string
  location: string
  price: number
  priceType?: "perNight" | "monthly" | "yearly" | "sale"
  images: string[]
  rating?: number
  reviewCount?: number
  available: boolean
  type: string
  beds?: number
  baths?: number
  bedrooms?: number
  bathrooms?: number
  maxGuests?: number
  amenities: string[]
  categories: string[]
  featured?: boolean
  isSuperhost?: boolean
  isGuestFavorite?: boolean
}

interface PropertyGridProps {
  initialProperties?: Property[]
  showFeatured?: boolean
  maxItems?: number
  columns?: number
  showFilters?: boolean
  showPagination?: boolean
  showSearch?: boolean
  showMap?: boolean
  showSort?: boolean
  showCategories?: boolean
  showRecentlyViewed?: boolean
  showComparison?: boolean
  showViewAll?: boolean
}

export function PropertyGrid({
  initialProperties,
  showFeatured = false,
  maxItems = 12,
  columns = 4,
  showFilters = false,
  showPagination = false,
  showSearch = false,
  showMap = false,
  showSort = false,
  showCategories = false,
  showRecentlyViewed = false,
  showComparison = false,
  showViewAll = false,
}: PropertyGridProps) {
  const [favorites, setFavorites] = useState<string[]>([])
  const [displayProperties, setDisplayProperties] = useState<Property[]>(initialProperties || properties)

  // Filter properties based on showFeatured prop
  useEffect(() => {
    if (initialProperties) {
      setDisplayProperties(initialProperties)
    } else if (showFeatured) {
      setDisplayProperties(properties.filter((property) => property.featured))
    } else {
      setDisplayProperties(properties)
    }
  }, [initialProperties, showFeatured])

  // Limit the number of properties to display
  const limitedProperties = displayProperties.slice(0, maxItems)

  // Toggle favorite status
  const toggleFavorite = (id: string) => {
    setFavorites((prev) => {
      if (prev.includes(id)) {
        return prev.filter((favId) => favId !== id)
      } else {
        return [...prev, id]
      }
    })
  }

  // Format price
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      maximumFractionDigits: 0,
    }).format(price)
  }

  // Determine grid columns class based on columns prop
  const getGridClass = () => {
    switch (columns) {
      case 1:
        return "grid-cols-1"
      case 2:
        return "grid-cols-1 sm:grid-cols-2"
      case 3:
        return "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
      case 4:
      default:
        return "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
    }
  }

  // Assign superhost and guest favorite status randomly for demo purposes
  // In a real app, this would come from the API
  const assignSpecialStatus = (index: number) => {
    if (index % 7 === 0) return { isSuperhost: true, isGuestFavorite: false }
    if (index % 5 === 0) return { isSuperhost: false, isGuestFavorite: true }
    return { isSuperhost: false, isGuestFavorite: false }
  }

  return (
    <div className="w-full">
      <div className={`grid ${getGridClass()} gap-6`}>
        {limitedProperties.map((property, index) => {
          const { isSuperhost, isGuestFavorite } = assignSpecialStatus(index)

          return (
            <PropertyCard
              key={property.id}
              id={property.id}
              title={property.title}
              location={property.location}
              price={property.price}
              priceType={property.priceType || "monthly"}
              image={property.images[0]}
              propertyType={property.type}
              rating={property.rating || 4 + Math.random()}
              reviewCount={property.reviewCount || Math.floor(Math.random() * 500) + 10}
              isSuperhost={isSuperhost}
              isGuestFavorite={isGuestFavorite}
            />
          )
        })}
      </div>
    </div>
  )
}
