"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { ChevronRight } from "lucide-react"

export function PropertyCollections() {
  const [hoveredCollection, setHoveredCollection] = useState<string | null>(null)

  const collections = [
    {
      id: "luxury",
      title: "Luxury Homes",
      description: "Experience the finest accommodations with premium amenities and exceptional service.",
      image: "/lagos-penthouse-view.png",
      count: 15,
    },
    {
      id: "beachfront",
      title: "Beachfront Properties",
      description: "Wake up to stunning ocean views and the sound of waves at these beachfront properties.",
      image: "/lagos-beachfront-luxury-home.png",
      count: 8,
    },
    {
      id: "shortlets",
      title: "Shortlet Apartments",
      description: "Perfect for short stays, these fully furnished apartments offer comfort and convenience.",
      image: "/lekki-apartment.png",
      count: 24,
    },
    {
      id: "apartments",
      title: "Modern Apartments",
      description: "Contemporary living spaces with stylish designs and modern amenities.",
      image: "/modern-ikoyi-apartment.png",
      count: 32,
    },
    {
      id: "vacation",
      title: "Vacation Homes",
      description: "Ideal for family getaways and holiday retreats with all the comforts of home.",
      image: "/elegant-villa-lagos.png",
      count: 12,
    },
    {
      id: "commercial",
      title: "Commercial Spaces",
      description: "Professional office spaces and retail locations for your business needs.",
      image: "/modern-lagos-office.png",
      count: 7,
    },
  ]

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">Property Collections</h1>
        <p className="text-gray-600">Explore our curated collections of properties for every need and preference.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {collections.map((collection) => (
          <Link
            key={collection.id}
            href={`/properties?category=${collection.id}`}
            className="group"
            onMouseEnter={() => setHoveredCollection(collection.id)}
            onMouseLeave={() => setHoveredCollection(null)}
          >
            <div className="bg-white rounded-xl shadow-md overflow-hidden h-full">
              <div className="relative aspect-[16/9]">
                <Image
                  src={collection.image || "/placeholder.svg"}
                  alt={collection.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4">
                  <h2 className="text-white text-xl font-semibold mb-1">{collection.title}</h2>
                  <div className="text-white/80 text-sm">{collection.count} properties</div>
                </div>
              </div>
              <div className="p-4">
                <p className="text-gray-600 mb-4">{collection.description}</p>
                <div
                  className={`inline-flex items-center text-hovmart-purple font-medium transition-all duration-300 ${
                    hoveredCollection === collection.id ? "translate-x-1" : ""
                  }`}
                >
                  Explore Collection
                  <ChevronRight className="h-4 w-4 ml-1" />
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Featured Collection */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-6">Featured: Luxury Beachfront Villas</h2>
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="relative aspect-square lg:aspect-auto">
              <Image
                src="/lagos-beachfront-luxury-home.png"
                alt="Luxury Beachfront Villas"
                fill
                className="object-cover"
              />
            </div>
            <div className="p-8 flex flex-col justify-center">
              <h3 className="text-2xl font-semibold mb-4">Experience Coastal Luxury</h3>
              <p className="text-gray-600 mb-6">
                Discover our exclusive collection of beachfront villas offering unparalleled luxury and breathtaking
                ocean views. These handpicked properties represent the finest in coastal living, with private access to
                pristine beaches, infinity pools, and world-class amenities.
              </p>
              <p className="text-gray-600 mb-6">
                Perfect for discerning travelers seeking privacy, comfort, and unforgettable experiences. Each villa is
                meticulously designed and maintained to the highest standards.
              </p>
              <div className="mt-auto">
                <Link
                  href="/properties?category=beachfront&luxury=true"
                  className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-hovmart-purple to-hovmart-light text-white rounded-lg font-medium hover:shadow-md transition-shadow"
                >
                  View Collection
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
