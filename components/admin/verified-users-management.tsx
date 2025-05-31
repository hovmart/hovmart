"use client"

import { useState } from "react"
import { BadgeCheck, Check, Edit, Filter, Mail, MoreHorizontal, Search, User, XCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

// Sample verified user data
const verifiedUsers = [
  {
    id: "USR-001",
    name: "John Doe",
    email: "john.doe@example.com",
    role: "user",
    status: "active",
    verificationDate: "2023-04-10",
    bookings: 5,
    properties: 0,
    spent: 1250000,
    joined: "2023-03-15",
    lastActive: "2023-07-20",
    avatar: "/thoughtful-man-portrait.png",
    phone: "+234 801 234 5678",
    address: "15 Marina Street, Lagos Island, Lagos",
    idVerified: true,
    emailVerified: true,
    phoneVerified: true,
    verifiedBy: "Admin",
    verificationMethod: "ID Verification",
    verificationNotes: "Government ID and utility bill verified",
  },
  {
    id: "USR-002",
    name: "Jane Smith",
    email: "jane.smith@example.com",
    role: "agent",
    status: "active",
    verificationDate: "2023-05-15",
    bookings: 3,
    properties: 2,
    spent: 900000,
    joined: "2023-04-10",
    lastActive: "2023-07-18",
    avatar: "/woman-portrait.png",
    phone: "+234 802 345 6789",
    address: "25 Admiralty Way, Lekki Phase 1, Lagos",
    idVerified: true,
    emailVerified: true,
    phoneVerified: true,
    verifiedBy: "Admin",
    verificationMethod: "Business Registration",
    verificationNotes: "Business registration documents verified",
  },
  {
    id: "USR-003",
    name: "Robert Johnson",
    email: "robert.johnson@example.com",
    role: "agent",
    status: "active",
    verificationDate: "2023-03-20",
    bookings: 4,
    properties: 3,
    spent: 1100000,
    joined: "2023-02-20",
    lastActive: "2023-07-19",
    avatar: "/man-portrait-3.png",
    phone: "+234 803 456 7890",
    address: "10 Bourdillon Road, Ikoyi, Lagos",
    idVerified: true,
    emailVerified: true,
    phoneVerified: true,
    verifiedBy: "System",
    verificationMethod: "ID Verification",
    verificationNotes: "Passport and phone number verified",
  },
  {
    id: "USR-005",
    name: "Michael Brown",
    email: "michael.brown@example.com",
    role: "admin",
    status: "active",
    verificationDate: "2023-01-15",
    bookings: 0,
    properties: 0,
    spent: 0,
    joined: "2023-01-10",
    lastActive: "2023-07-21",
    avatar: "/thoughtful-man-portrait.png",
    phone: "+234 805 678 9012",
    address: "20 Adeola Odeku Street, Victoria Island, Lagos",
    idVerified: true,
    emailVerified: true,
    phoneVerified: true,
    verifiedBy: "System",
    verificationMethod: "Admin Verification",
    verificationNotes: "Verified as admin",
  },
  {
    id: "USR-007",
    name: "David Wilson",
    email: "david.wilson@example.com",
    role: "user",
    status: "active",
    verificationDate: "2023-04-05",
    bookings: 6,
    properties: 0,
    spent: 1500000,
    joined: "2023-03-25",
    lastActive: "2023-07-17",
    avatar: "/man-portrait-3.png",
    phone: "+234 807 890 1234",
    address: "15 Kofo Abayomi Street, Victoria Island, Lagos",
    idVerified: true,
    emailVerified: true,
    phoneVerified: true,
    verifiedBy: "Admin",
    verificationMethod: "ID Verification",
    verificationNotes: "Driver's license and utility bill verified",
  },
]

export default function VerifiedUsersManagement() {
  const { toast } = useToast()
  const [selectedUsers, setSelectedUsers] = useState<string[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [roleFilter, setRoleFilter] = useState<string>("all")
  const [sortBy, setSortBy] = useState<string>("newest")
  const [isUserDetailsDialogOpen, setIsUserDetailsDialogOpen] = useState(false)
  const [selectedUserId, setSelectedUserId] = useState<string>("")

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedUsers(verifiedUsers.map((user) => user.id))
    } else {
      setSelectedUsers([])
    }
  }

  const handleSelectUser = (userId: string, checked: boolean) => {
    if (checked) {
      setSelectedUsers([...selectedUsers, userId])
    } else {
      setSelectedUsers(selectedUsers.filter((id) => id !== userId))
    }
  }

  const handleUnverifyUser = (userId: string) => {
    toast({
      title: "User verification removed",
      description: `Verification status has been removed from user ${userId}.`,
    })
  }

  const openUserDetailsDialog = (userId: string) => {
    setSelectedUserId(userId)
    setIsUserDetailsDialogOpen(true)
  }

  const filteredUsers = verifiedUsers
    .filter((user) => {
      // Apply search filter
      if (
        searchQuery &&
        !user.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !user.email.toLowerCase().includes(searchQuery.toLowerCase())
      ) {
        return false
      }

      // Apply role filter
      if (roleFilter !== "all" && user.role !== roleFilter) {
        return false
      }

      return true
    })
    .sort((a, b) => {
      // Apply sorting
      switch (sortBy) {
        case "newest":
          return new Date(b.verificationDate).getTime() - new Date(a.verificationDate).getTime()
        case "oldest":
          return new Date(a.verificationDate).getTime() - new Date(b.verificationDate).getTime()
        case "name-asc":
          return a.name.localeCompare(b.name)
        case "name-desc":
          return b.name.localeCompare(a.name)
        default:
          return 0
      }
    })

  const selectedUser = verifiedUsers.find((user) => user.id === selectedUserId)

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Verified Users</h1>
          <p className="text-gray-500">Manage all verified users on the platform</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <Mail className="mr-2 h-4 w-4" />
            Email Verified Users
          </Button>
          <Button variant="outline">
            <BadgeCheck className="mr-2 h-4 w-4 text-blue-500" />
            Verification Report
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
                  placeholder="Search verified users..."
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
                  <DropdownMenuLabel>Filter Users</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <div className="p-2">
                    <p className="text-sm font-medium mb-1">Role</p>
                    <Select value={roleFilter} onValueChange={setRoleFilter}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Roles</SelectItem>
                        <SelectItem value="user">User</SelectItem>
                        <SelectItem value="agent">Agent</SelectItem>
                        <SelectItem value="admin">Admin</SelectItem>
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
                        <SelectItem value="newest">Newest Verification</SelectItem>
                        <SelectItem value="oldest">Oldest Verification</SelectItem>
                        <SelectItem value="name-asc">Name: A to Z</SelectItem>
                        <SelectItem value="name-desc">Name: Z to A</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <div className="flex items-center gap-2">
              {selectedUsers.length > 0 && (
                <>
                  <span className="text-sm text-gray-500">{selectedUsers.length} selected</span>
                  <Button variant="outline" size="sm">
                    <Mail className="mr-2 h-4 w-4" />
                    Email
                  </Button>
                  <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                    <XCircle className="mr-2 h-4 w-4" />
                    Unverify
                  </Button>
                </>
              )}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12">
                    <Checkbox
                      checked={selectedUsers.length === verifiedUsers.length}
                      onCheckedChange={handleSelectAll}
                    />
                  </TableHead>
                  <TableHead className="w-[250px]">User</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Verification Date</TableHead>
                  <TableHead>Verified By</TableHead>
                  <TableHead>Method</TableHead>
                  <TableHead>ID Verified</TableHead>
                  <TableHead>Email Verified</TableHead>
                  <TableHead>Phone Verified</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>
                      <Checkbox
                        checked={selectedUsers.includes(user.id)}
                        onCheckedChange={(checked) => handleSelectUser(user.id, !!checked)}
                      />
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="relative">
                          <Avatar className="h-9 w-9">
                            <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                            <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div className="absolute -bottom-1 -right-1 bg-white rounded-full">
                            <BadgeCheck className="h-4 w-4 text-blue-500" />
                          </div>
                        </div>
                        <div>
                          <p className="font-medium">{user.name}</p>
                          <p className="text-xs text-gray-500">{user.email}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge
                        className={
                          user.role === "admin"
                            ? "bg-purple-100 text-purple-800"
                            : user.role === "agent"
                              ? "bg-blue-100 text-blue-800"
                              : "bg-gray-100 text-gray-800"
                        }
                      >
                        {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                      </Badge>
                    </TableCell>
                    <TableCell>{user.verificationDate}</TableCell>
                    <TableCell>{user.verifiedBy}</TableCell>
                    <TableCell>{user.verificationMethod}</TableCell>
                    <TableCell>
                      {user.idVerified ? (
                        <Check className="h-4 w-4 text-green-500" />
                      ) : (
                        <XCircle className="h-4 w-4 text-red-500" />
                      )}
                    </TableCell>
                    <TableCell>
                      {user.emailVerified ? (
                        <Check className="h-4 w-4 text-green-500" />
                      ) : (
                        <XCircle className="h-4 w-4 text-red-500" />
                      )}
                    </TableCell>
                    <TableCell>
                      {user.phoneVerified ? (
                        <Check className="h-4 w-4 text-green-500" />
                      ) : (
                        <XCircle className="h-4 w-4 text-red-500" />
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => openUserDetailsDialog(user.id)}>
                            <User className="mr-2 h-4 w-4" />
                            View Profile
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit Verification
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-red-600" onClick={() => handleUnverifyUser(user.id)}>
                            <XCircle className="mr-2 h-4 w-4" />
                            Remove Verification
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
        <CardFooter className="flex items-center justify-between">
          <div className="text-sm text-gray-500">
            Showing {filteredUsers.length} of {verifiedUsers.length} verified users
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" disabled>
              Previous
            </Button>
            <Button variant="outline" size="sm" className="bg-gray-100">
              1
            </Button>
            <Button variant="outline" size="sm">
              Next
            </Button>
          </div>
        </CardFooter>
      </Card>

      {/* User Details Dialog */}
      <Dialog open={isUserDetailsDialogOpen} onOpenChange={setIsUserDetailsDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Verified User Details</DialogTitle>
            <DialogDescription>Detailed information about the verified user.</DialogDescription>
          </DialogHeader>
          {selectedUser && (
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <Avatar className="h-16 w-16">
                    <AvatarImage src={selectedUser.avatar || "/placeholder.svg"} alt={selectedUser.name} />
                    <AvatarFallback>{selectedUser.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="absolute -bottom-1 -right-1 bg-white rounded-full">
                    <BadgeCheck className="h-5 w-5 text-blue-500" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold">{selectedUser.name}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge
                      className={
                        selectedUser.role === "admin"
                          ? "bg-purple-100 text-purple-800"
                          : selectedUser.role === "agent"
                            ? "bg-blue-100 text-blue-800"
                            : "bg-gray-100 text-gray-800"
                      }
                    >
                      {selectedUser.role.charAt(0).toUpperCase() + selectedUser.role.slice(1)}
                    </Badge>
                    <Badge className="bg-blue-100 text-blue-800">Verified</Badge>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="font-medium">{selectedUser.email}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-gray-500">Phone</p>
                  <p className="font-medium">{selectedUser.phone}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-gray-500">Joined</p>
                  <p className="font-medium">{selectedUser.joined}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-gray-500">Last Active</p>
                  <p className="font-medium">{selectedUser.lastActive}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-gray-500">Address</p>
                  <p className="font-medium">{selectedUser.address}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-gray-500">Verification Date</p>
                  <p className="font-medium">{selectedUser.verificationDate}</p>
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="font-medium">Verification Details</h4>
                <div className="grid grid-cols-3 gap-4">
                  <div className="flex flex-col items-center p-3 border rounded-md">
                    <div className="mb-2">
                      {selectedUser.idVerified ? (
                        <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center">
                          <Check className="h-5 w-5 text-green-600" />
                        </div>
                      ) : (
                        <div className="h-8 w-8 rounded-full bg-red-100 flex items-center justify-center">
                          <XCircle className="h-5 w-5 text-red-600" />
                        </div>
                      )}
                    </div>
                    <p className="text-sm font-medium">ID Verification</p>
                    <p className="text-xs text-gray-500">{selectedUser.idVerified ? "Verified" : "Not Verified"}</p>
                  </div>
                  <div className="flex flex-col items-center p-3 border rounded-md">
                    <div className="mb-2">
                      {selectedUser.emailVerified ? (
                        <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center">
                          <Check className="h-5 w-5 text-green-600" />
                        </div>
                      ) : (
                        <div className="h-8 w-8 rounded-full bg-red-100 flex items-center justify-center">
                          <XCircle className="h-5 w-5 text-red-600" />
                        </div>
                      )}
                    </div>
                    <p className="text-sm font-medium">Email Verification</p>
                    <p className="text-xs text-gray-500">{selectedUser.emailVerified ? "Verified" : "Not Verified"}</p>
                  </div>
                  <div className="flex flex-col items-center p-3 border rounded-md">
                    <div className="mb-2">
                      {selectedUser.phoneVerified ? (
                        <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center">
                          <Check className="h-5 w-5 text-green-600" />
                        </div>
                      ) : (
                        <div className="h-8 w-8 rounded-full bg-red-100 flex items-center justify-center">
                          <XCircle className="h-5 w-5 text-red-600" />
                        </div>
                      )}
                    </div>
                    <p className="text-sm font-medium">Phone Verification</p>
                    <p className="text-xs text-gray-500">{selectedUser.phoneVerified ? "Verified" : "Not Verified"}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="font-medium">Verification Method</h4>
                <div className="p-3 border rounded-md">
                  <div className="flex justify-between items-center mb-2">
                    <p className="font-medium">{selectedUser.verificationMethod}</p>
                    <Badge className="bg-green-100 text-green-800">Verified by {selectedUser.verifiedBy}</Badge>
                  </div>
                  <p className="text-sm text-gray-700">{selectedUser.verificationNotes}</p>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="p-3 border rounded-md text-center">
                  <p className="text-2xl font-bold">{selectedUser.properties}</p>
                  <p className="text-sm text-gray-500">Properties</p>
                </div>
                <div className="p-3 border rounded-md text-center">
                  <p className="text-2xl font-bold">{selectedUser.bookings}</p>
                  <p className="text-sm text-gray-500">Bookings</p>
                </div>
                <div className="p-3 border rounded-md text-center">
                  <p className="text-2xl font-bold">₦{selectedUser.spent.toLocaleString()}</p>
                  <p className="text-sm text-gray-500">Total Spent</p>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsUserDetailsDialogOpen(false)}>
              Close
            </Button>
            <Button
              variant="destructive"
              onClick={() => {
                handleUnverifyUser(selectedUserId)
                setIsUserDetailsDialogOpen(false)
              }}
            >
              <XCircle className="mr-2 h-4 w-4" />
              Remove Verification
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
