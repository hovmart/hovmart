"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import {
  Heart,
  Share,
  Star,
  MapPin,
  Bed,
  Bath,
  Users,
  Home,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  X,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/hooks/use-toast"

interface PropertyDetailViewProps {
  property: any
}

const sampleProperties = [
  {
    id: "1",
    title: "Luxury Villa in Santorini",
    location: "Santorini, Greece",
    price: 2500000,
    priceType: "sale",
    images: ["/property-1.jpg", "/property-2.jpg"],
    rating: 4.9,
  },
  {
    id: "2",
    title: "Cozy Apartment in Paris",
    location: "Paris, France",
    price: 1800,
    priceType: "monthly",
    images: ["/property-2.jpg", "/property-3.jpg"],
    rating: 4.7,
  },
  {
    id: "3",
    title: "Beachfront House in Bali",
    location: "Bali, Indonesia",
    price: 300,
    priceType: "perNight",
    images: ["/property-3.jpg", "/property-1.jpg"],
    rating: 4.8,
  },
  {
    id: "4",
    title: "Modern Loft in New York",
    location: "New York, USA",
    price: 3500,
    priceType: "monthly",
    images: ["/property-4.jpg", "/property-2.jpg"],
    rating: 4.6,
  },
]

export function PropertyDetailView({ property }: PropertyDetailViewProps) {
  const router = useRouter()
  const { toast } = useToast()
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isFavorite, setIsFavorite] = useState(false)
  const [showAllPhotos, setShowAllPhotos] = useState(false)
  const [guests, setGuests] = useState(1)
  const [checkInDate, setCheckInDate] = useState("")
  const [checkOutDate, setCheckOutDate] = useState("")
  const [showDatePicker, setShowDatePicker] = useState(false)
  const [showGuestSelector, setShowGuestSelector] = useState(false)

  const handleNextImage = () => {
    setCurrentImageIndex((prev) => (prev === property.images.length - 1 ? 0 : prev + 1))
  }

  const handlePrevImage = () => {
    setCurrentImageIndex((prev) => (prev === 0 ? property.images.length - 1 : prev - 1))
  }

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite)
    toast({
      title: isFavorite ? "Removed from favorites" : "Added to favorites",
      description: isFavorite ? "Property removed from your favorites" : "Property added to your favorites",
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

  const amenities = property.amenities || [
    "Wifi",
    "Air conditioning",
    "Kitchen",
    "Washing machine",
    "Free parking",
    "Pool",
    "TV",
  ]

  const bedrooms = property.bedrooms || property.beds || 0
  const bathrooms = property.bathrooms || property.baths || 0
  const maxGuests = property.maxGuests || 2

  return (
    <div className="bg-white min-h-screen">
      {/* Back button */}
      <div className="container mx-auto px-4 py-4">
        <Button
          variant="ghost"
          className="flex items-center text-gray-600 hover:text-gray-900"
          onClick={() => router.back()}
        >
          <ChevronLeft className="h-4 w-4 mr-1" />
          Back to properties
        </Button>
      </div>

      {/* Property Gallery */}
      <div className="relative">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 rounded-xl overflow-hidden">
            <div className="col-span-1 md:col-span-2 lg:col-span-2 relative aspect-[16/9] md:aspect-[4/3]">
              <Image
                src={property.images[currentImageIndex] || "/placeholder.svg"}
                alt={property.title}
                fill
                className="object-cover"
                priority
              />
            </div>
            <div className="hidden lg:grid grid-rows-2 gap-2 h-full">
              {property.images.slice(1, 3).map((image: string, index: number) => (
                <div key={index} className="relative aspect-[4/3]">
                  <Image src={image || "/placeholder.svg"} alt={property.title} fill className="object-cover" />
                </div>
              ))}
            </div>

            {/* Gallery navigation */}
            <div className="absolute inset-0 flex items-center justify-between p-4 pointer-events-none">
              <Button
                variant="secondary"
                size="icon"
                className="rounded-full bg-white/80 backdrop-blur-sm hover:bg-white pointer-events-auto"
                onClick={handlePrevImage}
              >
                <ChevronLeft className="h-5 w-5" />
                <span className="sr-only">Previous</span>
              </Button>
              <Button
                variant="secondary"
                size="icon"
                className="rounded-full bg-white/80 backdrop-blur-sm hover:bg-white pointer-events-auto"
                onClick={handleNextImage}
              >
                <ChevronRight className="h-5 w-5" />
                <span className="sr-only">Next</span>
              </Button>
            </div>

            {/* View all photos button */}
            <Button
              variant="secondary"
              className="absolute bottom-4 right-4 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white"
              onClick={() => setShowAllPhotos(true)}
            >
              View all photos
            </Button>
          </div>
        </div>
      </div>

      {/* Property Details */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {/* Property Header */}
            <div className="mb-6">
              <div className="flex items-center justify-between">
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900">{property.title}</h1>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="rounded-full flex items-center gap-1"
                    onClick={handleShare}
                  >
                    <Share className="h-4 w-4" />
                    <span className="hidden sm:inline">Share</span>
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className={`rounded-full flex items-center gap-1 ${
                      isFavorite ? "bg-pink-50 text-pink-600 border-pink-200" : ""
                    }`}
                    onClick={toggleFavorite}
                  >
                    <Heart className={`h-4 w-4 ${isFavorite ? "fill-pink-600" : ""}`} />
                    <span className="hidden sm:inline">{isFavorite ? "Saved" : "Save"}</span>
                  </Button>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mt-2">
                <div className="flex items-center">
                  <Star className="h-4 w-4 text-yellow-500 fill-yellow-500 mr-1" />
                  <span className="font-medium">{property.rating || 4.9}</span>
                  <span className="text-gray-500 ml-1">({property.reviews || property.reviewCount || 42} reviews)</span>
                </div>
                <span className="text-gray-300">•</span>
                <div className="flex items-center text-gray-700">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span>{property.location}</span>
                </div>
              </div>
            </div>

            {/* Property Highlights */}
            <div className="flex flex-wrap gap-4 py-4 border-t border-b mb-8">
              <div className="flex items-center">
                <Home className="h-5 w-5 text-gray-500 mr-2" />
                <span>{property.propertyType || property.type || "Property"}</span>
              </div>
              {bedrooms > 0 && (
                <div className="flex items-center">
                  <Bed className="h-5 w-5 text-gray-500 mr-2" />
                  <span>
                    {bedrooms} {bedrooms === 1 ? "bed" : "beds"}
                  </span>
                </div>
              )}
              {bathrooms > 0 && (
                <div className="flex items-center">
                  <Bath className="h-5 w-5 text-gray-500 mr-2" />
                  <span>
                    {bathrooms} {bathrooms === 1 ? "bath" : "baths"}
                  </span>
                </div>
              )}
              {maxGuests > 0 && (
                <div className="flex items-center">
                  <Users className="h-5 w-5 text-gray-500 mr-2" />
                  <span>
                    {maxGuests} {maxGuests === 1 ? "guest" : "guests"}
                  </span>
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
                      `Experience luxury living in this beautiful property located in the heart of ${
                        property.location
                      }. This stunning property offers ${bedrooms} spacious bedroom${
                        bedrooms !== 1 ? "s" : ""
                      } and ${bathrooms} modern bathroom${
                        bathrooms !== 1 ? "s" : ""
                      }, perfect for accommodating up to ${maxGuests} guest${maxGuests !== 1 ? "s" : ""}.`}
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    The property features a blend of contemporary design and comfort, with high-end finishes and
                    thoughtful amenities throughout. Enjoy the convenience of a fully equipped kitchen, comfortable
                    living spaces, and premium furnishings that create a welcoming atmosphere.
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    Whether you're visiting for business or leisure, this property provides the perfect base to explore
                    the vibrant surroundings of {property.location}. With its prime location, you'll have easy access to
                    local attractions, dining, shopping, and entertainment options.
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
                    <div key={index} className="flex items-center gap-3 p-3 rounded-lg border">
                      <div className="bg-gray-100 p-2 rounded-full">
                        <div className="h-5 w-5 text-hovmart-purple" />
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
                  <span className="text-xl font-semibold">{property.rating || 4.9}</span>
                  <span className="text-gray-500">·</span>
                  <span className="text-gray-700">{property.reviews || property.reviewCount || 42} reviews</span>
                </div>

                <div className="space-y-6">
                  {[1, 2, 3].map((review) => (
                    <div key={review} className="border-b pb-6 last:border-0">
                      <div className="flex items-center gap-3 mb-3">
                        <Avatar className="h-10 w-10">
                          <AvatarImage
                            src={`/woman-portrait${review === 1 ? "" : `-${review}`}.png`}
                            alt={`Reviewer ${review}`}
                          />
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
            <div className="sticky top-4 bg-white rounded-xl border shadow-lg p-6">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <span className="text-2xl font-bold">{formatPrice(property.price)}</span>
                  <span className="text-gray-500"> / {getPriceLabel()}</span>
                </div>
                <div className="flex items-center">
                  <Star className="h-4 w-4 text-yellow-500 fill-yellow-500 mr-1" />
                  <span className="font-medium">{property.rating || 4.9}</span>
                  <span className="text-gray-500 ml-1">({property.reviews || property.reviewCount || 42})</span>
                </div>
              </div>

              {/* Booking form */}
              <div className="border border-gray-200 rounded-lg overflow-hidden mb-6">
                {/* Date selection */}
                <div className="grid grid-cols-2 divide-x divide-gray-200 border-b">
                  <button
                    onClick={() => setShowDatePicker(true)}
                    className="p-3 text-left hover:bg-gray-50 transition-colors"
                  >
                    <label className="block text-xs font-medium text-gray-500 mb-1">CHECK-IN</label>
                    <div className="text-gray-900">
                      {checkInDate
                        ? new Date(checkInDate).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })
                        : "Add date"}
                    </div>
                  </button>
                  <button
                    onClick={() => setShowDatePicker(true)}
                    className="p-3 text-left hover:bg-gray-50 transition-colors"
                  >
                    <label className="block text-xs font-medium text-gray-500 mb-1">CHECKOUT</label>
                    <div className="text-gray-900">
                      {checkOutDate
                        ? new Date(checkOutDate).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })
                        : "Add date"}
                    </div>
                  </button>
                </div>

                {/* Guest selection */}
                <button
                  onClick={() => setShowGuestSelector(!showGuestSelector)}
                  className="p-3 w-full text-left hover:bg-gray-50 transition-colors relative"
                >
                  <label className="block text-xs font-medium text-gray-500 mb-1">GUESTS</label>
                  <div className="flex justify-between items-center">
                    <div className="text-gray-900">
                      {guests} {guests === 1 ? "guest" : "guests"}
                    </div>
                    <div className="text-gray-400">
                      <ChevronDown
                        className={`h-4 w-4 transition-transform ${showGuestSelector ? "rotate-180" : ""}`}
                      />
                    </div>
                  </div>

                  {/* Guest selector popup */}
                  {showGuestSelector && (
                    <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-xl border border-gray-200 p-4 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <h3 className="font-medium">Guests</h3>
                          <p className="text-sm text-gray-500">This place allows up to {maxGuests} guests</p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between py-2">
                        <span>Adults</span>
                        <div className="flex items-center gap-3">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8 rounded-full"
                            onClick={(e) => {
                              e.stopPropagation()
                              setGuests(Math.max(1, guests - 1))
                            }}
                            disabled={guests <= 1}
                          >
                            <span>-</span>
                          </Button>
                          <span className="w-6 text-center">{guests}</span>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8 rounded-full"
                            onClick={(e) => {
                              e.stopPropagation()
                              setGuests(Math.min(maxGuests, guests + 1))
                            }}
                            disabled={guests >= maxGuests}
                          >
                            <span>+</span>
                          </Button>
                        </div>
                      </div>

                      <Button
                        className="w-full mt-4 bg-hovmart-purple hover:bg-hovmart-light text-white"
                        onClick={(e) => {
                          e.stopPropagation()
                          setShowGuestSelector(false)
                        }}
                      >
                        Done
                      </Button>
                    </div>
                  )}
                </button>
              </div>

              {/* Date picker popup */}
              {showDatePicker && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                  <div className="absolute inset-0" onClick={() => setShowDatePicker(false)}></div>
                  <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-4 relative animate-in fade-in zoom-in-95 duration-200">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="font-medium text-lg">Select dates</h3>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="rounded-full"
                        onClick={() => setShowDatePicker(false)}
                      >
                        <X className="h-5 w-5" />
                      </Button>
                    </div>

                    <div className="p-2">
                      <div className="grid grid-cols-7 gap-1 mb-2">
                        {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day) => (
                          <div key={day} className="text-center text-sm font-medium text-gray-500 py-1">
                            {day}
                          </div>
                        ))}
                      </div>

                      <div className="grid grid-cols-7 gap-1">
                        {Array.from({ length: 31 }, (_, i) => i + 1).map((date) => (
                          <button
                            key={date}
                            className={`aspect-square rounded-full flex items-center justify-center text-sm
                              ${date === 15 ? "bg-hovmart-purple text-white" : "hover:bg-gray-100"}
                              ${date < 15 ? "text-gray-400" : "text-gray-900"}
                            `}
                            onClick={() => {
                              // Demo functionality - in real app would set actual dates
                              if (date >= 15) {
                                if (!checkInDate) {
                                  setCheckInDate(new Date(2023, 5, date).toISOString())
                                } else if (!checkOutDate) {
                                  setCheckOutDate(new Date(2023, 5, date).toISOString())
                                  setShowDatePicker(false)
                                } else {
                                  setCheckInDate(new Date(2023, 5, date).toISOString())
                                  setCheckOutDate("")
                                }
                              }
                            }}
                          >
                            {date}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="flex justify-between items-center mt-4 pt-4 border-t">
                      <div>
                        {checkInDate && (
                          <div className="text-sm">
                            <span className="font-medium">Selected: </span>
                            {checkInDate && new Date(checkInDate).toLocaleDateString()}
                            {checkOutDate && ` → ${new Date(checkOutDate).toLocaleDateString()}`}
                          </div>
                        )}
                      </div>
                      <Button
                        variant="outline"
                        onClick={() => {
                          setCheckInDate("")
                          setCheckOutDate("")
                        }}
                      >
                        Clear
                      </Button>
                    </div>
                  </div>
                </div>
              )}

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
                    {formatPrice(property.price)} x {property.priceType === "perNight" ? "5 nights" : "1"}
                  </span>
                  <span>{formatPrice(property.price * (property.priceType === "perNight" ? 5 : 1))}</span>
                </div>
                <div className="flex justify-between">
                  <span className="underline">Service fee</span>
                  <span>{formatPrice(15000)}</span>
                </div>
                <div className="pt-3 border-t flex justify-between font-bold">
                  <span>Total</span>
                  <span>{formatPrice(property.price * (property.priceType === "perNight" ? 5 : 1) + 15000)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Similar properties */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-6">Similar properties you may like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {sampleProperties
              .filter((p) => p.id !== property.id)
              .slice(0, 4)
              .map((similarProperty) => (
                <Link
                  key={similarProperty.id}
                  href={`/properties/${similarProperty.id}`}
                  className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow"
                >
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={similarProperty.images[0] || "/placeholder.svg"}
                      alt={similarProperty.title}
                      fill
                      className="object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-4">
                    <div className="flex justify-between">
                      <h3 className="font-medium text-gray-900">{similarProperty.title}</h3>
                      <div className="flex items-center">
                        <Star className="h-4 w-4 text-yellow-500 fill-yellow-500 mr-1" />
                        <span>{similarProperty.rating || 4.8}</span>
                      </div>
                    </div>
                    <p className="text-gray-500 text-sm">{similarProperty.location}</p>
                    <p className="mt-2">
                      <span className="font-semibold">
                        {new Intl.NumberFormat("en-NG", {
                          style: "currency",
                          currency: "NGN",
                          maximumFractionDigits: 0,
                        }).format(similarProperty.price)}
                      </span>
                      <span className="text-gray-500">
                        {" "}
                        / {similarProperty.priceType === "perNight" ? "night" : similarProperty.priceType || "month"}
                      </span>
                    </p>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </div>
    </div>
  )
}
