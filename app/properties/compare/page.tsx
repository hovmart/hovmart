import type { Metadata } from "next"
import dynamic from "next/dynamic"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import "./styles.css"

// Use dynamic import with SSR disabled for the PropertyComparison component
// This ensures that any client-side only libraries like Recharts work properly
const PropertyComparison = dynamic(() => import("@/components/properties/property-comparison"), { ssr: false })

export const metadata: Metadata = {
  title: "Compare Properties | Hovmart Limited",
  description: "Compare different properties side by side to find the perfect match for your needs.",
}

export default function ComparePropertiesPage() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-white to-[#f8f8fa]">
      <Navbar />
      <main className="flex-1 pt-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <PropertyComparison />
        </div>
      </main>
      <Footer />
    </div>
  )
}
