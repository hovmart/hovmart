"use client"

import { useState } from "react"
import {
  ArrowUpDown,
  Calendar,
  Check,
  Clock,
  CreditCard,
  Eye,
  Filter,
  MoreHorizontal,
  Printer,
  Search,
  X,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Checkbox } from "@/components/ui/checkbox"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useToast } from "@/hooks/use-toast"
import { format } from "date-fns"

// Sample booking data
const bookings = [
  {
    id: "BKG-001",
    propertyId: "PROP-001",
    propertyName: "Luxury Ocean View Apartment",
    propertyImage: "/luxury-ocean-view-apartment.png",
    userId: "USR-001",
    userName: "John Doe",
    userEmail: "john.doe@example.com",
    userAvatar: "/thoughtful-man-portrait.png",
    status: "confirmed",
    paymentStatus: "paid",
    amount: 250000,
    checkIn: "2023-08-10",
    checkOut: "2023-08-15",
    guests: 2,
    createdAt: "2023-07-15T10:30:00",
    updatedAt: "2023-07-15T14:45:00",
  },
  {
    id: "BKG-002",
    propertyId: "PROP-002",
    propertyName: "Modern Ikoyi Apartment",
    propertyImage: "/modern-ikoyi-apartment.png",
    userId: "USR-002",
    userName: "Jane Smith",
    userEmail: "jane.smith@example.com",
    userAvatar: "/woman-portrait.png",
    status: "confirmed",
    paymentStatus: "paid",
    amount: 180000,
    checkIn: "2023-08-05",
    checkOut: "2023-08-08",
    guests: 1,
    createdAt: "2023-07-10T09:15:00",
    updatedAt: "2023-07-10T11:20:00",
  },
  {
    id: "BKG-003",
    propertyId: "PROP-003",
    propertyName: "Elegant Villa Lagos",
    propertyImage: "/elegant-villa-lagos.png",
    userId: "USR-003",
    userName: "Robert Johnson",
    userEmail: "robert.johnson@example.com",
    userAvatar: "/man-portrait-3.png",
    status: "pending",
    paymentStatus: "pending",
    amount: 450000,
    checkIn: "2023-09-01",
    checkOut: "2023-09-05",
    guests: 4,
    createdAt: "2023-07-20T14:00:00",
    updatedAt: "2023-07-20T14:00:00",
  },
  {
    id: "BKG-004",
    propertyId: "PROP-005",
    propertyName: "Ikeja Serviced Apartment",
    propertyImage: "/ikeja-serviced-apartment.png",
    userId: "USR-004",
    userName: "Sarah Williams",
    userEmail: "sarah.williams@example.com",
    userAvatar: "/woman-portrait-2.png",
    status: "cancelled",
    paymentStatus: "refunded",
    amount: 150000,
    checkIn: "2023-07-25",
    checkOut: "2023-07-30",
    guests: 2,
    createdAt: "2023-07-05T16:45:00",
    updatedAt: "2023-07-15T09:30:00",
  },
  {
    id: "BKG-005",
    propertyId: "PROP-006",
    propertyName: "Lagos Penthouse View",
    propertyImage: "/lagos-penthouse-view.png",
    userId: "USR-007",
    userName: "David Wilson",
    userEmail: "david.wilson@example.com",
    userAvatar: "/man-portrait-3.png",
    status: "confirmed",
    paymentStatus: "paid",
    amount: 550000,
    checkIn: "2023-08-20",
    checkOut: "2023-08-25",
    guests: 3,
    createdAt: "2023-07-18T11:20:00",
    updatedAt: "2023-07-18T13:15:00",
  },
  {
    id: "BKG-006",
    propertyId: "PROP-007",
    propertyName: "Cozy Yaba Studio",
    propertyImage: "/cozy-yaba-studio.png",
    userId: "USR-008",
    userName: "Lisa Johnson",
    userEmail: "lisa.johnson@example.com",
    userAvatar: "/woman-portrait.png",
    status: "completed",
    paymentStatus: "paid",
    amount: 90000,
    checkIn: "2023-07-01",
    checkOut: "2023-07-05",
    guests: 1,
    createdAt: "2023-06-15T10:00:00",
    updatedAt: "2023-07-06T12:00:00",
  },
  {
    id: "BKG-007",
    propertyId: "PROP-008",
    propertyName: "Nigerian Farmhouse",
    propertyImage: "/nigerian-farmhouse.png",
    userId: "USR-001",
    userName: "John Doe",
    userEmail: "john.doe@example.com",
    userAvatar: "/thoughtful-man-portrait.png",
    status: "confirmed",
    paymentStatus: "paid",
    amount: 200000,
    checkIn: "2023-09-10",
    checkOut: "2023-09-15",
    guests: 5,
    createdAt: "2023-07-21T09:45:00",
    updatedAt: "2023-07-21T10:30:00",
  },
  {
    id: "BKG-008",
    propertyId: "PROP-001",
    propertyName: "Luxury Ocean View Apartment",
    propertyImage: "/luxury-ocean-view-apartment.png",
    userId: "USR-002",
    userName: "Jane Smith",
    userEmail: "jane.smith@example.com",
    userAvatar: "/woman-portrait.png",
    status: "pending",
    paymentStatus: "pending",
    amount: 250000,
    checkIn: "2023-10-05",
    checkOut: "2023-10-10",
    guests: 2,
    createdAt: "2023-07-22T15:30:00",
    updatedAt: "2023-07-22T15:30:00",
  },
]

export default function BookingsManagement() {
  const { toast } = useToast()
  const [selectedBookings, setSelectedBookings] = useState<string[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [paymentStatusFilter, setPaymentStatusFilter] = useState<string>("all")
  const [sortBy, setSortBy] = useState<string>("newest")

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedBookings(bookings.map((booking) => booking.id))
    } else {
      setSelectedBookings([])
    }
  }

  const handleSelectBooking = (bookingId: string, checked: boolean) => {
    if (checked) {
      setSelectedBookings([...selectedBookings, bookingId])
    } else {
      setSelectedBookings(selectedBookings.filter((id) => id !== bookingId))
    }
  }

  const handleUpdateStatus = (bookingId: string, status: string) => {
    toast({
      title: "Booking status updated",
      description: `Booking ${bookingId} status has been updated to ${status}.`,
    })
  }

  const handleUpdatePaymentStatus = (bookingId: string, status: string) => {
    toast({
      title: "Payment status updated",
      description: `Booking ${bookingId} payment status has been updated to ${status}.`,
    })
  }

  const filteredBookings = bookings
    .filter((booking) => {
      // Apply search filter
      if (
        searchQuery &&
        !booking.id.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !booking.propertyName.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !booking.userName.toLowerCase().includes(searchQuery.toLowerCase())
      ) {
        return false
      }

      // Apply status filter
      if (statusFilter !== "all" && booking.status !== statusFilter) {
        return false
      }

      // Apply payment status filter
      if (paymentStatusFilter !== "all" && booking.paymentStatus !== paymentStatusFilter) {
        return false
      }

      return true
    })
    .sort((a, b) => {
      // Apply sorting
      switch (sortBy) {
        case "newest":
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        case "oldest":
          return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        case "check-in":
          return new Date(a.checkIn).getTime() - new Date(b.checkIn).getTime()
        case "check-out":
          return new Date(a.checkOut).getTime() - new Date(b.checkOut).getTime()
        case "amount-high":
          return b.amount - a.amount
        case "amount-low":
          return a.amount - b.amount
        default:
          return 0
      }
    })

  const formatDate = (dateString: string) => {
    return format(new Date(dateString), "MMM dd, yyyy")
  }

  const formatDateTime = (dateTimeString: string) => {
    return format(new Date(dateTimeString), "MMM dd, yyyy HH:mm")
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-green-100 text-green-800"
      case "pending":
        return "bg-amber-100 text-amber-800"
      case "cancelled":
        return "bg-red-100 text-red-800"
      case "completed":
        return "bg-blue-100 text-blue-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case "paid":
        return "bg-green-100 text-green-800"
      case "pending":
        return "bg-amber-100 text-amber-800"
      case "refunded":
        return "bg-purple-100 text-purple-800"
      case "failed":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Bookings</h1>
          <p className="text-gray-500">Manage all your property bookings</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <Calendar className="mr-2 h-4 w-4" />
            Calendar View
          </Button>
          <Button variant="outline">
            <Printer className="mr-2 h-4 w-4" />
            Print Bookings
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
                  placeholder="Search bookings..."
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
                  <DropdownMenuLabel>Filter Bookings</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <div className="p-2">
                    <p className="text-sm font-medium mb-1">Booking Status</p>
                    <Select value={statusFilter} onValueChange={setStatusFilter}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Statuses</SelectItem>
                        <SelectItem value="confirmed">Confirmed</SelectItem>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="cancelled">Cancelled</SelectItem>
                        <SelectItem value="completed">Completed</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="p-2">
                    <p className="text-sm font-medium mb-1">Payment Status</p>
                    <Select value={paymentStatusFilter} onValueChange={setPaymentStatusFilter}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select payment status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Statuses</SelectItem>
                        <SelectItem value="paid">Paid</SelectItem>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="refunded">Refunded</SelectItem>
                        <SelectItem value="failed">Failed</SelectItem>
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
                        <SelectItem value="check-in">Check-in Date</SelectItem>
                        <SelectItem value="check-out">Check-out Date</SelectItem>
                        <SelectItem value="amount-high">Amount: High to Low</SelectItem>
                        <SelectItem value="amount-low">Amount: Low to High</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <div className="flex items-center gap-2">
              {selectedBookings.length > 0 && (
                <>
                  <span className="text-sm text-gray-500">{selectedBookings.length} selected</span>
                  <Button variant="outline" size="sm">
                    <Check className="mr-2 h-4 w-4" />
                    Confirm
                  </Button>
                  <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                    <X className="mr-2 h-4 w-4" />
                    Cancel
                  </Button>
                </>
              )}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all" className="space-y-4">
            <TabsList>
              <TabsTrigger value="all">All Bookings</TabsTrigger>
              <TabsTrigger value="confirmed">Confirmed</TabsTrigger>
              <TabsTrigger value="pending">Pending</TabsTrigger>
              <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
              <TabsTrigger value="completed">Completed</TabsTrigger>
            </TabsList>
            <TabsContent value="all" className="space-y-4">
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-12">
                        <Checkbox
                          checked={selectedBookings.length === bookings.length}
                          onCheckedChange={handleSelectAll}
                        />
                      </TableHead>
                      <TableHead className="w-[250px]">Booking Details</TableHead>
                      <TableHead>Property</TableHead>
                      <TableHead>Guest</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Payment</TableHead>
                      <TableHead>Dates</TableHead>
                      <TableHead>Created</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredBookings.map((booking) => (
                      <TableRow key={booking.id}>
                        <TableCell>
                          <Checkbox
                            checked={selectedBookings.includes(booking.id)}
                            onCheckedChange={(checked) => handleSelectBooking(booking.id, !!checked)}
                          />
                        </TableCell>
                        <TableCell>
                          <div>
                            <p className="font-medium">{booking.id}</p>
                            <p className="text-xs text-gray-500">₦{booking.amount.toLocaleString()}</p>
                            <p className="text-xs text-gray-500">{booking.guests} guests</p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded overflow-hidden">
                              <img
                                src={booking.propertyImage || "/placeholder.svg"}
                                alt={booking.propertyName}
                                className="h-full w-full object-cover"
                              />
                            </div>
                            <div>
                              <p className="font-medium truncate max-w-[150px]">{booking.propertyName}</p>
                              <p className="text-xs text-gray-500">{booking.propertyId}</p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Avatar className="h-8 w-8">
                              <AvatarImage src={booking.userAvatar || "/placeholder.svg"} alt={booking.userName} />
                              <AvatarFallback>{booking.userName.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium">{booking.userName}</p>
                              <p className="text-xs text-gray-500">{booking.userEmail}</p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(booking.status)}>
                            {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge className={getPaymentStatusColor(booking.paymentStatus)}>
                            {booking.paymentStatus.charAt(0).toUpperCase() + booking.paymentStatus.slice(1)}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div>
                            <div className="flex items-center">
                              <Calendar className="h-3 w-3 mr-1 text-gray-500" />
                              <span className="text-xs">{formatDate(booking.checkIn)}</span>
                            </div>
                            <div className="flex items-center mt-1">
                              <Calendar className="h-3 w-3 mr-1 text-gray-500" />
                              <span className="text-xs">{formatDate(booking.checkOut)}</span>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            <Clock className="h-3 w-3 mr-1 text-gray-500" />
                            <span className="text-xs">{formatDateTime(booking.createdAt)}</span>
                          </div>
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
                                View Details
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Printer className="mr-2 h-4 w-4" />
                                Print Booking
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuLabel>Update Status</DropdownMenuLabel>
                              <DropdownMenuItem onClick={() => handleUpdateStatus(booking.id, "confirmed")}>
                                <Check className="mr-2 h-4 w-4 text-green-600" />
                                Confirm
                                {booking.status === "confirmed" && <Check className="ml-auto h-4 w-4" />}
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleUpdateStatus(booking.id, "pending")}>
                                <Clock className="mr-2 h-4 w-4 text-amber-600" />
                                Pending
                                {booking.status === "pending" && <Check className="ml-auto h-4 w-4" />}
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleUpdateStatus(booking.id, "cancelled")}>
                                <X className="mr-2 h-4 w-4 text-red-600" />
                                Cancel
                                {booking.status === "cancelled" && <Check className="ml-auto h-4 w-4" />}
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleUpdateStatus(booking.id, "completed")}>
                                <Check className="mr-2 h-4 w-4 text-blue-600" />
                                Complete
                                {booking.status === "completed" && <Check className="ml-auto h-4 w-4" />}
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuLabel>Payment Status</DropdownMenuLabel>
                              <DropdownMenuItem onClick={() => handleUpdatePaymentStatus(booking.id, "paid")}>
                                <CreditCard className="mr-2 h-4 w-4 text-green-600" />
                                Paid
                                {booking.paymentStatus === "paid" && <Check className="ml-auto h-4 w-4" />}
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleUpdatePaymentStatus(booking.id, "pending")}>
                                <Clock className="mr-2 h-4 w-4 text-amber-600" />
                                Pending
                                {booking.paymentStatus === "pending" && <Check className="ml-auto h-4 w-4" />}
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleUpdatePaymentStatus(booking.id, "refunded")}>
                                <ArrowUpDown className="mr-2 h-4 w-4 text-purple-600" />
                                Refunded
                                {booking.paymentStatus === "refunded" && <Check className="ml-auto h-4 w-4" />}
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
            <TabsContent value="confirmed">
              <div className="rounded-md border">
                <Table>{/* Similar structure as "all" tab but filtered for confirmed bookings */}</Table>
              </div>
            </TabsContent>
            <TabsContent value="pending">
              <div className="rounded-md border">
                <Table>{/* Similar structure as "all" tab but filtered for pending bookings */}</Table>
              </div>
            </TabsContent>
            <TabsContent value="cancelled">
              <div className="rounded-md border">
                <Table>{/* Similar structure as "all" tab but filtered for cancelled bookings */}</Table>
              </div>
            </TabsContent>
            <TabsContent value="completed">
              <div className="rounded-md border">
                <Table>{/* Similar structure as "all" tab but filtered for completed bookings */}</Table>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter className="flex items-center justify-between">
          <div className="text-sm text-gray-500">
            Showing {filteredBookings.length} of {bookings.length} bookings
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
              Next
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
