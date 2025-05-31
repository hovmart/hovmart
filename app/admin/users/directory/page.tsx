import { UserDirectory } from "@/components/admin/user-directory"

export const metadata = {
  title: "User Directory | Hovmart Admin",
  description: "Comprehensive directory of all users on the Hovmart platform",
}

export default function UserDirectoryPage() {
  return (
    <div className="container mx-auto py-6">
      <UserDirectory />
    </div>
  )
}
