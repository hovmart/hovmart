"use client"

import { useState, useEffect, useRef } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Search, MapPin, X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { format, addDays, isValid, parseISO } from "date-fns"

interface PropertySearchProps {
  className?: string
  variant?: "default" | "minimal" | "expanded"
  onSearch?: (searchParams: any) => void
}

export function PropertySearch({ className = "", variant = "default", onSearch }: PropertySearchProps) {
  const router = useRouter()
  const searchParams = useSearchParams()

  // Get initial values from URL params
  const initialLocation = searchParams?.get("location") || ""
  const initialCheckIn = searchParams?.get("checkIn") || ""
  const initialCheckOut = searchParams?.get("checkOut") || ""
  const initialGuests = searchParams?.get("guests") || ""

  const [location, setLocation] = useState(initialLocation)
  const [checkIn, setCheckIn] = useState<string>(initialCheckIn)
  const [checkOut, setCheckOut] = useState<string>(initialCheckOut)
  const [guests, setGuests] = useState(initialGuests || "1")
  const [activeField, setActiveField] = useState<string | null>(null)
  const [isSearching, setIsSearching] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)

  const searchContainerRef = useRef<HTMLDivElement>(null)
  const searchBarRef = useRef<HTMLDivElement>(null)
  const locationFieldRef = useRef<HTMLDivElement>(null)
  const dateFieldRef = useRef<HTMLDivElement>(null)
  const guestsFieldRef = useRef<HTMLDivElement>(null)

  // Guest selection
  const [adults, setAdults] = useState(1)
  const [children, setChildren] = useState(0)
  const [infants, setInfants] = useState(0)

  // Update guests count when adults/children change
  useEffect(() => {
    const total = adults + children
    setGuests(total.toString())
  }, [adults, children])

  // Close popups when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target as Node)) {
        setActiveField(null)
        setIsExpanded(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  // Handle search submission
  const handleSearch = () => {
    setIsSearching(true)

    // Build search params object
    const searchParamsObj = {
      location,
      checkIn,
      checkOut,
      guests: Number.parseInt(guests) || 0,
      guestDetails: {
        adults,
        children,
        infants,
      },
    }

    // Call onSearch callback if provided
    if (onSearch) {
      onSearch(searchParamsObj)
    }

    // Build query params for URL
    const params = new URLSearchParams()
    if (location) params.set("location", location)
    if (checkIn) params.set("checkIn", checkIn)
    if (checkOut) params.set("checkOut", checkOut)
    if (guests) params.set("guests", guests)

    // Navigate to search results if no onSearch callback
    if (!onSearch) {
      router.push(`/properties?${params.toString()}`)
    }

    setTimeout(() => {
      setIsSearching(false)
      setActiveField(null)
      setIsExpanded(false)
    }, 500)
  }

  // Handle date selection
  const handleDateChange = (startDate: Date | null, endDate: Date | null) => {
    if (startDate) {
      setCheckIn(format(startDate, "yyyy-MM-dd"))
    } else {
      setCheckIn("")
    }

    if (endDate) {
      setCheckOut(format(endDate, "yyyy-MM-dd"))
    } else {
      setCheckOut("")
    }
  }

  // Guest manipulation functions
  const incrementGuest = (type: "adults" | "children" | "infants") => {
    if (type === "adults") {
      if (adults < 16) setAdults(adults + 1)
    } else if (type === "children") {
      if (children < 10) setChildren(children + 1)
    } else {
      if (infants < 5) setInfants(infants + 1)
    }
  }

  const decrementGuest = (type: "adults" | "children" | "infants") => {
    if (type === "adults") {
      if (adults > 1) setAdults(adults - 1)
    } else if (type === "children") {
      if (children > 0) setChildren(children - 1)
    } else {
      if (infants > 0) setInfants(infants - 1)
    }
  }

  // Clear individual fields
  const clearLocation = () => {
    setLocation("")
  }

  const clearDates = () => {
    setCheckIn("")
    setCheckOut("")
  }

  const clearGuests = () => {
    setAdults(1)
    setChildren(0)
    setInfants(0)
  }

  // Format dates for display
  const formatDisplayDate = (dateString: string) => {
    if (!dateString) return ""
    try {
      const date = parseISO(dateString)
      if (!isValid(date)) return ""
      return format(date, "MMM d")
    } catch (e) {
      return ""
    }
  }

  // Handle field activation
  const handleFieldClick = (field: string) => {
    setActiveField(field)
    setIsExpanded(true)
  }

  // Handle window resize for responsive behavior
  useEffect(() => {
    const handleResize = () => {
      // Close expanded view on mobile when resizing
      if (window.innerWidth < 640) {
        setIsExpanded(false)
        setActiveField(null)
      }
    }

    window.addEventListener("resize", handleResize)
    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  return (
    <div className={`${className}`} ref={searchContainerRef}>
      {/* Airbnb-style search bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center h-auto sm:h-14 rounded-full border border-gray-200 shadow-sm transition-all duration-300 bg-white overflow-hidden">
        {/* Where */}
        <div
          ref={locationFieldRef}
          className={`relative flex-1 min-h-[56px] sm:h-full border-b sm:border-b-0 sm:border-r border-gray-200 ${
            activeField === "location" ? "bg-gray-100" : ""
          }`}
          onClick={() => handleFieldClick("location")}
        >
          <div className="h-full flex flex-col justify-center px-6 sm:px-4 py-3 sm:py-0 cursor-pointer">
            <div className="text-xs font-semibold">Where</div>
            <div className="text-sm truncate text-gray-500">{location || "Search destinations"}</div>
          </div>
        </div>

        {/* Check in */}
        <div
          ref={dateFieldRef}
          className={`relative flex-1 min-h-[56px] sm:h-full border-b sm:border-b-0 sm:border-r border-gray-200 ${
            activeField === "dates" && checkIn ? "bg-gray-100" : ""
          }`}
          onClick={() => handleFieldClick("dates")}
        >
          <div className="h-full flex flex-col justify-center px-6 sm:px-4 py-3 sm:py-0 cursor-pointer">
            <div className="text-xs font-semibold">Check in</div>
            <div className="text-sm truncate text-gray-500">{checkIn ? formatDisplayDate(checkIn) : "Add dates"}</div>
          </div>
        </div>

        {/* Check out */}
        <div
          className={`relative flex-1 min-h-[56px] sm:h-full border-b sm:border-b-0 sm:border-r border-gray-200 ${
            activeField === "dates" && checkOut ? "bg-gray-100" : ""
          }`}
          onClick={() => handleFieldClick("dates")}
        >
          <div className="h-full flex flex-col justify-center px-6 sm:px-4 py-3 sm:py-0 cursor-pointer">
            <div className="text-xs font-semibold">Check out</div>
            <div className="text-sm truncate text-gray-500">{checkOut ? formatDisplayDate(checkOut) : "Add dates"}</div>
          </div>
        </div>

        {/* Who */}
        <div
          ref={guestsFieldRef}
          className={`relative flex-1 min-h-[56px] sm:h-full ${activeField === "guests" ? "bg-gray-100" : ""}`}
          onClick={() => handleFieldClick("guests")}
        >
          <div className="h-full flex flex-col justify-center px-6 sm:px-4 py-3 sm:py-0 cursor-pointer">
            <div className="text-xs font-semibold">Who</div>
            <div className="text-sm truncate text-gray-500">
              {Number.parseInt(guests) > 1 ? `${guests} guests` : "Add guests"}
              {infants > 0 ? `, ${infants} infant${infants !== 1 ? "s" : ""}` : ""}
            </div>
          </div>
        </div>

        {/* Search button */}
        <div className="flex justify-center p-3 sm:p-0">
          <button
            className="bg-hovmart-purple text-white p-3 rounded-full flex items-center justify-center hover:bg-hovmart-purple/90 transition-colors w-full sm:w-auto"
            onClick={handleSearch}
            disabled={isSearching}
            aria-label="Search properties"
          >
            {isSearching ? (
              <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <Search className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>

      {/* Expanded search UI */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute left-0 right-0 top-full mt-2 bg-white rounded-3xl shadow-xl border border-gray-200 overflow-hidden z-50 max-h-[80vh] overflow-y-auto"
            style={{
              width: "100%",
              maxWidth: "100vw",
            }}
          >
            {activeField === "location" && (
              <div className="p-4 sm:p-6">
                <h3 className="text-lg font-semibold mb-4">Where to?</h3>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="Search destinations"
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-hovmart-purple/20 focus:border-hovmart-purple"
                  />
                  {location && (
                    <button
                      onClick={clearLocation}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 rounded-full hover:bg-gray-100"
                    >
                      <X className="h-4 w-4 text-gray-400" />
                    </button>
                  )}
                </div>

                {/* Popular destinations */}
                <div className="mt-6">
                  <h4 className="text-sm font-medium text-gray-500 mb-3">Popular destinations</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {["Lagos, Nigeria", "Abuja, Nigeria", "Port Harcourt, Nigeria", "Ibadan, Nigeria"].map((city) => (
                      <button
                        key={city}
                        onClick={() => {
                          setLocation(city)
                          setActiveField("dates")
                        }}
                        className="flex items-center p-3 border border-gray-200 rounded-lg hover:border-hovmart-purple/50 hover:bg-gray-50 transition-colors"
                      >
                        <MapPin className="h-4 w-4 text-hovmart-purple mr-2" />
                        <span className="text-sm">{city}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeField === "dates" && (
              <div className="p-4 sm:p-6">
                <h3 className="text-lg font-semibold mb-4">When's your trip?</h3>

                {/* Date picker */}
                <div className="bg-white rounded-lg border border-gray-200 p-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Check in</label>
                      <input
                        type="date"
                        value={checkIn}
                        min={format(new Date(), "yyyy-MM-dd")}
                        onChange={(e) => {
                          setCheckIn(e.target.value)
                          // If check-out is not set or is before check-in, set it to check-in + 1 day
                          if (!checkOut || parseISO(e.target.value) >= parseISO(checkOut)) {
                            const nextDay = addDays(parseISO(e.target.value), 1)
                            setCheckOut(format(nextDay, "yyyy-MM-dd"))
                          }
                        }}
                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-hovmart-purple/20 focus:border-hovmart-purple"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Check out</label>
                      <input
                        type="date"
                        value={checkOut}
                        min={
                          checkIn
                            ? format(addDays(parseISO(checkIn), 1), "yyyy-MM-dd")
                            : format(addDays(new Date(), 1), "yyyy-MM-dd")
                        }
                        onChange={(e) => setCheckOut(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-hovmart-purple/20 focus:border-hovmart-purple"
                      />
                    </div>
                  </div>

                  {/* Quick date selections */}
                  <div className="mt-4">
                    <h4 className="text-sm font-medium text-gray-500 mb-2">Quick select</h4>
                    <div className="flex flex-wrap gap-2">
                      {[
                        { label: "This weekend", days: [5, 7] },
                        { label: "Next weekend", days: [12, 14] },
                        { label: "Week-long stay", days: [0, 7] },
                        { label: "Month-long stay", days: [0, 30] },
                      ].map((option) => {
                        const start = addDays(new Date(), option.days[0])
                        const end = addDays(new Date(), option.days[1])
                        return (
                          <button
                            key={option.label}
                            onClick={() => {
                              setCheckIn(format(start, "yyyy-MM-dd"))
                              setCheckOut(format(end, "yyyy-MM-dd"))
                            }}
                            className="px-3 py-1.5 text-sm border border-gray-200 rounded-full hover:border-hovmart-purple/50 hover:bg-gray-50 transition-colors"
                          >
                            {option.label}
                          </button>
                        )
                      })}
                    </div>
                  </div>

                  <div className="flex justify-between mt-6">
                    <button onClick={clearDates} className="text-hovmart-purple underline text-sm font-medium">
                      Clear dates
                    </button>
                    <button
                      onClick={() => setActiveField("guests")}
                      className="bg-hovmart-purple text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-hovmart-purple/90 transition-colors"
                    >
                      Next
                    </button>
                  </div>
                </div>
              </div>
            )}

            {activeField === "guests" && (
              <div className="p-4 sm:p-6">
                <h3 className="text-lg font-semibold mb-4">Who's coming?</h3>

                {/* Adults */}
                <div className="flex items-center justify-between py-4 border-b border-gray-200">
                  <div>
                    <div className="font-medium">Adults</div>
                    <div className="text-sm text-gray-500">Ages 13+</div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <button
                      onClick={() => decrementGuest("adults")}
                      disabled={adults <= 1}
                      className={`w-8 h-8 rounded-full flex items-center justify-center border ${
                        adults <= 1
                          ? "border-gray-200 text-gray-300 cursor-not-allowed"
                          : "border-gray-400 text-gray-600 hover:border-gray-900"
                      } transition-colors`}
                    >
                      <span className="text-lg font-medium">-</span>
                    </button>
                    <span className="w-6 text-center">{adults}</span>
                    <button
                      onClick={() => incrementGuest("adults")}
                      disabled={adults >= 16}
                      className={`w-8 h-8 rounded-full flex items-center justify-center border ${
                        adults >= 16
                          ? "border-gray-200 text-gray-300 cursor-not-allowed"
                          : "border-gray-400 text-gray-600 hover:border-gray-900"
                      } transition-colors`}
                    >
                      <span className="text-lg font-medium">+</span>
                    </button>
                  </div>
                </div>

                {/* Children */}
                <div className="flex items-center justify-between py-4 border-b border-gray-200">
                  <div>
                    <div className="font-medium">Children</div>
                    <div className="text-sm text-gray-500">Ages 2-12</div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <button
                      onClick={() => decrementGuest("children")}
                      disabled={children <= 0}
                      className={`w-8 h-8 rounded-full flex items-center justify-center border ${
                        children <= 0
                          ? "border-gray-200 text-gray-300 cursor-not-allowed"
                          : "border-gray-400 text-gray-600 hover:border-gray-900"
                      } transition-colors`}
                    >
                      <span className="text-lg font-medium">-</span>
                    </button>
                    <span className="w-6 text-center">{children}</span>
                    <button
                      onClick={() => incrementGuest("children")}
                      disabled={children >= 10}
                      className={`w-8 h-8 rounded-full flex items-center justify-center border ${
                        children >= 10
                          ? "border-gray-200 text-gray-300 cursor-not-allowed"
                          : "border-gray-400 text-gray-600 hover:border-gray-900"
                      } transition-colors`}
                    >
                      <span className="text-lg font-medium">+</span>
                    </button>
                  </div>
                </div>

                {/* Infants */}
                <div className="flex items-center justify-between py-4">
                  <div>
                    <div className="font-medium">Infants</div>
                    <div className="text-sm text-gray-500">Under 2</div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <button
                      onClick={() => decrementGuest("infants")}
                      disabled={infants <= 0}
                      className={`w-8 h-8 rounded-full flex items-center justify-center border ${
                        infants <= 0
                          ? "border-gray-200 text-gray-300 cursor-not-allowed"
                          : "border-gray-400 text-gray-600 hover:border-gray-900"
                      } transition-colors`}
                    >
                      <span className="text-lg font-medium">-</span>
                    </button>
                    <span className="w-6 text-center">{infants}</span>
                    <button
                      onClick={() => incrementGuest("infants")}
                      disabled={infants >= 5}
                      className={`w-8 h-8 rounded-full flex items-center justify-center border ${
                        infants >= 5
                          ? "border-gray-200 text-gray-300 cursor-not-allowed"
                          : "border-gray-400 text-gray-600 hover:border-gray-900"
                      } transition-colors`}
                    >
                      <span className="text-lg font-medium">+</span>
                    </button>
                  </div>
                </div>

                <div className="mt-6 flex justify-between">
                  <button className="text-hovmart-purple underline font-medium" onClick={clearGuests}>
                    Clear
                  </button>
                  <button
                    className="bg-hovmart-purple text-white px-6 py-3 rounded-lg font-medium hover:bg-hovmart-purple/90 transition-colors"
                    onClick={handleSearch}
                  >
                    Search
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
