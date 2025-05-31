"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Search, MapPin, X } from "lucide-react"

interface LocationAutocompleteProps {
  value: string
  onChange: (value: string) => void
  onSelect: (value: string) => void
  onFocus?: () => void
  containerRef?: React.RefObject<HTMLDivElement>
}

// Sample location suggestions
const SAMPLE_LOCATIONS = [
  "Lagos, Nigeria",
  "Abuja, Nigeria",
  "Port Harcourt, Nigeria",
  "Ibadan, Nigeria",
  "Kano, Nigeria",
  "Calabar, Nigeria",
  "Enugu, Nigeria",
  "Uyo, Nigeria",
  "Owerri, Nigeria",
  "Kaduna, Nigeria",
  "Lekki, Lagos",
  "Victoria Island, Lagos",
  "Ikoyi, Lagos",
  "Ikeja, Lagos",
  "Asokoro, Abuja",
  "Maitama, Abuja",
  "Wuse, Abuja",
  "Garki, Abuja",
]

export function LocationAutocomplete({ value, onChange, onSelect, onFocus, containerRef }: LocationAutocompleteProps) {
  const [suggestions, setSuggestions] = useState<string[]>([])
  const [isOpen, setIsOpen] = useState(false)
  const [recentSearches, setRecentSearches] = useState<string[]>([])
  const inputRef = useRef<HTMLInputElement>(null)

  // Load recent searches from localStorage on mount
  useEffect(() => {
    const savedSearches = localStorage.getItem("recentLocationSearches")
    if (savedSearches) {
      try {
        setRecentSearches(JSON.parse(savedSearches))
      } catch (e) {
        console.error("Error parsing recent searches:", e)
      }
    }
  }, [])

  // Filter suggestions based on input
  useEffect(() => {
    // Check if value is defined before calling trim()
    if (!value || value.trim() === "") {
      setSuggestions([])
      return
    }

    const query = value.toLowerCase()
    const filtered = SAMPLE_LOCATIONS.filter((location) => location.toLowerCase().includes(query))
    setSuggestions(filtered.slice(0, 5))
    setIsOpen(true)
  }, [value])

  // Handle input focus
  const handleFocus = () => {
    if (onFocus) onFocus()
    setIsOpen(true)
  }

  // Handle suggestion selection
  const handleSelect = (location: string) => {
    onSelect(location)
    setIsOpen(false)

    // Save to recent searches
    if (!recentSearches.includes(location)) {
      const newRecentSearches = [location, ...recentSearches.slice(0, 4)]
      setRecentSearches(newRecentSearches)
      localStorage.setItem("recentLocationSearches", JSON.stringify(newRecentSearches))
    }
  }

  // Handle click outside to close suggestions
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        inputRef.current &&
        !inputRef.current.contains(event.target as Node) &&
        containerRef?.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [containerRef])

  return (
    <div className="relative w-full">
      <div className="relative">
        <input
          ref={inputRef}
          type="text"
          value={value || ""}
          onChange={(e) => onChange(e.target.value)}
          onFocus={handleFocus}
          placeholder="Search locations..."
          className="w-full py-2 pl-8 pr-3 text-sm bg-transparent border-none focus:outline-none"
          aria-label="Search locations"
        />
        <Search className="absolute left-0 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
        {value && (
          <button
            onClick={() => onChange("")}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 p-1 rounded-full hover:bg-gray-100"
            aria-label="Clear search"
          >
            <X className="h-4 w-4 text-gray-400" />
          </button>
        )}
      </div>

      {isOpen && (
        <div className="absolute left-0 right-0 mt-1 bg-white rounded-lg shadow-lg border border-gray-200 z-50 max-h-60 overflow-y-auto">
          {suggestions.length > 0 ? (
            <div className="py-2">
              <div className="px-3 py-1.5 text-xs font-medium text-gray-500 uppercase tracking-wider">Suggestions</div>
              {suggestions.map((location, index) => (
                <button
                  key={index}
                  className="flex items-center w-full px-3 py-2 text-sm text-left hover:bg-gray-100"
                  onClick={() => handleSelect(location)}
                >
                  <MapPin className="h-4 w-4 text-gray-400 mr-2 flex-shrink-0" />
                  <span>{location}</span>
                </button>
              ))}
            </div>
          ) : value && value.trim() === "" && recentSearches.length > 0 ? (
            <div className="py-2">
              <div className="px-3 py-1.5 text-xs font-medium text-gray-500 uppercase tracking-wider">
                Recent Searches
              </div>
              {recentSearches.map((location, index) => (
                <button
                  key={index}
                  className="flex items-center w-full px-3 py-2 text-sm text-left hover:bg-gray-100"
                  onClick={() => handleSelect(location)}
                >
                  <MapPin className="h-4 w-4 text-gray-400 mr-2 flex-shrink-0" />
                  <span>{location}</span>
                </button>
              ))}
            </div>
          ) : value && value.trim() !== "" ? (
            <div className="p-3 text-center text-sm text-gray-500">No locations found</div>
          ) : null}
        </div>
      )}
    </div>
  )
}
