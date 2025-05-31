"use client"

import { useState } from "react"
import {
  Edit,
  Eye,
  MoreHorizontal,
  Plus,
  Search,
  Trash2,
  AlertCircle,
  Tag,
  Upload,
  ImageIcon,
  ArrowUpDown,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Checkbox } from "@/components/ui/checkbox"
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
import { categories } from "../properties/property-categories-data"

export default function CategoryManagement() {
  const { toast } = useToast()
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [categoryToDelete, setCategoryToDelete] = useState<string | null>(null)
  const [isAddEditDialogOpen, setIsAddEditDialogOpen] = useState(false)
  const [editingCategory, setEditingCategory] = useState<any | null>(null)
  const [sortBy, setSortBy] = useState<string>("name")
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc")

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedCategories(categories.map((category) => category.id))
    } else {
      setSelectedCategories([])
    }
  }

  const handleSelectCategory = (categoryId: string, checked: boolean) => {
    if (checked) {
      setSelectedCategories([...selectedCategories, categoryId])
    } else {
      setSelectedCategories(selectedCategories.filter((id) => id !== categoryId))
    }
  }

  const openDeleteDialog = (categoryId: string) => {
    setCategoryToDelete(categoryId)
    setIsDeleteDialogOpen(true)
  }

  const handleDeleteCategory = () => {
    // In a real app, this would make an API call
    toast({
      title: "Category deleted",
      description: `Category ${categoryToDelete} has been deleted.`,
    })
    setIsDeleteDialogOpen(false)
  }

  const openAddEditDialog = (category: any = null) => {
    setEditingCategory(category)
    setIsAddEditDialogOpen(true)
  }

  const handleSaveCategory = () => {
    // In a real app, this would make an API call
    toast({
      title: editingCategory ? "Category updated" : "Category added",
      description: `Category has been ${editingCategory ? "updated" : "added"} successfully.`,
    })
    setIsAddEditDialogOpen(false)
    setEditingCategory(null)
  }

  const toggleSort = (column: string) => {
    if (sortBy === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortBy(column)
      setSortDirection("asc")
    }
  }

  const filteredCategories = categories
    .filter((category) => {
      if (searchQuery && !category.name.toLowerCase().includes(searchQuery.toLowerCase())) {
        return false
      }
      return true
    })
    .sort((a, b) => {
      let comparison = 0

      switch (sortBy) {
        case "name":
          comparison = a.name.localeCompare(b.name)
          break
        case "count":
          comparison = a.count - b.count
          break
        case "featured":
          comparison = a.featured === b.featured ? 0 : a.featured ? -1 : 1
          break
        default:
          comparison = 0
      }

      return sortDirection === "asc" ? comparison : -comparison
    })

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Property Categories</h1>
          <p className="text-gray-500">Manage your property categories</p>
        </div>
        <div className="flex items-center gap-2">
          <Button className="bg-purple-600 hover:bg-purple-700" onClick={() => openAddEditDialog()}>
            <Plus className="mr-2 h-4 w-4" />
            Add Category
          </Button>
          <Button variant="outline">
            <Upload className="mr-2 h-4 w-4" />
            Import
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
                  placeholder="Search categories..."
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            <div className="flex items-center gap-2">
              {selectedCategories.length > 0 && (
                <>
                  <span className="text-sm text-gray-500">{selectedCategories.length} selected</span>
                  <Button variant="outline" size="sm">
                    <Tag className="mr-2 h-4 w-4" />
                    Feature
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
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12">
                    <Checkbox
                      checked={selectedCategories.length === categories.length}
                      onCheckedChange={handleSelectAll}
                    />
                  </TableHead>
                  <TableHead className="w-[300px]">
                    <div className="flex items-center cursor-pointer" onClick={() => toggleSort("name")}>
                      Category
                      <ArrowUpDown className="ml-2 h-4 w-4" />
                    </div>
                  </TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>
                    <div className="flex items-center cursor-pointer" onClick={() => toggleSort("count")}>
                      Properties
                      <ArrowUpDown className="ml-2 h-4 w-4" />
                    </div>
                  </TableHead>
                  <TableHead>
                    <div className="flex items-center cursor-pointer" onClick={() => toggleSort("featured")}>
                      Featured
                      <ArrowUpDown className="ml-2 h-4 w-4" />
                    </div>
                  </TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCategories.map((category) => (
                  <TableRow key={category.id}>
                    <TableCell>
                      <Checkbox
                        checked={selectedCategories.includes(category.id)}
                        onCheckedChange={(checked) => handleSelectCategory(category.id, !!checked)}
                      />
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded overflow-hidden">
                          <img
                            src={category.image || "/placeholder.svg"}
                            alt={category.name}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div>
                          <p className="font-medium">{category.name}</p>
                          <p className="text-xs text-gray-500">ID: {category.id}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <p className="text-sm text-gray-700 line-clamp-2">{category.description}</p>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{category.count}</Badge>
                    </TableCell>
                    <TableCell>
                      {category.featured ? (
                        <Badge className="bg-purple-100 text-purple-800">Featured</Badge>
                      ) : (
                        <span className="text-gray-500 text-sm">-</span>
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
                          <DropdownMenuItem>
                            <Eye className="mr-2 h-4 w-4" />
                            View Properties
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => openAddEditDialog(category)}>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-red-600" onClick={() => openDeleteDialog(category.id)}>
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete
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
            Showing {filteredCategories.length} of {categories.length} categories
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

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Category</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this category? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <div className="flex items-center gap-4 py-4">
            <div className="bg-red-100 p-3 rounded-full">
              <AlertCircle className="h-6 w-6 text-red-600" />
            </div>
            <div>
              <p className="font-medium">
                {categoryToDelete ? categories.find((c) => c.id === categoryToDelete)?.name : ""}
              </p>
              <p className="text-sm text-gray-500">This will remove the category from all property listings.</p>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeleteCategory}>
              Delete Category
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add/Edit Category Dialog */}
      <Dialog open={isAddEditDialogOpen} onOpenChange={setIsAddEditDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>{editingCategory ? "Edit Category" : "Add New Category"}</DialogTitle>
            <DialogDescription>
              {editingCategory
                ? "Update the details for this category."
                : "Fill in the details to create a new property category."}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="name" className="text-right text-sm font-medium">
                Name
              </label>
              <Input
                id="name"
                defaultValue={editingCategory?.name || ""}
                className="col-span-3"
                placeholder="e.g., Luxury Apartments"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="id" className="text-right text-sm font-medium">
                ID
              </label>
              <Input
                id="id"
                defaultValue={editingCategory?.id || ""}
                className="col-span-3"
                placeholder="e.g., luxury_apartments"
              />
            </div>
            <div className="grid grid-cols-4 items-start gap-4">
              <label htmlFor="description" className="text-right text-sm font-medium pt-2">
                Description
              </label>
              <Textarea
                id="description"
                defaultValue={editingCategory?.description || ""}
                className="col-span-3"
                placeholder="Describe this category..."
                rows={3}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label className="text-right text-sm font-medium">Image</label>
              <div className="col-span-3 flex items-center gap-4">
                {editingCategory?.image && (
                  <div className="h-16 w-16 rounded overflow-hidden">
                    <img
                      src={editingCategory.image || "/placeholder.svg"}
                      alt={editingCategory.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                )}
                <Button variant="outline" className="h-16 w-16 flex flex-col items-center justify-center">
                  <ImageIcon className="h-6 w-6 mb-1" />
                  <span className="text-xs">Upload</span>
                </Button>
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="featured" className="text-right text-sm font-medium">
                Featured
              </label>
              <div className="col-span-3">
                <Checkbox id="featured" defaultChecked={editingCategory?.featured || false} />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveCategory}>{editingCategory ? "Update Category" : "Add Category"}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
