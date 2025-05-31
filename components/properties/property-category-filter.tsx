"use client"

import type React from "react"

import { useRef, useState, useEffect } from "react"
import {
  ChevronLeft,
  ChevronRight,
  Home,
  Mountain,
  Waves,
  Crown,
  Warehouse,
  Building,
  Droplet,
  Paintbrush,
  Trees,
  Leaf,
  PocketIcon as Pool,
  Trash2,
  Edit,
  AlertCircle,
} from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"

interface Category {
  id: string
  name: string
  icon: string
}

// Define categories with icons
const categories: Category[] = [
  { id: "all", name: "All", icon: "home" },
  { id: "amazing_views", name: "Amazing views", icon: "mountain" },
  { id: "beachfront", name: "Beachfront", icon: "waves" },
  { id: "luxury", name: "Luxury", icon: "crown" },
  { id: "cabins", name: "Cabins", icon: "warehouse" },
  { id: "mansions", name: "Mansions", icon: "building" },
  { id: "pools", name: "Amazing pools", icon: "pool" },
  { id: "lakefront", name: "Lakefront", icon: "droplet" },
  { id: "tiny_homes", name: "Tiny homes", icon: "home" },
  { id: "design", name: "Design", icon: "paintbrush" },
  { id: "countryside", name: "Countryside", icon: "trees" },
  { id: "tropical", name: "Tropical", icon: "leaf" },
]

interface PropertyCategoryFilterProps {
  activeCategory: string
  onCategoryChange: (category: string) => void
  isAdmin?: boolean
}

export function PropertyCategoryFilter({
  activeCategory,
  onCategoryChange,
  isAdmin = false,
}: PropertyCategoryFilterProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [showLeftArrow, setShowLeftArrow] = useState(false)
  const [showRightArrow, setShowRightArrow] = useState(true)

  const { toast } = useToast()
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [categoryToDelete, setCategoryToDelete] = useState<string | null>(null)

  // Check if arrows should be shown
  const checkArrows = () => {
    if (!scrollContainerRef.current) return

    const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current
    setShowLeftArrow(scrollLeft > 0)
    setShowRightArrow(scrollLeft + clientWidth < scrollWidth - 10) // 10px buffer
  }

  // Add scroll event listener
  useEffect(() => {
    const scrollContainer = scrollContainerRef.current
    if (scrollContainer) {
      scrollContainer.addEventListener("scroll", checkArrows)
      // Initial check
      checkArrows()
    }

    return () => {
      if (scrollContainer) {
        scrollContainer.removeEventListener("scroll", checkArrows)
      }
    }
  }, [])

  // Handle window resize
  useEffect(() => {
    const handleResize = () => checkArrows()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  // Scroll left
  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -300, behavior: "smooth" })
    }
  }

  // Scroll right
  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 300, behavior: "smooth" })
    }
  }

  // Handle category deletion
  const handleDeleteCategory = (categoryId: string, event: React.MouseEvent) => {
    event.stopPropagation()
    setCategoryToDelete(categoryId)
    setShowDeleteDialog(true)
  }

  // Confirm category deletion
  const confirmDeleteCategory = () => {
    if (categoryToDelete) {
      // In a real app, this would make an API call to delete the category
      toast({
        title: "Category deleted",
        description: `Category "${categories.find((c) => c.id === categoryToDelete)?.name}" has been deleted.`,
      })
      setShowDeleteDialog(false)
      setCategoryToDelete(null)
    }
  }

  // Edit category (would navigate to edit page in real app)
  const handleEditCategory = (categoryId: string, event: React.MouseEvent) => {
    event.stopPropagation()
    // In a real app, this would navigate to an edit page or open an edit modal
    toast({
      title: "Edit category",
      description: `Editing category "${categories.find((c) => c.id === categoryId)?.name}"`,
    })
  }

  // Function to render the appropriate icon
  const renderIcon = (iconName: string) => {
    switch (iconName) {
      case "home":
        return <Home size={20} />
      case "mountain":
        return <Mountain size={20} />
      case "waves":
        return <Waves size={20} />
      case "crown":
        return <Crown size={20} />
      case "warehouse":
        return <Warehouse size={20} />
      case "building":
        return <Building size={20} />
      case "pool":
        return <Pool size={20} />
      case "droplet":
        return <Droplet size={20} />
      case "paintbrush":
        return <Paintbrush size={20} />
      case "trees":
        return <Trees size={20} />
      case "leaf":
        return <Leaf size={20} />
      default:
        return <Home size={20} />
    }
  }

  return (
    <div className="relative">
      {/* Left scroll arrow */}
      {showLeftArrow && (
        <button
          onClick={scrollLeft}
          className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-white rounded-full shadow-md p-1.5 border border-gray-200"
          aria-label="Scroll left"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
      )}

      {/* Categories */}
      <div
        ref={scrollContainerRef}
        className="flex overflow-x-auto py-4 scrollbar-hide scroll-smooth"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none", scrollBehavior: "smooth" }}
      >
        <div className="flex space-x-8 px-4">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => onCategoryChange(category.id)}
              className={`flex flex-col items-center space-y-2 min-w-[56px] transition-opacity ${
                activeCategory === category.id ? "opacity-100" : "opacity-60 hover:opacity-100"
              } relative`}
            >
              <div className="relative h-6 w-6 flex items-center justify-center">{renderIcon(category.icon)}</div>
              <span className="text-xs whitespace-nowrap">{category.name}</span>
              <div
                className={`h-[2px] w-full bg-black transition-opacity ${
                  activeCategory === category.id ? "opacity-100" : "opacity-0"
                }`}
              ></div>

              {/* Admin controls */}
              {isAdmin && (
                <div className="absolute -top-2 -right-2 flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={(e) => handleEditCategory(category.id, e)}
                    className="bg-blue-100 text-blue-600 rounded-full p-1 hover:bg-blue-200"
                    aria-label={`Edit ${category.name} category`}
                  >
                    <Edit className="h-3 w-3" />
                  </button>
                  <button
                    onClick={(e) => handleDeleteCategory(category.id, e)}
                    className="bg-red-100 text-red-600 rounded-full p-1 hover:bg-red-200"
                    aria-label={`Delete ${category.name} category`}
                  >
                    <Trash2 className="h-3 w-3" />
                  </button>
                </div>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Right scroll arrow */}
      {showRightArrow && (
        <button
          onClick={scrollRight}
          className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-white rounded-full shadow-md p-1.5 border border-gray-200"
          aria-label="Scroll right"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      )}
      {/* Delete confirmation dialog */}
      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
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
            <Button variant="outline" onClick={() => setShowDeleteDialog(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={confirmDeleteCategory}>
              Delete Category
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
