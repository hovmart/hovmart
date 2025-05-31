"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { toast } from "@/hooks/use-toast"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { UploadCloud, MapPin } from "lucide-react"

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
  featured: z.boolean().default(false),
  verified: z.boolean().default(false),
  amenities: z.array(z.string()).optional(),
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

export default function AdminAddProperty() {
  const [selectedPropertyType, setSelectedPropertyType] = useState("apartment")
  const [selectedPriceType, setSelectedPriceType] = useState("monthly")
  const [images, setImages] = useState<File[]>([])
  const [uploading, setUploading] = useState(false)
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([])

  const form = useForm<z.infer<typeof propertySchema>>({
    resolver: zodResolver(propertySchema),
    defaultValues: {
      title: "",
      description: "",
      propertyType: "apartment",
      priceType: "monthly",
      price: "",
      bedrooms: "",
      bathrooms: "",
      squareFeet: "",
      landSize: "",
      landUnit: "sqm",
      address: "",
      city: "",
      state: "",
      zipCode: "",
      featured: false,
      verified: true,
      amenities: [],
    },
  })

  const handlePropertyTypeChange = (value: string) => {
    setSelectedPropertyType(value)
    form.setValue("propertyType", value)
  }

  const handlePriceTypeChange = (value: string) => {
    setSelectedPriceType(value)
    form.setValue("priceType", value)
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const fileArray = Array.from(e.target.files)
      setImages([...images, ...fileArray])
    }
  }

  const handleAmenityChange = (amenity: string, checked: boolean) => {
    if (checked) {
      setSelectedAmenities([...selectedAmenities, amenity])
    } else {
      setSelectedAmenities(selectedAmenities.filter((item) => item !== amenity))
    }
  }

  const onSubmit = async (values: z.infer<typeof propertySchema>) => {
    try {
      setUploading(true)
      // Include selected amenities in the form values
      values.amenities = selectedAmenities

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))

      console.log("Form values:", values)
      console.log("Images:", images)

      toast({
        title: "Property Added Successfully",
        description: "The property has been added to the database.",
      })

      // Reset form
      form.reset()
      setImages([])
      setSelectedAmenities([])
    } catch (error) {
      console.error("Error adding property:", error)
      toast({
        title: "Error",
        description: "Failed to add property. Please try again.",
        variant: "destructive",
      })
    } finally {
      setUploading(false)
    }
  }

  const isLandedProperty =
    selectedPropertyType === "land" || selectedPropertyType === "plot" || selectedPropertyType === "farm"

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-2xl">Add New Property</CardTitle>
        <CardDescription>Create a new property listing with detailed information.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <Tabs defaultValue="basic" className="w-full">
              <TabsList className="grid grid-cols-4 mb-8">
                <TabsTrigger value="basic">Basic Info</TabsTrigger>
                <TabsTrigger value="details">Property Details</TabsTrigger>
                <TabsTrigger value="location">Location</TabsTrigger>
                <TabsTrigger value="media">Media & Amenities</TabsTrigger>
              </TabsList>

              <TabsContent value="basic" className="space-y-6">
                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Property Title</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter property title" {...field} />
                        </FormControl>
                        <FormDescription>A clear, descriptive title for the property.</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <Textarea placeholder="Describe the property in detail" className="min-h-32" {...field} />
                        </FormControl>
                        <FormDescription>Provide a detailed description of the property.</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="propertyType"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Property Type</FormLabel>
                          <Select onValueChange={(value) => handlePropertyTypeChange(value)} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select property type" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="apartment">Apartment</SelectItem>
                              <SelectItem value="house">House</SelectItem>
                              <SelectItem value="villa">Villa</SelectItem>
                              <SelectItem value="condo">Condominium</SelectItem>
                              <SelectItem value="townhouse">Townhouse</SelectItem>
                              <SelectItem value="land">Land</SelectItem>
                              <SelectItem value="plot">Plot</SelectItem>
                              <SelectItem value="farm">Farm</SelectItem>
                              <SelectItem value="commercial">Commercial</SelectItem>
                              <SelectItem value="office">Office Space</SelectItem>
                              <SelectItem value="warehouse">Warehouse</SelectItem>
                              <SelectItem value="retail">Retail Space</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="grid grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="priceType"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Price Type</FormLabel>
                            <Select onValueChange={(value) => handlePriceTypeChange(value)} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select price type" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="perNight">Per Night</SelectItem>
                                <SelectItem value="monthly">Monthly</SelectItem>
                                <SelectItem value="yearly">Yearly</SelectItem>
                                <SelectItem value="sale">For Sale</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="price"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Price (₦)</FormLabel>
                            <FormControl>
                              <Input type="number" placeholder="Enter price" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>

                  <div className="flex flex-col space-y-2">
                    <FormField
                      control={form.control}
                      name="featured"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center space-x-3 space-y-0 rounded-md border p-4">
                          <FormControl>
                            <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel>Featured Property</FormLabel>
                            <FormDescription>This property will be displayed in featured sections.</FormDescription>
                          </div>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="verified"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center space-x-3 space-y-0 rounded-md border p-4">
                          <FormControl>
                            <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel>Verified Property</FormLabel>
                            <FormDescription>This property has been verified by admin.</FormDescription>
                          </div>
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="details" className="space-y-6">
                <div className="space-y-4">
                  {!isLandedProperty ? (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <FormField
                        control={form.control}
                        name="bedrooms"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Bedrooms</FormLabel>
                            <FormControl>
                              <Input type="number" placeholder="Number of bedrooms" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="bathrooms"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Bathrooms</FormLabel>
                            <FormControl>
                              <Input type="number" placeholder="Number of bathrooms" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="squareFeet"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Square Feet</FormLabel>
                            <FormControl>
                              <Input type="number" placeholder="Property size in sq ft" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="landSize"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Land Size</FormLabel>
                            <FormControl>
                              <Input type="number" placeholder="Size of the land" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="landUnit"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Unit</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select unit" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="sqm">Square Meters</SelectItem>
                                <SelectItem value="sqft">Square Feet</SelectItem>
                                <SelectItem value="acres">Acres</SelectItem>
                                <SelectItem value="hectares">Hectares</SelectItem>
                                <SelectItem value="plots">Plots</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  )}

                  {isLandedProperty && (
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Land Features</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Land Type</Label>
                          <Select defaultValue="residential">
                            <SelectTrigger>
                              <SelectValue placeholder="Select land type" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="residential">Residential</SelectItem>
                              <SelectItem value="commercial">Commercial</SelectItem>
                              <SelectItem value="industrial">Industrial</SelectItem>
                              <SelectItem value="agricultural">Agricultural</SelectItem>
                              <SelectItem value="mixed">Mixed Use</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <Label>Topography</Label>
                          <Select defaultValue="flat">
                            <SelectTrigger>
                              <SelectValue placeholder="Select topography" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="flat">Flat</SelectItem>
                              <SelectItem value="sloped">Sloped</SelectItem>
                              <SelectItem value="hilly">Hilly</SelectItem>
                              <SelectItem value="waterfront">Waterfront</SelectItem>
                              <SelectItem value="valley">Valley</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label>Land Features</Label>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                          {[
                            "Road Access",
                            "Electricity",
                            "Water Supply",
                            "Fenced",
                            "Gated",
                            "Corner Piece",
                            "Survey Plan",
                            "C of O",
                            "Gazette",
                          ].map((feature) => (
                            <div key={feature} className="flex items-center space-x-2">
                              <Checkbox id={`feature-${feature}`} />
                              <label
                                htmlFor={`feature-${feature}`}
                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                              >
                                {feature}
                              </label>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </TabsContent>

              <TabsContent value="location" className="space-y-6">
                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Street Address</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter street address" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <FormField
                      control={form.control}
                      name="city"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>City</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter city" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="state"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>State</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter state" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="zipCode"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Zip Code</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter zip code" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Map Location</Label>
                    <div className="h-64 bg-muted rounded-md flex items-center justify-center">
                      <div className="text-center">
                        <MapPin className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                        <p className="text-sm text-muted-foreground">Map integration will be available here</p>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="media" className="space-y-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Property Images</Label>
                    <div className="border-2 border-dashed rounded-md p-6 flex flex-col items-center justify-center">
                      <UploadCloud className="h-10 w-10 text-muted-foreground mb-2" />
                      <p className="text-sm text-muted-foreground mb-2">Drag & drop images here or click to browse</p>
                      <Input type="file" multiple accept="image/*" className="max-w-xs" onChange={handleImageChange} />
                      <p className="text-xs text-muted-foreground mt-2">Upload up to 10 images (max 5MB each)</p>
                    </div>

                    {images.length > 0 && (
                      <div className="mt-4">
                        <h4 className="text-sm font-medium mb-2">Selected Images ({images.length})</h4>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                          {images.map((image, index) => (
                            <div key={index} className="relative aspect-square rounded-md bg-muted overflow-hidden">
                              <div className="absolute inset-0 flex items-center justify-center text-xs text-muted-foreground">
                                {image.name}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  <Separator className="my-4" />

                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Amenities</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                      {amenitiesList.map((amenity) => (
                        <div key={amenity} className="flex items-center space-x-2">
                          <Checkbox
                            id={`amenity-${amenity}`}
                            checked={selectedAmenities.includes(amenity)}
                            onCheckedChange={(checked) => handleAmenityChange(amenity, checked as boolean)}
                          />
                          <label
                            htmlFor={`amenity-${amenity}`}
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            {amenity}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>

            <div className="flex justify-end space-x-4">
              <Button variant="outline" type="button">
                Save as Draft
              </Button>
              <Button type="submit" disabled={uploading}>
                {uploading ? "Adding Property..." : "Add Property"}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
