import { Suspense } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { PropertyListingView } from "@/components/properties/property-listing-view"
import { PropertyListingSkeleton } from "@/components/properties/property-listing-skeleton"

export const metadata = {
  title: "View All Properties | Hovmart",
  description: "Browse and explore all available properties from Hovmart's premium collection.",
}

export default function ViewAllPropertiesPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 pt-20">
        <Suspense fallback={<PropertyListingSkeleton />}>
          <PropertyListingView />
        </Suspense>
      </main>
      <Footer />
    </div>
  )
}
