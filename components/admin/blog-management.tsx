"use client"

import { useState } from "react"
import { ChevronDown, Download, Edit, Eye, Filter, MoreHorizontal, Plus, Search, Trash2 } from "lucide-react"
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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Sample blog data
const blogPosts = [
  {
    id: "POST-001",
    title: "Top 10 Luxury Properties in Lagos",
    slug: "top-10-luxury-properties-lagos",
    author: {
      name: "Isaac Chindah",
      avatar: "/team/isaac-chindah.jpeg",
    },
    category: "Luxury Properties",
    status: "Published",
    date: "2023-07-15",
    views: 1245,
    featured: true,
  },
  {
    id: "POST-002",
    title: "How to Choose the Perfect Rental Property",
    slug: "how-to-choose-perfect-rental-property",
    author: {
      name: "Daniel Ochowechi",
      avatar: "/team/daniel-ochowechi.jpeg",
    },
    category: "Rental Tips",
    status: "Published",
    date: "2023-07-10",
    views: 987,
    featured: false,
  },
  {
    id: "POST-003",
    title: "Investment Opportunities in Nigerian Real Estate",
    slug: "investment-opportunities-nigerian-real-estate",
    author: {
      name: "Ojei Ekun",
      avatar: "/team/ojei-ekun.jpeg",
    },
    category: "Investment",
    status: "Published",
    date: "2023-07-05",
    views: 1532,
    featured: true,
  },
  {
    id: "POST-004",
    title: "The Rise of Smart Homes in Nigeria",
    slug: "rise-of-smart-homes-nigeria",
    author: {
      name: "Isaac Chindah",
      avatar: "/team/isaac-chindah.jpeg",
    },
    category: "Technology",
    status: "Draft",
    date: "2023-07-03",
    views: 0,
    featured: false,
  },
  {
    id: "POST-005",
    title: "5 Tips for First-Time Home Buyers",
    slug: "5-tips-first-time-home-buyers",
    author: {
      name: "Daniel Ochowechi",
      avatar: "/team/daniel-ochowechi.jpeg",
    },
    category: "Buying Guide",
    status: "Published",
    date: "2023-06-28",
    views: 876,
    featured: false,
  },
  {
    id: "POST-006",
    title: "Sustainable Architecture in Modern Nigerian Homes",
    slug: "sustainable-architecture-modern-nigerian-homes",
    author: {
      name: "Ojei Ekun",
      avatar: "/team/ojei-ekun.jpeg",
    },
    category: "Architecture",
    status: "Scheduled",
    date: "2023-07-20",
    views: 0,
    featured: false,
  },
  {
    id: "POST-007",
    title: "The Impact of Location on Property Value",
    slug: "impact-location-property-value",
    author: {
      name: "Isaac Chindah",
      avatar: "/team/isaac-chindah.jpeg",
    },
    category: "Market Analysis",
    status: "Published",
    date: "2023-06-20",
    views: 1102,
    featured: true,
  },
]

export default function BlogManagement() {
  const [searchTerm, setSearchTerm] = useState("")
  const [activeTab, setActiveTab] = useState("all")

  const filteredPosts = blogPosts.filter(
    (post) =>
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.author.name.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const getFilteredPostsByStatus = (status: string) => {
    if (status === "all") return filteredPosts
    if (status === "featured") return filteredPosts.filter((post) => post.featured)
    return filteredPosts.filter((post) => post.status.toLowerCase() === status.toLowerCase())
  }

  const currentFilteredPosts = getFilteredPostsByStatus(activeTab)

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Blog Management</h1>
          <p className="text-gray-500">Create and manage your blog posts and articles</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2">
          <Button className="bg-purple-600 hover:bg-purple-700">
            <Plus className="h-4 w-4 mr-2" />
            Create New Post
          </Button>
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

      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Blog Posts</CardTitle>
          <CardDescription>View and manage all your blog posts and articles</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row justify-between items-center mb-4 gap-4">
            <div className="relative w-full md:w-96">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <input
                type="search"
                placeholder="Search posts..."
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
                <option>All Categories</option>
                <option>Luxury Properties</option>
                <option>Rental Tips</option>
                <option>Investment</option>
                <option>Technology</option>
                <option>Buying Guide</option>
                <option>Architecture</option>
                <option>Market Analysis</option>
              </select>
              <select className="bg-white border rounded-md px-3 py-1.5 text-sm">
                <option>All Authors</option>
                <option>Isaac Chindah</option>
                <option>Daniel Ochowechi</option>
                <option>Ojei Ekun</option>
              </select>
            </div>
          </div>

          <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="mb-4">
            <TabsList>
              <TabsTrigger value="all">All Posts</TabsTrigger>
              <TabsTrigger value="published">Published</TabsTrigger>
              <TabsTrigger value="draft">Drafts</TabsTrigger>
              <TabsTrigger value="scheduled">Scheduled</TabsTrigger>
              <TabsTrigger value="featured">Featured</TabsTrigger>
            </TabsList>
          </Tabs>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Author</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Views</TableHead>
                  <TableHead>Featured</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {currentFilteredPosts.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-8 text-gray-500">
                      No blog posts found
                    </TableCell>
                  </TableRow>
                ) : (
                  currentFilteredPosts.map((post) => (
                    <TableRow key={post.id}>
                      <TableCell>
                        <div className="font-medium max-w-[250px] truncate">{post.title}</div>
                        <div className="text-xs text-gray-500 truncate">{post.slug}</div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={post.author.avatar || "/placeholder.svg"} alt={post.author.name} />
                            <AvatarFallback className="bg-purple-100 text-purple-600">
                              {post.author.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <span>{post.author.name}</span>
                        </div>
                      </TableCell>
                      <TableCell>{post.category}</TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className={`
                            ${
                              post.status === "Published"
                                ? "border-green-500 text-green-600 bg-green-50"
                                : post.status === "Draft"
                                  ? "border-amber-500 text-amber-600 bg-amber-50"
                                  : "border-blue-500 text-blue-600 bg-blue-50"
                            }
                          `}
                        >
                          {post.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{post.date}</TableCell>
                      <TableCell>{post.views.toLocaleString()}</TableCell>
                      <TableCell>
                        {post.featured ? (
                          <Badge className="bg-purple-100 text-purple-600 hover:bg-purple-100">Featured</Badge>
                        ) : (
                          <span className="text-gray-500">-</span>
                        )}
                      </TableCell>
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
                              View Post
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Edit className="h-4 w-4 mr-2" />
                              Edit Post
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              {post.featured ? (
                                <>
                                  <Eye className="h-4 w-4 mr-2" />
                                  Remove Featured
                                </>
                              ) : (
                                <>
                                  <Eye className="h-4 w-4 mr-2" />
                                  Mark as Featured
                                </>
                              )}
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-red-600">
                              <Trash2 className="h-4 w-4 mr-2" />
                              Delete Post
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
              Showing {currentFilteredPosts.length} of {blogPosts.length} posts
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
