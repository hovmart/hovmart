"use client"

import { useRef, useEffect, useState } from "react"
import { Heart, Lightbulb, Gem, Users } from "lucide-react"

export function AboutValues() {
  const sectionRef = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current)
      }
    }
  }, [])

  const values = [
    {
      icon: <Gem className="h-6 w-6 text-hovmart-purple" />,
      title: "Excellence",
      description:
        "We strive for excellence in everything we do, from the properties we list to the service we provide.",
      delay: 0,
    },
    {
      icon: <Heart className="h-6 w-6 text-hovmart-purple" />,
      title: "Integrity",
      description:
        "We operate with honesty, transparency, and ethical standards that build trust with our customers and partners.",
      delay: 200,
    },
    {
      icon: <Lightbulb className="h-6 w-6 text-hovmart-purple" />,
      title: "Innovation",
      description:
        "We continuously seek new ways to improve the real estate experience through technology and creative solutions.",
      delay: 400,
    },
    {
      icon: <Users className="h-6 w-6 text-hovmart-purple" />,
      title: "Community",
      description:
        "We believe in building strong relationships and contributing positively to the communities we serve.",
      delay: 600,
    },
  ]

  return (
    <section ref={sectionRef} className="py-24 relative overflow-hidden bg-gradient-to-b from-white to-[#f8f8fa]">
      {/* Premium dividers and decorative elements */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-hovmart-purple/30 to-transparent"></div>
      <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-hovmart-purple/5 blur-3xl"></div>
      <div className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full bg-hovmart-light/5 blur-3xl"></div>

      {/* Subtle pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.02] z-0"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%234b0082' fillOpacity='0.1' fillRule='evenodd'/%3E%3C/svg%3E")`,
        }}
      ></div>

      <div className="container mx-auto px-6 lg:px-8 relative z-10">
        <div
          className="max-w-3xl mx-auto text-center mb-16 transition-all duration-1000"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(30px)",
          }}
        >
          {/* Premium section heading with decorative elements */}
          <div className="inline-block mb-4 relative">
            <div className="absolute -inset-4 bg-hovmart-purple/5 rounded-full blur-lg opacity-70"></div>
            <div className="relative flex items-center justify-center space-x-2">
              <div className="h-px w-8 bg-gradient-to-r from-transparent via-hovmart-purple/50 to-transparent"></div>
              <span className="text-sm uppercase tracking-wider text-hovmart-purple/80 font-medium px-4 py-1.5 rounded-full bg-hovmart-purple/5 border border-hovmart-purple/10">
                Our Values
              </span>
              <div className="h-px w-8 bg-gradient-to-r from-transparent via-hovmart-purple/50 to-transparent"></div>
            </div>
          </div>

          {/* Enhanced typography */}
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">
            The Principles That{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-hovmart-purple via-[#8A2BE2] to-hovmart-light">
              Guide Us
            </span>
          </h2>

          {/* Refined paragraph */}
          <p className="text-lg text-gray-600 leading-relaxed">
            Our core values shape everything we do at Hovmart, from how we develop our platform to how we interact with
            our customers and partners.
          </p>
        </div>

        {/* Premium card grid with enhanced styling */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((value, index) => (
            <div
              key={index}
              className="group relative"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? "translateY(0)" : "translateY(30px)",
                transition: `opacity 0.8s ease-out ${value.delay}ms, transform 0.8s ease-out ${value.delay}ms`,
              }}
            >
              {/* Premium card with enhanced styling */}
              <div className="absolute -inset-1.5 bg-gradient-to-r from-hovmart-purple/10 to-hovmart-light/10 rounded-2xl blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="bg-white rounded-2xl p-8 shadow-lg transition-all duration-500 hover:shadow-xl hover:-translate-y-1 border border-gray-100 relative">
                {/* Sophisticated light reflection */}
                <div className="absolute -top-20 -left-20 w-40 h-40 bg-hovmart-purple/5 rounded-full blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-700"></div>

                {/* Premium corner accents */}
                <div className="absolute top-0 left-0 w-16 h-16">
                  <div className="absolute top-4 left-0 w-8 h-[1px] bg-gradient-to-r from-hovmart-purple/30 to-transparent"></div>
                  <div className="absolute top-0 left-4 h-8 w-[1px] bg-gradient-to-b from-hovmart-purple/30 to-transparent"></div>
                </div>
                <div className="absolute bottom-0 right-0 w-16 h-16">
                  <div className="absolute bottom-4 right-0 w-8 h-[1px] bg-gradient-to-l from-hovmart-purple/30 to-transparent"></div>
                  <div className="absolute bottom-0 right-4 h-8 w-[1px] bg-gradient-to-t from-hovmart-purple/30 to-transparent"></div>
                </div>

                <div className="bg-gradient-to-br from-hovmart-purple/10 to-hovmart-light/10 p-3 rounded-xl inline-block mb-4 relative group-hover:from-hovmart-purple/20 group-hover:to-hovmart-light/20 transition-all duration-500">
                  {value.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Enhanced CTA section */}
        <div
          className="mt-20 relative group"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(30px)",
            transition: "opacity 1s ease-out 800ms, transform 1s ease-out 800ms",
          }}
        >
          {/* Premium glow effect */}
          <div className="absolute -inset-3 bg-gradient-to-r from-hovmart-purple/20 via-hovmart-light/20 to-hovmart-purple/20 rounded-3xl blur-xl opacity-70"></div>

          <div className="bg-gradient-to-br from-hovmart-purple to-hovmart-light rounded-3xl p-10 text-white text-center max-w-3xl mx-auto shadow-lg relative overflow-hidden">
            {/* Sophisticated light reflection */}
            <div className="absolute -top-40 -left-40 w-80 h-80 bg-white/10 rounded-full blur-xl opacity-30"></div>
            <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-white/5 rounded-full blur-xl opacity-30"></div>

            {/* Premium corner accents */}
            <div className="absolute top-0 left-0 w-20 h-20">
              <div className="absolute top-6 left-0 w-12 h-[1px] bg-gradient-to-r from-white/50 to-transparent"></div>
              <div className="absolute top-0 left-6 h-12 w-[1px] bg-gradient-to-b from-white/50 to-transparent"></div>
            </div>
            <div className="absolute bottom-0 right-0 w-20 h-20">
              <div className="absolute bottom-6 right-0 w-12 h-[1px] bg-gradient-to-l from-white/50 to-transparent"></div>
              <div className="absolute bottom-0 right-6 h-12 w-[1px] bg-gradient-to-t from-white/50 to-transparent"></div>
            </div>

            <h3 className="text-2xl font-bold mb-4 relative">Join Our Journey</h3>
            <p className="text-white/90 mb-6 relative">
              We're on a mission to transform real estate in Nigeria. Whether you're looking to buy, sell, rent, or
              stay, Hovmart is here to make your experience exceptional.
            </p>
            <a
              href="/contact"
              className="inline-flex h-12 items-center justify-center rounded-full bg-white px-8 text-sm font-medium text-hovmart-purple transition-all hover:bg-white/90 hover:shadow-md active:scale-[0.98] relative"
            >
              Get in Touch
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
