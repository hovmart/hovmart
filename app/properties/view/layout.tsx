import type React from "react"
import type { Metadata } from "next"
import "./styles.css"

export const metadata: Metadata = {
  title: "View Properties | Hovmart",
  description: "Browse and view all available properties on Hovmart",
}

export default function PropertiesViewLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="scroll-progress" id="scroll-progress"></div>
      {children}
      <button className="scroll-to-top" id="scroll-to-top" aria-label="Scroll to top">
        <ChevronUp className="h-5 w-5" />
      </button>
    </>
  )
}

// Import at the top
import { ChevronUp } from "lucide-react"
