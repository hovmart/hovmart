import { Suspense } from "react"
import { notFound } from "next/navigation"
import { Footer } from "@/components/footer"
import { PropertyDetailView } from "@/components/properties/property-detail-view"
import { PropertyDetailSkeleton } from "@/components/properties/property-detail-skeleton"
import { sampleProperties } from "@/components/properties/property-grid-data"

export async function generateMetadata({ params }: { params: { id: string } }) {
  const propertyId = params.id
  const property = sampleProperties.find((p) => p.id === propertyId)

  if (!property) {
    return {
      title: "Property Not Found | Hovmart",
      description: "The property you're looking for could not be found.",
    }
  }

  return {
    title: `${property.title} | Hovmart`,
    description: `View details for ${property.title} located in ${property.location}.`,
  }
}

export default function PropertyDetailPage({ params }: { params: { id: string } }) {
  const propertyId = params.id
  const property = sampleProperties.find((p) => p.id === propertyId)

  if (!property) {
    notFound()
  }

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        <Suspense fallback={<PropertyDetailSkeleton />}>
          <PropertyDetailView property={property} />
        </Suspense>
      </main>
      <Footer />
    </div>
  )
}
