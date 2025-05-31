"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Navbar from "./navbar"
import Sidebar from "./sidebar"
import { usePathname } from "next/navigation"
import { Toaster } from "@/components/ui/toaster"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const pathname = usePathname()

  // Close sidebar on route change on mobile
  useEffect(() => {
    setSidebarOpen(false)
  }, [pathname])

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />
      <div className="flex flex-col flex-1 overflow-y-auto">
        <Navbar onMenuButtonClick={() => setSidebarOpen(true)} />
        <main className="flex-1 p-4 md:p-6 bg-gray-50 overflow-y-auto">{children}</main>
      </div>
      <Toaster />
    </div>
  )
}
