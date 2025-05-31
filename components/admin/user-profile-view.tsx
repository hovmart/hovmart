"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import {
  BadgeCheck,
  Building2,
  Calendar,
  Check,
  Clock,
  Edit,
  ExternalLink,
  Home,
  Lock,
  Mail,
  MapPin,
  Phone,
  Shield,
  ShoppingCart,
  User,
  XCircle,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

// Sample user data - in a real app, this would come from an API
const getUserData = (userId: string) => {
  // This is mock data - in a real app, you would fetch this from your API
  return {
    id: userId,
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+234 801 234 5678",
    role: "user",
    status: "active",
    suspended: false,
    suspensionReason: "",
    suspensionDate: null,
    suspensionEnd: null,
    verified: true,
    verificationDate: "2023-04-10",
    bookings: 5,
    properties: 2,
    spent: 1250000,
    joined: "2023-03-15",
    lastActive: "2023-07-20",
    avatar: "/thoughtful-man-portrait.png",
    address: "15 Marina Street, Lagos Island, Lagos",
    idVerified: true,
    emailVerified: true,
    phoneVerified: true,
    bio: "Real estate enthusiast and frequent traveler. Looking for comfortable stays during business trips.",
    recentActivity: [
      {
        id: "act-001",
        type: "booking",
        description: "Booked 'Luxury Ocean View Apartment'",
        date: "2023-07-15",
        amount: 250000,
      },
      {
        id: "act-002",
        type: "review",
        description: "Left a 5-star review for 'Modern Ikoyi Apartment'",
        date: "2023-07-10",
      },
      {
        id: "act-003",
        type: "property_view",
        description: "Viewed 'Lagos Penthouse View'",
        date: "2023-07-08",
      },
      {
        id: "act-004",
        type: "booking",
        description: "Booked 'Elegant Villa Lagos'",
        date: "2023-06-20",
        amount: 450000,
      },
      {
        id: "act-005",
        type: "account",
        description: "Updated profile information",
        date: "2023-06-15",
      },
    ],
    properties: [
      {
        id: "prop-001",
        title: "Modern Apartment in Lekki",
        status: "active",
        type: "Apartment",
        location: "Lekki, Lagos",
        price: 180000,
        image: "/modern-ikoyi-apartment.png",
        bookings: 3,
        rating: 4.5,
      },
      {
        id: "prop-002",
        title: "Cozy Studio in Yaba",
        status: "pending",
        type: "Studio",
        location: "Yaba, Lagos",
        price: 90000,
        image: "/cozy-yaba-studio.png",
        bookings: 0,
        rating: 0,
      },
    ],
    bookingHistory: [
      {
        id: "book-001",
        property: "Luxury Ocean View Apartment",
        checkIn: "2023-07-20",
        checkOut: "2023-07-25",
        amount: 250000,
        status: "upcoming",
      },
      {
        id: "book-002",
        property: "Elegant Villa Lagos",
        checkIn: "2023-06-25",
        checkOut: "2023-06-30",
        amount: 450000,
        status: "completed",
      },
      {
        id: "book-003",
        property: "Modern Ikoyi Apartment",
        checkIn: "2023-05-15",
        checkOut: "2023-05-20",
        amount: 180000,
        status: "completed",
      },
      {
        id: "book-004",
        property: "Ikeja Serviced Apartment",
        checkIn: "2023-04-10",
        checkOut: "2023-04-15",
        amount: 150000,
        status: "completed",
      },
      {
        id: "book-005",
        property: "Lagos Penthouse View",
        checkIn: "2023-03-05",
        checkOut: "2023-03-10",
        amount: 220000,
        status: "completed",
      },
    ],
  }
}

export default function UserProfileView({ userId }: { userId: string }) {
  const router = useRouter()
  const { toast } = useToast()
  const userData = getUserData(userId)

  const [isSuspendDialogOpen, setIsSuspendDialogOpen] = useState(false)
  const [isUnsuspendDialogOpen, setIsUnsuspendDialogOpen] = useState(false)
  const [suspensionReason, setSuspensionReason] = useState("")
  const [suspensionDuration, setSuspensionDuration] = useState("7")
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [editedUser, setEditedUser] = useState(userData)

  // In a real app, these would be API calls
  const handleSuspendUser = () => {
    toast({
      title: "User suspended",
      description: `${userData.name} has been suspended for ${suspensionDuration} days.`,
    })
    setIsSuspendDialogOpen(false)
  }

  const handleUnsuspendUser = () => {
    toast({
      title: "User unsuspended",
      description: `${userData.name} has been unsuspended and can now access the platform.`,
    })
    setIsUnsuspendDialogOpen(false)
  }

  const handleUpdateUser = () => {
    toast({
      title: "User updated",
      description: "User profile has been successfully updated.",
    })
    setIsEditDialogOpen(false)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">User Profile</h1>
          <p className="text-gray-500">View and manage user details</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={() => router.back()}>
            Back to Users
          </Button>
          <Button variant="outline" onClick={() => setIsEditDialogOpen(true)}>
            <Edit className="mr-2 h-4 w-4" />
            Edit User
          </Button>
          {userData.suspended ? (
            <Button
              variant="outline"
              className="bg-green-50 text-green-600 hover:bg-green-100 hover:text-green-700"
              onClick={() => setIsUnsuspendDialogOpen(true)}
            >
              <Check className="mr-2 h-4 w-4" />
              Unsuspend User
            </Button>
          ) : (
            <Button
              variant="outline"
              className="bg-red-50 text-red-600 hover:bg-red-100 hover:text-red-700"
              onClick={() => setIsSuspendDialogOpen(true)}
            >
              <Lock className="mr-2 h-4 w-4" />
              Suspend User
            </Button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle>User Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex flex-col items-center text-center">
              <div className="relative">
                <Avatar className="h-24 w-24">
                  <AvatarImage src={userData.avatar || "/placeholder.svg"} alt={userData.name} />
                  <AvatarFallback>{userData.name.charAt(0)}</AvatarFallback>
                </Avatar>
                {userData.verified && (
                  <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-1">
                    <BadgeCheck className="h-6 w-6 text-blue-500" />
                  </div>
                )}
              </div>
              <h2 className="mt-4 text-xl font-bold">{userData.name}</h2>
              <div className="mt-2 flex flex-wrap justify-center gap-2">
                <Badge
                  className={
                    userData.role === "admin"
                      ? "bg-purple-100 text-purple-800"
                      : userData.role === "agent"
                        ? "bg-blue-100 text-blue-800"
                        : "bg-gray-100 text-gray-800"
                  }
                >
                  {userData.role.charAt(0).toUpperCase() + userData.role.slice(1)}
                </Badge>
                <Badge
                  className={
                    userData.suspended
                      ? "bg-red-100 text-red-800"
                      : userData.status === "active"
                        ? "bg-green-100 text-green-800"
                        : userData.status === "pending"
                          ? "bg-amber-100 text-amber-800"
                          : "bg-gray-100 text-gray-800"
                  }
                >
                  {userData.suspended
                    ? "Suspended"
                    : userData.status.charAt(0).toUpperCase() + userData.status.slice(1)}
                </Badge>
                {userData.verified && <Badge className="bg-blue-100 text-blue-800">Verified</Badge>}
              </div>
              {userData.suspended && (
                <div className="mt-3 text-sm text-red-600">
                  <p>Suspended until: {userData.suspensionEnd || "Indefinite"}</p>
                  <p className="mt-1">Reason: {userData.suspensionReason || "Violation of terms"}</p>
                </div>
              )}
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-gray-500" />
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="font-medium">{userData.email}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-gray-500" />
                <div>
                  <p className="text-sm text-gray-500">Phone</p>
                  <p className="font-medium">{userData.phone}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="h-5 w-5 text-gray-500" />
                <div>
                  <p className="text-sm text-gray-500">Address</p>
                  <p className="font-medium">{userData.address}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Calendar className="h-5 w-5 text-gray-500" />
                <div>
                  <p className="text-sm text-gray-500">Joined</p>
                  <p className="font-medium">{userData.joined}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="h-5 w-5 text-gray-500" />
                <div>
                  <p className="text-sm text-gray-500">Last Active</p>
                  <p className="font-medium">{userData.lastActive}</p>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t">
              <h3 className="font-medium mb-3">Verification Status</h3>
              <div className="grid grid-cols-3 gap-2">
                <div className="flex flex-col items-center p-2 border rounded-md">
                  <div className="mb-1">
                    {userData.idVerified ? (
                      <div className="h-6 w-6 rounded-full bg-green-100 flex items-center justify-center">
                        <Check className="h-4 w-4 text-green-600" />
                      </div>
                    ) : (
                      <div className="h-6 w-6 rounded-full bg-red-100 flex items-center justify-center">
                        <XCircle className="h-4 w-4 text-red-600" />
                      </div>
                    )}
                  </div>
                  <p className="text-xs text-center">ID</p>
                </div>
                <div className="flex flex-col items-center p-2 border rounded-md">
                  <div className="mb-1">
                    {userData.emailVerified ? (
                      <div className="h-6 w-6 rounded-full bg-green-100 flex items-center justify-center">
                        <Check className="h-4 w-4 text-green-600" />
                      </div>
                    ) : (
                      <div className="h-6 w-6 rounded-full bg-red-100 flex items-center justify-center">
                        <XCircle className="h-4 w-4 text-red-600" />
                      </div>
                    )}
                  </div>
                  <p className="text-xs text-center">Email</p>
                </div>
                <div className="flex flex-col items-center p-2 border rounded-md">
                  <div className="mb-1">
                    {userData.phoneVerified ? (
                      <div className="h-6 w-6 rounded-full bg-green-100 flex items-center justify-center">
                        <Check className="h-4 w-4 text-green-600" />
                      </div>
                    ) : (
                      <div className="h-6 w-6 rounded-full bg-red-100 flex items-center justify-center">
                        <XCircle className="h-4 w-4 text-red-600" />
                      </div>
                    )}
                  </div>
                  <p className="text-xs text-center">Phone</p>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t">
              <h3 className="font-medium mb-3">Account Statistics</h3>
              <div className="grid grid-cols-3 gap-2">
                <div className="p-2 border rounded-md text-center">
                  <p className="text-xl font-bold">{userData.properties?.length || 0}</p>
                  <p className="text-xs text-gray-500">Properties</p>
                </div>
                <div className="p-2 border rounded-md text-center">
                  <p className="text-xl font-bold">{userData.bookings}</p>
                  <p className="text-xs text-gray-500">Bookings</p>
                </div>
                <div className="p-2 border rounded-md text-center">
                  <p className="text-xl font-bold">₦{userData.spent.toLocaleString()}</p>
                  <p className="text-xs text-gray-500">Spent</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="md:col-span-2 space-y-6">
          <Tabs defaultValue="activity">
            <TabsList className="grid grid-cols-4 mb-4">
              <TabsTrigger value="activity">Activity</TabsTrigger>
              <TabsTrigger value="properties">Properties</TabsTrigger>
              <TabsTrigger value="bookings">Bookings</TabsTrigger>
              <TabsTrigger value="notes">Admin Notes</TabsTrigger>
            </TabsList>

            <TabsContent value="activity" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                  <CardDescription>User's recent actions on the platform</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {userData.recentActivity.map((activity) => (
                      <div key={activity.id} className="flex items-start gap-3 pb-4 border-b last:border-0">
                        <div
                          className={`mt-1 p-2 rounded-full 
                          ${
                            activity.type === "booking"
                              ? "bg-green-100"
                              : activity.type === "review"
                                ? "bg-blue-100"
                                : activity.type === "property_view"
                                  ? "bg-purple-100"
                                  : "bg-gray-100"
                          }`}
                        >
                          {activity.type === "booking" ? (
                            <ShoppingCart className="h-4 w-4 text-green-600" />
                          ) : activity.type === "review" ? (
                            <Star className="h-4 w-4 text-blue-600" />
                          ) : activity.type === "property_view" ? (
                            <Home className="h-4 w-4 text-purple-600" />
                          ) : (
                            <User className="h-4 w-4 text-gray-600" />
                          )}
                        </div>
                        <div className="flex-1">
                          <p className="font-medium">{activity.description}</p>
                          <div className="flex justify-between items-center mt-1">
                            <p className="text-sm text-gray-500">{activity.date}</p>
                            {activity.amount && (
                              <Badge className="bg-green-100 text-green-800">₦{activity.amount.toLocaleString()}</Badge>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    View All Activity
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="properties">
              <Card>
                <CardHeader>
                  <CardTitle>User Properties</CardTitle>
                  <CardDescription>Properties owned or managed by this user</CardDescription>
                </CardHeader>
                <CardContent>
                  {userData.properties && userData.properties.length > 0 ? (
                    <div className="space-y-4">
                      {userData.properties.map((property) => (
                        <div key={property.id} className="flex gap-4 pb-4 border-b last:border-0">
                          <div className="h-20 w-20 rounded-md overflow-hidden">
                            <img
                              src={property.image || "/placeholder.svg"}
                              alt={property.title}
                              className="h-full w-full object-cover"
                            />
                          </div>
                          <div className="flex-1">
                            <div className="flex justify-between">
                              <h4 className="font-medium">{property.title}</h4>
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
                            </div>
                            <p className="text-sm text-gray-500">{property.location}</p>
                            <div className="flex justify-between items-center mt-2">
                              <p className="font-bold">₦{property.price.toLocaleString()}</p>
                              <div className="flex items-center gap-3">
                                <span className="text-sm text-gray-500">{property.bookings} bookings</span>
                                {property.rating > 0 && (
                                  <div className="flex items-center">
                                    <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                                    <span className="ml-1 text-sm">{property.rating}</span>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-6 text-gray-500">
                      <Building2 className="mx-auto h-12 w-12 opacity-30 mb-2" />
                      <p>This user has no properties</p>
                    </div>
                  )}
                </CardContent>
                {userData.properties && userData.properties.length > 0 && (
                  <CardFooter>
                    <Button variant="outline" className="w-full">
                      View All Properties
                    </Button>
                  </CardFooter>
                )}
              </Card>
            </TabsContent>

            <TabsContent value="bookings">
              <Card>
                <CardHeader>
                  <CardTitle>Booking History</CardTitle>
                  <CardDescription>User's booking history on the platform</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Property</TableHead>
                        <TableHead>Check In</TableHead>
                        <TableHead>Check Out</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {userData.bookingHistory.map((booking) => (
                        <TableRow key={booking.id}>
                          <TableCell className="font-medium">{booking.property}</TableCell>
                          <TableCell>{booking.checkIn}</TableCell>
                          <TableCell>{booking.checkOut}</TableCell>
                          <TableCell>₦{booking.amount.toLocaleString()}</TableCell>
                          <TableCell>
                            <Badge
                              className={
                                booking.status === "upcoming"
                                  ? "bg-blue-100 text-blue-800"
                                  : booking.status === "completed"
                                    ? "bg-green-100 text-green-800"
                                    : booking.status === "cancelled"
                                      ? "bg-red-100 text-red-800"
                                      : "bg-gray-100 text-gray-800"
                              }
                            >
                              {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                            </Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    View All Bookings
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="notes">
              <Card>
                <CardHeader>
                  <CardTitle>Admin Notes</CardTitle>
                  <CardDescription>Internal notes about this user (only visible to admins)</CardDescription>
                </CardHeader>
                <CardContent>
                  <Textarea placeholder="Add notes about this user here..." className="min-h-[200px]" />
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline">Cancel</Button>
                  <Button>Save Notes</Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>

          <Card>
            <CardHeader>
              <CardTitle>Administrative Actions</CardTitle>
              <CardDescription>Perform administrative actions on this user</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <Button variant="outline" className="h-auto py-4 flex flex-col items-center justify-center">
                  <Mail className="h-5 w-5 mb-2" />
                  <span>Send Email</span>
                </Button>
                <Button variant="outline" className="h-auto py-4 flex flex-col items-center justify-center">
                  <Lock className="h-5 w-5 mb-2" />
                  <span>Reset Password</span>
                </Button>
                <Button variant="outline" className="h-auto py-4 flex flex-col items-center justify-center">
                  <Shield className="h-5 w-5 mb-2" />
                  <span>Change Role</span>
                </Button>
                <Button variant="outline" className="h-auto py-4 flex flex-col items-center justify-center">
                  <BadgeCheck className="h-5 w-5 mb-2" />
                  <span>Verify User</span>
                </Button>
                <Button variant="outline" className="h-auto py-4 flex flex-col items-center justify-center">
                  <ExternalLink className="h-5 w-5 mb-2" />
                  <span>Login as User</span>
                </Button>
                <Button
                  variant="outline"
                  className="h-auto py-4 flex flex-col items-center justify-center bg-red-50 text-red-600 hover:bg-red-100"
                >
                  <Trash className="h-5 w-5 mb-2" />
                  <span>Delete Account</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Suspend User Dialog */}
      <Dialog open={isSuspendDialogOpen} onOpenChange={setIsSuspendDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Suspend User</DialogTitle>
            <DialogDescription>
              Suspending a user will prevent them from accessing the platform until the suspension is lifted.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="flex items-center gap-4">
              <Avatar className="h-12 w-12">
                <AvatarImage src={userData.avatar || "/placeholder.svg"} alt={userData.name} />
                <AvatarFallback>{userData.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium">{userData.name}</p>
                <p className="text-sm text-gray-500">{userData.email}</p>
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="suspension-reason" className="text-sm font-medium">
                Suspension Reason
              </label>
              <Textarea
                id="suspension-reason"
                placeholder="Provide a reason for suspending this user..."
                value={suspensionReason}
                onChange={(e) => setSuspensionReason(e.target.value)}
                className="resize-none"
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="suspension-duration" className="text-sm font-medium">
                Suspension Duration
              </label>
              <Select value={suspensionDuration} onValueChange={setSuspensionDuration}>
                <SelectTrigger id="suspension-duration">
                  <SelectValue placeholder="Select duration" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1 day</SelectItem>
                  <SelectItem value="3">3 days</SelectItem>
                  <SelectItem value="7">7 days</SelectItem>
                  <SelectItem value="14">14 days</SelectItem>
                  <SelectItem value="30">30 days</SelectItem>
                  <SelectItem value="permanent">Permanent</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsSuspendDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleSuspendUser} disabled={!suspensionReason.trim()}>
              Suspend User
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Unsuspend User Dialog */}
      <Dialog open={isUnsuspendDialogOpen} onOpenChange={setIsUnsuspendDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Unsuspend User</DialogTitle>
            <DialogDescription>
              This will lift the suspension and allow the user to access the platform again.
            </DialogDescription>
          </DialogHeader>
          <div className="flex items-center gap-4 py-4">
            <div className="bg-green-100 p-3 rounded-full">
              <Check className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <p className="font-medium">Are you sure you want to unsuspend {userData.name}?</p>
              <p className="text-sm text-gray-500">They will regain access to all platform features immediately.</p>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsUnsuspendDialogOpen(false)}>
              Cancel
            </Button>
            <Button className="bg-green-600 hover:bg-green-700" onClick={handleUnsuspendUser}>
              Unsuspend User
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit User Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Edit User</DialogTitle>
            <DialogDescription>Update user information and settings.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium">
                  Full Name
                </label>
                <Input
                  id="name"
                  value={editedUser.name}
                  onChange={(e) => setEditedUser({ ...editedUser, name: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium">
                  Email
                </label>
                <Input
                  id="email"
                  type="email"
                  value={editedUser.email}
                  onChange={(e) => setEditedUser({ ...editedUser, email: e.target.value })}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="phone" className="text-sm font-medium">
                  Phone
                </label>
                <Input
                  id="phone"
                  value={editedUser.phone}
                  onChange={(e) => setEditedUser({ ...editedUser, phone: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="role" className="text-sm font-medium">
                  Role
                </label>
                <Select
                  value={editedUser.role}
                  onValueChange={(value) => setEditedUser({ ...editedUser, role: value })}
                >
                  <SelectTrigger id="role">
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="user">User</SelectItem>
                    <SelectItem value="agent">Agent</SelectItem>
                    <SelectItem value="admin">Admin</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2">
              <label htmlFor="address" className="text-sm font-medium">
                Address
              </label>
              <Input
                id="address"
                value={editedUser.address}
                onChange={(e) => setEditedUser({ ...editedUser, address: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="bio" className="text-sm font-medium">
                Bio
              </label>
              <Textarea
                id="bio"
                value={editedUser.bio}
                onChange={(e) => setEditedUser({ ...editedUser, bio: e.target.value })}
                rows={3}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleUpdateUser}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

// Missing component definition
function Star(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  )
}

// Missing component definition
function Trash(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 6h18" />
      <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
      <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
    </svg>
  )
}
