"use client"

import { useState, useRef, useEffect } from "react"
import { X } from "lucide-react"
import { AddPropertyForm } from "./add-property-form"

interface AddPropertyModalProps {
  isOpen: boolean
  onClose: () => void
}

export function AddPropertyModal({ isOpen, onClose }: AddPropertyModalProps) {
  const [isClosing, setIsClosing] = useState(false)
  const modalRef = useRef<HTMLDivElement>(null)

  // Handle escape key press
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        handleClose()
      }
    }

    if (isOpen) {
      document.addEventListener("keydown", handleEscape)
      // Prevent body scrolling when modal is open
      document.body.style.overflow = "hidden"
    }

    return () => {
      document.removeEventListener("keydown", handleEscape)
      // Restore body scrolling when modal is closed
      document.body.style.overflow = "auto"
    }
  }, [isOpen])

  // Handle click outside modal
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        handleClose()
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside)
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isOpen])

  const handleClose = () => {
    setIsClosing(true)
    setTimeout(() => {
      setIsClosing(false)
      onClose()
    }, 300) // Match this with the CSS transition duration
  }

  if (!isOpen && !isClosing) return null

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm transition-opacity duration-300 ${
        isClosing ? "opacity-0" : "opacity-100"
      }`}
    >
      <div
        ref={modalRef}
        className={`relative w-full max-w-5xl max-h-[90vh] bg-white rounded-xl shadow-2xl overflow-hidden transition-all duration-300 ${
          isClosing ? "scale-95 opacity-0" : "scale-100 opacity-100"
        }`}
      >
        <div className="flex justify-between items-center p-4 border-b border-gray-200">
          <h2 className="text-xl font-bold bg-gradient-to-r from-hovmart-purple to-hovmart-light bg-clip-text text-transparent">
            Add New Property
          </h2>
          <button
            onClick={handleClose}
            className="p-1 rounded-full hover:bg-gray-100 transition-colors"
            aria-label="Close modal"
          >
            <X className="h-6 w-6 text-gray-500" />
          </button>
        </div>

        <div className="overflow-y-auto max-h-[calc(90vh-4rem)] scrollbar-thin scrollbar-thumb-hovmart-purple scrollbar-track-gray-100">
          <div className="p-8 bg-gradient-to-b from-white to-gray-50">
            <div className="relative">
              {/* Decorative elements */}
              <div className="absolute -top-2 -left-2 w-20 h-20 bg-hovmart-purple/5 rounded-full blur-xl"></div>
              <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-hovmart-light/5 rounded-full blur-xl"></div>

              {/* Content with subtle border and shadow */}
              <div className="relative z-10 bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                <AddPropertyForm inModal={true} onSuccess={handleClose} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
