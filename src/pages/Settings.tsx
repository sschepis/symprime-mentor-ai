import { Navigation } from "@/components/Navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { User, Bell, Shield, Palette, Database, Key } from "lucide-react";

const Settings = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 pointer-events-none" />
      
      <main className="relative container mx-auto px-6 py-8">
        <header className="mb-8 animate-fade-in">
          <h1 className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent hover:scale-105 transition-transform duration-300 inline-block">
            Settings
          </h1>
          <p className="text-muted-foreground mt-2 animate-fade-in" style={{ animationDelay: '100ms' }}>
            Manage your account and application preferences
          </p>
        </header>

        <Tabs defaultValue="profile" className="space-y-6 animate-fade-in" style={{ animationDelay: '200ms' }}>
          <TabsList className="bg-muted/30">
            <TabsTrigger value="profile" className="gap-2 transition-all duration-200 hover:scale-105">
              <User className="w-4 h-4" />
              Profile
            </TabsTrigger>
            <TabsTrigger value="notifications" className="gap-2 transition-all duration-200 hover:scale-105">
              <Bell className="w-4 h-4" />
              Notifications
            </TabsTrigger>
            <TabsTrigger value="security" className="gap-2 transition-all duration-200 hover:scale-105">
              <Shield className="w-4 h-4" />
              Security
            </TabsTrigger>
            <TabsTrigger value="appearance" className="gap-2 transition-all duration-200 hover:scale-105">
              <Palette className="w-4 h-4" />
              Appearance
            </TabsTrigger>
            <TabsTrigger value="data" className="gap-2 transition-all duration-200 hover:scale-105">
              <Database className="w-4 h-4" />
              Data & Privacy
            </TabsTrigger>
          </TabsList>

          {/* Profile Tab */}
          <TabsContent value="profile" className="space-y-6">
            <Card className="glass-card p-6 animate-fade-in hover:shadow-glow-primary transition-all duration-300">
              <h3 className="text-xl font-semibold mb-6">Profile Information</h3>
              
              <div className="flex items-center gap-6 mb-6">
                <Avatar className="w-20 h-20">
                  <AvatarFallback className="bg-gradient-primary text-white text-2xl">
                    JD
                  </AvatarFallback>
                </Avatar>
                <div>
                  <Button variant="outline" size="sm">Change Avatar</Button>
                  <p className="text-xs text-muted-foreground mt-2">JPG, PNG or GIF. Max 2MB.</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>First Name</Label>
                    <Input defaultValue="John" className="bg-muted/30" />
                  </div>
                  <div className="space-y-2">
                    <Label>Last Name</Label>
                    <Input defaultValue="Doe" className="bg-muted/30" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Email</Label>
                  <Input defaultValue="john@example.com" type="email" className="bg-muted/30" />
                </div>

                <div className="space-y-2">
                  <Label>Bio</Label>
                  <Input 
                    defaultValue="AI Researcher & Symbolic Intelligence Enthusiast" 
                    className="bg-muted/30" 
                  />
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <Button className="bg-gradient-primary hover:opacity-90 hover:scale-105 transition-all duration-200 hover:shadow-lg">
                  Save Changes
                </Button>
                <Button variant="outline" className="hover:scale-105 transition-all duration-200">
                  Cancel
                </Button>
              </div>
            </Card>
          </TabsContent>

          {/* Notifications Tab */}
          <TabsContent value="notifications" className="space-y-6">
            <Card className="glass-card p-6">
              <h3 className="text-xl font-semibold mb-6">Notification Preferences</h3>
              
              <div className="space-y-6">
                <div className="flex items-center justify-between py-3 border-b border-border/50">
                  <div className="space-y-1">
                    <p className="font-medium">Training Completions</p>
                    <p className="text-sm text-muted-foreground">
                      Get notified when training sessions complete
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between py-3 border-b border-border/50">
                  <div className="space-y-1">
                    <p className="font-medium">Autonomy Milestones</p>
                    <p className="text-sm text-muted-foreground">
                      Alerts when engines reach new autonomy levels
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between py-3 border-b border-border/50">
                  <div className="space-y-1">
                    <p className="font-medium">AI Assistant Suggestions</p>
                    <p className="text-sm text-muted-foreground">
                      Receive optimization recommendations
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between py-3 border-b border-border/50">
                  <div className="space-y-1">
                    <p className="font-medium">Weekly Reports</p>
                    <p className="text-sm text-muted-foreground">
                      Summary of your engines' performance
                    </p>
                  </div>
                  <Switch />
                </div>

                <div className="flex items-center justify-between py-3">
                  <div className="space-y-1">
                    <p className="font-medium">Marketing Updates</p>
                    <p className="text-sm text-muted-foreground">
                      News about features and updates
                    </p>
                  </div>
                  <Switch />
                </div>
              </div>
            </Card>
          </TabsContent>

          {/* Security Tab */}
          <TabsContent value="security" className="space-y-6">
            <Card className="glass-card p-6">
              <h3 className="text-xl font-semibold mb-6">Security Settings</h3>
              
              <div className="space-y-6">
                <div>
                  <h4 className="font-medium mb-4">Change Password</h4>
                  <div className="space-y-3">
                    <div className="space-y-2">
                      <Label>Current Password</Label>
                      <Input type="password" className="bg-muted/30" />
                    </div>
                    <div className="space-y-2">
                      <Label>New Password</Label>
                      <Input type="password" className="bg-muted/30" />
                    </div>
                    <div className="space-y-2">
                      <Label>Confirm New Password</Label>
                      <Input type="password" className="bg-muted/30" />
                    </div>
                  </div>
                  <Button className="mt-4 bg-gradient-primary hover:opacity-90">
                    Update Password
                  </Button>
                </div>

                <div className="pt-6 border-t border-border/50">
                  <h4 className="font-medium mb-4">Two-Factor Authentication</h4>
                  <div className="flex items-center justify-between p-4 bg-muted/20 rounded-lg">
                    <div>
                      <p className="font-medium">2FA Status</p>
                      <p className="text-sm text-muted-foreground">Not enabled</p>
                    </div>
                    <Button variant="outline">Enable 2FA</Button>
                  </div>
                </div>

                <div className="pt-6 border-t border-border/50">
                  <h4 className="font-medium mb-4 flex items-center gap-2">
                    <Key className="w-4 h-4 text-primary" />
                    API Keys
                  </h4>
                  <p className="text-sm text-muted-foreground mb-4">
                    Manage API keys for programmatic access
                  </p>
                  <Button variant="outline">Generate New API Key</Button>
                </div>
              </div>
            </Card>
          </TabsContent>

          {/* Appearance Tab */}
          <TabsContent value="appearance" className="space-y-6">
            <Card className="glass-card p-6">
              <h3 className="text-xl font-semibold mb-6">Appearance Settings</h3>
              
              <div className="space-y-6">
                <div>
                  <Label className="mb-3 block">Theme</Label>
                  <div className="grid grid-cols-3 gap-4">
                    <button className="p-4 border-2 border-primary bg-muted/30 rounded-lg">
                      <div className="w-full h-20 bg-background rounded mb-2"></div>
                      <p className="text-sm font-medium">Dark</p>
                    </button>
                    <button className="p-4 border-2 border-border bg-muted/30 rounded-lg opacity-50">
                      <div className="w-full h-20 bg-white rounded mb-2"></div>
                      <p className="text-sm font-medium">Light</p>
                    </button>
                    <button className="p-4 border-2 border-border bg-muted/30 rounded-lg opacity-50">
                      <div className="w-full h-20 bg-gradient-to-br from-background to-white rounded mb-2"></div>
                      <p className="text-sm font-medium">Auto</p>
                    </button>
                  </div>
                </div>

                <div className="pt-6 border-t border-border/50">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Compact Mode</p>
                      <p className="text-sm text-muted-foreground">
                        Reduce spacing for more content density
                      </p>
                    </div>
                    <Switch />
                  </div>
                </div>

                <div className="pt-6 border-t border-border/50">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Animations</p>
                      <p className="text-sm text-muted-foreground">
                        Enable interface animations and transitions
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>

          {/* Data & Privacy Tab */}
          <TabsContent value="data" className="space-y-6">
            <Card className="glass-card p-6">
              <h3 className="text-xl font-semibold mb-6">Data & Privacy</h3>
              
              <div className="space-y-6">
                <div>
                  <h4 className="font-medium mb-3">Export Your Data</h4>
                  <p className="text-sm text-muted-foreground mb-4">
                    Download all your training data, conversation history, and engine configurations
                  </p>
                  <Button variant="outline" className="gap-2">
                    <Database className="w-4 h-4" />
                    Request Data Export
                  </Button>
                </div>

                <div className="pt-6 border-t border-border/50">
                  <h4 className="font-medium mb-3">Delete Account</h4>
                  <p className="text-sm text-muted-foreground mb-4">
                    Permanently delete your account and all associated data. This action cannot be undone.
                  </p>
                  <Button variant="destructive">Delete Account</Button>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Settings;
