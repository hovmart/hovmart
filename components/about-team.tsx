"use client"

import type React from "react"

import { useRef, useEffect, useState } from "react"
import Image from "next/image"
import { Linkedin, Twitter, Mail } from "lucide-react"

export function AboutTeam() {
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

  const teamMembers = [
    {
      name: "Isaac Chindah",
      role: "Chief Executive Officer",
      image: "/team/isaac-chindah.jpeg",
      bio: "Isaac brings visionary leadership and strategic direction to Hovmart. With extensive experience in real estate and technology, he's passionate about creating innovative solutions that transform how people interact with property.",
      delay: 0,
    },
    {
      name: "Daniel Ochowechi",
      role: "Chief Technology Officer",
      image: "/team/daniel-ochowechi.jpeg",
      bio: "Daniel leads our technology initiatives with expertise in software development and digital innovation. His technical acumen drives the development of our cutting-edge platform and ensures seamless user experiences.",
      delay: 200,
    },
    {
      name: "Ojei Ekun",
      role: "Chief Operations Officer",
      image: "/team/ojei-ekun.jpeg",
      bio: "Ojei oversees our day-to-day operations with precision and excellence. His background in business operations and customer service ensures that Hovmart delivers exceptional value to all stakeholders.",
      delay: 400,
    },
  ]

  return (
    <section ref={sectionRef} className="py-24 relative overflow-hidden bg-gradient-to-b from-[#f8f8fa] to-white">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-hovmart-purple/20 to-transparent"></div>
      <div className="absolute -top-40 -left-40 w-80 h-80 rounded-full bg-hovmart-purple/5 blur-3xl"></div>
      <div className="absolute -bottom-40 -right-40 w-80 h-80 rounded-full bg-hovmart-light/5 blur-3xl"></div>

      <div className="container mx-auto px-6 lg:px-8 relative z-10">
        <div
          className="max-w-3xl mx-auto text-center mb-16 transition-all duration-1000"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(30px)",
          }}
        >
          <div className="inline-block mb-4">
            <div className="flex items-center justify-center space-x-2">
              <div className="h-px w-6 bg-hovmart-purple/30"></div>
              <span className="text-sm uppercase tracking-wider text-hovmart-purple/80 font-medium">Our Team</span>
              <div className="h-px w-6 bg-hovmart-purple/30"></div>
            </div>
          </div>

          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">
            Meet the Minds Behind{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-hovmart-purple to-hovmart-light">
              Hovmart
            </span>
          </h2>

          <p className="text-lg text-gray-600 leading-relaxed">
            Our leadership team combines expertise in real estate, technology, and business operations to deliver an
            exceptional platform that meets the needs of our diverse users.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-10 lg:gap-16">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className="group"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? "translateY(0)" : "translateY(30px)",
                transition: `opacity 0.8s ease-out ${member.delay}ms, transform 0.8s ease-out ${member.delay}ms`,
              }}
            >
              <div className="relative mb-6 overflow-hidden rounded-2xl shadow-lg transition-all duration-500 group-hover:shadow-xl">
                <div className="aspect-[3/4] relative">
                  <Image
                    src={member.image || "/placeholder.svg"}
                    alt={member.name}
                    fill
                    className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                    <div className="flex justify-center space-x-4">
                      <SocialButton icon={<Twitter size={18} />} />
                      <SocialButton icon={<Linkedin size={18} />} />
                      <SocialButton icon={<Mail size={18} />} />
                    </div>
                  </div>
                </div>
              </div>

              <div className="text-center">
                <h3 className="text-xl font-bold text-gray-900 mb-1">{member.name}</h3>
                <p className="text-hovmart-purple font-medium mb-4">{member.role}</p>
                <p className="text-gray-600">{member.bio}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function SocialButton({ icon }: { icon: React.ReactNode }) {
  return (
    <button className="h-10 w-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white hover:bg-hovmart-purple transition-all duration-300">
      {icon}
    </button>
  )
}
