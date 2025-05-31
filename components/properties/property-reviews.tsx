"use client"

import { useState } from "react"
import { Star, ChevronDown, ChevronUp } from "lucide-react"

interface PropertyReviewsProps {
  rating: number
  reviewCount: number
}

export function PropertyReviews({ rating, reviewCount }: PropertyReviewsProps) {
  const [showAllReviews, setShowAllReviews] = useState(false)

  // Generate mock reviews for demo purposes
  const mockReviews = [
    {
      id: 1,
      name: "Sarah Johnson",
      date: "April 2023",
      rating: 5,
      comment:
        "Absolutely loved our stay! The property was immaculate and exactly as described. The location was perfect for exploring the city, and the host was incredibly responsive and helpful. Would definitely stay here again!",
      avatar: "/woman-portrait.png",
    },
    {
      id: 2,
      name: "Michael Chen",
      date: "March 2023",
      rating: 4,
      comment:
        "Great property in an excellent location. Very comfortable and well-equipped. The only minor issue was some noise from the street at night, but otherwise it was perfect.",
      avatar: "/thoughtful-man-portrait.png",
    },
    {
      id: 3,
      name: "Emma Williams",
      date: "February 2023",
      rating: 5,
      comment:
        "This place exceeded our expectations! Beautifully decorated, spotlessly clean, and in a fantastic location. The host provided excellent recommendations for local restaurants and attractions.",
      avatar: "/woman-portrait-2.png",
    },
    {
      id: 4,
      name: "David Okonkwo",
      date: "January 2023",
      rating: 5,
      comment:
        "One of the best properties I've stayed in. Everything was perfect from check-in to check-out. The amenities were top-notch and the location couldn't be better.",
      avatar: "/thoughtful-man-portrait.png",
    },
    {
      id: 5,
      name: "Olivia Martinez",
      date: "December 2022",
      rating: 4,
      comment:
        "Very comfortable stay in a great location. The property was clean and well-maintained. The host was responsive and accommodating.",
      avatar: "/woman-portrait-3.png",
    },
    {
      id: 6,
      name: "James Wilson",
      date: "November 2022",
      rating: 5,
      comment:
        "Fantastic property! Spacious, clean, and with all the amenities you could need. The location was perfect for our needs, and the host was a pleasure to deal with.",
      avatar: "/man-portrait-3.png",
    },
  ]

  // Display 3 reviews initially, show all when expanded
  const displayedReviews = showAllReviews ? mockReviews : mockReviews.slice(0, 3)

  // Calculate rating breakdown
  const ratingBreakdown = [
    { label: "5", percentage: 70 },
    { label: "4", percentage: 20 },
    { label: "3", percentage: 7 },
    { label: "2", percentage: 2 },
    { label: "1", percentage: 1 },
  ]

  return (
    <div>
      <div className="flex items-center mb-6">
        <h2 className="text-xl font-semibold">Reviews</h2>
        <div className="flex items-center ml-4">
          <Star className="h-5 w-5 fill-hovmart-purple text-hovmart-purple mr-1" />
          <span className="font-medium">{rating}</span>
          <span className="text-gray-600 ml-1">({reviewCount} reviews)</span>
        </div>
      </div>

      {/* Rating Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <div>
          <h3 className="text-lg font-medium mb-4">Rating Breakdown</h3>
          <div className="space-y-3">
            {ratingBreakdown.map((item) => (
              <div key={item.label} className="flex items-center">
                <div className="w-8 text-right mr-3">{item.label} ★</div>
                <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div className="h-full bg-hovmart-purple rounded-full" style={{ width: `${item.percentage}%` }}></div>
                </div>
                <div className="w-8 text-right ml-3 text-sm text-gray-600">{item.percentage}%</div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-lg font-medium mb-4">Highlights</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="font-medium">Cleanliness</div>
              <div className="flex items-center mt-1">
                <Star className="h-4 w-4 fill-hovmart-purple text-hovmart-purple" />
                <span className="ml-1 text-sm">4.9</span>
              </div>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="font-medium">Location</div>
              <div className="flex items-center mt-1">
                <Star className="h-4 w-4 fill-hovmart-purple text-hovmart-purple" />
                <span className="ml-1 text-sm">4.8</span>
              </div>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="font-medium">Value</div>
              <div className="flex items-center mt-1">
                <Star className="h-4 w-4 fill-hovmart-purple text-hovmart-purple" />
                <span className="ml-1 text-sm">4.7</span>
              </div>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="font-medium">Communication</div>
              <div className="flex items-center mt-1">
                <Star className="h-4 w-4 fill-hovmart-purple text-hovmart-purple" />
                <span className="ml-1 text-sm">4.9</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Reviews List */}
      <div className="space-y-6">
        {displayedReviews.map((review) => (
          <div key={review.id} className="border-b border-gray-200 pb-6 last:border-b-0">
            <div className="flex items-center mb-3">
              <div className="relative w-10 h-10 rounded-full overflow-hidden mr-3">
                <img src={review.avatar || "/placeholder.svg"} alt={review.name} className="object-cover" />
              </div>
              <div>
                <div className="font-medium">{review.name}</div>
                <div className="text-sm text-gray-600">{review.date}</div>
              </div>
              <div className="ml-auto flex items-center">
                <Star className="h-4 w-4 fill-hovmart-purple text-hovmart-purple mr-1" />
                <span>{review.rating}</span>
              </div>
            </div>
            <p className="text-gray-700">{review.comment}</p>
          </div>
        ))}
      </div>

      {mockReviews.length > 3 && (
        <button
          onClick={() => setShowAllReviews(!showAllReviews)}
          className="mt-6 flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium hover:border-hovmart-purple/50 transition-colors"
        >
          {showAllReviews ? (
            <>
              <ChevronUp className="h-4 w-4" />
              <span>Show less</span>
            </>
          ) : (
            <>
              <ChevronDown className="h-4 w-4" />
              <span>Show all {mockReviews.length} reviews</span>
            </>
          )}
        </button>
      )}
    </div>
  )
}
