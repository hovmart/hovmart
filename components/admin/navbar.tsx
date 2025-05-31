"use client"

import { Bell, Calendar, HelpCircle, Menu, MessageSquare, Moon, Search, Settings, Sun, User } from "lucide-react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { useState } from "react"
import { useToast } from "@/hooks/use-toast"

interface NavbarProps {
  onMenuButtonClick: () => void
}

export default function Navbar({ onMenuButtonClick }: NavbarProps) {
  const [theme, setTheme] = useState<"light" | "dark">("light")
  const [searchOpen, setSearchOpen] = useState(false)
  const { toast } = useToast()

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light")
    toast({
      title: `${theme === "light" ? "Dark" : "Light"} mode enabled`,
      description: `The dashboard theme has been changed to ${theme === "light" ? "dark" : "light"} mode.`,
    })
  }

  const notifications = [
    {
      id: 1,
      title: "New booking request",
      description: "John Doe has requested to book Luxury Ocean View Apartment",
      time: "5 minutes ago",
      read: false,
    },
    {
      id: 2,
      title: "New message received",
      description: "Jane Smith sent you a message about Modern Ikoyi Apartment",
      time: "1 hour ago",
      read: false,
    },
    {
      id: 3,
      title: "Payment received",
      description: "₦250,000 payment received for booking #BKG-001",
      time: "3 hours ago",
      read: true,
    },
    {
      id: 4,
      title: "New user registered",
      description: "Robert Johnson created a new account",
      time: "Yesterday",
      read: true,
    },
  ]

  const unreadCount = notifications.filter((n) => !n.read).length

  return (
    <header className="sticky top-0 z-30 flex items-center justify-between h-16 px-4 md:px-6 bg-white border-b shadow-sm">
      <div className="flex items-center md:hidden">
        <Button variant="ghost" size="icon" className="mr-2" onClick={onMenuButtonClick}>
          <Menu className="h-6 w-6" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </div>

      <div className="flex items-center gap-2">
        <div className="hidden md:flex">
          <Image src="/hovmart-logo.png" alt="Hovmart Logo" width={120} height={40} className="h-8 w-auto" />
        </div>
        <div className="md:hidden">
          <Image src="/hovmart-icon.png" alt="Hovmart Icon" width={32} height={32} className="h-8 w-8" />
        </div>
        <span className="text-xl font-semibold text-purple-900 hidden md:inline-block">Admin Dashboard</span>
      </div>

      <div className={`${searchOpen ? "flex" : "hidden"} md:flex items-center flex-1 px-4 md:px-6 lg:px-8`}>
        <div className="relative w-full max-w-md">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
          <input
            type="search"
            placeholder="Search for properties, users, bookings..."
            className="w-full bg-gray-100 pl-8 pr-4 py-2 text-sm rounded-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setSearchOpen(!searchOpen)}>
          <Search className="h-5 w-5" />
          <span className="sr-only">Search</span>
        </Button>

        <Button variant="ghost" size="icon" onClick={toggleTheme}>
          {theme === "light" ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
          <span className="sr-only">Toggle theme</span>
        </Button>

        <Button variant="ghost" size="icon" className="hidden md:flex">
          <Calendar className="h-5 w-5" />
          <span className="sr-only">Calendar</span>
        </Button>

        <Button variant="ghost" size="icon" className="hidden md:flex">
          <MessageSquare className="h-5 w-5" />
          <span className="sr-only">Messages</span>
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              {unreadCount > 0 && (
                <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-red-500 text-white">
                  {unreadCount}
                </Badge>
              )}
              <span className="sr-only">Notifications</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80">
            <DropdownMenuLabel className="flex items-center justify-between">
              <span>Notifications</span>
              <Button variant="ghost" size="sm" className="h-auto p-0 text-xs text-purple-600">
                Mark all as read
              </Button>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            {notifications.map((notification) => (
              <DropdownMenuItem key={notification.id} className="p-0 focus:bg-gray-100">
                <div className={`w-full p-3 ${notification.read ? "" : "bg-purple-50"}`}>
                  <div className="flex justify-between items-start">
                    <div>
                      <p className={`font-medium ${notification.read ? "" : "text-purple-900"}`}>
                        {notification.title}
                      </p>
                      <p className="text-sm text-gray-500 mt-1">{notification.description}</p>
                    </div>
                    {!notification.read && (
                      <Badge className="h-2 w-2 rounded-full bg-purple-500 flex-shrink-0 p-0 mt-1.5" />
                    )}
                  </div>
                  <p className="text-xs text-gray-400 mt-1">{notification.time}</p>
                </div>
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator />
            <DropdownMenuItem className="p-0 focus:bg-transparent">
              <Button variant="ghost" className="w-full justify-center text-purple-600">
                View all notifications
              </Button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="rounded-full">
              <Avatar className="h-8 w-8">
                <AvatarImage src="/team/isaac-chindah.jpeg" alt="Admin" />
                <AvatarFallback className="bg-purple-100 text-purple-600">IC</AvatarFallback>
              </Avatar>
              <span className="sr-only">User menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <div className="flex items-center gap-2 p-2">
              <Avatar className="h-10 w-10">
                <AvatarImage src="/team/isaac-chindah.jpeg" alt="Admin" />
                <AvatarFallback className="bg-purple-100 text-purple-600">IC</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium">Isaac Chindah</p>
                <p className="text-xs text-gray-500">admin@hovmart.com</p>
              </div>
            </div>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <User className="mr-2 h-4 w-4" />
              <span>My Profile</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Settings className="mr-2 h-4 w-4" />
              <span>Account Settings</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <HelpCircle className="mr-2 h-4 w-4" />
              <span>Help & Support</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
