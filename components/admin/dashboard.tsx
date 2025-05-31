"use client"

import {
  ArrowDown,
  ArrowRight,
  ArrowUp,
  Building2,
  Calendar,
  CreditCard,
  DollarSign,
  MessageSquare,
  Users,
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Line,
  LineChart,
  Bar,
  BarChart,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts"
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

// Sample data for charts
const revenueData = [
  { month: "Jan", revenue: 12000 },
  { month: "Feb", revenue: 15000 },
  { month: "Mar", revenue: 18000 },
  { month: "Apr", revenue: 20000 },
  { month: "May", revenue: 22000 },
  { month: "Jun", revenue: 25000 },
  { month: "Jul", revenue: 28000 },
]

const bookingsData = [
  { month: "Jan", bookings: 45 },
  { month: "Feb", bookings: 52 },
  { month: "Mar", bookings: 61 },
  { month: "Apr", bookings: 67 },
  { month: "May", bookings: 75 },
  { month: "Jun", bookings: 82 },
  { month: "Jul", bookings: 91 },
]

const propertyTypeData = [
  { type: "Apartment", count: 120 },
  { type: "House", count: 80 },
  { type: "Villa", count: 40 },
  { type: "Condo", count: 60 },
  { type: "Penthouse", count: 20 },
]

// Sample data for recent activities
const recentActivities = [
  {
    id: 1,
    type: "user",
    title: "New user registered",
    description: "John Doe created a new account",
    time: "Just now",
    icon: <Users className="h-5 w-5 text-green-600" />,
    iconBg: "bg-green-100",
  },
  {
    id: 2,
    type: "property",
    title: "New property listed",
    description: "Luxury Villa in Lagos was added",
    time: "5 min ago",
    icon: <Building2 className="h-5 w-5 text-blue-600" />,
    iconBg: "bg-blue-100",
  },
  {
    id: 3,
    type: "payment",
    title: "Payment received",
    description: "₦45,000 payment for booking #1234",
    time: "1 hour ago",
    icon: <CreditCard className="h-5 w-5 text-amber-600" />,
    iconBg: "bg-amber-100",
  },
  {
    id: 4,
    type: "booking",
    title: "New booking request",
    description: "Jane Smith requested to book Modern Ikoyi Apartment",
    time: "3 hours ago",
    icon: <Calendar className="h-5 w-5 text-purple-600" />,
    iconBg: "bg-purple-100",
  },
  {
    id: 5,
    type: "message",
    title: "New message received",
    description: "Robert Johnson sent a message about property availability",
    time: "Yesterday",
    icon: <MessageSquare className="h-5 w-5 text-indigo-600" />,
    iconBg: "bg-indigo-100",
  },
]

// Sample data for top properties
const topProperties = [
  {
    id: "PROP-001",
    name: "Luxury Ocean View Apartment",
    location: "Lagos, Nigeria",
    price: "₦250,000",
    bookings: 12,
    revenue: "₦3,000,000",
    image: "/luxury-ocean-view-apartment.png",
  },
  {
    id: "PROP-003",
    name: "Elegant Villa Lagos",
    location: "Victoria Island, Lagos",
    price: "₦450,000",
    bookings: 8,
    revenue: "₦3,600,000",
    image: "/elegant-villa-lagos.png",
  },
  {
    id: "PROP-004",
    name: "Lagos Beachfront Luxury Home",
    location: "Lekki, Lagos",
    price: "₦350,000",
    bookings: 10,
    revenue: "₦3,500,000",
    image: "/lagos-beachfront-luxury-home.png",
  },
]

// Sample data for top users
const topUsers = [
  {
    id: "USR-001",
    name: "John Doe",
    email: "john.doe@example.com",
    bookings: 5,
    spent: "₦1,250,000",
    avatar: "/thoughtful-man-portrait.png",
  },
  {
    id: "USR-002",
    name: "Jane Smith",
    email: "jane.smith@example.com",
    bookings: 3,
    spent: "₦900,000",
    avatar: "/woman-portrait.png",
  },
  {
    id: "USR-003",
    name: "Robert Johnson",
    email: "robert.johnson@example.com",
    bookings: 4,
    spent: "₦1,100,000",
    avatar: "/man-portrait-3.png",
  },
]

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-gray-500">Welcome back, Admin</p>
        </div>
        <div className="flex items-center gap-2">
          <select className="bg-white border rounded-md px-3 py-1.5 text-sm">
            <option>Last 7 days</option>
            <option>Last 30 days</option>
            <option>Last 90 days</option>
            <option>This year</option>
          </select>
          <Button variant="outline" size="sm">
            <ArrowRight className="h-4 w-4 mr-2" />
            View Reports
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="overflow-hidden border-none shadow-md">
          <CardContent className="p-0">
            <div className="bg-gradient-to-r from-purple-500 to-purple-700 p-4">
              <div className="flex items-center justify-between text-white">
                <div>
                  <p className="text-sm font-medium opacity-80">Total Revenue</p>
                  <h3 className="text-2xl font-bold mt-1">₦140,000,000</h3>
                </div>
                <div className="bg-white/20 p-3 rounded-full">
                  <DollarSign className="h-6 w-6 text-white" />
                </div>
              </div>
            </div>
            <div className="bg-white p-4">
              <div className="flex items-center text-sm">
                <ArrowUp className="h-4 w-4 text-green-500 mr-1" />
                <span className="text-green-500 font-medium">12%</span>
                <span className="text-gray-500 ml-1">from last month</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="overflow-hidden border-none shadow-md">
          <CardContent className="p-0">
            <div className="bg-gradient-to-r from-blue-500 to-blue-700 p-4">
              <div className="flex items-center justify-between text-white">
                <div>
                  <p className="text-sm font-medium opacity-80">Total Bookings</p>
                  <h3 className="text-2xl font-bold mt-1">473</h3>
                </div>
                <div className="bg-white/20 p-3 rounded-full">
                  <Calendar className="h-6 w-6 text-white" />
                </div>
              </div>
            </div>
            <div className="bg-white p-4">
              <div className="flex items-center text-sm">
                <ArrowUp className="h-4 w-4 text-green-500 mr-1" />
                <span className="text-green-500 font-medium">8%</span>
                <span className="text-gray-500 ml-1">from last month</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="overflow-hidden border-none shadow-md">
          <CardContent className="p-0">
            <div className="bg-gradient-to-r from-amber-500 to-amber-700 p-4">
              <div className="flex items-center justify-between text-white">
                <div>
                  <p className="text-sm font-medium opacity-80">Total Properties</p>
                  <h3 className="text-2xl font-bold mt-1">320</h3>
                </div>
                <div className="bg-white/20 p-3 rounded-full">
                  <Building2 className="h-6 w-6 text-white" />
                </div>
              </div>
            </div>
            <div className="bg-white p-4">
              <div className="flex items-center text-sm">
                <ArrowUp className="h-4 w-4 text-green-500 mr-1" />
                <span className="text-green-500 font-medium">5%</span>
                <span className="text-gray-500 ml-1">from last month</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="overflow-hidden border-none shadow-md">
          <CardContent className="p-0">
            <div className="bg-gradient-to-r from-green-500 to-green-700 p-4">
              <div className="flex items-center justify-between text-white">
                <div>
                  <p className="text-sm font-medium opacity-80">Total Users</p>
                  <h3 className="text-2xl font-bold mt-1">1,294</h3>
                </div>
                <div className="bg-white/20 p-3 rounded-full">
                  <Users className="h-6 w-6 text-white" />
                </div>
              </div>
            </div>
            <div className="bg-white p-4">
              <div className="flex items-center text-sm">
                <ArrowDown className="h-4 w-4 text-red-500 mr-1" />
                <span className="text-red-500 font-medium">3%</span>
                <span className="text-gray-500 ml-1">from last month</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card className="border-none shadow-md">
              <CardHeader>
                <CardTitle>Revenue Overview</CardTitle>
                <CardDescription>Monthly revenue for the current year</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={{
                    revenue: {
                      label: "Revenue",
                      color: "hsl(var(--chart-1))",
                    },
                  }}
                  className="h-[300px]"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={revenueData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip content={<ChartTooltipContent />} />
                      <Legend />
                      <Line type="monotone" dataKey="revenue" stroke="#8884d8" strokeWidth={2} activeDot={{ r: 8 }} />
                    </LineChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>
            <Card className="border-none shadow-md">
              <CardHeader>
                <CardTitle>Bookings Overview</CardTitle>
                <CardDescription>Monthly bookings for the current year</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={{
                    bookings: {
                      label: "Bookings",
                      color: "hsl(var(--chart-2))",
                    },
                  }}
                  className="h-[300px]"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={bookingsData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip content={<ChartTooltipContent />} />
                      <Legend />
                      <Line type="monotone" dataKey="bookings" stroke="#82ca9d" strokeWidth={2} activeDot={{ r: 8 }} />
                    </LineChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <Card className="md:col-span-2 border-none shadow-md">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <div>
                  <CardTitle>Recent Activity</CardTitle>
                  <CardDescription>Latest actions and updates</CardDescription>
                </div>
                <Button variant="ghost" size="sm" className="text-purple-600">
                  View All
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivities.map((activity) => (
                    <div key={activity.id} className="flex items-start gap-4 p-3 rounded-lg hover:bg-gray-50">
                      <div className={`p-2 rounded-full ${activity.iconBg}`}>{activity.icon}</div>
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="font-medium">{activity.title}</p>
                            <p className="text-sm text-gray-500">{activity.description}</p>
                          </div>
                          <span className="text-xs text-gray-500">{activity.time}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="border-none shadow-md">
              <CardHeader>
                <CardTitle>Property Types</CardTitle>
                <CardDescription>Distribution of properties by type</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={{
                    count: {
                      label: "Count",
                      color: "hsl(var(--chart-3))",
                    },
                  }}
                  className="h-[300px]"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={propertyTypeData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                      <XAxis dataKey="type" />
                      <YAxis />
                      <Tooltip content={<ChartTooltipContent />} />
                      <Legend />
                      <Bar dataKey="count" fill="#8884d8" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <Card className="border-none shadow-md">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <div>
                  <CardTitle>Top Properties</CardTitle>
                  <CardDescription>Best performing properties</CardDescription>
                </div>
                <Button variant="ghost" size="sm" className="text-purple-600">
                  View All
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {topProperties.map((property) => (
                    <div key={property.id} className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-50">
                      <div className="h-16 w-16 rounded-md overflow-hidden flex-shrink-0">
                        <img
                          src={property.image || "/placeholder.svg"}
                          alt={property.name}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium truncate">{property.name}</p>
                        <p className="text-sm text-gray-500">{property.location}</p>
                        <div className="flex items-center gap-4 mt-1">
                          <div className="flex items-center">
                            <Calendar className="h-4 w-4 text-gray-400 mr-1" />
                            <span className="text-xs">{property.bookings} bookings</span>
                          </div>
                          <div className="flex items-center">
                            <DollarSign className="h-4 w-4 text-gray-400 mr-1" />
                            <span className="text-xs">{property.revenue}</span>
                          </div>
                        </div>
                      </div>
                      <Badge className="bg-purple-100 text-purple-600 hover:bg-purple-100">{property.price}</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="border-none shadow-md">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <div>
                  <CardTitle>Top Users</CardTitle>
                  <CardDescription>Users with most bookings</CardDescription>
                </div>
                <Button variant="ghost" size="sm" className="text-purple-600">
                  View All
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {topUsers.map((user) => (
                    <div key={user.id} className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-50">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                        <AvatarFallback className="bg-purple-100 text-purple-600">
                          {user.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium">{user.name}</p>
                        <p className="text-sm text-gray-500 truncate">{user.email}</p>
                        <div className="flex items-center gap-4 mt-1">
                          <div className="flex items-center">
                            <Calendar className="h-4 w-4 text-gray-400 mr-1" />
                            <span className="text-xs">{user.bookings} bookings</span>
                          </div>
                          <div className="flex items-center">
                            <DollarSign className="h-4 w-4 text-gray-400 mr-1" />
                            <span className="text-xs">{user.spent}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="border-none shadow-md">
            <CardHeader>
              <CardTitle>System Health</CardTitle>
              <CardDescription>Current status of your system</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Server Uptime</span>
                    <span className="text-sm text-green-600">99.9%</span>
                  </div>
                  <Progress value={99.9} className="h-2" indicatorClassName="bg-green-500" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Database Load</span>
                    <span className="text-sm text-amber-600">65%</span>
                  </div>
                  <Progress value={65} className="h-2" indicatorClassName="bg-amber-500" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">API Response</span>
                    <span className="text-sm text-green-600">210ms</span>
                  </div>
                  <Progress value={85} className="h-2" indicatorClassName="bg-green-500" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Storage Used</span>
                    <span className="text-sm text-blue-600">42%</span>
                  </div>
                  <Progress value={42} className="h-2" indicatorClassName="bg-blue-500" />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <Card className="border-none shadow-md">
            <CardHeader>
              <CardTitle>Advanced Analytics</CardTitle>
              <CardDescription>Detailed analytics will be displayed here</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-center h-[400px] border rounded-md">
                <p className="text-gray-500">Advanced analytics content coming soon</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reports" className="space-y-4">
          <Card className="border-none shadow-md">
            <CardHeader>
              <CardTitle>Reports</CardTitle>
              <CardDescription>Generated reports will be displayed here</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-center h-[400px] border rounded-md">
                <p className="text-gray-500">Reports content coming soon</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="performance" className="space-y-4">
          <Card className="border-none shadow-md">
            <CardHeader>
              <CardTitle>Performance Metrics</CardTitle>
              <CardDescription>System performance metrics will be displayed here</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-center h-[400px] border rounded-md">
                <p className="text-gray-500">Performance metrics content coming soon</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
