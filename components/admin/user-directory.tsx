"use client"

import { useState, useEffect } from "react"
import { Search, Filter, Download, Mail, Phone, ArrowUpDown, Eye, Ban, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

// Mock user data
const mockUsers = [
  {
    id: "USR001",
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+234 812 345 6789",
    role: "Owner",
    status: "active",
    properties: 3,
    joinDate: "2023-01-15T00:00:00Z",
    lastActive: "2023-05-10T14:30:00Z",
    verified: true,
    avatar: "/woman-portrait.png",
  },
  {
    id: "USR002",
    name: "Jane Smith",
    email: "jane.smith@example.com",
    phone: "+234 803 456 7890",
    role: "Renter",
    status: "active",
    properties: 0,
    joinDate: "2023-02-20T00:00:00Z",
    lastActive: "2023-05-09T09:15:00Z",
    verified: true,
    avatar: "/woman-portrait-2.png",
  },
  {
    id: "USR003",
    name: "Michael Johnson",
    email: "michael.j@example.com",
    phone: "+234 705 567 8901",
    role: "Agent",
    status: "suspended",
    properties: 12,
    joinDate: "2022-11-05T00:00:00Z",
    lastActive: "2023-04-28T16:45:00Z",
    verified: true,
    avatar: "/thoughtful-man-portrait.png",
  },
  {
    id: "USR004",
    name: "Sarah Williams",
    email: "sarah.w@example.com",
    phone: "+234 908 678 9012",
    role: "Owner",
    status: "active",
    properties: 2,
    joinDate: "2023-03-10T00:00:00Z",
    lastActive: "2023-05-11T11:20:00Z",
    verified: false,
    avatar: "/woman-portrait-3.png",
  },
  {
    id: "USR005",
    name: "David Brown",
    email: "david.b@example.com",
    phone: "+234 809 789 0123",
    role: "Renter",
    status: "inactive",
    properties: 0,
    joinDate: "2022-12-15T00:00:00Z",
    lastActive: "2023-03-22T08:10:00Z",
    verified: true,
    avatar: "/man-portrait-3.png",
  },
  // Generate more mock users
  ...Array.from({ length: 45 }, (_, i) => ({
    id: `USR${(i + 6).toString().padStart(3, "0")}`,
    name: `User ${i + 6}`,
    email: `user${i + 6}@example.com`,
    phone: `+234 ${Math.floor(Math.random() * 900) + 100} ${Math.floor(Math.random() * 900) + 100} ${Math.floor(Math.random() * 9000) + 1000}`,
    role: ["Owner", "Renter", "Agent"][Math.floor(Math.random() * 3)],
    status: ["active", "inactive", "suspended"][Math.floor(Math.random() * 3)],
    properties: Math.floor(Math.random() * 10),
    joinDate: new Date(Date.now() - Math.floor(Math.random() * 365) * 24 * 60 * 60 * 1000).toISOString(),
    lastActive: new Date(Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000).toISOString(),
    verified: Math.random() > 0.3,
    avatar: [
      "/woman-portrait.png",
      "/woman-portrait-2.png",
      "/thoughtful-man-portrait.png",
      "/woman-portrait-3.png",
      "/man-portrait-3.png",
    ][Math.floor(Math.random() * 5)],
  })),
]

export function UserDirectory() {
  const { toast } = useToast()
  const [searchQuery, setSearchQuery] = useState("")
  const [sortBy, setSortBy] = useState("joinDate")
  const [sortOrder, setSortOrder] = useState("desc")
  const [statusFilter, setStatusFilter] = useState("all")
  const [roleFilter, setRoleFilter] = useState("all")
  const [verifiedFilter, setVerifiedFilter] = useState("all")
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedUsers, setSelectedUsers] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [users, setUsers] = useState([])

  const itemsPerPage = 10

  // Simulate loading data
  useEffect(() => {
    const timer = setTimeout(() => {
      setUsers(mockUsers)
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  const handleSort = (column) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc")
    } else {
      setSortBy(column)
      setSortOrder("desc")
    }
  }

  const renderSortIcon = (column) => {
    if (sortBy !== column) return <ArrowUpDown className="ml-2 h-4 w-4" />
    return sortOrder === "asc" ? (
      <ArrowUpDown className="ml-2 h-4 w-4 text-primary" />
    ) : (
      <ArrowUpDown className="ml-2 h-4 w-4 text-primary" />
    )
  }

  const handleSelectUser = (userId) => {
    setSelectedUsers((prev) => {
      if (prev.includes(userId)) {
        return prev.filter((id) => id !== userId)
      } else {
        return [...prev, userId]
      }
    })
  }

  const handleSelectAll = (users) => {
    if (selectedUsers.length === users.length && users.length > 0) {
      setSelectedUsers([])
    } else {
      setSelectedUsers(users.map((u) => u.id))
    }
  }

  const handleSuspendUser = (userId) => {
    setUsers(
      users.map((user) =>
        user.id === userId ? { ...user, status: user.status === "suspended" ? "active" : "suspended" } : user,
      ),
    )

    const user = users.find((u) => u.id === userId)
    const newStatus = user.status === "suspended" ? "active" : "suspended"

    toast({
      title: newStatus === "suspended" ? "User Suspended" : "User Unsuspended",
      description: `${user.name} has been ${newStatus === "suspended" ? "suspended" : "unsuspended"}.`,
      variant: newStatus === "suspended" ? "destructive" : "default",
    })
  }

  const handleBulkSuspend = () => {
    if (selectedUsers.length === 0) {
      toast({
        title: "No Users Selected",
        description: "Please select at least one user to suspend.",
        variant: "destructive",
      })
      return
    }

    const selectedIds = new Set(selectedUsers)
    setUsers(users.map((user) => (selectedIds.has(user.id) ? { ...user, status: "suspended" } : user)))

    toast({
      title: "Users Suspended",
      description: `${selectedUsers.length} users have been suspended.`,
      variant: "destructive",
    })

    setSelectedUsers([])
  }

  const handleBulkUnsuspend = () => {
    if (selectedUsers.length === 0) {
      toast({
        title: "No Users Selected",
        description: "Please select at least one user to unsuspend.",
        variant: "destructive",
      })
      return
    }

    const selectedIds = new Set(selectedUsers)
    setUsers(users.map((user) => (selectedIds.has(user.id) ? { ...user, status: "active" } : user)))

    toast({
      title: "Users Unsuspended",
      description: `${selectedUsers.length} users have been unsuspended.`,
    })

    setSelectedUsers([])
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }).format(date)
  }

  const getRelativeTime = (dateString) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInSeconds = Math.floor((now - date) / 1000)

    if (diffInSeconds < 60) return "just now"
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`
    if (diffInSeconds < 2592000) return `${Math.floor(diffInSeconds / 86400)} days ago`
    if (diffInSeconds < 31536000) return `${Math.floor(diffInSeconds / 2592000)} months ago`
    return `${Math.floor(diffInSeconds / 31536000)} years ago`
  }

  const filteredUsers = users
    .filter(
      (user) =>
        searchQuery === "" ||
        user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.phone.includes(searchQuery) ||
        user.id.toLowerCase().includes(searchQuery.toLowerCase()),
    )
    .filter((user) => statusFilter === "all" || user.status === statusFilter)
    .filter((user) => roleFilter === "all" || user.role === roleFilter)
    .filter(
      (user) =>
        verifiedFilter === "all" ||
        (verifiedFilter === "verified" && user.verified) ||
        (verifiedFilter === "unverified" && !user.verified),
    )
    .sort((a, b) => {
      let comparison = 0

      switch (sortBy) {
        case "name":
          comparison = a.name.localeCompare(b.name)
          break
        case "email":
          comparison = a.email.localeCompare(b.email)
          break
        case "phone":
          comparison = a.phone.localeCompare(b.phone)
          break
        case "role":
          comparison = a.role.localeCompare(b.role)
          break
        case "properties":
          comparison = a.properties - b.properties
          break
        case "joinDate":
          comparison = new Date(a.joinDate) - new Date(b.joinDate)
          break
        case "lastActive":
          comparison = new Date(a.lastActive) - new Date(b.lastActive)
          break
        default:
          comparison = 0
      }

      return sortOrder === "asc" ? comparison : -comparison
    })

  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage)
  const paginatedUsers = filteredUsers.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  const exportUserData = () => {
    // In a real application, this would generate a CSV file
    const dataToExport = filteredUsers.map((user) => ({
      ID: user.id,
      Name: user.name,
      Email: user.email,
      Phone: user.phone,
      Role: user.role,
      Status: user.status,
      Properties: user.properties,
      "Join Date": formatDate(user.joinDate),
      "Last Active": formatDate(user.lastActive),
      Verified: user.verified ? "Yes" : "No",
    }))

    toast({
      title: "Export Started",
      description: `Exporting data for ${dataToExport.length} users.`,
    })

    // Simulate download delay
    setTimeout(() => {
      toast({
        title: "Export Complete",
        description: "User data has been exported successfully.",
      })
    }, 1500)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">User Directory</h2>
          <p className="text-muted-foreground">Comprehensive directory of all users on the Hovmart platform.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2" onClick={exportUserData}>
            <Download className="h-4 w-4" />
            Export
          </Button>
          {selectedUsers.length > 0 && (
            <>
              <Button variant="destructive" className="gap-2" onClick={handleBulkSuspend}>
                <Ban className="h-4 w-4" />
                Suspend Selected
              </Button>
              <Button variant="default" className="gap-2" onClick={handleBulkUnsuspend}>
                <CheckCircle className="h-4 w-4" />
                Unsuspend Selected
              </Button>
            </>
          )}
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
        <div className="relative w-full md:w-80">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search users..."
            className="w-full pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="gap-2">
                <Filter className="h-4 w-4" />
                Status: {statusFilter === "all" ? "All" : statusFilter.charAt(0).toUpperCase() + statusFilter.slice(1)}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setStatusFilter("all")}>All</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setStatusFilter("active")}>Active</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setStatusFilter("inactive")}>Inactive</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setStatusFilter("suspended")}>Suspended</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="gap-2">
                <Filter className="h-4 w-4" />
                Role: {roleFilter === "all" ? "All" : roleFilter}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setRoleFilter("all")}>All</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setRoleFilter("Owner")}>Owner</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setRoleFilter("Renter")}>Renter</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setRoleFilter("Agent")}>Agent</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="gap-2">
                <Filter className="h-4 w-4" />
                Verification:{" "}
                {verifiedFilter === "all" ? "All" : verifiedFilter.charAt(0).toUpperCase() + verifiedFilter.slice(1)}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setVerifiedFilter("all")}>All</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setVerifiedFilter("verified")}>Verified</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setVerifiedFilter("unverified")}>Unverified</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px]">
                <input
                  type="checkbox"
                  checked={selectedUsers.length === paginatedUsers.length && paginatedUsers.length > 0}
                  onChange={() => handleSelectAll(paginatedUsers)}
                  className="h-4 w-4 rounded border-gray-300"
                />
              </TableHead>
              <TableHead className="w-[80px]">ID</TableHead>
              <TableHead className="cursor-pointer" onClick={() => handleSort("name")}>
                Name {renderSortIcon("name")}
              </TableHead>
              <TableHead className="cursor-pointer" onClick={() => handleSort("email")}>
                Email {renderSortIcon("email")}
              </TableHead>
              <TableHead className="cursor-pointer" onClick={() => handleSort("phone")}>
                Phone {renderSortIcon("phone")}
              </TableHead>
              <TableHead className="cursor-pointer" onClick={() => handleSort("role")}>
                Role {renderSortIcon("role")}
              </TableHead>
              <TableHead className="cursor-pointer" onClick={() => handleSort("joinDate")}>
                Joined {renderSortIcon("joinDate")}
              </TableHead>
              <TableHead className="cursor-pointer" onClick={() => handleSort("lastActive")}>
                Last Active {renderSortIcon("lastActive")}
              </TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={10} className="text-center py-8">
                  <div className="flex justify-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                  </div>
                </TableCell>
              </TableRow>
            ) : paginatedUsers.length === 0 ? (
              <TableRow>
                <TableCell colSpan={10} className="text-center py-8 text-muted-foreground">
                  No users found
                </TableCell>
              </TableRow>
            ) : (
              paginatedUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>
                    <input
                      type="checkbox"
                      checked={selectedUsers.includes(user.id)}
                      onChange={() => handleSelectUser(user.id)}
                      className="h-4 w-4 rounded border-gray-300"
                    />
                  </TableCell>
                  <TableCell className="font-mono text-xs">{user.id}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className="h-8 w-8 rounded-full overflow-hidden">
                        <img
                          src={user.avatar || "/placeholder.svg"}
                          alt={user.name}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div className="font-medium flex items-center gap-1">
                        {user.name}
                        {user.verified && <CheckCircle className="h-3 w-3 text-green-500" />}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Mail className="h-3 w-3 text-muted-foreground" />
                      <span>{user.email}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Phone className="h-3 w-3 text-muted-foreground" />
                      <span>{user.phone}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{user.role}</Badge>
                  </TableCell>
                  <TableCell>{formatDate(user.joinDate)}</TableCell>
                  <TableCell>
                    <span title={formatDate(user.lastActive)}>{getRelativeTime(user.lastActive)}</span>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        user.status === "active" ? "default" : user.status === "suspended" ? "destructive" : "secondary"
                      }
                    >
                      {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => (window.location.href = `/admin/users/${user.id}`)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button
                        variant={user.status === "suspended" ? "default" : "destructive"}
                        size="icon"
                        onClick={() => handleSuspendUser(user.id)}
                      >
                        {user.status === "suspended" ? (
                          <CheckCircle className="h-4 w-4" />
                        ) : (
                          <Ban className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-between">
        <div className="text-sm text-muted-foreground">
          Showing {paginatedUsers.length > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0} to{" "}
          {Math.min(currentPage * itemsPerPage, filteredUsers.length)} of {filteredUsers.length} users
        </div>
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
              />
            </PaginationItem>
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              let pageNum
              if (totalPages <= 5) {
                pageNum = i + 1
              } else if (currentPage <= 3) {
                pageNum = i + 1
              } else if (currentPage >= totalPages - 2) {
                pageNum = totalPages - 4 + i
              } else {
                pageNum = currentPage - 2 + i
              }

              return (
                <PaginationItem key={pageNum}>
                  <PaginationLink isActive={currentPage === pageNum} onClick={() => setCurrentPage(pageNum)}>
                    {pageNum}
                  </PaginationLink>
                </PaginationItem>
              )
            })}
            <PaginationItem>
              <PaginationNext
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  )
}
