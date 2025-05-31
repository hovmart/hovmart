"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowDown, ArrowUp, BadgeCheck, Building2, Calendar, DollarSign, MessageSquare, Users } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function DashboardStats() {
  const [timeRange, setTimeRange] = useState("7days")

  // These would normally come from an API
  const stats = {
    "7days": {
      revenue: { value: 14000000, change: 12, trend: "up" },
      bookings: { value: 473, change: 8, trend: "up" },
      properties: { value: 320, change: 5, trend: "up" },
      users: { value: 1294, change: -3, trend: "down" },
      verifiedUsers: { value: 528, change: 15, trend: "up" },
      pendingProperties: { value: 24, change: 10, trend: "up" },
      messages: { value: 156, change: 7, trend: "up" },
      avgResponseTime: { value: 2.5, change: -15, trend: "up" }, // hours, down is good
    },
    "30days": {
      revenue: { value: 52000000, change: 18, trend: "up" },
      bookings: { value: 1845, change: 12, trend: "up" },
      properties: { value: 380, change: 8, trend: "up" },
      users: { value: 4250, change: 5, trend: "up" },
      verifiedUsers: { value: 1680, change: 22, trend: "up" },
      pendingProperties: { value: 35, change: -5, trend: "down" },
      messages: { value: 620, change: 9, trend: "up" },
      avgResponseTime: { value: 2.8, change: -10, trend: "up" }, // hours, down is good
    },
    "90days": {
      revenue: { value: 145000000, change: 25, trend: "up" },
      bookings: { value: 5230, change: 20, trend: "up" },
      properties: { value: 450, change: 15, trend: "up" },
      users: { value: 12500, change: 18, trend: "up" },
      verifiedUsers: { value: 4800, change: 30, trend: "up" },
      pendingProperties: { value: 42, change: -12, trend: "down" },
      messages: { value: 1850, change: 15, trend: "up" },
      avgResponseTime: { value: 3.2, change: -5, trend: "up" }, // hours, down is good
    },
  }

  const currentStats = stats[timeRange as keyof typeof stats]

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Dashboard Overview</h2>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select time range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="7days">Last 7 days</SelectItem>
            <SelectItem value="30days">Last 30 days</SelectItem>
            <SelectItem value="90days">Last 90 days</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Tabs defaultValue="business" className="space-y-4">
        <TabsList>
          <TabsTrigger value="business">Business</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="properties">Properties</TabsTrigger>
          <TabsTrigger value="support">Support</TabsTrigger>
        </TabsList>

        <TabsContent value="business" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card className="overflow-hidden border-none shadow-md">
              <CardContent className="p-0">
                <div className="bg-gradient-to-r from-purple-500 to-purple-700 p-4">
                  <div className="flex items-center justify-between text-white">
                    <div>
                      <p className="text-sm font-medium opacity-80">Total Revenue</p>
                      <h3 className="text-2xl font-bold mt-1">₦{currentStats.revenue.value.toLocaleString()}</h3>
                    </div>
                    <div className="bg-white/20 p-3 rounded-full">
                      <DollarSign className="h-6 w-6 text-white" />
                    </div>
                  </div>
                </div>
                <div className="bg-white p-4">
                  <div className="flex items-center text-sm">
                    {currentStats.revenue.trend === "up" ? (
                      <ArrowUp className="h-4 w-4 text-green-500 mr-1" />
                    ) : (
                      <ArrowDown className="h-4 w-4 text-red-500 mr-1" />
                    )}
                    <span
                      className={
                        currentStats.revenue.trend === "up" ? "text-green-500 font-medium" : "text-red-500 font-medium"
                      }
                    >
                      {currentStats.revenue.change}%
                    </span>
                    <span className="text-gray-500 ml-1">from previous period</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="overflow-hidden border-none shadow-md">
              <CardContent className="p-0">
                <div className="bg-gradient-to-r from-blue-500 to-blue-700 p-4">
                  <div className="flex items-center justify-between text-white">
                    <div>
                      <p className="text-sm font-medium opacity-80">Total Bookings</p>
                      <h3 className="text-2xl font-bold mt-1">{currentStats.bookings.value}</h3>
                    </div>
                    <div className="bg-white/20 p-3 rounded-full">
                      <Calendar className="h-6 w-6 text-white" />
                    </div>
                  </div>
                </div>
                <div className="bg-white p-4">
                  <div className="flex items-center text-sm">
                    {currentStats.bookings.trend === "up" ? (
                      <ArrowUp className="h-4 w-4 text-green-500 mr-1" />
                    ) : (
                      <ArrowDown className="h-4 w-4 text-red-500 mr-1" />
                    )}
                    <span
                      className={
                        currentStats.bookings.trend === "up" ? "text-green-500 font-medium" : "text-red-500 font-medium"
                      }
                    >
                      {currentStats.bookings.change}%
                    </span>
                    <span className="text-gray-500 ml-1">from previous period</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="overflow-hidden border-none shadow-md">
              <CardContent className="p-0">
                <div className="bg-gradient-to-r from-amber-500 to-amber-700 p-4">
                  <div className="flex items-center justify-between text-white">
                    <div>
                      <p className="text-sm font-medium opacity-80">Total Properties</p>
                      <h3 className="text-2xl font-bold mt-1">{currentStats.properties.value}</h3>
                    </div>
                    <div className="bg-white/20 p-3 rounded-full">
                      <Building2 className="h-6 w-6 text-white" />
                    </div>
                  </div>
                </div>
                <div className="bg-white p-4">
                  <div className="flex items-center text-sm">
                    {currentStats.properties.trend === "up" ? (
                      <ArrowUp className="h-4 w-4 text-green-500 mr-1" />
                    ) : (
                      <ArrowDown className="h-4 w-4 text-red-500 mr-1" />
                    )}
                    <span
                      className={
                        currentStats.properties.trend === "up"
                          ? "text-green-500 font-medium"
                          : "text-red-500 font-medium"
                      }
                    >
                      {currentStats.properties.change}%
                    </span>
                    <span className="text-gray-500 ml-1">from previous period</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="overflow-hidden border-none shadow-md">
              <CardContent className="p-0">
                <div className="bg-gradient-to-r from-green-500 to-green-700 p-4">
                  <div className="flex items-center justify-between text-white">
                    <div>
                      <p className="text-sm font-medium opacity-80">Total Users</p>
                      <h3 className="text-2xl font-bold mt-1">{currentStats.users.value}</h3>
                    </div>
                    <div className="bg-white/20 p-3 rounded-full">
                      <Users className="h-6 w-6 text-white" />
                    </div>
                  </div>
                </div>
                <div className="bg-white p-4">
                  <div className="flex items-center text-sm">
                    {currentStats.users.trend === "up" ? (
                      <ArrowUp className="h-4 w-4 text-green-500 mr-1" />
                    ) : (
                      <ArrowDown className="h-4 w-4 text-red-500 mr-1" />
                    )}
                    <span
                      className={
                        currentStats.users.trend === "up" ? "text-green-500 font-medium" : "text-red-500 font-medium"
                      }
                    >
                      {currentStats.users.change}%
                    </span>
                    <span className="text-gray-500 ml-1">from previous period</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="users" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card className="overflow-hidden border-none shadow-md">
              <CardContent className="p-0">
                <div className="bg-gradient-to-r from-green-500 to-green-700 p-4">
                  <div className="flex items-center justify-between text-white">
                    <div>
                      <p className="text-sm font-medium opacity-80">Total Users</p>
                      <h3 className="text-2xl font-bold mt-1">{currentStats.users.value}</h3>
                    </div>
                    <div className="bg-white/20 p-3 rounded-full">
                      <Users className="h-6 w-6 text-white" />
                    </div>
                  </div>
                </div>
                <div className="bg-white p-4">
                  <div className="flex items-center text-sm">
                    {currentStats.users.trend === "up" ? (
                      <ArrowUp className="h-4 w-4 text-green-500 mr-1" />
                    ) : (
                      <ArrowDown className="h-4 w-4 text-red-500 mr-1" />
                    )}
                    <span
                      className={
                        currentStats.users.trend === "up" ? "text-green-500 font-medium" : "text-red-500 font-medium"
                      }
                    >
                      {currentStats.users.change}%
                    </span>
                    <span className="text-gray-500 ml-1">from previous period</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="overflow-hidden border-none shadow-md">
              <CardContent className="p-0">
                <div className="bg-gradient-to-r from-blue-500 to-blue-700 p-4">
                  <div className="flex items-center justify-between text-white">
                    <div>
                      <p className="text-sm font-medium opacity-80">Verified Users</p>
                      <h3 className="text-2xl font-bold mt-1">{currentStats.verifiedUsers.value}</h3>
                    </div>
                    <div className="bg-white/20 p-3 rounded-full">
                      <BadgeCheck className="h-6 w-6 text-white" />
                    </div>
                  </div>
                </div>
                <div className="bg-white p-4">
                  <div className="flex items-center text-sm">
                    {currentStats.verifiedUsers.trend === "up" ? (
                      <ArrowUp className="h-4 w-4 text-green-500 mr-1" />
                    ) : (
                      <ArrowDown className="h-4 w-4 text-red-500 mr-1" />
                    )}
                    <span
                      className={
                        currentStats.verifiedUsers.trend === "up"
                          ? "text-green-500 font-medium"
                          : "text-red-500 font-medium"
                      }
                    >
                      {currentStats.verifiedUsers.change}%
                    </span>
                    <span className="text-gray-500 ml-1">from previous period</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="overflow-hidden border-none shadow-md">
              <CardContent className="p-6">
                <div className="flex flex-col h-full justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Verification Rate</p>
                    <h3 className="text-2xl font-bold mt-1">
                      {Math.round((currentStats.verifiedUsers.value / currentStats.users.value) * 100)}%
                    </h3>
                  </div>
                  <div className="mt-4 text-xs text-gray-500">
                    <div className="flex justify-between mb-1">
                      <span>Verified Users</span>
                      <span>{currentStats.verifiedUsers.value}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full"
                        style={{
                          width: `${Math.round((currentStats.verifiedUsers.value / currentStats.users.value) * 100)}%`,
                        }}
                      ></div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="overflow-hidden border-none shadow-md">
              <CardContent className="p-6">
                <div className="flex flex-col h-full justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-500">User Types</p>
                    <div className="mt-4 space-y-2">
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Regular Users</span>
                          <span>68%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-green-500 h-2 rounded-full" style={{ width: "68%" }}></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Agents</span>
                          <span>22%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-blue-500 h-2 rounded-full" style={{ width: "22%" }}></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Admins</span>
                          <span>10%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-purple-500 h-2 rounded-full" style={{ width: "10%" }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="properties" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card className="overflow-hidden border-none shadow-md">
              <CardContent className="p-0">
                <div className="bg-gradient-to-r from-amber-500 to-amber-700 p-4">
                  <div className="flex items-center justify-between text-white">
                    <div>
                      <p className="text-sm font-medium opacity-80">Total Properties</p>
                      <h3 className="text-2xl font-bold mt-1">{currentStats.properties.value}</h3>
                    </div>
                    <div className="bg-white/20 p-3 rounded-full">
                      <Building2 className="h-6 w-6 text-white" />
                    </div>
                  </div>
                </div>
                <div className="bg-white p-4">
                  <div className="flex items-center text-sm">
                    {currentStats.properties.trend === "up" ? (
                      <ArrowUp className="h-4 w-4 text-green-500 mr-1" />
                    ) : (
                      <ArrowDown className="h-4 w-4 text-red-500 mr-1" />
                    )}
                    <span
                      className={
                        currentStats.properties.trend === "up"
                          ? "text-green-500 font-medium"
                          : "text-red-500 font-medium"
                      }
                    >
                      {currentStats.properties.change}%
                    </span>
                    <span className="text-gray-500 ml-1">from previous period</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="overflow-hidden border-none shadow-md">
              <CardContent className="p-0">
                <div className="bg-gradient-to-r from-orange-500 to-orange-700 p-4">
                  <div className="flex items-center justify-between text-white">
                    <div>
                      <p className="text-sm font-medium opacity-80">Pending Approvals</p>
                      <h3 className="text-2xl font-bold mt-1">{currentStats.pendingProperties.value}</h3>
                    </div>
                    <div className="bg-white/20 p-3 rounded-full">
                      <Building2 className="h-6 w-6 text-white" />
                    </div>
                  </div>
                </div>
                <div className="bg-white p-4">
                  <div className="flex items-center text-sm">
                    {currentStats.pendingProperties.trend === "down" ? (
                      <ArrowDown className="h-4 w-4 text-green-500 mr-1" />
                    ) : (
                      <ArrowUp className="h-4 w-4 text-red-500 mr-1" />
                    )}
                    <span
                      className={
                        currentStats.pendingProperties.trend === "down"
                          ? "text-green-500 font-medium"
                          : "text-red-500 font-medium"
                      }
                    >
                      {Math.abs(currentStats.pendingProperties.change)}%
                    </span>
                    <span className="text-gray-500 ml-1">from previous period</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="overflow-hidden border-none shadow-md">
              <CardContent className="p-6">
                <div className="flex flex-col h-full justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Property Types</p>
                    <div className="mt-4 space-y-2">
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Apartments</span>
                          <span>45%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-amber-500 h-2 rounded-full" style={{ width: "45%" }}></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Houses</span>
                          <span>30%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-amber-600 h-2 rounded-full" style={{ width: "30%" }}></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Villas</span>
                          <span>15%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-amber-700 h-2 rounded-full" style={{ width: "15%" }}></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Others</span>
                          <span>10%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-amber-800 h-2 rounded-full" style={{ width: "10%" }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="overflow-hidden border-none shadow-md">
              <CardContent className="p-6">
                <div className="flex flex-col h-full justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Property Status</p>
                    <div className="mt-4 space-y-2">
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Active</span>
                          <span>75%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-green-500 h-2 rounded-full" style={{ width: "75%" }}></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Pending</span>
                          <span>15%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-amber-500 h-2 rounded-full" style={{ width: "15%" }}></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Inactive</span>
                          <span>10%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-gray-500 h-2 rounded-full" style={{ width: "10%" }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="support" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card className="overflow-hidden border-none shadow-md">
              <CardContent className="p-0">
                <div className="bg-gradient-to-r from-indigo-500 to-indigo-700 p-4">
                  <div className="flex items-center justify-between text-white">
                    <div>
                      <p className="text-sm font-medium opacity-80">Total Messages</p>
                      <h3 className="text-2xl font-bold mt-1">{currentStats.messages.value}</h3>
                    </div>
                    <div className="bg-white/20 p-3 rounded-full">
                      <MessageSquare className="h-6 w-6 text-white" />
                    </div>
                  </div>
                </div>
                <div className="bg-white p-4">
                  <div className="flex items-center text-sm">
                    {currentStats.messages.trend === "up" ? (
                      <ArrowUp className="h-4 w-4 text-green-500 mr-1" />
                    ) : (
                      <ArrowDown className="h-4 w-4 text-red-500 mr-1" />
                    )}
                    <span
                      className={
                        currentStats.messages.trend === "up" ? "text-green-500 font-medium" : "text-red-500 font-medium"
                      }
                    >
                      {currentStats.messages.change}%
                    </span>
                    <span className="text-gray-500 ml-1">from previous period</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="overflow-hidden border-none shadow-md">
              <CardContent className="p-0">
                <div className="bg-gradient-to-r from-cyan-500 to-cyan-700 p-4">
                  <div className="flex items-center justify-between text-white">
                    <div>
                      <p className="text-sm font-medium opacity-80">Avg. Response Time</p>
                      <h3 className="text-2xl font-bold mt-1">{currentStats.avgResponseTime.value} hours</h3>
                    </div>
                    <div className="bg-white/20 p-3 rounded-full">
                      <MessageSquare className="h-6 w-6 text-white" />
                    </div>
                  </div>
                </div>
                <div className="bg-white p-4">
                  <div className="flex items-center text-sm">
                    {currentStats.avgResponseTime.trend === "up" ? (
                      <ArrowDown className="h-4 w-4 text-green-500 mr-1" />
                    ) : (
                      <ArrowUp className="h-4 w-4 text-red-500 mr-1" />
                    )}
                    <span
                      className={
                        currentStats.avgResponseTime.trend === "up"
                          ? "text-green-500 font-medium"
                          : "text-red-500 font-medium"
                      }
                    >
                      {Math.abs(currentStats.avgResponseTime.change)}%
                    </span>
                    <span className="text-gray-500 ml-1">from previous period</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="overflow-hidden border-none shadow-md">
              <CardContent className="p-6">
                <div className="flex flex-col h-full justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Message Categories</p>
                    <div className="mt-4 space-y-2">
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Booking Inquiries</span>
                          <span>40%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-indigo-500 h-2 rounded-full" style={{ width: "40%" }}></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Property Questions</span>
                          <span>30%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-indigo-600 h-2 rounded-full" style={{ width: "30%" }}></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Technical Support</span>
                          <span>20%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-indigo-700 h-2 rounded-full" style={{ width: "20%" }}></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Other</span>
                          <span>10%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-indigo-800 h-2 rounded-full" style={{ width: "10%" }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="overflow-hidden border-none shadow-md">
              <CardContent className="p-6">
                <div className="flex flex-col h-full justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Response Status</p>
                    <div className="mt-4 space-y-2">
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Resolved</span>
                          <span>65%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-green-500 h-2 rounded-full" style={{ width: "65%" }}></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>In Progress</span>
                          <span>25%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-amber-500 h-2 rounded-full" style={{ width: "25%" }}></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Pending</span>
                          <span>10%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-red-500 h-2 rounded-full" style={{ width: "10%" }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
