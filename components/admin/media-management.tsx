"use client"

import { useState } from "react"
import { Download, Eye, Filter, FolderPlus, ImageIcon, MoreHorizontal, Search, Trash2, Upload } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"

// Sample media data
const mediaFiles = [
  {
    id: "IMG-001",
    name: "Luxury Ocean View Apartment",
    type: "image/jpeg",
    size: "1.2 MB",
    dimensions: "1920x1080",
    url: "/luxury-ocean-view-apartment.png",
    uploadedBy: "Isaac Chindah",
    uploadedAt: "2023-07-15",
    folder: "Properties",
  },
  {
    id: "IMG-002",
    name: "Modern Ikoyi Apartment",
    type: "image/jpeg",
    size: "0.9 MB",
    dimensions: "1920x1080",
    url: "/modern-ikoyi-apartment.png",
    uploadedBy: "Daniel Ochowechi",
    uploadedAt: "2023-07-10",
    folder: "Properties",
  },
  {
    id: "IMG-003",
    name: "Elegant Villa Lagos",
    type: "image/jpeg",
    size: "1.5 MB",
    dimensions: "1920x1080",
    url: "/elegant-villa-lagos.png",
    uploadedBy: "Ojei Ekun",
    uploadedAt: "2023-07-05",
    folder: "Properties",
  },
  {
    id: "IMG-004",
    name: "Lagos Beachfront Luxury Home",
    type: "image/jpeg",
    size: "1.8 MB",
    dimensions: "1920x1080",
    url: "/lagos-beachfront-luxury-home.png",
    uploadedBy: "Isaac Chindah",
    uploadedAt: "2023-07-03",
    folder: "Properties",
  },
  {
    id: "IMG-005",
    name: "Ikeja Serviced Apartment",
    type: "image/jpeg",
    size: "1.1 MB",
    dimensions: "1920x1080",
    url: "/ikeja-serviced-apartment.png",
    uploadedBy: "Daniel Ochowechi",
    uploadedAt: "2023-06-28",
    folder: "Properties",
  },
  {
    id: "IMG-006",
    name: "Lagos Penthouse View",
    type: "image/jpeg",
    size: "1.3 MB",
    dimensions: "1920x1080",
    url: "/lagos-penthouse-view.png",
    uploadedBy: "Ojei Ekun",
    uploadedAt: "2023-06-25",
    folder: "Properties",
  },
  {
    id: "IMG-007",
    name: "Cozy Yaba Studio",
    type: "image/jpeg",
    size: "0.8 MB",
    dimensions: "1920x1080",
    url: "/cozy-yaba-studio.png",
    uploadedBy: "Isaac Chindah",
    uploadedAt: "2023-06-20",
    folder: "Properties",
  },
  {
    id: "IMG-008",
    name: "Hovmart Logo",
    type: "image/png",
    size: "0.2 MB",
    dimensions: "500x200",
    url: "/hovmart-logo.png",
    uploadedBy: "Daniel Ochowechi",
    uploadedAt: "2023-06-15",
    folder: "Branding",
  },
  {
    id: "IMG-009",
    name: "Hovmart Icon",
    type: "image/png",
    size: "0.1 MB",
    dimensions: "200x200",
    url: "/hovmart-icon.png",
    uploadedBy: "Daniel Ochowechi",
    uploadedAt: "2023-06-15",
    folder: "Branding",
  },
  {
    id: "IMG-010",
    name: "Abstract Business Gold",
    type: "image/png",
    size: "0.5 MB",
    dimensions: "1920x1080",
    url: "/abstract-business-gold.png",
    uploadedBy: "Ojei Ekun",
    uploadedAt: "2023-06-10",
    folder: "Backgrounds",
  },
  {
    id: "IMG-011",
    name: "Team - Isaac Chindah",
    type: "image/jpeg",
    size: "0.3 MB",
    dimensions: "500x500",
    url: "/team/isaac-chindah.jpeg",
    uploadedBy: "Isaac Chindah",
    uploadedAt: "2023-06-05",
    folder: "Team",
  },
  {
    id: "IMG-012",
    name: "Team - Daniel Ochowechi",
    type: "image/jpeg",
    size: "0.3 MB",
    dimensions: "500x500",
    url: "/team/daniel-ochowechi.jpeg",
    uploadedBy: "Daniel Ochowechi",
    uploadedAt: "2023-06-05",
    folder: "Team",
  },
]

export default function MediaManagement() {
  const [searchTerm, setSearchTerm] = useState("")
  const [activeTab, setActiveTab] = useState("all")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [selectedMedia, setSelectedMedia] = useState<string[]>([])

  const filteredMedia = mediaFiles.filter(
    (file) =>
      file.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      file.folder.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const getFilteredMediaByFolder = (folder: string) => {
    if (folder === "all") return filteredMedia
    return filteredMedia.filter((file) => file.folder.toLowerCase() === folder.toLowerCase())
  }

  const currentFilteredMedia = getFilteredMediaByFolder(activeTab)

  const toggleMediaSelection = (id: string) => {
    if (selectedMedia.includes(id)) {
      setSelectedMedia(selectedMedia.filter((mediaId) => mediaId !== id))
    } else {
      setSelectedMedia([...selectedMedia, id])
    }
  }

  const selectAllMedia = () => {
    if (selectedMedia.length === currentFilteredMedia.length) {
      setSelectedMedia([])
    } else {
      setSelectedMedia(currentFilteredMedia.map((file) => file.id))
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Media Library</h1>
          <p className="text-gray-500">Manage your images, videos, and other media files</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-purple-600 hover:bg-purple-700">
                <Upload className="h-4 w-4 mr-2" />
                Upload Files
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Upload Files</DialogTitle>
                <DialogDescription>Upload images, videos, or other media files to your library.</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                  <Upload className="h-10 w-10 mx-auto text-gray-400 mb-4" />
                  <p className="text-sm text-gray-500 mb-2">Drag and drop files here, or click to browse</p>
                  <p className="text-xs text-gray-400">Supports: JPG, PNG, GIF, SVG, MP4, PDF (Max: 10MB)</p>
                  <Input id="file-upload" type="file" multiple className="hidden" />
                  <Button variant="outline" className="mt-4">
                    <Upload className="h-4 w-4 mr-2" />
                    Browse Files
                  </Button>
                </div>
              </div>
              <DialogFooter className="sm:justify-between">
                <div className="text-sm text-gray-500">0 files selected</div>
                <Button type="submit" className="bg-purple-600 hover:bg-purple-700">
                  Upload
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          <Button variant="outline">
            <FolderPlus className="h-4 w-4 mr-2" />
            New Folder
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Media Files</CardTitle>
          <CardDescription>View and manage all your media files</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row justify-between items-center mb-4 gap-4">
            <div className="relative w-full md:w-96">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <input
                type="search"
                placeholder="Search media files..."
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
                <option>All Types</option>
                <option>Images</option>
                <option>Videos</option>
                <option>Documents</option>
              </select>
              <div className="flex border rounded-md overflow-hidden">
                <Button
                  variant={viewMode === "grid" ? "default" : "ghost"}
                  size="sm"
                  className={viewMode === "grid" ? "bg-purple-600 hover:bg-purple-700" : ""}
                  onClick={() => setViewMode("grid")}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect x="3" y="3" width="7" height="7" />
                    <rect x="14" y="3" width="7" height="7" />
                    <rect x="14" y="14" width="7" height="7" />
                    <rect x="3" y="14" width="7" height="7" />
                  </svg>
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "ghost"}
                  size="sm"
                  className={viewMode === "list" ? "bg-purple-600 hover:bg-purple-700" : ""}
                  onClick={() => setViewMode("list")}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="8" y1="6" x2="21" y2="6" />
                    <line x1="8" y1="12" x2="21" y2="12" />
                    <line x1="8" y1="18" x2="21" y2="18" />
                    <line x1="3" y1="6" x2="3.01" y2="6" />
                    <line x1="3" y1="12" x2="3.01" y2="12" />
                    <line x1="3" y1="18" x2="3.01" y2="18" />
                  </svg>
                </Button>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between mb-4">
            <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
              <TabsList>
                <TabsTrigger value="all">All Files</TabsTrigger>
                <TabsTrigger value="properties">Properties</TabsTrigger>
                <TabsTrigger value="branding">Branding</TabsTrigger>
                <TabsTrigger value="backgrounds">Backgrounds</TabsTrigger>
                <TabsTrigger value="team">Team</TabsTrigger>
              </TabsList>
            </Tabs>

            {selectedMedia.length > 0 && (
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-500">{selectedMedia.length} selected</span>
                <Button variant="outline" size="sm" onClick={selectAllMedia}>
                  {selectedMedia.length === currentFilteredMedia.length ? "Deselect All" : "Select All"}
                </Button>
                <Button variant="outline" size="sm" className="text-red-600 hover:bg-red-50">
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete Selected
                </Button>
              </div>
            )}
          </div>

          {viewMode === "grid" ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {currentFilteredMedia.length === 0 ? (
                <div className="col-span-full text-center py-8 text-gray-500">No media files found</div>
              ) : (
                currentFilteredMedia.map((file) => (
                  <div
                    key={file.id}
                    className={`relative group border rounded-lg overflow-hidden ${
                      selectedMedia.includes(file.id) ? "ring-2 ring-purple-500" : ""
                    }`}
                    onClick={() => toggleMediaSelection(file.id)}
                  >
                    <div className="aspect-square bg-gray-100 relative">
                      {file.type.startsWith("image/") ? (
                        <img
                          src={file.url || "/placeholder.svg"}
                          alt={file.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="flex items-center justify-center h-full">
                          <ImageIcon className="h-12 w-12 text-gray-400" />
                        </div>
                      )}
                      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-200">
                        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon" className="h-8 w-8 bg-white text-gray-700">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>
                                <Eye className="h-4 w-4 mr-2" />
                                View Details
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Download className="h-4 w-4 mr-2" />
                                Download
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem className="text-red-600">
                                <Trash2 className="h-4 w-4 mr-2" />
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </div>
                    </div>
                    <div className="p-2">
                      <p className="text-sm font-medium truncate">{file.name}</p>
                      <div className="flex items-center justify-between mt-1">
                        <Badge variant="outline" className="text-xs">
                          {file.folder}
                        </Badge>
                        <span className="text-xs text-gray-500">{file.size}</span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          ) : (
            <div className="rounded-md border">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      <input
                        type="checkbox"
                        className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                        checked={
                          selectedMedia.length === currentFilteredMedia.length && currentFilteredMedia.length > 0
                        }
                        onChange={selectAllMedia}
                      />
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      File
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Folder
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Size
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Dimensions
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Uploaded
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {currentFilteredMedia.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="px-6 py-4 text-center text-gray-500">
                        No media files found
                      </td>
                    </tr>
                  ) : (
                    currentFilteredMedia.map((file) => (
                      <tr key={file.id} className={selectedMedia.includes(file.id) ? "bg-purple-50" : ""}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <input
                            type="checkbox"
                            className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                            checked={selectedMedia.includes(file.id)}
                            onChange={() => toggleMediaSelection(file.id)}
                          />
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10 bg-gray-100 rounded overflow-hidden">
                              {file.type.startsWith("image/") ? (
                                <img
                                  src={file.url || "/placeholder.svg"}
                                  alt={file.name}
                                  className="h-10 w-10 object-cover"
                                />
                              ) : (
                                <div className="flex items-center justify-center h-full">
                                  <ImageIcon className="h-5 w-5 text-gray-400" />
                                </div>
                              )}
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">{file.name}</div>
                              <div className="text-xs text-gray-500">{file.type}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <Badge variant="outline">{file.folder}</Badge>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{file.size}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{file.dimensions}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{file.uploadedAt}</div>
                          <div className="text-xs text-gray-500">by {file.uploadedBy}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>
                                <Eye className="h-4 w-4 mr-2" />
                                View Details
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Download className="h-4 w-4 mr-2" />
                                Download
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem className="text-red-600">
                                <Trash2 className="h-4 w-4 mr-2" />
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          )}

          <div className="flex items-center justify-between mt-4">
            <div className="text-sm text-gray-500">
              Showing {currentFilteredMedia.length} of {mediaFiles.length} files
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
