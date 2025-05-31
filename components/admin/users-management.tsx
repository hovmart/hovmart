"use client"

import { useState } from "react"
import {
  BadgeCheck,
  Check,
  Edit,
  Filter,
  Lock,
  Mail,
  MoreHorizontal,
  Search,
  Shield,
  Trash2,
  User,
  UserPlus,
  Users,
  XCircle,
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"

// Sample user data
const users = [
  {
    id: "USR-001",
    name: "John Doe",
    email: "john.doe@example.com",
    role: "user",
    status: "active",
    verified: true,
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
  },
  {
    id: "USR-002",
    name: "Jane Smith",
    email: "jane.smith@example.com",
    role: "agent",
    status: "active",
    verified: true,
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
  },
  {
    id: "USR-003",
    name: "Robert Johnson",
    email: "robert.johnson@example.com",
    role: "agent",
    status: "active",
    verified: true,
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
  },
  {
    id: "USR-004",
    name: "Sarah Williams",
    email: "sarah.williams@example.com",
    role: "user",
    status: "inactive",
    verified: false,
    verificationDate: null,
    bookings: 2,
    properties: 0,
    spent: 450000,
    joined: "2023-05-05",
    lastActive: "2023-06-15",
    avatar: "/woman-portrait-2.png",
    phone: "+234 804 567 8901",
    address: "5 Allen Avenue, Ikeja, Lagos",
    idVerified: false,
    emailVerified: true,
    phoneVerified: false,
  },
  {
    id: "USR-005",
    name: "Michael Brown",
    email: "michael.brown@example.com",
    role: "admin",
    status: "active",
    verified: true,
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
  },
  {
    id: "USR-006",
    name: "Emily Davis",
    email: "emily.davis@example.com",
    role: "agent",
    status: "pending",
    verified: false,
    verificationDate: null,
    bookings: 0,
    properties: 1,
    spent: 0,
    joined: "2023-07-01",
    lastActive: "2023-07-15",
    avatar: "/woman-portrait-3.png",
    phone: "+234 806 789 0123",
    address: "30 Awolowo Road, Ikoyi, Lagos",
    idVerified: false,
    emailVerified: true,
    phoneVerified: true,
  },
  {
    id: "USR-007",
    name: "David Wilson",
    email: "david.wilson@example.com",
    role: "user",
    status: "active",
    verified: true,
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
  },
  {
    id: "USR-008",
    name: "Lisa Johnson",
    email: "lisa.johnson@example.com",
    role: "user",
    status: "active",
    verified: false,
    verificationDate: null,
    bookings: 1,
    properties: 0,
    spent: 200000,
    joined: "2023-06-10",
    lastActive: "2023-07-10",
    avatar: "/woman-portrait.png",
    phone: "+234 808 901 2345",
    address: "8 Bode Thomas Street, Surulere, Lagos",
    idVerified: false,
    emailVerified: true,
    phoneVerified: false,
  },
  {
    id: "USR-009",
    name: "James Anderson",
    email: "james.anderson@example.com",
    role: "user",
    status: "active",
    verified: false,
    verificationDate: null,
    bookings: 2,
    properties: 0,
    spent: 350000,
    joined: "2023-05-20",
    lastActive: "2023-07-05",
    avatar: "/man-portrait-3.png",
    phone: "+234 809 012 3456",
    address: "12 Admiralty Way, Lekki Phase 1, Lagos",
    idVerified: false,
    emailVerified: true,
    phoneVerified: true,
  },
  {
    id: "USR-010",
    name: "Olivia Taylor",
    email: "olivia.taylor@example.com",
    role: "agent",
    status: "pending",
    verified: false,
    verificationDate: null,
    bookings: 0,
    properties: 2,
    spent: 0,
    joined: "2023-07-05",
    lastActive: "2023-07-18",
    avatar: "/woman-portrait-2.png",
    phone: "+234 810 123 4567",
    address: "22 Glover Road, Ikoyi, Lagos",
    idVerified: false,
    emailVerified: true,
    phoneVerified: false,
  },
]

export default function UsersManagement() {
  const { toast } = useToast()
  const [selectedUsers, setSelectedUsers] = useState<string[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [roleFilter, setRoleFilter] = useState<string>("all")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [verificationFilter, setVerificationFilter] = useState<string>("all")
  const [sortBy, setSortBy] = useState<string>("newest")
  const [isVerifyDialogOpen, setIsVerifyDialogOpen] = useState(false)
  const [isUserDetailsDialogOpen, setIsUserDetailsDialogOpen] = useState(false)
  const [selectedUserId, setSelectedUserId] = useState<string>("")
  const [verificationNotes, setVerificationNotes] = useState("")

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedUsers(users.map((user) => user.id))
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

  const handleDeleteUser = (userId: string) => {
    toast({
      title: "User deleted",
      description: `User ${userId} has been deleted.`,
    })
  }

  const handleVerifyUser = (userId: string, notes: string) => {
    toast({
      title: "User verified",
      description: `User ${userId} has been verified.`,
    })
    setVerificationNotes("")
    setIsVerifyDialogOpen(false)
  }

  const handleUnverifyUser = (userId: string) => {
    toast({
      title: "User verification removed",
      description: `Verification status has been removed from user ${userId}.`,
    })
  }

  const handleChangeRole = (userId: string, role: string) => {
    toast({
      title: "Role updated",
      description: `User ${userId} role has been updated to ${role}.`,
    })
  }

  const openVerifyDialog = (userId: string) => {
    setSelectedUserId(userId)
    setIsVerifyDialogOpen(true)
  }

  const openUserDetailsDialog = (userId: string) => {
    setSelectedUserId(userId)
    setIsUserDetailsDialogOpen(true)
  }

  const filteredUsers = users
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

      // Apply status filter
      if (statusFilter !== "all" && user.status !== statusFilter) {
        return false
      }

      // Apply verification filter
      if (verificationFilter === "verified" && !user.verified) {
        return false
      }
      if (verificationFilter === "unverified" && user.verified) {
        return false
      }

      return true
    })
    .sort((a, b) => {
      // Apply sorting
      switch (sortBy) {
        case "newest":
          return new Date(b.joined).getTime() - new Date(a.joined).getTime()
        case "oldest":
          return new Date(a.joined).getTime() - new Date(b.joined).getTime()
        case "name-asc":
          return a.name.localeCompare(b.name)
        case "name-desc":
          return b.name.localeCompare(a.name)
        case "bookings":
          return b.bookings - a.bookings
        case "spent":
          return b.spent - a.spent
        default:
          return 0
      }
    })

  const selectedUser = users.find((user) => user.id === selectedUserId)

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Users</h1>
          <p className="text-gray-500">Manage all your users and agents</p>
        </div>
        <div className="flex items-center gap-2">
          <Button className="bg-purple-600 hover:bg-purple-700">
            <UserPlus className="mr-2 h-4 w-4" />
            Add User
          </Button>
          <Button variant="outline">
            <Mail className="mr-2 h-4 w-4" />
            Email Users
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
                  placeholder="Search users..."
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
                    <p className="text-sm font-medium mb-1">Status</p>
                    <Select value={statusFilter} onValueChange={setStatusFilter}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Statuses</SelectItem>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="inactive">Inactive</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="p-2">
                    <p className="text-sm font-medium mb-1">Verification</p>
                    <Select value={verificationFilter} onValueChange={setVerificationFilter}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select verification status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Users</SelectItem>
                        <SelectItem value="verified">Verified Only</SelectItem>
                        <SelectItem value="unverified">Unverified Only</SelectItem>
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
                        <SelectItem value="name-asc">Name: A to Z</SelectItem>
                        <SelectItem value="name-desc">Name: Z to A</SelectItem>
                        <SelectItem value="bookings">Most Bookings</SelectItem>
                        <SelectItem value="spent">Highest Spent</SelectItem>
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
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete
                  </Button>
                </>
              )}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all" className="space-y-4">
            <TabsList>
              <TabsTrigger value="all">All Users</TabsTrigger>
              <TabsTrigger value="verified">
                Verified Users
                <Badge className="ml-2 bg-green-100 text-green-800">
                  {users.filter((user) => user.verified).length}
                </Badge>
              </TabsTrigger>
              <TabsTrigger value="unverified">
                Unverified Users
                <Badge className="ml-2 bg-amber-100 text-amber-800">
                  {users.filter((user) => !user.verified).length}
                </Badge>
              </TabsTrigger>
              <TabsTrigger value="agents">Agents</TabsTrigger>
              <TabsTrigger value="admins">Admins</TabsTrigger>
            </TabsList>
            <TabsContent value="all" className="space-y-4">
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-12">
                        <Checkbox checked={selectedUsers.length === users.length} onCheckedChange={handleSelectAll} />
                      </TableHead>
                      <TableHead className="w-[250px]">User</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Verification</TableHead>
                      <TableHead>Bookings</TableHead>
                      <TableHead>Properties</TableHead>
                      <TableHead>Spent</TableHead>
                      <TableHead>Joined</TableHead>
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
                              {user.verified && (
                                <div className="absolute -bottom-1 -right-1 bg-white rounded-full">
                                  <BadgeCheck className="h-4 w-4 text-blue-500" />
                                </div>
                              )}
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
                        <TableCell>
                          <Badge
                            className={
                              user.status === "active"
                                ? "bg-green-100 text-green-800"
                                : user.status === "pending"
                                  ? "bg-amber-100 text-amber-800"
                                  : "bg-gray-100 text-gray-800"
                            }
                          >
                            {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          {user.verified ? (
                            <div className="flex items-center gap-1 text-green-600">
                              <BadgeCheck className="h-4 w-4" />
                              <span className="text-xs">Verified</span>
                            </div>
                          ) : (
                            <div className="flex items-center gap-1 text-amber-600">
                              <XCircle className="h-4 w-4" />
                              <span className="text-xs">Unverified</span>
                            </div>
                          )}
                        </TableCell>
                        <TableCell>{user.bookings}</TableCell>
                        <TableCell>{user.properties}</TableCell>
                        <TableCell>₦{user.spent.toLocaleString()}</TableCell>
                        <TableCell>{new Date(user.joined).toLocaleDateString()}</TableCell>
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
                                Edit User
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Mail className="mr-2 h-4 w-4" />
                                Send Email
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuLabel>Change Role</DropdownMenuLabel>
                              <DropdownMenuItem onClick={() => handleChangeRole(user.id, "user")}>
                                <User className="mr-2 h-4 w-4" />
                                User
                                {user.role === "user" && <Check className="ml-auto h-4 w-4" />}
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleChangeRole(user.id, "agent")}>
                                <Users className="mr-2 h-4 w-4" />
                                Agent
                                {user.role === "agent" && <Check className="ml-auto h-4 w-4" />}
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleChangeRole(user.id, "admin")}>
                                <Shield className="mr-2 h-4 w-4" />
                                Admin
                                {user.role === "admin" && <Check className="ml-auto h-4 w-4" />}
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              {!user.verified ? (
                                <DropdownMenuItem onClick={() => openVerifyDialog(user.id)}>
                                  <BadgeCheck className="mr-2 h-4 w-4 text-blue-500" />
                                  Verify User
                                </DropdownMenuItem>
                              ) : (
                                <DropdownMenuItem onClick={() => handleUnverifyUser(user.id)}>
                                  <XCircle className="mr-2 h-4 w-4 text-red-500" />
                                  Remove Verification
                                </DropdownMenuItem>
                              )}
                              <DropdownMenuItem>
                                <Lock className="mr-2 h-4 w-4" />
                                Reset Password
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem className="text-red-600" onClick={() => handleDeleteUser(user.id)}>
                                <Trash2 className="mr-2 h-4 w-4" />
                                Delete User
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
            <TabsContent value="verified">
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-12">
                        <Checkbox
                          checked={selectedUsers.length === users.filter((user) => user.verified).length}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setSelectedUsers(users.filter((user) => user.verified).map((user) => user.id))
                            } else {
                              setSelectedUsers([])
                            }
                          }}
                        />
                      </TableHead>
                      <TableHead className="w-[250px]">User</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Verification Date</TableHead>
                      <TableHead>ID Verified</TableHead>
                      <TableHead>Email Verified</TableHead>
                      <TableHead>Phone Verified</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredUsers
                      .filter((user) => user.verified)
                      .map((user) => (
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
                          <TableCell>
                            <Badge
                              className={
                                user.status === "active"
                                  ? "bg-green-100 text-green-800"
                                  : user.status === "pending"
                                    ? "bg-amber-100 text-amber-800"
                                    : "bg-gray-100 text-gray-800"
                              }
                            >
                              {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                            </Badge>
                          </TableCell>
                          <TableCell>{user.verificationDate}</TableCell>
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
                            <Button variant="ghost" size="sm" onClick={() => openUserDetailsDialog(user.id)}>
                              View Details
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
            <TabsContent value="unverified">
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-12">
                        <Checkbox
                          checked={selectedUsers.length === users.filter((user) => !user.verified).length}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setSelectedUsers(users.filter((user) => !user.verified).map((user) => user.id))
                            } else {
                              setSelectedUsers([])
                            }
                          }}
                        />
                      </TableHead>
                      <TableHead className="w-[250px]">User</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Email Verified</TableHead>
                      <TableHead>Phone Verified</TableHead>
                      <TableHead>Joined</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredUsers
                      .filter((user) => !user.verified)
                      .map((user) => (
                        <TableRow key={user.id}>
                          <TableCell>
                            <Checkbox
                              checked={selectedUsers.includes(user.id)}
                              onCheckedChange={(checked) => handleSelectUser(user.id, !!checked)}
                            />
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-3">
                              <Avatar className="h-9 w-9">
                                <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                                <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                              </Avatar>
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
                          <TableCell>
                            <Badge
                              className={
                                user.status === "active"
                                  ? "bg-green-100 text-green-800"
                                  : user.status === "pending"
                                    ? "bg-amber-100 text-amber-800"
                                    : "bg-gray-100 text-gray-800"
                              }
                            >
                              {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                            </Badge>
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
                          <TableCell>{new Date(user.joined).toLocaleDateString()}</TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              <Button
                                variant="outline"
                                size="sm"
                                className="bg-blue-50 text-blue-600 hover:bg-blue-100 hover:text-blue-700"
                                onClick={() => openVerifyDialog(user.id)}
                              >
                                <BadgeCheck className="mr-1 h-4 w-4" />
                                Verify
                              </Button>
                              <Button variant="outline" size="sm" onClick={() => openUserDetailsDialog(user.id)}>
                                <User className="h-4 w-4" />
                                <span className="sr-only">View</span>
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
            <TabsContent value="agents">
              <div className="rounded-md border">
                <Table>{/* Similar structure as "all" tab but filtered for agents */}</Table>
              </div>
            </TabsContent>
            <TabsContent value="admins">
              <div className="rounded-md border">
                <Table>{/* Similar structure as "all" tab but filtered for admins */}</Table>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter className="flex items-center justify-between">
          <div className="text-sm text-gray-500">
            Showing {filteredUsers.length} of {users.length} users
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

      {/* User Verification Dialog */}
      <Dialog open={isVerifyDialogOpen} onOpenChange={setIsVerifyDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Verify User</DialogTitle>
            <DialogDescription>
              Verifying a user confirms their identity and grants them additional privileges on the platform.
            </DialogDescription>
          </DialogHeader>
          <div className="flex items-center gap-4 py-4">
            <Avatar className="h-12 w-12">
              <AvatarImage src={selectedUser?.avatar || "/placeholder.svg"} alt={selectedUser?.name} />
              <AvatarFallback>{selectedUser?.name?.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium">{selectedUser?.name}</p>
              <p className="text-sm text-gray-500">{selectedUser?.email}</p>
            </div>
          </div>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="text-sm font-medium">Email Verification</div>
                <div className="flex items-center gap-2">
                  {selectedUser?.emailVerified ? (
                    <>
                      <Check className="h-4 w-4 text-green-500" />
                      <span className="text-sm text-green-600">Verified</span>
                    </>
                  ) : (
                    <>
                      <XCircle className="h-4 w-4 text-red-500" />
                      <span className="text-sm text-red-600">Not Verified</span>
                    </>
                  )}
                </div>
              </div>
              <div className="space-y-2">
                <div className="text-sm font-medium">Phone Verification</div>
                <div className="flex items-center gap-2">
                  {selectedUser?.phoneVerified ? (
                    <>
                      <Check className="h-4 w-4 text-green-500" />
                      <span className="text-sm text-green-600">Verified</span>
                    </>
                  ) : (
                    <>
                      <XCircle className="h-4 w-4 text-red-500" />
                      <span className="text-sm text-red-600">Not Verified</span>
                    </>
                  )}
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <div className="text-sm font-medium">ID Verification</div>
              <div className="flex items-center gap-2">
                {selectedUser?.idVerified ? (
                  <>
                    <Check className="h-4 w-4 text-green-500" />
                    <span className="text-sm text-green-600">ID Verified</span>
                  </>
                ) : (
                  <>
                    <XCircle className="h-4 w-4 text-red-500" />
                    <span className="text-sm text-red-600">ID Not Verified</span>
                  </>
                )}
              </div>
            </div>
            <div className="space-y-2">
              <label htmlFor="verification-notes" className="text-sm font-medium">
                Verification Notes
              </label>
              <Textarea
                id="verification-notes"
                placeholder="Add any notes about this verification..."
                value={verificationNotes}
                onChange={(e) => setVerificationNotes(e.target.value)}
                rows={3}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsVerifyDialogOpen(false)}>
              Cancel
            </Button>
            <Button
              className="bg-blue-600 hover:bg-blue-700"
              onClick={() => handleVerifyUser(selectedUserId, verificationNotes)}
            >
              <BadgeCheck className="mr-2 h-4 w-4" />
              Verify User
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* User Details Dialog */}
      <Dialog open={isUserDetailsDialogOpen} onOpenChange={setIsUserDetailsDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>User Details</DialogTitle>
            <DialogDescription>Detailed information about the user.</DialogDescription>
          </DialogHeader>
          {selectedUser && (
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <Avatar className="h-16 w-16">
                    <AvatarImage src={selectedUser.avatar || "/placeholder.svg"} alt={selectedUser.name} />
                    <AvatarFallback>{selectedUser.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  {selectedUser.verified && (
                    <div className="absolute -bottom-1 -right-1 bg-white rounded-full">
                      <BadgeCheck className="h-5 w-5 text-blue-500" />
                    </div>
                  )}
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
                    <Badge
                      className={
                        selectedUser.status === "active"
                          ? "bg-green-100 text-green-800"
                          : selectedUser.status === "pending"
                            ? "bg-amber-100 text-amber-800"
                            : "bg-gray-100 text-gray-800"
                      }
                    >
                      {selectedUser.status.charAt(0).toUpperCase() + selectedUser.status.slice(1)}
                    </Badge>
                    {selectedUser.verified ? (
                      <Badge className="bg-blue-100 text-blue-800">Verified</Badge>
                    ) : (
                      <Badge className="bg-amber-100 text-amber-800">Unverified</Badge>
                    )}
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
                {selectedUser.verified && (
                  <div className="space-y-1">
                    <p className="text-sm text-gray-500">Verification Date</p>
                    <p className="font-medium">{selectedUser.verificationDate}</p>
                  </div>
                )}
              </div>

              <div className="space-y-3">
                <h4 className="font-medium">Verification Status</h4>
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
            {selectedUser && !selectedUser.verified ? (
              <Button
                className="bg-blue-600 hover:bg-blue-700"
                onClick={() => {
                  setIsUserDetailsDialogOpen(false)
                  openVerifyDialog(selectedUserId)
                }}
              >
                <BadgeCheck className="mr-2 h-4 w-4" />
                Verify User
              </Button>
            ) : (
              <Button variant="outline" onClick={() => setIsUserDetailsDialogOpen(false)}>
                Close
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
