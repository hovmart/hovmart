"use client"

import { useState, useRef, useEffect } from "react"
import { PropertyDetail } from "./property-detail"
import { PropertySimilar } from "./property-similar"
import { PropertyReviews } from "./property-reviews"
import { PropertyAmenities } from "./property-amenities"
import { PropertyMap } from "./property-map"
import { PropertyBooking } from "./property-booking"
import { PropertyGallery } from "./property-gallery"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface Property {
  id: number
  title: string
  location: string
  images: string[]
  price: number
  rating: number
  reviews: number
  dates: string
  favorite: boolean
  featured: boolean
  type: string
  beds: number
  baths: number
  maxGuests: number
  categories: string[]
  amenities: string[]
  owner: {
    id: string
    name: string
    avatar: string
    verified: boolean
    joinedDate: string
    responseRate: number
    responseTime: string
    properties: number
    rating: number
  }
}

interface PropertyDetailsProps {
  property: any
}

export function PropertyDetails({ property }: PropertyDetailsProps) {
  const [isFavorite, setIsFavorite] = useState(false)
  const [isGalleryOpen, setIsGalleryOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("overview")
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [activeTab, setActiveTab] = useState("overview")

  const overviewRef = useRef<HTMLDivElement>(null)
  const amenitiesRef = useRef<HTMLDivElement>(null)
  const locationRef = useRef<HTMLDivElement>(null)
  const reviewsRef = useRef<HTMLDivElement>(null)
  const hostRef = useRef<HTMLDivElement>(null)

  // Check if mobile
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkIfMobile()
    window.addEventListener("resize", checkIfMobile)

    return () => {
      window.removeEventListener("resize", checkIfMobile)
    }
  }, [])

  // Handle scroll for sticky header
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100)

      // Update active section based on scroll position
      const scrollPosition = window.scrollY + 100

      if (overviewRef.current && scrollPosition < overviewRef.current.offsetTop + overviewRef.current.offsetHeight) {
        setActiveSection("overview")
      } else if (
        amenitiesRef.current &&
        scrollPosition < amenitiesRef.current.offsetTop + amenitiesRef.current.offsetHeight
      ) {
        setActiveSection("amenities")
      } else if (
        locationRef.current &&
        scrollPosition < locationRef.current.offsetTop + locationRef.current.offsetHeight
      ) {
        setActiveSection("location")
      } else if (
        reviewsRef.current &&
        scrollPosition < reviewsRef.current.offsetTop + reviewsRef.current.offsetHeight
      ) {
        setActiveSection("reviews")
      } else if (hostRef.current) {
        setActiveSection("host")
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  const scrollToSection = (section: string) => {
    setActiveSection(section)

    let ref
    switch (section) {
      case "overview":
        ref = overviewRef
        break
      case "amenities":
        ref = amenitiesRef
        break
      case "location":
        ref = locationRef
        break
      case "reviews":
        ref = reviewsRef
        break
      case "host":
        ref = hostRef
        break
      default:
        ref = overviewRef
    }

    if (ref.current) {
      window.scrollTo({
        top: ref.current.offsetTop - 80,
        behavior: "smooth",
      })
    }
  }

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite)
  }

  const shareProperty = () => {
    if (navigator.share) {
      navigator.share({
        title: property.title,
        text: `Check out this property: ${property.title} in ${property.location}`,
        url: window.location.href,
      })
    } else {
      // Fallback for browsers that don't support navigator.share
      navigator.clipboard.writeText(window.location.href)
      alert("Link copied to clipboard!")
    }
  }

  return (
    <div className="bg-white min-h-screen">
      {/* Mobile view uses tabs for better UX on small screens */}
      <div className="block lg:hidden">
        <PropertyGallery images={property.images} title={property.title} />

        <div className="container mx-auto px-4 py-6">
          <h1 className="text-2xl font-bold mb-2">{property.title}</h1>
          <p className="text-gray-600 mb-4">{property.location}</p>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid grid-cols-4 mb-8">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="amenities">Amenities</TabsTrigger>
              <TabsTrigger value="location">Location</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
            </TabsList>

            <TabsContent value="overview">
              <PropertyDetail property={property} />
            </TabsContent>

            <TabsContent value="amenities">
              <PropertyAmenities amenities={property.amenities} />
            </TabsContent>

            <TabsContent value="location">
              <PropertyMap location={property.location} />
            </TabsContent>

            <TabsContent value="reviews">
              <PropertyReviews reviews={property.reviews} rating={property.rating} />
            </TabsContent>
          </Tabs>

          <div className="mt-8">
            <PropertyBooking property={property} />
          </div>

          <div className="mt-12">
            <h2 className="text-xl font-bold mb-4">Similar Properties</h2>
            <PropertySimilar propertyId={property.id} />
          </div>
        </div>
      </div>

      {/* Desktop view shows a more comprehensive layout */}
      <div className="hidden lg:block">
        <PropertyDetail property={property} />
      </div>
    </div>
  )
}
