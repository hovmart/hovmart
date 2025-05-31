"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import {
  format,
  addMonths,
  isSameMonth,
  isSameDay,
  isAfter,
  isBefore,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  startOfWeek,
  endOfWeek,
} from "date-fns"

interface DatePickerProps {
  checkInDate: string
  checkOutDate: string
  onCheckInChange: (date: string) => void
  onCheckOutChange: (date: string) => void
  onDone?: () => void
}

export function DatePicker({ checkInDate, checkOutDate, onCheckInChange, onCheckOutChange, onDone }: DatePickerProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [selectedCheckIn, setSelectedCheckIn] = useState<Date | null>(checkInDate ? new Date(checkInDate) : null)
  const [selectedCheckOut, setSelectedCheckOut] = useState<Date | null>(checkOutDate ? new Date(checkOutDate) : null)
  const [hoverDate, setHoverDate] = useState<Date | null>(null)

  // Reset selected dates when props change
  useEffect(() => {
    if (checkInDate) {
      setSelectedCheckIn(new Date(checkInDate))
    }
    if (checkOutDate) {
      setSelectedCheckOut(new Date(checkOutDate))
    }
  }, [checkInDate, checkOutDate])

  // Navigate to previous month
  const prevMonth = () => {
    setCurrentMonth(addMonths(currentMonth, -1))
  }

  // Navigate to next month
  const nextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1))
  }

  // Handle date selection
  const handleDateClick = (day: Date) => {
    if (!selectedCheckIn || (selectedCheckIn && selectedCheckOut)) {
      // Start new selection
      setSelectedCheckIn(day)
      setSelectedCheckOut(null)
      onCheckInChange(format(day, "yyyy-MM-dd"))
      onCheckOutChange("")
    } else {
      // Complete selection
      if (isBefore(day, selectedCheckIn)) {
        // If clicked date is before check-in, swap them
        setSelectedCheckOut(selectedCheckIn)
        setSelectedCheckIn(day)
        onCheckInChange(format(day, "yyyy-MM-dd"))
        onCheckOutChange(format(selectedCheckIn, "yyyy-MM-dd"))
      } else {
        // Normal case: check-out is after check-in
        setSelectedCheckOut(day)
        onCheckOutChange(format(day, "yyyy-MM-dd"))

        // If onDone is provided, call it after a short delay
        if (onDone) {
          setTimeout(onDone, 300)
        }
      }
    }
  }

  // Handle date hover for range preview
  const handleDateHover = (day: Date) => {
    if (selectedCheckIn && !selectedCheckOut) {
      setHoverDate(day)
    }
  }

  // Check if a date is in the selected range
  const isInRange = (day: Date) => {
    if (selectedCheckIn && selectedCheckOut) {
      return isAfter(day, selectedCheckIn) && isBefore(day, selectedCheckOut)
    }
    if (selectedCheckIn && hoverDate) {
      return (
        (isAfter(day, selectedCheckIn) && isBefore(day, hoverDate)) ||
        (isAfter(day, hoverDate) && isBefore(day, selectedCheckIn))
      )
    }
    return false
  }

  // Generate calendar for current month
  const generateCalendar = (monthDate: Date) => {
    const monthStart = startOfMonth(monthDate)
    const monthEnd = endOfMonth(monthDate)
    const startDate = startOfWeek(monthStart)
    const endDate = endOfWeek(monthEnd)

    const days = eachDayOfInterval({ start: startDate, end: endDate })
    const weeks: Date[][] = []

    let week: Date[] = []
    days.forEach((day) => {
      week.push(day)
      if (week.length === 7) {
        weeks.push(week)
        week = []
      }
    })

    return weeks
  }

  // Generate calendar for current and next month
  const currentMonthCalendar = generateCalendar(currentMonth)
  const nextMonthCalendar = generateCalendar(addMonths(currentMonth, 1))

  // Clear selected dates
  const clearDates = () => {
    setSelectedCheckIn(null)
    setSelectedCheckOut(null)
    onCheckInChange("")
    onCheckOutChange("")
  }

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
      <div className="p-4 flex items-center justify-between border-b border-gray-200">
        <h3 className="font-medium">Select dates</h3>
        <div className="flex items-center">
          {(selectedCheckIn || selectedCheckOut) && (
            <button onClick={clearDates} className="text-sm text-hovmart-purple font-medium hover:underline mr-4">
              Clear dates
            </button>
          )}
          <button
            onClick={prevMonth}
            className="p-1.5 rounded-full hover:bg-gray-100 transition-colors"
            aria-label="Previous month"
          >
            <ChevronLeft className="h-5 w-5 text-gray-600" />
          </button>
          <button
            onClick={nextMonth}
            className="p-1.5 rounded-full hover:bg-gray-100 transition-colors ml-1"
            aria-label="Next month"
          >
            <ChevronRight className="h-5 w-5 text-gray-600" />
          </button>
        </div>
      </div>

      <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Current Month */}
        <div>
          <div className="text-center mb-4 font-medium">{format(currentMonth, "MMMM yyyy")}</div>
          <div className="grid grid-cols-7 gap-1">
            {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day) => (
              <div key={day} className="text-center text-xs text-gray-500 font-medium py-2">
                {day}
              </div>
            ))}
            {currentMonthCalendar.map((week, weekIndex) =>
              week.map((day, dayIndex) => (
                <button
                  key={`${weekIndex}-${dayIndex}`}
                  onClick={() => handleDateClick(day)}
                  onMouseEnter={() => handleDateHover(day)}
                  disabled={isBefore(day, new Date()) && !isSameDay(day, new Date())}
                  className={`
                    relative h-10 w-full rounded-full flex items-center justify-center text-sm
                    ${
                      isBefore(day, new Date()) && !isSameDay(day, new Date())
                        ? "text-gray-300 cursor-not-allowed"
                        : "hover:bg-gray-100"
                    }
                    ${!isSameMonth(day, currentMonth) ? "text-gray-400" : "text-gray-800"}
                    ${
                      (selectedCheckIn && isSameDay(day, selectedCheckIn)) ||
                      (selectedCheckOut && isSameDay(day, selectedCheckOut))
                        ? "bg-hovmart-purple text-white hover:bg-hovmart-purple"
                        : ""
                    }
                    ${isInRange(day) ? "bg-hovmart-purple/10 text-hovmart-purple" : ""}
                  `}
                >
                  {format(day, "d")}
                </button>
              )),
            )}
          </div>
        </div>

        {/* Next Month */}
        <div>
          <div className="text-center mb-4 font-medium">{format(addMonths(currentMonth, 1), "MMMM yyyy")}</div>
          <div className="grid grid-cols-7 gap-1">
            {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day) => (
              <div key={day} className="text-center text-xs text-gray-500 font-medium py-2">
                {day}
              </div>
            ))}
            {nextMonthCalendar.map((week, weekIndex) =>
              week.map((day, dayIndex) => (
                <button
                  key={`next-${weekIndex}-${dayIndex}`}
                  onClick={() => handleDateClick(day)}
                  onMouseEnter={() => handleDateHover(day)}
                  disabled={isBefore(day, new Date()) && !isSameDay(day, new Date())}
                  className={`
                    relative h-10 w-full rounded-full flex items-center justify-center text-sm
                    ${
                      isBefore(day, new Date()) && !isSameDay(day, new Date())
                        ? "text-gray-300 cursor-not-allowed"
                        : "hover:bg-gray-100"
                    }
                    ${!isSameMonth(day, addMonths(currentMonth, 1)) ? "text-gray-400" : "text-gray-800"}
                    ${
                      (selectedCheckIn && isSameDay(day, selectedCheckIn)) ||
                      (selectedCheckOut && isSameDay(day, selectedCheckOut))
                        ? "bg-hovmart-purple text-white hover:bg-hovmart-purple"
                        : ""
                    }
                    ${isInRange(day) ? "bg-hovmart-purple/10 text-hovmart-purple" : ""}
                  `}
                >
                  {format(day, "d")}
                </button>
              )),
            )}
          </div>
        </div>
      </div>

      {/* Selected dates summary */}
      {(selectedCheckIn || selectedCheckOut) && (
        <div className="p-4 bg-gray-50 border-t border-gray-200 flex items-center justify-between">
          <div>
            <div className="flex items-center">
              <span className="text-sm font-medium mr-2">
                {selectedCheckIn ? format(selectedCheckIn, "MMM dd, yyyy") : "Select check-in"}
              </span>
              <span className="text-gray-400 mx-2">→</span>
              <span className="text-sm font-medium">
                {selectedCheckOut ? format(selectedCheckOut, "MMM dd, yyyy") : "Select check-out"}
              </span>
            </div>
            {selectedCheckIn && selectedCheckOut && (
              <div className="text-xs text-gray-500 mt-1">
                {Math.ceil((selectedCheckOut.getTime() - selectedCheckIn.getTime()) / (1000 * 60 * 60 * 24))} nights
              </div>
            )}
          </div>
          {selectedCheckIn && selectedCheckOut && onDone && (
            <button
              onClick={onDone}
              className="bg-hovmart-purple text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-hovmart-purple/90 transition-colors"
            >
              Done
            </button>
          )}
        </div>
      )}
    </div>
  )
}
