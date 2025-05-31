"use client"

import type React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import Image from "next/image"
import {
  BarChart3,
  Building2,
  Calendar,
  CreditCard,
  FileText,
  Globe,
  ImageIcon,
  LayoutDashboard,
  MessageSquare,
  Settings,
  ShoppingBag,
  Star,
  Tag,
  Users,
  X,
  PlusCircle,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { useState } from "react"

interface SidebarProps {
  open: boolean
  setOpen: (open: boolean) => void
}

interface SidebarItem {
  title: string
  href: string
  icon: React.ReactNode
  submenu?: SidebarItem[]
  badge?: string
  badgeColor?: string
}

export default function Sidebar({ open, setOpen }: SidebarProps) {
  const pathname = usePathname()
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null)
  const [pendingProperties, setPendingProperties] = useState<any[]>([]) // Replace 'any' with the actual type if available

  const sidebarItems: SidebarItem[] = [
    {
      title: "Dashboard",
      href: "/admin",
      icon: <LayoutDashboard className="h-5 w-5" />,
    },
    {
      title: "Properties",
      href: "/admin/properties",
      icon: <Building2 className="h-5 w-5" />,
      submenu: [
        {
          title: "All Properties",
          href: "/admin/properties",
          icon: <Building2 className="h-4 w-4" />,
        },
        {
          title: "Approvals",
          href: "/admin/properties/approvals",
          badge: pendingProperties.length > 0 ? pendingProperties.length.toString() : undefined,
          badgeColor: "bg-red-500",
          icon: <Building2 className="h-4 w-4" />,
        },
        {
          title: "Add Property",
          href: "/admin/properties/add",
          icon: <PlusCircle className="h-4 w-4" />,
        },
        {
          title: "Featured Properties",
          href: "/admin/properties/featured",
          icon: <Star className="h-4 w-4" />,
        },
        {
          title: "Categories",
          href: "/admin/properties/categories",
          icon: <Tag className="h-4 w-4" />,
        },
        {
          title: "Featured",
          href: "/admin/properties/featured",
          icon: <Star className="h-4 w-4" />,
        },
      ],
    },
    {
      title: "Users",
      href: "/admin/users",
      icon: <Users className="h-5 w-5" />,
      submenu: [
        {
          title: "All Users",
          href: "/admin/users",
          icon: <Users className="h-4 w-4" />,
        },
        {
          title: "Agents",
          href: "/admin/users/agents",
          icon: <Users className="h-4 w-4" />,
        },
        {
          title: "Admins",
          href: "/admin/users/admins",
          icon: <Users className="h-4 w-4" />,
        },
        {
          title: "User Directory",
          href: "/admin/users/directory",
          icon: <Users className="h-4 w-4" />,
        },
      ],
    },
    {
      title: "Bookings",
      href: "/admin/bookings",
      icon: <Calendar className="h-5 w-5" />,
    },
    {
      title: "Messages",
      href: "/admin/messages",
      icon: <MessageSquare className="h-5 w-5" />,
    },
    {
      title: "Payments",
      href: "/admin/payments",
      icon: <CreditCard className="h-5 w-5" />,
    },
    {
      title: "Analytics",
      href: "/admin/analytics",
      icon: <BarChart3 className="h-5 w-5" />,
    },
    {
      title: "Content",
      href: "/admin/content",
      icon: <FileText className="h-5 w-5" />,
      submenu: [
        {
          title: "Pages",
          href: "/admin/content/pages",
          icon: <FileText className="h-4 w-4" />,
        },
        {
          title: "Blog",
          href: "/admin/content/blog",
          icon: <FileText className="h-4 w-4" />,
        },
        {
          title: "Media",
          href: "/admin/content/media",
          icon: <ImageIcon className="h-4 w-4" />,
        },
      ],
    },
    {
      title: "Marketing",
      href: "/admin/marketing",
      icon: <ShoppingBag className="h-5 w-5" />,
      submenu: [
        {
          title: "Promotions",
          href: "/admin/marketing/promotions",
          icon: <Tag className="h-4 w-4" />,
        },
        {
          title: "SEO",
          href: "/admin/marketing/seo",
          icon: <Globe className="h-4 w-4" />,
        },
        {
          title: "Email Campaigns",
          href: "/admin/marketing/email",
          icon: <MessageSquare className="h-4 w-4" />,
        },
      ],
    },
    {
      title: "Settings",
      href: "/admin/settings",
      icon: <Settings className="h-5 w-5" />,
    },
  ]

  const isActive = (item: SidebarItem): boolean => {
    if (pathname === item.href) return true
    if (item.submenu && item.submenu.some((subItem) => pathname === subItem.href)) return true
    return false
  }

  const toggleSubmenu = (title: string) => {
    setOpenSubmenu(openSubmenu === title ? null : title)
  }

  return (
    <>
      {/* Mobile sidebar backdrop */}
      {open && <div className="fixed inset-0 z-40 bg-black/50 md:hidden" onClick={() => setOpen(false)} />}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-64 bg-white border-r shadow-sm transform transition-transform duration-200 ease-in-out md:translate-x-0 md:static md:z-0",
          open ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex items-center justify-between h-16 px-4 border-b">
          <Link href="/admin" className="flex items-center gap-2">
            <Image src="/hovmart-logo.png" alt="Hovmart Logo" width={120} height={40} className="h-8 w-auto" />
          </Link>
          <Button variant="ghost" size="icon" onClick={() => setOpen(false)} className="md:hidden">
            <X className="h-5 w-5" />
            <span className="sr-only">Close sidebar</span>
          </Button>
        </div>

        <div className="flex flex-col h-[calc(100%-4rem)] overflow-y-auto">
          <nav className="p-2 space-y-1 flex-1">
            {sidebarItems.map((item) => (
              <div key={item.href} className="mb-1">
                {item.submenu ? (
                  <Collapsible open={openSubmenu === item.title || isActive(item)}>
                    <CollapsibleTrigger asChild>
                      <button
                        onClick={() => toggleSubmenu(item.title)}
                        className={cn(
                          "flex items-center justify-between w-full px-3 py-2 text-sm font-medium rounded-md transition-colors",
                          isActive(item) ? "bg-purple-100 text-purple-900" : "text-gray-700 hover:bg-gray-100",
                        )}
                      >
                        <div className="flex items-center gap-3">
                          {item.icon}
                          {item.title}
                        </div>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className={cn(
                            "h-4 w-4 transition-transform",
                            openSubmenu === item.title || isActive(item) ? "transform rotate-180" : "",
                          )}
                        >
                          <polyline points="6 9 12 15 18 9"></polyline>
                        </svg>
                      </button>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <div className="mt-1 ml-4 pl-4 border-l border-gray-200 space-y-1">
                        {item.submenu.map((subItem) => (
                          <Link
                            key={subItem.href}
                            href={subItem.href}
                            className={cn(
                              "flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md transition-colors relative",
                              pathname === subItem.href
                                ? "bg-purple-100 text-purple-900"
                                : "text-gray-700 hover:bg-gray-100",
                            )}
                          >
                            {subItem.icon}
                            {subItem.title}
                            {subItem.badge && (
                              <span
                                className={cn(
                                  "absolute top-1/2 right-2 transform -translate-y-1/2 text-xs font-medium text-white px-2 py-0.5 rounded-full",
                                  subItem.badgeColor || "bg-gray-500",
                                )}
                              >
                                {subItem.badge}
                              </span>
                            )}
                          </Link>
                        ))}
                      </div>
                    </CollapsibleContent>
                  </Collapsible>
                ) : (
                  <Link
                    href={item.href}
                    className={cn(
                      "flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md transition-colors",
                      pathname === item.href ? "bg-purple-100 text-purple-900" : "text-gray-700 hover:bg-gray-100",
                    )}
                  >
                    {item.icon}
                    {item.title}
                  </Link>
                )}
              </div>
            ))}
          </nav>

          <div className="p-4 border-t mt-auto">
            <div className="bg-purple-50 rounded-lg p-3">
              <p className="text-sm font-medium text-purple-900">Need help?</p>
              <p className="text-xs text-purple-700 mt-1">Contact support for assistance with your admin dashboard.</p>
              <Button size="sm" className="w-full mt-2 bg-purple-600 hover:bg-purple-700 text-white">
                Contact Support
              </Button>
            </div>
          </div>
        </div>
      </aside>
    </>
  )
}
