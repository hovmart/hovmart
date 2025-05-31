import { Countdown } from "@/components/countdown"
import { Footer } from "@/components/footer"
import { Hero } from "@/components/hero"
import { Navbar } from "@/components/navbar"
import { Newsletter } from "@/components/newsletter"
import { Features } from "@/components/features"
import { PropertyCategories } from "@/components/properties/property-categories"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-white to-[#f8f8fa]">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <PropertyCategories />
        <Features />
        <Countdown targetDate={new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)} />
        <Newsletter />
      </main>
      <Footer />
    </div>
  )
}
