"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Bell, Calendar, Check, MessageSquare, User, Building2, AlertTriangle } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

// Sample notification data
const notifications = [
  {
    id: "NOTIF-001",
    type: "property_approval",
    title: "New Property Awaiting Approval",
    message: "Modern Penthouse in Victoria Island has been submitted for approval by Jane Smith",
    timestamp: "2023-07-21T09:15:00",
    read: false,
    user: {
      name: "Jane Smith",
      avatar: "/woman-portrait.png",
    },
    actionUrl: "/admin/properties/approvals",
  },
  {
    id: "NOTIF-002",
    type: "user_verification",
    title: "User Verification Request",
    message: "Emily Davis has submitted documents for verification",
    timestamp: "2023-07-20T16:45:00",
    read: false,
    user: {
      name: "Emily Davis",
      avatar: "/woman-portrait-3.png",
    },
    actionUrl: "/admin/users",
  },
  {
    id: "NOTIF-003",
    type: "booking",
    title: "New Booking Created",
    message: "Sarah Williams has booked Elegant Villa Lagos for August 1-7",
    timestamp: "2023-07-19T10:20:00",
    read: true,
    user: {
      name: "Sarah Williams",
      avatar: "/woman-portrait-2.png",
    },
    actionUrl: "/admin/bookings",
  },
  {
    id: "NOTIF-004",
    type: "message",
    title: "New Support Message",
    message: "John Doe has sent a message regarding his booking at Luxury Ocean View Apartment",
    timestamp: "2023-07-18T14:30:00",
    read: true,
    user: {
      name: "John Doe",
      avatar: "/thoughtful-man-portrait.png",
    },
    actionUrl: "/admin/messages",
  },
  {
    id: "NOTIF-005",
    type: "system",
    title: "System Update Completed",
    message: "The scheduled system maintenance has been completed successfully",
    timestamp: "2023-07-17T02:15:00",
    read: true,
    user: {
      name: "System",
      avatar: "",
    },
    actionUrl: "/admin/settings",
  },
]

export default function NotificationCenter() {
  const { toast } = useToast()
  const [activeTab, setActiveTab] = useState("all")
  const [notificationState, setNotificationState] = useState(notifications)

  const unreadCount = notificationState.filter((n) => !n.read).length

  const markAsRead = (id: string) => {
    setNotificationState(
      notificationState.map((notification) =>
        notification.id === id ? { ...notification, read: true } : notification,
      ),
    )
    toast({
      title: "Notification marked as read",
      description: "The notification has been marked as read.",
    })
  }

  const markAllAsRead = () => {
    setNotificationState(notificationState.map((notification) => ({ ...notification, read: true })))
    toast({
      title: "All notifications marked as read",
      description: "All notifications have been marked as read.",
    })
  }

  const deleteNotification = (id: string) => {
    setNotificationState(notificationState.filter((notification) => notification.id !== id))
    toast({
      title: "Notification deleted",
      description: "The notification has been deleted.",
    })
  }

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "property_approval":
        return <Building2 className="h-5 w-5 text-amber-500" />
      case "user_verification":
        return <User className="h-5 w-5 text-blue-500" />
      case "booking":
        return <Calendar className="h-5 w-5 text-green-500" />
      case "message":
        return <MessageSquare className="h-5 w-5 text-purple-500" />
      case "system":
        return <AlertTriangle className="h-5 w-5 text-red-500" />
      default:
        return <Bell className="h-5 w-5 text-gray-500" />
    }
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

  const filteredNotifications = notificationState.filter((notification) => {
    if (activeTab === "all") return true
    if (activeTab === "unread") return !notification.read
    return notification.type === activeTab
  })

  return (
    <Card className="border-none shadow-md">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div>
          <CardTitle className="text-xl">Notifications</CardTitle>
          <CardDescription>Stay updated with system activities</CardDescription>
        </div>
        {unreadCount > 0 && (
          <Button variant="outline" size="sm" onClick={markAllAsRead}>
            <Check className="mr-2 h-4 w-4" />
            Mark all as read
          </Button>
        )}
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="grid grid-cols-3 md:grid-cols-6 lg:w-[600px]">
            <TabsTrigger value="all" className="relative">
              All
              {unreadCount > 0 && (
                <Badge className="ml-1 bg-red-500 text-white absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs">
                  {unreadCount}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="unread">Unread</TabsTrigger>
            <TabsTrigger value="property_approval">Properties</TabsTrigger>
            <TabsTrigger value="user_verification">Users</TabsTrigger>
            <TabsTrigger value="booking">Bookings</TabsTrigger>
            <TabsTrigger value="message">Messages</TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab} className="space-y-4">
            {filteredNotifications.length === 0 ? (
              <div className="text-center py-8 text-gray-500">No notifications found</div>
            ) : (
              filteredNotifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`flex gap-4 p-4 border rounded-lg transition-colors ${
                    notification.read ? "bg-white" : "bg-blue-50"
                  } hover:bg-gray-50`}
                >
                  <div className={`p-2 rounded-full ${notification.read ? "bg-gray-100" : "bg-blue-100"}`}>
                    {getNotificationIcon(notification.type)}
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2">
                      <div>
                        <h4 className="font-medium">{notification.title}</h4>
                        <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
                        {notification.user.name && (
                          <div className="flex items-center gap-2 mt-2">
                            <Avatar className="h-6 w-6">
                              <AvatarImage
                                src={notification.user.avatar || "/placeholder.svg"}
                                alt={notification.user.name}
                              />
                              <AvatarFallback>
                                {notification.user.name !== "System" ? notification.user.name.charAt(0) : "S"}
                              </AvatarFallback>
                            </Avatar>
                            <span className="text-sm text-gray-500">{notification.user.name}</span>
                          </div>
                        )}
                      </div>
                      <div className="text-sm text-gray-500">{formatTimestamp(notification.timestamp)}</div>
                    </div>
                    <div className="flex justify-between items-center mt-3">
                      <Button variant="outline" size="sm" asChild>
                        <a href={notification.actionUrl}>View Details</a>
                      </Button>
                      <div className="flex gap-2">
                        {!notification.read && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => markAsRead(notification.id)}
                            className="text-blue-600"
                          >
                            Mark as read
                          </Button>
                        )}
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => deleteNotification(notification.id)}
                          className="text-red-600"
                        >
                          Delete
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
