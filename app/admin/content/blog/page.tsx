import BlogManagement from "@/components/admin/blog-management"
import AdminLayout from "@/components/admin/admin-layout"

export const metadata = {
  title: "Blog Management - Hovmart Admin",
  description: "Manage your blog posts and articles",
}

export default function BlogPage() {
  return (
    <AdminLayout>
      <BlogManagement />
    </AdminLayout>
  )
}
