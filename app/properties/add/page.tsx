import type { Metadata } from "next"
import { AddPropertyForm } from "@/components/properties/add-property-form"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

export const metadata: Metadata = {
  title: "Add Property | Hovmart Limited",
  description: "List your property on Hovmart. Reach thousands of potential buyers, renters, and guests.",
}

export default function AddPropertyPage() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-white to-[#f8f8fa]">
      <Navbar />
      <main className="flex-1 pt-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <AddPropertyForm />
        </div>
      </main>
      <Footer />
    </div>
  )
}
