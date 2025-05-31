"use client"

import type React from "react"

import { useState } from "react"
import { useToast } from "@/hooks/use-toast"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Bell, Globe, Lock, Palette, Save, Shield, Wallet } from "lucide-react"

export default function Settings() {
  const { toast } = useToast()
  const [activeTab, setActiveTab] = useState("general")
  const [generalSettings, setGeneralSettings] = useState({
    siteName: "Hovmart",
    siteDescription: "Find your perfect property in Nigeria",
    contactEmail: "info@hovmart.com",
    contactPhone: "+234 123 456 7890",
    address: "Lagos, Nigeria",
  })

  const [appearanceSettings, setAppearanceSettings] = useState({
    enableDarkMode: false,
    primaryColor: "#7c3aed",
    accentColor: "#f59e0b",
    showLogo: true,
    compactView: false,
  })

  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    smsNotifications: false,
    newBookingAlert: true,
    newPropertyAlert: true,
    marketingEmails: false,
  })

  const handleGeneralChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setGeneralSettings((prev) => ({ ...prev, [name]: value }))
  }

  const handleAppearanceChange = (name: string, value: boolean | string) => {
    setAppearanceSettings((prev) => ({ ...prev, [name]: value }))
  }

  const handleNotificationChange = (name: string, value: boolean) => {
    setNotificationSettings((prev) => ({ ...prev, [name]: value }))
  }

  const handleSaveSettings = () => {
    // In a real app, this would save to an API
    toast({
      title: "Settings Saved",
      description: "Your settings have been saved successfully.",
    })
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-gray-500">Manage your application settings and preferences.</p>
      </div>

      {/* Settings Tabs */}
      <Tabs defaultValue="general" value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid grid-cols-2 md:grid-cols-5 lg:w-[600px]">
          <TabsTrigger value="general">
            <Globe className="mr-2 h-4 w-4" />
            General
          </TabsTrigger>
          <TabsTrigger value="appearance">
            <Palette className="mr-2 h-4 w-4" />
            Appearance
          </TabsTrigger>
          <TabsTrigger value="notifications">
            <Bell className="mr-2 h-4 w-4" />
            Notifications
          </TabsTrigger>
          <TabsTrigger value="security">
            <Shield className="mr-2 h-4 w-4" />
            Security
          </TabsTrigger>
          <TabsTrigger value="billing">
            <Wallet className="mr-2 h-4 w-4" />
            Billing
          </TabsTrigger>
        </TabsList>

        {/* General Settings */}
        <TabsContent value="general">
          <Card>
            <CardHeader>
              <CardTitle>General Settings</CardTitle>
              <CardDescription>Manage your basic site settings and information.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="siteName">Site Name</Label>
                <Input id="siteName" name="siteName" value={generalSettings.siteName} onChange={handleGeneralChange} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="siteDescription">Site Description</Label>
                <Textarea
                  id="siteDescription"
                  name="siteDescription"
                  value={generalSettings.siteDescription}
                  onChange={handleGeneralChange}
                  rows={3}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="contactEmail">Contact Email</Label>
                <Input
                  id="contactEmail"
                  name="contactEmail"
                  type="email"
                  value={generalSettings.contactEmail}
                  onChange={handleGeneralChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="contactPhone">Contact Phone</Label>
                <Input
                  id="contactPhone"
                  name="contactPhone"
                  value={generalSettings.contactPhone}
                  onChange={handleGeneralChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <Input id="address" name="address" value={generalSettings.address} onChange={handleGeneralChange} />
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSaveSettings} className="bg-purple-600 hover:bg-purple-700">
                <Save className="mr-2 h-4 w-4" />
                Save Changes
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Appearance Settings */}
        <TabsContent value="appearance">
          <Card>
            <CardHeader>
              <CardTitle>Appearance Settings</CardTitle>
              <CardDescription>Customize how the dashboard looks and feels.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="darkMode">Dark Mode</Label>
                  <p className="text-sm text-gray-500">Enable dark mode for the dashboard</p>
                </div>
                <Switch
                  id="darkMode"
                  checked={appearanceSettings.enableDarkMode}
                  onCheckedChange={(checked) => handleAppearanceChange("enableDarkMode", checked)}
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="showLogo">Show Logo</Label>
                  <p className="text-sm text-gray-500">Display the logo in the sidebar</p>
                </div>
                <Switch
                  id="showLogo"
                  checked={appearanceSettings.showLogo}
                  onCheckedChange={(checked) => handleAppearanceChange("showLogo", checked)}
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="compactView">Compact View</Label>
                  <p className="text-sm text-gray-500">Use a more compact layout for tables and lists</p>
                </div>
                <Switch
                  id="compactView"
                  checked={appearanceSettings.compactView}
                  onCheckedChange={(checked) => handleAppearanceChange("compactView", checked)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="primaryColor">Primary Color</Label>
                <div className="flex items-center gap-2">
                  <Input
                    id="primaryColor"
                    name="primaryColor"
                    type="color"
                    value={appearanceSettings.primaryColor}
                    onChange={(e) => handleAppearanceChange("primaryColor", e.target.value)}
                    className="w-12 h-10 p-1"
                  />
                  <Input
                    value={appearanceSettings.primaryColor}
                    onChange={(e) => handleAppearanceChange("primaryColor", e.target.value)}
                    className="flex-1"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="accentColor">Accent Color</Label>
                <div className="flex items-center gap-2">
                  <Input
                    id="accentColor"
                    name="accentColor"
                    type="color"
                    value={appearanceSettings.accentColor}
                    onChange={(e) => handleAppearanceChange("accentColor", e.target.value)}
                    className="w-12 h-10 p-1"
                  />
                  <Input
                    value={appearanceSettings.accentColor}
                    onChange={(e) => handleAppearanceChange("accentColor", e.target.value)}
                    className="flex-1"
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSaveSettings} className="bg-purple-600 hover:bg-purple-700">
                <Save className="mr-2 h-4 w-4" />
                Save Changes
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Notification Settings */}
        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Notification Settings</CardTitle>
              <CardDescription>Manage how and when you receive notifications.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="emailNotifications">Email Notifications</Label>
                  <p className="text-sm text-gray-500">Receive notifications via email</p>
                </div>
                <Switch
                  id="emailNotifications"
                  checked={notificationSettings.emailNotifications}
                  onCheckedChange={(checked) => handleNotificationChange("emailNotifications", checked)}
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="smsNotifications">SMS Notifications</Label>
                  <p className="text-sm text-gray-500">Receive notifications via SMS</p>
                </div>
                <Switch
                  id="smsNotifications"
                  checked={notificationSettings.smsNotifications}
                  onCheckedChange={(checked) => handleNotificationChange("smsNotifications", checked)}
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="newBookingAlert">New Booking Alerts</Label>
                  <p className="text-sm text-gray-500">Get notified when a new booking is made</p>
                </div>
                <Switch
                  id="newBookingAlert"
                  checked={notificationSettings.newBookingAlert}
                  onCheckedChange={(checked) => handleNotificationChange("newBookingAlert", checked)}
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="newPropertyAlert">New Property Alerts</Label>
                  <p className="text-sm text-gray-500">Get notified when a new property is listed</p>
                </div>
                <Switch
                  id="newPropertyAlert"
                  checked={notificationSettings.newPropertyAlert}
                  onCheckedChange={(checked) => handleNotificationChange("newPropertyAlert", checked)}
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="marketingEmails">Marketing Emails</Label>
                  <p className="text-sm text-gray-500">Receive marketing and promotional emails</p>
                </div>
                <Switch
                  id="marketingEmails"
                  checked={notificationSettings.marketingEmails}
                  onCheckedChange={(checked) => handleNotificationChange("marketingEmails", checked)}
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSaveSettings} className="bg-purple-600 hover:bg-purple-700">
                <Save className="mr-2 h-4 w-4" />
                Save Changes
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Security Settings */}
        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
              <CardDescription>Manage your account security and authentication.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="currentPassword">Current Password</Label>
                <Input id="currentPassword" type="password" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="newPassword">New Password</Label>
                <Input id="newPassword" type="password" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm New Password</Label>
                <Input id="confirmPassword" type="password" />
              </div>
              <div className="pt-4">
                <Button className="bg-purple-600 hover:bg-purple-700">
                  <Lock className="mr-2 h-4 w-4" />
                  Change Password
                </Button>
              </div>
              <div className="border-t pt-4 mt-4">
                <h3 className="text-lg font-medium mb-2">Two-Factor Authentication</h3>
                <p className="text-sm text-gray-500 mb-4">
                  Add an extra layer of security to your account by enabling two-factor authentication.
                </p>
                <Button variant="outline">
                  <Shield className="mr-2 h-4 w-4" />
                  Enable Two-Factor Authentication
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Billing Settings */}
        <TabsContent value="billing">
          <Card>
            <CardHeader>
              <CardTitle>Billing Settings</CardTitle>
              <CardDescription>Manage your subscription and payment methods.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg border">
                <h3 className="text-lg font-medium mb-2">Current Plan</h3>
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-semibold text-purple-600">Premium Plan</p>
                    <p className="text-sm text-gray-500">Billed monthly</p>
                  </div>
                  <p className="font-bold">₦25,000/month</p>
                </div>
                <div className="mt-4">
                  <Button variant="outline">Change Plan</Button>
                </div>
              </div>

              <div className="border-t pt-4 mt-4">
                <h3 className="text-lg font-medium mb-2">Payment Methods</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="bg-gray-100 p-2 rounded">
                        <Wallet className="h-5 w-5 text-gray-600" />
                      </div>
                      <div>
                        <p className="font-medium">Visa ending in 4242</p>
                        <p className="text-sm text-gray-500">Expires 12/2025</p>
                      </div>
                    </div>
                    <Badge>Default</Badge>
                  </div>
                </div>
                <div className="mt-4">
                  <Button variant="outline">
                    <Wallet className="mr-2 h-4 w-4" />
                    Add Payment Method
                  </Button>
                </div>
              </div>

              <div className="border-t pt-4 mt-4">
                <h3 className="text-lg font-medium mb-2">Billing History</h3>
                <div className="space-y-3">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="flex justify-between items-center p-3 border rounded-lg">
                      <div>
                        <p className="font-medium">Invoice #{2023000 + i}</p>
                        <p className="text-sm text-gray-500">{new Date(2023, 7 - i, 1).toLocaleDateString()}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">₦25,000</p>
                        <Badge variant="outline" className="border-green-500 text-green-600 bg-green-50">
                          Paid
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4">
                  <Button variant="outline">View All Invoices</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
