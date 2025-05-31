"use client"

import { useRef, useEffect, useState } from "react"
import { MapPin, Phone, Mail, MessageSquare, Clock, ChevronRight, ExternalLink } from "lucide-react"

export function ContactSection() {
  const contactRef = useRef<HTMLDivElement>(null)
  const mapRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState({
    contact: false,
    map: false,
  })

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.target === contactRef.current && entry.isIntersecting) {
            setIsVisible((prev) => ({ ...prev, contact: true }))
          } else if (entry.target === mapRef.current && entry.isIntersecting) {
            setIsVisible((prev) => ({ ...prev, map: true }))
          }
        })
      },
      { threshold: 0.1 },
    )

    if (contactRef.current) {
      observer.observe(contactRef.current)
    }
    if (mapRef.current) {
      observer.observe(mapRef.current)
    }

    return () => {
      if (contactRef.current) {
        observer.unobserve(contactRef.current)
      }
      if (mapRef.current) {
        observer.unobserve(mapRef.current)
      }
    }
  }, [])

  // Pre-filled message for WhatsApp
  const whatsappMessage = encodeURIComponent(
    "Hello Hovmart, I'm interested in your services and would like to learn more.",
  )

  // Pre-filled subject and body for email
  const emailSubject = encodeURIComponent("Inquiry about Hovmart Services")
  const emailBody = encodeURIComponent(
    "Hello Hovmart Team,\n\nI'm interested in your services and would like to learn more information.\n\nBest regards,",
  )

  return (
    <section className="relative py-20 md:py-32 overflow-hidden">
      {/* Premium thick background - more black than purple */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0a0a0f] to-[#1a0a20]"></div>

        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-hovmart-purple/30 to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-hovmart-light/20 to-transparent"></div>

        {/* Abstract shapes - more subtle */}
        <div className="absolute top-20 right-[10%] w-64 h-64 rounded-full bg-hovmart-purple/5 blur-3xl"></div>
        <div className="absolute bottom-20 left-[5%] w-80 h-80 rounded-full bg-hovmart-light/5 blur-3xl"></div>
        <div className="absolute top-1/3 left-1/4 w-40 h-40 rounded-full bg-hovmart-purple/3 blur-2xl"></div>

        {/* Subtle pattern overlay */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23ffffff' fillOpacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        ></div>
      </div>

      <div className="container mx-auto px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Get in Touch</h1>
          <p className="text-white/80 max-w-2xl mx-auto text-lg">
            We're here to help with all your real estate needs. Reach out to us directly through any of the channels
            below.
          </p>
        </div>

        {/* Contact Information Card */}
        <div
          ref={contactRef}
          className="max-w-3xl mx-auto bg-black/40 backdrop-blur-md rounded-3xl p-8 md:p-10 border border-white/10 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.5)] transform transition-all duration-700"
          style={{
            opacity: isVisible.contact ? 1 : 0,
            transform: isVisible.contact ? "translateY(0)" : "translateY(30px)",
            transition: "opacity 1s ease-out, transform 1s ease-out",
          }}
        >
          <div className="space-y-10">
            <h2 className="text-2xl font-semibold text-white mb-8 flex items-center">
              <span className="bg-hovmart-purple/20 p-2 rounded-lg mr-3">
                <MessageSquare className="h-5 w-5 text-hovmart-light" />
              </span>
              Contact Information
            </h2>

            {/* WhatsApp - Enhanced with direct message */}
            <div className="flex items-start space-x-5 group">
              <div className="bg-hovmart-purple/20 p-3 rounded-xl group-hover:bg-hovmart-purple/30 transition-colors duration-300">
                <Phone className="h-6 w-6 text-hovmart-light" />
              </div>
              <div className="flex-1">
                <h3 className="text-white font-medium mb-1">WhatsApp</h3>
                <a
                  href={`https://wa.me/2348083351686?text=${whatsappMessage}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/80 hover:text-white transition-colors duration-300 flex items-center group"
                >
                  +234 808 335 1686
                  <ExternalLink className="h-4 w-4 ml-2 opacity-70 group-hover:opacity-100 transition-opacity duration-300" />
                </a>
                <p className="text-white/60 text-sm mt-2">
                  Click to open WhatsApp with a pre-filled message. Available Monday-Saturday.
                </p>
                <div className="mt-4">
                  <a
                    href={`https://wa.me/2348083351686?text=${whatsappMessage}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-green-500 to-green-600 rounded-lg text-white text-sm font-medium hover:shadow-lg transition-all duration-300 group"
                  >
                    Chat on WhatsApp
                    <ChevronRight className="h-4 w-4 ml-1 transform group-hover:translate-x-1 transition-transform duration-300" />
                  </a>
                </div>
              </div>
            </div>

            {/* Email - Enhanced with subject and body */}
            <div className="flex items-start space-x-5 group">
              <div className="bg-hovmart-purple/20 p-3 rounded-xl group-hover:bg-hovmart-purple/30 transition-colors duration-300">
                <Mail className="h-6 w-6 text-hovmart-light" />
              </div>
              <div className="flex-1">
                <h3 className="text-white font-medium mb-1">Email</h3>
                <a
                  href={`mailto:info@hovmart.com?subject=${emailSubject}&body=${emailBody}`}
                  className="text-white/80 hover:text-white transition-colors duration-300 flex items-center group"
                >
                  info@hovmart.com
                  <ExternalLink className="h-4 w-4 ml-2 opacity-70 group-hover:opacity-100 transition-opacity duration-300" />
                </a>
                <p className="text-white/60 text-sm mt-2">
                  Click to open your email client with a pre-filled message. We typically respond within 24 hours.
                </p>
                <div className="mt-4">
                  <a
                    href={`mailto:info@hovmart.com?subject=${emailSubject}&body=${emailBody}`}
                    className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-hovmart-purple to-hovmart-light rounded-lg text-white text-sm font-medium hover:shadow-lg transition-all duration-300 group"
                  >
                    Send Email
                    <ChevronRight className="h-4 w-4 ml-1 transform group-hover:translate-x-1 transition-transform duration-300" />
                  </a>
                </div>
              </div>
            </div>

            {/* Address */}
            <div className="flex items-start space-x-5 group">
              <div className="bg-hovmart-purple/20 p-3 rounded-xl group-hover:bg-hovmart-purple/30 transition-colors duration-300">
                <MapPin className="h-6 w-6 text-hovmart-light" />
              </div>
              <div>
                <h3 className="text-white font-medium mb-1">Address</h3>
                <p className="text-white/80">
                  5th Floor Cardersanal Zone, Plot 596 Independence Ave, Abuja 900103, FCT
                </p>
                <p className="text-white/60 text-sm mt-2">
                  Visit us in person to discuss your real estate needs with our team of experts.
                </p>
              </div>
            </div>

            {/* Business Hours */}
            <div className="flex items-start space-x-5 group">
              <div className="bg-hovmart-purple/20 p-3 rounded-xl group-hover:bg-hovmart-purple/30 transition-colors duration-300">
                <Clock className="h-6 w-6 text-hovmart-light" />
              </div>
              <div>
                <h3 className="text-white font-medium mb-1">Business Hours</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-white/80">
                  <div className="flex justify-between pr-4">
                    <span>Monday - Friday:</span>
                    <span>9:00 AM - 6:00 PM</span>
                  </div>
                  <div className="flex justify-between pr-4">
                    <span>Saturday:</span>
                    <span>10:00 AM - 4:00 PM</span>
                  </div>
                  <div className="flex justify-between pr-4">
                    <span>Sunday:</span>
                    <span>Closed</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Map Section */}
        <div
          ref={mapRef}
          className="max-w-3xl mx-auto mt-16 bg-black/40 backdrop-blur-md rounded-3xl p-6 border border-white/10 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.5)] overflow-hidden transform transition-all duration-700"
          style={{
            opacity: isVisible.map ? 1 : 0,
            transform: isVisible.map ? "translateY(0)" : "translateY(30px)",
            transition: "opacity 1s ease-out 0.3s, transform 1s ease-out 0.3s",
          }}
        >
          <h3 className="text-xl font-medium text-white mb-4 flex items-center">
            <span className="bg-hovmart-purple/20 p-2 rounded-lg mr-3">
              <MapPin className="h-5 w-5 text-hovmart-light" />
            </span>
            Find Us
          </h3>
          <div className="aspect-video w-full rounded-2xl overflow-hidden relative">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3940.1353383146366!2d7.4898247!3d9.0575582!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x104e0ba5c5936d65%3A0x5e8f35e8a0f2b5c0!2sIndependence%20Ave%2C%20Abuja!5e0!3m2!1sen!2sng!4v1651234567890!5m2!1sen!2sng"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="absolute inset-0"
            ></iframe>
            <div className="absolute inset-0 pointer-events-none border border-white/10 rounded-2xl"></div>
          </div>
        </div>
      </div>
    </section>
  )
}
