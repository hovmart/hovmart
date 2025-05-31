"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BadgeCheck, Building2, Calendar, FileText, MessageSquare, Settings, User } from "lucide-react"
import Link from "next/link"

export default function QuickActions() {
  const actions = [
    {
      title: "Add Property",
      description: "Create a new property listing",
      icon: <Building2 className="h-5 w-5" />,
      href: "/admin/properties/add",
      color: "bg-amber-100 text-amber-600",
    },
    {
      title: "Approve Properties",
      description: "Review pending property submissions",
      icon: <Building2 className="h-5 w-5" />,
      href: "/admin/properties/approvals",
      color: "bg-orange-100 text-orange-600",
    },
    {
      title: "Verify Users",
      description: "Review user verification requests",
      icon: <BadgeCheck className="h-5 w-5" />,
      href: "/admin/users",
      color: "bg-blue-100 text-blue-600",
    },
    {
      title: "Manage Bookings",
      description: "View and manage property bookings",
      icon: <Calendar className="h-5 w-5" />,
      href: "/admin/bookings",
      color: "bg-green-100 text-green-600",
    },
    {
      title: "Respond to Messages",
      description: "Reply to customer inquiries",
      icon: <MessageSquare className="h-5 w-5" />,
      href: "/admin/messages",
      color: "bg-purple-100 text-purple-600",
    },
    {
      title: "Create Blog Post",
      description: "Add new content to your blog",
      icon: <FileText className="h-5 w-5" />,
      href: "/admin/content/blog",
      color: "bg-indigo-100 text-indigo-600",
    },
    {
      title: "Add User",
      description: "Create a new user account",
      icon: <User className="h-5 w-5" />,
      href: "/admin/users/add",
      color: "bg-cyan-100 text-cyan-600",
    },
    {
      title: "System Settings",
      description: "Configure system preferences",
      icon: <Settings className="h-5 w-5" />,
      href: "/admin/settings",
      color: "bg-gray-100 text-gray-600",
    },
  ]

  return (
    <Card className="border-none shadow-md">
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
        <CardDescription>Frequently used administrative tasks</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {actions.map((action, index) => (
            <Link href={action.href} key={index}>
              <div className="border rounded-lg p-4 hover:bg-gray-50 transition-colors h-full flex flex-col">
                <div className={`p-2 rounded-full w-fit ${action.color}`}>{action.icon}</div>
                <h3 className="font-medium mt-3">{action.title}</h3>
                <p className="text-sm text-gray-500 mt-1">{action.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
