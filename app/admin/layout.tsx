import type React from "react"
import { Toaster } from "@/components/ui/toaster"
import "../globals.css"

export const metadata = {
  title: "Hovmart Admin Dashboard",
  description: "Manage your Hovmart properties, users, and more",
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      {children}
      <Toaster />
    </div>
  )
}
