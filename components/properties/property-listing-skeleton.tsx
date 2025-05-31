export function PropertyListingSkeleton() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="h-10 w-48 bg-gray-200 rounded-md mb-4 animate-pulse"></div>
      <div className="h-6 w-96 bg-gray-200 rounded-md mb-8 animate-pulse"></div>

      <div className="h-14 bg-gray-200 rounded-xl mb-8 animate-pulse"></div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {Array(12)
          .fill(0)
          .map((_, i) => (
            <div key={i} className="bg-gray-200 rounded-xl overflow-hidden animate-pulse">
              <div className="h-48 bg-gray-300"></div>
              <div className="p-4 space-y-3">
                <div className="h-5 bg-gray-300 rounded w-3/4"></div>
                <div className="h-4 bg-gray-300 rounded w-1/2"></div>
                <div className="h-4 bg-gray-300 rounded w-5/6"></div>
                <div className="h-6 bg-gray-300 rounded w-1/3"></div>
              </div>
            </div>
          ))}
      </div>
    </div>
  )
}
