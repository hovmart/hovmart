"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { Menu, X, ChevronDown, Home, Building2, Users, Mail, LayoutDashboard, Search, Plus } from "lucide-react"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { AddPropertyModal } from "@/components/properties/add-property-modal"

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const [searchActive, setSearchActive] = useState(false)
  const pathname = usePathname()
  const navRef = useRef<HTMLDivElement>(null)
  const searchInputRef = useRef<HTMLInputElement>(null)
  const [isAddPropertyModalOpen, setIsAddPropertyModalOpen] = useState(false)

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

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false)
  }, [pathname])

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setActiveDropdown(null)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  // Focus search input when search is activated
  useEffect(() => {
    if (searchActive && searchInputRef.current) {
      searchInputRef.current.focus()
    }
  }, [searchActive])

  const toggleDropdown = (dropdown: string) => {
    setActiveDropdown(activeDropdown === dropdown ? null : dropdown)
  }

  const isActive = (path: string) => pathname === path || (path !== "/" && pathname.startsWith(path))

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-white/90 backdrop-blur-xl shadow-[0_8px_30px_rgba(0,0,0,0.05)] border-b border-[#f0e6ff]/20"
          : "bg-transparent"
      }`}
      ref={navRef}
    >
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent opacity-50"></div>

      {/* Gold accent line at top */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-amber-300/50 to-transparent"></div>

      <div className="container mx-auto px-6 lg:px-8 relative">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center group z-10">
            <div className="relative overflow-hidden">
              <Image
                src="/hovmart-logo.png"
                alt="Hovmart"
                width={150}
                height={36}
                className="h-8 md:h-10 w-auto transition-transform duration-500 group-hover:scale-[1.02]"
                priority
              />
              <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-amber-300/70 to-transparent transform translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {/* Search Button */}
            <AnimatePresence mode="wait">
              {searchActive ? (
                <motion.div
                  initial={{ opacity: 0, width: 40 }}
                  animate={{ opacity: 1, width: 250 }}
                  exit={{ opacity: 0, width: 40 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="relative mr-4"
                >
                  <input
                    ref={searchInputRef}
                    type="text"
                    placeholder="Search properties..."
                    className="w-full h-10 pl-10 pr-4 rounded-full bg-gray-100/80 border border-gray-200/50 focus:outline-none focus:ring-2 focus:ring-hovmart-purple/20 text-sm"
                    onBlur={() => setSearchActive(false)}
                  />
                  <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                </motion.div>
              ) : (
                <motion.button
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  onClick={() => setSearchActive(true)}
                  className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100/80 transition-colors duration-300 mr-2"
                  aria-label="Search"
                >
                  <Search size={18} className="text-gray-600" />
                </motion.button>
              )}
            </AnimatePresence>

            {/* Properties Dropdown */}
            <div className="relative group">
              <button
                onClick={() => toggleDropdown("properties")}
                className={`flex items-center gap-1.5 text-sm font-medium px-4 py-2 rounded-full transition-all duration-300 ${
                  isActive("/properties")
                    ? "text-hovmart-purple bg-hovmart-purple/5"
                    : "text-gray-800 hover:text-hovmart-purple hover:bg-gray-100/80"
                }`}
                aria-expanded={activeDropdown === "properties"}
              >
                <span className="tracking-wide">Properties</span>
                <ChevronDown
                  size={14}
                  className={`transition-transform duration-300 ${activeDropdown === "properties" ? "rotate-180" : ""}`}
                />
              </button>

              <AnimatePresence>
                {activeDropdown === "properties" && (
                  <motion.div
                    initial={{ opacity: 0, y: 15, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                    className="absolute left-1/2 -translate-x-1/2 top-full pt-4 z-50 w-72"
                  >
                    <div className="relative bg-white/95 backdrop-blur-xl rounded-xl shadow-[0_15px_50px_-12px_rgba(0,0,0,0.15)] p-1.5 border border-gray-100/50 overflow-hidden">
                      {/* Decorative elements */}
                      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-amber-300/40 to-transparent"></div>
                      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-hovmart-purple/30 to-transparent"></div>

                      {/* Subtle background pattern */}
                      <div
                        className="absolute inset-0 opacity-[0.03] pointer-events-none"
                        style={{
                          backgroundImage:
                            "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%239C92AC' fillOpacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
                        }}
                      ></div>

                      <div className="space-y-0.5 py-1.5">
                        <DropdownLink
                          href="/properties"
                          label="All Properties"
                          icon={<Building2 size={15} />}
                          isActive={pathname === "/properties"}
                          onClick={() => setActiveDropdown(null)}
                        />
                        <DropdownLink
                          href="/properties/collections"
                          label="Collections"
                          icon={<Building2 size={15} />}
                          isActive={pathname === "/properties/collections"}
                          onClick={() => setActiveDropdown(null)}
                        />
                        <DropdownLink
                          href="/properties/compare"
                          label="Compare Properties"
                          icon={<Building2 size={15} />}
                          isActive={pathname === "/properties/compare"}
                          onClick={() => setActiveDropdown(null)}
                        />
                        <button
                          onClick={() => setIsAddPropertyModalOpen(true)}
                          className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-hovmart-purple to-hovmart-light text-white rounded-lg text-sm font-medium hover:shadow-md transition-shadow"
                        >
                          <Plus className="h-4 w-4 mr-2" />
                          Add Property
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <NavLink href="/about" label="About" />
            <NavLink href="/contact" label="Contact" />
            <NavLink href="/dashboard" label="Dashboard" />
          </nav>

          {/* CTA Button */}
          <div className="hidden md:block">
            <Link
              href="/contact"
              className="relative inline-flex h-11 items-center justify-center rounded-full bg-gradient-to-r from-hovmart-purple via-hovmart-purple to-hovmart-light px-7 text-sm font-medium text-white transition-all duration-300 hover:shadow-lg hover:shadow-hovmart-purple/20 active:scale-[0.98] overflow-hidden group"
            >
              <span className="relative z-10 tracking-wide">Get in Touch</span>
              <div className="absolute inset-0 bg-gradient-to-r from-amber-400/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/70 to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-black/10 to-transparent"></div>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden relative group"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
          >
            <div className="w-10 h-10 flex items-center justify-center rounded-full bg-gradient-to-br from-hovmart-purple/5 to-amber-400/5 group-hover:from-hovmart-purple/10 group-hover:to-amber-400/10 transition-colors duration-300">
              <AnimatePresence mode="wait">
                {isMenuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X size={18} className="text-hovmart-purple" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu size={18} className="text-hovmart-purple" />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <div className="absolute -inset-1 bg-gradient-to-br from-hovmart-purple/5 to-amber-400/5 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:hidden bg-white/95 backdrop-blur-xl border-b border-[#f0e6ff]/20 overflow-hidden relative"
          >
            {/* Decorative elements */}
            <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-hovmart-purple/20 to-transparent"></div>

            {/* Mobile search */}
            <div className="container mx-auto px-6 pt-4 pb-2">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search properties..."
                  className="w-full h-12 pl-12 pr-4 rounded-full bg-gray-100/80 border border-gray-200/50 focus:outline-none focus:ring-2 focus:ring-hovmart-purple/20 text-sm"
                />
                <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              </div>
            </div>

            <nav className="container mx-auto px-6 py-6">
              <div className="space-y-5">
                <MobileNavLink href="/" label="Home" icon={<Home size={16} />} isActive={pathname === "/"} />

                <div>
                  <button
                    onClick={() => toggleDropdown("mobileProperties")}
                    className={`flex items-center justify-between w-full text-base font-medium transition-colors ${
                      isActive("/properties") ? "text-hovmart-purple" : "text-gray-800"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Building2 size={16} className={isActive("/properties") ? "text-amber-400" : "text-amber-400"} />
                      <span className="tracking-wide">Properties</span>
                    </div>
                    <ChevronDown
                      size={14}
                      className={`transition-transform duration-300 ${
                        activeDropdown === "mobileProperties" ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  <AnimatePresence>
                    {activeDropdown === "mobileProperties" && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                        className="mt-3 pl-8 border-l border-amber-200/30 ml-2"
                      >
                        <div className="space-y-4 py-1">
                          <MobileSubLink
                            href="/properties"
                            label="All Properties"
                            isActive={pathname === "/properties"}
                          />
                          <MobileSubLink
                            href="/properties/collections"
                            label="Collections"
                            isActive={pathname === "/properties/collections"}
                          />
                          <MobileSubLink
                            href="/properties/compare"
                            label="Compare Properties"
                            isActive={pathname === "/properties/compare"}
                          />
                          <MobileSubLink
                            href="/properties/add"
                            label="List Your Property"
                            isActive={pathname === "/properties/add"}
                          />
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <MobileNavLink
                  href="/about"
                  label="About"
                  icon={<Users size={16} />}
                  isActive={pathname === "/about"}
                />
                <MobileNavLink
                  href="/contact"
                  label="Contact"
                  icon={<Mail size={16} />}
                  isActive={pathname === "/contact"}
                />
                <MobileNavLink
                  href="/dashboard"
                  label="Dashboard"
                  icon={<LayoutDashboard size={16} />}
                  isActive={pathname === "/dashboard"}
                />

                <div className="pt-3">
                  <Link
                    href="/contact"
                    className="relative inline-flex w-full h-12 items-center justify-center rounded-full bg-gradient-to-r from-hovmart-purple via-hovmart-purple to-hovmart-light px-6 text-sm font-medium text-white transition-all duration-300 hover:shadow-lg hover:shadow-hovmart-purple/20 active:scale-[0.98] overflow-hidden group"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <span className="relative z-10 tracking-wide">Get in Touch</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-amber-400/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/70 to-transparent"></div>
                    <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-black/10 to-transparent"></div>
                  </Link>
                </div>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
      {/* Add Property Modal */}
      <AddPropertyModal isOpen={isAddPropertyModalOpen} onClose={() => setIsAddPropertyModalOpen(false)} />
    </header>
  )
}

function NavLink({ href, label }: { href: string; label: string }) {
  const pathname = usePathname()
  const isActive = pathname === href || (href !== "/" && pathname.startsWith(href))

  return (
    <Link
      href={href}
      className={`flex items-center px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
        isActive
          ? "text-hovmart-purple bg-hovmart-purple/5"
          : "text-gray-800 hover:text-hovmart-purple hover:bg-gray-100/80"
      }`}
    >
      <span className="tracking-wide">{label}</span>
    </Link>
  )
}

function DropdownLink({
  href,
  label,
  icon,
  isActive,
  onClick,
}: {
  href: string
  label: string
  icon: React.ReactNode
  isActive: boolean
  onClick: () => void
}) {
  return (
    <Link
      href={href}
      className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 group ${
        isActive
          ? "bg-gradient-to-r from-hovmart-purple/10 to-amber-400/5 text-hovmart-purple"
          : "text-gray-700 hover:bg-gradient-to-r hover:from-hovmart-purple/5 hover:to-amber-400/5 hover:text-hovmart-purple"
      }`}
      onClick={onClick}
    >
      <span
        className={`${isActive ? "text-amber-400" : "text-gray-400 group-hover:text-amber-400"} transition-colors duration-200`}
      >
        {icon}
      </span>
      <span className="tracking-wide text-[13px]">{label}</span>
    </Link>
  )
}

function MobileNavLink({
  href,
  label,
  icon,
  isActive,
}: {
  href: string
  label: string
  icon: React.ReactNode
  isActive: boolean
}) {
  return (
    <Link
      href={href}
      className={`flex items-center gap-3 py-2 transition-colors duration-200 ${
        isActive ? "text-hovmart-purple" : "text-gray-800 hover:text-hovmart-purple"
      }`}
    >
      <span className={`${isActive ? "text-amber-400" : "text-gray-400"} transition-colors duration-200`}>{icon}</span>
      <span className="tracking-wide">{label}</span>
    </Link>
  )
}

function MobileSubLink({
  href,
  label,
  isActive,
}: {
  href: string
  label: string
  isActive: boolean
}) {
  return (
    <Link
      href={href}
      className={`block transition-colors duration-200 ${
        isActive ? "text-hovmart-purple" : "text-gray-600 hover:text-hovmart-purple"
      }`}
    >
      <span className="tracking-wide text-[15px]">{label}</span>
    </Link>
  )
}
