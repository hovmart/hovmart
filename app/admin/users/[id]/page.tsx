import AdminLayout from "@/components/admin/admin-layout"
import UserProfileView from "@/components/admin/user-profile-view"

export default function UserProfilePage({ params }: { params: { id: string } }) {
  return (
    <AdminLayout>
      <UserProfileView userId={params.id} />
    </AdminLayout>
  )
}
