import MediaManagement from "@/components/admin/media-management"
import AdminLayout from "@/components/admin/admin-layout"

export const metadata = {
  title: "Media Management - Hovmart Admin",
  description: "Manage your media files and images",
}

export default function MediaPage() {
  return (
    <AdminLayout>
      <MediaManagement />
    </AdminLayout>
  )
}
