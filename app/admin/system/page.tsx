import AdminLayout from "@/components/admin/admin-layout"
import SystemHealth from "@/components/admin/system-health"

export default function SystemPage() {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">System Health</h1>
          <p className="text-gray-500">Monitor and manage system performance</p>
        </div>
        <SystemHealth />
      </div>
    </AdminLayout>
  )
}
