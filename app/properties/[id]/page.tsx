import { notFound } from "next/navigation"
import { PropertyDetailView } from "@/components/properties/property-detail-view"
import { sampleProperties } from "@/components/properties/property-grid-data"

interface PropertyPageProps {
  params: {
    id: string
  }
}

export async function generateMetadata({ params }: PropertyPageProps) {
  const property = sampleProperties.find((p) => p.id === params.id)

  if (!property) {
    return {
      title: "Property Not Found | Hovmart",
      description: "The property you're looking for could not be found.",
    }
  }

  return {
    title: `${property.title} | Hovmart`,
    description: property.description || `${property.title} in ${property.location}`,
    openGraph: {
      images: [{ url: property.images[0] }],
    },
  }
}

export default function PropertyPage({ params }: PropertyPageProps) {
  const property = sampleProperties.find((p) => p.id === params.id)

  if (!property) {
    notFound()
  }

  return <PropertyDetailView property={property} />
}
