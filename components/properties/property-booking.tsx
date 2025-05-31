"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Calendar, Users, Star, ChevronDown, ChevronUp, Check, AlertCircle } from "lucide-react"

interface PropertyBookingProps {
  price: number
  rating: number
  reviewCount: number
  maxGuests: number
}

export function PropertyBooking({ price, rating, reviewCount, maxGuests }: PropertyBookingProps) {
  const [checkIn, setCheckIn] = useState("")
  const [checkOut, setCheckOut] = useState("")
  const [guests, setGuests] = useState(1)
  const [showGuestSelector, setShowGuestSelector] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [bookingSuccess, setBookingSuccess] = useState(false)
  const [validationError, setValidationError] = useState("")
  const [availableDates, setAvailableDates] = useState<string[]>([])

  // Set minimum date for check-in to today
  const today = new Date().toISOString().split("T")[0]

  // Simulate fetching available dates
  useEffect(() => {
    // In a real app, this would be an API call
    const generateAvailableDates = () => {
      const dates: string[] = []
      const currentDate = new Date()

      // Generate dates for the next 90 days
      for (let i = 0; i < 90; i++) {
        const date = new Date(currentDate)
        date.setDate(currentDate.getDate() + i)

        // Randomly mark some dates as unavailable (for demo purposes)
        if (Math.random() > 0.2) {
          dates.push(date.toISOString().split("T")[0])
        }
      }

      return dates
    }

    setAvailableDates(generateAvailableDates())
  }, [])

  // Calculate total price (for demo purposes)
  const calculateTotal = () => {
    if (!checkIn || !checkOut) return { nights: 0, subtotal: 0, serviceFee: 0, total: 0 }

    const start = new Date(checkIn)
    const end = new Date(checkOut)
    const nights = Math.round((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24))

    if (nights <= 0) return { nights: 0, subtotal: 0, serviceFee: 0, total: 0 }

    const subtotal = price * nights
    const serviceFee = Math.round(subtotal * 0.12) // 12% service fee
    const total = subtotal + serviceFee

    return { nights, subtotal, serviceFee, total }
  }

  const { nights, subtotal, serviceFee, total } = calculateTotal()

  const handleCheckInChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newCheckIn = e.target.value
    setCheckIn(newCheckIn)
    setValidationError("")
    setBookingSuccess(false)

    // If check-out is before new check-in, update check-out
    if (checkOut && new Date(checkOut) <= new Date(newCheckIn)) {
      const nextDay = new Date(newCheckIn)
      nextDay.setDate(nextDay.getDate() + 1)
      setCheckOut(nextDay.toISOString().split("T")[0])
    }
  }

  const handleCheckOutChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newCheckOut = e.target.value
    setCheckOut(newCheckOut)
    setValidationError("")
    setBookingSuccess(false)

    // Validate that checkout is after checkin
    if (checkIn && new Date(newCheckOut) <= new Date(checkIn)) {
      setValidationError("Check-out date must be after check-in date")
    }
  }

  const isDateAvailable = (date: string) => {
    return availableDates.includes(date)
  }

  const handleBooking = () => {
    // Validate inputs
    if (!checkIn || !checkOut) {
      setValidationError("Please select both check-in and check-out dates")
      return
    }

    if (new Date(checkOut) <= new Date(checkIn)) {
      setValidationError("Check-out date must be after check-in date")
      return
    }

    if (!isDateAvailable(checkIn) || !isDateAvailable(checkOut)) {
      setValidationError("One or more selected dates are not available")
      return
    }

    // Simulate booking process
    setIsSubmitting(true)
    setValidationError("")

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      setBookingSuccess(true)

      // In a real app, you would redirect to a confirmation page or show a modal
    }, 1500)
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-lg p-6 transition-all hover:shadow-xl relative">
      <div className="flex items-center justify-between mb-6">
        <div className="text-xl font-semibold">
          ₦{price.toLocaleString()}
          <span className="text-gray-600 text-base font-normal"> night</span>
        </div>
        <div className="flex items-center">
          <Star className="h-4 w-4 fill-hovmart-purple text-hovmart-purple mr-1" />
          <span className="font-medium">{rating}</span>
          <span className="text-gray-600 text-sm ml-1">({reviewCount})</span>
        </div>
      </div>

      {bookingSuccess && (
        <div className="absolute inset-0 bg-white bg-opacity-95 rounded-xl flex flex-col items-center justify-center z-20 animate-in fade-in duration-300">
          <div className="rounded-full bg-green-100 p-3 mb-4">
            <Check className="h-8 w-8 text-green-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Booking Successful!</h3>
          <p className="text-gray-600 text-center mb-4">
            Your reservation for {guests} guest{guests !== 1 ? "s" : ""} from {new Date(checkIn).toLocaleDateString()}{" "}
            to {new Date(checkOut).toLocaleDateString()} has been confirmed.
          </p>
          <button
            onClick={() => setBookingSuccess(false)}
            className="px-4 py-2 bg-hovmart-purple text-white rounded-lg hover:bg-hovmart-light transition-colors"
          >
            Close
          </button>
        </div>
      )}

      {validationError && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-start animate-in fade-in slide-in-from-top-2 duration-200">
          <AlertCircle className="h-5 w-5 text-red-500 mr-2 flex-shrink-0 mt-0.5" />
          <p className="text-red-700 text-sm">{validationError}</p>
        </div>
      )}

      <div className="border border-gray-300 rounded-t-lg overflow-hidden shadow-sm hover:shadow transition-shadow">
        <div className="grid grid-cols-2 divide-x divide-gray-300">
          <div className="p-3 transition-colors hover:bg-gray-50">
            <label htmlFor="check-in" className="block text-xs font-medium text-gray-700 mb-1">
              CHECK-IN
            </label>
            <div className="flex items-center">
              <Calendar className="h-4 w-4 text-hovmart-purple mr-2" />
              <input
                id="check-in"
                type="date"
                min={today}
                className="w-full bg-transparent border-none focus:ring-0 p-0 text-sm cursor-pointer"
                value={checkIn}
                onChange={handleCheckInChange}
                required
                aria-label="Select check-in date"
              />
            </div>
          </div>
          <div className="p-3 transition-colors hover:bg-gray-50">
            <label htmlFor="check-out" className="block text-xs font-medium text-gray-700 mb-1">
              CHECKOUT
            </label>
            <div className="flex items-center">
              <Calendar className="h-4 w-4 text-hovmart-purple mr-2" />
              <input
                id="check-out"
                type="date"
                min={checkIn || today}
                className="w-full bg-transparent border-none focus:ring-0 p-0 text-sm cursor-pointer"
                value={checkOut}
                onChange={handleCheckOutChange}
                required
                aria-label="Select check-out date"
              />
            </div>
          </div>
        </div>

        <div className="relative border-t border-gray-300">
          <div
            className="p-3 flex items-center justify-between cursor-pointer transition-colors hover:bg-gray-50"
            onClick={() => setShowGuestSelector(!showGuestSelector)}
            role="button"
            aria-expanded={showGuestSelector}
            aria-controls="guest-selector"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                setShowGuestSelector(!showGuestSelector)
                e.preventDefault()
              }
            }}
          >
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">GUESTS</label>
              <div className="flex items-center">
                <Users className="h-4 w-4 text-hovmart-purple mr-2" />
                <span className="text-sm">
                  {guests} guest{guests !== 1 ? "s" : ""}
                </span>
              </div>
            </div>
            {showGuestSelector ? (
              <ChevronUp className="h-5 w-5 text-hovmart-purple" />
            ) : (
              <ChevronDown className="h-5 w-5 text-hovmart-purple" />
            )}
          </div>

          {/* Guest Selector Dropdown */}
          {showGuestSelector && (
            <div
              id="guest-selector"
              className="absolute top-full left-0 right-0 bg-white border border-gray-300 rounded-b-lg p-4 shadow-lg z-10 animate-in fade-in slide-in-from-top-2 duration-200"
            >
              <div className="flex items-center justify-between mb-4">
                <div>
                  <div className="font-medium">Guests</div>
                  <div className="text-sm text-gray-600">Max {maxGuests} guests</div>
                </div>
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => setGuests(Math.max(1, guests - 1))}
                    className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:border-hovmart-purple hover:text-hovmart-purple transition-colors"
                    disabled={guests <= 1}
                    aria-label="Decrease guest count"
                  >
                    -
                  </button>
                  <span className="w-6 text-center">{guests}</span>
                  <button
                    onClick={() => setGuests(Math.min(maxGuests, guests + 1))}
                    className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:border-hovmart-purple hover:text-hovmart-purple transition-colors"
                    disabled={guests >= maxGuests}
                    aria-label="Increase guest count"
                  >
                    +
                  </button>
                </div>
              </div>
              <button
                onClick={() => setShowGuestSelector(false)}
                className="w-full text-right text-hovmart-purple text-sm font-medium hover:underline focus:outline-none focus:ring-2 focus:ring-hovmart-purple focus:ring-offset-2 rounded"
                aria-label="Close guest selector"
              >
                Close
              </button>
            </div>
          )}
        </div>
      </div>

      <button
        className={`w-full mt-4 py-3 rounded-lg font-medium transition-all focus:outline-none focus:ring-2 focus:ring-hovmart-purple focus:ring-offset-2 relative ${
          isSubmitting
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-gradient-to-r from-hovmart-purple to-hovmart-light text-white hover:shadow-md hover:translate-y-[-2px]"
        }`}
        disabled={!checkIn || !checkOut || isSubmitting}
        onClick={handleBooking}
      >
        {isSubmitting ? (
          <span className="flex items-center justify-center">
            <svg
              className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            Processing...
          </span>
        ) : checkIn && checkOut ? (
          "Reserve"
        ) : (
          "Select dates"
        )}
      </button>

      <div className="text-center text-sm text-gray-600 mt-2 flex items-center justify-center">
        <span className="mr-1">You won't be charged yet</span>
        {checkIn && checkOut && <span className="inline-flex items-center text-hovmart-purple">• Secure booking</span>}
      </div>

      {checkIn && checkOut && nights > 0 && (
        <div className="mt-6 space-y-4 animate-in fade-in duration-300">
          <div className="flex justify-between">
            <div className="text-gray-600 hover:text-hovmart-purple hover:underline cursor-pointer transition-colors">
              ₦{price.toLocaleString()} x {nights} night{nights !== 1 ? "s" : ""}
            </div>
            <div>₦{subtotal.toLocaleString()}</div>
          </div>
          <div className="flex justify-between">
            <div className="text-gray-600 hover:text-hovmart-purple hover:underline cursor-pointer transition-colors">
              Service fee
            </div>
            <div>₦{serviceFee.toLocaleString()}</div>
          </div>
          <div className="pt-4 border-t border-gray-200 flex justify-between font-semibold">
            <div>Total</div>
            <div>₦{total.toLocaleString()}</div>
          </div>
        </div>
      )}
    </div>
  )
}
