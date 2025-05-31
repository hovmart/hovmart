"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { ChevronRight } from "lucide-react"
import { categories as defaultCategories } from "./property-categories-data"

interface Category {
  id: string
  name: string
  description: string
  image: string
  count: number
  featured?: boolean
}

interface PropertyCategoriesProps {
  categories?: Category[]
  activeCategory?: string
  onCategoryChange?: (category: string) => void
}

export function PropertyCategories({
  categories = defaultCategories,
  activeCategory = "all",
  onCategoryChange,
}: PropertyCategoriesProps) {
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null)

  // Ensure categories is defined before filtering
  const categoriesData = categories || []
  const featuredCategories = categoriesData.filter((category) => category.featured)
  const regularCategories = categoriesData.filter((category) => !category.featured)

  const handleCategoryChange = (categoryId: string) => {
    if (onCategoryChange) {
      onCategoryChange(categoryId)
    }
  }

  return (
    <div className="py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative mb-16">
          <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-40 h-40 bg-gradient-to-r from-hovmart-purple/10 to-amber-400/10 rounded-full blur-3xl opacity-70"></div>

          <div className="text-center relative">
            <div className="inline-block mb-3">
              <span className="text-sm font-medium text-hovmart-purple tracking-wider uppercase bg-hovmart-purple/5 px-4 py-1.5 rounded-full">
                Discover Your Dream Home
              </span>
            </div>

            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
              Explore Properties by Category
            </h2>

            <div className="flex justify-center mb-6">
              <div className="w-20 h-1 bg-gradient-to-r from-hovmart-purple to-amber-400 rounded-full"></div>
            </div>

            <p className="text-gray-600 max-w-2xl mx-auto text-lg leading-relaxed">
              Discover your perfect property from our diverse range of categories, each offering unique experiences and
              amenities tailored to your preferences.
            </p>
          </div>
        </div>

        {/* Featured Categories */}
        {featuredCategories.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {featuredCategories.map((category, index) => (
              <FeaturedCategoryCard
                key={category.id}
                category={category}
                isActive={activeCategory === category.id}
                isHovered={hoveredCategory === category.id}
                onHover={() => setHoveredCategory(category.id)}
                onLeave={() => setHoveredCategory(null)}
                onClick={() => handleCategoryChange(category.id)}
                index={index}
              />
            ))}
          </div>
        )}

        {/* Regular Categories */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {regularCategories.map((category, index) => (
            <CategoryCard
              key={category.id}
              category={category}
              isActive={activeCategory === category.id}
              isHovered={hoveredCategory === category.id}
              onHover={() => setHoveredCategory(category.id)}
              onLeave={() => setHoveredCategory(null)}
              onClick={() => handleCategoryChange(category.id)}
              index={index}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

interface CategoryCardProps {
  category: {
    id: string
    name: string
    description: string
    image: string
    count: number
    featured?: boolean
  }
  isActive: boolean
  isHovered: boolean
  onHover: () => void
  onLeave: () => void
  onClick: () => void
  index: number
}

function CategoryCard({ category, isActive, isHovered, onHover, onLeave, onClick, index }: CategoryCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className={`group ${isActive ? "ring-2 ring-hovmart-purple" : ""}`}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
    >
      <Link
        href={`/properties?category=${category.id}`}
        className="block h-full"
        onClick={(e) => {
          e.preventDefault()
          onClick()
        }}
      >
        <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 h-full">
          <div className="relative aspect-[3/2] overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent z-10"></div>
            <Image
              src={category.image || "/placeholder.svg"}
              alt={category.name}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute bottom-4 left-4 z-10">
              <h3 className="text-white text-xl font-semibold mb-1">{category.name}</h3>
              <div className="flex items-center text-white/90 text-sm">
                <span>{category.count} properties</span>
              </div>
            </div>
          </div>
          <div className="p-4">
            <p className="text-gray-600 text-sm line-clamp-2 mb-3">{category.description}</p>
            <div className="flex items-center text-hovmart-purple font-medium text-sm">
              <span>Explore properties</span>
              <ChevronRight size={16} className="ml-1" />
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}

function FeaturedCategoryCard({ category, isActive, isHovered, onHover, onLeave, onClick, index }: CategoryCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className={`group ${isActive ? "ring-2 ring-hovmart-purple" : ""}`}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
    >
      <Link
        href={`/properties?category=${category.id}`}
        className="block h-full"
        onClick={(e) => {
          e.preventDefault()
          onClick()
        }}
      >
        <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 h-full relative">
          <div className="absolute top-4 left-4 z-20 bg-hovmart-purple text-white px-3 py-1 rounded-full text-sm font-medium">
            Featured
          </div>
          <div className="md:flex h-full">
            <div className="relative md:w-1/2 aspect-[4/3] md:aspect-auto overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-transparent z-10"></div>
              <Image
                src={category.image || "/placeholder.svg"}
                alt={category.name}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <div className="p-6 md:w-1/2 flex flex-col justify-center">
              <h3 className="text-gray-900 text-xl font-semibold mb-2">{category.name}</h3>
              <p className="text-gray-600 mb-4">{category.description}</p>
              <div className="flex items-center text-sm text-gray-500 mb-4">
                <span>{category.count} properties available</span>
              </div>
              <div className="inline-flex items-center text-hovmart-purple font-medium">
                <span>View all properties</span>
                <ChevronRight size={16} className="ml-1" />
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}
