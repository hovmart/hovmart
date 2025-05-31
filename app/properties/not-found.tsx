import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Search } from "lucide-react"

export default function PropertiesNotFound() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Navbar />
      <main className="flex-1 pt-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <div className="inline-flex items-center justify-center p-4 bg-hovmart-purple/10 rounded-full mb-6">
            <Search className="h-8 w-8 text-hovmart-purple" />
          </div>
          <h1 className="text-3xl font-bold mb-4">Property Not Found</h1>
          <p className="text-gray-600 max-w-md mx-auto mb-8">
            We couldn't find the property or page you're looking for. It may have been removed or the URL might be
            incorrect.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/properties"
              className="px-6 py-3 bg-gradient-to-r from-hovmart-purple to-hovmart-light text-white rounded-lg font-medium hover:shadow-md transition-shadow"
            >
              Browse Properties
            </Link>
            <Link
              href="/"
              className="px-6 py-3 border border-gray-300 rounded-lg font-medium hover:border-hovmart-purple/50 transition-colors"
            >
              Return Home
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
