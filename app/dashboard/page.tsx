import type { Metadata } from "next"
import { UserDashboard } from "@/components/dashboard/user-dashboard"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

export const metadata: Metadata = {
  title: "Dashboard | Hovmart Limited",
  description: "Manage your properties, bookings, and account settings on Hovmart.",
}

export default function DashboardPage() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-white to-[#f8f8fa]">
      <Navbar />
      <main className="flex-1 pt-20">
        <UserDashboard />
      </main>
      <Footer />
    </div>
  )
}
