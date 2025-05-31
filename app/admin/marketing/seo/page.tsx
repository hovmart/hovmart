import SeoManagement from "@/components/admin/seo-management"
import AdminLayout from "@/components/admin/admin-layout"

export const metadata = {
  title: "SEO Management - Hovmart Admin",
  description: "Manage your website's SEO settings and performance",
}

export default function SeoPage() {
  return (
    <AdminLayout>
      <SeoManagement />
    </AdminLayout>
  )
}
