import fs from "fs"
import path from "path"

// Define the base URL for your site
export const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://hovmart.com"

// Define route priorities and change frequencies
export const routeConfig: Record<string, { priority: number; changeFrequency: string }> = {
  "/": { priority: 1.0, changeFrequency: "weekly" },
  "/contact": { priority: 0.8, changeFrequency: "monthly" },
  // Add more routes with specific configurations as needed
}

// Default values for routes not explicitly configured
const defaultConfig = {
  priority: 0.5,
  changeFrequency: "monthly",
}

// Function to get all page routes from the app directory
export function getAllRoutes(directory = "app"): string[] {
  const appDir = path.join(process.cwd(), directory)
  return getRoutesFromDirectory(appDir, "")
}

// Recursive function to scan directories for page files
function getRoutesFromDirectory(directory: string, basePath: string): string[] {
  const routes: string[] = []
  const entries = fs.readdirSync(directory, { withFileTypes: true })

  for (const entry of entries) {
    const fullPath = path.join(directory, entry.name)

    // Skip node_modules, .next, and other non-app directories
    if (entry.isDirectory() && !entry.name.startsWith(".") && entry.name !== "node_modules" && entry.name !== "api") {
      // Handle route groups (directories in parentheses)
      if (entry.name.startsWith("(") && entry.name.endsWith(")")) {
        // Route groups don't affect the URL path
        routes.push(...getRoutesFromDirectory(fullPath, basePath))
      } else if (entry.name === "page") {
        // If we find a page.js or page.tsx file, add the current path
        routes.push(basePath)
      } else {
        // For other directories, add them to the path
        const newBasePath = basePath === "/" ? `/${entry.name}` : `${basePath}/${entry.name}`

        routes.push(...getRoutesFromDirectory(fullPath, newBasePath))
      }
    } else if (
      (entry.isFile() && entry.name === "page.tsx") ||
      entry.name === "page.jsx" ||
      entry.name === "page.js" ||
      entry.name === "page.ts"
    ) {
      // If we find a page file at the root of a directory, add the path
      if (basePath === "") {
        routes.push("/")
      } else {
        routes.push(basePath)
      }
    }
  }

  return routes
}

// Function to get the last modified date of a file
export function getLastModified(route: string): Date {
  try {
    const pagePath =
      route === "/" ? path.join(process.cwd(), "app/page.tsx") : path.join(process.cwd(), "app", `${route}/page.tsx`)

    // Try different extensions if the file doesn't exist
    const extensions = [".tsx", ".jsx", ".js", ".ts"]
    let filePath = pagePath

    for (const ext of extensions) {
      const testPath = pagePath.replace(/\.[^/.]+$/, "") + ext
      if (fs.existsSync(testPath)) {
        filePath = testPath
        break
      }
    }

    if (fs.existsSync(filePath)) {
      const stats = fs.statSync(filePath)
      return new Date(stats.mtime)
    }
  } catch (error) {
    console.error(`Error getting last modified date for ${route}:`, error)
  }

  return new Date()
}

// Function to get the configuration for a route
export function getRouteConfig(route: string) {
  return routeConfig[route] || defaultConfig
}
