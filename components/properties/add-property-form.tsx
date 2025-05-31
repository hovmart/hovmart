"use client"

import type React from "react"

import { useState, useRef } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Home, MapPin, DollarSign, Bed, Bath, Users, Calendar, Upload, X, Check, Info, Loader2 } from "lucide-react"
import * as z from "zod"

const propertySchema = z.object({
  title: z.string().min(5, {
    message: "Title must be at least 5 characters.",
  }),
  description: z.string().min(20, {
    message: "Description must be at least 20 characters.",
  }),
  propertyType: z.string().min(1, {
    message: "Please select a property type.",
  }),
  priceType: z.string().min(1, {
    message: "Please select a price type.",
  }),
  price: z.string().min(1, {
    message: "Please enter a price.",
  }),
  bedrooms: z.string().optional(),
  bathrooms: z.string().optional(),
  squareFeet: z.string().optional(),
  landSize: z.string().optional(),
  landUnit: z.string().optional(),
  address: z.string().min(5, {
    message: "Address must be at least 5 characters.",
  }),
  city: z.string().min(2, {
    message: "City must be at least 2 characters.",
  }),
  state: z.string().min(2, {
    message: "State must be at least 2 characters.",
  }),
  zipCode: z.string().min(5, {
    message: "Zip code must be at least 5 characters.",
  }),
  amenities: z.array(z.string()).optional(),
  agreeToTerms: z.boolean().refine((val) => val === true, {
    message: "You must agree to the terms and conditions.",
  }),
})

const amenitiesList = [
  "Swimming Pool",
  "Gym",
  "Parking",
  "Security",
  "Air Conditioning",
  "Furnished",
  "Balcony",
  "Garden",
  "Elevator",
  "Internet",
  "Cable TV",
  "Washing Machine",
  "Dishwasher",
  "Microwave",
  "Refrigerator",
  "Oven",
  "Water Supply",
  "Electricity",
  "Gated Community",
  "CCTV",
]

interface AddPropertyFormProps {
  inModal?: boolean
  onSuccess?: () => void
}

export function AddPropertyForm({ inModal = false, onSuccess }: AddPropertyFormProps) {
  const router = useRouter()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
    price: "",
    type: "",
    priceType: "monthly", // Default price type
    beds: "",
    baths: "",
    maxGuests: "",
    availableFrom: "",
    availableTo: "",
    categories: [] as string[],
    amenities: [] as string[],
    // Add fields for landed properties
    landSize: "",
    landUnit: "sqm",
  })
  const [images, setImages] = useState<File[]>([])
  const [imagePreviewUrls, setImagePreviewUrls] = useState<string[]>([])
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [currentStep, setCurrentStep] = useState(1)
  const [locationValue, setLocationValue] = useState("")

  const propertyTypes = [
    { value: "house", label: "House" },
    { value: "apartment", label: "Apartment" },
    { value: "villa", label: "Villa" },
    { value: "penthouse", label: "Penthouse" },
    { value: "studio", label: "Studio" },
    { value: "shortlet", label: "Shortlet" },
    { value: "cabin", label: "Cabin" },
    { value: "farmhouse", label: "Farmhouse" },
    { value: "commercial", label: "Commercial" },
    // Add landed property types
    { value: "land", label: "Land" },
    { value: "plot", label: "Plot" },
    { value: "farm", label: "Farm" },
  ]

  const priceTypes = [
    { value: "perNight", label: "Per Night" },
    { value: "monthly", label: "Monthly" },
    { value: "yearly", label: "Yearly" },
    { value: "sale", label: "For Sale" },
  ]

  const categoryOptions = [
    { id: "apartments", label: "Apartments" },
    { id: "shortlets", label: "Shortlet Apartments" },
    { id: "beachfront", label: "Beachfront" },
    { id: "luxury", label: "Luxury Homes" },
    { id: "vacation", label: "Vacation Homes" },
    { id: "mountain", label: "Mountain View" },
    { id: "countryside", label: "Countryside" },
    { id: "commercial", label: "Commercial" },
    // Add landed property categories
    { id: "land", label: "Land" },
    { id: "plots", label: "Plots" },
    { id: "farms", label: "Farms" },
  ]

  const amenityOptions = [
    { id: "wifi", label: "Wifi" },
    { id: "kitchen", label: "Kitchen" },
    { id: "aircon", label: "Air conditioning" },
    { id: "washer", label: "Washing machine" },
    { id: "parking", label: "Free parking" },
    { id: "pool", label: "Pool" },
    { id: "security", label: "Security" },
    { id: "gym", label: "Gym access" },
    { id: "beach", label: "Beach access" },
    { id: "garden", label: "Garden" },
    { id: "balcony", label: "Balcony" },
    { id: "tv", label: "TV" },
    { id: "workspace", label: "Workspace" },
    { id: "bbq", label: "BBQ grill" },
  ]

  // Land feature options
  const landFeatureOptions = [
    { id: "roadAccess", label: "Road Access" },
    { id: "electricity", label: "Electricity" },
    { id: "waterSupply", label: "Water Supply" },
    { id: "fenced", label: "Fenced" },
    { id: "gated", label: "Gated" },
    { id: "cornerPiece", label: "Corner Piece" },
    { id: "surveyPlan", label: "Survey Plan" },
    { id: "cOfO", label: "C of O" },
    { id: "gazette", label: "Gazette" },
  ]

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })

    // Clear error when user types
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
      })
    }
  }

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>, type: "categories" | "amenities") => {
    const { value, checked } = e.target
    if (checked) {
      setFormData({
        ...formData,
        [type]: [...formData[type], value],
      })
    } else {
      setFormData({
        ...formData,
        [type]: formData[type].filter((item) => item !== value),
      })
    }
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files) return

    const newImages = Array.from(files)
    const newImageUrls = newImages.map((file) => URL.createObjectURL(file))

    setImages([...images, ...newImages])
    setImagePreviewUrls([...imagePreviewUrls, ...newImageUrls])
  }

  const removeImage = (index: number) => {
    const newImages = [...images]
    const newImageUrls = [...imagePreviewUrls]

    // Revoke the object URL to avoid memory leaks
    URL.revokeObjectURL(newImageUrls[index])

    newImages.splice(index, 1)
    newImageUrls.splice(index, 1)

    setImages(newImages)
    setImagePreviewUrls(newImageUrls)
  }

  const validateStep = (step: number) => {
    const newErrors: Record<string, string> = {}

    if (step === 1) {
      if (!formData.title.trim()) newErrors.title = "Title is required"
      if (!formData.description.trim()) newErrors.description = "Description is required"
      if (!locationValue.trim()) newErrors.location = "Location is required"
      if (!formData.price.trim()) newErrors.price = "Price is required"
      else if (isNaN(Number(formData.price)) || Number(formData.price) <= 0)
        newErrors.price = "Price must be a positive number"
    } else if (step === 2) {
      if (!formData.type) newErrors.type = "Property type is required"

      // Only validate these fields for non-landed properties
      const isLandedProperty = ["land", "plot", "farm"].includes(formData.type)

      if (!isLandedProperty) {
        if (!formData.beds.trim()) newErrors.beds = "Number of beds is required"
        else if (isNaN(Number(formData.beds)) || Number(formData.beds) < 0)
          newErrors.beds = "Beds must be a non-negative number"
        if (!formData.baths.trim()) newErrors.baths = "Number of baths is required"
        else if (isNaN(Number(formData.baths)) || Number(formData.baths) < 0)
          newErrors.baths = "Baths must be a non-negative number"
        if (!formData.maxGuests.trim()) newErrors.maxGuests = "Maximum guests is required"
        else if (isNaN(Number(formData.maxGuests)) || Number(formData.maxGuests) <= 0)
          newErrors.maxGuests = "Maximum guests must be a positive number"
      } else {
        // Validate landed property fields
        if (!formData.landSize.trim()) newErrors.landSize = "Land size is required"
        else if (isNaN(Number(formData.landSize)) || Number(formData.landSize) <= 0)
          newErrors.landSize = "Land size must be a positive number"
      }
    } else if (step === 3) {
      if (formData.categories.length === 0) newErrors.categories = "Select at least one category"
      if (formData.amenities.length === 0) newErrors.amenities = "Select at least one amenity"
    } else if (step === 4) {
      if (images.length === 0) newErrors.images = "Upload at least one image"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(currentStep + 1)
      window.scrollTo(0, 0)
    }
  }

  const prevStep = () => {
    setCurrentStep(currentStep - 1)
    window.scrollTo(0, 0)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateStep(currentStep)) return

    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      setShowSuccess(true)

      // Reset form after success
      setTimeout(() => {
        if (onSuccess) {
          onSuccess()
        } else {
          router.push("/properties")
        }
      }, 3000)
    }, 2000)
  }

  // Handle location change from the autocomplete
  const handleLocationChange = (value: string) => {
    setLocationValue(value)
    setFormData({
      ...formData,
      location: value,
    })

    // Clear error when user types
    if (errors.location) {
      setErrors({
        ...errors,
        location: "",
      })
    }
  }

  // Handle location selection from the autocomplete
  const handleLocationSelect = (value: string) => {
    setLocationValue(value)
    setFormData({
      ...formData,
      location: value,
    })

    // Clear error when user selects
    if (errors.location) {
      setErrors({
        ...errors,
        location: "",
      })
    }
  }

  // Check if the selected property type is a landed property
  const isLandedProperty = ["land", "plot", "farm"].includes(formData.type)

  return (
    <div className={`${inModal ? "max-w-none mx-0" : "max-w-3xl mx-auto"}`}>
      {showSuccess ? (
        <div className={`bg-white rounded-xl shadow-lg ${inModal ? "p-6" : "p-8"} text-center`}>
          <div
            className={`${inModal ? "w-12 h-12" : "w-16 h-16"} bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4`}
          >
            <Check className={`${inModal ? "h-6 w-6" : "h-8 w-8"} text-green-600`} />
          </div>
          <h2 className={`${inModal ? "text-xl" : "text-2xl"} font-bold mb-3`}>Property Listed Successfully!</h2>
          <p className="text-gray-600 mb-4">
            Your property has been submitted for review. Our team will review your listing and it will be live soon.
          </p>
          <div className="flex justify-center">
            <button
              onClick={() => router.push("/properties")}
              className="px-6 py-3 bg-gradient-to-r from-hovmart-purple to-hovmart-light text-white rounded-lg font-medium hover:shadow-md transition-shadow"
            >
              Browse Properties
            </button>
          </div>
        </div>
      ) : (
        <>
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-4">List Your Property</h1>
            <p className="text-gray-600">
              Fill out the form below to list your property on Hovmart. Reach thousands of potential buyers, renters,
              and guests.
            </p>
          </div>

          {/* Progress Steps */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              {[1, 2, 3, 4].map((step) => (
                <div key={step} className="flex flex-col items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      step < currentStep
                        ? "bg-hovmart-purple text-white"
                        : step === currentStep
                          ? "bg-hovmart-purple/20 text-hovmart-purple border-2 border-hovmart-purple"
                          : "bg-gray-100 text-gray-400"
                    }`}
                  >
                    {step < currentStep ? <Check className="h-5 w-5" /> : step}
                  </div>
                  <div
                    className={`text-xs mt-2 font-medium ${
                      step <= currentStep ? "text-hovmart-purple" : "text-gray-400"
                    }`}
                  >
                    {step === 1 ? "Basic Info" : step === 2 ? "Property Details" : step === 3 ? "Features" : "Photos"}
                  </div>
                </div>
              ))}
            </div>
            <div className="relative mt-2">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gray-200 rounded-full"></div>
              <div
                className="absolute top-0 left-0 h-1 bg-hovmart-purple rounded-full transition-all duration-300"
                style={{ width: `${((currentStep - 1) / 3) * 100}%` }}
              ></div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-lg p-6 md:p-8">
            {/* Step 1: Basic Information */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold mb-6">Basic Information</h2>

                <div>
                  <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                    Property Title*
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Home className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      id="title"
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      placeholder="e.g. Luxury Apartment with Ocean View"
                      className={`pl-10 w-full rounded-lg border ${
                        errors.title ? "border-red-500" : "border-gray-300"
                      } focus:ring-hovmart-purple focus:border-hovmart-purple`}
                    />
                  </div>
                  {errors.title && <p className="mt-1 text-sm text-red-500">{errors.title}</p>}
                </div>

                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                    Description*
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows={4}
                    placeholder="Describe your property in detail..."
                    className={`w-full rounded-lg border ${
                      errors.description ? "border-red-500" : "border-gray-300"
                    } focus:ring-hovmart-purple focus:border-hovmart-purple`}
                  ></textarea>
                  {errors.description && <p className="mt-1 text-sm text-red-500">{errors.description}</p>}
                </div>

                <div>
                  <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                    Location*
                  </label>
                  <div
                    className={`relative border rounded-lg ${errors.location ? "border-red-500" : "border-gray-300"}`}
                  >
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <MapPin className="h-5 w-5 text-gray-400" />
                    </div>
                    <div className="pl-10 w-full">
                      {/* Use the LocationAutocomplete component with proper props */}
                      <div className="w-full">
                        <input
                          type="text"
                          id="location"
                          name="location"
                          value={locationValue}
                          onChange={(e) => handleLocationChange(e.target.value)}
                          placeholder="e.g. Victoria Island, Lagos"
                          className={`w-full rounded-lg border-0 focus:ring-0 focus:outline-none`}
                        />
                      </div>
                    </div>
                  </div>
                  {errors.location && <p className="mt-1 text-sm text-red-500">{errors.location}</p>}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="priceType" className="block text-sm font-medium text-gray-700 mb-1">
                      Price Type*
                    </label>
                    <select
                      id="priceType"
                      name="priceType"
                      value={formData.priceType}
                      onChange={handleInputChange}
                      className="w-full rounded-lg border border-gray-300 focus:ring-hovmart-purple focus:border-hovmart-purple"
                    >
                      {priceTypes.map((type) => (
                        <option key={type.value} value={type.value}>
                          {type.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
                      Price (₦)*
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <DollarSign className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="text"
                        id="price"
                        name="price"
                        value={formData.price}
                        onChange={handleInputChange}
                        placeholder="e.g. 50000"
                        className={`pl-10 w-full rounded-lg border ${
                          errors.price ? "border-red-500" : "border-gray-300"
                        } focus:ring-hovmart-purple focus:border-hovmart-purple`}
                      />
                    </div>
                    {errors.price && <p className="mt-1 text-sm text-red-500">{errors.price}</p>}
                  </div>
                </div>

                <div>
                  <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-1">
                    Property Type*
                  </label>
                  <select
                    id="type"
                    name="type"
                    value={formData.type}
                    onChange={handleInputChange}
                    className={`w-full rounded-lg border ${
                      errors.type ? "border-red-500" : "border-gray-300"
                    } focus:ring-hovmart-purple focus:border-hovmart-purple`}
                  >
                    <option value="">Select property type</option>
                    <optgroup label="Residential Properties">
                      {propertyTypes
                        .filter((type) => !["land", "plot", "farm"].includes(type.value))
                        .map((type) => (
                          <option key={type.value} value={type.value}>
                            {type.label}
                          </option>
                        ))}
                    </optgroup>
                    <optgroup label="Landed Properties">
                      {propertyTypes
                        .filter((type) => ["land", "plot", "farm"].includes(type.value))
                        .map((type) => (
                          <option key={type.value} value={type.value}>
                            {type.label}
                          </option>
                        ))}
                    </optgroup>
                  </select>
                  {errors.type && <p className="mt-1 text-sm text-red-500">{errors.type}</p>}
                </div>
              </div>
            )}

            {/* Step 2: Property Details */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold mb-6">Property Details</h2>

                {!isLandedProperty ? (
                  // Regular property details
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label htmlFor="beds" className="block text-sm font-medium text-gray-700 mb-1">
                        Beds*
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Bed className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          type="number"
                          id="beds"
                          name="beds"
                          value={formData.beds}
                          onChange={handleInputChange}
                          min="0"
                          placeholder="e.g. 2"
                          className={`pl-10 w-full rounded-lg border ${
                            errors.beds ? "border-red-500" : "border-gray-300"
                          } focus:ring-hovmart-purple focus:border-hovmart-purple`}
                        />
                      </div>
                      {errors.beds && <p className="mt-1 text-sm text-red-500">{errors.beds}</p>}
                    </div>

                    <div>
                      <label htmlFor="baths" className="block text-sm font-medium text-gray-700 mb-1">
                        Baths*
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Bath className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          type="number"
                          id="baths"
                          name="baths"
                          value={formData.baths}
                          onChange={handleInputChange}
                          min="0"
                          placeholder="e.g. 2"
                          className={`pl-10 w-full rounded-lg border ${
                            errors.baths ? "border-red-500" : "border-gray-300"
                          } focus:ring-hovmart-purple focus:border-hovmart-purple`}
                        />
                      </div>
                      {errors.baths && <p className="mt-1 text-sm text-red-500">{errors.baths}</p>}
                    </div>

                    <div>
                      <label htmlFor="maxGuests" className="block text-sm font-medium text-gray-700 mb-1">
                        Max Guests*
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Users className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          type="number"
                          id="maxGuests"
                          name="maxGuests"
                          value={formData.maxGuests}
                          onChange={handleInputChange}
                          min="1"
                          placeholder="e.g. 4"
                          className={`pl-10 w-full rounded-lg border ${
                            errors.maxGuests ? "border-red-500" : "border-gray-300"
                          } focus:ring-hovmart-purple focus:border-hovmart-purple`}
                        />
                      </div>
                      {errors.maxGuests && <p className="mt-1 text-sm text-red-500">{errors.maxGuests}</p>}
                    </div>
                  </div>
                ) : (
                  // Landed property details
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="landSize" className="block text-sm font-medium text-gray-700 mb-1">
                          Land Size*
                        </label>
                        <input
                          type="number"
                          id="landSize"
                          name="landSize"
                          value={formData.landSize}
                          onChange={handleInputChange}
                          min="1"
                          placeholder="e.g. 500"
                          className={`w-full rounded-lg border ${
                            errors.landSize ? "border-red-500" : "border-gray-300"
                          } focus:ring-hovmart-purple focus:border-hovmart-purple`}
                        />
                        {errors.landSize && <p className="mt-1 text-sm text-red-500">{errors.landSize}</p>}
                      </div>

                      <div>
                        <label htmlFor="landUnit" className="block text-sm font-medium text-gray-700 mb-1">
                          Unit
                        </label>
                        <select
                          id="landUnit"
                          name="landUnit"
                          value={formData.landUnit}
                          onChange={handleInputChange}
                          className="w-full rounded-lg border border-gray-300 focus:ring-hovmart-purple focus:border-hovmart-purple"
                        >
                          <option value="sqm">Square Meters</option>
                          <option value="sqft">Square Feet</option>
                          <option value="acres">Acres</option>
                          <option value="hectares">Hectares</option>
                          <option value="plots">Plots</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-3">Land Features</label>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                        {landFeatureOptions.map((feature) => (
                          <label key={feature.id} className="flex items-center space-x-2">
                            <input
                              type="checkbox"
                              value={feature.id}
                              onChange={(e) => handleCheckboxChange(e, "amenities")}
                              className="rounded border-gray-300 text-hovmart-purple focus:ring-hovmart-purple"
                            />
                            <span>{feature.label}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="availableFrom" className="block text-sm font-medium text-gray-700 mb-1">
                      Available From
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Calendar className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="date"
                        id="availableFrom"
                        name="availableFrom"
                        value={formData.availableFrom}
                        onChange={handleInputChange}
                        className="pl-10 w-full rounded-lg border border-gray-300 focus:ring-hovmart-purple focus:border-hovmart-purple"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="availableTo" className="block text-sm font-medium text-gray-700 mb-1">
                      Available To
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Calendar className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="date"
                        id="availableTo"
                        name="availableTo"
                        value={formData.availableTo}
                        onChange={handleInputChange}
                        min={formData.availableFrom}
                        className="pl-10 w-full rounded-lg border border-gray-300 focus:ring-hovmart-purple focus:border-hovmart-purple"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Features */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold mb-6">Features</h2>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">Categories*</label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {categoryOptions.map((category) => (
                      <label key={category.id} className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          value={category.id}
                          checked={formData.categories.includes(category.id)}
                          onChange={(e) => handleCheckboxChange(e, "categories")}
                          className="rounded border-gray-300 text-hovmart-purple focus:ring-hovmart-purple"
                        />
                        <span>{category.label}</span>
                      </label>
                    ))}
                  </div>
                  {errors.categories && <p className="mt-1 text-sm text-red-500">{errors.categories}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">Amenities*</label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {amenityOptions.map((amenity) => (
                      <label key={amenity.id} className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          value={amenity.label}
                          checked={formData.amenities.includes(amenity.label)}
                          onChange={(e) => handleCheckboxChange(e, "amenities")}
                          className="rounded border-gray-300 text-hovmart-purple focus:ring-hovmart-purple"
                        />
                        <span>{amenity.label}</span>
                      </label>
                    ))}
                  </div>
                  {errors.amenities && <p className="mt-1 text-sm text-red-500">{errors.amenities}</p>}
                </div>
              </div>
            )}

            {/* Step 4: Photos */}
            {currentStep === 4 && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold mb-6">Photos</h2>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Upload Property Photos* (Max 10)
                  </label>

                  <div
                    className={`border-2 border-dashed rounded-lg p-6 text-center ${
                      errors.images ? "border-red-500" : "border-gray-300"
                    } hover:border-hovmart-purple/50 transition-colors`}
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleImageUpload}
                      multiple
                      accept="image/*"
                      className="hidden"
                      disabled={images.length >= 10}
                    />
                    <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-sm text-gray-600 mb-1">Click to upload or drag and drop</p>
                    <p className="text-xs text-gray-500">PNG, JPG, WEBP up to 10MB each</p>
                  </div>
                  {errors.images && <p className="mt-1 text-sm text-red-500">{errors.images}</p>}

                  {imagePreviewUrls.length > 0 && (
                    <div className="mt-4">
                      <h3 className="text-sm font-medium text-gray-700 mb-2">Uploaded Images</h3>
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                        {imagePreviewUrls.map((url, index) => (
                          <div key={index} className="relative group">
                            <div className="aspect-square rounded-lg overflow-hidden border border-gray-200">
                              <Image
                                src={url || "/placeholder.svg"}
                                alt={`Property image ${index + 1}`}
                                fill
                                className="object-cover"
                                sizes="(max-width: 768px) 50vw, 25vw"
                              />
                            </div>
                            <button
                              type="button"
                              onClick={() => removeImage(index)}
                              className="absolute top-1 right-1 bg-white rounded-full p-1 shadow-md opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              <X className="h-4 w-4 text-red-500" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-start">
                  <Info className="h-5 w-5 text-blue-500 mt-0.5 mr-3 flex-shrink-0" />
                  <div className="text-sm text-blue-700">
                    <p className="font-medium mb-1">Tips for great property photos:</p>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>Use natural lighting when possible</li>
                      <li>Capture all rooms and key features</li>
                      <li>Keep the space clean and tidy</li>
                      <li>Include exterior shots and views</li>
                      <li>Use landscape orientation for better display</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}

            <div className="mt-8 flex justify-between">
              {currentStep > 1 ? (
                <button
                  type="button"
                  onClick={prevStep}
                  className="px-6 py-3 border border-gray-300 rounded-lg font-medium hover:border-hovmart-purple/50 transition-colors"
                >
                  Previous
                </button>
              ) : (
                <div></div>
              )}

              {currentStep < 4 ? (
                <button
                  type="button"
                  onClick={nextStep}
                  className="px-6 py-3 bg-gradient-to-r from-hovmart-purple to-hovmart-light text-white rounded-lg font-medium hover:shadow-md transition-shadow"
                >
                  Next
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 py-3 bg-gradient-to-r from-hovmart-purple to-hovmart-light text-white rounded-lg font-medium hover:shadow-md transition-shadow disabled:opacity-70 flex items-center"
                >
                  {isSubmitting && <Loader2 className="animate-spin h-4 w-4 mr-2" />}
                  {isSubmitting ? "Submitting..." : "Submit Listing"}
                </button>
              )}
            </div>
          </form>
        </>
      )}
    </div>
  )
}
