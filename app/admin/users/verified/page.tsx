import type { Metadata } from "next"
import VerifiedUsersManagement from "@/components/admin/verified-users-management"

export const metadata: Metadata = {
  title: "Verified Users | Hovmart Admin",
  description: "Manage verified users on the Hovmart platform",
}

export default function VerifiedUsersPage() {
  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <VerifiedUsersManagement />
    </div>
  )
}
