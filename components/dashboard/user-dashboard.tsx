"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import {
  Home,
  Calendar,
  Heart,
  Settings,
  MessageSquare,
  LogOut,
  Plus,
  Star,
  CheckCircle,
  XCircle,
  Users,
  Menu,
  X,
  Bell,
  Wallet,
  BarChart3,
  User,
  ChevronDown,
  Search,
  Filter,
  ArrowUpRight,
  Bookmark,
  HelpCircle,
  Shield,
  MapPin,
  Eye,
  Clock,
  ChevronRight,
} from "lucide-react"
import { properties } from "@/data/properties"
import { cn } from "@/lib/utils"
import { AddPropertyModal } from "@/components/properties/add-property-modal"

export function UserDashboard() {
  const [activeTab, setActiveTab] = useState("properties")
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const router = useRouter()
  const [isAddPropertyModalOpen, setIsAddPropertyModalOpen] = useState(false)

  // Mock user data
  const user = {
    name: "John Doe",
    email: "john.doe@example.com",
    avatar: "/thoughtful-man-portrait.png",
    joinedDate: "January 2023",
  }

  // Mock bookings data
  const bookings = [
    {
      id: 1,
      propertyId: 3,
      property: "Elegant Villa with Private Pool",
      location: "Banana Island, Lagos",
      image: "/elegant-villa-lagos.png",
      checkIn: "2023-06-15",
      checkOut: "2023-06-20",
      guests: 4,
      status: "upcoming",
      totalPrice: 2250000,
    },
    {
      id: 2,
      propertyId: 1,
      property: "Luxury Apartment with Ocean View",
      location: "Victoria Island, Lagos",
      image: "/luxury-ocean-view-apartment.png",
      checkIn: "2023-05-10",
      checkOut: "2023-05-15",
      guests: 2,
      status: "completed",
      totalPrice: 1250000,
    },
    {
      id: 3,
      propertyId: 5,
      property: "Beachfront Luxury Home",
      location: "Eleko Beach, Lagos",
      image: "/lagos-beachfront-luxury-home.png",
      checkIn: "2023-04-20",
      checkOut: "2023-04-25",
      guests: 6,
      status: "cancelled",
      totalPrice: 1600000,
    },
  ]

  // Mock user properties (listings)
  const userProperties = [
    {
      id: 101,
      title: "Modern Apartment in Lekki",
      location: "Lekki Phase 1, Lagos",
      image: "/modern-ikoyi-apartment.png",
      price: 120000,
      status: "active",
      views: 245,
      bookings: 8,
    },
    {
      id: 102,
      title: "Cozy Studio in Yaba",
      location: "Yaba, Lagos",
      image: "/cozy-yaba-studio.png",
      price: 75000,
      status: "pending",
      views: 120,
      bookings: 0,
    },
  ]

  // Get favorite properties from the properties data
  const favoriteProperties = properties.filter((property) => [1, 3, 5].includes(property.id))

  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
  }

  // Dashboard stats
  const dashboardStats = [
    { label: "Total Bookings", value: 12, icon: Calendar, color: "bg-blue-500" },
    { label: "Active Listings", value: 2, icon: Home, color: "bg-green-500" },
    { label: "Total Revenue", value: "₦3.5M", icon: Wallet, color: "bg-purple-500" },
    { label: "Profile Views", value: 365, icon: User, color: "bg-amber-500" },
  ]

  // Navigation items
  const navItems = [
    { label: "My Properties", icon: Home, id: "properties" },
    { label: "My Bookings", icon: Calendar, id: "bookings" },
    { label: "Favorites", icon: Heart, id: "favorites" },
    { label: "Messages", icon: MessageSquare, id: "messages" },
    { label: "Analytics", icon: BarChart3, id: "analytics" },
    { label: "Settings", icon: Settings, id: "settings" },
  ]

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen)
  }

  // Recent activity data
  const recentActivity = [
    {
      id: 1,
      type: "booking",
      title: "New Booking Received",
      description: "You received a new booking for Modern Apartment in Lekki",
      time: "2 hours ago",
      icon: Calendar,
      color: "bg-blue-100 text-blue-600",
    },
    {
      id: 2,
      type: "review",
      title: "New Review",
      description: "John Smith left a 5-star review on your Cozy Studio in Yaba",
      time: "Yesterday",
      icon: Star,
      color: "bg-yellow-100 text-yellow-600",
    },
    {
      id: 3,
      type: "message",
      title: "New Message",
      description: "You have a new message from Sarah regarding her booking",
      time: "2 days ago",
      icon: MessageSquare,
      color: "bg-green-100 text-green-600",
    },
  ]

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
      {/* Dashboard Header */}
      <div className="mb-6 sm:mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-hovmart-purple to-hovmart-light bg-clip-text text-transparent">
              Dashboard
            </h1>
            <p className="text-gray-600">Welcome back, {user.name}</p>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="sm:hidden flex justify-end">
            <button onClick={toggleMobileMenu} className="p-2 rounded-full bg-white shadow-md text-hovmart-purple">
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

          {/* Desktop Actions */}
          <div className="hidden sm:flex items-center space-x-3">
            <div className="relative">
              <button className="p-2 rounded-full bg-white shadow-sm text-gray-600 hover:text-hovmart-purple transition-colors">
                <Search className="h-5 w-5" />
              </button>
            </div>
            <div className="relative">
              <button className="p-2 rounded-full bg-white shadow-sm text-gray-600 hover:text-hovmart-purple transition-colors relative">
                <Bell className="h-5 w-5" />
                <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500"></span>
              </button>
            </div>
            <button
              onClick={() => setIsAddPropertyModalOpen(true)}
              className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-hovmart-purple to-hovmart-light text-white rounded-lg text-sm font-medium hover:shadow-md transition-shadow"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Property
            </button>
            <div className="relative group">
              <button className="flex items-center space-x-2 p-1 rounded-full hover:bg-gray-100 transition-colors">
                <div className="relative w-8 h-8 rounded-full overflow-hidden border-2 border-white shadow-sm">
                  <Image src={user.avatar || "/placeholder.svg"} alt={user.name} fill className="object-cover" />
                </div>
                <ChevronDown className="h-4 w-4 text-gray-600" />
              </button>
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg py-2 z-10 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform origin-top-right scale-95 group-hover:scale-100">
                <div className="px-4 py-2 border-b border-gray-100">
                  <p className="font-medium">{user.name}</p>
                  <p className="text-sm text-gray-600 truncate">{user.email}</p>
                </div>
                <Link href="/profile" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                  <User className="h-4 w-4 mr-2 text-gray-500" />
                  Profile
                </Link>
                <Link href="/settings" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                  <Settings className="h-4 w-4 mr-2 text-gray-500" />
                  Settings
                </Link>
                <Link href="/help" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                  <HelpCircle className="h-4 w-4 mr-2 text-gray-500" />
                  Help Center
                </Link>
                <button className="flex w-full items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50">
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Dashboard Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {dashboardStats.map((stat, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-sm p-5 border border-gray-100 hover:shadow-md transition-all duration-300 transform hover:-translate-y-1 overflow-hidden relative group"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-hovmart-purple/5 to-hovmart-light/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="flex items-start justify-between relative z-10">
              <div>
                <p className="text-sm text-gray-500 font-medium">{stat.label}</p>
                <p className="text-2xl font-bold mt-1 bg-gradient-to-r from-hovmart-purple to-hovmart-light bg-clip-text text-transparent">
                  {stat.value}
                </p>
              </div>
              <div className={`${stat.color} p-2.5 rounded-xl text-white shadow-sm`}>
                <stat.icon className="h-5 w-5" />
              </div>
            </div>
            <div className="w-full h-1 bg-gray-100 mt-4 rounded-full overflow-hidden">
              <div
                className={`h-full ${stat.color.replace("bg-", "bg-")} rounded-full`}
                style={{ width: `${Math.random() * 60 + 40}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Mobile Sidebar */}
        {mobileMenuOpen && (
          <div className="fixed inset-0 bg-black/50 z-40 sm:hidden" onClick={toggleMobileMenu}>
            <div
              className="absolute top-0 left-0 h-full w-3/4 max-w-xs bg-white shadow-xl p-4 z-50"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <div className="relative w-10 h-10 rounded-full overflow-hidden">
                    <Image src={user.avatar || "/placeholder.svg"} alt={user.name} fill className="object-cover" />
                  </div>
                  <div>
                    <h2 className="font-semibold">{user.name}</h2>
                    <p className="text-xs text-gray-600">{user.email}</p>
                  </div>
                </div>
                <button onClick={toggleMobileMenu}>
                  <X className="h-5 w-5 text-gray-600" />
                </button>
              </div>

              <div className="space-y-1">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveTab(item.id)
                      setMobileMenuOpen(false)
                    }}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                      activeTab === item.id
                        ? "bg-hovmart-purple/10 text-hovmart-purple"
                        : "hover:bg-gray-100 text-gray-700"
                    }`}
                  >
                    <item.icon className="h-5 w-5" />
                    <span>{item.label}</span>
                  </button>
                ))}

                <button className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-red-500 hover:bg-red-50 transition-colors">
                  <LogOut className="h-5 w-5" />
                  <span>Logout</span>
                </button>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <button
                  onClick={() => {
                    setIsAddPropertyModalOpen(true)
                    setMobileMenuOpen(false)
                  }}
                  className="w-full flex items-center justify-center px-4 py-3 bg-gradient-to-r from-hovmart-purple to-hovmart-light text-white rounded-lg font-medium"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Property
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Desktop Sidebar */}
        <div className="hidden lg:block lg:w-1/4">
          <div className="bg-white rounded-xl shadow-sm p-6 mb-6 border border-gray-100 backdrop-blur-sm relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-hovmart-purple/5 to-transparent pointer-events-none"></div>
            <div className="relative z-10">
              <div className="flex items-center space-x-4 mb-6">
                <div className="relative">
                  <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-hovmart-purple/20 shadow-md">
                    <Image src={user.avatar || "/placeholder.svg"} alt={user.name} fill className="object-cover" />
                  </div>
                  <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
                </div>
                <div>
                  <h2 className="font-semibold text-lg">{user.name}</h2>
                  <p className="text-gray-600 text-sm">{user.email}</p>
                  <p className="text-xs text-gray-500 mt-1 flex items-center">
                    <Calendar className="h-3 w-3 mr-1 inline" /> Member since {user.joinedDate}
                  </p>
                </div>
              </div>

              <div className="space-y-1.5">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                      activeTab === item.id
                        ? "bg-gradient-to-r from-hovmart-purple/20 to-hovmart-light/10 text-hovmart-purple shadow-sm"
                        : "hover:bg-gray-100 text-gray-700"
                    }`}
                  >
                    <item.icon
                      className={`h-5 w-5 ${activeTab === item.id ? "text-hovmart-purple" : "text-gray-500"}`}
                    />
                    <span className="font-medium">{item.label}</span>
                    {activeTab === item.id && (
                      <div className="ml-auto w-1.5 h-1.5 rounded-full bg-hovmart-purple"></div>
                    )}
                  </button>
                ))}

                <button className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-red-500 hover:bg-red-50 transition-colors mt-2">
                  <LogOut className="h-5 w-5" />
                  <span className="font-medium">Logout</span>
                </button>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-hovmart-purple to-hovmart-light rounded-xl p-6 text-white shadow-lg relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('/abstract-business-gold.png')] opacity-10 mix-blend-overlay"></div>
            <div className="relative z-10">
              <h3 className="font-semibold text-xl mb-2">Become a Host</h3>
              <p className="text-white/90 text-sm mb-4">
                List your property on Hovmart and start earning. It's easy and free to get started.
              </p>
              <button
                onClick={() => setIsAddPropertyModalOpen(true)}
                className="inline-flex items-center px-4 py-2 bg-white text-hovmart-purple rounded-lg text-sm font-medium hover:shadow-md transition-all duration-300 hover:bg-gray-50"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Property
              </button>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-xl shadow-sm p-6 mt-6 border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-lg">Recent Activity</h3>
              <button className="text-sm text-hovmart-purple hover:underline flex items-center">
                View All
                <ChevronRight className="h-4 w-4 ml-1" />
              </button>
            </div>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div
                  key={activity.id}
                  className="flex items-start space-x-3 animate-fade-in p-3 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className={`p-2 rounded-lg ${activity.color} flex-shrink-0 mt-1 shadow-sm`}>
                    <activity.icon className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="font-medium text-sm">{activity.title}</p>
                    <p className="text-gray-600 text-xs">{activity.description}</p>
                    <p className="text-gray-500 text-xs mt-1 flex items-center">
                      <Clock className="h-3 w-3 mr-1" />
                      {activity.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:w-3/4">
          {/* Tab Navigation for Mobile/Tablet */}
          <div className="lg:hidden mb-6 overflow-x-auto scrollbar-hide">
            <div className="flex space-x-2 pb-2">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={cn(
                    "flex items-center space-x-2 whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition-colors",
                    activeTab === item.id
                      ? "bg-hovmart-purple text-white shadow-sm"
                      : "bg-white text-gray-700 border border-gray-200",
                  )}
                >
                  <item.icon className="h-4 w-4" />
                  <span>{item.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* My Properties Tab */}
          {activeTab === "properties" && (
            <div className="animate-fade-in">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <h2 className="text-xl font-bold bg-gradient-to-r from-hovmart-purple to-hovmart-light bg-clip-text text-transparent">
                  My Properties
                </h2>
                <div className="flex items-center space-x-2">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search properties..."
                      className="pl-9 pr-4 py-2 rounded-lg border border-gray-300 focus:ring-hovmart-purple focus:border-hovmart-purple w-full sm:w-auto"
                    />
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  </div>
                  <button className="p-2 rounded-lg border border-gray-300 text-gray-700 hover:border-hovmart-purple/50 transition-colors">
                    <Filter className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => setIsAddPropertyModalOpen(true)}
                    className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-hovmart-purple to-hovmart-light text-white rounded-lg text-sm font-medium hover:shadow-md transition-shadow"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Property
                  </button>
                </div>
              </div>

              {userProperties.length > 0 ? (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {userProperties.map((property, index) => (
                    <div
                      key={property.id}
                      className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 animate-fade-in group"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <div className="flex flex-col sm:flex-row">
                        <div className="sm:w-2/5 relative">
                          <div className="aspect-square sm:h-full overflow-hidden">
                            <Image
                              src={property.image || "/placeholder.svg"}
                              alt={property.title}
                              fill
                              className="object-cover transition-transform duration-500 group-hover:scale-105"
                              sizes="(max-width: 640px) 100vw, 33vw"
                            />
                          </div>
                          <div
                            className={`absolute top-2 left-2 px-2 py-1 rounded-md text-xs font-medium ${
                              property.status === "active"
                                ? "bg-green-100 text-green-800"
                                : "bg-yellow-100 text-yellow-800"
                            } backdrop-blur-sm bg-opacity-90`}
                          >
                            {property.status === "active" ? "Active" : "Pending Review"}
                          </div>
                        </div>
                        <div className="sm:w-3/5 p-5">
                          <h3 className="font-semibold mb-1 line-clamp-1 group-hover:text-hovmart-purple transition-colors">
                            {property.title}
                          </h3>
                          <p className="text-gray-600 text-sm mb-3 flex items-center">
                            <MapPin className="h-3.5 w-3.5 mr-1 text-hovmart-purple/70" />
                            {property.location}
                          </p>
                          <p className="font-medium mb-3 text-lg">
                            ₦{property.price.toLocaleString()} <span className="text-sm text-gray-500">/ night</span>
                          </p>

                          <div className="grid grid-cols-2 gap-2 mb-4">
                            <div className="bg-gray-50 p-2.5 rounded-lg">
                              <div className="text-xs text-gray-500 mb-1">Views</div>
                              <div className="font-medium flex items-center">
                                <Eye className="h-3.5 w-3.5 mr-1.5 text-hovmart-purple/70" />
                                {property.views}
                              </div>
                            </div>
                            <div className="bg-gray-50 p-2.5 rounded-lg">
                              <div className="text-xs text-gray-500 mb-1">Bookings</div>
                              <div className="font-medium flex items-center">
                                <Calendar className="h-3.5 w-3.5 mr-1.5 text-hovmart-purple/70" />
                                {property.bookings}
                              </div>
                            </div>
                          </div>

                          <div className="flex justify-between items-center">
                            <div className="flex space-x-1">
                              <button className="p-1.5 rounded-md hover:bg-gray-100 transition-colors">
                                <Bookmark className="h-4 w-4 text-hovmart-purple" />
                              </button>
                              <button className="p-1.5 rounded-md hover:bg-gray-100 transition-colors">
                                <Shield className="h-4 w-4 text-hovmart-purple" />
                              </button>
                            </div>
                            <button
                              onClick={() => router.push(`/dashboard/properties/${property.id}`)}
                              className="inline-flex items-center text-hovmart-purple text-sm font-medium hover:underline group-hover:bg-hovmart-purple/10 px-3 py-1 rounded-lg transition-colors"
                            >
                              Manage
                              <ArrowUpRight className="h-4 w-4 ml-1 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="bg-white rounded-xl shadow-sm p-8 text-center border border-gray-100 animate-fade-in">
                  <div className="w-16 h-16 bg-hovmart-purple/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Home className="h-8 w-8 text-hovmart-purple" />
                  </div>
                  <h2 className="text-xl font-semibold mb-2">No Properties Yet</h2>
                  <p className="text-gray-600 mb-6">
                    You haven't listed any properties yet. Start earning by becoming a host today.
                  </p>
                  <button
                    onClick={() => setIsAddPropertyModalOpen(true)}
                    className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-hovmart-purple to-hovmart-light text-white rounded-lg font-medium hover:shadow-md transition-shadow"
                  >
                    <Plus className="h-5 w-5 mr-2" />
                    Add Your First Property
                  </button>
                </div>
              )}
            </div>
          )}

          {/* My Bookings Tab */}
          {activeTab === "bookings" && (
            <div className="animate-fade-in">
              <h2 className="text-xl font-bold mb-6">My Bookings</h2>

              <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-8 border border-gray-100">
                <div className="border-b border-gray-200 overflow-x-auto scrollbar-hide">
                  <div className="flex">
                    <button className="px-4 sm:px-6 py-3 font-medium text-hovmart-purple border-b-2 border-hovmart-purple whitespace-nowrap">
                      All Bookings
                    </button>
                    <button className="px-4 sm:px-6 py-3 font-medium text-gray-500 hover:text-hovmart-purple/80 transition-colors whitespace-nowrap">
                      Upcoming
                    </button>
                    <button className="px-4 sm:px-6 py-3 font-medium text-gray-500 hover:text-hovmart-purple/80 transition-colors whitespace-nowrap">
                      Completed
                    </button>
                    <button className="px-4 sm:px-6 py-3 font-medium text-gray-500 hover:text-hovmart-purple/80 transition-colors whitespace-nowrap">
                      Cancelled
                    </button>
                  </div>
                </div>

                <div className="divide-y divide-gray-200">
                  {bookings.map((booking, index) => (
                    <div
                      key={booking.id}
                      className="p-4 sm:p-6 animate-fade-in"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <div className="flex flex-col sm:flex-row">
                        <div className="sm:w-1/4 mb-4 sm:mb-0">
                          <div className="relative aspect-video sm:aspect-square rounded-lg overflow-hidden">
                            <Image
                              src={booking.image || "/placeholder.svg"}
                              alt={booking.property}
                              fill
                              className="object-cover"
                              sizes="(max-width: 640px) 100vw, 25vw"
                            />
                          </div>
                        </div>
                        <div className="sm:w-3/4 sm:pl-6">
                          <div className="flex flex-wrap justify-between items-start mb-2">
                            <h3 className="font-semibold text-lg mb-1">{booking.property}</h3>
                            <div
                              className={`px-3 py-1 rounded-full text-xs font-medium ${
                                booking.status === "upcoming"
                                  ? "bg-blue-100 text-blue-800"
                                  : booking.status === "completed"
                                    ? "bg-green-100 text-green-800"
                                    : "bg-red-100 text-red-800"
                              }`}
                            >
                              {booking.status === "upcoming"
                                ? "Upcoming"
                                : booking.status === "completed"
                                  ? "Completed"
                                  : "Cancelled"}
                            </div>
                          </div>
                          <p className="text-gray-600 mb-4">{booking.location}</p>

                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                            <div>
                              <div className="text-xs text-gray-500 mb-1">Check-in</div>
                              <div className="flex items-center">
                                <Calendar className="h-4 w-4 text-hovmart-purple mr-1" />
                                <span>{formatDate(booking.checkIn)}</span>
                              </div>
                            </div>
                            <div>
                              <div className="text-xs text-gray-500 mb-1">Check-out</div>
                              <div className="flex items-center">
                                <Calendar className="h-4 w-4 text-hovmart-purple mr-1" />
                                <span>{formatDate(booking.checkOut)}</span>
                              </div>
                            </div>
                            <div>
                              <div className="text-xs text-gray-500 mb-1">Guests</div>
                              <div className="flex items-center">
                                <Users className="h-4 w-4 text-hovmart-purple mr-1" />
                                <span>{booking.guests}</span>
                              </div>
                            </div>
                            <div>
                              <div className="text-xs text-gray-500 mb-1">Total</div>
                              <div className="font-medium">₦{booking.totalPrice.toLocaleString()}</div>
                            </div>
                          </div>

                          <div className="flex flex-wrap justify-between items-center">
                            <Link
                              href={`/properties/${booking.propertyId}`}
                              className="text-hovmart-purple text-sm font-medium hover:underline"
                            >
                              View Property
                            </Link>
                            <div className="flex flex-wrap gap-2 mt-3 sm:mt-0">
                              {booking.status === "completed" && (
                                <button className="inline-flex items-center px-3 py-1.5 border border-hovmart-purple text-hovmart-purple rounded-lg text-sm hover:bg-hovmart-purple/5 transition-colors">
                                  <Star className="h-4 w-4 mr-1" />
                                  Review
                                </button>
                              )}
                              {booking.status === "upcoming" && (
                                <>
                                  <button className="inline-flex items-center px-3 py-1.5 border border-gray-300 text-gray-700 rounded-lg text-sm hover:border-hovmart-purple/50 transition-colors">
                                    <Clock className="h-4 w-4 mr-1" />
                                    Reschedule
                                  </button>
                                  <button className="inline-flex items-center px-3 py-1.5 border border-red-300 text-red-600 rounded-lg text-sm hover:bg-red-50 transition-colors">
                                    <XCircle className="h-4 w-4 mr-1" />
                                    Cancel
                                  </button>
                                </>
                              )}
                              {booking.status === "completed" && (
                                <button className="inline-flex items-center px-3 py-1.5 border border-hovmart-purple text-hovmart-purple rounded-lg text-sm hover:bg-hovmart-purple/5 transition-colors">
                                  <CheckCircle className="h-4 w-4 mr-1" />
                                  Book Again
                                </button>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Favorites Tab */}
          {activeTab === "favorites" && (
            <div className="animate-fade-in">
              <h2 className="text-xl font-bold mb-6">Favorites</h2>

              {favoriteProperties.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {favoriteProperties.map((property, index) => (
                    <div
                      key={property.id}
                      className="bg-white rounded-xl shadow-sm overflow-hidden group border border-gray-100 hover:shadow-md transition-all duration-300 hover:translate-y-[-2px] animate-fade-in"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <div className="relative aspect-[4/3]">
                        <Image
                          src={property.images[0] || "/placeholder.svg"}
                          alt={property.title}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <button className="absolute top-3 right-3 p-2 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white transition-colors">
                          <Heart className="h-4 w-4 fill-hovmart-purple text-hovmart-purple" />
                        </button>
                      </div>
                      <div className="p-4">
                        <div className="flex justify-between items-start">
                          <h3 className="font-medium text-gray-900 group-hover:text-hovmart-purple transition-colors line-clamp-1">
                            {property.title}
                          </h3>
                          <div className="flex items-center gap-1 text-sm whitespace-nowrap ml-2">
                            <Star className="h-4 w-4 fill-hovmart-purple text-hovmart-purple flex-shrink-0" />
                            <span>{property.rating}</span>
                          </div>
                        </div>

                        <p className="text-gray-600 text-sm line-clamp-1">{property.location}</p>
                        <p className="text-gray-600 text-sm">
                          {property.type} • {property.beds} bed{property.beds !== 1 ? "s" : ""} • {property.baths} bath
                          {property.baths !== 1 ? "s" : ""}
                        </p>
                        <p className="text-gray-600 text-sm">{property.dates}</p>

                        <p className="mt-2">
                          <span className="font-semibold text-gray-900">₦{property.price.toLocaleString()}</span>
                          <span className="text-gray-600"> night</span>
                        </p>

                        <div className="mt-4">
                          <Link
                            href={`/properties/${property.id}`}
                            className="w-full inline-flex items-center justify-center px-4 py-2 bg-gradient-to-r from-hovmart-purple to-hovmart-light text-white rounded-lg text-sm font-medium hover:shadow-md transition-shadow"
                          >
                            View Details
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="bg-white rounded-xl shadow-sm p-8 text-center border border-gray-100 animate-fade-in">
                  <div className="w-16 h-16 bg-hovmart-purple/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Heart className="h-8 w-8 text-hovmart-purple" />
                  </div>
                  <h2 className="text-xl font-semibold mb-2">No Favorites Yet</h2>
                  <p className="text-gray-600 mb-6">
                    You haven't saved any properties to your favorites yet. Browse properties and click the heart icon
                    to save them here.
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
          )}

          {/* Messages Tab */}
          {activeTab === "messages" && (
            <div className="animate-fade-in">
              <h2 className="text-xl font-bold mb-6">Messages</h2>

              <div className="bg-white rounded-xl shadow-sm p-8 text-center border border-gray-100">
                <div className="w-16 h-16 bg-hovmart-purple/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MessageSquare className="h-8 w-8 text-hovmart-purple" />
                </div>
                <h2 className="text-xl font-semibold mb-2">No Messages Yet</h2>
                <p className="text-gray-600 mb-6">
                  You don't have any messages yet. Messages from hosts and guests will appear here.
                </p>
              </div>
            </div>
          )}

          {/* Analytics Tab */}
          {activeTab === "analytics" && (
            <div className="animate-fade-in">
              <h2 className="text-xl font-bold mb-6">Analytics</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition-shadow">
                  <h3 className="text-lg font-semibold mb-4">Booking Performance</h3>
                  <div className="h-48 flex items-center justify-center bg-gray-50 rounded-lg">
                    <p className="text-gray-500">Booking chart will appear here</p>
                  </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition-shadow">
                  <h3 className="text-lg font-semibold mb-4">Revenue Overview</h3>
                  <div className="h-48 flex items-center justify-center bg-gray-50 rounded-lg">
                    <p className="text-gray-500">Revenue chart will appear here</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition-shadow">
                <h3 className="text-lg font-semibold mb-4">Property Performance</h3>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead>
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Property
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Views
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Bookings
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Revenue
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Occupancy
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {userProperties.map((property) => (
                        <tr key={property.id}>
                          <td className="px-4 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="h-10 w-10 flex-shrink-0 rounded overflow-hidden mr-3">
                                <Image
                                  src={property.image || "/placeholder.svg"}
                                  alt={property.title}
                                  width={40}
                                  height={40}
                                  className="object-cover"
                                />
                              </div>
                              <div className="text-sm font-medium text-gray-900">{property.title}</div>
                            </div>
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">{property.views}</td>
                          <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">{property.bookings}</td>
                          <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                            ₦{(property.price * property.bookings).toLocaleString()}
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                            {Math.round(property.bookings * 5)}%
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Settings Tab */}
          {activeTab === "settings" && (
            <div className="animate-fade-in">
              <h2 className="text-xl font-bold mb-6">Account Settings</h2>

              <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-8 border border-gray-100">
                <div className="border-b border-gray-200 overflow-x-auto scrollbar-hide">
                  <div className="flex">
                    <button className="px-4 sm:px-6 py-3 font-medium text-hovmart-purple border-b-2 border-hovmart-purple whitespace-nowrap">
                      Profile
                    </button>
                    <button className="px-4 sm:px-6 py-3 font-medium text-gray-500 hover:text-hovmart-purple/80 transition-colors whitespace-nowrap">
                      Security
                    </button>
                    <button className="px-4 sm:px-6 py-3 font-medium text-gray-500 hover:text-hovmart-purple/80 transition-colors whitespace-nowrap">
                      Notifications
                    </button>
                    <button className="px-4 sm:px-6 py-3 font-medium text-gray-500 hover:text-hovmart-purple/80 transition-colors whitespace-nowrap">
                      Payment
                    </button>
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex flex-col md:flex-row md:items-center mb-8">
                    <div className="md:w-1/4 mb-4 md:mb-0">
                      <div className="relative w-24 h-24 rounded-full overflow-hidden border-2 border-hovmart-purple/20">
                        <Image src={user.avatar || "/placeholder.svg"} alt={user.name} fill className="object-cover" />
                      </div>
                    </div>
                    <div className="md:w-3/4">
                      <h3 className="font-semibold mb-2">Profile Picture</h3>
                      <p className="text-gray-600 text-sm mb-4">
                        Upload a clear photo of yourself. This helps hosts and guests recognize you.
                      </p>
                      <div className="flex flex-wrap gap-3">
                        <button className="px-4 py-2 bg-hovmart-purple text-white rounded-lg text-sm font-medium hover:bg-hovmart-purple/90 transition-colors">
                          Upload New
                        </button>
                        <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg text-sm hover:border-hovmart-purple/50 transition-colors">
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-gray-200 pt-6">
                    <h3 className="font-semibold mb-4">Personal Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                          Full Name
                        </label>
                        <input
                          type="text"
                          id="name"
                          defaultValue={user.name}
                          className="w-full rounded-lg border border-gray-300 focus:ring-hovmart-purple focus:border-hovmart-purple"
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                          Email Address
                        </label>
                        <input
                          type="email"
                          id="email"
                          defaultValue={user.email}
                          className="w-full rounded-lg border border-gray-300 focus:ring-hovmart-purple focus:border-hovmart-purple"
                        />
                      </div>
                      <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          placeholder="+234 800 000 0000"
                          className="w-full rounded-lg border border-gray-300 focus:ring-hovmart-purple focus:border-hovmart-purple"
                        />
                      </div>
                      <div>
                        <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                          Address
                        </label>
                        <input
                          type="text"
                          id="address"
                          placeholder="Enter your address"
                          className="w-full rounded-lg border border-gray-300 focus:ring-hovmart-purple focus:border-hovmart-purple"
                        />
                      </div>
                    </div>

                    <div className="flex justify-end">
                      <button className="px-6 py-2 bg-gradient-to-r from-hovmart-purple to-hovmart-light text-white rounded-lg font-medium hover:shadow-md transition-shadow">
                        Save Changes
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      {/* Add Property Modal */}
      <AddPropertyModal isOpen={isAddPropertyModalOpen} onClose={() => setIsAddPropertyModalOpen(false)} />
    </div>
  )
}
