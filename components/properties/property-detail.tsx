"use client"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import {
  Heart,
  Share,
  MapPin,
  Users,
  Bed,
  Bath,
  Home,
  ChevronLeft,
  ChevronRight,
  Star,
  Shield,
  Award,
  Check,
  X,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/hooks/use-toast"

interface PropertyDetailProps {
  property: any
}

export function PropertyDetail({ property }: PropertyDetailProps) {
  const { toast } = useToast()
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [showAllPhotos, setShowAllPhotos] = useState(false)
  const [isFavorite, setIsFavorite] = useState(false)
  const [checkInDate, setCheckInDate] = useState<Date | null>(null)
  const [checkOutDate, setCheckOutDate] = useState<Date | null>(null)
  const [guests, setGuests] = useState(1)
  const [isSticky, setIsSticky] = useState(false)
  const bookingRef = useRef<HTMLDivElement>(null)
  const galleryRef = useRef<HTMLDivElement>(null)

  // Handle scroll for sticky booking form
  useEffect(() => {
    const handleScroll = () => {
      if (galleryRef.current && bookingRef.current) {
        const galleryBottom = galleryRef.current.getBoundingClientRect().bottom
        setIsSticky(galleryBottom < 0)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleNextImage = () => {
    setCurrentImageIndex((prev) => (prev === property.images.length - 1 ? 0 : prev + 1))
  }

  const handlePrevImage = () => {
    setCurrentImageIndex((prev) => (prev === 0 ? property.images.length - 1 : prev))
  }

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite)
    toast({
      title: isFavorite ? "Removed from favorites" : "Added to favorites",
      description: isFavorite
        ? "This property has been removed from your favorites"
        : "This property has been added to your favorites",
    })
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: property.title,
        text: `Check out this property: ${property.title}`,
        url: window.location.href,
      })
    } else {
      navigator.clipboard.writeText(window.location.href)
      toast({
        title: "Link copied",
        description: "Property link has been copied to clipboard",
      })
    }
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      maximumFractionDigits: 0,
    }).format(price)
  }

  const getPriceLabel = () => {
    switch (property.priceType) {
      case "nightly":
        return "night"
      case "monthly":
        return "month"
      case "yearly":
        return "year"
      case "sale":
        return "sale price"
      default:
        return "night"
    }
  }

  const getPropertyTypeLabel = () => {
    const type = property.propertyType || property.type || "Property"
    return type.charAt(0).toUpperCase() + type.slice(1)
  }

  const amenities = property.amenities || [
    "Wifi",
    "Air conditioning",
    "Kitchen",
    "Washing machine",
    "Free parking",
    "Pool",
    "TV",
    "Workspace",
    "Heating",
  ]

  return (
    <div className="bg-white">
      {/* Property Gallery */}
      <div ref={galleryRef} className="relative">
        {/* Back button */}
        <div className="absolute top-4 left-4 z-10">
          <Link href="/properties">
            <Button
              variant="secondary"
              size="icon"
              className="rounded-full bg-white/80 backdrop-blur-sm hover:bg-white"
            >
              <ChevronLeft className="h-5 w-5" />
              <span className="sr-only">Back</span>
            </Button>
          </Link>
        </div>

        {/* Action buttons */}
        <div className="absolute top-4 right-4 z-10 flex items-center gap-2">
          <Button
            variant="secondary"
            size="sm"
            className="rounded-full bg-white/80 backdrop-blur-sm hover:bg-white flex items-center gap-1.5"
            onClick={handleShare}
          >
            <Share className="h-4 w-4" />
            <span className="hidden sm:inline">Share</span>
          </Button>
          <Button
            variant="secondary"
            size="sm"
            className={`rounded-full ${
              isFavorite ? "bg-pink-50 text-pink-600" : "bg-white/80 backdrop-blur-sm hover:bg-white"
            } flex items-center gap-1.5`}
            onClick={toggleFavorite}
          >
            <Heart className={`h-4 w-4 ${isFavorite ? "fill-pink-600" : ""}`} />
            <span className="hidden sm:inline">{isFavorite ? "Saved" : "Save"}</span>
          </Button>
        </div>

        {/* Main gallery */}
        <div className="relative h-[50vh] md:h-[65vh] overflow-hidden">
          <AnimatePresence initial={false}>
            <motion.div
              key={currentImageIndex}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0"
            >
              <Image
                src={property.images[currentImageIndex] || "/placeholder.svg"}
                alt={property.title}
                fill
                className="object-cover"
                priority
              />
            </motion.div>
          </AnimatePresence>

          {/* Gallery navigation */}
          <div className="absolute inset-0 flex items-center justify-between p-4">
            <Button
              variant="secondary"
              size="icon"
              className="rounded-full bg-white/80 backdrop-blur-sm hover:bg-white"
              onClick={handlePrevImage}
            >
              <ChevronLeft className="h-5 w-5" />
              <span className="sr-only">Previous</span>
            </Button>
            <Button
              variant="secondary"
              size="icon"
              className="rounded-full bg-white/80 backdrop-blur-sm hover:bg-white"
              onClick={handleNextImage}
            >
              <ChevronRight className="h-5 w-5" />
              <span className="sr-only">Next</span>
            </Button>
          </div>

          {/* Image counter and view all button */}
          <div className="absolute bottom-4 left-0 right-0 flex justify-center">
            <Button
              variant="secondary"
              className="rounded-full bg-white/80 backdrop-blur-sm hover:bg-white"
              onClick={() => setShowAllPhotos(true)}
            >
              <span className="mr-2">
                {currentImageIndex + 1}/{property.images.length}
              </span>
              <span>View all photos</span>
            </Button>
          </div>
        </div>

        {/* Thumbnail strip */}
        <div className="hidden md:flex overflow-x-auto gap-2 p-2 bg-white border-b">
          {property.images.map((image: string, index: number) => (
            <button
              key={index}
              className={`relative w-20 h-20 flex-shrink-0 rounded-md overflow-hidden ${
                index === currentImageIndex ? "ring-2 ring-hovmart-purple" : "opacity-70 hover:opacity-100"
              }`}
              onClick={() => setCurrentImageIndex(index)}
            >
              <Image
                src={image || "/placeholder.svg"}
                alt={`${property.title} - ${index + 1}`}
                fill
                className="object-cover"
              />
            </button>
          ))}
        </div>
      </div>

      {/* Full screen gallery */}
      {showAllPhotos && (
        <div className="fixed inset-0 bg-white z-50 overflow-y-auto">
          <div className="sticky top-0 z-10 bg-white p-4 border-b flex justify-between items-center">
            <Button variant="ghost" onClick={() => setShowAllPhotos(false)}>
              <X className="h-5 w-5 mr-2" />
              Close photos
            </Button>
            <span className="text-sm font-medium">
              {currentImageIndex + 1} / {property.images.length}
            </span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
            {property.images.map((image: string, index: number) => (
              <div key={index} className="relative aspect-[4/3] rounded-lg overflow-hidden">
                <Image
                  src={image || "/placeholder.svg"}
                  alt={`${property.title} - ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Property details */}
          <div className="lg:col-span-2">
            <div className="mb-6">
              <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold text-gray-900">{property.title}</h1>
                {property.verified && (
                  <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                    <Shield className="h-3.5 w-3.5 mr-1" />
                    Verified
                  </Badge>
                )}
              </div>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mt-2">
                <div className="flex items-center">
                  <Star className="h-4 w-4 text-yellow-500 fill-yellow-500 mr-1" />
                  <span className="font-medium">{property.rating || "4.9"}</span>
                  <span className="text-gray-500 ml-1">({property.reviews || "42"} reviews)</span>
                </div>
                <span className="text-gray-300">•</span>
                <div className="flex items-center text-gray-700">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span>{property.location}</span>
                </div>
                {property.superhost && (
                  <>
                    <span className="text-gray-300">•</span>
                    <Badge variant="outline" className="bg-rose-50 text-rose-700 border-rose-200">
                      <Award className="h-3.5 w-3.5 mr-1" />
                      Superhost
                    </Badge>
                  </>
                )}
              </div>
            </div>

            {/* Property highlights */}
            <div className="flex flex-wrap gap-4 py-4 border-t border-b mb-8">
              <div className="flex items-center">
                <Home className="h-5 w-5 text-gray-500 mr-2" />
                <span>{getPropertyTypeLabel()}</span>
              </div>
              {property.beds && (
                <div className="flex items-center">
                  <Bed className="h-5 w-5 text-gray-500 mr-2" />
                  <span>
                    {property.beds} {property.beds === 1 ? "bed" : "beds"}
                  </span>
                </div>
              )}
              {property.baths && (
                <div className="flex items-center">
                  <Bath className="h-5 w-5 text-gray-500 mr-2" />
                  <span>
                    {property.baths} {property.baths === 1 ? "bath" : "baths"}
                  </span>
                </div>
              )}
              {property.maxGuests && (
                <div className="flex items-center">
                  <Users className="h-5 w-5 text-gray-500 mr-2" />
                  <span>
                    {property.maxGuests} {property.maxGuests === 1 ? "guest" : "guests"}
                  </span>
                </div>
              )}
              {property.landSize && (
                <div className="flex items-center">
                  <MapPin className="h-5 w-5 text-gray-500 mr-2" />
                  <span>{property.landSize} sqm</span>
                </div>
              )}
            </div>

            {/* Tabs for different sections */}
            <Tabs defaultValue="overview" className="mb-12">
              <TabsList className="mb-6">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="amenities">Amenities</TabsTrigger>
                <TabsTrigger value="location">Location</TabsTrigger>
                <TabsTrigger value="reviews">Reviews</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-6">
                <div className="prose max-w-none">
                  <p className="text-gray-700 leading-relaxed">
                    {property.description ||
                      `Experience luxury living in this beautiful ${getPropertyTypeLabel().toLowerCase()} located in the heart of ${
                        property.location
                      }. This stunning property offers ${property.beds || 3} spacious bedroom${
                        property.beds !== 1 ? "s" : ""
                      } and ${property.baths || 2} modern bathroom${
                        property.baths !== 1 ? "s" : ""
                      }, perfect for accommodating up to ${property.maxGuests || 6} guest${
                        property.maxGuests !== 1 ? "s" : ""
                      }.`}
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    The property features a blend of contemporary design and comfort, with high-end finishes and
                    thoughtful amenities throughout. Enjoy the convenience of a fully equipped kitchen, comfortable
                    living spaces, and premium furnishings that create a welcoming atmosphere.
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    Whether you're visiting for business or leisure, this {getPropertyTypeLabel().toLowerCase()}{" "}
                    provides the perfect base to explore the vibrant surroundings of {property.location}. With its prime
                    location, you'll have easy access to local attractions, dining, shopping, and entertainment options.
                  </p>
                </div>

                {/* Host information */}
                <div className="bg-gray-50 rounded-xl p-6 mt-8">
                  <div className="flex items-start gap-4">
                    <Avatar className="h-16 w-16 border-2 border-white shadow-sm">
                      <AvatarImage src="/thoughtful-man-portrait.png" alt="Host" />
                      <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="text-lg font-semibold">Hosted by John Doe</h3>
                      <p className="text-gray-500 text-sm">Host since January 2020</p>
                      <div className="flex items-center mt-1">
                        <Star className="h-4 w-4 text-yellow-500 fill-yellow-500 mr-1" />
                        <span className="text-sm font-medium">4.98</span>
                        <span className="text-sm text-gray-500 ml-1">· 124 reviews</span>
                      </div>
                      <Button variant="link" className="p-0 h-auto text-hovmart-purple mt-2">
                        Contact host
                      </Button>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="amenities" className="space-y-6">
                <h3 className="text-xl font-semibold mb-4">What this place offers</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {amenities.map((amenity: string, index: number) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className="bg-gray-100 p-2 rounded-full">
                        <Check className="h-5 w-5 text-hovmart-purple" />
                      </div>
                      <span>{amenity}</span>
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="location" className="space-y-6">
                <h3 className="text-xl font-semibold mb-4">Where you'll be</h3>
                <div className="aspect-video bg-gray-100 rounded-xl relative overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <MapPin className="h-12 w-12 text-hovmart-purple mx-auto mb-3 opacity-50" />
                      <p className="font-medium text-lg">{property.location}</p>
                      <p className="text-gray-500 mt-2">Map view coming soon</p>
                    </div>
                  </div>
                </div>
                <div className="mt-4">
                  <h4 className="font-medium mb-2">About the area</h4>
                  <p className="text-gray-700">
                    Located in {property.location}, this property offers easy access to local attractions, restaurants,
                    and shopping centers. The neighborhood is known for its safety and vibrant atmosphere.
                  </p>
                </div>
              </TabsContent>

              <TabsContent value="reviews" className="space-y-6">
                <div className="flex items-center gap-2 mb-6">
                  <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                  <span className="text-xl font-semibold">{property.rating || "4.9"}</span>
                  <span className="text-gray-500">·</span>
                  <span className="text-gray-700">{property.reviews || "42"} reviews</span>
                </div>

                <div className="space-y-6">
                  {[1, 2, 3].map((review) => (
                    <div key={review} className="border-b pb-6 last:border-0">
                      <div className="flex items-center gap-3 mb-3">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={`/woman-portrait-${review}.png`} alt={`Reviewer ${review}`} />
                          <AvatarFallback>U{review}</AvatarFallback>
                        </Avatar>
                        <div>
                          <h4 className="font-medium">Sarah Johnson</h4>
                          <p className="text-gray-500 text-sm">March 2023</p>
                        </div>
                      </div>
                      <p className="text-gray-700">
                        Amazing property! The location is perfect and the amenities are top-notch. We had a wonderful
                        stay and would definitely come back again. The host was very responsive and helpful.
                      </p>
                    </div>
                  ))}
                </div>

                <Button variant="outline" className="w-full">
                  Show all reviews
                </Button>
              </TabsContent>
            </Tabs>
          </div>

          {/* Booking section */}
          <div className="lg:col-span-1">
            <div
              ref={bookingRef}
              className={`${isSticky ? "lg:sticky lg:top-4" : ""} bg-white rounded-xl border shadow-lg p-6`}
            >
              <div className="flex justify-between items-start mb-6">
                <div>
                  <span className="text-2xl font-bold">{formatPrice(property.price)}</span>
                  <span className="text-gray-500"> / {getPriceLabel()}</span>
                </div>
                <div className="flex items-center">
                  <Star className="h-4 w-4 text-yellow-500 fill-yellow-500 mr-1" />
                  <span className="font-medium">{property.rating || "4.9"}</span>
                  <span className="text-gray-500 ml-1">({property.reviews || "42"})</span>
                </div>
              </div>

              {/* Booking form */}
              <div className="border border-gray-200 rounded-lg overflow-hidden mb-6">
                <div className="grid grid-cols-2 divide-x divide-gray-200 border-b">
                  <div className="p-3">
                    <label className="block text-xs font-medium text-gray-500 mb-1">CHECK-IN</label>
                    <div className="text-gray-900">{checkInDate ? checkInDate.toLocaleDateString() : "Add date"}</div>
                  </div>
                  <div className="p-3">
                    <label className="block text-xs font-medium text-gray-500 mb-1">CHECKOUT</label>
                    <div className="text-gray-900">{checkOutDate ? checkOutDate.toLocaleDateString() : "Add date"}</div>
                  </div>
                </div>
                <div className="p-3 border-b">
                  <label className="block text-xs font-medium text-gray-500 mb-1">GUESTS</label>
                  <div className="flex justify-between items-center">
                    <div className="text-gray-900">
                      {guests} {guests === 1 ? "guest" : "guests"}
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-7 w-7 rounded-full"
                        onClick={() => setGuests(Math.max(1, guests - 1))}
                        disabled={guests <= 1}
                      >
                        <span>-</span>
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-7 w-7 rounded-full"
                        onClick={() => setGuests(Math.min(property.maxGuests || 10, guests + 1))}
                        disabled={guests >= (property.maxGuests || 10)}
                      >
                        <span>+</span>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              <Button className="w-full mb-4 bg-gradient-to-r from-hovmart-purple to-hovmart-light hover:from-hovmart-light hover:to-hovmart-purple text-white">
                {property.priceType === "sale" ? "Contact agent" : "Reserve"}
              </Button>

              <p className="text-center text-sm text-gray-500 mb-6">
                {property.priceType === "sale" ? "No payment charged yet" : "You won't be charged yet"}
              </p>

              {/* Price breakdown */}
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="underline">
                    {formatPrice(property.price)} x {property.priceType === "nightly" ? "5 nights" : "1"}
                  </span>
                  <span>{formatPrice(property.price * (property.priceType === "nightly" ? 5 : 1))}</span>
                </div>
                <div className="flex justify-between">
                  <span className="underline">Cleaning fee</span>
                  <span>{formatPrice(25000)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="underline">Service fee</span>
                  <span>{formatPrice(15000)}</span>
                </div>
                <div className="pt-3 border-t flex justify-between font-bold">
                  <span>Total</span>
                  <span>
                    {formatPrice(property.price * (property.priceType === "nightly" ? 5 : 1) + 25000 + 15000)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Similar properties */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-6">Similar properties you may like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: 4 }).map((_, index) => (
              <div
                key={index}
                className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={`/elegant-villa-lagos.png`}
                    alt="Similar property"
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-300"
                  />
                  {index === 0 && (
                    <div className="absolute top-3 left-3">
                      <Badge className="bg-white/90 text-gray-900 backdrop-blur-sm">Superhost</Badge>
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <div className="flex justify-between">
                    <h3 className="font-medium text-gray-900">Luxury Villa in Lagos</h3>
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-500 fill-yellow-500 mr-1" />
                      <span>4.92</span>
                    </div>
                  </div>
                  <p className="text-gray-500 text-sm">Ikoyi, Lagos</p>
                  <p className="mt-2">
                    <span className="font-semibold">₦120,000</span>
                    <span className="text-gray-500"> night</span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
