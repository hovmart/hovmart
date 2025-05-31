"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import {
  BarChart3,
  Building,
  Calendar,
  ChevronDown,
  Download,
  Filter,
  Home,
  MapPin,
  MoreHorizontal,
  Plus,
  Search,
  Settings,
  Star,
  Tag,
  Trash2,
  TrendingUp,
  Users,
  Eye,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Checkbox } from "@/components/ui/checkbox"
import { properties } from "@/data/properties"

export function PropertyManagementOverview() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedProperties, setSelectedProperties] = useState<number[]>([])
  const [filterStatus, setFilterStatus] = useState("all")
  const [filterType, setFilterType] = useState("all")
  const [sortBy, setSortBy] = useState("newest")

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedProperties(properties.map((p) => p.id))
    } else {
      setSelectedProperties([])
    }
  }

  const handleSelectProperty = (propertyId: number, checked: boolean) => {
    if (checked) {
      setSelectedProperties([...selectedProperties, propertyId])
    } else {
      setSelectedProperties(selectedProperties.filter((id) => id !== propertyId))
    }
  }

  const filteredProperties = properties
    .filter((property) => {
      // Filter by search query
      if (
        searchQuery &&
        !property.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !property.location.toLowerCase().includes(searchQuery.toLowerCase())
      ) {
        return false
      }

      // Filter by status
      if (filterStatus !== "all") {
        const status = property.status || "active"
        if (status !== filterStatus) {
          return false
        }
      }

      // Filter by type
      if (filterType !== "all") {
        const type = property.type || "apartment"
        if (type !== filterType) {
          return false
        }
      }

      return true
    })
    .sort((a, b) => {
      // Sort properties
      switch (sortBy) {
        case "newest":
          return (b.createdAt || 0) - (a.createdAt || 0)
        case "oldest":
          return (a.createdAt || 0) - (b.createdAt || 0)
        case "price-high":
          return b.price - a.price
        case "price-low":
          return a.price - b.price
        case "rating":
          return (b.rating || 0) - (a.rating || 0)
        default:
          return 0
      }
    })

  // Calculate statistics
  const totalProperties = properties.length
  const activeProperties = properties.filter((p) => p.status === "active" || !p.status).length
  const pendingProperties = properties.filter((p) => p.status === "pending").length
  const inactiveProperties = properties.filter((p) => p.status === "inactive").length

  // Calculate property types
  const propertyTypes = properties.reduce((acc: Record<string, number>, property) => {
    const type = property.type || "apartment"
    acc[type] = (acc[type] || 0) + 1
    return acc
  }, {})

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Property Management</h1>
          <p className="text-gray-500">Manage and monitor all properties on the platform</p>
        </div>
        <div className="flex items-center gap-2">
          <Link href="/admin/properties/add">
            <Button className="bg-hovmart-purple hover:bg-hovmart-light">
              <Plus className="mr-2 h-4 w-4" />
              Add Property
            </Button>
          </Link>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Button variant="outline" size="icon">
            <Settings className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Property Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Total Properties</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-3xl font-bold">{totalProperties}</div>
              <div className="p-2 bg-blue-50 rounded-full">
                <Building className="h-5 w-5 text-blue-500" />
              </div>
            </div>
            <div className="mt-2 text-xs text-gray-500">
              <TrendingUp className="inline h-3 w-3 mr-1 text-green-500" />
              <span className="text-green-500 font-medium">+12%</span> from last month
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Active Listings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-3xl font-bold">{activeProperties}</div>
              <div className="p-2 bg-green-50 rounded-full">
                <Home className="h-5 w-5 text-green-500" />
              </div>
            </div>
            <div className="mt-2">
              <Progress value={(activeProperties / totalProperties) * 100} className="h-1" />
            </div>
            <div className="mt-1 text-xs text-gray-500">
              {Math.round((activeProperties / totalProperties) * 100)}% of total
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Pending Approval</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-3xl font-bold">{pendingProperties}</div>
              <div className="p-2 bg-amber-50 rounded-full">
                <Calendar className="h-5 w-5 text-amber-500" />
              </div>
            </div>
            <div className="mt-2">
              <Progress value={(pendingProperties / totalProperties) * 100} className="h-1 bg-gray-100">
                <div className="bg-amber-500 h-full rounded-full" />
              </Progress>
            </div>
            <div className="mt-1 text-xs text-gray-500">
              <Link href="/admin/properties/approvals" className="text-amber-500 hover:underline">
                View pending approvals
              </Link>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Average Rating</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-3xl font-bold">4.8</div>
              <div className="p-2 bg-purple-50 rounded-full">
                <Star className="h-5 w-5 text-purple-500 fill-purple-500" />
              </div>
            </div>
            <div className="mt-2 flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`h-4 w-4 ${star <= 4 ? "text-yellow-400 fill-yellow-400" : "text-gray-200 fill-gray-200"}`}
                />
              ))}
            </div>
            <div className="mt-1 text-xs text-gray-500">Based on 1,248 reviews</div>
          </CardContent>
        </Card>
      </div>

      {/* Property Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Property Distribution</CardTitle>
            <CardDescription>Breakdown of properties by type and location</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80 flex items-center justify-center">
              <div className="text-center">
                <BarChart3 className="h-16 w-16 text-gray-200 mx-auto mb-4" />
                <p className="text-gray-500">Property distribution chart will appear here</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Property Types</CardTitle>
            <CardDescription>Distribution by property category</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {Object.entries(propertyTypes)
                .sort(([, countA], [, countB]) => (countB as number) - (countA as number))
                .slice(0, 5)
                .map(([type, count]) => (
                  <div key={type} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-hovmart-purple"></div>
                      <span className="capitalize">{type}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-gray-500">{count}</span>
                      <span className="text-xs text-gray-400">
                        ({Math.round(((count as number) / totalProperties) * 100)}%)
                      </span>
                    </div>
                  </div>
                ))}
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="ghost" className="w-full text-hovmart-purple">
              View All Categories
            </Button>
          </CardFooter>
        </Card>
      </div>

      {/* Property Listings */}
      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <CardTitle>Property Listings</CardTitle>
              <CardDescription>Manage all properties on the platform</CardDescription>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <div className="relative w-full md:w-64">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                <Input
                  type="search"
                  placeholder="Search properties..."
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-[130px]">
                  <div className="flex items-center gap-2">
                    <Filter className="h-4 w-4" />
                    <span>Status</span>
                  </div>
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Filter by Status</SelectLabel>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>

              <Select value={filterType} onValueChange={setFilterType}>
                <SelectTrigger className="w-[130px]">
                  <div className="flex items-center gap-2">
                    <Home className="h-4 w-4" />
                    <span>Type</span>
                  </div>
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Filter by Type</SelectLabel>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="apartment">Apartment</SelectItem>
                    <SelectItem value="house">House</SelectItem>
                    <SelectItem value="villa">Villa</SelectItem>
                    <SelectItem value="land">Land</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[130px]">
                  <div className="flex items-center gap-2">
                    <ChevronDown className="h-4 w-4" />
                    <span>Sort</span>
                  </div>
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Sort Properties</SelectLabel>
                    <SelectItem value="newest">Newest First</SelectItem>
                    <SelectItem value="oldest">Oldest First</SelectItem>
                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                    <SelectItem value="rating">Highest Rated</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50 border-b">
                    <th className="py-3 px-4 text-left">
                      <Checkbox
                        checked={
                          selectedProperties.length === filteredProperties.length && filteredProperties.length > 0
                        }
                        onCheckedChange={handleSelectAll}
                      />
                    </th>
                    <th className="py-3 px-4 text-left font-medium text-gray-500 text-sm">Property</th>
                    <th className="py-3 px-4 text-left font-medium text-gray-500 text-sm">Location</th>
                    <th className="py-3 px-4 text-left font-medium text-gray-500 text-sm">Type</th>
                    <th className="py-3 px-4 text-left font-medium text-gray-500 text-sm">Price</th>
                    <th className="py-3 px-4 text-left font-medium text-gray-500 text-sm">Status</th>
                    <th className="py-3 px-4 text-left font-medium text-gray-500 text-sm">Rating</th>
                    <th className="py-3 px-4 text-left font-medium text-gray-500 text-sm">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredProperties.slice(0, 10).map((property) => (
                    <tr key={property.id} className="border-b hover:bg-gray-50">
                      <td className="py-3 px-4">
                        <Checkbox
                          checked={selectedProperties.includes(property.id)}
                          onCheckedChange={(checked) => handleSelectProperty(property.id, !!checked)}
                        />
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded overflow-hidden flex-shrink-0">
                            <Image
                              src={property.images?.[0] || "/placeholder.svg"}
                              alt={property.title}
                              width={40}
                              height={40}
                              className="h-full w-full object-cover"
                            />
                          </div>
                          <div>
                            <div className="font-medium">{property.title}</div>
                            <div className="text-xs text-gray-500">ID: {property.id}</div>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center">
                          <MapPin className="h-4 w-4 text-gray-400 mr-1" />
                          <span>{property.location}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4 capitalize">{property.type || "apartment"}</td>
                      <td className="py-3 px-4">
                        <div className="flex items-center">
                          <Tag className="h-4 w-4 text-gray-400 mr-1" />
                          <span>
                            ₦{property.price.toLocaleString()}
                            <span className="text-xs text-gray-500">
                              /{property.priceType === "sale" ? "total" : property.priceType || "month"}
                            </span>
                          </span>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <Badge
                          className={`${
                            property.status === "pending"
                              ? "bg-amber-100 text-amber-800"
                              : property.status === "inactive"
                                ? "bg-gray-100 text-gray-800"
                                : "bg-green-100 text-green-800"
                          }`}
                        >
                          {property.status || "active"}
                        </Badge>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center">
                          <Star className="h-4 w-4 text-yellow-400 fill-yellow-400 mr-1" />
                          <span>{property.rating || "4.5"}</span>
                          <span className="text-xs text-gray-500 ml-1">({property.reviews || "12"})</span>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Link href={`/properties/${property.id}`} className="flex items-center w-full">
                                <Eye className="mr-2 h-4 w-4" />
                                View Property
                              </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Link href={`/admin/properties/edit/${property.id}`} className="flex items-center w-full">
                                <Settings className="mr-2 h-4 w-4" />
                                Edit Property
                              </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Users className="mr-2 h-4 w-4" />
                              View Bookings
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-red-600">
                              <Trash2 className="mr-2 h-4 w-4" />
                              Delete Property
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex items-center justify-between">
          <div className="text-sm text-gray-500">
            Showing {Math.min(10, filteredProperties.length)} of {filteredProperties.length} properties
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" disabled>
              Previous
            </Button>
            <Button variant="outline" size="sm" className="bg-gray-100">
              1
            </Button>
            <Button variant="outline" size="sm">
              2
            </Button>
            <Button variant="outline" size="sm">
              3
            </Button>
            <Button variant="outline" size="sm">
              Next
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
