"use client"

import { useEffect, useState } from "react"

interface CountdownProps {
  targetDate: Date
}

export function Countdown({ targetDate }: CountdownProps) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = targetDate.getTime() - new Date().getTime()

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        })
      }
    }

    calculateTimeLeft()
    const timer = setInterval(calculateTimeLeft, 1000)

    return () => clearInterval(timer)
  }, [targetDate])

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-[#f8f8fa] z-0"></div>
      <div className="absolute -bottom-24 -right-24 w-[400px] h-[400px] rounded-full bg-hovmart-purple/5 z-0"></div>
      <div className="absolute -top-24 -left-24 w-[300px] h-[300px] rounded-full bg-hovmart-light/5 z-0"></div>

      <div className="container mx-auto px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto relative group">
          {/* Enhanced glass card effect */}
          <div className="absolute inset-0 -m-8 bg-gradient-to-br from-white/40 to-white/10 backdrop-blur-xl rounded-3xl border border-white/30 shadow-[0_8px_32px_0_rgba(75,0,130,0.1)] z-0 group-hover:shadow-[0_12px_42px_0_rgba(75,0,130,0.2)] transition-all duration-700 ease-out overflow-hidden">
            {/* Elegant gradient border */}
            <div className="absolute inset-0 rounded-3xl">
              <div className="absolute inset-0 rounded-3xl p-[1px] overflow-hidden">
                <div className="absolute inset-0 bg-[length:200%_200%] bg-gradient-to-tr from-hovmart-purple/0 via-hovmart-purple/20 to-hovmart-light/10 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 animate-subtle-gradient"></div>
              </div>
            </div>

            {/* Sophisticated light reflections */}
            <div className="absolute -top-[100%] -left-[100%] w-[300%] h-[300%] bg-[radial-gradient(circle,rgba(255,255,255,0.1)_0%,transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-1000 ease-in-out"></div>

            {/* Elegant moving highlight */}
            <div className="absolute top-0 left-0 right-0 h-full w-full overflow-hidden">
              <div className="absolute -top-[100%] -left-[100%] w-[50%] h-[200%] bg-gradient-to-br from-white/0 via-white/10 to-white/0 rotate-45 transform-gpu opacity-0 group-hover:opacity-100 group-hover:translate-x-[200%] group-hover:translate-y-[100%] transition-all duration-[2500ms] ease-in-out"></div>
            </div>

            {/* Sophisticated edge glow */}
            <div
              className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-all duration-1000 ease-out"
              style={{
                background:
                  "linear-gradient(135deg, rgba(20,10,30,0.05) 0%, rgba(75,0,130,0.08) 30%, rgba(106,13,173,0.05) 70%, rgba(30,15,40,0.07) 100%)",
                boxShadow:
                  "inset 0 0 30px rgba(75,0,130,0.15), inset 0 0 12px rgba(0,0,0,0.1), inset 0 0 5px rgba(255,255,255,0.05)",
              }}
            ></div>

            {/* Modern inner highlight */}
            <div className="absolute inset-[1px] rounded-[calc(1.5rem-1px)] opacity-0 group-hover:opacity-100 transition-all duration-1000 ease-out overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-hovmart-purple/3 to-hovmart-light/5"></div>
              <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-hovmart-purple/20 to-transparent"></div>
              <div className="absolute top-0 bottom-0 left-0 w-[1px] bg-gradient-to-b from-transparent via-white/20 to-transparent"></div>
              <div className="absolute top-0 bottom-0 right-0 w-[1px] bg-gradient-to-b from-transparent via-hovmart-purple/20 to-transparent"></div>
            </div>

            {/* Animated light sweep */}
            <div className="absolute inset-0 rounded-3xl overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-out">
              <div className="absolute -top-[100%] -left-[100%] w-[150%] h-[300%] bg-gradient-to-br from-transparent via-white/5 to-transparent rotate-45 transform-gpu group-hover:translate-x-[100%] group-hover:translate-y-[33%] transition-transform duration-2000 ease-out"></div>
            </div>
          </div>

          {/* Enhanced light reflection effect */}
          <div className="absolute -top-4 -left-4 -right-4 h-24 bg-gradient-to-r from-hovmart-purple/10 via-white/30 to-hovmart-light/10 rounded-t-3xl blur-md z-0 group-hover:bg-gradient-to-r group-hover:from-hovmart-purple/20 group-hover:via-white/40 group-hover:to-hovmart-light/20 transition-all duration-700"></div>

          {/* Additional glass highlights */}
          <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white/20 to-transparent rounded-b-3xl z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-hovmart-purple/5 to-hovmart-light/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-0"></div>

          {/* Content container */}
          <div className="relative z-10 p-10 mb-10">
            {/* Glowing orb decorations */}
            <div className="absolute -left-4 top-1/2 w-8 h-8 rounded-full bg-hovmart-purple/20 blur-md"></div>
            <div className="absolute -right-4 top-1/2 w-8 h-8 rounded-full bg-hovmart-light/20 blur-md"></div>

            <h2 className="text-3xl md:text-5xl font-bold text-center mb-4">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-hovmart-purple to-hovmart-light">
                Launching In
              </span>
            </h2>

            {/* Subtle divider */}
            <div className="h-px w-32 bg-gradient-to-r from-transparent via-white/80 to-transparent mx-auto"></div>
          </div>

          {/* Floating glass particles */}
          <div className="absolute top-1/4 right-1/3 w-3 h-3 rounded-full bg-hovmart-purple/30 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-700 delay-100 animate-float"></div>
          <div className="absolute bottom-1/3 left-1/4 w-2 h-2 rounded-full bg-hovmart-light/30 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-700 delay-300 animate-float animation-delay-1000"></div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10">
            <CountdownItem value={timeLeft.days} label="Days" />
            <CountdownItem value={timeLeft.hours} label="Hours" />
            <CountdownItem value={timeLeft.minutes} label="Minutes" />
            <CountdownItem value={timeLeft.seconds} label="Seconds" />
          </div>
        </div>
      </div>
      {/* Floating glass orbs */}
      <div className="absolute bottom-20 left-20 w-16 h-16 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 animate-float"></div>
      <div className="absolute top-40 right-40 w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 animate-float animation-delay-1000"></div>
    </section>
  )
}

interface CountdownItemProps {
  value: number
  label: string
}

function CountdownItem({ value, label }: CountdownItemProps) {
  return (
    <div className="flex flex-col items-center group">
      <div className="relative w-full aspect-square">
        {/* Glass effect container */}
        <div className="absolute inset-0 flex items-center justify-center rounded-2xl overflow-hidden transition-all duration-500 group-hover:translate-y-[-4px]">
          {/* Glass background */}
          <div className="absolute inset-0 bg-white/20 backdrop-blur-md border border-white/30 shadow-[0_8px_32px_0_rgba(75,0,130,0.15)]"></div>

          {/* Light reflection */}
          <div className="absolute -top-20 -left-20 w-full h-full rotate-45 bg-gradient-to-r from-white/0 via-white/40 to-white/0 group-hover:translate-x-full group-hover:translate-y-full transition-all duration-[1500ms]"></div>

          {/* Number */}
          <span className="relative text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-br from-hovmart-purple to-hovmart-light">
            {value}
          </span>

          {/* Bottom highlight */}
          <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/80 to-transparent"></div>
        </div>
      </div>
      <span className="text-sm font-medium text-gray-600 uppercase tracking-wider mt-4 bg-clip-text text-transparent bg-gradient-to-r from-hovmart-purple/80 to-hovmart-light/80">
        {label}
      </span>
    </div>
  )
}
