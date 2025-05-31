import { PropertyCategories } from "@/components/properties/property-categories"
import { PropertyGrid } from "@/components/properties/property-grid"
import { PropertySearch } from "@/components/properties/property-search"
import { PropertyFilters } from "@/components/properties/property-filters"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

export default function PropertiesShowcase() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 pt-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl font-bold mb-8 text-center">Hovmart Properties Showcase</h1>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-6">Property Search</h2>
            <PropertySearch />
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-6">Property Filters</h2>
            <PropertyFilters totalProperties={8} />
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-6">Property Categories</h2>
            <PropertyCategories />
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-6">Property Grid</h2>
            <PropertyGrid />
          </section>
        </div>
      </main>
      <Footer />
    </div>
  )
}
