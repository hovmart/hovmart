"use client"

import { Badge } from "@/components/ui/badge"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { AlertTriangle, ArrowUpDown, CheckCircle, Database, HardDrive, RefreshCw, Server, Wifi } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function SystemHealth() {
  const { toast } = useToast()
  const [refreshing, setRefreshing] = useState(false)

  const handleRefresh = () => {
    setRefreshing(true)
    setTimeout(() => {
      setRefreshing(false)
      toast({
        title: "System status refreshed",
        description: "All system metrics have been updated.",
      })
    }, 2000)
  }

  return (
    <Card className="border-none shadow-md">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div>
          <CardTitle className="text-xl">System Health</CardTitle>
          <CardDescription>Monitor system performance and status</CardDescription>
        </div>
        <Button variant="outline" size="sm" onClick={handleRefresh} disabled={refreshing}>
          <RefreshCw className={`mr-2 h-4 w-4 ${refreshing ? "animate-spin" : ""}`} />
          Refresh
        </Button>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="server">Server</TabsTrigger>
            <TabsTrigger value="database">Database</TabsTrigger>
            <TabsTrigger value="storage">Storage</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
              <div className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center">
                    <Server className="h-5 w-5 text-green-500 mr-2" />
                    <h3 className="font-medium">Server Status</h3>
                  </div>
                  <Badge className="bg-green-100 text-green-800">Healthy</Badge>
                </div>
                <div className="space-y-2">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>CPU Usage</span>
                      <span>32%</span>
                    </div>
                    <Progress value={32} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Memory Usage</span>
                      <span>45%</span>
                    </div>
                    <Progress value={45} className="h-2" />
                  </div>
                </div>
              </div>

              <div className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center">
                    <Database className="h-5 w-5 text-green-500 mr-2" />
                    <h3 className="font-medium">Database Status</h3>
                  </div>
                  <Badge className="bg-green-100 text-green-800">Healthy</Badge>
                </div>
                <div className="space-y-2">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Connection Pool</span>
                      <span>28%</span>
                    </div>
                    <Progress value={28} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Query Load</span>
                      <span>35%</span>
                    </div>
                    <Progress value={35} className="h-2" />
                  </div>
                </div>
              </div>

              <div className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center">
                    <HardDrive className="h-5 w-5 text-amber-500 mr-2" />
                    <h3 className="font-medium">Storage Status</h3>
                  </div>
                  <Badge className="bg-amber-100 text-amber-800">Warning</Badge>
                </div>
                <div className="space-y-2">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Disk Usage</span>
                      <span>78%</span>
                    </div>
                    <Progress value={78} className="h-2" indicatorClassName="bg-amber-500" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Backup Storage</span>
                      <span>42%</span>
                    </div>
                    <Progress value={42} className="h-2" />
                  </div>
                </div>
              </div>

              <div className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center">
                    <Wifi className="h-5 w-5 text-green-500 mr-2" />
                    <h3 className="font-medium">Network Status</h3>
                  </div>
                  <Badge className="bg-green-100 text-green-800">Healthy</Badge>
                </div>
                <div className="space-y-2">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Bandwidth Usage</span>
                      <span>52%</span>
                    </div>
                    <Progress value={52} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Response Time</span>
                      <span>210ms</span>
                    </div>
                    <Progress value={30} className="h-2" />
                  </div>
                </div>
              </div>
            </div>

            <div className="border rounded-lg p-4">
              <h3 className="font-medium mb-3">System Alerts</h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3 p-3 bg-amber-50 rounded-md">
                  <AlertTriangle className="h-5 w-5 text-amber-500 mt-0.5" />
                  <div>
                    <p className="font-medium text-amber-800">Disk Space Warning</p>
                    <p className="text-sm text-amber-700 mt-1">
                      Storage usage is approaching 80%. Consider cleaning up unused files or expanding storage.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-green-50 rounded-md">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                  <div>
                    <p className="font-medium text-green-800">Backup Completed</p>
                    <p className="text-sm text-green-700 mt-1">
                      Daily system backup completed successfully at 02:00 AM.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="server" className="space-y-4">
            <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
              <div className="border rounded-lg p-4">
                <h3 className="font-medium mb-3">CPU Usage</h3>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Core 1</span>
                      <span>28%</span>
                    </div>
                    <Progress value={28} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Core 2</span>
                      <span>35%</span>
                    </div>
                    <Progress value={35} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Core 3</span>
                      <span>42%</span>
                    </div>
                    <Progress value={42} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Core 4</span>
                      <span>25%</span>
                    </div>
                    <Progress value={25} className="h-2" />
                  </div>
                </div>
              </div>

              <div className="border rounded-lg p-4">
                <h3 className="font-medium mb-3">Memory Usage</h3>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Total Memory</span>
                      <span>16 GB</span>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Used Memory</span>
                      <span>7.2 GB (45%)</span>
                    </div>
                    <Progress value={45} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Free Memory</span>
                      <span>8.8 GB (55%)</span>
                    </div>
                    <Progress value={55} className="h-2" indicatorClassName="bg-green-500" />
                  </div>
                </div>
              </div>

              <div className="border rounded-lg p-4">
                <h3 className="font-medium mb-3">Server Uptime</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span>Current Uptime</span>
                    <span className="font-medium">32 days, 14 hours, 22 minutes</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Last Restart</span>
                    <span>June 19, 2023 at 02:15 AM</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Scheduled Maintenance</span>
                    <span>August 15, 2023 at 01:00 AM</span>
                  </div>
                </div>
              </div>

              <div className="border rounded-lg p-4">
                <h3 className="font-medium mb-3">Process Information</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span>Total Processes</span>
                    <span>124</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Running Processes</span>
                    <span>98</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Sleeping Processes</span>
                    <span>26</span>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="database" className="space-y-4">
            <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
              <div className="border rounded-lg p-4">
                <h3 className="font-medium mb-3">Database Performance</h3>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Query Response Time</span>
                      <span>45ms</span>
                    </div>
                    <Progress value={30} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Connection Pool Usage</span>
                      <span>28%</span>
                    </div>
                    <Progress value={28} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Active Transactions</span>
                      <span>12</span>
                    </div>
                    <Progress value={24} className="h-2" />
                  </div>
                </div>
              </div>

              <div className="border rounded-lg p-4">
                <h3 className="font-medium mb-3">Database Size</h3>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Total Size</span>
                      <span>4.8 GB</span>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Data Size</span>
                      <span>3.2 GB (67%)</span>
                    </div>
                    <Progress value={67} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Index Size</span>
                      <span>1.6 GB (33%)</span>
                    </div>
                    <Progress value={33} className="h-2" indicatorClassName="bg-blue-500" />
                  </div>
                </div>
              </div>

              <div className="border rounded-lg p-4">
                <h3 className="font-medium mb-3">Database Operations</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span>Queries Per Second</span>
                    <span>245</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Slow Queries</span>
                    <span>3</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Failed Queries</span>
                    <span>0</span>
                  </div>
                </div>
              </div>

              <div className="border rounded-lg p-4">
                <h3 className="font-medium mb-3">Database Backups</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span>Last Backup</span>
                    <span>Today at 02:00 AM</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Backup Size</span>
                    <span>4.2 GB</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Backup Status</span>
                    <Badge className="bg-green-100 text-green-800">Successful</Badge>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="storage" className="space-y-4">
            <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
              <div className="border rounded-lg p-4">
                <h3 className="font-medium mb-3">Disk Usage</h3>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Total Space</span>
                      <span>500 GB</span>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Used Space</span>
                      <span>390 GB (78%)</span>
                    </div>
                    <Progress value={78} className="h-2" indicatorClassName="bg-amber-500" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Free Space</span>
                      <span>110 GB (22%)</span>
                    </div>
                    <Progress value={22} className="h-2" indicatorClassName="bg-green-500" />
                  </div>
                </div>
              </div>

              <div className="border rounded-lg p-4">
                <h3 className="font-medium mb-3">Storage by Type</h3>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Images</span>
                      <span>210 GB (54%)</span>
                    </div>
                    <Progress value={54} className="h-2" indicatorClassName="bg-blue-500" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Documents</span>
                      <span>85 GB (22%)</span>
                    </div>
                    <Progress value={22} className="h-2" indicatorClassName="bg-green-500" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>System Files</span>
                      <span>65 GB (17%)</span>
                    </div>
                    <Progress value={17} className="h-2" indicatorClassName="bg-purple-500" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Other</span>
                      <span>30 GB (7%)</span>
                    </div>
                    <Progress value={7} className="h-2" indicatorClassName="bg-gray-500" />
                  </div>
                </div>
              </div>

              <div className="border rounded-lg p-4">
                <h3 className="font-medium mb-3">Storage Growth</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span>Current Month</span>
                    <span>+15 GB</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Previous Month</span>
                    <span>+22 GB</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Projected Full Date</span>
                    <span className="text-amber-600 font-medium">October 15, 2023</span>
                  </div>
                </div>
              </div>

              <div className="border rounded-lg p-4">
                <h3 className="font-medium mb-3">Storage Actions</h3>
                <div className="space-y-3">
                  <Button variant="outline" className="w-full justify-start">
                    <ArrowUpDown className="mr-2 h-4 w-4" />
                    Run Storage Optimization
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <RefreshCw className="mr-2 h-4 w-4" />
                    Refresh Storage Analysis
                  </Button>
                  <Button variant="outline" className="w-full justify-start text-amber-600">
                    <AlertTriangle className="mr-2 h-4 w-4" />
                    Configure Storage Alerts
                  </Button>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
