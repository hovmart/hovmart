"use client"

import type React from "react"

import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { Heart, Star } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

interface PropertyCardProps {
  id: string
  title: string
  location: string
  price: number
  priceType?: "perNight" | "monthly" | "yearly" | "sale"
  bedrooms?: number
  bathrooms?: number
  squareFeet?: number
  landSize?: number
  landUnit?: string
  image: string
  featured?: boolean
  propertyType?: string
  isLandedProperty?: boolean
  rating?: number
  reviewCount?: number
  isSuperhost?: boolean
  isGuestFavorite?: boolean
}

export function PropertyCard({
  id,
  title,
  location,
  price,
  priceType = "monthly",
  image,
  propertyType = "property",
  rating,
  reviewCount,
  isSuperhost,
  isGuestFavorite,
}: PropertyCardProps) {
  const [isFavorite, setIsFavorite] = useState(false)

  const toggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsFavorite(!isFavorite)
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      maximumFractionDigits: 0,
    }).format(price)
  }

  const getPriceLabel = (type: string) => {
    switch (type) {
      case "perNight":
        return "night"
      case "monthly":
        return "month"
      case "yearly":
        return "year"
      case "sale":
        return ""
      default:
        return "month"
    }
  }

  // Format the property type and location
  const formattedPropertyType = propertyType ? propertyType.charAt(0).toUpperCase() + propertyType.slice(1) : "Property"
  const propertyTitle = `${formattedPropertyType} in ${location}`

  return (
    <div className="group relative">
      <div className="relative aspect-[4/3] overflow-hidden rounded-xl">
        <Link href={`/properties/${id}`}>
          <Image
            src={image || "/placeholder.svg"}
            alt={title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </Link>

        {/* Badge in top left */}
        {(isSuperhost || isGuestFavorite) && (
          <div className="absolute left-3 top-3 z-10">
            <Badge
              className={`px-3 py-1 text-xs font-medium ${isSuperhost ? "bg-white text-black" : "bg-white text-black"}`}
            >
              {isSuperhost ? "Superhost" : "Guest favorite"}
            </Badge>
          </div>
        )}

        {/* Favorite button */}
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-2 top-2 z-10 h-8 w-8 rounded-full bg-white/80 shadow-sm transition-opacity hover:bg-white"
          onClick={toggleFavorite}
        >
          <Heart className={`h-4 w-4 ${isFavorite ? "fill-red-500 text-red-500" : "text-gray-700"}`} />
          <span className="sr-only">Add to favorites</span>
        </Button>
      </div>

      <div className="mt-3">
        <div className="flex items-center justify-between">
          <Link href={`/properties/${id}`} className="text-base font-medium text-gray-900 hover:underline">
            {propertyTitle}
          </Link>
          {rating && (
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 fill-current text-black" />
              <span className="text-sm font-medium">{rating.toFixed(2)}</span>
              {reviewCount && <span className="text-sm text-gray-600">({reviewCount})</span>}
            </div>
          )}
        </div>
        <p className="mt-1 text-sm text-gray-600">{title}</p>
        <p className="mt-2">
          <span className="font-semibold">{formatPrice(price)}</span>
          {getPriceLabel(priceType) && <span className="text-gray-600"> / {getPriceLabel(priceType)}</span>}
        </p>
      </div>
    </div>
  )
}
