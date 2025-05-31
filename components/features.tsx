"use client"

import { useRef } from "react"
import Image from "next/image"
import { motion, useInView } from "framer-motion"
import { Shield, Clock, CreditCard, Search, Heart, MapPin, Home, Users } from "lucide-react"

export function Features() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const features = [
    {
      icon: <Search className="w-6 h-6 text-hovmart-purple" />,
      title: "Smart Search",
      description:
        "Find your ideal property with our advanced filtering system. Search by location, price, amenities, and more.",
    },
    {
      icon: <Shield className="w-6 h-6 text-hovmart-purple" />,
      title: "Verified Listings",
      description: "All properties are thoroughly verified by our team to ensure quality and accuracy of information.",
    },
    {
      icon: <Clock className="w-6 h-6 text-hovmart-purple" />,
      title: "Real-time Availability",
      description: "See property availability in real-time and book instantly without waiting for approval.",
    },
    {
      icon: <CreditCard className="w-6 h-6 text-hovmart-purple" />,
      title: "Secure Payments",
      description: "Our secure payment system ensures your transactions are protected and hassle-free.",
    },
    {
      icon: <Heart className="w-6 h-6 text-hovmart-purple" />,
      title: "Save Favorites",
      description: "Save your favorite properties to compare later or share with family and friends.",
    },
    {
      icon: <MapPin className="w-6 h-6 text-hovmart-purple" />,
      title: "Interactive Maps",
      description: "Explore neighborhoods with our interactive maps and find properties in your preferred location.",
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  }

  return (
    <section className="py-20 md:py-28 bg-gradient-to-b from-white to-gray-50 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-hovmart-purple/20 to-transparent"></div>
      <div className="absolute bottom-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-amber-300/30 to-transparent"></div>

      {/* Subtle background pattern */}
      <div
        className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%239C92AC' fillOpacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
        }}
      ></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center px-3 py-1.5 rounded-full bg-gradient-to-r from-hovmart-purple/10 to-amber-400/10 text-hovmart-purple text-sm font-medium mb-6">
            <span className="mr-2">⚡</span>
            <span>Why Choose Hovmart</span>
          </div>

          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Discover the <span className="text-hovmart-purple">Hovmart</span> Advantage
          </h2>

          <p className="text-lg text-gray-600">
            We provide a seamless property search and booking experience with features designed to make finding your
            dream property effortless.
          </p>
        </div>

        <div ref={ref} className="relative">
          {/* Features grid */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all border border-gray-100 group"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-r from-hovmart-purple/10 to-amber-400/10 mb-4 group-hover:from-hovmart-purple/20 group-hover:to-amber-400/20 transition-colors">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-hovmart-purple transition-colors">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* Decorative elements */}
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-gradient-to-br from-amber-400/10 to-hovmart-purple/10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-gradient-to-tr from-hovmart-purple/10 to-amber-400/10 rounded-full blur-3xl"></div>
        </div>

        {/* Testimonial section */}
        <div className="mt-24 md:mt-32">
          <div className="bg-gradient-to-r from-hovmart-purple/5 to-amber-400/5 rounded-2xl p-8 md:p-12 relative overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-hovmart-purple/30 to-transparent"></div>
            <div className="absolute bottom-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-amber-300/30 to-transparent"></div>

            <div className="absolute -top-10 -right-10 w-40 h-40 bg-gradient-to-br from-amber-400/20 to-hovmart-purple/20 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-gradient-to-tr from-hovmart-purple/20 to-amber-400/20 rounded-full blur-3xl"></div>

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-center relative z-10">
              <div className="lg:col-span-3">
                <div className="inline-flex items-center px-3 py-1.5 rounded-full bg-white/80 backdrop-blur-sm text-hovmart-purple text-sm font-medium mb-6">
                  <span className="mr-2">💬</span>
                  <span>Customer Testimonial</span>
                </div>

                <blockquote className="text-xl md:text-2xl font-medium text-gray-900 mb-6">
                  "Hovmart made finding our dream home a breeze. The platform is intuitive, the properties are
                  high-quality, and the customer service is exceptional. We couldn't be happier with our new beachfront
                  villa!"
                </blockquote>

                <div className="flex items-center">
                  <div className="mr-4">
                    <Image
                      src="/woman-portrait.png"
                      alt="Sarah Johnson"
                      width={56}
                      height={56}
                      className="rounded-full border-2 border-white shadow-sm"
                    />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">Sarah Johnson</div>
                    <div className="text-sm text-gray-600">Property Owner, Lagos</div>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-2 relative">
                <div className="aspect-[4/3] rounded-xl overflow-hidden shadow-xl relative">
                  <Image
                    src="/lagos-beachfront-luxury-home.png"
                    alt="Luxury Beachfront Home"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="text-xl font-bold text-white mb-1">Beachfront Luxury Home</h3>
                    <div className="flex items-center text-white/90">
                      <MapPin className="w-4 h-4 mr-1" />
                      <span className="text-sm">Victoria Island, Lagos</span>
                    </div>
                  </div>
                </div>

                {/* Stats */}
                <div className="absolute -bottom-6 -right-6 bg-white rounded-lg shadow-lg p-4 border border-gray-100">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center">
                      <Home className="w-4 h-4 text-hovmart-purple mr-1" />
                      <span className="text-sm font-medium">5 Beds</span>
                    </div>
                    <div className="flex items-center">
                      <Users className="w-4 h-4 text-hovmart-purple mr-1" />
                      <span className="text-sm font-medium">10 Guests</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
