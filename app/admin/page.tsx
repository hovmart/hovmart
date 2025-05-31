import AdminLayout from "@/components/admin/admin-layout"
import DashboardStats from "@/components/admin/dashboard-stats"
import ActivityLog from "@/components/admin/activity-log"
import NotificationCenter from "@/components/admin/notification-center"
import QuickActions from "@/components/admin/quick-actions"

export default function AdminPage() {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <DashboardStats />
        <QuickActions />
        <div className="grid gap-6 md:grid-cols-2">
          <NotificationCenter />
          <ActivityLog />
        </div>
      </div>
    </AdminLayout>
  )
}
