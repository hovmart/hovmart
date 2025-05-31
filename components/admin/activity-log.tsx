"use client"

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Building2,
  Calendar,
  Check,
  Clock,
  Edit,
  Eye,
  Filter,
  MessageSquare,
  Search,
  Settings,
  Trash2,
  User,
  XCircle,
} from "lucide-react"

// Sample activity data
const activities = [
  {
    id: "ACT-001",
    user: {
      name: "Michael Brown",
      avatar: "/thoughtful-man-portrait.png",
      role: "admin",
    },
    action: "approved_property",
    target: "Luxury Ocean View Apartment",
    targetType: "property",
    timestamp: "2023-07-21T10:30:00",
    details: "Property approved and published to the marketplace",
  },
  {
    id: "ACT-002",
    user: {
      name: "Jane Smith",
      avatar: "/woman-portrait.png",
      role: "agent",
    },
    action: "added_property",
    target: "Modern Penthouse in Victoria Island",
    targetType: "property",
    timestamp: "2023-07-21T09:15:00",
    details: "New property added, pending approval",
  },
  {
    id: "ACT-003",
    user: {
      name: "Michael Brown",
      avatar: "/thoughtful-man-portrait.png",
      role: "admin",
    },
    action: "verified_user",
    target: "Robert Johnson",
    targetType: "user",
    timestamp: "2023-07-20T16:45:00",
    details: "User verified after document review",
  },
  {
    id: "ACT-004",
    user: {
      name: "Michael Brown",
      avatar: "/thoughtful-man-portrait.png",
      role: "admin",
    },
    action: "updated_settings",
    target: "Payment Gateway",
    targetType: "system",
    timestamp: "2023-07-20T14:20:00",
    details: "Updated payment gateway configuration",
  },
  {
    id: "ACT-005",
    user: {
      name: "Emily Davis",
      avatar: "/woman-portrait-3.png",
      role: "agent",
    },
    action: "responded_message",
    target: "Booking Inquiry",
    targetType: "message",
    timestamp: "2023-07-20T11:30:00",
    details: "Responded to customer inquiry about Lagos Penthouse View",
  },
  {
    id: "ACT-006",
    user: {
      name: "Michael Brown",
      avatar: "/thoughtful-man-portrait.png",
      role: "admin",
    },
    action: "deleted_property",
    target: "Duplicate Listing",
    targetType: "property",
    timestamp: "2023-07-19T15:10:00",
    details: "Removed duplicate property listing",
  },
  {
    id: "ACT-007",
    user: {
      name: "Michael Brown",
      avatar: "/thoughtful-man-portrait.png",
      role: "admin",
    },
    action: "edited_category",
    target: "Luxury Homes",
    targetType: "category",
    timestamp: "2023-07-19T13:45:00",
    details: "Updated category description and image",
  },
  {
    id: "ACT-008",
    user: {
      name: "Sarah Williams",
      avatar: "/woman-portrait-2.png",
      role: "user",
    },
    action: "created_booking",
    target: "Elegant Villa Lagos",
    targetType: "booking",
    timestamp: "2023-07-19T10:20:00",
    details: "New booking created for August 1-7",
  },
  {
    id: "ACT-009",
    user: {
      name: "Michael Brown",
      avatar: "/thoughtful-man-portrait.png",
      role: "admin",
    },
    action: "rejected_property",
    target: "Incomplete Listing",
    targetType: "property",
    timestamp: "2023-07-18T16:30:00",
    details: "Property rejected due to incomplete information",
  },
  {
    id: "ACT-010",
    user: {
      name: "Michael Brown",
      avatar: "/thoughtful-man-portrait.png",
      role: "admin",
    },
    action: "sent_newsletter",
    target: "July Newsletter",
    targetType: "marketing",
    timestamp: "2023-07-18T09:00:00",
    details: "Sent monthly newsletter to 5,230 subscribers",
  },
]

export default function ActivityLog() {
  const [searchTerm, setSearchTerm] = useState("")
  const [actionFilter, setActionFilter] = useState("all")
  const [userFilter, setUserFilter] = useState("all")
  const [dateFilter, setDateFilter] = useState("all")

  const getActionIcon = (action: string, targetType: string) => {
    switch (action) {
      case "approved_property":
        return <Check className="h-4 w-4 text-green-500" />
      case "added_property":
        return <Building2 className="h-4 w-4 text-blue-500" />
      case "verified_user":
        return <User className="h-4 w-4 text-blue-500" />
      case "updated_settings":
        return <Settings className="h-4 w-4 text-gray-500" />
      case "responded_message":
        return <MessageSquare className="h-4 w-4 text-indigo-500" />
      case "deleted_property":
        return <Trash2 className="h-4 w-4 text-red-500" />
      case "edited_category":
        return <Edit className="h-4 w-4 text-amber-500" />
      case "created_booking":
        return <Calendar className="h-4 w-4 text-green-500" />
      case "rejected_property":
        return <XCircle className="h-4 w-4 text-red-500" />
      case "sent_newsletter":
        return <MessageSquare className="h-4 w-4 text-purple-500" />
      default:
        return <Eye className="h-4 w-4 text-gray-500" />
    }
  }

  const getActionColor = (action: string) => {
    if (action.includes("approved") || action.includes("created") || action.includes("verified")) {
      return "bg-green-100 text-green-800"
    } else if (action.includes("added") || action.includes("updated") || action.includes("edited")) {
      return "bg-blue-100 text-blue-800"
    } else if (action.includes("deleted") || action.includes("rejected")) {
      return "bg-red-100 text-red-800"
    } else if (action.includes("message") || action.includes("newsletter")) {
      return "bg-purple-100 text-purple-800"
    } else {
      return "bg-gray-100 text-gray-800"
    }
  }

  const formatActionText = (action: string) => {
    return action
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ")
  }

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp)
    const now = new Date()
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000)
    const diffInMinutes = Math.floor(diffInSeconds / 60)
    const diffInHours = Math.floor(diffInMinutes / 60)
    const diffInDays = Math.floor(diffInHours / 24)

    if (diffInSeconds < 60) {
      return "Just now"
    } else if (diffInMinutes < 60) {
      return `${diffInMinutes} minute${diffInMinutes > 1 ? "s" : ""} ago`
    } else if (diffInHours < 24) {
      return `${diffInHours} hour${diffInHours > 1 ? "s" : ""} ago`
    } else if (diffInDays < 7) {
      return `${diffInDays} day${diffInDays > 1 ? "s" : ""} ago`
    } else {
      return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
    }
  }

  const filteredActivities = activities.filter((activity) => {
    // Apply search filter
    if (
      searchTerm &&
      !activity.target.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !activity.user.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !activity.details.toLowerCase().includes(searchTerm.toLowerCase())
    ) {
      return false
    }

    // Apply action filter
    if (actionFilter !== "all" && activity.targetType !== actionFilter) {
      return false
    }

    // Apply user filter
    if (userFilter !== "all" && activity.user.role !== userFilter) {
      return false
    }

    // Apply date filter (simplified for demo)
    if (dateFilter === "today") {
      const today = new Date().toDateString()
      const activityDate = new Date(activity.timestamp).toDateString()
      if (today !== activityDate) {
        return false
      }
    } else if (dateFilter === "yesterday") {
      const yesterday = new Date()
      yesterday.setDate(yesterday.getDate() - 1)
      const yesterdayString = yesterday.toDateString()
      const activityDate = new Date(activity.timestamp).toDateString()
      if (yesterdayString !== activityDate) {
        return false
      }
    } else if (dateFilter === "week") {
      const weekAgo = new Date()
      weekAgo.setDate(weekAgo.getDate() - 7)
      const activityDate = new Date(activity.timestamp)
      if (activityDate < weekAgo) {
        return false
      }
    }

    return true
  })

  return (
    <Card className="border-none shadow-md">
      <CardHeader>
        <CardTitle>Activity Log</CardTitle>
        <CardDescription>Recent actions performed by administrators and users</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              type="search"
              placeholder="Search activities..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-2 w-full md:w-auto">
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
            <Select value={actionFilter} onValueChange={setActionFilter}>
              <SelectTrigger className="w-[130px]">
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="property">Properties</SelectItem>
                <SelectItem value="user">Users</SelectItem>
                <SelectItem value="booking">Bookings</SelectItem>
                <SelectItem value="message">Messages</SelectItem>
                <SelectItem value="system">System</SelectItem>
                <SelectItem value="category">Categories</SelectItem>
                <SelectItem value="marketing">Marketing</SelectItem>
              </SelectContent>
            </Select>
            <Select value={userFilter} onValueChange={setUserFilter}>
              <SelectTrigger className="w-[130px]">
                <SelectValue placeholder="Filter by user" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Users</SelectItem>
                <SelectItem value="admin">Admins</SelectItem>
                <SelectItem value="agent">Agents</SelectItem>
                <SelectItem value="user">Regular Users</SelectItem>
              </SelectContent>
            </Select>
            <Select value={dateFilter} onValueChange={setDateFilter}>
              <SelectTrigger className="w-[130px]">
                <SelectValue placeholder="Filter by date" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Time</SelectItem>
                <SelectItem value="today">Today</SelectItem>
                <SelectItem value="yesterday">Yesterday</SelectItem>
                <SelectItem value="week">This Week</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-4">
          {filteredActivities.length === 0 ? (
            <div className="text-center py-8 text-gray-500">No activities found</div>
          ) : (
            filteredActivities.map((activity) => (
              <div key={activity.id} className="flex gap-4 p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={activity.user.avatar || "/placeholder.svg"} alt={activity.user.name} />
                  <AvatarFallback>{activity.user.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{activity.user.name}</span>
                      <Badge
                        className={
                          activity.user.role === "admin"
                            ? "bg-purple-100 text-purple-800"
                            : activity.user.role === "agent"
                              ? "bg-blue-100 text-blue-800"
                              : "bg-gray-100 text-gray-800"
                        }
                      >
                        {activity.user.role.charAt(0).toUpperCase() + activity.user.role.slice(1)}
                      </Badge>
                      <Badge className={getActionColor(activity.action)}>
                        <span className="flex items-center gap-1">
                          {getActionIcon(activity.action, activity.targetType)}
                          {formatActionText(activity.action)}
                        </span>
                      </Badge>
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <Clock className="h-3.5 w-3.5 mr-1" />
                      {formatTimestamp(activity.timestamp)}
                    </div>
                  </div>
                  <p className="mt-1">
                    <span className="font-medium">{activity.target}</span> - {activity.details}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>

        {filteredActivities.length > 0 && (
          <div className="flex justify-center mt-4">
            <Button variant="outline">Load More</Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
