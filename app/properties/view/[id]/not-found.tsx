import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Home } from "lucide-react"

export default function PropertyNotFound() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 pt-20">
        <div className="container mx-auto px-4 py-16 text-center">
          <div className="inline-flex items-center justify-center p-6 bg-hovmart-purple/10 rounded-full mb-6">
            <Home className="h-12 w-12 text-hovmart-purple" />
          </div>
          <h1 className="text-3xl font-bold mb-4">Property Not Found</h1>
          <p className="text-gray-600 max-w-md mx-auto mb-8">
            We couldn't find the property you're looking for. It may have been removed or the URL might be incorrect.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/properties/view"
              className="px-6 py-3 bg-hovmart-purple text-white rounded-lg hover:bg-hovmart-light transition-colors"
            >
              Browse All Properties
            </Link>
            <Link href="/" className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              Return Home
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
