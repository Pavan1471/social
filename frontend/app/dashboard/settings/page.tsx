"use client"

import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { DashboardHeader } from "@/components/dashboard-header"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

export default function SettingsPage() {
  return (
    <div className="flex bg-background">
      <DashboardSidebar />
      <div className="flex-1 ml-64 flex flex-col min-h-screen">
        <DashboardHeader />
        <main className="flex-1 p-8">
          <div className="max-w-2xl mx-auto space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">Settings</h1>
              <p className="text-muted-foreground">Manage your account and analytics preferences</p>
            </div>

            {/* Account Settings */}
            <Card className="bg-card border-border/50 p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">Account Information</h3>
              <div className="space-y-4">
                <div>
                  <label className="text-sm text-muted-foreground">Name</label>
                  <p className="text-foreground font-medium">John Doe</p>
                </div>
                <div>
                  <label className="text-sm text-muted-foreground">Email</label>
                  <p className="text-foreground font-medium">john@example.com</p>
                </div>
                <div>
                  <label className="text-sm text-muted-foreground">Store Name</label>
                  <p className="text-foreground font-medium">My Awesome Store</p>
                </div>
                <Button variant="outline" className="mt-4 border-border/50 bg-transparent">
                  Edit Profile
                </Button>
              </div>
            </Card>

            {/* Notification Preferences */}
            <Card className="bg-card border-border/50 p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">Notifications</h3>
              <div className="space-y-3">
                {["Email alerts for negative sentiment", "Weekly analytics summary", "New keyword mentions"].map(
                  (pref) => (
                    <div key={pref} className="flex items-center gap-3">
                      <input type="checkbox" defaultChecked className="w-4 h-4 rounded" id={pref} />
                      <label htmlFor={pref} className="text-sm text-foreground cursor-pointer">
                        {pref}
                      </label>
                    </div>
                  ),
                )}
              </div>
            </Card>

            {/* Danger Zone */}
            <Card className="bg-destructive/10 border-destructive/30 p-6">
              <h3 className="text-lg font-semibold text-destructive mb-2">Danger Zone</h3>
              <p className="text-sm text-foreground mb-4">
                Once you delete your account, there is no going back. Please be certain.
              </p>
              <Button variant="destructive">Delete Account</Button>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
}
