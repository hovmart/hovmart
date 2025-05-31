import type { Metadata } from "next"
import { ContactSection } from "@/components/contact-section"
import { ContactNavbar } from "@/components/contact-navbar"
import { ContactFooter } from "@/components/contact-footer"

export const metadata: Metadata = {
  title: "Contact Us | Hovmart Limited",
  description: "Get in touch with Hovmart Limited. We're here to help with all your real estate needs.",
}

export default function ContactPage() {
  return (
    <div className="flex flex-col min-h-screen bg-black">
      <ContactNavbar />
      <main className="flex-1 pt-20">
        <ContactSection />
      </main>
      <ContactFooter />
    </div>
  )
}
