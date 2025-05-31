"use client"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import {
  Heart,
  Share,
  Star,
  MapPin,
  Bed,
  Bath,
  Users,
  Calendar,
  ChevronLeft,
  ChevronRight,
  Wifi,
  Tv,
  Car,
  UtensilsCrossed,
  Snowflake,
  Waves,
  Coffee,
  ShowerHead,
  Dumbbell,
  Lock,
  Sparkles,
} from "lucide-react"

interface Property {
  id: number
  title: string
  location: string
  price: number
  images: string[]
  rating: number
  reviews: number
  available: boolean
  type: string
  beds: number
  baths: number
  maxGuests: number
  amenities: string[]
  description: string
  host?: {
    name: string
    image: string
    rating: number
    responseRate: number
    responseTime: string
    joined: string
  }
  featured?: boolean
}

interface PropertyViewProps {
  property: Property
}

// Mock properties data
const properties: Property[] = [
  {
    id: 1,
    title: "Luxury Villa in Santorini",
    location: "Santorini, Greece",
    price: 550,
    images: [
      "/property-1-1.jpg",
      "/property-1-2.jpg",
      "/property-1-3.jpg",
      "/property-1-4.jpg",
      "/property-1-5.jpg",
      "/property-1-6.jpg",
    ],
    rating: 4.8,
    reviews: 120,
    available: true,
    type: "Villa",
    beds: 4,
    baths: 3,
    maxGuests: 8,
    amenities: ["Wifi", "Pool", "Air conditioning", "Kitchen", "Parking"],
    description: "Experience luxury in this stunning villa with breathtaking views of the Aegean Sea.",
  },
  {
    id: 2,
    title: "Cozy Apartment in Paris",
    location: "Paris, France",
    price: 280,
    images: [
      "/property-2-1.jpg",
      "/property-2-2.jpg",
      "/property-2-3.jpg",
      "/property-2-4.jpg",
      "/property-2-5.jpg",
      "/property-2-6.jpg",
    ],
    rating: 4.5,
    reviews: 85,
    available: true,
    type: "Apartment",
    beds: 1,
    baths: 1,
    maxGuests: 2,
    amenities: ["Wifi", "Kitchen", "Heating", "TV"],
    description: "Enjoy a romantic getaway in this charming apartment located in the heart of Paris.",
  },
  {
    id: 3,
    title: "Beachfront House in Bali",
    location: "Bali, Indonesia",
    price: 420,
    images: [
      "/property-3-1.jpg",
      "/property-3-2.jpg",
      "/property-3-3.jpg",
      "/property-3-4.jpg",
      "/property-3-5.jpg",
      "/property-3-6.jpg",
    ],
    rating: 4.9,
    reviews: 150,
    available: true,
    type: "House",
    beds: 3,
    baths: 2,
    maxGuests: 6,
    amenities: ["Wifi", "Pool", "Air conditioning", "Kitchen", "Beach access"],
    description: "Wake up to the sound of waves in this beautiful beachfront house with a private pool.",
  },
  {
    id: 4,
    title: "Mountain Cabin in Aspen",
    location: "Aspen, USA",
    price: 350,
    images: [
      "/property-4-1.jpg",
      "/property-4-2.jpg",
      "/property-4-3.jpg",
      "/property-4-4.jpg",
      "/property-4-5.jpg",
      "/property-4-6.jpg",
    ],
    rating: 4.7,
    reviews: 95,
    available: true,
    type: "Cabin",
    beds: 2,
    baths: 1,
    maxGuests: 4,
    amenities: ["Wifi", "Kitchen", "Heating", "Fireplace", "Mountain view"],
    description: "Escape to the mountains in this cozy cabin with stunning views and a warm fireplace.",
  },
  {
    id: 5,
    title: "Modern Loft in New York",
    location: "New York, USA",
    price: 600,
    images: [
      "/property-5-1.jpg",
      "/property-5-2.jpg",
      "/property-5-3.jpg",
      "/property-5-4.jpg",
      "/property-5-5.jpg",
      "/property-5-6.jpg",
    ],
    rating: 4.6,
    reviews: 110,
    available: true,
    type: "Loft",
    beds: 2,
    baths: 2,
    maxGuests: 4,
    amenities: ["Wifi", "Air conditioning", "Kitchen", "Gym", "City view"],
    description: "Experience the vibrant city life in this modern loft with amazing views of New York.",
  },
]

export function PropertyView({ property }: PropertyViewProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isFavorite, setIsFavorite] = useState(false)
  const [showAllAmenities, setShowAllAmenities] = useState(false)
  const [checkInDate, setCheckInDate] = useState<Date | null>(null)
  const [checkOutDate, setCheckOutDate] = useState<Date | null>(null)
  const [guests, setGuests] = useState(1)
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false)
  const [isShareModalOpen, setIsShareModalOpen] = useState(false)
  const [isGalleryModalOpen, setIsGalleryModalOpen] = useState(false)
  const [galleryImageIndex, setGalleryImageIndex] = useState(0)
  const [isSticky, setIsSticky] = useState(false)

  const bookingSummaryRef = useRef<HTMLDivElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)

  // Handle scroll for sticky booking summary
  useEffect(() => {
    const handleScroll = () => {
      if (headerRef.current && bookingSummaryRef.current) {
        const headerBottom = headerRef.current.getBoundingClientRect().bottom
        setIsSticky(headerBottom < 0)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Format price
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      maximumFractionDigits: 0,
    }).format(price)
  }

  // Calculate total price
  const calculateTotalPrice = () => {
    if (!checkInDate || !checkOutDate) return property.price

    const nights = Math.ceil((checkOutDate.getTime() - checkInDate.getTime()) / (1000 * 60 * 60 * 24))
    return property.price * nights
  }

  // Get amenity icon
  const getAmenityIcon = (amenity: string) => {
    const amenityLower = amenity.toLowerCase()
    if (amenityLower.includes("wifi")) return <Wifi className="h-5 w-5" />
    if (amenityLower.includes("tv")) return <Tv className="h-5 w-5" />
    if (amenityLower.includes("parking")) return <Car className="h-5 w-5" />
    if (amenityLower.includes("kitchen")) return <UtensilsCrossed className="h-5 w-5" />
    if (amenityLower.includes("air")) return <Snowflake className="h-5 w-5" />
    if (amenityLower.includes("pool")) return <Waves className="h-5 w-5" />
    if (amenityLower.includes("coffee")) return <Coffee className="h-5 w-5" />
    if (amenityLower.includes("shower")) return <ShowerHead className="h-5 w-5" />
    if (amenityLower.includes("gym")) return <Dumbbell className="h-5 w-5" />
    if (amenityLower.includes("security")) return <Lock className="h-5 w-5" />
    return <Sparkles className="h-5 w-5" />
  }

  // Next image in gallery
  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev === property.images.length - 1 ? 0 : prev + 1))
  }

  // Previous image in gallery
  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev === 0 ? property.images.length - 1 : prev - 1))
  }

  // Open gallery modal
  const openGallery = (index: number) => {
    setGalleryImageIndex(index)
    setIsGalleryModalOpen(true)
    document.body.style.overflow = "hidden"
  }

  // Close gallery modal
  const closeGallery = () => {
    setIsGalleryModalOpen(false)
    document.body.style.overflow = "auto"
  }

  // Next image in gallery modal
  const nextGalleryImage = () => {
    setGalleryImageIndex((prev) => (prev === property.images.length - 1 ? 0 : prev + 1))
  }

  // Previous image in gallery modal
  const prevGalleryImage = () => {
    setGalleryImageIndex((prev) => (prev === 0 ? property.images.length - 1 : prev - 1))
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Property Header */}
      <div ref={headerRef} className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">{property.title}</h1>
        <div className="flex flex-wrap items-center justify-between gap-y-2">
          <div className="flex items-center gap-4">
            <div className="flex items-center">
              <Star className="h-5 w-5 text-hovmart-purple fill-hovmart-purple mr-1" />
              <span className="font-medium">{property.rating}</span>
              <span className="text-gray-600 ml-1">({property.reviews} reviews)</span>
            </div>
            <div className="flex items-center">
              <MapPin className="h-5 w-5 text-gray-500 mr-1" />
              <span>{property.location}</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsShareModalOpen(true)}
              className="flex items-center gap-1 px-3 py-1.5 rounded-full border border-gray-300 hover:bg-gray-50 transition-colors"
            >
              <Share className="h-4 w-4" />
              <span>Share</span>
            </button>
            <button
              onClick={() => setIsFavorite(!isFavorite)}
              className="flex items-center gap-1 px-3 py-1.5 rounded-full border border-gray-300 hover:bg-gray-50 transition-colors"
            >
              <Heart className={`h-4 w-4 ${isFavorite ? "fill-hovmart-purple text-hovmart-purple" : ""}`} />
              <span>Save</span>
            </button>
          </div>
        </div>
      </div>

      {/* Property Gallery */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-8">
        <div className="relative aspect-[4/3] rounded-tl-xl rounded-bl-xl overflow-hidden">
          <Image
            src={property.images[0] || "/placeholder.svg"}
            alt={`${property.title} - Main Image`}
            fill
            className="object-cover cursor-pointer hover:scale-105 transition-transform duration-300"
            onClick={() => openGallery(0)}
          />
        </div>
        <div className="grid grid-cols-2 gap-2">
          {property.images.slice(1, 5).map((image, index) => (
            <div
              key={index}
              className={`relative aspect-[4/3] overflow-hidden ${
                index === 0 ? "rounded-tr-xl" : index === 2 ? "rounded-br-xl" : ""
              }`}
            >
              <Image
                src={image || "/placeholder.svg"}
                alt={`${property.title} - Image ${index + 2}`}
                fill
                className="object-cover cursor-pointer hover:scale-105 transition-transform duration-300"
                onClick={() => openGallery(index + 1)}
              />
              {index === 3 && property.images.length > 5 && (
                <div
                  className="absolute inset-0 bg-black/50 flex items-center justify-center cursor-pointer"
                  onClick={() => openGallery(4)}
                >
                  <span className="text-white text-lg font-medium">+{property.images.length - 5} more</span>
                </div>
              )}
            </div>
          ))}
        </div>
        <button
          className="absolute bottom-4 right-4 bg-white rounded-full px-4 py-2 shadow-md flex items-center gap-2 hover:bg-gray-50 transition-colors"
          onClick={() => openGallery(0)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path
              fillRule="evenodd"
              d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
              clipRule="evenodd"
            />
          </svg>
          <span>View all photos</span>
        </button>
      </div>

      {/* Property Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Property Details */}
        <div className="lg:col-span-2">
          {/* Property Overview */}
          <div className="border-b border-gray-200 pb-6 mb-6">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-xl font-semibold mb-2">
                  {property.type} hosted by {property.host?.name || "Hovmart Host"}
                </h2>
                <div className="flex items-center gap-4 text-gray-600">
                  <div className="flex items-center">
                    <Bed className="h-5 w-5 mr-1" />
                    <span>{property.beds} beds</span>
                  </div>
                  <div className="flex items-center">
                    <Bath className="h-5 w-5 mr-1" />
                    <span>{property.baths} baths</span>
                  </div>
                  <div className="flex items-center">
                    <Users className="h-5 w-5 mr-1" />
                    <span>{property.maxGuests} guests</span>
                  </div>
                </div>
              </div>
              {property.host && (
                <div className="relative h-14 w-14 rounded-full overflow-hidden">
                  <Image
                    src={property.host.image || "/placeholder.svg?query=person"}
                    alt={property.host.name}
                    fill
                    className="object-cover"
                  />
                </div>
              )}
            </div>
          </div>

          {/* Property Description */}
          <div className="border-b border-gray-200 pb-6 mb-6">
            <h2 className="text-xl font-semibold mb-4">About this place</h2>
            <p className="text-gray-600 whitespace-pre-line">
              {property.description ||
                `Experience luxury and comfort in this beautiful ${property.type.toLowerCase()} located in the heart of ${property.location}. This property features ${property.beds} spacious bedrooms, ${property.baths} modern bathrooms, and can accommodate up to ${property.maxGuests} guests.

Enjoy the stunning views, premium amenities, and convenient location. Perfect for family vacations, business trips, or romantic getaways.

The space is thoughtfully designed with your comfort in mind, featuring high-end furnishings, modern appliances, and elegant decor throughout.`}
            </p>
          </div>

          {/* Property Amenities */}
          <div className="border-b border-gray-200 pb-6 mb-6">
            <h2 className="text-xl font-semibold mb-4">What this place offers</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {(showAllAmenities ? property.amenities : property.amenities.slice(0, 8)).map((amenity, index) => (
                <div key={index} className="flex items-center gap-3">
                  {getAmenityIcon(amenity)}
                  <span>{amenity}</span>
                </div>
              ))}
            </div>
            {property.amenities.length > 8 && (
              <button
                onClick={() => setShowAllAmenities(!showAllAmenities)}
                className="mt-4 px-4 py-2 border border-gray-900 rounded-lg font-medium hover:bg-gray-100 transition-colors"
              >
                {showAllAmenities ? "Show less" : `Show all ${property.amenities.length} amenities`}
              </button>
            )}
          </div>

          {/* Calendar */}
          <div className="border-b border-gray-200 pb-6 mb-6">
            <h2 className="text-xl font-semibold mb-4">Availability</h2>
            <div className="bg-gray-50 p-4 rounded-lg text-center">
              <Calendar className="h-12 w-12 mx-auto text-hovmart-purple mb-2" />
              <p className="text-gray-600">Check the calendar for available dates</p>
              <button
                onClick={() => setIsBookingModalOpen(true)}
                className="mt-3 px-4 py-2 bg-hovmart-purple text-white rounded-lg hover:bg-hovmart-light transition-colors"
              >
                View availability calendar
              </button>
            </div>
          </div>

          {/* Location */}
          <div className="border-b border-gray-200 pb-6 mb-6">
            <h2 className="text-xl font-semibold mb-4">Location</h2>
            <div className="aspect-[16/9] bg-gray-200 rounded-lg relative overflow-hidden">
              {/* Mock Map */}
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

                {/* Property Location Pin */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <div className="bg-hovmart-purple text-white rounded-full p-2 shadow-lg">
                    <MapPin className="h-6 w-6" />
                  </div>
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full w-0 h-0 border-l-8 border-r-8 border-b-8 border-l-transparent border-r-transparent border-b-hovmart-purple"></div>
                </div>
              </div>

              <div className="absolute bottom-4 left-4 bg-white p-3 rounded-lg shadow-md">
                <h3 className="font-medium mb-1">{property.location}</h3>
                <p className="text-sm text-gray-600">Exact location provided after booking</p>
              </div>
            </div>
          </div>

          {/* Host Information */}
          {property.host && (
            <div className="border-b border-gray-200 pb-6 mb-6">
              <h2 className="text-xl font-semibold mb-4">Meet your host</h2>
              <div className="flex items-start gap-4">
                <div className="relative h-16 w-16 rounded-full overflow-hidden flex-shrink-0">
                  <Image
                    src={property.host.image || "/placeholder.svg?query=person"}
                    alt={property.host.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-medium text-lg">{property.host.name}</h3>
                  <p className="text-gray-600">Joined in {property.host.joined || "January 2023"}</p>
                  <div className="flex items-center mt-2">
                    <Star className="h-4 w-4 text-hovmart-purple fill-hovmart-purple mr-1" />
                    <span>{property.host.rating || "4.9"} · </span>
                    <span className="ml-1">{property.host.responseRate || "95"}% response rate · </span>
                    <span className="ml-1">Responds in {property.host.responseTime || "an hour"}</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Reviews */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Reviews</h2>
              <div className="flex items-center">
                <Star className="h-5 w-5 text-hovmart-purple fill-hovmart-purple mr-1" />
                <span className="font-medium">{property.rating}</span>
                <span className="text-gray-600 ml-1">({property.reviews} reviews)</span>
              </div>
            </div>

            {/* Review Categories */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              {["Cleanliness", "Communication", "Check-in", "Accuracy", "Location", "Value"].map((category) => (
                <div key={category} className="flex items-center justify-between">
                  <span className="text-gray-600">{category}</span>
                  <div className="flex items-center">
                    <div className="w-24 h-1 bg-gray-200 rounded-full overflow-hidden mr-2">
                      <div
                        className="h-full bg-hovmart-purple rounded-full"
                        style={{ width: `${Math.floor(Math.random() * 20) + 80}%` }}
                      ></div>
                    </div>
                    <span className="text-sm font-medium">{(4 + Math.random()).toFixed(1)}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Sample Reviews */}
            <div className="space-y-6">
              {[
                {
                  name: "Sarah Johnson",
                  date: "August 2023",
                  avatar: "/woman-portrait.png",
                  text: "Absolutely loved our stay here! The property was exactly as described, and the location was perfect. The host was very responsive and helpful throughout our stay.",
                },
                {
                  name: "Michael Chen",
                  date: "July 2023",
                  avatar: "/thoughtful-man-portrait.png",
                  text: "Great place with amazing amenities. Very clean and comfortable. Would definitely stay here again on our next visit.",
                },
                {
                  name: "Olivia Williams",
                  date: "June 2023",
                  avatar: "/woman-portrait-2.png",
                  text: "The property exceeded our expectations. Beautiful views and very spacious. The host provided excellent recommendations for local attractions and restaurants.",
                },
              ].map((review, index) => (
                <div key={index} className="border-t border-gray-200 pt-4">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="relative h-12 w-12 rounded-full overflow-hidden">
                      <Image
                        src={review.avatar || "/placeholder.svg?query=person"}
                        alt={review.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="font-medium">{review.name}</h3>
                      <p className="text-gray-600 text-sm">{review.date}</p>
                    </div>
                  </div>
                  <p className="text-gray-600">{review.text}</p>
                </div>
              ))}
            </div>

            <button className="mt-6 px-4 py-2 border border-gray-900 rounded-lg font-medium hover:bg-gray-100 transition-colors">
              Show all {property.reviews} reviews
            </button>
          </div>
        </div>

        {/* Right Column - Booking Summary */}
        <div className="lg:col-span-1">
          <div
            ref={bookingSummaryRef}
            className={`bg-white rounded-xl border border-gray-200 shadow-md p-6 ${
              isSticky ? "lg:sticky lg:top-24" : ""
            }`}
          >
            <div className="flex items-baseline justify-between mb-6">
              <div>
                <span className="text-2xl font-bold">{formatPrice(property.price)}</span>
                <span className="text-gray-600"> night</span>
              </div>
              <div className="flex items-center">
                <Star className="h-4 w-4 text-hovmart-purple fill-hovmart-purple mr-1" />
                <span className="font-medium">{property.rating}</span>
                <span className="text-gray-600 ml-1">({property.reviews} reviews)</span>
              </div>
            </div>

            {/* Booking Form */}
            <div className="border border-gray-300 rounded-lg overflow-hidden mb-4">
              <div className="grid grid-cols-2 divide-x divide-gray-300">
                <div className="p-3">
                  <label className="block text-xs font-medium mb-1">CHECK-IN</label>
                  <input
                    type="date"
                    className="w-full border-none p-0 focus:ring-0 text-gray-900"
                    onChange={(e) => setCheckInDate(e.target.value ? new Date(e.target.value) : null)}
                  />
                </div>
                <div className="p-3">
                  <label className="block text-xs font-medium mb-1">CHECKOUT</label>
                  <input
                    type="date"
                    className="w-full border-none p-0 focus:ring-0 text-gray-900"
                    onChange={(e) => setCheckOutDate(e.target.value ? new Date(e.target.value) : null)}
                  />
                </div>
              </div>
              <div className="border-t border-gray-300 p-3">
                <label className="block text-xs font-medium mb-1">GUESTS</label>
                <select
                  className="w-full border-none p-0 focus:ring-0 text-gray-900"
                  value={guests}
                  onChange={(e) => setGuests(Number(e.target.value))}
                >
                  {Array.from({ length: property.maxGuests }, (_, i) => i + 1).map((num) => (
                    <option key={num} value={num}>
                      {num} {num === 1 ? "guest" : "guests"}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <button className="w-full bg-hovmart-purple text-white py-3 rounded-lg font-medium hover:bg-hovmart-light transition-colors mb-4">
              Reserve
            </button>
            <p className="text-center text-gray-600 mb-6">You won't be charged yet</p>

            {/* Price Breakdown */}
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="underline">{formatPrice(property.price)} x 5 nights</span>
                <span>{formatPrice(property.price * 5)}</span>
              </div>
              <div className="flex justify-between">
                <span className="underline">Cleaning fee</span>
                <span>{formatPrice(property.price * 0.1)}</span>
              </div>
              <div className="flex justify-between">
                <span className="underline">Service fee</span>
                <span>{formatPrice(property.price * 0.15)}</span>
              </div>
              <div className="pt-3 mt-3 border-t border-gray-300 flex justify-between font-bold">
                <span>Total before taxes</span>
                <span>{formatPrice(property.price * 5 + property.price * 0.1 + property.price * 0.15)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Similar Properties */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-6">Similar properties you may like</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {properties
            .filter((p) => p.id !== property.id)
            .slice(0, 4)
            .map((similarProperty) => (
              <Link
                key={similarProperty.id}
                href={`/properties/view/${similarProperty.id}`}
                className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={similarProperty.images[0] || "/placeholder.svg"}
                    alt={similarProperty.title}
                    fill
                    className="object-cover transition-transform duration-500 hover:scale-105"
                  />
                </div>
                <div className="p-4">
                  <div className="flex justify-between items-start">
                    <h3 className="font-medium text-gray-900 line-clamp-1">{similarProperty.title}</h3>
                    <div className="flex items-center gap-1 text-sm whitespace-nowrap ml-2">
                      <Star className="h-4 w-4 fill-hovmart-purple text-hovmart-purple flex-shrink-0" />
                      <span>{similarProperty.rating}</span>
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm mt-1">{similarProperty.location}</p>
                  <p className="mt-2">
                    <span className="font-semibold">{formatPrice(similarProperty.price)}</span>
                    <span className="text-gray-600"> night</span>
                  </p>
                </div>
              </Link>
            ))}
        </div>
      </div>

      {/* Gallery Modal */}
      <AnimatePresence>
        {isGalleryModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black z-50 flex items-center justify-center p-4"
          >
            <button
              onClick={closeGallery}
              className="absolute top-4 left-4 text-white bg-black/50 rounded-full p-2 hover:bg-black/70 transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div className="absolute top-4 right-4 text-white bg-black/50 rounded-full px-3 py-1.5">
              {galleryImageIndex + 1} / {property.images.length}
            </div>

            <div className="relative w-full max-w-4xl aspect-[4/3]">
              <Image
                src={property.images[galleryImageIndex] || "/placeholder.svg"}
                alt={`${property.title} - Gallery Image ${galleryImageIndex + 1}`}
                fill
                className="object-contain"
              />
            </div>

            <button
              onClick={prevGalleryImage}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white bg-black/50 rounded-full p-2 hover:bg-black/70 transition-colors"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>

            <button
              onClick={nextGalleryImage}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white bg-black/50 rounded-full p-2 hover:bg-black/70 transition-colors"
            >
              <ChevronRight className="h-6 w-6" />
            </button>

            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-1.5">
              {property.images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setGalleryImageIndex(index)}
                  className={`w-2 h-2 rounded-full ${index === galleryImageIndex ? "bg-white" : "bg-white/50"}`}
                ></button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
