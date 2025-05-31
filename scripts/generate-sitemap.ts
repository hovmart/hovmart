import fs from "fs"
import path from "path"
import { getAllRoutes, getLastModified, getRouteConfig, baseUrl } from "../lib/sitemap-utils"

// Function to generate the XML content
function generateSitemapXml(): string {
  const routes = getAllRoutes()

  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n'
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'

  for (const route of routes) {
    const config = getRouteConfig(route)
    const lastMod = getLastModified(route).toISOString().split("T")[0]

    xml += "  <url>\n"
    xml += `    <loc>${baseUrl}${route}</loc>\n`
    xml += `    <lastmod>${lastMod}</lastmod>\n`
    xml += `    <changefreq>${config.changeFrequency}</changefreq>\n`
    xml += `    <priority>${config.priority}</priority>\n`
    xml += "  </url>\n"
  }

  xml += "</urlset>"
  return xml
}

// Main function to generate and save the sitemap
function main() {
  const xml = generateSitemapXml()
  const outputPath = path.join(process.cwd(), "public", "sitemap.xml")

  fs.writeFileSync(outputPath, xml)
  console.log(`Sitemap generated at ${outputPath}`)
}

// Run the script
main()
