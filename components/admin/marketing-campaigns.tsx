"use client"

import { useState } from "react"
import {
  BarChart3,
  Calendar,
  Clock,
  Edit,
  Filter,
  Mail,
  MoreHorizontal,
  Pause,
  Play,
  Plus,
  Search,
  Share,
  Trash2,
  Users,
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
import { Progress } from "@/components/ui/progress"
import { useToast } from "@/hooks/use-toast"
import { format } from "date-fns"

// Sample campaign data
const campaigns = [
  {
    id: "CAMP-001",
    name: "Summer Special Promotion",
    type: "email",
    status: "active",
    audience: "all-users",
    audienceCount: 1250,
    openRate: 32.5,
    clickRate: 12.8,
    conversionRate: 5.2,
    startDate: "2023-07-01",
    endDate: "2023-08-31",
    createdAt: "2023-06-15T10:30:00",
    updatedAt: "2023-07-01T09:00:00",
  },
  {
    id: "CAMP-002",
    name: "Lagos Properties Showcase",
    type: "email",
    status: "scheduled",
    audience: "lagos-users",
    audienceCount: 450,
    openRate: 0,
    clickRate: 0,
    conversionRate: 0,
    startDate: "2023-08-01",
    endDate: "2023-08-15",
    createdAt: "2023-07-15T14:45:00",
    updatedAt: "2023-07-15T14:45:00",
  },
  {
    id: "CAMP-003",
    name: "Luxury Properties Discount",
    type: "sms",
    status: "active",
    audience: "premium-users",
    audienceCount: 200,
    openRate: 45.0,
    clickRate: 18.5,
    conversionRate: 8.0,
    startDate: "2023-07-15",
    endDate: "2023-08-15",
    createdAt: "2023-07-10T09:15:00",
    updatedAt: "2023-07-15T08:30:00",
  },
  {
    id: "CAMP-004",
    name: "Weekend Getaway Deals",
    type: "push",
    status: "completed",
    audience: "all-users",
    audienceCount: 1250,
    openRate: 28.3,
    clickRate: 10.5,
    conversionRate: 4.2,
    startDate: "2023-06-01",
    endDate: "2023-06-30",
    createdAt: "2023-05-20T11:00:00",
    updatedAt: "2023-07-01T10:00:00",
  },
  {
    id: "CAMP-005",
    name: "New User Welcome Offer",
    type: "email",
    status: "active",
    audience: "new-users",
    audienceCount: 320,
    openRate: 65.2,
    clickRate: 35.8,
    conversionRate: 15.3,
    startDate: "2023-01-01",
    endDate: "2023-12-31",
    createdAt: "2022-12-15T09:00:00",
    updatedAt: "2023-01-01T00:00:00",
  },
  {
    id: "CAMP-006",
    name: "Property Owner Special",
    type: "email",
    status: "draft",
    audience: "property-owners",
    audienceCount: 150,
    openRate: 0,
    clickRate: 0,
    conversionRate: 0,
    startDate: "",
    endDate: "",
    createdAt: "2023-07-20T15:30:00",
    updatedAt: "2023-07-20T15:30:00",
  },
  {
    id: "CAMP-007",
    name: "Holiday Season Bookings",
    type: "sms",
    status: "paused",
    audience: "all-users",
    audienceCount: 1250,
    openRate: 22.1,
    clickRate: 8.7,
    conversionRate: 3.5,
    startDate: "2023-07-10",
    endDate: "2023-09-10",
    createdAt: "2023-07-05T10:00:00",
    updatedAt: "2023-07-18T14:00:00",
  },
]

export default function MarketingCampaigns() {
  const { toast } = useToast()
  const [searchQuery, setSearchQuery] = useState("")
  const [typeFilter, setTypeFilter] = useState<string>("all")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [sortBy, setSortBy] = useState<string>("newest")

  const handleDeleteCampaign = (campaignId: string) => {
    toast({
      title: "Campaign deleted",
      description: `Campaign ${campaignId} has been deleted.`,
    })
  }

  const handlePauseCampaign = (campaignId: string) => {
    toast({
      title: "Campaign paused",
      description: `Campaign ${campaignId} has been paused.`,
    })
  }

  const handleResumeCampaign = (campaignId: string) => {
    toast({
      title: "Campaign resumed",
      description: `Campaign ${campaignId} has been resumed.`,
    })
  }

  const handleDuplicateCampaign = (campaignId: string) => {
    toast({
      title: "Campaign duplicated",
      description: `Campaign ${campaignId} has been duplicated.`,
    })
  }

  const filteredCampaigns = campaigns
    .filter((campaign) => {
      // Apply search filter
      if (searchQuery && !campaign.name.toLowerCase().includes(searchQuery.toLowerCase())) {
        return false
      }

      // Apply type filter
      if (typeFilter !== "all" && campaign.type !== typeFilter) {
        return false
      }

      // Apply status filter
      if (statusFilter !== "all" && campaign.status !== statusFilter) {
        return false
      }

      return true
    })
    .sort((a, b) => {
      // Apply sorting
      switch (sortBy) {
        case "newest":
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        case "oldest":
          return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        case "name-asc":
          return a.name.localeCompare(b.name)
        case "name-desc":
          return b.name.localeCompare(a.name)
        case "performance":
          return b.conversionRate - a.conversionRate
        default:
          return 0
      }
    })

  const formatDate = (dateString: string) => {
    return dateString ? format(new Date(dateString), "MMM dd, yyyy") : "Not set"
  }

  const formatDateTime = (dateTimeString: string) => {
    return format(new Date(dateTimeString), "MMM dd, yyyy HH:mm")
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800"
      case "scheduled":
        return "bg-blue-100 text-blue-800"
      case "completed":
        return "bg-purple-100 text-purple-800"
      case "draft":
        return "bg-gray-100 text-gray-800"
      case "paused":
        return "bg-amber-100 text-amber-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "email":
        return <Mail className="h-4 w-4" />
      case "sms":
        return <Mail className="h-4 w-4" />
      case "push":
        return <Mail className="h-4 w-4" />
      default:
        return <Mail className="h-4 w-4" />
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Marketing Campaigns</h1>
          <p className="text-gray-500">Create and manage your marketing campaigns</p>
        </div>
        <div className="flex items-center gap-2">
          <Button className="bg-purple-600 hover:bg-purple-700">
            <Plus className="mr-2 h-4 w-4" />
            Create Campaign
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
                  placeholder="Search campaigns..."
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
                  <DropdownMenuLabel>Filter Campaigns</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <div className="p-2">
                    <p className="text-sm font-medium mb-1">Campaign Type</p>
                    <Select value={typeFilter} onValueChange={setTypeFilter}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Types</SelectItem>
                        <SelectItem value="email">Email</SelectItem>
                        <SelectItem value="sms">SMS</SelectItem>
                        <SelectItem value="push">Push Notification</SelectItem>
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
                        <SelectItem value="scheduled">Scheduled</SelectItem>
                        <SelectItem value="completed">Completed</SelectItem>
                        <SelectItem value="draft">Draft</SelectItem>
                        <SelectItem value="paused">Paused</SelectItem>
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
                        <SelectItem value="performance">Best Performance</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all" className="space-y-4">
            <TabsList>
              <TabsTrigger value="all">All Campaigns</TabsTrigger>
              <TabsTrigger value="active">Active</TabsTrigger>
              <TabsTrigger value="scheduled">Scheduled</TabsTrigger>
              <TabsTrigger value="completed">Completed</TabsTrigger>
              <TabsTrigger value="draft">Drafts</TabsTrigger>
            </TabsList>
            <TabsContent value="all" className="space-y-4">
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[300px]">Campaign</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Audience</TableHead>
                      <TableHead>Performance</TableHead>
                      <TableHead>Duration</TableHead>
                      <TableHead>Created</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredCampaigns.map((campaign) => (
                      <TableRow key={campaign.id}>
                        <TableCell>
                          <div>
                            <p className="font-medium">{campaign.name}</p>
                            <p className="text-xs text-gray-500">{campaign.id}</p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            {getTypeIcon(campaign.type)}
                            <span className="capitalize">{campaign.type}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(campaign.status)}>
                            {campaign.status.charAt(0).toUpperCase() + campaign.status.slice(1)}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Users className="h-4 w-4 text-gray-500" />
                            <span>{campaign.audienceCount.toLocaleString()}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          {campaign.status === "draft" || campaign.status === "scheduled" ? (
                            <span className="text-gray-500">Not started</span>
                          ) : (
                            <div className="space-y-2">
                              <div className="flex justify-between text-xs">
                                <span>Open Rate</span>
                                <span>{campaign.openRate}%</span>
                              </div>
                              <Progress value={campaign.openRate} className="h-1" />
                              <div className="flex justify-between text-xs">
                                <span>Conversion</span>
                                <span>{campaign.conversionRate}%</span>
                              </div>
                              <Progress
                                value={campaign.conversionRate}
                                className="h-1"
                                indicatorClassName="bg-green-500"
                              />
                            </div>
                          )}
                        </TableCell>
                        <TableCell>
                          {campaign.startDate ? (
                            <div>
                              <div className="flex items-center">
                                <Calendar className="h-3 w-3 mr-1 text-gray-500" />
                                <span className="text-xs">{formatDate(campaign.startDate)}</span>
                              </div>
                              <div className="flex items-center mt-1">
                                <Calendar className="h-3 w-3 mr-1 text-gray-500" />
                                <span className="text-xs">{formatDate(campaign.endDate)}</span>
                              </div>
                            </div>
                          ) : (
                            <span className="text-gray-500">Not scheduled</span>
                          )}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            <Clock className="h-3 w-3 mr-1 text-gray-500" />
                            <span className="text-xs">{formatDateTime(campaign.createdAt)}</span>
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>
                                <Edit className="mr-2 h-4 w-4" />
                                Edit Campaign
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleDuplicateCampaign(campaign.id)}>
                                <Share className="mr-2 h-4 w-4" />
                                Duplicate
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <BarChart3 className="mr-2 h-4 w-4" />
                                View Analytics
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              {campaign.status === "active" && (
                                <DropdownMenuItem onClick={() => handlePauseCampaign(campaign.id)}>
                                  <Pause className="mr-2 h-4 w-4" />
                                  Pause Campaign
                                </DropdownMenuItem>
                              )}
                              {campaign.status === "paused" && (
                                <DropdownMenuItem onClick={() => handleResumeCampaign(campaign.id)}>
                                  <Play className="mr-2 h-4 w-4" />
                                  Resume Campaign
                                </DropdownMenuItem>
                              )}
                              <DropdownMenuSeparator />
                              <DropdownMenuItem
                                className="text-red-600"
                                onClick={() => handleDeleteCampaign(campaign.id)}
                              >
                                <Trash2 className="mr-2 h-4 w-4" />
                                Delete Campaign
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
            <TabsContent value="active">
              <div className="rounded-md border">
                <Table>{/* Similar structure as "all" tab but filtered for active campaigns */}</Table>
              </div>
            </TabsContent>
            <TabsContent value="scheduled">
              <div className="rounded-md border">
                <Table>{/* Similar structure as "all" tab but filtered for scheduled campaigns */}</Table>
              </div>
            </TabsContent>
            <TabsContent value="completed">
              <div className="rounded-md border">
                <Table>{/* Similar structure as "all" tab but filtered for completed campaigns */}</Table>
              </div>
            </TabsContent>
            <TabsContent value="draft">
              <div className="rounded-md border">
                <Table>{/* Similar structure as "all" tab but filtered for draft campaigns */}</Table>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter className="flex items-center justify-between">
          <div className="text-sm text-gray-500">
            Showing {filteredCampaigns.length} of {campaigns.length} campaigns
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
    </div>
  )
}
