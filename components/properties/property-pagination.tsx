"use client"

import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react"

interface PropertyPaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

export function PropertyPagination({ currentPage, totalPages, onPageChange }: PropertyPaginationProps) {
  // Generate page numbers to display
  const getPageNumbers = () => {
    const pages = []

    // Always show first page
    pages.push(1)

    // Calculate range around current page
    const rangeStart = Math.max(2, currentPage - 1)
    const rangeEnd = Math.min(totalPages - 1, currentPage + 1)

    // Add ellipsis after first page if needed
    if (rangeStart > 2) {
      pages.push("ellipsis1")
    }

    // Add pages in range
    for (let i = rangeStart; i <= rangeEnd; i++) {
      pages.push(i)
    }

    // Add ellipsis before last page if needed
    if (rangeEnd < totalPages - 1) {
      pages.push("ellipsis2")
    }

    // Always show last page if more than 1 page
    if (totalPages > 1) {
      pages.push(totalPages)
    }

    return pages
  }

  const pageNumbers = getPageNumbers()

  return (
    <div className="flex items-center justify-center space-x-1 mt-8">
      {/* Previous button */}
      <button
        onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`p-2 rounded-md flex items-center justify-center ${
          currentPage === 1 ? "text-gray-400 cursor-not-allowed" : "text-gray-700 hover:bg-gray-100"
        }`}
        aria-label="Previous page"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>

      {/* Page numbers */}
      {pageNumbers.map((page, index) => {
        if (page === "ellipsis1" || page === "ellipsis2") {
          return (
            <span key={`ellipsis-${index}`} className="w-10 h-10 flex items-center justify-center text-gray-500">
              <MoreHorizontal className="h-5 w-5" />
            </span>
          )
        }

        return (
          <button
            key={index}
            onClick={() => onPageChange(page as number)}
            className={`w-10 h-10 rounded-md flex items-center justify-center ${
              currentPage === page ? "bg-hovmart-purple text-white" : "text-gray-700 hover:bg-gray-100"
            }`}
            aria-label={`Page ${page}`}
            aria-current={currentPage === page ? "page" : undefined}
          >
            {page}
          </button>
        )
      })}

      {/* Next button */}
      <button
        onClick={() => currentPage < totalPages && onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`p-2 rounded-md flex items-center justify-center ${
          currentPage === totalPages ? "text-gray-400 cursor-not-allowed" : "text-gray-700 hover:bg-gray-100"
        }`}
        aria-label="Next page"
      >
        <ChevronRight className="h-5 w-5" />
      </button>
    </div>
  )
}
