"use client"

import { useEffect, useRef } from "react"
import Image from "next/image"

export function AboutHero() {
  const heroRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      if (!heroRef.current) return
      const scrollY = window.scrollY
      const opacity = 1 - Math.min(scrollY / 500, 0.5)
      const translateY = scrollY * 0.3

      heroRef.current.style.opacity = opacity.toString()
      heroRef.current.style.transform = `translateY(${translateY}px)`
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden">
      {/* Enhanced background elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-white to-[#f8f8fa] z-0"></div>

      {/* Sophisticated geometric elements */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-hovmart-purple/5 blur-[120px] z-0"></div>
      <div className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] rounded-full bg-hovmart-light/5 blur-[100px] z-0"></div>

      {/* Subtle pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.02] z-0"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%234b0082' fillOpacity='0.2'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      ></div>

      <div className="container mx-auto px-6 lg:px-8 relative z-10">
        <div ref={heroRef} className="flex flex-col items-center text-center transition-all duration-300">
          {/* Premium decorative element */}
          <div className="inline-block mb-6 relative">
            <div className="absolute -inset-6 bg-gradient-to-r from-hovmart-purple/5 via-hovmart-light/10 to-hovmart-purple/5 rounded-full blur-xl"></div>
            <div className="relative flex items-center justify-center space-x-2">
              <div className="h-px w-12 bg-gradient-to-r from-transparent via-hovmart-purple/50 to-transparent"></div>
              <span className="text-sm uppercase tracking-wider text-hovmart-purple/80 font-medium px-3 py-1 rounded-full bg-hovmart-purple/5 border border-hovmart-purple/10">
                Our Story
              </span>
              <div className="h-px w-12 bg-gradient-to-r from-transparent via-hovmart-purple/50 to-transparent"></div>
            </div>
          </div>

          {/* Enhanced typography with refined gradient */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 max-w-4xl leading-tight">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-hovmart-purple via-[#8A2BE2] to-hovmart-light">
              Meet the Visionaries
            </span>{" "}
            <span className="text-gray-900">Behind Hovmart</span>
          </h1>

          {/* Refined paragraph with better typography */}
          <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto mb-12 leading-relaxed font-light">
            We're on a mission to transform the real estate landscape in Nigeria with innovative solutions and
            exceptional service.
          </p>

          {/* Premium image container with enhanced effects */}
          <div className="relative w-full max-w-5xl mx-auto mt-8">
            <div className="absolute -inset-4 bg-gradient-to-r from-hovmart-purple/20 via-transparent to-hovmart-light/20 rounded-3xl blur-xl opacity-50"></div>
            <div className="aspect-[21/9] relative rounded-2xl overflow-hidden shadow-2xl border border-white/50">
              {/* Elegant overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#000000]/80 via-[#000000]/40 to-transparent z-10"></div>

              {/* Premium corner accents */}
              <div className="absolute top-0 left-0 w-20 h-20 z-20">
                <div className="absolute top-6 left-0 w-12 h-[1px] bg-gradient-to-r from-white/70 to-transparent"></div>
                <div className="absolute top-0 left-6 h-12 w-[1px] bg-gradient-to-b from-white/70 to-transparent"></div>
              </div>
              <div className="absolute top-0 right-0 w-20 h-20 z-20">
                <div className="absolute top-6 right-0 w-12 h-[1px] bg-gradient-to-l from-white/70 to-transparent"></div>
                <div className="absolute top-0 right-6 h-12 w-[1px] bg-gradient-to-b from-white/70 to-transparent"></div>
              </div>
              <div className="absolute bottom-0 left-0 w-20 h-20 z-20">
                <div className="absolute bottom-6 left-0 w-12 h-[1px] bg-gradient-to-r from-white/70 to-transparent"></div>
                <div className="absolute bottom-0 left-6 h-12 w-[1px] bg-gradient-to-t from-white/70 to-transparent"></div>
              </div>
              <div className="absolute bottom-0 right-0 w-20 h-20 z-20">
                <div className="absolute bottom-6 right-0 w-12 h-[1px] bg-gradient-to-l from-white/70 to-transparent"></div>
                <div className="absolute bottom-0 right-6 h-12 w-[1px] bg-gradient-to-t from-white/70 to-transparent"></div>
              </div>

              <Image
                src="/hovmart-billboard.png"
                alt="Hovmart Team"
                fill
                className="object-cover object-center transform scale-[1.01] hover:scale-[1.03] transition-transform duration-1000"
                priority
              />

              {/* Sophisticated caption */}
              <div className="absolute bottom-8 left-0 right-0 z-20 text-center">
                <span className="inline-block py-2 px-8 bg-white/10 backdrop-blur-md text-white font-medium rounded-full text-lg border border-white/20 shadow-lg">
                  Redefining Real Estate
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
