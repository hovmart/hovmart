export function PropertyDetailSkeleton() {
  return (
    <div className="container mx-auto px-4 py-8 animate-pulse">
      {/* Header skeleton */}
      <div className="h-10 bg-gray-200 w-3/4 rounded-lg mb-4"></div>
      <div className="h-6 bg-gray-200 w-1/2 rounded-lg mb-8"></div>

      {/* Gallery skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 mb-10">
        <div className="md:col-span-8 aspect-[4/3] bg-gray-200 rounded-2xl"></div>
        <div className="md:col-span-4 grid grid-cols-2 md:grid-cols-1 gap-4">
          <div className="aspect-square bg-gray-200 rounded-2xl"></div>
          <div className="aspect-square bg-gray-200 rounded-2xl"></div>
        </div>
      </div>

      {/* Content skeleton */}
      <div className="flex flex-col lg:flex-row gap-10">
        <div className="lg:w-2/3 space-y-12">
          {/* Overview skeleton */}
          <div className="border-b border-gray-200 pb-12">
            <div className="h-8 bg-gray-200 w-1/3 rounded-lg mb-4"></div>
            <div className="flex gap-4 mb-8">
              <div className="h-6 bg-gray-200 w-24 rounded-lg"></div>
              <div className="h-6 bg-gray-200 w-24 rounded-lg"></div>
              <div className="h-6 bg-gray-200 w-24 rounded-lg"></div>
            </div>
            <div className="h-4 bg-gray-200 rounded-lg mb-3 w-full"></div>
            <div className="h-4 bg-gray-200 rounded-lg mb-3 w-full"></div>
            <div className="h-4 bg-gray-200 rounded-lg mb-3 w-3/4"></div>
          </div>

          {/* Amenities skeleton */}
          <div className="border-b border-gray-200 pb-12">
            <div className="h-8 bg-gray-200 w-1/3 rounded-lg mb-6"></div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gray-300 rounded-full"></div>
                  <div className="h-4 bg-gray-200 rounded-lg w-32"></div>
                </div>
              ))}
            </div>
          </div>

          {/* Location skeleton */}
          <div className="border-b border-gray-200 pb-12">
            <div className="h-8 bg-gray-200 w-1/3 rounded-lg mb-6"></div>
            <div className="aspect-[16/9] bg-gray-200 rounded-2xl mb-6"></div>
            <div className="h-4 bg-gray-200 rounded-lg mb-3 w-full"></div>
            <div className="h-4 bg-gray-200 rounded-lg mb-3 w-full"></div>
            <div className="h-4 bg-gray-200 rounded-lg mb-3 w-2/3"></div>
          </div>
        </div>

        {/* Booking form skeleton */}
        <div className="lg:w-1/3">
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <div className="flex justify-between items-start mb-6">
              <div className="h-8 bg-gray-200 w-1/3 rounded-lg"></div>
              <div className="h-6 bg-gray-200 w-1/4 rounded-lg"></div>
            </div>
            <div className="h-40 bg-gray-200 rounded-xl mb-6"></div>
            <div className="h-12 bg-gray-300 rounded-xl mb-4"></div>
            <div className="h-4 bg-gray-200 rounded-lg w-1/2 mx-auto mb-6"></div>
            <div className="space-y-4">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="flex justify-between">
                  <div className="h-4 bg-gray-200 rounded-lg w-1/3"></div>
                  <div className="h-4 bg-gray-200 rounded-lg w-1/4"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Similar properties skeleton */}
      <div className="mt-16">
        <div className="h-8 bg-gray-200 w-1/3 rounded-lg mb-8"></div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-white rounded-xl overflow-hidden shadow-md">
              <div className="aspect-[4/3] bg-gray-200"></div>
              <div className="p-4">
                <div className="h-5 bg-gray-200 rounded-lg mb-2 w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded-lg mb-2 w-1/2"></div>
                <div className="h-5 bg-gray-200 rounded-lg mt-2 w-1/3"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
