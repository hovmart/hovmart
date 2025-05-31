import type React from "react"
import "@/app/globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import type { Metadata } from "next"
import { Poppins } from "next/font/google"

// Initialize Poppins font
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Hovmart Limited - Your Smart Destination for Real Estate",
  description:
    "Hovmart Limited offers premium real estate services, property deals, and shortlet apartments. Buy, sell, rent, and stay - all in one place.",
  keywords:
    "real estate, property deals, shortlet apartments, Hovmart, Nigeria real estate, Abuja properties, buy property, rent apartment",
  authors: [{ name: "Hovmart Limited" }],
  creator: "Hovmart Limited",
  publisher: "Hovmart Limited",
  formatDetection: {
    email: true,
    address: true,
    telephone: true,
  },
  metadataBase: new URL("https://hovmart.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Hovmart Limited - Your Smart Destination for Real Estate",
    description: "Buy, sell, rent, and stay - all in one place. Premium real estate services and shortlet apartments.",
    url: "https://hovmart.com",
    siteName: "Hovmart Limited",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/hovmart-billboard.png",
        width: 1200,
        height: 630,
        alt: "Hovmart Limited",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Hovmart Limited - Your Smart Destination for Real Estate",
    description: "Buy, sell, rent, and stay - all in one place. Premium real estate services and shortlet apartments.",
    creator: "@Hovmart_",
    images: ["/hovmart-billboard.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={poppins.variable}>
      <body className="min-h-screen bg-background font-sans antialiased">
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
