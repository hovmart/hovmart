"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin, ArrowRight, ChevronRight } from "lucide-react"

export function Footer() {
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [subscribed, setSubscribed] = useState(false)

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return

    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      setSubscribed(true)
      setEmail("")
    }, 1000)
  }

  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gray-900 text-white relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-hovmart-purple/30 to-transparent"></div>

      {/* Subtle background pattern */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23FFFFFF' fillOpacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
        }}
      ></div>

      <div className="absolute -top-40 -right-40 w-80 h-80 bg-hovmart-purple/20 rounded-full blur-3xl opacity-30"></div>
      <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-amber-400/20 rounded-full blur-3xl opacity-30"></div>

      {/* Newsletter Section */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8 relative z-10">
        <div className="bg-gradient-to-r from-hovmart-purple to-hovmart-light rounded-2xl p-8 md:p-12 mb-16 relative overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
          <div className="absolute bottom-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>

          <div className="absolute -top-20 -right-20 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Stay Updated with Hovmart</h2>
              <p className="text-white/80 mb-0 max-w-md">
                Subscribe to our newsletter for exclusive property listings, market insights, and special offers.
              </p>
            </div>
            <div>
              {subscribed ? (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center"
                >
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-white/20 mb-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">Thank You for Subscribing!</h3>
                  <p className="text-white/80">You'll now receive our latest updates and exclusive offers.</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="flex-1 px-4 py-3 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/30"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-6 py-3 bg-white text-hovmart-purple rounded-lg font-medium hover:bg-white/90 transition-colors flex items-center justify-center"
                  >
                    {isSubmitting ? (
                      <svg
                        className="animate-spin h-5 w-5 text-hovmart-purple"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                    ) : (
                      <>
                        <span>Subscribe</span>
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div>
            <div className="mb-6">
              <Image src="/hovmart-logo.png" alt="Hovmart" width={150} height={36} className="h-10 w-auto" />
            </div>
            <p className="text-gray-400 mb-6">
              Hovmart is Nigeria's premier real estate platform, connecting property seekers with their dream homes
              through a seamless, transparent experience.
            </p>
            <div className="flex items-center space-x-4">
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-hovmart-purple/80 transition-colors"
              >
                <Facebook size={18} />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-hovmart-purple/80 transition-colors"
              >
                <Twitter size={18} />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-hovmart-purple/80 transition-colors"
              >
                <Instagram size={18} />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-hovmart-purple/80 transition-colors"
              >
                <Linkedin size={18} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-6">Quick Links</h3>
            <ul className="space-y-4">
              <li>
                <Link href="/properties" className="text-gray-400 hover:text-white transition-colors flex items-center">
                  <ChevronRight size={16} className="mr-2 text-hovmart-purple" />
                  <span>Properties</span>
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-400 hover:text-white transition-colors flex items-center">
                  <ChevronRight size={16} className="mr-2 text-hovmart-purple" />
                  <span>About Us</span>
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-400 hover:text-white transition-colors flex items-center">
                  <ChevronRight size={16} className="mr-2 text-hovmart-purple" />
                  <span>Contact</span>
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="text-gray-400 hover:text-white transition-colors flex items-center">
                  <ChevronRight size={16} className="mr-2 text-hovmart-purple" />
                  <span>Dashboard</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/properties/add"
                  className="text-gray-400 hover:text-white transition-colors flex items-center"
                >
                  <ChevronRight size={16} className="mr-2 text-hovmart-purple" />
                  <span>List Property</span>
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-6">Property Types</h3>
            <ul className="space-y-4">
              <li>
                <Link href="/properties" className="text-gray-400 hover:text-white transition-colors flex items-center">
                  <ChevronRight size={16} className="mr-2 text-hovmart-purple" />
                  <span>Luxury Apartments</span>
                </Link>
              </li>
              <li>
                <Link href="/properties" className="text-gray-400 hover:text-white transition-colors flex items-center">
                  <ChevronRight size={16} className="mr-2 text-hovmart-purple" />
                  <span>Beachfront Villas</span>
                </Link>
              </li>
              <li>
                <Link href="/properties" className="text-gray-400 hover:text-white transition-colors flex items-center">
                  <ChevronRight size={16} className="mr-2 text-hovmart-purple" />
                  <span>City Penthouses</span>
                </Link>
              </li>
              <li>
                <Link href="/properties" className="text-gray-400 hover:text-white transition-colors flex items-center">
                  <ChevronRight size={16} className="mr-2 text-hovmart-purple" />
                  <span>Serviced Apartments</span>
                </Link>
              </li>
              <li>
                <Link href="/properties" className="text-gray-400 hover:text-white transition-colors flex items-center">
                  <ChevronRight size={16} className="mr-2 text-hovmart-purple" />
                  <span>Commercial Spaces</span>
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-6">Contact Info</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin size={20} className="mr-3 text-hovmart-purple flex-shrink-0 mt-1" />
                <span className="text-gray-400">123 Victoria Island, Lagos, Nigeria</span>
              </li>
              <li className="flex items-center">
                <Phone size={20} className="mr-3 text-hovmart-purple flex-shrink-0" />
                <a href="tel:+2341234567890" className="text-gray-400 hover:text-white transition-colors">
                  +234 123 456 7890
                </a>
              </li>
              <li className="flex items-center">
                <Mail size={20} className="mr-3 text-hovmart-purple flex-shrink-0" />
                <a href="mailto:info@hovmart.com" className="text-gray-400 hover:text-white transition-colors">
                  info@hovmart.com
                </a>
              </li>
            </ul>
            <div className="mt-6 p-4 bg-white/5 rounded-lg border border-white/10">
              <h4 className="font-medium text-white mb-2">Business Hours</h4>
              <p className="text-gray-400 text-sm">
                Monday - Friday: 9:00 AM - 6:00 PM
                <br />
                Saturday: 10:00 AM - 4:00 PM
                <br />
                Sunday: Closed
              </p>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="text-gray-500 text-sm mb-4 md:mb-0">© {currentYear} Hovmart. All rights reserved.</div>
          <div className="flex flex-wrap gap-4 text-sm">
            <Link href="/terms" className="text-gray-500 hover:text-white transition-colors">
              Terms of Service
            </Link>
            <Link href="/privacy" className="text-gray-500 hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link href="/cookies" className="text-gray-500 hover:text-white transition-colors">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
