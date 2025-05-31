"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Image from "next/image"
import { X, ChevronLeft, ChevronRight } from "lucide-react"

interface PropertyGalleryProps {
  images: string[]
  title: string
  isOpen: boolean
  onClose: () => void
  onOpen: () => void
}

export function PropertyGallery({ images, title, isOpen, onClose, onOpen }: PropertyGalleryProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [touchStart, setTouchStart] = useState(0)
  const [touchEnd, setTouchEnd] = useState(0)

  // Reset current image when gallery is opened
  useEffect(() => {
    if (isOpen) {
      setCurrentImageIndex(0)
      // Prevent body scroll when gallery is open
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "auto"
    }

    return () => {
      document.body.style.overflow = "auto"
    }
  }, [isOpen])

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return

      if (e.key === "Escape") {
        onClose()
      } else if (e.key === "ArrowLeft") {
        prevImage()
      } else if (e.key === "ArrowRight") {
        nextImage()
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => {
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [isOpen, onClose])

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))
  }

  // Handle touch events for swiping
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 100) {
      // Swipe left
      nextImage()
    } else if (touchStart - touchEnd < -100) {
      // Swipe right
      prevImage()
    }
  }

  // If there are no images, use a placeholder
  const displayImages = images.length > 0 ? images : ["/diverse-property-showcase.png"]

  // For the grid view, ensure we have at least 5 images (with duplicates if needed)
  const gridImages = [...displayImages]
  while (gridImages.length < 5) {
    gridImages.push(...displayImages)
  }

  return (
    <>
      {/* Gallery Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-2 rounded-xl overflow-hidden h-[300px] md:h-[450px]">
        {/* Main Image */}
        <div className="relative col-span-1 md:col-span-2 md:row-span-2 cursor-pointer" onClick={onOpen}>
          <Image
            src={gridImages[0] || "/placeholder.svg"}
            alt={`${title} - Main Image`}
            fill
            className="object-cover hover:opacity-95 transition-opacity"
          />
        </div>

        {/* Secondary Images */}
        {gridImages.slice(1, 5).map((image, index) => (
          <div key={index} className="relative hidden md:block cursor-pointer" onClick={onOpen}>
            <Image
              src={image || "/placeholder.svg"}
              alt={`${title} - Image ${index + 2}`}
              fill
              className="object-cover hover:opacity-95 transition-opacity"
            />
          </div>
        ))}

        {/* Show All Photos Button */}
        <button
          onClick={onOpen}
          className="absolute bottom-4 right-4 bg-white rounded-lg px-4 py-2 text-sm font-medium shadow-md hover:shadow-lg transition-shadow"
        >
          Show all photos
        </button>
      </div>

      {/* Fullscreen Gallery */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex flex-col">
          {/* Gallery Header */}
          <div className="p-4 flex items-center justify-between text-white">
            <div className="text-sm">
              {currentImageIndex + 1} / {displayImages.length}
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-white/10 transition-colors"
              aria-label="Close gallery"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* Gallery Content */}
          <div
            className="flex-1 flex items-center justify-center relative"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {/* Previous Button */}
            <button
              onClick={prevImage}
              className="absolute left-4 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors z-10"
              aria-label="Previous image"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>

            {/* Image */}
            <div className="relative w-full h-full max-w-4xl max-h-[80vh] mx-auto">
              <Image
                src={displayImages[currentImageIndex] || "/placeholder.svg"}
                alt={`${title} - Image ${currentImageIndex + 1}`}
                fill
                className="object-contain"
              />
            </div>

            {/* Next Button */}
            <button
              onClick={nextImage}
              className="absolute right-4 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors z-10"
              aria-label="Next image"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </div>

          {/* Thumbnails */}
          <div className="p-4 overflow-x-auto">
            <div className="flex space-x-2">
              {displayImages.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`relative w-16 h-16 flex-shrink-0 rounded-md overflow-hidden ${
                    currentImageIndex === index ? "ring-2 ring-white" : "opacity-70"
                  }`}
                >
                  <Image
                    src={image || "/placeholder.svg"}
                    alt={`Thumbnail ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
