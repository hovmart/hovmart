"use client"

import { useState } from "react"
import { ArrowUpRight, Check, Globe, LineChart, RefreshCw, Save, Search, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { useToast } from "@/hooks/use-toast"

// Sample SEO data
const keywordRankings = [
  { keyword: "luxury properties in lagos", position: 3, change: 2, volume: 1200, difficulty: "Medium" },
  { keyword: "apartments for rent in ikoyi", position: 5, change: -1, volume: 2500, difficulty: "High" },
  { keyword: "real estate nigeria", position: 12, change: 4, volume: 5000, difficulty: "High" },
  { keyword: "lagos luxury homes", position: 2, change: 0, volume: 800, difficulty: "Medium" },
  { keyword: "property for sale in lekki", position: 8, change: 3, volume: 3200, difficulty: "High" },
  { keyword: "nigerian real estate market", position: 15, change: -2, volume: 1800, difficulty: "Medium" },
  { keyword: "buy apartment in lagos", position: 7, change: 1, volume: 2200, difficulty: "Medium" },
  { keyword: "villa for rent nigeria", position: 4, change: 5, volume: 950, difficulty: "Low" },
  { keyword: "property investment nigeria", position: 10, change: 0, volume: 1500, difficulty: "Medium" },
  { keyword: "luxury real estate lagos", position: 6, change: 2, volume: 1100, difficulty: "Medium" },
]

const pagePerformance = [
  { url: "/", title: "Home", traffic: 5200, position: 1, score: 92 },
  { url: "/properties", title: "Properties", traffic: 3800, position: 2, score: 88 },
  { url: "/about", title: "About Us", traffic: 1200, position: 5, score: 85 },
  { url: "/contact", title: "Contact", traffic: 950, position: 7, score: 90 },
  {
    url: "/properties/luxury-ocean-view-apartment",
    title: "Luxury Ocean View Apartment",
    traffic: 850,
    position: 3,
    score: 78,
  },
  { url: "/properties/modern-ikoyi-apartment", title: "Modern Ikoyi Apartment", traffic: 780, position: 4, score: 82 },
  { url: "/properties/elegant-villa-lagos", title: "Elegant Villa Lagos", traffic: 720, position: 6, score: 75 },
  { url: "/properties-showcase", title: "Properties Showcase", traffic: 650, position: 8, score: 80 },
]

export default function SeoManagement() {
  const { toast } = useToast()
  const [searchTerm, setSearchTerm] = useState("")
  const [metaTitle, setMetaTitle] = useState("Hovmart | Find Your Perfect Property in Nigeria")
  const [metaDescription, setMetaDescription] = useState(
    "Hovmart is Nigeria's premier real estate platform. Find luxury apartments, houses, and villas for sale or rent across Lagos, Abuja, and other major cities.",
  )
  const [canonicalUrl, setCanonicalUrl] = useState("https://hovmart.com")
  const [ogTitle, setOgTitle] = useState("Hovmart | Find Your Perfect Property in Nigeria")
  const [ogDescription, setOgDescription] = useState(
    "Discover your dream property in Nigeria with Hovmart - luxury apartments, houses, and villas for sale or rent.",
  )
  const [ogImage, setOgImage] = useState("https://hovmart.com/og-image.jpg")

  const filteredKeywords = keywordRankings.filter((keyword) =>
    keyword.keyword.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleSaveMetadata = () => {
    toast({
      title: "SEO Settings Saved",
      description: "Your SEO metadata has been updated successfully.",
    })
  }

  const handleRefreshRankings = () => {
    toast({
      title: "Rankings Refresh Initiated",
      description: "Your keyword rankings are being refreshed. This may take a few minutes.",
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">SEO Management</h1>
          <p className="text-gray-500">Optimize your website for search engines</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2">
          <Button variant="outline" onClick={handleRefreshRankings}>
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh Rankings
          </Button>
          <Button className="bg-purple-600 hover:bg-purple-700" onClick={handleSaveMetadata}>
            <Save className="h-4 w-4 mr-2" />
            Save Changes
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>SEO Performance Overview</CardTitle>
            <CardDescription>Your website's search engine performance at a glance</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
              <div className="bg-white p-4 rounded-lg border">
                <p className="text-sm font-medium text-gray-500">Organic Traffic</p>
                <div className="mt-1 flex items-baseline">
                  <p className="text-2xl font-semibold">14,253</p>
                  <p className="ml-2 text-sm text-green-600">↑ 12%</p>
                </div>
                <div className="mt-4">
                  <LineChart className="h-10 w-full text-green-500" />
                </div>
              </div>
              <div className="bg-white p-4 rounded-lg border">
                <p className="text-sm font-medium text-gray-500">Avg. Position</p>
                <div className="mt-1 flex items-baseline">
                  <p className="text-2xl font-semibold">7.2</p>
                  <p className="ml-2 text-sm text-green-600">↑ 0.8</p>
                </div>
                <div className="mt-4">
                  <LineChart className="h-10 w-full text-blue-500" />
                </div>
              </div>
              <div className="bg-white p-4 rounded-lg border">
                <p className="text-sm font-medium text-gray-500">Click-Through Rate</p>
                <div className="mt-1 flex items-baseline">
                  <p className="text-2xl font-semibold">3.8%</p>
                  <p className="ml-2 text-sm text-green-600">↑ 0.5%</p>
                </div>
                <div className="mt-4">
                  <LineChart className="h-10 w-full text-purple-500" />
                </div>
              </div>
              <div className="bg-white p-4 rounded-lg border">
                <p className="text-sm font-medium text-gray-500">Indexed Pages</p>
                <div className="mt-1 flex items-baseline">
                  <p className="text-2xl font-semibold">142</p>
                  <p className="ml-2 text-sm text-green-600">↑ 8</p>
                </div>
                <div className="mt-4">
                  <LineChart className="h-10 w-full text-amber-500" />
                </div>
              </div>
            </div>

            <div className="mt-6">
              <h3 className="text-lg font-medium mb-4">SEO Health Score</h3>
              <div className="bg-white p-4 rounded-lg border">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Overall Score</span>
                  <span className="text-sm font-medium">85/100</span>
                </div>
                <Progress value={85} className="h-2 bg-gray-200" indicatorClassName="bg-green-500" />

                <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 mt-4">
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs text-gray-500">On-Page SEO</span>
                      <span className="text-xs font-medium">92/100</span>
                    </div>
                    <Progress value={92} className="h-1.5 bg-gray-200" indicatorClassName="bg-green-500" />
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs text-gray-500">Technical SEO</span>
                      <span className="text-xs font-medium">88/100</span>
                    </div>
                    <Progress value={88} className="h-1.5 bg-gray-200" indicatorClassName="bg-green-500" />
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs text-gray-500">Content Quality</span>
                      <span className="text-xs font-medium">78/100</span>
                    </div>
                    <Progress value={78} className="h-1.5 bg-gray-200" indicatorClassName="bg-amber-500" />
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs text-gray-500">Mobile Optimization</span>
                      <span className="text-xs font-medium">95/100</span>
                    </div>
                    <Progress value={95} className="h-1.5 bg-gray-200" indicatorClassName="bg-green-500" />
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>SEO Issues</CardTitle>
            <CardDescription>Issues that need your attention</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
                <div className="flex items-start gap-3">
                  <div className="bg-amber-100 p-1.5 rounded-full text-amber-600">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
                      <line x1="12" y1="9" x2="12" y2="13"></line>
                      <line x1="12" y1="17" x2="12.01" y2="17"></line>
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-amber-800">Missing Meta Descriptions</h4>
                    <p className="text-xs text-amber-700 mt-1">
                      5 pages are missing meta descriptions, which may affect click-through rates.
                    </p>
                    <Button variant="link" className="h-auto p-0 text-xs text-amber-800 mt-1">
                      View Pages
                    </Button>
                  </div>
                </div>
              </div>

              <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                <div className="flex items-start gap-3">
                  <div className="bg-red-100 p-1.5 rounded-full text-red-600">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <circle cx="12" cy="12" r="10"></circle>
                      <line x1="15" y1="9" x2="9" y2="15"></line>
                      <line x1="9" y1="9" x2="15" y2="15"></line>
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-red-800">Broken Links Detected</h4>
                    <p className="text-xs text-red-700 mt-1">
                      3 broken links found across your website that need to be fixed.
                    </p>
                    <Button variant="link" className="h-auto p-0 text-xs text-red-800 mt-1">
                      Fix Links
                    </Button>
                  </div>
                </div>
              </div>

              <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
                <div className="flex items-start gap-3">
                  <div className="bg-amber-100 p-1.5 rounded-full text-amber-600">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
                      <line x1="12" y1="9" x2="12" y2="13"></line>
                      <line x1="12" y1="17" x2="12.01" y2="17"></line>
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-amber-800">Image Optimization</h4>
                    <p className="text-xs text-amber-700 mt-1">
                      12 images need optimization to improve page load speed.
                    </p>
                    <Button variant="link" className="h-auto p-0 text-xs text-amber-800 mt-1">
                      Optimize Images
                    </Button>
                  </div>
                </div>
              </div>

              <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                <div className="flex items-start gap-3">
                  <div className="bg-green-100 p-1.5 rounded-full text-green-600">
                    <Check className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-green-800">Mobile Responsiveness</h4>
                    <p className="text-xs text-green-700 mt-1">Your website is fully responsive and mobile-friendly.</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">
              View All Issues
            </Button>
          </CardFooter>
        </Card>
      </div>

      <Tabs defaultValue="metadata" className="space-y-4">
        <TabsList>
          <TabsTrigger value="metadata">Metadata</TabsTrigger>
          <TabsTrigger value="keywords">Keyword Rankings</TabsTrigger>
          <TabsTrigger value="pages">Page Performance</TabsTrigger>
          <TabsTrigger value="sitemap">Sitemap & Robots</TabsTrigger>
        </TabsList>

        <TabsContent value="metadata" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Global Metadata</CardTitle>
              <CardDescription>Configure the default metadata for your website</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="meta-title">Meta Title</Label>
                <Input
                  id="meta-title"
                  value={metaTitle}
                  onChange={(e) => setMetaTitle(e.target.value)}
                  maxLength={60}
                />
                <div className="flex justify-between text-xs text-gray-500">
                  <span>Recommended: 50-60 characters</span>
                  <span>{metaTitle.length}/60</span>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="meta-description">Meta Description</Label>
                <Textarea
                  id="meta-description"
                  value={metaDescription}
                  onChange={(e) => setMetaDescription(e.target.value)}
                  maxLength={160}
                  rows={3}
                />
                <div className="flex justify-between text-xs text-gray-500">
                  <span>Recommended: 150-160 characters</span>
                  <span>{metaDescription.length}/160</span>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="canonical-url">Canonical URL</Label>
                <Input id="canonical-url" value={canonicalUrl} onChange={(e) => setCanonicalUrl(e.target.value)} />
              </div>

              <div className="pt-4 border-t">
                <h3 className="text-lg font-medium mb-4">Open Graph Settings</h3>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="og-title">OG Title</Label>
                    <Input id="og-title" value={ogTitle} onChange={(e) => setOgTitle(e.target.value)} maxLength={60} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="og-description">OG Description</Label>
                    <Textarea
                      id="og-description"
                      value={ogDescription}
                      onChange={(e) => setOgDescription(e.target.value)}
                      maxLength={160}
                      rows={3}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="og-image">OG Image URL</Label>
                    <Input id="og-image" value={ogImage} onChange={(e) => setOgImage(e.target.value)} />
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="bg-purple-600 hover:bg-purple-700" onClick={handleSaveMetadata}>
                <Save className="h-4 w-4 mr-2" />
                Save Metadata
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="keywords" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Keyword Rankings</CardTitle>
              <CardDescription>Track your website's performance for target keywords</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row justify-between items-center mb-4 gap-4">
                <div className="relative w-full md:w-96">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                  <input
                    type="search"
                    placeholder="Search keywords..."
                    className="w-full bg-white pl-8 pr-4 py-2 text-sm rounded-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <Button variant="outline" size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Keyword
                </Button>
              </div>

              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Keyword</TableHead>
                      <TableHead>Position</TableHead>
                      <TableHead>Change</TableHead>
                      <TableHead>Search Volume</TableHead>
                      <TableHead>Difficulty</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredKeywords.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center py-8 text-gray-500">
                          No keywords found
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredKeywords.map((keyword) => (
                        <TableRow key={keyword.keyword}>
                          <TableCell className="font-medium">{keyword.keyword}</TableCell>
                          <TableCell>
                            <Badge
                              variant="outline"
                              className={`
                                ${
                                  keyword.position <= 3
                                    ? "border-green-500 text-green-600 bg-green-50"
                                    : keyword.position <= 10
                                      ? "border-amber-500 text-amber-600 bg-amber-50"
                                      : "border-red-500 text-red-600 bg-red-50"
                                }
                              `}
                            >
                              {keyword.position}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center">
                              {keyword.change > 0 ? (
                                <span className="text-green-600">↑ {keyword.change}</span>
                              ) : keyword.change < 0 ? (
                                <span className="text-red-600">↓ {Math.abs(keyword.change)}</span>
                              ) : (
                                <span className="text-gray-500">-</span>
                              )}
                            </div>
                          </TableCell>
                          <TableCell>{keyword.volume.toLocaleString()}</TableCell>
                          <TableCell>
                            <Badge
                              variant="outline"
                              className={`
                                ${
                                  keyword.difficulty === "Low"
                                    ? "border-green-500 text-green-600 bg-green-50"
                                    : keyword.difficulty === "Medium"
                                      ? "border-amber-500 text-amber-600 bg-amber-50"
                                      : "border-red-500 text-red-600 bg-red-50"
                                }
                              `}
                            >
                              {keyword.difficulty}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            <Button variant="ghost" size="sm">
                              <Globe className="h-4 w-4 mr-2" />
                              SERP
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="pages" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Page Performance</CardTitle>
              <CardDescription>See how your individual pages are performing in search</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Page</TableHead>
                      <TableHead>Traffic</TableHead>
                      <TableHead>Avg. Position</TableHead>
                      <TableHead>SEO Score</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {pagePerformance.map((page) => (
                      <TableRow key={page.url}>
                        <TableCell>
                          <div className="font-medium">{page.title}</div>
                          <div className="text-xs text-gray-500">{page.url}</div>
                        </TableCell>
                        <TableCell>{page.traffic.toLocaleString()}</TableCell>
                        <TableCell>
                          <Badge
                            variant="outline"
                            className={`
                              ${
                                page.position <= 3
                                  ? "border-green-500 text-green-600 bg-green-50"
                                  : page.position <= 10
                                    ? "border-amber-500 text-amber-600 bg-amber-50"
                                    : "border-red-500 text-red-600 bg-red-50"
                              }
                              `}
                          >
                            {page.position}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Progress
                              value={page.score}
                              className="h-2 w-16 bg-gray-200"
                              indicatorClassName={`
                                ${page.score >= 90 ? "bg-green-500" : page.score >= 70 ? "bg-amber-500" : "bg-red-500"}
                              `}
                            />
                            <span>{page.score}/100</span>
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="sm">
                            <ArrowUpRight className="h-4 w-4 mr-2" />
                            Optimize
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="sitemap" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Sitemap & Robots.txt</CardTitle>
              <CardDescription>Manage your sitemap and robots.txt file</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-4">Sitemap</h3>
                <div className="bg-gray-50 p-4 rounded-lg border mb-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">sitemap.xml</p>
                      <p className="text-sm text-gray-500">Last updated: July 15, 2023</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm">
                        <RefreshCw className="h-4 w-4 mr-2" />
                        Regenerate
                      </Button>
                      <Button variant="outline" size="sm">
                        <ArrowUpRight className="h-4 w-4 mr-2" />
                        View
                      </Button>
                    </div>
                  </div>
                  <div className="mt-4">
                    <p className="text-sm text-gray-500">
                      Your sitemap contains <span className="font-medium">142</span> URLs
                    </p>
                    <div className="mt-2 flex items-center gap-2">
                      <Badge variant="outline" className="bg-green-50 text-green-600 border-green-500">
                        Submitted to Google
                      </Badge>
                      <Badge variant="outline" className="bg-green-50 text-green-600 border-green-500">
                        Submitted to Bing
                      </Badge>
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="sitemap-settings">Sitemap Settings</Label>
                  <Textarea
                    id="sitemap-settings"
                    rows={5}
                    className="font-mono text-sm"
                    defaultValue={`<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://hovmart.com/</loc>
    <lastmod>2023-07-15</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  <!-- More URLs... -->
</urlset>`}
                  />
                </div>
              </div>

              <div className="pt-4 border-t">
                <h3 className="text-lg font-medium mb-4">Robots.txt</h3>
                <div className="space-y-2">
                  <Label htmlFor="robots-txt">Robots.txt Content</Label>
                  <Textarea
                    id="robots-txt"
                    rows={8}
                    className="font-mono text-sm"
                    defaultValue={`User-agent: *
Allow: /
Disallow: /admin/
Disallow: /private/
Disallow: /api/

Sitemap: https://hovmart.com/sitemap.xml`}
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="bg-purple-600 hover:bg-purple-700">
                <Save className="h-4 w-4 mr-2" />
                Save Changes
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
