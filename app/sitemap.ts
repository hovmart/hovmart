import type { MetadataRoute } from "next"
import { getAllRoutes, getLastModified, getRouteConfig, baseUrl } from "@/lib/sitemap-utils"

export default function sitemap(): MetadataRoute.Sitemap {
  // Get all routes from the app directory
  const routes = getAllRoutes()

  // Map the routes to the format expected by Next.js
  return routes.map((route) => {
    const config = getRouteConfig(route)
    return {
      url: `${baseUrl}${route}`,
      lastModified: getLastModified(route),
      changeFrequency: config.changeFrequency as
        | "always"
        | "hourly"
        | "daily"
        | "weekly"
        | "monthly"
        | "yearly"
        | "never",
      priority: config.priority,
    }
  })
}
