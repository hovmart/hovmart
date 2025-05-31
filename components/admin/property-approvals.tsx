"use client"

import { useState } from "react"
import { CheckCircle, Eye, XCircle, Clock, ArrowRight, AlertTriangle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"

// Sample property data (using the same data structure as in properties-management.tsx)
const pendingProperties = [
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
    description:
      "A stunning beachfront property with panoramic ocean views, featuring 5 bedrooms, 6 bathrooms, a private pool, and direct beach access.",
    amenities: ["Pool", "Beach Access", "Air Conditioning", "Wifi", "Kitchen", "Parking"],
    images: ["/lagos-beachfront-luxury-home.png"],
    owner: {
      name: "Sarah Williams",
      email: "sarah@example.com",
      phone: "+234 812 345 6789",
      avatar: "/woman-portrait-2.png",
      joinedDate: "2023-01-15",
      verificationStatus: "verified",
    },
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
    description:
      "An exclusive waterfront villa in the prestigious Banana Island, featuring 7 bedrooms, 8 bathrooms, a private jetty, infinity pool, and panoramic lagoon views.",
    amenities: ["Pool", "Waterfront", "Air Conditioning", "Wifi", "Kitchen", "Parking", "Security", "Private Jetty"],
    images: ["/elegant-villa-lagos.png"],
    owner: {
      name: "James Anderson",
      email: "james@example.com",
      phone: "+234 803 456 7890",
      avatar: "/man-portrait-3.png",
      joinedDate: "2022-11-20",
      verificationStatus: "verified",
    },
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
    description:
      "A modern office space in the heart of Victoria Island's business district, featuring open-plan layouts, meeting rooms, high-speed internet, and 24/7 security.",
    amenities: ["Air Conditioning", "Wifi", "Parking", "Security", "Meeting Rooms", "Reception"],
    images: ["/modern-lagos-office.png"],
    owner: {
      name: "Olivia Taylor",
      email: "olivia@example.com",
      phone: "+234 705 678 9012",
      avatar: "/woman-portrait.png",
      joinedDate: "2023-02-05",
      verificationStatus: "pending",
    },
  },
]

const rejectedProperties = [
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
    rejectionReason:
      "Incomplete property details and low-quality images. Please provide more detailed information about the property and upload high-resolution images.",
    description: "A luxury beachfront condo with ocean views.",
    amenities: ["Pool", "Beach Access", "Air Conditioning"],
    images: ["/lagos-beachfront-luxury-home.png"],
    owner: {
      name: "Daniel Brown",
      email: "daniel@example.com",
      phone: "+234 809 123 4567",
      avatar: "/thoughtful-man-portrait.png",
      joinedDate: "2023-03-10",
      verificationStatus: "verified",
    },
  },
]

export default function PropertyApprovals() {
  const { toast } = useToast()
  const [selectedProperty, setSelectedProperty] = useState<any>(null)
  const [isApprovalDialogOpen, setIsApprovalDialogOpen] = useState(false)
  const [isRejectionDialogOpen, setIsRejectionDialogOpen] = useState(false)
  const [rejectionReason, setRejectionReason] = useState("")
  const [activeTab, setActiveTab] = useState("pending")

  const handleApproveProperty = (property: any) => {
    toast({
      title: "Property approved",
      description: `${property.title} has been approved and is now live.`,
    })
    setIsApprovalDialogOpen(false)
  }

  const handleRejectProperty = (property: any, reason: string) => {
    toast({
      title: "Property rejected",
      description: `${property.title} has been rejected.`,
    })
    setRejectionReason("")
    setIsRejectionDialogOpen(false)
  }

  const openApprovalDialog = (property: any) => {
    setSelectedProperty(property)
    setIsApprovalDialogOpen(true)
  }

  const openRejectionDialog = (property: any) => {
    setSelectedProperty(property)
    setIsRejectionDialogOpen(true)
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Property Approvals</h1>
        <p className="text-gray-500">Review and manage property submissions</p>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 bg-amber-50 text-amber-700 px-3 py-1.5 rounded-md">
            <Clock className="h-4 w-4" />
            <span className="text-sm font-medium">{pendingProperties.length} Pending</span>
          </div>
          <div className="flex items-center gap-2 bg-red-50 text-red-700 px-3 py-1.5 rounded-md">
            <XCircle className="h-4 w-4" />
            <span className="text-sm font-medium">{rejectedProperties.length} Rejected</span>
          </div>
        </div>
        <Button variant="outline">
          View All Properties
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>

      <Tabs defaultValue="pending" value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="pending" className="relative">
            Pending Approval
            {pendingProperties.length > 0 && (
              <span className="ml-2 inline-flex h-5 w-5 items-center justify-center rounded-full bg-amber-100 text-xs font-medium text-amber-800">
                {pendingProperties.length}
              </span>
            )}
          </TabsTrigger>
          <TabsTrigger value="rejected">
            Rejected
            {rejectedProperties.length > 0 && (
              <span className="ml-2 inline-flex h-5 w-5 items-center justify-center rounded-full bg-red-100 text-xs font-medium text-red-800">
                {rejectedProperties.length}
              </span>
            )}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="pending" className="space-y-4 mt-6">
          {pendingProperties.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <CheckCircle className="h-12 w-12 text-green-500 mb-4" />
                <h3 className="text-xl font-medium">No pending approvals</h3>
                <p className="text-gray-500 mt-2">All properties have been reviewed</p>
              </CardContent>
            </Card>
          ) : (
            pendingProperties.map((property) => (
              <Card key={property.id} className="overflow-hidden">
                <div className="flex flex-col md:flex-row">
                  <div className="w-full md:w-1/3 h-48 md:h-auto">
                    <img
                      src={property.images[0] || "/placeholder.svg"}
                      alt={property.title}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="flex-1 p-6">
                    <div className="flex flex-col md:flex-row justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="text-xl font-semibold">{property.title}</h3>
                          <Badge className="bg-blue-100 text-blue-800">{property.type}</Badge>
                        </div>
                        <p className="text-gray-500 mb-4">{property.location}</p>
                        <p className="text-lg font-bold mb-4">₦{property.price.toLocaleString()}</p>
                        <p className="text-gray-700 mb-4 line-clamp-2">{property.description}</p>

                        <div className="mb-4">
                          <h4 className="text-sm font-medium mb-2">Amenities</h4>
                          <div className="flex flex-wrap gap-2">
                            {property.amenities.map((amenity) => (
                              <Badge key={amenity} variant="outline" className="bg-gray-50">
                                {amenity}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="md:w-64 space-y-4">
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <h4 className="text-sm font-medium mb-3">Owner Information</h4>
                          <div className="flex items-center gap-3 mb-3">
                            <Avatar>
                              <AvatarImage
                                src={property.owner.avatar || "/placeholder.svg"}
                                alt={property.owner.name}
                              />
                              <AvatarFallback>{property.owner.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium">{property.owner.name}</p>
                              <p className="text-xs text-gray-500">{property.owner.email}</p>
                            </div>
                          </div>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span className="text-gray-500">Phone:</span>
                              <span>{property.owner.phone}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-500">Joined:</span>
                              <span>{property.owner.joinedDate}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-500">Verification:</span>
                              <Badge
                                className={
                                  property.owner.verificationStatus === "verified"
                                    ? "bg-green-100 text-green-800"
                                    : "bg-amber-100 text-amber-800"
                                }
                              >
                                {property.owner.verificationStatus}
                              </Badge>
                            </div>
                          </div>
                        </div>

                        <div className="flex flex-col gap-2">
                          <Button
                            className="bg-green-600 hover:bg-green-700 w-full"
                            onClick={() => openApprovalDialog(property)}
                          >
                            <CheckCircle className="mr-2 h-4 w-4" />
                            Approve
                          </Button>
                          <Button
                            variant="outline"
                            className="text-red-600 hover:text-red-700 w-full"
                            onClick={() => openRejectionDialog(property)}
                          >
                            <XCircle className="mr-2 h-4 w-4" />
                            Reject
                          </Button>
                          <Button variant="outline" className="w-full">
                            <Eye className="mr-2 h-4 w-4" />
                            View Details
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <CardFooter className="bg-gray-50 px-6 py-3">
                  <div className="flex items-center justify-between w-full">
                    <div className="flex items-center gap-2 text-gray-500">
                      <Clock className="h-4 w-4" />
                      <span className="text-sm">Submitted {property.created}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-500">Property ID:</span>
                      <Badge variant="outline">{property.id}</Badge>
                    </div>
                  </div>
                </CardFooter>
              </Card>
            ))
          )}
        </TabsContent>

        <TabsContent value="rejected" className="space-y-4 mt-6">
          {rejectedProperties.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <CheckCircle className="h-12 w-12 text-green-500 mb-4" />
                <h3 className="text-xl font-medium">No rejected properties</h3>
                <p className="text-gray-500 mt-2">All submitted properties have been approved</p>
              </CardContent>
            </Card>
          ) : (
            rejectedProperties.map((property) => (
              <Card key={property.id} className="overflow-hidden border-red-200">
                <div className="flex flex-col md:flex-row">
                  <div className="w-full md:w-1/3 h-48 md:h-auto relative">
                    <div className="absolute inset-0 bg-red-900/20 flex items-center justify-center">
                      <div className="bg-white/90 px-4 py-2 rounded-md flex items-center gap-2">
                        <XCircle className="h-5 w-5 text-red-600" />
                        <span className="font-medium text-red-600">Rejected</span>
                      </div>
                    </div>
                    <img
                      src={property.images[0] || "/placeholder.svg"}
                      alt={property.title}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="flex-1 p-6">
                    <div className="flex flex-col md:flex-row justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="text-xl font-semibold">{property.title}</h3>
                          <Badge className="bg-blue-100 text-blue-800">{property.type}</Badge>
                        </div>
                        <p className="text-gray-500 mb-4">{property.location}</p>
                        <p className="text-lg font-bold mb-4">₦{property.price.toLocaleString()}</p>

                        <div className="mb-4 bg-red-50 border border-red-200 rounded-md p-4">
                          <div className="flex items-start gap-2 mb-2">
                            <AlertTriangle className="h-5 w-5 text-red-600 mt-0.5" />
                            <h4 className="text-sm font-medium text-red-700">Rejection Reason</h4>
                          </div>
                          <p className="text-red-600 text-sm">{property.rejectionReason}</p>
                        </div>

                        <p className="text-gray-700 mb-4 line-clamp-2">{property.description}</p>
                      </div>

                      <div className="md:w-64 space-y-4">
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <h4 className="text-sm font-medium mb-3">Owner Information</h4>
                          <div className="flex items-center gap-3 mb-3">
                            <Avatar>
                              <AvatarImage
                                src={property.owner.avatar || "/placeholder.svg"}
                                alt={property.owner.name}
                              />
                              <AvatarFallback>{property.owner.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium">{property.owner.name}</p>
                              <p className="text-xs text-gray-500">{property.owner.email}</p>
                            </div>
                          </div>
                        </div>

                        <div className="flex flex-col gap-2">
                          <Button variant="outline" className="w-full">
                            <Eye className="mr-2 h-4 w-4" />
                            View Details
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <CardFooter className="bg-gray-50 px-6 py-3">
                  <div className="flex items-center justify-between w-full">
                    <div className="flex items-center gap-2 text-gray-500">
                      <Clock className="h-4 w-4" />
                      <span className="text-sm">Submitted {property.created}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-500">Property ID:</span>
                      <Badge variant="outline">{property.id}</Badge>
                    </div>
                  </div>
                </CardFooter>
              </Card>
            ))
          )}
        </TabsContent>
      </Tabs>

      {/* Approval Dialog */}
      <Dialog open={isApprovalDialogOpen} onOpenChange={setIsApprovalDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Approve Property</DialogTitle>
            <DialogDescription>
              Are you sure you want to approve this property? Once approved, it will be visible to all users.
            </DialogDescription>
          </DialogHeader>
          {selectedProperty && (
            <div className="flex items-center gap-4 py-4">
              <div className="bg-green-100 p-3 rounded-full">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="font-medium">{selectedProperty.title}</p>
                <p className="text-sm text-gray-500">{selectedProperty.location}</p>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsApprovalDialogOpen(false)}>
              Cancel
            </Button>
            <Button
              className="bg-green-600 hover:bg-green-700"
              onClick={() => selectedProperty && handleApproveProperty(selectedProperty)}
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
          {selectedProperty && (
            <div className="flex items-center gap-4 py-2">
              <div className="bg-red-100 p-3 rounded-full">
                <XCircle className="h-6 w-6 text-red-600" />
              </div>
              <div>
                <p className="font-medium">{selectedProperty.title}</p>
                <p className="text-sm text-gray-500">{selectedProperty.location}</p>
              </div>
            </div>
          )}
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
              onClick={() => selectedProperty && handleRejectProperty(selectedProperty, rejectionReason)}
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
