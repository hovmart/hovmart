"use client"

import { DropdownMenuItem } from "@/components/ui/dropdown-menu"

import { useState } from "react"
import {
  Building2,
  Edit,
  Eye,
  Filter,
  Grid,
  List,
  MoreHorizontal,
  Plus,
  Search,
  SlidersHorizontal,
  Trash2,
  Upload,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Checkbox } from "@/components/ui/checkbox"
import { Switch } from "@/components/ui/switch"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useToast } from "@/hooks/use-toast"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { CheckCircle, XCircle, AlertCircle, Clock } from "lucide-react"

// Sample property data
const properties = [
  {
    id: "PROP-001",
    title: "Luxury Ocean View Apartment",
    type: "Apartment",
    location: "Lagos, Nigeria",
    price: 250000,
    status: "active",
    featured: true,
    verified: true,
    bookings: 12,
    rating: 4.8,
    created: "2023-05-15",
    approvalStatus: "approved",
    owner: {
      name: "John Doe",
      email: "john@example.com",
      avatar: "/thoughtful-man-portrait.png",
    },
    image: "/luxury-ocean-view-apartment.png",
  },
  {
    id: "PROP-002",
    title: "Modern Ikoyi Apartment",
    type: "Apartment",
    location: "Ikoyi, Lagos",
    price: 180000,
    status: "active",
    featured: false,
    verified: true,
    bookings: 8,
    rating: 4.5,
    created: "2023-06-20",
    approvalStatus: "approved",
    owner: {
      name: "Jane Smith",
      email: "jane@example.com",
      avatar: "/woman-portrait.png",
    },
    image: "/modern-ikoyi-apartment.png",
  },
  {
    id: "PROP-003",
    title: "Elegant Villa Lagos",
    type: "Villa",
    location: "Victoria Island, Lagos",
    price: 450000,
    status: "active",
    featured: true,
    verified: true,
    bookings: 5,
    rating: 4.9,
    created: "2023-04-10",
    approvalStatus: "approved",
    owner: {
      name: "Robert Johnson",
      email: "robert@example.com",
      avatar: "/man-portrait-3.png",
    },
    image: "/elegant-villa-lagos.png",
  },
  {
    id: "PROP-004",
    title: "Lagos Beachfront Luxury Home",
    type: "House",
    location: "Lekki, Lagos",
    price: 350000,
    status: "pending",
    featured: false,
    verified: false,
    bookings: 0,
    rating: 0,
    created: "2023-07-05",
    approvalStatus: "pending",
    owner: {
      name: "Sarah Williams",
      email: "sarah@example.com",
      avatar: "/woman-portrait-2.png",
    },
    image: "/lagos-beachfront-luxury-home.png",
  },
  {
    id: "PROP-005",
    title: "Ikeja Serviced Apartment",
    type: "Apartment",
    location: "Ikeja, Lagos",
    price: 150000,
    status: "active",
    featured: false,
    verified: true,
    bookings: 10,
    rating: 4.3,
    created: "2023-03-25",
    approvalStatus: "approved",
    owner: {
      name: "Michael Brown",
      email: "michael@example.com",
      avatar: "/thoughtful-man-portrait.png",
    },
    image: "/ikeja-serviced-apartment.png",
  },
  {
    id: "PROP-006",
    title: "Lagos Penthouse View",
    type: "Penthouse",
    location: "Victoria Island, Lagos",
    price: 550000,
    status: "active",
    featured: true,
    verified: true,
    bookings: 3,
    rating: 5.0,
    created: "2023-06-15",
    approvalStatus: "approved",
    owner: {
      name: "Emily Davis",
      email: "emily@example.com",
      avatar: "/woman-portrait-3.png",
    },
    image: "/lagos-penthouse-view.png",
  },
  {
    id: "PROP-007",
    title: "Cozy Yaba Studio",
    type: "Studio",
    location: "Yaba, Lagos",
    price: 90000,
    status: "inactive",
    featured: false,
    verified: true,
    bookings: 15,
    rating: 4.2,
    created: "2023-02-10",
    approvalStatus: "approved",
    owner: {
      name: "David Wilson",
      email: "david@example.com",
      avatar: "/man-portrait-3.png",
    },
    image: "/cozy-yaba-studio.png",
  },
  {
    id: "PROP-008",
    title: "Nigerian Farmhouse",
    type: "Farmhouse",
    location: "Epe, Lagos",
    price: 200000,
    status: "active",
    featured: false,
    verified: true,
    bookings: 6,
    rating: 4.6,
    created: "2023-05-05",
    approvalStatus: "approved",
    owner: {
      name: "Lisa Johnson",
      email: "lisa@example.com",
      avatar: "/woman-portrait.png",
    },
    image: "/nigerian-farmhouse.png",
  },
  {
    id: "PROP-009",
    title: "Luxury Waterfront Villa",
    type: "Villa",
    location: "Banana Island, Lagos",
    price: 750000,
    status: "pending",
    featured: false,
    verified: false,
    bookings: 0,
    rating: 0,
    created: "2023-07-10",
    approvalStatus: "pending",
    owner: {
      name: "James Anderson",
      email: "james@example.com",
      avatar: "/man-portrait-3.png",
    },
    image: "/elegant-villa-lagos.png",
  },
  {
    id: "PROP-010",
    title: "Modern Office Space",
    type: "Commercial",
    location: "Victoria Island, Lagos",
    price: 450000,
    status: "pending",
    featured: false,
    verified: false,
    bookings: 0,
    rating: 0,
    created: "2023-07-12",
    approvalStatus: "pending",
    owner: {
      name: "Olivia Taylor",
      email: "olivia@example.com",
      avatar: "/woman-portrait.png",
    },
    image: "/modern-lagos-office.png",
  },
  {
    id: "PROP-011",
    title: "Luxury Beachfront Condo",
    type: "Condo",
    location: "Lekki, Lagos",
    price: 380000,
    status: "pending",
    featured: false,
    verified: false,
    bookings: 0,
    rating: 0,
    created: "2023-07-15",
    approvalStatus: "rejected",
    rejectionReason: "Incomplete property details and low-quality images",
    owner: {
      name: "Daniel Brown",
      email: "daniel@example.com",
      avatar: "/thoughtful-man-portrait.png",
    },
    image: "/lagos-beachfront-luxury-home.png",
  },
]

export default function PropertiesManagement() {
  const { toast } = useToast()
  const [viewMode, setViewMode] = useState<"grid" | "list">("list")
  const [selectedProperties, setSelectedProperties] = useState<string[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [typeFilter, setTypeFilter] = useState<string>("all")
  const [sortBy, setSortBy] = useState<string>("newest")
  const [approvalFilter, setApprovalFilter] = useState<string>("all")
  const [isApprovalDialogOpen, setIsApprovalDialogOpen] = useState(false)
  const [isRejectionDialogOpen, setIsRejectionDialogOpen] = useState(false)
  const [selectedPropertyId, setSelectedPropertyId] = useState<string>("")
  const [rejectionReason, setRejectionReason] = useState("")

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedProperties(properties.map((property) => property.id))
    } else {
      setSelectedProperties([])
    }
  }

  const handleSelectProperty = (propertyId: string, checked: boolean) => {
    if (checked) {
      setSelectedProperties([...selectedProperties, propertyId])
    } else {
      setSelectedProperties(selectedProperties.filter((id) => id !== propertyId))
    }
  }

  const handleDeleteProperty = (propertyId: string) => {
    toast({
      title: "Property deleted",
      description: `Property ${propertyId} has been deleted.`,
    })
  }

  const handleToggleFeatured = (propertyId: string, featured: boolean) => {
    toast({
      title: featured ? "Property featured" : "Property unfeatured",
      description: `Property ${propertyId} has been ${featured ? "featured" : "unfeatured"}.`,
    })
  }

  const handleToggleVerified = (propertyId: string, verified: boolean) => {
    toast({
      title: verified ? "Property verified" : "Property unverified",
      description: `Property ${propertyId} has been ${verified ? "verified" : "unverified"}.`,
    })
  }

  const handleApproveProperty = (propertyId: string) => {
    // In a real application, this would make an API call
    toast({
      title: "Property approved",
      description: `Property ${propertyId} has been approved and is now live.`,
    })
    setIsApprovalDialogOpen(false)
  }

  const handleRejectProperty = (propertyId: string, reason: string) => {
    // In a real application, this would make an API call
    toast({
      title: "Property rejected",
      description: `Property ${propertyId} has been rejected.`,
    })
    setRejectionReason("")
    setIsRejectionDialogOpen(false)
  }

  const openApprovalDialog = (propertyId: string) => {
    setSelectedPropertyId(propertyId)
    setIsApprovalDialogOpen(true)
  }

  const openRejectionDialog = (propertyId: string) => {
    setSelectedPropertyId(propertyId)
    setIsRejectionDialogOpen(true)
  }

  const filteredProperties = properties
    .filter((property) => {
      // Apply search filter
      if (searchQuery && !property.title.toLowerCase().includes(searchQuery.toLowerCase())) {
        return false
      }

      // Apply status filter
      if (statusFilter !== "all" && property.status !== statusFilter) {
        return false
      }

      // Apply type filter
      if (typeFilter !== "all" && property.type !== typeFilter) {
        return false
      }

      // Apply approval status filter
      if (approvalFilter !== "all" && property.approvalStatus !== approvalFilter) {
        return false
      }

      return true
    })
    .sort((a, b) => {
      // Apply sorting
      switch (sortBy) {
        case "newest":
          return new Date(b.created).getTime() - new Date(a.created).getTime()
        case "oldest":
          return new Date(a.created).getTime() - new Date(b.created).getTime()
        case "price-high":
          return b.price - a.price
        case "price-low":
          return a.price - b.price
        case "bookings":
          return b.bookings - a.bookings
        case "rating":
          return b.rating - a.rating
        default:
          return 0
      }
    })

  const propertyTypes = Array.from(new Set(properties.map((p) => p.type)))

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Properties</h1>
          <p className="text-gray-500">Manage all your property listings</p>
        </div>
        <div className="flex items-center gap-2">
          <Button className="bg-purple-600 hover:bg-purple-700">
            <Plus className="mr-2 h-4 w-4" />
            Add Property
          </Button>
          <Button variant="outline">
            <Upload className="mr-2 h-4 w-4" />
            Import
          </Button>
        </div>
      </div>

      <Card className="border-none shadow-md">
        <CardHeader className="pb-3">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="flex items-center gap-2">
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
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="icon">
                    <Filter className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>Filter Properties</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <div className="p-2">
                    <p className="text-sm font-medium mb-1">Status</p>
                    <Select value={statusFilter} onValueChange={setStatusFilter}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Statuses</SelectItem>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="inactive">Inactive</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="p-2">
                    <p className="text-sm font-medium mb-1">Property Type</p>
                    <Select value={typeFilter} onValueChange={setTypeFilter}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Types</SelectItem>
                        {propertyTypes.map((type) => (
                          <SelectItem key={type} value={type}>
                            {type}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="p-2">
                    <p className="text-sm font-medium mb-1">Sort By</p>
                    <Select value={sortBy} onValueChange={setSortBy}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Sort by" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="newest">Newest First</SelectItem>
                        <SelectItem value="oldest">Oldest First</SelectItem>
                        <SelectItem value="price-high">Price: High to Low</SelectItem>
                        <SelectItem value="price-low">Price: Low to High</SelectItem>
                        <SelectItem value="bookings">Most Bookings</SelectItem>
                        <SelectItem value="rating">Highest Rating</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="p-2">
                    <p className="text-sm font-medium mb-1">Approval Status</p>
                    <Select value={approvalFilter} onValueChange={setApprovalFilter}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select approval status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All</SelectItem>
                        <SelectItem value="approved">Approved</SelectItem>
                        <SelectItem value="pending">Pending Approval</SelectItem>
                        <SelectItem value="rejected">Rejected</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <DropdownMenuSeparator />
                  <div className="p-2">
                    <Button size="sm" variant="outline" className="w-full">
                      <SlidersHorizontal className="mr-2 h-4 w-4" />
                      Advanced Filters
                    </Button>
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>
              <div className="flex items-center border rounded-md overflow-hidden">
                <Button
                  variant="ghost"
                  size="icon"
                  className={`rounded-none ${viewMode === "list" ? "bg-gray-100" : ""}`}
                  onClick={() => setViewMode("list")}
                >
                  <List className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className={`rounded-none ${viewMode === "grid" ? "bg-gray-100" : ""}`}
                  onClick={() => setViewMode("grid")}
                >
                  <Grid className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {selectedProperties.length > 0 && (
                <>
                  <span className="text-sm text-gray-500">{selectedProperties.length} selected</span>
                  <Button variant="outline" size="sm">
                    <Building2 className="mr-2 h-4 w-4" />
                    Feature
                  </Button>
                  <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete
                  </Button>
                </>
              )}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all" className="space-y-4">
            <TabsList>
              <TabsTrigger value="all">All Properties</TabsTrigger>
              <TabsTrigger value="active">Active</TabsTrigger>
              <TabsTrigger value="pending">Pending</TabsTrigger>
              <TabsTrigger value="inactive">Inactive</TabsTrigger>
              <TabsTrigger value="featured">Featured</TabsTrigger>
              <TabsTrigger value="awaiting-approval" className="relative">
                Awaiting Approval
                {properties.filter((p) => p.approvalStatus === "pending").length > 0 && (
                  <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] text-white">
                    {properties.filter((p) => p.approvalStatus === "pending").length}
                  </span>
                )}
              </TabsTrigger>
            </TabsList>
            <TabsContent value="all" className="space-y-4">
              {viewMode === "list" ? (
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-12">
                          <Checkbox
                            checked={selectedProperties.length === properties.length}
                            onCheckedChange={handleSelectAll}
                          />
                        </TableHead>
                        <TableHead className="w-[300px]">Property</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Price</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Approval</TableHead>
                        <TableHead>Bookings</TableHead>
                        <TableHead>Rating</TableHead>
                        <TableHead>Featured</TableHead>
                        <TableHead>Verified</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredProperties.map((property) => (
                        <TableRow key={property.id}>
                          <TableCell>
                            <Checkbox
                              checked={selectedProperties.includes(property.id)}
                              onCheckedChange={(checked) => handleSelectProperty(property.id, !!checked)}
                            />
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-3">
                              <div className="h-10 w-10 rounded overflow-hidden">
                                <img
                                  src={property.image || "/placeholder.svg"}
                                  alt={property.title}
                                  className="h-full w-full object-cover"
                                />
                              </div>
                              <div>
                                <p className="font-medium">{property.title}</p>
                                <p className="text-xs text-gray-500">{property.location}</p>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>{property.type}</TableCell>
                          <TableCell>₦{property.price.toLocaleString()}</TableCell>
                          <TableCell>
                            <Badge
                              className={
                                property.status === "active"
                                  ? "bg-green-100 text-green-800"
                                  : property.status === "pending"
                                    ? "bg-amber-100 text-amber-800"
                                    : "bg-gray-100 text-gray-800"
                              }
                            >
                              {property.status.charAt(0).toUpperCase() + property.status.slice(1)}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            {property.approvalStatus === "approved" ? (
                              <div className="flex items-center gap-1 text-green-600">
                                <CheckCircle className="h-4 w-4" />
                                <span className="text-xs">Approved</span>
                              </div>
                            ) : property.approvalStatus === "pending" ? (
                              <div className="flex items-center gap-1 text-blue-600">
                                <Clock className="h-4 w-4" />
                                <span className="text-xs">Pending</span>
                              </div>
                            ) : (
                              <div className="flex items-center gap-1 text-red-600">
                                <XCircle className="h-4 w-4" />
                                <span className="text-xs">Rejected</span>
                              </div>
                            )}
                          </TableCell>
                          <TableCell>{property.bookings}</TableCell>
                          <TableCell>{property.rating > 0 ? property.rating : "-"}</TableCell>
                          <TableCell>
                            <Switch
                              checked={property.featured}
                              onCheckedChange={(checked) => handleToggleFeatured(property.id, checked)}
                            />
                          </TableCell>
                          <TableCell>
                            <Switch
                              checked={property.verified}
                              onCheckedChange={(checked) => handleToggleVerified(property.id, checked)}
                            />
                          </TableCell>
                          <TableCell className="text-right">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem>
                                  <Eye className="mr-2 h-4 w-4" />
                                  View
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Edit className="mr-2 h-4 w-4" />
                                  Edit
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem
                                  className="text-red-600"
                                  onClick={() => handleDeleteProperty(property.id)}
                                >
                                  <Trash2 className="mr-2 h-4 w-4" />
                                  Delete
                                </DropdownMenuItem>
                                {property.approvalStatus === "pending" && (
                                  <>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem onClick={() => openApprovalDialog(property.id)}>
                                      <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
                                      Approve
                                    </DropdownMenuItem>
                                    <DropdownMenuItem
                                      className="text-red-600"
                                      onClick={() => openRejectionDialog(property.id)}
                                    >
                                      <XCircle className="mr-2 h-4 w-4" />
                                      Reject
                                    </DropdownMenuItem>
                                  </>
                                )}
                                {property.approvalStatus === "rejected" && property.rejectionReason && (
                                  <>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem className="text-amber-600">
                                      <AlertCircle className="mr-2 h-4 w-4" />
                                      Rejection Reason: {property.rejectionReason}
                                    </DropdownMenuItem>
                                  </>
                                )}
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredProperties.map((property) => (
                    <Card key={property.id} className="overflow-hidden">
                      <div className="relative h-48">
                        <img
                          src={property.image || "/placeholder.svg"}
                          alt={property.title}
                          className="h-full w-full object-cover"
                        />
                        <div className="absolute top-2 right-2 flex gap-1">
                          <Badge
                            className={
                              property.status === "active"
                                ? "bg-green-100 text-green-800"
                                : property.status === "pending"
                                  ? "bg-amber-100 text-amber-800"
                                  : "bg-gray-100 text-gray-800"
                            }
                          >
                            {property.status.charAt(0).toUpperCase() + property.status.slice(1)}
                          </Badge>
                          {property.featured && <Badge className="bg-purple-100 text-purple-800">Featured</Badge>}
                          {property.approvalStatus === "pending" && (
                            <Badge className="bg-blue-100 text-blue-800">Awaiting Approval</Badge>
                          )}
                          {property.approvalStatus === "rejected" && (
                            <Badge className="bg-red-100 text-red-800">Rejected</Badge>
                          )}
                        </div>
                        <div className="absolute top-2 left-2">
                          <Checkbox
                            checked={selectedProperties.includes(property.id)}
                            onCheckedChange={(checked) => handleSelectProperty(property.id, !!checked)}
                            className="bg-white/80"
                          />
                        </div>
                      </div>
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-semibold truncate">{property.title}</h3>
                            <p className="text-sm text-gray-500">{property.location}</p>
                          </div>
                          <Badge className="bg-blue-100 text-blue-800">{property.type}</Badge>
                        </div>
                        <div className="mt-2 flex justify-between items-center">
                          <p className="font-bold text-lg">₦{property.price.toLocaleString()}</p>
                          <div className="flex items-center gap-1">
                            <span className="text-sm">{property.rating > 0 ? property.rating : "-"}</span>
                            <svg className="h-4 w-4 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          </div>
                        </div>
                        <div className="mt-2 flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Avatar className="h-6 w-6">
                              <AvatarImage
                                src={property.owner.avatar || "/placeholder.svg"}
                                alt={property.owner.name}
                              />
                              <AvatarFallback>{property.owner.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <span className="text-xs text-gray-500">{property.owner.name}</span>
                          </div>
                          <span className="text-xs text-gray-500">{property.bookings} bookings</span>
                        </div>
                      </CardContent>
                      <CardFooter className="p-4 pt-0 flex justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-xs">Featured</span>
                          <Switch
                            checked={property.featured}
                            onCheckedChange={(checked) => handleToggleFeatured(property.id, checked)}
                          />
                        </div>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Eye className="mr-2 h-4 w-4" />
                              View
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Edit className="mr-2 h-4 w-4" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              className="text-red-600"
                              onClick={() => handleDeleteProperty(property.id)}
                            >
                              <Trash2 className="mr-2 h-4 w-4" />
                              Delete
                            </DropdownMenuItem>
                            {property.approvalStatus === "pending" && (
                              <>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem onClick={() => openApprovalDialog(property.id)}>
                                  <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
                                  Approve
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  className="text-red-600"
                                  onClick={() => openRejectionDialog(property.id)}
                                >
                                  <XCircle className="mr-2 h-4 w-4" />
                                  Reject
                                </DropdownMenuItem>
                              </>
                            )}
                            {property.approvalStatus === "rejected" && property.rejectionReason && (
                              <>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem className="text-amber-600">
                                  <AlertCircle className="mr-2 h-4 w-4" />
                                  Rejection Reason: {property.rejectionReason}
                                </DropdownMenuItem>
                              </>
                            )}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>
            <TabsContent value="active">
              <div className="rounded-md border">
                <Table>{/* Similar structure as "all" tab but filtered for active properties */}</Table>
              </div>
            </TabsContent>
            <TabsContent value="pending">
              <div className="rounded-md border">
                <Table>{/* Similar structure as "all" tab but filtered for pending properties */}</Table>
              </div>
            </TabsContent>
            <TabsContent value="inactive">
              <div className="rounded-md border">
                <Table>{/* Similar structure as "all" tab but filtered for inactive properties */}</Table>
              </div>
            </TabsContent>
            <TabsContent value="featured">
              <div className="rounded-md border">
                <Table>{/* Similar structure as "all" tab but filtered for featured properties */}</Table>
              </div>
            </TabsContent>
            <TabsContent value="awaiting-approval" className="space-y-4">
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-12">
                        <Checkbox
                          checked={
                            selectedProperties.length ===
                            properties.filter((p) => p.approvalStatus === "pending").length
                          }
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setSelectedProperties(
                                properties.filter((p) => p.approvalStatus === "pending").map((p) => p.id),
                              )
                            } else {
                              setSelectedProperties([])
                            }
                          }}
                        />
                      </TableHead>
                      <TableHead className="w-[300px]">Property</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Price</TableHead>
                      <TableHead>Owner</TableHead>
                      <TableHead>Submitted</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredProperties
                      .filter((property) => property.approvalStatus === "pending")
                      .map((property) => (
                        <TableRow key={property.id}>
                          <TableCell>
                            <Checkbox
                              checked={selectedProperties.includes(property.id)}
                              onCheckedChange={(checked) => handleSelectProperty(property.id, !!checked)}
                            />
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-3">
                              <div className="h-10 w-10 rounded overflow-hidden">
                                <img
                                  src={property.image || "/placeholder.svg"}
                                  alt={property.title}
                                  className="h-full w-full object-cover"
                                />
                              </div>
                              <div>
                                <p className="font-medium">{property.title}</p>
                                <p className="text-xs text-gray-500">{property.location}</p>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>{property.type}</TableCell>
                          <TableCell>₦{property.price.toLocaleString()}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Avatar className="h-6 w-6">
                                <AvatarImage
                                  src={property.owner.avatar || "/placeholder.svg"}
                                  alt={property.owner.name}
                                />
                                <AvatarFallback>{property.owner.name.charAt(0)}</AvatarFallback>
                              </Avatar>
                              <div>
                                <p className="text-sm font-medium">{property.owner.name}</p>
                                <p className="text-xs text-gray-500">{property.owner.email}</p>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>{property.created}</TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              <Button
                                variant="outline"
                                size="sm"
                                className="bg-green-50 text-green-600 hover:bg-green-100 hover:text-green-700"
                                onClick={() => openApprovalDialog(property.id)}
                              >
                                <CheckCircle className="mr-1 h-4 w-4" />
                                Approve
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                className="bg-red-50 text-red-600 hover:bg-red-100 hover:text-red-700"
                                onClick={() => openRejectionDialog(property.id)}
                              >
                                <XCircle className="mr-1 h-4 w-4" />
                                Reject
                              </Button>
                              <Button variant="outline" size="sm">
                                <Eye className="h-4 w-4" />
                                <span className="sr-only">View</span>
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    {filteredProperties.filter((property) => property.approvalStatus === "pending").length === 0 && (
                      <TableRow>
                        <TableCell colSpan={7} className="h-24 text-center">
                          <div className="flex flex-col items-center justify-center text-gray-500">
                            <CheckCircle className="h-8 w-8 mb-2" />
                            <p>No properties awaiting approval</p>
                          </div>
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter className="flex items-center justify-between">
          <div className="text-sm text-gray-500">
            Showing {filteredProperties.length} of {properties.length} properties
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

      <Dialog open={isApprovalDialogOpen} onOpenChange={setIsApprovalDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Approve Property</DialogTitle>
            <DialogDescription>
              Are you sure you want to approve this property? Once approved, it will be visible to all users.
            </DialogDescription>
          </DialogHeader>
          <div className="flex items-center gap-4 py-4">
            <div className="bg-green-100 p-3 rounded-full">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <p className="font-medium">{properties.find((p) => p.id === selectedPropertyId)?.title}</p>
              <p className="text-sm text-gray-500">{properties.find((p) => p.id === selectedPropertyId)?.location}</p>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsApprovalDialogOpen(false)}>
              Cancel
            </Button>
            <Button
              className="bg-green-600 hover:bg-green-700"
              onClick={() => handleApproveProperty(selectedPropertyId)}
            >
              Approve Property
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Rejection Dialog */}
      <Dialog open={isRejectionDialogOpen} onOpenChange={setIsRejectionDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Reject Property</DialogTitle>
            <DialogDescription>
              Please provide a reason for rejecting this property. This will be sent to the property owner.
            </DialogDescription>
          </DialogHeader>
          <div className="flex items-center gap-4 py-2">
            <div className="bg-red-100 p-3 rounded-full">
              <XCircle className="h-6 w-6 text-red-600" />
            </div>
            <div>
              <p className="font-medium">{properties.find((p) => p.id === selectedPropertyId)?.title}</p>
              <p className="text-sm text-gray-500">{properties.find((p) => p.id === selectedPropertyId)?.location}</p>
            </div>
          </div>
          <div className="py-2">
            <label htmlFor="rejection-reason" className="text-sm font-medium">
              Rejection Reason
            </label>
            <Textarea
              id="rejection-reason"
              placeholder="Please provide details about why this property is being rejected..."
              value={rejectionReason}
              onChange={(e) => setRejectionReason(e.target.value)}
              className="mt-1"
              rows={4}
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsRejectionDialogOpen(false)}>
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={() => handleRejectProperty(selectedPropertyId, rejectionReason)}
              disabled={!rejectionReason.trim()}
            >
              Reject Property
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
