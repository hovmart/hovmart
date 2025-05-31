"use client"

import { useState } from "react"
import { Archive, ChevronDown, MessageSquare, MoreHorizontal, Search, Star, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Sample message data
const messages = [
  {
    id: "MSG-001",
    sender: "John Doe",
    email: "john.doe@example.com",
    subject: "Inquiry about Luxury Ocean View Apartment",
    message:
      "Hello, I'm interested in booking the Luxury Ocean View Apartment for next month. Is it available from the 15th to the 20th? Also, do you offer any discounts for longer stays? Thank you.",
    date: "2023-07-15T10:30:00",
    read: true,
    starred: false,
    avatar: "/thoughtful-man-portrait.png",
  },
  {
    id: "MSG-002",
    sender: "Jane Smith",
    email: "jane.smith@example.com",
    subject: "Question about amenities",
    message:
      "Hi there, I was looking at the Modern Ikoyi Apartment and wanted to know if it has a gym and swimming pool. Also, is parking available? Thanks in advance!",
    date: "2023-07-14T15:45:00",
    read: false,
    starred: true,
    avatar: "/woman-portrait.png",
  },
  {
    id: "MSG-003",
    sender: "Robert Johnson",
    email: "robert.johnson@example.com",
    subject: "Booking confirmation",
    message:
      "I just made a booking for the Elegant Villa Lagos from August 1-7. Could you please confirm that my booking was received and processed? I'm looking forward to my stay!",
    date: "2023-07-13T09:15:00",
    read: false,
    starred: false,
    avatar: "/man-portrait-3.png",
  },
  {
    id: "MSG-004",
    sender: "Emily Davis",
    email: "emily.davis@example.com",
    subject: "Cancellation policy",
    message:
      "Hello, I'm considering booking the Lagos Beachfront Luxury Home but I'm not 100% sure about my travel dates yet. Could you please explain your cancellation policy? What happens if I need to change my dates or cancel altogether?",
    date: "2023-07-12T14:20:00",
    read: true,
    starred: false,
    avatar: "/woman-portrait-2.png",
  },
  {
    id: "MSG-005",
    sender: "Michael Wilson",
    email: "michael.wilson@example.com",
    subject: "Special requirements",
    message:
      "I'm planning to book the Ikeja Serviced Apartment and I have some special requirements. I need a ground floor unit due to mobility issues, and I'll be bringing my service dog. Are these accommodations possible?",
    date: "2023-07-11T11:05:00",
    read: true,
    starred: true,
    avatar: "",
  },
  {
    id: "MSG-006",
    sender: "Sarah Brown",
    email: "sarah.brown@example.com",
    subject: "Payment issue",
    message:
      "I tried to make a payment for my booking at Lagos Penthouse View but my card was declined. I've checked with my bank and everything seems fine on their end. Could you help me resolve this issue?",
    date: "2023-07-10T16:30:00",
    read: false,
    starred: false,
    avatar: "/woman-portrait-3.png",
  },
  {
    id: "MSG-007",
    sender: "David Miller",
    email: "david.miller@example.com",
    subject: "Feedback on my stay",
    message:
      "I recently stayed at the Cozy Yaba Studio and wanted to provide some feedback. Overall, I had a wonderful experience! The location was perfect and the amenities were great. However, I did notice that the air conditioning wasn't working properly. Just wanted to let you know for future guests.",
    date: "2023-07-09T13:45:00",
    read: true,
    starred: false,
    avatar: "",
  },
]

export default function MessagesManagement() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedMessage, setSelectedMessage] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState("inbox")

  const filteredMessages = messages.filter(
    (message) =>
      message.sender.toLowerCase().includes(searchTerm.toLowerCase()) ||
      message.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      message.message.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const selectedMessageData = messages.find((message) => message.id === selectedMessage)

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Messages</h1>
          <p className="text-gray-500">Manage all your customer inquiries and messages</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2">
          <Button className="bg-purple-600 hover:bg-purple-700">
            <MessageSquare className="h-4 w-4 mr-2" />
            Compose
          </Button>
        </div>
      </div>

      <Card className="overflow-hidden">
        <CardHeader className="pb-3">
          <CardTitle>Message Center</CardTitle>
          <CardDescription>View and respond to all your customer messages</CardDescription>
        </CardHeader>
        <div className="flex flex-col md:flex-row h-[600px]">
          {/* Sidebar */}
          <div className="w-full md:w-1/3 lg:w-1/4 border-r">
            <div className="p-4 border-b">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                <input
                  type="search"
                  placeholder="Search messages..."
                  className="w-full bg-white pl-8 pr-4 py-2 text-sm rounded-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            <Tabs defaultValue="inbox" value={activeTab} onValueChange={setActiveTab} className="w-full">
              <div className="px-4 py-2 border-b">
                <TabsList className="grid grid-cols-3 w-full">
                  <TabsTrigger value="inbox">Inbox</TabsTrigger>
                  <TabsTrigger value="starred">Starred</TabsTrigger>
                  <TabsTrigger value="sent">Sent</TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value="inbox" className="m-0">
                <div className="overflow-y-auto h-[500px]">
                  {filteredMessages.length === 0 ? (
                    <div className="flex items-center justify-center h-full text-gray-500">No messages found</div>
                  ) : (
                    filteredMessages.map((message) => (
                      <div
                        key={message.id}
                        className={`p-3 border-b cursor-pointer hover:bg-gray-50 ${
                          selectedMessage === message.id ? "bg-purple-50" : ""
                        } ${!message.read ? "bg-blue-50" : ""}`}
                        onClick={() => setSelectedMessage(message.id)}
                      >
                        <div className="flex items-center gap-3">
                          <Avatar className="h-8 w-8">
                            {message.avatar ? (
                              <AvatarImage src={message.avatar || "/placeholder.svg"} alt={message.sender} />
                            ) : null}
                            <AvatarFallback className="bg-purple-100 text-purple-600">
                              {message.sender
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1 min-w-0">
                            <div className="flex justify-between items-center">
                              <p className={`font-medium truncate ${!message.read ? "font-semibold" : ""}`}>
                                {message.sender}
                              </p>
                              <p className="text-xs text-gray-500">{formatDate(message.date)}</p>
                            </div>
                            <p className="text-sm font-medium truncate">{message.subject}</p>
                            <p className="text-xs text-gray-500 truncate">{message.message}</p>
                          </div>
                          {message.starred && <Star className="h-4 w-4 text-amber-500 flex-shrink-0" />}
                          {!message.read && <Badge className="h-2 w-2 rounded-full bg-blue-500 flex-shrink-0 p-0" />}
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </TabsContent>

              <TabsContent value="starred" className="m-0">
                <div className="overflow-y-auto h-[500px]">
                  {filteredMessages.filter((m) => m.starred).length === 0 ? (
                    <div className="flex items-center justify-center h-full text-gray-500">No starred messages</div>
                  ) : (
                    filteredMessages
                      .filter((m) => m.starred)
                      .map((message) => (
                        <div
                          key={message.id}
                          className={`p-3 border-b cursor-pointer hover:bg-gray-50 ${
                            selectedMessage === message.id ? "bg-purple-50" : ""
                          } ${!message.read ? "bg-blue-50" : ""}`}
                          onClick={() => setSelectedMessage(message.id)}
                        >
                          <div className="flex items-center gap-3">
                            <Avatar className="h-8 w-8">
                              {message.avatar ? (
                                <AvatarImage src={message.avatar || "/placeholder.svg"} alt={message.sender} />
                              ) : null}
                              <AvatarFallback className="bg-purple-100 text-purple-600">
                                {message.sender
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <div className="flex-1 min-w-0">
                              <div className="flex justify-between items-center">
                                <p className={`font-medium truncate ${!message.read ? "font-semibold" : ""}`}>
                                  {message.sender}
                                </p>
                                <p className="text-xs text-gray-500">{formatDate(message.date)}</p>
                              </div>
                              <p className="text-sm font-medium truncate">{message.subject}</p>
                              <p className="text-xs text-gray-500 truncate">{message.message}</p>
                            </div>
                            <Star className="h-4 w-4 text-amber-500 flex-shrink-0" />
                          </div>
                        </div>
                      ))
                  )}
                </div>
              </TabsContent>

              <TabsContent value="sent" className="m-0">
                <div className="flex items-center justify-center h-[500px] text-gray-500">
                  No sent messages to display
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Message Content */}
          <div className="w-full md:w-2/3 lg:w-3/4 flex flex-col">
            {selectedMessageData ? (
              <>
                <div className="p-4 border-b flex justify-between items-center">
                  <h2 className="text-xl font-semibold">{selectedMessageData.subject}</h2>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon">
                      <Star
                        className={`h-5 w-5 ${selectedMessageData.starred ? "text-amber-500 fill-amber-500" : "text-gray-500"}`}
                      />
                    </Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-5 w-5" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Archive className="h-4 w-4 mr-2" />
                          Archive
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Trash2 className="h-4 w-4 mr-2" />
                          Delete
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                          <Star className="h-4 w-4 mr-2" />
                          {selectedMessageData.starred ? "Remove Star" : "Add Star"}
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>

                <div className="p-4 border-b">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10">
                      {selectedMessageData.avatar ? (
                        <AvatarImage
                          src={selectedMessageData.avatar || "/placeholder.svg"}
                          alt={selectedMessageData.sender}
                        />
                      ) : null}
                      <AvatarFallback className="bg-purple-100 text-purple-600">
                        {selectedMessageData.sender
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="font-semibold">{selectedMessageData.sender}</p>
                        <span className="text-sm text-gray-500">&lt;{selectedMessageData.email}&gt;</span>
                      </div>
                      <p className="text-sm text-gray-500">{formatDate(selectedMessageData.date)}</p>
                    </div>
                  </div>
                </div>

                <div className="p-4 flex-1 overflow-y-auto">
                  <p className="whitespace-pre-line">{selectedMessageData.message}</p>
                </div>

                <div className="p-4 border-t">
                  <div className="border rounded-lg p-3">
                    <div className="flex items-center gap-2 mb-2">
                      <Button variant="ghost" size="sm">
                        <ChevronDown className="h-4 w-4 mr-1" />
                        To
                      </Button>
                      <div className="flex-1">
                        <input
                          type="text"
                          value={selectedMessageData.email}
                          className="w-full border-none focus:outline-none focus:ring-0 p-0 text-sm"
                          readOnly
                        />
                      </div>
                    </div>
                    <textarea
                      placeholder="Type your reply here..."
                      className="w-full border-none focus:outline-none focus:ring-0 resize-none text-sm min-h-[100px]"
                    ></textarea>
                    <div className="flex justify-between items-center pt-2 border-t">
                      <div>
                        <Button variant="ghost" size="sm">
                          Discard
                        </Button>
                      </div>
                      <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
                        Send Reply
                      </Button>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex items-center justify-center h-full text-gray-500">
                <div className="text-center">
                  <MessageSquare className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                  <h3 className="text-lg font-medium mb-1">No message selected</h3>
                  <p>Select a message from the list to view its contents</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </Card>
    </div>
  )
}
