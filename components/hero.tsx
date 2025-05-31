"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowRight, ChevronRight, MapPin, Building, Home, Star } from "lucide-react"

const heroProperties = [
  {
    id: 1,
    title: "Luxury Ocean View Apartment",
    location: "Victoria Island, Lagos",
    image: "/luxury-ocean-view-apartment.png",
    price: "₦450,000",
    rating: 4.9,
    reviews: 124,
    featured: true,
  },
  {
    id: 2,
    title: "Elegant Villa with Pool",
    location: "Lekki Phase 1, Lagos",
    image: "/elegant-villa-lagos.png",
    price: "₦650,000",
    rating: 4.8,
    reviews: 86,
    featured: true,
  },
  {
    id: 3,
    title: "Modern Penthouse",
    location: "Ikoyi, Lagos",
    image: "/lagos-penthouse-view.png",
    price: "₦520,000",
    rating: 4.7,
    reviews: 92,
    featured: true,
  },
]

export function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isLoaded, setIsLoaded] = useState(false)
  const [autoplay, setAutoplay] = useState(true)

  // Handle autoplay
  useEffect(() => {
    if (!autoplay) return

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroProperties.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [autoplay])

  // Set loaded state after initial render
  useEffect(() => {
    setIsLoaded(true)
  }, [])

  // Pause autoplay when user interacts with slider
  const handleSlideChange = (index: number) => {
    setCurrentSlide(index)
    setAutoplay(false)

    // Resume autoplay after 10 seconds of inactivity
    const timeout = setTimeout(() => {
      setAutoplay(true)
    }, 10000)

    return () => clearTimeout(timeout)
  }

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-gray-50 to-white">
      {/* Decorative elements */}
      <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-amber-300/30 to-transparent"></div>
      <div className="absolute bottom-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-hovmart-purple/20 to-transparent"></div>

      {/* Subtle background pattern */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%239C92AC' fillOpacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
        }}
      ></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20 md:pt-40 md:pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          {/* Left Column - Text Content */}
          <div className="relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="inline-flex items-center px-3 py-1.5 rounded-full bg-gradient-to-r from-hovmart-purple/10 to-amber-400/10 text-hovmart-purple text-sm font-medium mb-6">
                <span className="mr-2">✨</span>
                <span>Premium Real Estate Platform</span>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900 mb-6">
                <span className="block">Discover Your</span>
                <span className="block bg-gradient-to-r from-hovmart-purple to-amber-500 bg-clip-text text-transparent">
                  Dream Property
                </span>
              </h1>

              <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-xl">
                Explore exclusive properties across Nigeria. From luxury apartments to elegant villas, find your perfect
                home with Hovmart.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Link
                  href="/properties"
                  className="inline-flex items-center justify-center px-6 py-3.5 rounded-full bg-gradient-to-r from-hovmart-purple to-hovmart-light text-white font-medium transition-all hover:shadow-lg hover:shadow-hovmart-purple/20 active:scale-[0.98] group"
                >
                  <span>Browse Properties</span>
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center px-6 py-3.5 rounded-full bg-white border border-gray-200 text-gray-800 font-medium transition-all hover:border-hovmart-purple/30 hover:shadow-md active:scale-[0.98]"
                >
                  <span>Contact Us</span>
                </Link>
              </div>

              <div className="flex items-center gap-6">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="w-10 h-10 rounded-full border-2 border-white overflow-hidden shadow-sm">
                      <Image
                        src={`/team/isaac-chindah.jpeg`}
                        alt={`User ${i}`}
                        width={40}
                        height={40}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
                <div>
                  <div className="flex items-center text-amber-500 mb-1">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <p className="text-sm text-gray-600">
                    <span className="font-semibold text-gray-900">4.9/5</span> from over{" "}
                    <span className="font-semibold text-gray-900">2,500+</span> reviews
                  </p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Column - Property Slider */}
          <div className="relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="relative z-10"
            >
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                {/* Main image slider */}
                <div className="relative aspect-[4/3] md:aspect-[16/10] w-full">
                  <AnimatePresence mode="wait">
                    {heroProperties.map(
                      (property, index) =>
                        index === currentSlide && (
                          <motion.div
                            key={property.id}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.5 }}
                            className="absolute inset-0"
                          >
                            <Image
                              src={property.image || "/placeholder.svg"}
                              alt={property.title}
                              fill
                              className="object-cover"
                              priority={index === 0}
                            />

                            {/* Gradient overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>

                            {/* Property info */}
                            <div className="absolute bottom-0 left-0 right-0 p-6">
                              <div className="flex items-start justify-between">
                                <div>
                                  <h3 className="text-xl font-bold text-white mb-1">{property.title}</h3>
                                  <div className="flex items-center text-white/90 mb-2">
                                    <MapPin className="w-4 h-4 mr-1" />
                                    <span className="text-sm">{property.location}</span>
                                  </div>
                                  <div className="flex items-center gap-3">
                                    <div className="flex items-center bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
                                      <Star className="w-3.5 h-3.5 text-amber-400 mr-1" />
                                      <span className="text-xs font-medium text-white">
                                        {property.rating} ({property.reviews})
                                      </span>
                                    </div>
                                    <div className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
                                      <span className="text-xs font-medium text-white">{property.price}/night</span>
                                    </div>
                                  </div>
                                </div>
                                {property.featured && (
                                  <div className="bg-gradient-to-r from-amber-500 to-amber-600 text-white text-xs font-medium px-3 py-1 rounded-full">
                                    Featured
                                  </div>
                                )}
                              </div>
                            </div>
                          </motion.div>
                        ),
                    )}
                  </AnimatePresence>
                </div>

                {/* Navigation dots */}
                <div className="absolute bottom-4 right-4 flex items-center gap-1.5 z-10">
                  {heroProperties.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => handleSlideChange(index)}
                      className={`w-2 h-2 rounded-full transition-all ${
                        index === currentSlide ? "bg-white w-6" : "bg-white/50 hover:bg-white/80"
                      }`}
                      aria-label={`Go to slide ${index + 1}`}
                    />
                  ))}
                </div>
              </div>

              {/* Property cards */}
              <div className="hidden md:flex gap-4 mt-4">
                {heroProperties.map((property, index) => (
                  <button
                    key={property.id}
                    onClick={() => handleSlideChange(index)}
                    className={`relative flex-1 rounded-xl overflow-hidden transition-all ${
                      index === currentSlide
                        ? "ring-2 ring-hovmart-purple ring-offset-2"
                        : "opacity-70 hover:opacity-100"
                    }`}
                  >
                    <div className="relative aspect-[3/2]">
                      <Image
                        src={property.image || "/placeholder.svg"}
                        alt={property.title}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                      <div className="absolute bottom-0 left-0 right-0 p-3">
                        <h4 className="text-sm font-medium text-white line-clamp-1">{property.title}</h4>
                        <p className="text-xs text-white/80 line-clamp-1">{property.location}</p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </motion.div>

            {/* Decorative elements */}
            <div className="absolute -top-6 -right-6 w-24 h-24 bg-gradient-to-br from-amber-400/20 to-hovmart-purple/20 rounded-full blur-2xl"></div>
            <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-gradient-to-tr from-hovmart-purple/20 to-amber-400/20 rounded-full blur-2xl"></div>
          </div>
        </div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-16 md:mt-24"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {/* Premium Properties */}
            <div className="relative overflow-hidden bg-gradient-to-br from-white to-gray-50 border border-gray-100/80 rounded-xl p-6 text-center shadow-lg hover:shadow-xl transition-all group">
              <div className="absolute inset-0 bg-gradient-to-br from-hovmart-purple/5 to-amber-400/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="absolute top-0 left-0 w-24 h-24 bg-gradient-to-br from-hovmart-purple/10 to-transparent rounded-full blur-xl transform -translate-x-12 -translate-y-12"></div>
              <div className="absolute bottom-0 right-0 w-24 h-24 bg-gradient-to-tl from-amber-400/10 to-transparent rounded-full blur-xl transform translate-x-12 translate-y-12"></div>

              <div className="relative">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-r from-hovmart-purple/10 to-amber-400/10 mb-5 transform group-hover:scale-110 transition-transform duration-300">
                  <Building className="w-7 h-7 text-hovmart-purple" />
                </div>
                <div className="text-3xl font-bold bg-gradient-to-r from-hovmart-purple to-amber-500 bg-clip-text text-transparent mb-2">
                  500+
                </div>
                <div className="text-sm font-medium text-gray-700">Premium Properties</div>
              </div>
            </div>

            {/* Cities Covered */}
            <div className="relative overflow-hidden bg-gradient-to-br from-white to-gray-50 border border-gray-100/80 rounded-xl p-6 text-center shadow-lg hover:shadow-xl transition-all group">
              <div className="absolute inset-0 bg-gradient-to-br from-hovmart-purple/5 to-amber-400/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="absolute top-0 left-0 w-24 h-24 bg-gradient-to-br from-hovmart-purple/10 to-transparent rounded-full blur-xl transform -translate-x-12 -translate-y-12"></div>
              <div className="absolute bottom-0 right-0 w-24 h-24 bg-gradient-to-tl from-amber-400/10 to-transparent rounded-full blur-xl transform translate-x-12 translate-y-12"></div>

              <div className="relative">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-r from-hovmart-purple/10 to-amber-400/10 mb-5 transform group-hover:scale-110 transition-transform duration-300">
                  <MapPin className="w-7 h-7 text-hovmart-purple" />
                </div>
                <div className="text-3xl font-bold bg-gradient-to-r from-hovmart-purple to-amber-500 bg-clip-text text-transparent mb-2">
                  20+
                </div>
                <div className="text-sm font-medium text-gray-700">Cities Covered</div>
              </div>
            </div>

            {/* Happy Customers */}
            <div className="relative overflow-hidden bg-gradient-to-br from-white to-gray-50 border border-gray-100/80 rounded-xl p-6 text-center shadow-lg hover:shadow-xl transition-all group">
              <div className="absolute inset-0 bg-gradient-to-br from-hovmart-purple/5 to-amber-400/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="absolute top-0 left-0 w-24 h-24 bg-gradient-to-br from-hovmart-purple/10 to-transparent rounded-full blur-xl transform -translate-x-12 -translate-y-12"></div>
              <div className="absolute bottom-0 right-0 w-24 h-24 bg-gradient-to-tl from-amber-400/10 to-transparent rounded-full blur-xl transform translate-x-12 translate-y-12"></div>

              <div className="relative">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-r from-hovmart-purple/10 to-amber-400/10 mb-5 transform group-hover:scale-110 transition-transform duration-300">
                  <Home className="w-7 h-7 text-hovmart-purple" />
                </div>
                <div className="text-3xl font-bold bg-gradient-to-r from-hovmart-purple to-amber-500 bg-clip-text text-transparent mb-2">
                  1,200+
                </div>
                <div className="text-sm font-medium text-gray-700">Happy Customers</div>
              </div>
            </div>

            {/* Average Rating */}
            <div className="relative overflow-hidden bg-gradient-to-br from-white to-gray-50 border border-gray-100/80 rounded-xl p-6 text-center shadow-lg hover:shadow-xl transition-all group">
              <div className="absolute inset-0 bg-gradient-to-br from-hovmart-purple/5 to-amber-400/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="absolute top-0 left-0 w-24 h-24 bg-gradient-to-br from-hovmart-purple/10 to-transparent rounded-full blur-xl transform -translate-x-12 -translate-y-12"></div>
              <div className="absolute bottom-0 right-0 w-24 h-24 bg-gradient-to-tl from-amber-400/10 to-transparent rounded-full blur-xl transform translate-x-12 translate-y-12"></div>

              <div className="relative">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-r from-hovmart-purple/10 to-amber-400/10 mb-5 transform group-hover:scale-110 transition-transform duration-300">
                  <Star className="w-7 h-7 text-hovmart-purple" />
                </div>
                <div className="text-3xl font-bold bg-gradient-to-r from-hovmart-purple to-amber-500 bg-clip-text text-transparent mb-2">
                  4.9
                </div>
                <div className="text-sm font-medium text-gray-700">Average Rating</div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Featured Categories */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-16 md:mt-24"
        >
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Featured Categories</h2>
            <Link
              href="/properties"
              className="inline-flex items-center text-hovmart-purple hover:text-hovmart-light transition-colors"
            >
              <span className="font-medium">View All</span>
              <ChevronRight className="ml-1 w-5 h-5" />
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {[
              { name: "Luxury Apartments", image: "/luxury-ocean-view-apartment.png", count: 42 },
              { name: "Beachfront Villas", image: "/elegant-villa-lagos.png", count: 28 },
              { name: "City Penthouses", image: "/lagos-penthouse-view.png", count: 36 },
              { name: "Serviced Apartments", image: "/ikeja-serviced-apartment.png", count: 54 },
            ].map((category, index) => (
              <Link key={index} href="/properties" className="group relative rounded-xl overflow-hidden aspect-[4/3]">
                <Image
                  src={category.image || "/placeholder.svg"}
                  alt={category.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <h3 className="text-lg font-semibold text-white mb-1">{category.name}</h3>
                  <p className="text-sm text-white/80">{category.count} properties</p>
                </div>
              </Link>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
