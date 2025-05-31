import type React from "react"
import { Mail, MapPin, Phone, Instagram, Twitter, Facebook, Linkedin } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export function ContactFooter() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-black border-t border-white/10 pt-16 pb-8">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between gap-12">
          {/* Brand Column */}
          <div className="md:w-1/3">
            <div className="mb-6">
              <Image src="/hovmart-logo.png" alt="Hovmart Limited" width={180} height={45} className="h-auto" />
            </div>
            <p className="text-gray-400 mb-6 max-w-md">
              Hovmart Limited is transforming the commerce landscape with innovative solutions designed for the modern
              consumer.
            </p>
            <div className="flex space-x-4">
              <SocialLink
                href="https://www.instagram.com/hovmart_"
                icon={<Instagram size={18} />}
                ariaLabel="Follow Hovmart on Instagram"
              />
              <SocialLink
                href="https://x.com/Hovmart_"
                icon={<Twitter size={18} />}
                ariaLabel="Follow Hovmart on X (Twitter)"
              />
              <SocialLink
                href="https://web.facebook.com/profile.php?id=61575919620601"
                icon={<Facebook size={18} />}
                ariaLabel="Follow Hovmart on Facebook"
              />
              <SocialLink href="#" icon={<Linkedin size={18} />} ariaLabel="Follow Hovmart on LinkedIn" />
            </div>
          </div>

          {/* Links Columns */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8 md:w-2/3">
            {/* Column 1 */}
            <div>
              <h3 className="text-sm font-semibold text-white mb-4 uppercase tracking-wider">Company</h3>
              <ul className="space-y-3">
                <FooterLink href="#about" label="About Us" />
                <FooterLink href="#services" label="Services" />
                <FooterLink href="#careers" label="Careers" />
                <FooterLink href="#press" label="Press" />
              </ul>
            </div>

            {/* Column 2 */}
            <div>
              <h3 className="text-sm font-semibold text-white mb-4 uppercase tracking-wider">Legal</h3>
              <ul className="space-y-3">
                <FooterLink href="#privacy" label="Privacy Policy" />
                <FooterLink href="#terms" label="Terms of Service" />
                <FooterLink href="#cookies" label="Cookie Policy" />
                <FooterLink href="#compliance" label="Compliance" />
              </ul>
            </div>

            {/* Column 3 - Contact */}
            <div>
              <h3 className="text-sm font-semibold text-white mb-4 uppercase tracking-wider">Contact</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <MapPin className="h-5 w-5 text-hovmart-purple mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-gray-400">
                    5th Floor Cardersanal Zone, Plot 596 Independence Ave, Abuja 900103, FCT
                  </span>
                </li>
                <li className="flex items-center">
                  <Phone className="h-5 w-5 text-hovmart-purple mr-3 flex-shrink-0" />
                  <a
                    href="tel:+2348083351686"
                    className="text-sm text-gray-400 hover:text-hovmart-purple transition-colors"
                  >
                    +234 808 335 1686
                  </a>
                </li>
                <li className="flex items-center">
                  <Mail className="h-5 w-5 text-hovmart-purple mr-3 flex-shrink-0" />
                  <a
                    href="mailto:info@hovmart.com"
                    className="text-sm text-gray-400 hover:text-hovmart-purple transition-colors"
                  >
                    info@hovmart.com
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-500">© {currentYear} Hovmart Limited. All rights reserved.</p>
          <div className="mt-4 md:mt-0 flex space-x-6">
            <Link href="#terms" className="text-sm text-gray-500 hover:text-hovmart-purple transition-colors">
              Terms
            </Link>
            <Link href="#privacy" className="text-sm text-gray-500 hover:text-hovmart-purple transition-colors">
              Privacy
            </Link>
            <Link href="#sitemap" className="text-sm text-gray-500 hover:text-hovmart-purple transition-colors">
              Sitemap
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

function FooterLink({ href, label }: { href: string; label: string }) {
  return (
    <li>
      <Link href={href} className="text-sm text-gray-400 hover:text-hovmart-purple transition-colors">
        {label}
      </Link>
    </li>
  )
}

function SocialLink({ href, icon, ariaLabel }: { href: string; icon: React.ReactNode; ariaLabel: string }) {
  return (
    <a
      href={href}
      className="h-10 w-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:bg-hovmart-purple hover:text-white transition-all duration-300"
      target="_blank"
      rel="noopener noreferrer"
      aria-label={ariaLabel}
    >
      {icon}
    </a>
  )
}
