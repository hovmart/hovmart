"use client"

import { useState } from "react"
import { ChevronDown, CreditCard, Download, Eye, Filter, MoreHorizontal, Search, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Sample payment data
const payments = [
  {
    id: "PAY-001",
    bookingId: "BKG-001",
    propertyName: "Luxury Ocean View Apartment",
    guestName: "John Doe",
    amount: "₦250,000",
    paymentMethod: "Credit Card",
    status: "Completed",
    date: "2023-07-15",
  },
  {
    id: "PAY-002",
    bookingId: "BKG-002",
    propertyName: "Modern Ikoyi Apartment",
    guestName: "Jane Smith",
    amount: "₦180,000",
    paymentMethod: "Bank Transfer",
    status: "Pending",
    date: "2023-07-14",
  },
  {
    id: "PAY-003",
    bookingId: "BKG-003",
    propertyName: "Elegant Villa Lagos",
    guestName: "Robert Johnson",
    amount: "₦450,000",
    paymentMethod: "Credit Card",
    status: "Completed",
    date: "2023-07-13",
  },
  {
    id: "PAY-004",
    bookingId: "BKG-004",
    propertyName: "Lagos Beachfront Luxury Home",
    guestName: "Emily Davis",
    amount: "₦350,000",
    paymentMethod: "PayPal",
    status: "Failed",
    date: "2023-07-12",
  },
  {
    id: "PAY-005",
    bookingId: "BKG-005",
    propertyName: "Ikeja Serviced Apartment",
    guestName: "Michael Wilson",
    amount: "₦120,000",
    paymentMethod: "Credit Card",
    status: "Completed",
    date: "2023-07-11",
  },
  {
    id: "PAY-006",
    bookingId: "BKG-006",
    propertyName: "Lagos Penthouse View",
    guestName: "Sarah Brown",
    amount: "₦500,000",
    paymentMethod: "Bank Transfer",
    status: "Pending",
    date: "2023-07-10",
  },
  {
    id: "PAY-007",
    bookingId: "BKG-007",
    propertyName: "Cozy Yaba Studio",
    guestName: "David Miller",
    amount: "₦80,000",
    paymentMethod: "Credit Card",
    status: "Refunded",
    date: "2023-07-09",
  },
]

// Sample revenue data for charts
const revenueData = [
  { month: "Jan", revenue: 1200000 },
  { month: "Feb", revenue: 1500000 },
  { month: "Mar", revenue: 1800000 },
  { month: "Apr", revenue: 2000000 },
  { month: "May", revenue: 2200000 },
  { month: "Jun", revenue: 2500000 },
  { month: "Jul", revenue: 2800000 },
]

export default function PaymentsManagement() {
  const [searchTerm, setSearchTerm] = useState("")
  const [activeTab, setActiveTab] = useState("all")

  const filteredPayments = payments.filter(
    (payment) =>
      payment.guestName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.propertyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.bookingId.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const getFilteredPaymentsByStatus = (status: string) => {
    if (status === "all") return filteredPayments
    return filteredPayments.filter((payment) => payment.status.toLowerCase() === status.toLowerCase())
  }

  const currentFilteredPayments = getFilteredPaymentsByStatus(activeTab)

  // Calculate totals
  const totalRevenue = payments
    .filter((p) => p.status === "Completed")
    .reduce((sum, payment) => sum + Number.parseInt(payment.amount.replace(/[^\d]/g, "")), 0)

  const pendingRevenue = payments
    .filter((p) => p.status === "Pending")
    .reduce((sum, payment) => sum + Number.parseInt(payment.amount.replace(/[^\d]/g, "")), 0)

  const refundedAmount = payments
    .filter((p) => p.status === "Refunded")
    .reduce((sum, payment) => sum + Number.parseInt(payment.amount.replace(/[^\d]/g, "")), 0)

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Payments</h1>
          <p className="text-gray-500">Manage all your payment transactions</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Export
                <ChevronDown className="h-4 w-4 ml-2" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Export as CSV</DropdownMenuItem>
              <DropdownMenuItem>Export as PDF</DropdownMenuItem>
              <DropdownMenuItem>Export as Excel</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Total Revenue</p>
                <h3 className="text-2xl font-bold mt-1">₦{totalRevenue.toLocaleString()}</h3>
                <p className="text-xs text-gray-500 mt-1">From completed payments</p>
              </div>
              <div className="bg-green-100 p-3 rounded-full">
                <CreditCard className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Pending Revenue</p>
                <h3 className="text-2xl font-bold mt-1">₦{pendingRevenue.toLocaleString()}</h3>
                <p className="text-xs text-gray-500 mt-1">From pending payments</p>
              </div>
              <div className="bg-amber-100 p-3 rounded-full">
                <CreditCard className="h-6 w-6 text-amber-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Refunded Amount</p>
                <h3 className="text-2xl font-bold mt-1">₦{refundedAmount.toLocaleString()}</h3>
                <p className="text-xs text-gray-500 mt-1">From refunded payments</p>
              </div>
              <div className="bg-red-100 p-3 rounded-full">
                <CreditCard className="h-6 w-6 text-red-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Payment Transactions</CardTitle>
          <CardDescription>View and manage all your payment transactions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row justify-between items-center mb-4 gap-4">
            <div className="relative w-full md:w-96">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <input
                type="search"
                placeholder="Search payments..."
                className="w-full bg-white pl-8 pr-4 py-2 text-sm rounded-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-2 w-full md:w-auto">
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
              <select className="bg-white border rounded-md px-3 py-1.5 text-sm">
                <option>All Methods</option>
                <option>Credit Card</option>
                <option>Bank Transfer</option>
                <option>PayPal</option>
              </select>
              <input type="date" className="bg-white border rounded-md px-3 py-1.5 text-sm" placeholder="Date" />
            </div>
          </div>

          <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="mb-4">
            <TabsList>
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="completed">Completed</TabsTrigger>
              <TabsTrigger value="pending">Pending</TabsTrigger>
              <TabsTrigger value="failed">Failed</TabsTrigger>
              <TabsTrigger value="refunded">Refunded</TabsTrigger>
            </TabsList>
          </Tabs>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Booking ID</TableHead>
                  <TableHead>Property</TableHead>
                  <TableHead>Guest</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Method</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {currentFilteredPayments.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={9} className="text-center py-8 text-gray-500">
                      No payments found
                    </TableCell>
                  </TableRow>
                ) : (
                  currentFilteredPayments.map((payment) => (
                    <TableRow key={payment.id}>
                      <TableCell className="font-medium">{payment.id}</TableCell>
                      <TableCell>{payment.bookingId}</TableCell>
                      <TableCell className="max-w-[200px] truncate">{payment.propertyName}</TableCell>
                      <TableCell>{payment.guestName}</TableCell>
                      <TableCell>{payment.amount}</TableCell>
                      <TableCell>{payment.paymentMethod}</TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className={`
                            ${
                              payment.status === "Completed"
                                ? "border-green-500 text-green-600 bg-green-50"
                                : payment.status === "Pending"
                                  ? "border-amber-500 text-amber-600 bg-amber-50"
                                  : payment.status === "Failed"
                                    ? "border-red-500 text-red-600 bg-red-50"
                                    : "border-purple-500 text-purple-600 bg-purple-50"
                            }
                          `}
                        >
                          {payment.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{payment.date}</TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">Actions</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>
                              <Eye className="h-4 w-4 mr-2" />
                              View Details
                            </DropdownMenuItem>
                            {payment.status === "Pending" && (
                              <DropdownMenuItem>
                                <CreditCard className="h-4 w-4 mr-2" />
                                Mark as Completed
                              </DropdownMenuItem>
                            )}
                            {payment.status === "Completed" && (
                              <DropdownMenuItem>
                                <CreditCard className="h-4 w-4 mr-2" />
                                Issue Refund
                              </DropdownMenuItem>
                            )}
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-red-600">
                              <Trash2 className="h-4 w-4 mr-2" />
                              Delete Record
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>

          <div className="flex items-center justify-between mt-4">
            <div className="text-sm text-gray-500">
              Showing {currentFilteredPayments.length} of {payments.length} payments
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" disabled>
                Previous
              </Button>
              <Button variant="outline" size="sm" className="bg-purple-50">
                1
              </Button>
              <Button variant="outline" size="sm">
                Next
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
