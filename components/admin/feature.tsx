"use client"

import { useState, useEffect } from "react"
import { Star, StarOff, Search, Filter, ArrowUpDown, Calendar, Home } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/hooks/use-toast"
import { properties } from "@/data/properties"

export default function FeaturedPropertiesManagement() {
  const { toast } = useToast()
  const [searchQuery, setSearchQuery] = useState("")
  const [sortBy, setSortBy] = useState("dateAdded")
  const [sortOrder, setSortOrder] = useState("desc")
  const [featuredProperties, setFeaturedProperties] = useState([])
  const [regularProperties, setRegularProperties] = useState([])
  const [selectedProperties, setSelectedProperties] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  // Simulate loading data
  useEffect(() => {
    const timer = setTimeout(() => {
      // Simulate featured properties (first 3 properties)
      const featured = properties.slice(0, 3).map((p) => ({
        ...p,
        isFeatured: true,
        dateAdded: new Date(Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000).toISOString(),
        featuredUntil: new Date(Date.now() + Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000).toISOString(),
        views: Math.floor(Math.random() * 1000) + 500,
        clicks: Math.floor(Math.random() * 300) + 100,
      }))

      // Remaining properties as regular
      const regular = properties.slice(3).map((p) => ({
        ...p,
        isFeatured: false,
        dateAdded: new Date(Date.now() - Math.floor(Math.random() * 90) * 24 * 60 * 60 * 1000).toISOString(),
        views: Math.floor(Math.random() * 500) + 100,
        clicks: Math.floor(Math.random() * 150) + 20,
      }))

      setFeaturedProperties(featured)
      setRegularProperties(regular)
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  const handleToggleFeatured = (propertyId, currentStatus) => {
    if (currentStatus) {
      // Remove from featured
      const property = featuredProperties.find((p) => p.id === propertyId)
      setFeaturedProperties(featuredProperties.filter((p) => p.id !== propertyId))
      setRegularProperties([...regularProperties, { ...property, isFeatured: false }])

      toast({
        title: "Property Removed from Featured",
        description: `"${property.title}" has been removed from featured properties.`,
      })
    } else {
      // Add to featured
      const property = regularProperties.find((p) => p.id === propertyId)
      setRegularProperties(regularProperties.filter((p) => p.id !== propertyId))
      setFeaturedProperties([
        ...featuredProperties,
        {
          ...property,
          isFeatured: true,
          featuredUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
        },
      ])

      toast({
        title: "Property Added to Featured",
        description: `"${property.title}" has been added to featured properties.`,
      })
    }
  }

  const handleBulkAddToFeatured = () => {
    if (selectedProperties.length === 0) {
      toast({
        title: "No Properties Selected",
        description: "Please select at least one property to feature.",
        variant: "destructive",
      })
      return
    }

    const selectedIds = new Set(selectedProperties)
    const toFeature = regularProperties.filter((p) => selectedIds.has(p.id))

    setRegularProperties(regularProperties.filter((p) => !selectedIds.has(p.id)))
    setFeaturedProperties([
      ...featuredProperties,
      ...toFeature.map((p) => ({
        ...p,
        isFeatured: true,
        featuredUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
      })),
    ])

    setSelectedProperties([])

    toast({
      title: "Properties Featured",
      description: `${toFeature.length} properties have been added to featured.`,
    })
  }

  const handleBulkRemoveFromFeatured = () => {
    if (selectedProperties.length === 0) {
      toast({
        title: "No Properties Selected",
        description: "Please select at least one property to remove from featured.",
        variant: "destructive",
      })
      return
    }

    const selectedIds = new Set(selectedProperties)
    const toUnfeature = featuredProperties.filter((p) => selectedIds.has(p.id))

    setFeaturedProperties(featuredProperties.filter((p) => !selectedIds.has(p.id)))
    setRegularProperties([
      ...regularProperties,
      ...toUnfeature.map((p) => ({
        ...p,
        isFeatured: false,
      })),
    ])

    setSelectedProperties([])

    toast({
      title: "Properties Unfeatured",
      description: `${toUnfeature.length} properties have been removed from featured.`,
    })
  }

  const handleSelectProperty = (propertyId) => {
    setSelectedProperties((prev) => {
      if (prev.includes(propertyId)) {
        return prev.filter((id) => id !== propertyId)
      } else {
        return [...prev, propertyId]
      }
    })
  }

  const handleSelectAll = (properties) => {
    if (selectedProperties.length === properties.length) {
      setSelectedProperties([])
    } else {
      setSelectedProperties(properties.map((p) => p.id))
    }
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }).format(date)
  }

  const sortProperties = (properties) => {
    return [...properties].sort((a, b) => {
      let comparison = 0

      switch (sortBy) {
        case "title":
          comparison = a.title.localeCompare(b.title)
          break
        case "price":
          comparison = a.price - b.price
          break
        case "views":
          comparison = a.views - b.views
          break
        case "clicks":
          comparison = a.clicks - b.clicks
          break
        case "dateAdded":
          comparison = new Date(a.dateAdded) - new Date(b.dateAdded)
          break
        case "featuredUntil":
          // Handle null featuredUntil for regular properties
          if (!a.featuredUntil && !b.featuredUntil) comparison = 0
          else if (!a.featuredUntil) comparison = 1
          else if (!b.featuredUntil) comparison = -1
          else comparison = new Date(a.featuredUntil) - new Date(b.featuredUntil)
          break
        default:
          comparison = 0
      }

      return sortOrder === "asc" ? comparison : -comparison
    })
  }

  const filteredFeatured = sortProperties(
    featuredProperties.filter(
      (p) =>
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.location.toLowerCase().includes(searchQuery.toLowerCase()),
    ),
  )

  const filteredRegular = sortProperties(
    regularProperties.filter(
      (p) =>
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.location.toLowerCase().includes(searchQuery.toLowerCase()),
    ),
  )

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

  const renderPropertyTable = (properties, isFeaturedTab) => {
    return (
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px]">
                <input
                  type="checkbox"
                  checked={selectedProperties.length === properties.length && properties.length > 0}
                  onChange={() => handleSelectAll(properties)}
                  className="h-4 w-4 rounded border-gray-300"
                />
              </TableHead>
              <TableHead className="cursor-pointer" onClick={() => handleSort("title")}>
                Property {renderSortIcon("title")}
              </TableHead>
              <TableHead className="cursor-pointer" onClick={() => handleSort("price")}>
                Price {renderSortIcon("price")}
              </TableHead>
              <TableHead className="cursor-pointer" onClick={() => handleSort("views")}>
                Views {renderSortIcon("views")}
              </TableHead>
              <TableHead className="cursor-pointer" onClick={() => handleSort("clicks")}>
                Clicks {renderSortIcon("clicks")}
              </TableHead>
              <TableHead className="cursor-pointer" onClick={() => handleSort("dateAdded")}>
                Added {renderSortIcon("dateAdded")}
              </TableHead>
              {isFeaturedTab && (
                <TableHead className="cursor-pointer" onClick={() => handleSort("featuredUntil")}>
                  Featured Until {renderSortIcon("featuredUntil")}
                </TableHead>
              )}
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {properties.length === 0 ? (
              <TableRow>
                <TableCell colSpan={isFeaturedTab ? 8 : 7} className="text-center py-8 text-muted-foreground">
                  No properties found
                </TableCell>
              </TableRow>
            ) : (
              properties.map((property) => (
                <TableRow key={property.id}>
                  <TableCell>
                    <input
                      type="checkbox"
                      checked={selectedProperties.includes(property.id)}
                      onChange={() => handleSelectProperty(property.id)}
                      className="h-4 w-4 rounded border-gray-300"
                    />
                  </TableCell>
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-2">
                      <div className="h-10 w-10 rounded-md overflow-hidden">
                        <img
                          src={property.images[0] || "/placeholder.svg"}
                          alt={property.title}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div>
                        <div className="font-medium">{property.title}</div>
                        <div className="text-xs text-muted-foreground">{property.location}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>${property.price.toLocaleString()}</TableCell>
                  <TableCell>{property.views.toLocaleString()}</TableCell>
                  <TableCell>{property.clicks.toLocaleString()}</TableCell>
                  <TableCell>{formatDate(property.dateAdded)}</TableCell>
                  {isFeaturedTab && <TableCell>{formatDate(property.featuredUntil)}</TableCell>}
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => window.open(`/properties/${property.id}`, "_blank")}
                      >
                        <Home className="h-4 w-4" />
                      </Button>
                      <Button
                        variant={isFeaturedTab ? "destructive" : "default"}
                        size="icon"
                        onClick={() => handleToggleFeatured(property.id, isFeaturedTab)}
                      >
                        {isFeaturedTab ? <StarOff className="h-4 w-4" /> : <Star className="h-4 w-4" />}
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Featured Properties</h2>
          <p className="text-muted-foreground">
            Manage which properties appear in featured sections across the platform.
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2">
            <Calendar className="h-4 w-4" />
            Set Duration
          </Button>
          <Button className="gap-2">
            <Star className="h-4 w-4" />
            Auto-Feature Settings
          </Button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
        <div className="relative w-full md:w-80">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search properties..."
            className="w-full pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="gap-2">
              <Filter className="h-4 w-4" />
              Filter
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>Price Range</DropdownMenuItem>
            <DropdownMenuItem>Property Type</DropdownMenuItem>
            <DropdownMenuItem>Location</DropdownMenuItem>
            <DropdownMenuItem>Date Added</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Featured</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{featuredProperties.length}</div>
            <p className="text-xs text-muted-foreground">
              {featuredProperties.length > 0
                ? `${((featuredProperties.length / (featuredProperties.length + regularProperties.length)) * 100).toFixed(1)}% of all properties`
                : "No featured properties"}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Featured Views</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {featuredProperties.reduce((sum, p) => sum + p.views, 0).toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">
              {featuredProperties.length > 0
                ? `Avg ${Math.round(featuredProperties.reduce((sum, p) => sum + p.views, 0) / featuredProperties.length).toLocaleString()} per property`
                : "No data available"}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Featured Clicks</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {featuredProperties.reduce((sum, p) => sum + p.clicks, 0).toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">
              {featuredProperties.length > 0
                ? `${((featuredProperties.reduce((sum, p) => sum + p.clicks, 0) / featuredProperties.reduce((sum, p) => sum + p.views, 0)) * 100).toFixed(1)}% click-through rate`
                : "No data available"}
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="featured" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="featured">Featured Properties ({featuredProperties.length})</TabsTrigger>
          <TabsTrigger value="regular">Regular Properties ({regularProperties.length})</TabsTrigger>
        </TabsList>
        <TabsContent value="featured" className="space-y-4">
          {selectedProperties.length > 0 && (
            <div className="flex items-center justify-between bg-muted p-2 rounded-md">
              <span className="text-sm font-medium">{selectedProperties.length} properties selected</span>
              <Button variant="destructive" size="sm" onClick={handleBulkRemoveFromFeatured}>
                Remove from Featured
              </Button>
            </div>
          )}
          {isLoading ? (
            <div className="flex items-center justify-center h-64">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          ) : (
            renderPropertyTable(filteredFeatured, true)
          )}
        </TabsContent>
        <TabsContent value="regular" className="space-y-4">
          {selectedProperties.length > 0 && (
            <div className="flex items-center justify-between bg-muted p-2 rounded-md">
              <span className="text-sm font-medium">{selectedProperties.length} properties selected</span>
              <Button variant="default" size="sm" onClick={handleBulkAddToFeatured}>
                Add to Featured
              </Button>
            </div>
          )}
          {isLoading ? (
            <div className="flex items-center justify-center h-64">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          ) : (
            renderPropertyTable(filteredRegular, false)
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
