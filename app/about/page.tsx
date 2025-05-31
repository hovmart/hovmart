import type { Metadata } from "next"
import { AboutHero } from "@/components/about-hero"
import { AboutTeam } from "@/components/about-team"
import { AboutMission } from "@/components/about-mission"
import { AboutValues } from "@/components/about-values"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

export const metadata: Metadata = {
  title: "About Us | Hovmart Limited",
  description:
    "Meet the visionary team behind Hovmart Limited. Learn about our mission, values, and commitment to transforming the real estate landscape in Nigeria.",
  openGraph: {
    title: "About Us | Hovmart Limited",
    description:
      "Meet the visionary team behind Hovmart Limited. Learn about our mission, values, and commitment to transforming the real estate landscape in Nigeria.",
    images: [
      {
        url: "/team/team-cover.jpg",
        width: 1200,
        height: 630,
        alt: "Hovmart Leadership Team",
      },
    ],
  },
}

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-white to-[#f8f8fa]">
      <Navbar />
      <main className="flex-1 pt-20">
        <AboutHero />
        <AboutMission />
        <AboutTeam />
        <AboutValues />
      </main>
      <Footer />
    </div>
  )
}
