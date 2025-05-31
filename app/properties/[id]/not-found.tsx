import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function PropertyNotFound() {
  return (
    <div className="container mx-auto px-4 py-16 text-center">
      <h1 className="text-4xl font-bold mb-4">Property Not Found</h1>
      <p className="text-gray-600 mb-8 max-w-md mx-auto">
        We couldn't find the property you're looking for. It may have been removed or the URL might be incorrect.
      </p>
      <Button asChild>
        <Link href="/properties">Browse All Properties</Link>
      </Button>
    </div>
  )
}
