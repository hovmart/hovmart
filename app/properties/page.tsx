import type { Metadata } from "next"
import { PropertiesLayout } from "@/components/properties/properties-layout"
import "./styles.css"

export const metadata: Metadata = {
  title: "Properties | Hovmart Limited",
  description: "Explore our curated selection of premium properties, shortlet apartments, and real estate listings.",
}

export default function PropertiesPage() {
  return <PropertiesLayout />
}
