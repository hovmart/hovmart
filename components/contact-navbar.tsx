"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Menu, X } from "lucide-react"

export function ContactNavbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-black/90 backdrop-blur-lg shadow-md" : "bg-black/70 backdrop-blur-md"
      }`}
    >
      <div className="container mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image src="/hovmart-logo.png" alt="Hovmart" width={150} height={36} className="h-8 md:h-10 w-auto" />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-10">
            <Link
              href="/about"
              className="text-sm font-medium text-white hover:text-hovmart-purple/90 transition-colors"
            >
              About
            </Link>
          </nav>

          {/* CTA Button */}
          <div className="hidden md:block">
            <Link
              href="/"
              className="inline-flex h-10 items-center justify-center rounded-full bg-hovmart-purple px-6 text-sm font-medium text-white transition-all hover:bg-hovmart-purple/90 hover:shadow-md active:scale-[0.98]"
            >
              Back to Home
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-black/95 border-b border-white/10 animate-in slide-in-from-top duration-300">
          <nav className="container mx-auto px-6 py-6 flex flex-col space-y-6">
            <Link
              href="/about"
              className="text-sm font-medium text-white hover:text-hovmart-purple/90 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
            <Link
              href="/"
              className="inline-flex h-12 items-center justify-center rounded-full bg-hovmart-purple px-6 text-sm font-medium text-white transition-all hover:bg-hovmart-purple/90"
              onClick={() => setIsMenuOpen(false)}
            >
              Back to Home
            </Link>
          </nav>
        </div>
      )}
    </header>
  )
}
