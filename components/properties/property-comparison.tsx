"use client"

import type React from "react"

import { useState, useEffect, useRef, useMemo } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import {
  X,
  Plus,
  ChevronDown,
  ChevronUp,
  Check,
  Star,
  Home,
  Bed,
  Bath,
  Users,
  Wifi,
  UtensilsCrossed,
  Wind,
  Shirt,
  Car,
  PocketKnife,
  ShieldCheck,
  Dumbbell,
  Waves,
  Search,
  ArrowRight,
  Heart,
  Share2,
  ExternalLink,
  MapPin,
  DollarSign,
  Camera,
  Info,
  Maximize,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  BarChart3,
  Zap,
  Award,
  ThumbsUp,
  Download,
  Calendar,
  Clock,
  Printer,
  Mail,
  SlidersHorizontal,
  Lightbulb,
  Trophy,
  AlertCircle,
  Percent,
  Wallet,
  CreditCard,
  Bookmark,
} from "lucide-react"
import { properties } from "@/data/properties"
import { motion, AnimatePresence } from "framer-motion"
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  BarChart,
  Bar,
} from "recharts"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/hooks/use-toast"

export default function PropertyComparison() {
  const [selectedProperties, setSelectedProperties] = useState<number[]>([])
  const [showPropertySelector, setShowPropertySelector] = useState(false)
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    basics: true,
    amenities: true,
    pricing: true,
    location: true,
    photos: true,
    reviews: false,
    visualization: false,
    availability: true,
  })
  const [searchTerm, setSearchTerm] = useState("")
  const [activeTab, setActiveTab] = useState("all")
  const [highlightDifferences, setHighlightDifferences] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState<Record<number, number>>({})
  const [showFullScreenImage, setShowFullScreenImage] = useState<{
    show: boolean
    propertyId: number
    imageIndex: number
  } | null>(null)
  const [comparisonScore, setComparisonScore] = useState<Record<number, number>>({})
  const [sortOption, setSortOption] = useState("price")
  const [viewMode, setViewMode] = useState<"detailed" | "compact">("detailed")
  const [favoriteProperties, setFavoriteProperties] = useState<number[]>([])
  const [showShareOptions, setShowShareOptions] = useState(false)
  const [showPrintPreview, setShowPrintPreview] = useState(false)
  const router = useRouter()
  const scrollRef = useRef<HTMLDivElement>(null)
  const [reviewsSection, setReviewsSection] = useState("summary")
  const [comparisonMode, setComparisonMode] = useState<"side-by-side" | "chart">("side-by-side")
  const [savedComparisons, setSavedComparisons] = useState<number[][]>([])
  const [showSaveDialog, setShowSaveDialog] = useState(false)
  const [comparisonName, setComparisonName] = useState("")
  const [activeMetric, setActiveMetric] = useState("price")
  const { toast } = useToast()

  // Initialize with some properties for demo purposes
  useEffect(() => {
    setSelectedProperties([1, 3])
  }, [])

  // Calculate comparison scores when properties change
  useEffect(() => {
    const newScores: Record<number, number> = {}

    selectedPropertiesData.forEach((property) => {
      // Calculate a score based on various factors (more sophisticated algorithm)
      let score = 0

      // Rating contributes up to 25 points
      score += property.rating * 5

      // Amenities contribute up to 25 points (5 points each for first 5)
      score += Math.min(property.amenities.length, 5) * 5

      // Beds and baths contribute up to 15 points
      score += Math.min(property.beds + property.baths, 3) * 5

      // Price (lower is better) - up to 20 points
      const maxPrice = Math.max(...selectedPropertiesData.map((p) => p.price))
      const minPrice = Math.min(...selectedPropertiesData.map((p) => p.price))
      const priceRange = maxPrice - minPrice

      if (priceRange > 0) {
        // Normalize price to 0-20 points (inverse - lower price gets more points)
        score += 20 - ((property.price - minPrice) / priceRange) * 20
      } else {
        // If all prices are the same
        score += 10
      }

      // Location factor - up to 15 points
      // For demo, we'll assign random points based on property ID
      score += (property.id % 3) * 5

      newScores[property.id] = Math.round(Math.min(Math.max(score, 0), 100))
    })

    setComparisonScore(newScores)
  }, [selectedProperties])

  const toggleSection = (section: string) => {
    setExpandedSections({
      ...expandedSections,
      [section]: !expandedSections[section],
    })
  }

  const addProperty = (id: number) => {
    if (selectedProperties.length < 3 && !selectedProperties.includes(id)) {
      setSelectedProperties([...selectedProperties, id])
      // Initialize current image index for this property
      setCurrentImageIndex((prev) => ({ ...prev, [id]: 0 }))
    }
    setShowPropertySelector(false)
    setSearchTerm("")
  }

  const removeProperty = (id: number) => {
    setSelectedProperties(selectedProperties.filter((propId) => propId !== id))
    // Remove current image index for this property
    const newImageIndices = { ...currentImageIndex }
    delete newImageIndices[id]
    setCurrentImageIndex(newImageIndices)
  }

  const nextImage = (propertyId: number) => {
    const property = properties.find((p) => p.id === propertyId)
    if (!property) return

    setCurrentImageIndex((prev) => ({
      ...prev,
      [propertyId]: (prev[propertyId] + 1) % property.images.length,
    }))
  }

  const prevImage = (propertyId: number) => {
    const property = properties.find((p) => p.id === propertyId)
    if (!property) return

    setCurrentImageIndex((prev) => ({
      ...prev,
      [propertyId]: (prev[propertyId] - 1 + property.images.length) % property.images.length,
    }))
  }

  const openFullScreenImage = (propertyId: number, imageIndex: number) => {
    setShowFullScreenImage({
      show: true,
      propertyId,
      imageIndex,
    })
  }

  const closeFullScreenImage = () => {
    setShowFullScreenImage(null)
  }

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId)
    if (section) {
      section.scrollIntoView({ behavior: "smooth" })
    }
  }

  // Map amenities to icons
  const amenityIcons: Record<string, React.ReactNode> = {
    Wifi: <Wifi className="h-5 w-5" />,
    Kitchen: <UtensilsCrossed className="h-5 w-5" />,
    "Air conditioning": <Wind className="h-5 w-5" />,
    "Washing machine": <Shirt className="h-5 w-5" />,
    "Free parking": <Car className="h-5 w-5" />,
    Pool: <PocketKnife className="h-5 w-5" />,
    Security: <ShieldCheck className="h-5 w-5" />,
    "Gym access": <Dumbbell className="h-5 w-5" />,
    "Beach access": <Waves className="h-5 w-5" />,
  }

  // Get selected properties data
  const selectedPropertiesData = properties.filter((property) => selectedProperties.includes(property.id))

  // Get all unique amenities from selected properties
  const allAmenities = Array.from(new Set(selectedPropertiesData.flatMap((property) => property.amenities))).sort()

  // Filter properties based on search term and active tab
  const filteredProperties = properties.filter((property) => {
    // Don't show already selected properties
    if (selectedProperties.includes(property.id)) return false

    // Filter by search term
    const matchesSearch =
      property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      property.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      property.type.toLowerCase().includes(searchTerm.toLowerCase())

    // Filter by tab
    const matchesTab =
      activeTab === "all" ||
      (activeTab === "apartment" && property.type.toLowerCase().includes("apartment")) ||
      (activeTab === "house" && property.type.toLowerCase().includes("house")) ||
      (activeTab === "villa" && property.type.toLowerCase().includes("villa"))

    return matchesSearch && matchesTab
  })

  // Check if a value is different across properties
  const isDifferent = (key: string, value: any) => {
    if (!highlightDifferences || selectedPropertiesData.length <= 1) return false

    const values = selectedPropertiesData.map((p) => {
      if (key === "price") return p.price
      if (key === "rating") return p.rating
      if (key === "beds") return p.beds
      if (key === "baths") return p.baths
      if (key === "maxGuests") return p.maxGuests
      if (key === "type") return p.type
      return null
    })

    return values.some((v) => v !== values[0])
  }

  // Find the best value for a given key
  const getBestValue = (key: string) => {
    if (selectedPropertiesData.length <= 1) return null

    if (key === "price") {
      const minPrice = Math.min(...selectedPropertiesData.map((p) => p.price))
      return selectedPropertiesData.find((p) => p.price === minPrice)?.id
    }

    if (key === "rating" || key === "beds" || key === "baths" || key === "maxGuests") {
      const maxValue = Math.max(...selectedPropertiesData.map((p) => p[key]))
      return selectedPropertiesData.find((p) => p[key] === maxValue)?.id
    }

    return null
  }

  // Toggle favorite status for a property
  const toggleFavorite = (id: number, e: React.MouseEvent) => {
    e.stopPropagation()
    setFavoriteProperties((prev) => (prev.includes(id) ? prev.filter((propId) => propId !== id) : [...prev, id]))
  }

  // Share comparison
  const shareComparison = () => {
    setShowShareOptions(!showShareOptions)
  }

  // Print comparison
  const printComparison = () => {
    setShowPrintPreview(true)
    setTimeout(() => {
      window.print()
      setShowPrintPreview(false)
    }, 300)
  }

  // Download comparison as PDF
  const downloadComparison = () => {
    // In a real app, this would generate and download a PDF
    alert("Downloading comparison as PDF...")
  }

  // Sort properties based on selected option
  const sortedProperties = useMemo(() => {
    return [...selectedPropertiesData].sort((a, b) => {
      switch (sortOption) {
        case "price":
          return a.price - b.price
        case "price-desc":
          return b.price - a.price
        case "rating":
          return b.rating - a.rating
        case "beds":
          return b.beds - a.beds
        default:
          return 0
      }
    })
  }, [selectedPropertiesData, sortOption])

  // Save current comparison
  const saveComparison = () => {
    if (comparisonName.trim() === "") {
      toast({
        title: "Please enter a comparison name",
        description: "Enter a name to save this property comparison",
        variant: "destructive",
      })
      return
    }

    const newSavedComparison = {
      id: Date.now(),
      name: comparisonName,
      properties: selectedProperties,
      date: new Date().toISOString(),
    }

    // In a real app this would be saved to a database or local storage
    setSavedComparisons([...savedComparisons, selectedProperties])
    setShowSaveDialog(false)
    setComparisonName("")

    toast({
      title: "Comparison saved!",
      description: `Your comparison "${comparisonName}" has been saved.`,
    })
  }

  // Generate chart data
  const generateChartData = () => {
    return sortedProperties.map((property) => {
      return {
        name: property.title.split(" ")[0],
        price: property.price,
        rating: property.rating * 20, // Scale to be comparable
        beds: property.beds * 5000, // Scale to be comparable
        baths: property.baths * 5000, // Scale to be comparable
        amenities: property.amenities.length * 3000, // Scale to be comparable
        score: comparisonScore[property.id],
      }
    })
  }

  // Generate score breakdown data
  const generateScoreData = (propertyId) => {
    const property = properties.find((p) => p.id === propertyId)
    if (!property) return []

    return [
      { name: "Rating", value: property.rating * 5, fill: "#8884d8" },
      { name: "Amenities", value: Math.min(property.amenities.length, 5) * 5, fill: "#83a6ed" },
      { name: "Beds & Baths", value: Math.min(property.beds + property.baths, 3) * 5, fill: "#8dd1e1" },
      { name: "Price", value: 20 - Math.ceil(property.price / 10000), fill: "#82ca9d" },
      { name: "Location", value: (property.id % 3) * 5, fill: "#a4de6c" },
    ]
  }

  // Get reviews for a property (demo data)
  const getPropertyReviews = (propertyId) => {
    const reviewTexts = [
      "Absolutely loved staying here! The location was perfect and the amenities were top notch.",
      "Great value for the price. Would definitely stay here again on my next visit.",
      "The host was very responsive and accommodating. Clean and comfortable space.",
      "Beautiful property with amazing views. Just as pictured in the listing.",
      "Convenient location with easy access to restaurants and attractions.",
    ]

    // Generate random reviews based on property ID
    return Array(3 + (propertyId % 3))
      .fill(0)
      .map((_, i) => ({
        id: i,
        user: `Guest ${i + 1}`,
        rating: 4 + (Math.random() > 0.7 ? 1 : 0),
        text: reviewTexts[i % reviewTexts.length],
        date: new Date(Date.now() - i * 30 * 24 * 60 * 60 * 1000).toLocaleDateString(),
      }))
  }

  // Calculate average rating from reviews
  const getAverageRating = (reviews) => {
    return reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length
  }

  // Generate radar chart data
  const generateRadarData = () => {
    return [
      ...sortedProperties.map((property) => ({
        name: property.title.split(" ")[0],
        price: Math.ceil((50000 - property.price) / 5000), // Invert price (lower is better for the chart)
        rating: property.rating * 2,
        beds: property.beds,
        baths: property.baths,
        amenities: property.amenities.length,
        location: (property.id % 5) + 1, // Demo data for location rating
      })),
    ]
  }

  // Share comparison via a link
  const shareViaLink = () => {
    const url = `${window.location.origin}/properties/compare?ids=${selectedProperties.join(",")}`
    navigator.clipboard.writeText(url)

    toast({
      title: "Link copied!",
      description: "Comparison link has been copied to clipboard",
    })
  }

  return (
    <div className="animate-fade-in">
      {/* Full screen image viewer */}
      <AnimatePresence>
        {showFullScreenImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
            onClick={closeFullScreenImage}
          >
            <button
              className="absolute top-4 right-4 text-white p-2 rounded-full bg-black/50 hover:bg-black/70 transition-colors"
              onClick={closeFullScreenImage}
            >
              <X className="h-6 w-6" />
            </button>

            <button
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white p-2 rounded-full bg-black/50 hover:bg-black/70 transition-colors"
              onClick={(e) => {
                e.stopPropagation()
                if (showFullScreenImage) {
                  const property = properties.find((p) => p.id === showFullScreenImage.propertyId)
                  if (property) {
                    const newIndex =
                      (showFullScreenImage.imageIndex - 1 + property.images.length) % property.images.length
                    setShowFullScreenImage({ ...showFullScreenImage, imageIndex: newIndex })
                  }
                }
              }
            }}
          >
            <ChevronLeft className="h-6 w-6" />
          </button>

          <button
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white p-2 rounded-fullll bg-black/50 hover:bg-black/70 transition-colors"
            onClick={(e) => {
              e.stopPropagation()
              if (showFullScreenImage) {
                const property = properties.find((p) => p.id === showFullScreenImage.propertyId)
                if (property) {
                  const newIndex = (showFullScreenImage.imageIndex + 1) % property.images.length
                  setShowFullScreenImage({ ...showFullScreenImage, imageIndex: newIndex })
                }
              }
            }}
          >
            <ChevronRight className="h-6 w-6" />
          </button>

          {showFullScreenImage && (
            <div className="relative w-full max-w-5xl h-[80vh]">
              <Image
                src={
                  properties.find((p) => p.id === showFullScreenImage.propertyId)?.images[
                    showFullScreenImage.imageIndex
                  ] || "/placeholder.svg"
                }
                alt="Property image"
                fill
                className="object-contain"
              />
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white bg-black/50 px-3 py-1 rounded-full text-sm">
                {showFullScreenImage.imageIndex + 1} /{" "}
                {properties.find((p) => p.id === showFullScreenImage.propertyId)?.images.length}
              </div>
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>

    {/* Print preview modal */}
    <AnimatePresence>
      {showPrintPreview && (
        <div className="fixed inset-0 z-50 bg-white p-8 print:block hidden">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-between mb-8 print:hidden">
              <h1 className="text-2xl font-bold">Property Comparison</h1>
              <button 
                onClick={() => setShowPrintPreview(false)}
                className="px-4 py-2 bg-gray-200 rounded-lg"
              >
                Cancel
              </button>
            </div>
            
            <div className="grid grid-cols-4 gap-4 mb-8">
              <div className="col-span-1"></div>
              {sortedProperties.map(property => (
                <div key={property.id} className="col-span-1">
                  <div className="aspect-video relative rounded-lg overflow-hidden mb-2">
                    <Image 
                      src={property.images[0] || "/placeholder.svg"} 
                      alt={property.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <h3 className="font-bold">{property.title}</h3>
                  <p className="text-gray-600 text-sm">{property.location}</p>
                  <p className="font-medium mt-1">₦{property.price.toLocaleString()}/night</p>
                </div>
              ))}
            </div>
            
            {/* Basic info */}
            <div className="mb-8">
              <h2 className="text-xl font-bold mb-4">Basic Information</h2>
              <div className="grid grid-cols-4 gap-4">
                <div className="col-span-1 font-medium">Type</div>
                {sortedProperties.map(property => (
                  <div key={property.id} className="col-span-1">{property.type}</div>
                ))}
              </div>
              <div className="grid grid-cols-4 gap-4 mt-2">
                <div className="col-span-1 font-medium">Beds</div>
                {sortedProperties.map(property => (
                  <div key={property.id} className="col-span-1">{property.beds}</div>
                ))}
              </div>
              <div className="grid grid-cols-4 gap-4 mt-2">
                <div className="col-span-1 font-medium">Baths</div>
                {sortedProperties.map(property => (
                  <div key={property.id} className="col-span-1">{property.baths}</div>
                ))}
              </div>
              <div className="grid grid-cols-4 gap-4 mt-2">
                <div className="col-span-1 font-medium">Max Guests</div>
                {sortedProperties.map(property => (
                  <div key={property.id} className="col-span-1">{property.maxGuests}</div>
                ))}
              </div>
            </div>
            
            {/* Amenities */}
            <div className="mb-8">
              <h2 className="text-xl font-bold mb-4">Amenities</h2>
              {allAmenities.map(amenity => (
                <div key={amenity} className="grid grid-cols-4 gap-4 mt-2">
                  <div className="col-span-1 font-medium">{amenity}</div>
                  {sortedProperties.map(property => (
                    <div key={property.id} className="col-span-1">
                      {property.amenities.includes(amenity) ? "✓" : "✗"}
                    </div>
                  ))}
                </div>
              ))}
            </div>
            
            {/* Pricing */}
            <div>
              <h2 className="text-xl font-bold mb-4">Pricing</h2>
              <div className="grid grid-cols-4 gap-4">
                <div className="col-span-1 font-medium">Price per night</div>
                {sortedProperties.map(property => (
                  <div key={property.id} className="col-span-1">₦{property.price.toLocaleString()}</div>
                ))}
              </div>
              <div className="grid grid-cols-4 gap-4 mt-2">
                <div className="col-span-1 font-medium">5 nights</div>
                {sortedProperties.map(property => (
                  <div key={property.id} className="col-span-1">₦{(property.price * 5).toLocaleString()}</div>
                ))}
              </div>
              <div className="grid grid-cols-4 gap-4 mt-2">
                <div className="col-span-1 font-medium">7 nights</div>
                {sortedProperties.map(property => (
                  <div key={property.id} className="col-span-1">₦{(property.price * 7).toLocaleString()}</div>
                ))}
              </div>
            </div>
            
            <div className="mt-8 text-center text-gray-500 text-sm">
              <p>Generated by Hovmart Limited on {new Date().toLocaleDateString()}</p>
            </div>
          </div>
        </div>
      )}
    </AnimatePresence>

    {/* Share options popover */}
    <AnimatePresence>
      {showShareOptions && (
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          className="fixed bottom-4 right-4 bg-white rounded-xl shadow-lg p-4 z-40 border border-gray-200"
        >
          <div className="flex flex-col space-y-2">
            <button className="flex items-center px-4 py-2 hover:bg-gray-100 rounded-lg transition-colors">
              <Mail className="h-4 w-4 mr-2 text-hovmart-purple" />
              <span>Email</span>
            </button>
            <button className="flex items-center px-4 py-2 hover:bg-gray-100 rounded-lg transition-colors">
              <Download className="h-4 w-4 mr-2 text-hovmart-purple" />
              <span>Download PDF</span>
            </button>
            <button 
              onClick={printComparison}
              className="flex items-center px-4 py-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <Printer className="h-4 w-4 mr-2 text-hovmart-purple" />
              <span>Print</span>
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>

    {/* Save Comparison Dialog */}
    <AnimatePresence>
      {showSaveDialog && (
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-xl shadow-xl p-6 z-50 border border-gray-200 w-full max-w-md"
        >
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Save Comparison</h3>
            <button 
              onClick={() => setShowSaveDialog(false)}
              className="p-1.5 hover:bg-gray-100 rounded-full"
            >
              <X className="h-5 w-5 text-gray-500" />
            </button>
          </div>
          
          <p className="text-sm text-gray-600 mb-4">
            Save this comparison to access it later from your account dashboard.
          </p>
          
          <div className="space-y-4">
            <div>
              <label htmlFor="comparisonName" className="block text-sm font-medium text-gray-700 mb-1">
                Comparison Name
              </label>
              <input
                type="text"
                id="comparisonName"
                value={comparisonName}
                onChange={(e) => setComparisonName(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-hovmart-purple focus:border-hovmart-purple"
                placeholder="e.g., Lagos Apartments"
              />
            </div>
            
            <div className="flex items-center space-x-3">
              <button
                onClick={saveComparison}
                className="flex-1 px-4 py-2 bg-hovmart-purple text-white rounded-lg font-medium hover:bg-hovmart-purple/90 transition-colors"
              >
                Save
              </button>
              <button
                onClick={() => setShowSaveDialog(false)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg font-medium hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>

    <div className="mb-8">
      <h1 className="text-3xl font-bold mb-4 bg-gradient-to-r from-hovmart-purple to-hovmart-light bg-clip-text text-transparent">
        Compare Properties
      </h1>
      <p className="text-gray-600 max-w-3xl">
        Compare different properties side by side to find the perfect match for your needs. Add up to three properties
        to see detailed comparisons of features, amenities, and pricing.
      </p>
    </div>

    {/* Action bar */}
    <div className="mb-6 sticky top-20 z-30 bg-white/80 backdrop-blur-sm rounded-xl p-3 shadow-sm border border-gray-100">
      <div className="flex flex-wrap gap-3 items-center justify-between">
        {/* Quick navigation */}
        <div className="flex-1 overflow-x-auto" ref={scrollRef}>
          <div className="flex space-x-2 pb-1">
            <button
              onClick={() => scrollToSection("property-selection")}
              className="px-3 py-1.5 bg-hovmart-purple/10 rounded-lg text-hovmart-purple text-sm font-medium hover:bg-hovmart-purple/20 transition-colors flex items-center whitespace-nowrap"
            >
              <Home className="h-3.5 w-3.5 mr-1.5" />
              Properties
            </button>
            <button
              onClick={() => scrollToSection("basics-section")}
              className="px-3 py-1.5 bg-hovmart-purple/10 rounded-lg text-hovmart-purple text-sm font-medium hover:bg-hovmart-purple/20 transition-colors flex items-center whitespace-nowrap"
            >
              <Info className="h-3.5 w-3.5 mr-1.5" />
              Basic Info
            </button>
            <button
              onClick={() => scrollToSection("amenities-section")}
              className="px-3 py-1.5 bg-hovmart-purple/10 rounded-lg text-hovmart-purple text-sm font-medium hover:bg-hovmart-purple/20 transition-colors flex items-center whitespace-nowrap"
            >
              <Check className="h-3.5 w-3.5 mr-1.5" />
              Amenities
            </button>
            <button
              onClick={() => scrollToSection("photos-section")}
              className="px-3 py-1.5 bg-hovmart-purple/10 rounded-lg text-hovmart-purple text-sm font-medium hover:bg-hovmart-purple/20 transition-colors flex items-center whitespace-nowrap"
            >
              <Camera className="h-3.5 w-3.5 mr-1.5" />
              Photos
            </button>
            <button
              onClick={() => scrollToSection("location-section")}
              className="px-3 py-1.5 bg-hovmart-purple/10 rounded-lg text-hovmart-purple text-sm font-medium hover:bg-hovmart-purple/20 transition-colors flex items-center whitespace-nowrap"
            >
              <MapPin className="h-3.5 w-3.5 mr-1.5" />
              Location
            </button>
            <button
              onClick={() => scrollToSection("pricing-section")}
              className="px-3 py-1.5 bg-hovmart-purple/10 rounded-lg text-hovmart-purple text-sm font-medium hover:bg-hovmart-purple/20 transition-colors flex items-center whitespace-nowrap"
            >
              <DollarSign className="h-3.5 w-3.5 mr-1.5" />
              Pricing
            </button>
            <button
              onClick={() => scrollToSection("availability-section")}
              className="px-3 py-1.5 bg-hovmart-purple/10 rounded-lg text-hovmart-purple text-sm font-medium hover:bg-hovmart-purple/20 transition-colors flex items-center whitespace-nowrap"
            >
              <Calendar className="h-3.5 w-3.5 mr-1.5" />
              Availability
            </button>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setShowSaveDialog(true)}
            className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
            aria-label="Save comparison"
          >
            <Bookmark className="h-4 w-4 text-hovmart-purple" />
          </button>
          <button
            onClick={shareViaLink}
            className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
            aria-label="Share comparison"
          >
            <Share2 className="h-4 w-4 text-hovmart-purple" />
          </button>
          <button
            onClick={downloadComparison}
            className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
            aria-label="Download comparison"
          >
            <Download className="h-4 w-4 text-hovmart-purple" />
          </button>
          <button
            onClick={printComparison}
            className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
            aria-label="Print comparison"
          >
            <Printer className="h-4 w-4 text-hovmart-purple" />
          </button>
        </div>
      </div>
    </div>

    {/* Comparison tools */}
    {selectedProperties.length > 1 && (
      <div className="mb-6 flex flex-wrap gap-4 items-center justify-between bg-white rounded-xl p-4 shadow-sm border border-gray-100">
        <div className="flex items-center space-x-4">
          <div className="relative inline-flex items-center">
            <input
              type="checkbox"
              id="highlight-differences"
              checked={highlightDifferences}
              onChange={() => setHighlightDifferences(!highlightDifferences)}
              className="sr-only"
            />
            <label
              htmlFor="highlight-differences"
              className={`flex items-center w-12 h-6 rounded-full transition-colors cursor-pointer ${
                highlightDifferences ? "bg-hovmart-purple" : "bg-gray-300"
              }`}
            >
              <span
                className={`inline-block w-5 h-5 transform rounded-full transition-transform bg-white shadow-sm ${
                  highlightDifferences ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </label>
            <span className="ml-2 text-sm font-medium text-gray-700">Highlight differences</span>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => setViewMode("detailed")}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                viewMode === "detailed"
                  ? "bg-hovmart-purple text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              Detailed
            </button>
            <button
              onClick={() => setViewMode("compact")}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                viewMode === "compact"
                  ? "bg-hovmart-purple text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              Compact
            </button>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <SlidersHorizontal className="h-4 w-4 text-gray-500" />
          <select 
            className="py-1.5 px-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-hovmart-purple focus:border-transparent"
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
          >
            <option value="price">Price (low to high)</option>
            <option value="price-desc">Price (high to low)</option>
            <option value="rating">Rating (high to low)</option>
            <option value="beds">Beds (most to least)</option>
          </select>
        </div>
      </div>
    )}

    {/* Property Selection */}
    <div id="property-selection" className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      {sortedProperties.map((property, index) => (
        <motion.div
          key={property.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="bg-white rounded-xl shadow-sm overflow-hidden relative group border border-gray-100 hover:shadow-md transition-all duration-300 premium-card"
        >
          {comparisonScore[property.id] && (
            <div className="absolute top-2 left-2 z-10 bg-white/90 backdrop-blur-sm rounded-lg px-2 py-1 shadow-sm flex items-center">
              <BarChart3 className="h-3.5 w-3.5 text-hovmart-purple mr-1" />
              <span className="text-xs font-medium">{comparisonScore[property.id]}% match</span>
            </div>
          )}

          <button
            onClick={() => removeProperty(property.id)}
            className="absolute top-2 right-2 p-1.5 bg-white/90 backdrop-blur-sm rounded-full shadow-sm z-10 opacity-0 group-hover:opacity-100 transition-opacity"
            aria-label="Remove property"
          >
            <X className="h-4 w-4 text-gray-600" />
          </button>

          <div className="relative aspect-video">
            <Image
              src={property.images[currentImageIndex[property.id] || 0] || "/placeholder.svg"}
              alt={property.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />

            {property.images.length > 1 && (
              <>
                <button
                  onClick={() => prevImage(property.id)}
                  className="absolute left-2 top-1/2 transform -translate-y-1/2 p-1.5 bg-white/80 backdrop-blur-sm rounded-full shadow-sm z-10 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <ChevronLeft className="h-4 w-4 text-gray-600" />
                </button>

                <button
                  onClick={() => nextImage(property.id)}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1.5 bg-white/80 backdrop-blur-sm rounded-full shadow-sm z-10 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <ChevronRight className="h-4 w-4 text-gray-600" />
                </button>

                <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-1">
                  {property.images.slice(0, 5).map((_, imgIndex) => (
                    <button
                      key={imgIndex}
                      className={`w-1.5 h-1.5 rounded-full transition-colors ${
                        (currentImageIndex[property.id] || 0) === imgIndex ? "bg-white" : "bg-white/50"
                      }`}
                      onClick={() => setCurrentImageIndex((prev) => ({ ...prev, [property.id]: imgIndex }))}
                    />
                  ))}
                  {property.images.length > 5 && (
                    <span className="text-xs text-white bg-black/50 rounded-full px-1">
                      +{property.images.length - 5}
                    </span>
                  )}
                </div>
              </>
            )}

            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

            <button
              onClick={() => openFullScreenImage(property.id, currentImageIndex[property.id] || 0)}
              className="absolute bottom-2 right-2 p-1.5 bg-white/80 backdrop-blur-sm rounded-full shadow-sm z-10 opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <Maximize className="h-4 w-4 text-gray-600" />
            </button>
            
            <button
              onClick={(e) => toggleFavorite(property.id, e)}
              className={`absolute top-2 right-10 p-1.5 backdrop-blur-sm rounded-full shadow-sm z-10 transition-all ${
                favoriteProperties.includes(property.id) 
                  ? "bg-hovmart-purple/90 opacity-100" 
                  : "bg-white/90 opacity-0 group-hover:opacity-100"
              }`}
            >
              <Heart 
                className={`h-4 w-4 ${
                  favoriteProperties.includes(property.id) 
                    ? "text-white fill-hovmart-purple" 
                    : "text-gray-600"
                }`} 
              />
            </button>
          </div>

          <div className="p-4">
            <h3 className="font-semibold mb-1 line-clamp-1 group-hover:text-hovmart-purple transition-colors">
              {property.title}
            </h3>
            <p className="text-gray-600 text-sm mb-2 flex items-center">
              <MapPin className="h-3.5 w-3.5 mr-1 text-gray-400" />
              {property.location}
            </p>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Star className="h-4 w-4 fill-hovmart-purple text-hovmart-purple mr-1" />
                <span className="text-sm">{property.rating}</span>
                <span className="text-sm text-gray-600 ml-1">({property.reviews} reviews)</span>
              </div>
              <p className="font-medium text-sm">₦{property.price.toLocaleString()}/night</p>
            </div>

            <div className="mt-3 pt-3 border-t border-gray-100 grid grid-cols-3 gap-2 text-xs text-gray-500">
              <div className="flex items-center">
                <Bed className="h-3.5 w-3.5 text-hovmart-purple mr-1" />
                <span>{property.beds} beds</span>
              </div>
              <div className="flex items-center">
                <Bath className="h-3.5 w-3.5 text-hovmart-purple mr-1" />
                <span>{property.baths} baths</span>
              </div>
              <div className="flex items-center">
                <Users className="h-3.5 w-3.5 text-hovmart-purple mr-1" />
                <span>{property.maxGuests} guests</span>
              </div>
            </div>
            
            {/* Special offers or badges */}
            {property.id % 2 === 0 && (
              <div className="mt-3 flex items-center">
                <span className="bg-green-100 text-green-700 text-xs px-2 py-0.5 rounded-full flex items-center">
                  <Percent className="h-3 w-3 mr-1" />
                  Special offer
                </span>
              </div>
            )}
          </div>
        </motion.div>
      ))}

      {selectedProperties.length < 3 && (
        <div className="relative">
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: selectedProperties.length * 0.1 }}
            onClick={() => setShowPropertySelector(!showPropertySelector)}
            className="h-full min-h-[280px] w-full bg-gray-50 border-2 border-dashed border-gray-300 rounded-xl flex flex-col items-center justify-center hover:border-hovmart-purple/50 transition-colors group"
          >
            <div className="h-12 w-12 rounded-full bg-gray-100 flex items-center justify-center group-hover:bg-hovmart-purple/10 transition-colors mb-3">
              <Plus className="h-6 w-6 text-gray-400 group-hover:text-hovmart-purple transition-colors" />
            </div>
            <span className="text-gray-600 font-medium group-hover:text-hovmart-purple transition-colors">
              Add Property
            </span>
            <p className="text-gray-400 text-sm mt-2 max-w-[200px] text-center">
              Add another property to compare features side by side
            </p>
          </motion.button>

          {showPropertySelector && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-lg z-20 max-h-[400px] overflow-y-auto border border-gray-100">
              <div className="p-4 border-b border-gray-200 sticky top-0 bg-white z-10">
                <h3 className="font-medium mb-3">Select a property to compare</h3>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search properties..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-hovmart-purple focus:border-hovmart-purple"
                  />
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                </div>

                <div className="flex space-x-2 mt-3 overflow-x-auto pb-1">
                  <button
                    onClick={() => setActiveTab("all")}
                    className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap ${
                      activeTab === "all"
                        ? "bg-hovmart-purple text-white"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                  >
                    All Types
                  </button>
                  <button
                    onClick={() => setActiveTab("apartment")}
                    className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap ${
                      activeTab === "apartment"
                        ? "bg-hovmart-purple text-white"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                  >
                    Apartments
                  </button>
                  <button
                    onClick={() => setActiveTab("house")}
                    className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap ${
                      activeTab === "house"
                        ? "bg-hovmart-purple text-white"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                  >
                    Houses
                  </button>
                  <button
                    onClick={() => setActiveTab("villa")}
                    className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap ${
                      activeTab === "villa"
                        ? "bg-hovmart-purple text-white"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                  >
                    Villas
                  </button>
                </div>
              </div>

              <div className="divide-y divide-gray-200">
                {filteredProperties.length > 0 ? (
                  filteredProperties.map((property) => (
                    <button
                      key={property.id}
                      onClick={() => addProperty(property.id)}
                      className="w-full p-4 flex items-center hover:bg-gray-50 transition-colors text-left"
                    >
                      <div className="relative w-16 h-16 rounded-md overflow-hidden flex-shrink-0 mr-4">
                        <Image
                          src={property.images[0] || "/placeholder.svg"}
                          alt={property.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium line-clamp-1">{property.title}</h4>
                        <p className="text-gray-600 text-sm line-clamp-1">{property.location}</p>
                        <div className="flex items-center justify-between mt-1">
                          <div className="flex items-center">
                            <Star className="h-3 w-3 fill-hovmart-purple text-hovmart-purple mr-1" />
                            <span className="text-xs">{property.rating}</span>
                          </div>
                          <p className="text-sm">
                            <span className="font-medium">₦{property.price.toLocaleString()}</span>
                            <span className="text-gray-600"> / night</span>
                          </p>
                        </div>
                      </div>
                    </button>
                  ))
                ) : (
                  <div className="p-6 text-center">
                    <p className="text-gray-500">No properties found matching "{searchTerm}"</p>
                    <button
                      onClick={() => setSearchTerm("")}
                      className="mt-2 text-hovmart-purple text-sm hover:underline"
                    >
                      Clear search
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </div>

    {selectedProperties.length > 1 ? (
      <div className="space-y-6 animate-fade-in">
        {/* Basic Information Section */}
        <div id="basics-section" className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
          <button
            onClick={() => toggleSection("basics")}
            className="w-full px-6 py-4 flex items-center justify-between font-medium text-left hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-lg bg-hovmart-purple/10 flex items-center justify-center mr-3">
                <Info className="h-5 w-5 text-hovmart-purple" />
              </div>
              <span>Basic Information</span>
            </div>
            {expandedSections.basics ? (
              <ChevronUp className="h-5 w-5 text-gray-400" />
            ) : (
              <ChevronDown className="h-5 w-5 text-gray-400" />
            )}
          </button>

          <AnimatePresence>
            {expandedSections.basics && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="px-6 pb-6">
                  <div className="grid grid-cols-4 gap-4">
                    <div className="col-span-1"></div>
                    {sortedProperties.map((property) => (
                      <div key={property.id} className="col-span-1 text-center font-medium">
                        {property.title.split(" ")[0]}
                      </div>
                    ))}
                  </div>

                  <div className="mt-4 space-y-4">
                    <div className="grid grid-cols-4 gap-4 items-center">
                      <div className="col-span-1 text-gray-600">Type</div>
                      {sortedProperties.map((property) => (
                        <div
                          key={property.id}
                          className={`col-span-1 text-center ${
                            isDifferent("type", property.type) ? "bg-yellow-50 rounded-lg py-1" : ""
                          }`}
                        >
                          {property.type}
                        </div>
                      ))}
                    </div>

                    <div className="grid grid-cols-4 gap-4 items-center">
                      <div className="col-span-1 text-gray-600">Beds</div>
                      {sortedProperties.map((property) => (
                        <div
                          key={property.id}
                          className={`col-span-1 text-center ${
                            isDifferent("beds", property.beds) ? "bg-yellow-50 rounded-lg py-1" : ""
                          }`}
                        >
                          <div className="flex items-center justify-center">
                            <Bed className="h-4 w-4 text-hovmart-purple mr-1" />
                            <span>
                              {property.beds} bed{property.beds !== 1 ? "s" : ""}
                            </span>
                            {getBestValue("beds") === property.id && highlightDifferences && (
                              <ThumbsUp className="h-3.5 w-3.5 text-green-500 ml-1" />
                            )}
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="grid grid-cols-4 gap-4 items-center">
                      <div className="col-span-1 text-gray-600">Baths</div>
                      {sortedProperties.map((property) => (
                        <div
                          key={property.id}
                          className={`col-span-1 text-center ${
                            isDifferent("baths", property.baths) ? "bg-yellow-50 rounded-lg py-1" : ""
                          }`}
                        >
                          <div className="flex items-center justify-center">
                            <Bath className="h-4 w-4 text-hovmart-purple mr-1" />
                            <span>
                              {property.baths} bath{property.baths !== 1 ? "s" : ""}
                            </span>
                            {getBestValue("baths") === property.id && highlightDifferences && (
                              <ThumbsUp className="h-3.5 w-3.5 text-green-500 ml-1" />
                            )}
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="grid grid-cols-4 gap-4 items-center">
                      <div className="col-span-1 text-gray-600">Max Guests</div>
                      {sortedProperties.map((property) => (
                        <div
                          key={property.id}
                          className={`col-span-1 text-center ${
                            isDifferent("maxGuests", property.maxGuests) ? "bg-yellow-50 rounded-lg py-1" : ""
                          }`}
                        >
                          <div className="flex items-center justify-center">
                            <Users className="h-4 w-4 text-hovmart-purple mr-1" />
                            <span>{property.maxGuests}</span>
                            {getBestValue("maxGuests") === property.id && highlightDifferences && (
                              <ThumbsUp className="h-3.5 w-3.5 text-green-500 ml-1" />
                            )}
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="grid grid-cols-4 gap-4 items-center">
                      <div className="col-span-1 text-gray-600">Rating</div>
                      {sortedProperties.map((property) => (
                        <div
                          key={property.id}
                          className={`col-span-1 text-center ${
                            isDifferent("rating", property.rating) ? "bg-yellow-50 rounded-lg py-1" : ""
                          }`}
                        >
                          <div className="flex items-center justify-center">
                            <Star className="h-4 w-4 fill-hovmart-purple text-hovmart-purple mr-1" />
                            <span>
                              {property.rating} ({property.reviews})
                            </span>
                            {getBestValue("rating") === property.id && highlightDifferences && (
                              <Award className="h-3.5 w-3.5 text-amber-500 ml-1" />
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Photos Section */}
        <div id="photos-section" className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
          <button
            onClick={() => toggleSection("photos")}
            className="w-full px-6 py-4 flex items-center justify-between font-medium text-left hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-lg bg-hovmart-purple/10 flex items-center justify-center mr-3">
                <Camera className="h-5 w-5 text-hovmart-purple" />
              </div>
              <span>Photos</span>
            </div>
            {expandedSections.photos ? (
              <ChevronUp className="h-5 w-5 text-gray-400" />
            ) : (
              <ChevronDown className="h-5 w-5 text-gray-400" />
            )}
          </button>

          <AnimatePresence>
            {expandedSections.photos && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="px-6 pb-6">
                  <div className="grid grid-cols-4 gap-4">
                    <div className="col-span-1"></div>
                    {sortedProperties.map((property) => (
                      <div key={property.id} className="col-span-1 text-center font-medium">
                        {property.title.split(" ")[0]}
                      </div>
                    ))}
                  </div>

                  <div className="mt-4 space-y-8">
                    {/* Main photos */}
                    <div className="grid grid-cols-4 gap-4 items-start">
                      <div className="col-span-1 text-gray-600">Main Photo</div>
                      {sortedProperties.map((property) => (
                        <div key={property.id} className="col-span-1 text-center">
                          <div className="relative aspect-video rounded-lg overflow-hidden group">
                            <Image
                              src={property.images[0] || "/placeholder.svg"}
                              alt={property.title}
                              fill
                              className="object-cover transition-transform duration-300 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                              <button
                                onClick={() => openFullScreenImage(property.id, 0)}
                                className="p-2 bg-white/80 rounded-full"
                              >
                                <Maximize className="h-4 w-4" />
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Photo galleries */}
                    <div className="grid grid-cols-4 gap-4 items-start">
                      <div className="col-span-1 text-gray-600">Gallery</div>
                      {sortedProperties.map((property) => (
                        <div key={property.id} className="col-span-1">
                          <div className="grid grid-cols-2 gap-2">
                            {property.images.slice(1, 5).map((image, index) => (
                              <div key={index} className="relative aspect-square rounded-lg overflow-hidden group">
                                <Image
                                  src={image || "/placeholder.svg"}
                                  alt={`${property.title} image ${index + 2}`}
                                  fill
                                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                  <button
                                    onClick={() => openFullScreenImage(property.id, index + 1)}
                                    className="p-1.5 bg-white/80 rounded-full"
                                  >
                                    <Maximize className="h-3 w-3" />
                                  </button>
                                </div>
                              </div>
                            ))}
                            {property.images.length > 5 && (
                              <button
                                onClick={() => openFullScreenImage(property.id, 5)}
                                className="relative aspect-square rounded-lg overflow-hidden bg-gray-100 flex items-center justify-center group"
                              >
                                <span className="text-sm font-medium text-gray-600 group-hover:text-hovmart-purple transition-colors">
                                  +{property.images.length - 5} more
                                </span>
                              </button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Amenities Section */}
        <div id="amenities-section" className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
          <button
            onClick={() => toggleSection("amenities")}
            className="w-full px-6 py-4 flex items-center justify-between font-medium text-left hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-lg bg-hovmart-purple/10 flex items-center justify-center mr-3">
                <Check className="h-5 w-5 text-hovmart-purple" />
              </div>
              <span>Amenities</span>
            </div>
            {expandedSections.amenities ? (
              <ChevronUp className="h-5 w-5 text-gray-400" />
            ) : (
              <ChevronDown className="h-5 w-5 text-gray-400" />
            )}
          </button>

          <AnimatePresence>
            {expandedSections.amenities && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="px-6 pb-6">
                  <div className="grid grid-cols-4 gap-4">
                    <div className="col-span-1"></div>
                    {sortedProperties.map((property) => (
                      <div key={property.id} className="col-span-1 text-center font-medium">
                        {property.title.split(" ")[0]}
                      </div>
                    ))}
                  </div>

                  <div className="mt-4 space-y-4">
                    {allAmenities.map((amenity, index) => (
                      <motion.div
                        key={amenity}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="grid grid-cols-4 gap-4 items-center"
                      >
                        <div className="col-span-1 text-gray-600 flex items-center">
                          <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center text-hovmart-purple mr-3">
                            {amenityIcons[amenity] || <Check className="h-4 w-4" />}
                          </div>
                          <span>{amenity}</span>
                        </div>
                        {sortedProperties.map((property) => (
                          <div key={property.id} className="col-span-1 text-center">
                            {property.amenities.includes(amenity) ? (
                              <div className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-green-50 text-green-500">
                                <Check className="h-5 w-5" />
                              </div>
                            ) : (
                              <div className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-red-50 text-red-500">
                                <X className="h-5 w-5" />
                              </div>
                            )}
                          </div>
                        ))}
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Availability Section */}
        <div id="availability-section" className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
          <button
            onClick={() => toggleSection("availability")}
            className="w-full px-6 py-4 flex items-center justify-between font-medium text-left hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-lg bg-hovmart-purple/10 flex items-center justify-center mr-3">
                <Calendar className="h-5 w-5 text-hovmart-purple" />
              </div>
              <span>Availability</span>
            </div>
            {expandedSections.availability ? (
              <ChevronUp className="h-5 w-5 text-gray-400" />
            ) : (
              <ChevronDown className="h-5 w-5 text-gray-400" />
            )}
          </button>

          <AnimatePresence>
            {expandedSections.availability && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="px-6 pb-6">
                  <div className="grid grid-cols-4 gap-4">
                    <div className="col-span-1"></div>
                    {sortedProperties.map((property) => (
                      <div key={property.id} className="col-span-1 text-center font-medium">
                        {property.title.split(" ")[0]}
                      </div>
                    ))}
                  </div>

                  <div className="mt-4 space-y-4">
                    <div className="grid grid-cols-4 gap-4 items-center">
                      <div className="col-span-1 text-gray-600">Next available</div>
                      {sortedProperties.map((property) => (
                        <div key={property.id} className="col-span-1 text-center">
                          <div className="flex items-center justify-center">
                            <Clock className="h-4 w-4 text-hovmart-purple mr-1" />
                            <span>{property.id % 2 === 0 ? "Immediately" : "From June 15"}</span>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="grid grid-cols-4 gap-4 items-center">
                      <div className="col-span-1 text-gray-600">Minimum stay</div>
                      {sortedProperties.map((property) => (
                        <div key={property.id} className="col-span-1 text-center">
                          {property.id % 3 === 0 ? "3 nights" : "2 nights"}
                        </div>
                      ))}
                    </div>

                    <div className="grid grid-cols-4 gap-4 items-center">
                      <div className="col-span-1 text-gray-600">Check-in time</div>
                      {sortedProperties.map((property) => (
                        <div key={property.id} className="col-span-1 text-center">
                          {property.id % 2 === 0 ? "2:00 PM" : "3:00 PM"}
                        </div>
                      ))}
                    </div>

                    <div className="grid grid-cols-4 gap-4 items-center">
                      <div className="col-span-1 text-gray-600">Check-out time</div>
                      {sortedProperties.map((property) => (
                        <div key={property.id} className="col-span-1 text-center">
                          {property.id % 2 === 0 ? "11:00 AM" : "12:00 PM"}
                        </div>
                      ))}
                    </div>

                    <div className="grid grid-cols-4 gap-4 items-center">
                      <div className="col-span-1 text-gray-600">Cancellation policy</div>
                      {sortedProperties.map((property) => (
                        <div key={property.id} className="col-span-1 text-center">
                          {property.id % 3 === 0 ? "Flexible" : property.id % 3 === 1 ? "Moderate" : "Strict"}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Location Section */}
        <div id="location-section" className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
          <button
            onClick={() => toggleSection("location")}
            className="w-full px-6 py-4 flex items-center justify-between font-medium text-left hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-lg bg-hovmart-purple/10 flex items-center justify-center mr-3">
                <MapPin className="h-5 w-5 text-hovmart-purple" />
              </div>
              <span>Location</span>
            </div>
            {expandedSections.location ? (
              <ChevronUp className="h-5 w-5 text-gray-400" />
            ) : (
              <ChevronDown className="h-5 w-5 text-gray-400" />
            )}
          </button>

          <AnimatePresence>
            {expandedSections.location && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="px-6 pb-6">
                  <div className="grid grid-cols-4 gap-4">
                    <div className="col-span-1"></div>
                    {sortedProperties.map((property) => (
                      <div key={property.id} className="col-span-1 text-center font-medium">
                        {property.title.split(" ")[0]}
                      </div>
                    ))}
                  </div>

                  <div className="mt-4 space-y-4">
                    <div className="grid grid-cols-4 gap-4 items-center">
                      <div className="col-span-1 text-gray-600">Location</div>
                      {sortedProperties.map((property) => (
                        <div key={property.id} className="col-span-1 text-center">
                          <div className="flex items-center justify-center">
                            <MapPin className="h-4 w-4 text-hovmart-purple mr-1" />
                            {property.location}
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="grid grid-cols-4 gap-4 items-start">
                      <div className="col-span-1 text-gray-600">Map</div>
                      {sortedProperties.map((property) => (
                        <div key={property.id} className="col-span-1 text-center">
                          <div className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center hover:bg-gray-200 transition-colors">
                            <button className="text-hovmart-purple text-sm hover:underline flex items-center">
                              <ExternalLink className="h-4 w-4 mr-1" />
                              View Map
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    <div className="grid grid-cols-4 gap-4 items-center">
                      <div className="col-span-1 text-gray-600">Neighborhood</div>
                      {sortedProperties.map((property) => (
                        <div key={property.id} className="col-span-1 text-center">
                          {property.id % 3 === 0 ? "Residential" : property.id % 3 === 1 ? "Urban" : "Suburban"}
                        </div>
                      ))}
                    </div>
                    
                    <div className="grid grid-cols-4 gap-4 items-center">
                      <div className="col-span-1 text-gray-600">Distance to center</div>
                      {sortedProperties.map((property) => (
                        <div key={property.id} className="col-span-1 text-center">
                          {property.id % 3 === 0 ? "1.2 km" : property.id % 3 === 1 ? "0.8 km" : "2.5 km"}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Pricing Section */}
        <div id="pricing-section" className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
          <button
            onClick={() => toggleSection("pricing")}
            className="w-full px-6 py-4 flex items-center justify-between font-medium text-left hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-lg bg-hovmart-purple/10 flex items-center justify-center mr-3">
                <DollarSign className="h-5 w-5 text-hovmart-purple" />
              </div>
              <span>Pricing</span>
            </div>
            {expandedSections.pricing ? (
              <ChevronUp className="h-5 w-5 text-gray-400" />
            ) : (
              <ChevronDown className="h-5 w-5 text-gray-400" />
            )}
          </button>

          <AnimatePresence>
            {expandedSections.pricing && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="px-6 pb-6">
                  <div className="grid grid-cols-4 gap-4">
                    <div className="col-span-1"></div>
                    {sortedProperties.map((property) => (
                      <div key={property.id} className="col-span-1 text-center font-medium">
                        {property.title.split(" ")[0]}
                      </div>
                    ))}
                  </div>

                  <div className="mt-4 space-y-4">
                    <div className="grid grid-cols-4 gap-4 items-center">
                      <div className="col-span-1 text-gray-600">Price per night</div>
                      {sortedProperties.map((property) => (
                        <div
                          key={property.id}
                          className={`col-span-1 text-center ${
                            isDifferent("price", property.price) ? "bg-yellow-50 rounded-lg py-1" : ""
                          }`}
                        >
                          <div className="flex items-center justify-center">
                            <span className="text-lg font-semibold text-hovmart-purple">
                              ₦{property.price.toLocaleString()}
                            </span>
                            {getBestValue("price") === property.id && highlightDifferences && (
                              <Sparkles className="h-4 w-4 text-amber-500 ml-1" />
                            )}
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="grid grid-cols-4 gap-4 items-center">
                      <div className="col-span-1 text-gray-600">5 nights</div>
                      {sortedProperties.map((property) => (
                        <div key={property.id} className="col-span-1 text-center">
                          <div className="px-3 py-1 bg-gray-50 rounded-lg inline-block">
                            ₦{(property.price * 5).toLocaleString()}
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="grid grid-cols-4 gap-4 items-center">
                      <div className="col-span-1 text-gray-600">7 nights</div>
                      {sortedProperties.map((property) => (
                        <div key={property.id} className="col-span-1 text-center">
                          <div className="px-3 py-1 bg-gray-50 rounded-lg inline-block">
                            ₦{(property.price * 7).toLocaleString()}
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="grid grid-cols-4 gap-4 items-center">
                      <div className="col-span-1 text-gray-600">Service fee (12%)</div>
                      {sortedProperties.map((property) => (
                        <div key={property.id} className="col-span-1 text-center">
                          ₦{Math.round(property.price * 0.12).toLocaleString()}
                        </div>
                      ))}
                    </div>
                    
                    <div className="grid grid-cols-4 gap-4 items-center">
                      <div className="col-span-1 text-gray-600">Cleaning fee</div>
                      {sortedProperties.map((property) => (
                        <div key={property.id} className="col-span-1 text-center">
                          ₦{(property.id % 3 === 0 ? 15000 : property.id % 3 === 1 ? 12000 : 18000).toLocaleString()}
                        </div>
                      ))}
                    </div>
                    
                    <div className="grid grid-cols-4 gap-4 items-center">
                      <div className="col-span-1 text-gray-600">Payment options</div>
                      {sortedProperties.map((property) => (
                        <div key={property.id} className="col-span-1 text-center">
                          <div className="flex items-center justify-center space-x-1">
                            <CreditCard className="h-4 w-4 text-hovmart-purple" />
                            {property.id % 2 === 0 && <Wallet className="h-4 w-4 text-hovmart-purple" />}
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="grid grid-cols-4 gap-4 items-center">
                      <div className="col-span-1 text-gray-600 font-medium">Total (7 nights)</div>
                      {sortedProperties.map((property) => (
                        <div key={property.id} className="col-span-1 text-center">
                          <div className="px-3 py-1 bg-hovmart-purple/10 rounded-lg inline-block font-medium text-hovmart-purple">
                            ₦{Math.round(property.price * 7 * 1.12 + (property.id % 3 === 0 ? 15000 : property.id % 3 === 1 ? 12000 : 18000)).toLocaleString()}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-8 grid grid-cols-4 gap-4">
                    <div className="col-span-1"></div>
                    {sortedProperties.map((property, index) => (
                      <div key={property.id} className="col-span-1 text-center">
                        <div className="space-y-3">
                          <button
                            onClick={() => router.push(`/properties/${property.id}`)}
                            className="w-full px-4 py-2 bg-gradient-to-r from-hovmart-purple to-hovmart-light text-white rounded-lg text-sm font-medium hover:shadow-md transition-shadow flex items-center justify-center"
                          >
                            View Property
                            <ArrowRight className="h-4 w-4 ml-1" />
                          </button>
                          <div className="flex justify-center space-x-2">
                            <button 
                              onClick={(e) => toggleFavorite(property.id, e)}
                              className={`p-2 rounded-full transition-colors ${
                                favoriteProperties.includes(property.id)
                                  ? "bg-hovmart-purple/20 text-hovmart-purple"
                                  : "bg-gray-100 hover:bg-gray-200 text-gray-600"
                              }`}
                            >
                              <Heart 
                                className={`h-4 w-4 ${
                                  favoriteProperties.includes(property.id) ? "fill-hovmart-purple" : ""
                                }`} 
                              />
                            </button>
                            <button className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors">
                              <Share2 className="h-4 w-4 text-hovmart-purple" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Reviews Section */}
        <div id="reviews-section" className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
          <button
            onClick={() => toggleSection("reviews")}
            className="w-full px-6 py-4 flex items-center justify-between font-medium text-left hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-lg bg-hovmart-purple/10 flex items-center justify-center mr-3">
                <Star className="h-5 w-5 text-hovmart-purple" />
              </div>
              <span>Reviews</span>
            </div>
            {expandedSections.reviews ? (
              <ChevronUp className="h-5 w-5 text-gray-400" />
            ) : (
              <ChevronDown className="h-5 w-5 text-gray-400" />
            )}
          </button>

          <AnimatePresence>
            {expandedSections.reviews && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="px-6 pb-6">
                  <div className="mb-4">
                    <Tabs defaultValue="summary" onValueChange={(value) => setReviewsSection(value)}>
                      <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="summary">Review Summary</TabsTrigger>
                        <TabsTrigger value="details">Detailed Reviews</TabsTrigger>
                      </TabsList>
                      <TabsContent value="summary" className="pt-4">
                        <div className="grid grid-cols-4 gap-4">
                          <div className="col-span-1"></div>
                          {sortedProperties.map((property) => (
                            <div key={property.id} className="col-span-1 flex flex-col items-center">
                              <div className="flex items-center mb-2">
                                <Star className="h-5 w-5 fill-hovmart-purple text-hovmart-purple mr-1" />
                                <span className="text-xl font-semibold">{property.rating}</span>
                                <span className="text-gray-500 ml-1">({property.reviews})</span>
                              </div>
                              
                              {/* Rating breakdown */}
                              <div className="w-full space-y-2">
                                <div className="space-y-1">
                                  <div className="flex justify-between text-xs">
                                    <span>Cleanliness</span>
                                    <span>{4.5 + (property.id % 10) / 20}</span>
                                  </div>
                                  <div className="h-1.5 w-full bg-gray-200 rounded-full overflow-hidden">
                                    <div 
                                      className="h-full bg-hovmart-purple rounded-full" 
                                      style={{ width: `${(4.5 + (property.id % 10) / 20) * 20}%` }}
                                    />
                                  </div>
                                </div>
                                
                                <div className="space-y-1">
                                  <div className="flex justify-between text-xs">
                                    <span>Accuracy</span>
                                    <span>{4.3 + (property.id % 10) / 20}</span>
                                  </div>
                                  <div className="h-1.5 w-full bg-gray-200 rounded-full overflow-hidden">
                                    <div 
                                      className="h-full bg-hovmart-purple rounded-full" 
                                      style={{ width: `${(4.3 + (property.id % 10) / 20) * 20}%` }}
                                    />
                                  </div>
                                </div>
                                
                                <div className="space-y-1">
                                  <div className="flex justify-between text-xs">
                                    <span>Location</span>
                                    <span>{4.7 + (property.id % 10) / 20}</span>
                                  </div>
                                  <div className="h-1.5 w-full bg-gray-200 rounded-full overflow-hidden">
                                    <div 
                                      className="h-full bg-hovmart-purple rounded-full" 
                                      style={{ width: `${(4.7 + (property.id % 10) / 20) * 20}%` }}
                                    />
                                  </div>
                                </div>
                                
                                <div className="space-y-1">
                                  <div className="flex justify-between text-xs">
                                    <span>Value</span>
                                    <span>{4.2 + (property.id % 10) / 20}</span>
                                  </div>
                                  <div className="h-1.5 w-full bg-gray-200 rounded-full overflow-hidden">
                                    <div 
                                      className="h-full bg-hovmart-purple rounded-full" 
                                      style={{ width: `${(4.2 + (property.id % 10) / 20) * 20}%` }}
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </TabsContent>
                      
                      <TabsContent value="details" className="pt-4">
                        <div className="grid grid-cols-4 gap-8">
                          <div className="col-span-1"></div>
                          {sortedProperties.map((property) => {
                            const reviews = getPropertyReviews(property.id);
                            return (
                              <div key={property.id} className="col-span-1 space-y-4">
                                {reviews.map(review => (
                                  <div key={review.id} className="bg-gray-50 p-3 rounded-lg">
                                    <div className="flex items-center justify-between mb-1">
                                      <span className="font-medium">{review.user}</span>
                                      <div className="flex items-center">
                                        <Star className="h-3.5 w-3.5 fill-hovmart-purple text-hovmart-purple" />
                                        <span className="text-xs ml-1">{review.rating}</span>
                                      </div>
                                    </div>
                                    <p className="text-sm text-gray-600">{review.text}</p>
                                    <p className="text-xs text-gray-400 mt-1">{review.date}</p>
                                  </div>
                                ))}
                                <button className="text-sm text-hovmart-purple hover:underline">
                                  View all {property.reviews} reviews
                                </button>
                              </div>
                            );
                          })}
                        </div>
                      </TabsContent>
                    </Tabs>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Data Visualization Section */}
        <div id="visualization-section" className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
          <button
            onClick={() => toggleSection("visualization")}
            className="w-full px-6 py-4 flex items-center justify-between font-medium text-left hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-lg bg-hovmart-purple/10 flex items-center justify-center mr-3">
                <BarChart3 className="h-5 w-5 text-hovmart-purple" />
              </div>
              <span>Data Visualization</span>
            </div>
            {expandedSections.visualization ? (
              <ChevronUp className="h-5 w-5 text-gray-400" />
            ) : (
              <ChevronDown className="h-5 w-5 text-gray-400" />
            )}
          </button>

          <AnimatePresence>
            {expandedSections.visualization && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="px-6 pb-6">
                  <Tabs defaultValue="overview">
                    <TabsList className="w-full grid grid-cols-4 mb-6">
                      <TabsTrigger value="overview">Overview</TabsTrigger>
                      <TabsTrigger value="comparison">Metrics Comparison</TabsTrigger>
                      <TabsTrigger value="scores">Score Breakdown</TabsTrigger>
                      <TabsTrigger value="radar">Radar Chart</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="overview">
                      <div className="h-80">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart
                            data={generateChartData()}
                            margin={{
                              top: 20, right: 30, left: 20, bottom: 5,
                            }}
                          >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <RechartsTooltip formatter={(value, name) => {
                              if (name === 'price') return [`₦${value.toLocaleString()}`, 'Price'];
                              if (name === 'score') return [`${value}%`, 'Match Score'];
                              return [value, name];
                            }} />
                            <Legend />
                            <defs>
                              <linearGradient id="scoreColor" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                                <stop offset="95%" stopColor="#8884d8" stopOpacity={0.2} />
                              </linearGradient>
                            </defs>
                            <Bar dataKey="score" name="Match Score" fill="url(#scoreColor)" />
                            <Bar dataKey="price" name="Price" fill="#82ca9d" />
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="comparison">
                      <div className="flex items-center justify-center mb-4 space-x-4">
                        <span className="text-sm font-medium">Compare:</span>
                        <div className="flex space-x-2">
                          {['price', 'rating', 'beds', 'baths', 'amenities'].map((metric) => (
                            <button
                              key={metric}
                              onClick={() => setActiveMetric(metric)}
                              className={`px-3 py-1.5 text-xs font-medium rounded-full ${
                                activeMetric === metric 
                                  ? 'bg-hovmart-purple text-white' 
                                  : 'bg-gray-100 hover:bg-gray-200 text-gray-600'
                              }`}
                            >
                              {metric.charAt(0).toUpperCase() + metric.slice(1)}
                            </button>
                          ))}
                        </div>
                      </div>
                      
                      <div className="h-80">
                        <ResponsiveContainer width="100%" height="100%">
                          <AreaChart
                            data={generateChartData()}
                            margin={{
                              top: 20, right: 30, left: 20, bottom: 5,
                            }}
                          >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <RechartsTooltip formatter={(value) => {
                              if (activeMetric === 'price') return `₦${value.toLocaleString()}`;
                              return value;
                            }} />
                            <Legend />
                            <defs>
                              <linearGradient id="colorMetric" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                                <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                              </linearGradient>
                            </defs>
                            <Area 
                              type="monotone" 
                              dataKey={activeMetric} 
                              stroke="#8884d8" 
                              fill="url(#colorMetric)" 
                              name={activeMetric.charAt(0).toUpperCase() + activeMetric.slice(1)}
                            />
                          </AreaChart>
                        </ResponsiveContainer>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="scores">
                      <div className="grid grid-cols-4 gap-8">
                        <div className="col-span-1"></div>
                        {sortedProperties.map((property) => (
                          <div key={property.id} className="col-span-1">
                            <h4 className="font-medium text-center mb-3">{property.title.split(" ")[0]}</h4>
                            <div className="h-60">
                              <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                  <Pie
                                    data={generateScoreData(property.id)}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={40}
                                    outerRadius={60}
                                    paddingAngle={5}
                                    dataKey="value"
                                    label={({name, percent}) => `${name}: ${(percent * 100).toFixed(0)}%`}
                                  >
                                    {generateScoreData(property.id).map((entry, index) => (
                                      <Cell key={`cell-${index}`} fill={entry.fill} />
                                    ))}
                                  </Pie>
                                  <RechartsTooltip formatter={(value, name) => ([`${value} points`, name])} />
                                </PieChart>
                              </ResponsiveContainer>
                            </div>
                            <div className="text-center mt-2">
                              <div className="text-lg font-medium text-hovmart-purple">{comparisonScore[property.id]}% match</div>
                              <div className="text-sm text-gray-500">Total score</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="radar">
                      <div className="h-96">
                        <ResponsiveContainer width="100%" height="100%">
                          <RadarChart outerRadius={150} data={generateRadarData()[0]}>
                            <PolarGrid />
                            <PolarAngleAxis dataKey="name" />
                            <PolarRadiusAxis angle={30} domain={[0, 10]} />
                            {sortedProperties.map((property, index) => (
                              <Radar
                                key={property.id}
                                name={property.title.split(" ")[0]}
                                dataKey={Object.keys(generateRadarData()[0]).filter(key => key !== 'name')[index]}
                                stroke={`hsl(${index * 60}, 70%, 50%)`}
                                fill={`hsl(${index * 60}, 70%, 50%)`}
                                fillOpacity={0.5}
                              />
                            ))}
                            <Legend />
                            <RechartsTooltip />
                          </RadarChart>
                        </ResponsiveContainer>
                      </div>
                    </TabsContent>
                  </Tabs>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Recommendation */}
        <div className="bg-gradient-to-r from-hovmart-purple/10 to-hovmart-light/10 rounded-xl p-6 border border-hovmart-purple/20">
          <div className="flex items-start">
            <div className="w-10 h-10 rounded-full bg-hovmart-purple/20 flex items-center justify-center mr-4 mt-1">
              <Zap className="h-5 w-5 text-hovmart-purple" />
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-2">Our Recommendation</h3>
              <p className="text-gray-600 mb-4">
                Based on your comparison, we recommend{" "}
                {
                  selectedPropertiesData.find(
                    (p) => p.id === Object.entries(comparisonScore).sort((a, b) => b[1] - a[1])[0][0],
                  )?.title
                }{" "}
                as the best match for your needs.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {sortedProperties.map((property) => (
                  <div key={property.id} className="bg-white rounded-lg p-4 shadow-sm">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium">{property.title.split(" ")[0]}</h4>
                      <div className="flex items-center">
                        <BarChart3 className="h-4 w-4 text-hovmart-purple mr-1" />
                        <span className="text-sm font-medium">{comparisonScore[property.id]}%</span>
                      </div>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 mb-1">
                      <div
                        className="bg-gradient-to-r from-hovmart-purple to-hovmart-light h-2 rounded-full"
                        style={{ width: `${comparisonScore[property.id]}%` }}
                      ></div>
                    </div>
                    <div className="text-xs text-gray-500 flex justify-between">
                      <span>Match score</span>
                      <span>₦{property.price.toLocaleString()}/night</span>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 bg-white rounded-lg p-4 border border-gray-200">
                <div className="flex items-center mb-2">
                  <Lightbulb className="h-5 w-5 text-amber-500 mr-2" />
                  <h4 className="font-medium">Why we recommend this property</h4>
                </div>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-start">
                    <Trophy className="h-4 w-4 text-hovmart-purple mr-2 mt-0.5" />
                    <span>Best overall value for money based on amenities and location</span>
                  </li>
                  <li className="flex items-start">
                    <Star className="h-4 w-4 text-hovmart-purple mr-2 mt-0.5" />
                    <span>Highest guest satisfaction rating among your selected properties</span>
                  </li>
                  <li className="flex items-start">
                    <AlertCircle className="h-4 w-4 text-hovmart-purple mr-2 mt-0.5" />
                    <span>Most comprehensive set of amenities for your needs</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    ) : (
      <div className="bg-white rounded-xl shadow-sm p-8 text-center border border-gray-100 animate-fade-in">
        <div className="w-16 h-16 bg-hovmart-purple/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <Home className="h-8 w-8 text-hovmart-purple" />
        </div>
        <h2 className="text-xl font-semibold mb-2">Select Properties to Compare</h2>
        <p className="text-gray-600 mb-6">
          Add at least two properties to compare their features, amenities, and pricing side by side.
        </p>
        <Link
          href="/properties"
          className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-hovmart-purple to-hovmart-light text-white rounded-lg font-medium hover:shadow-md transition-shadow"
        >
          Browse Properties
        </Link>
      </div>
    )}
  </div>
)
}
