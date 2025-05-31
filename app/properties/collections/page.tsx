import type { Metadata } from "next"
import { PropertyCollections } from "@/components/properties/property-collections"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

export const metadata: Metadata = {
  title: "Property Collections | Hovmart Limited",
  description: "Explore our curated collections of properties for every need and preference.",
}

export default function PropertyCollectionsPage() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-white to-[#f8f8fa]">
      <Navbar />
      <main className="flex-1 pt-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <PropertyCollections />
        </div>
      </main>
      <Footer />
    </div>
  )
}
