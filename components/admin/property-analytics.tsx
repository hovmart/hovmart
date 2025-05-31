"use client"

import { useState } from "react"
import {
  BarChart3,
  Calendar,
  Download,
  Eye,
  LineChart,
  MapPin,
  PieChart,
  Settings,
  TrendingDown,
  TrendingUp,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger } from "@/components/ui/select"

export function PropertyAnalytics() {
  const [timeRange, setTimeRange] = useState("30days")
  const [propertyType, setPropertyType] = useState("all")

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Property Analytics</h1>
          <p className="text-gray-500">Detailed insights and performance metrics for your properties</p>
        </div>
        <div className="flex items-center gap-2">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[160px]">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>Time Range</span>
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Select Time Range</SelectLabel>
                <SelectItem value="7days">Last 7 days</SelectItem>
                <SelectItem value="30days">Last 30 days</SelectItem>
                <SelectItem value="90days">Last 90 days</SelectItem>
                <SelectItem value="year">Last 12 months</SelectItem>
                <SelectItem value="custom">Custom Range</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>

          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export Report
          </Button>
          <Button variant="outline" size="icon">
            <Settings className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Total Views</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-3xl font-bold">24,892</div>
              <div className="p-2 bg-blue-50 rounded-full">
                <Eye className="h-5 w-5 text-blue-500" />
              </div>
            </div>
            <div className="mt-2 text-xs text-gray-500">
              <TrendingUp className="inline h-3 w-3 mr-1 text-green-500" />
              <span className="text-green-500 font-medium">+18.2%</span> from previous period
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Avg. Time on Page</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-3xl font-bold">3:42</div>
              <div className="p-2 bg-purple-50 rounded-full">
                <Clock className="h-5 w-5 text-purple-500" />
              </div>
            </div>
            <div className="mt-2 text-xs text-gray-500">
              <TrendingUp className="inline h-3 w-3 mr-1 text-green-500" />
              <span className="text-green-500 font-medium">+5.3%</span> from previous period
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Inquiry Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-3xl font-bold">8.7%</div>
              <div className="p-2 bg-green-50 rounded-full">
                <MessageSquare className="h-5 w-5 text-green-500" />
              </div>
            </div>
            <div className="mt-2 text-xs text-gray-500">
              <TrendingDown className="inline h-3 w-3 mr-1 text-red-500" />
              <span className="text-red-500 font-medium">-2.1%</span> from previous period
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Conversion Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-3xl font-bold">3.2%</div>
              <div className="p-2 bg-amber-50 rounded-full">
                <CheckCircle className="h-5 w-5 text-amber-500" />
              </div>
            </div>
            <div className="mt-2 text-xs text-gray-500">
              <TrendingUp className="inline h-3 w-3 mr-1 text-green-500" />
              <span className="text-green-500 font-medium">+0.8%</span> from previous period
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Analytics Tabs */}
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="traffic">Traffic Sources</TabsTrigger>
          <TabsTrigger value="engagement">User Engagement</TabsTrigger>
          <TabsTrigger value="conversion">Conversion Funnel</TabsTrigger>
          <TabsTrigger value="comparison">Property Comparison</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Property Performance Overview</CardTitle>
              <CardDescription>View trends in property views, inquiries, and bookings</CardDescription>
            </CardHeader>
            <CardContent className="h-80 flex items-center justify-center">
              <div className="text-center">
                <LineChart className="h-16 w-16 text-gray-200 mx-auto mb-4" />
                <p className="text-gray-500">Performance chart will appear here</p>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Top Performing Properties</CardTitle>
                <CardDescription>Properties with the highest engagement</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[1, 2, 3, 4, 5].map((index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className="font-bold text-gray-500 w-5 text-center">{index}</div>
                      <div className="flex-1">
                        <div className="font-medium">Luxury Villa in Lagos</div>
                        <div className="flex items-center text-sm text-gray-500">
                          <MapPin className="h-3 w-3 mr-1" />
                          <span>Ikoyi, Lagos</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-medium">1,245</div>
                        <div className="text-xs text-gray-500">views</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="ghost" className="w-full text-hovmart-purple">
                  View All Properties
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Property Type Distribution</CardTitle>
                <CardDescription>Views by property category</CardDescription>
              </CardHeader>
              <CardContent className="h-64 flex items-center justify-center">
                <div className="text-center">
                  <PieChart className="h-16 w-16 text-gray-200 mx-auto mb-4" />
                  <p className="text-gray-500">Distribution chart will appear here</p>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                  <span>Apartments (42%)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  <span>Houses (28%)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-purple-500"></div>
                  <span>Villas (18%)</span>
                </div>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="traffic" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Traffic Sources</CardTitle>
              <CardDescription>Where your property views are coming from</CardDescription>
            </CardHeader>
            <CardContent className="h-80 flex items-center justify-center">
              <div className="text-center">
                <BarChart3 className="h-16 w-16 text-gray-200 mx-auto mb-4" />
                <p className="text-gray-500">Traffic sources chart will appear here</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="engagement">
          <Card>
            <CardHeader>
              <CardTitle>User Engagement Metrics</CardTitle>
              <CardDescription>How users interact with your property listings</CardDescription>
            </CardHeader>
            <CardContent className="h-80 flex items-center justify-center">
              <div className="text-center">
                <LineChart className="h-16 w-16 text-gray-200 mx-auto mb-4" />
                <p className="text-gray-500">Engagement metrics chart will appear here</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="conversion">
          <Card>
            <CardHeader>
              <CardTitle>Conversion Funnel</CardTitle>
              <CardDescription>Track the journey from view to booking</CardDescription>
            </CardHeader>
            <CardContent className="h-80 flex items-center justify-center">
              <div className="text-center">
                <BarChart3 className="h-16 w-16 text-gray-200 mx-auto mb-4" />
                <p className="text-gray-500">Conversion funnel chart will appear here</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="comparison">
          <Card>
            <CardHeader>
              <CardTitle>Property Comparison</CardTitle>
              <CardDescription>Compare performance across different properties</CardDescription>
            </CardHeader>
            <CardContent className="h-80 flex items-center justify-center">
              <div className="text-center">
                <BarChart3 className="h-16 w-16 text-gray-200 mx-auto mb-4" />
                <p className="text-gray-500">Property comparison chart will appear here</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Location Insights */}
      <Card>
        <CardHeader>
          <CardTitle>Location Insights</CardTitle>
          <CardDescription>Property performance by location</CardDescription>
        </CardHeader>
        <CardContent className="h-96 flex items-center justify-center">
          <div className="text-center">
            <MapPin className="h-16 w-16 text-gray-200 mx-auto mb-4" />
            <p className="text-gray-500">Location map will appear here</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

// Missing components
function Clock(props: any) {
  return <span className={props.className}>⏱️</span>
}

function MessageSquare(props: any) {
  return <span className={props.className}>💬</span>
}

function CheckCircle(props: any) {
  return <span className={props.className}>✓</span>
}
