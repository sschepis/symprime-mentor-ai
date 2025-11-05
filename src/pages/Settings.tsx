import { Navigation } from "@/components/Navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User, Bell, Shield, Palette, Database, Key, Upload, Loader2 } from "lucide-react";
import { useUser } from "@/contexts";
import { useApp } from "@/contexts/AppContext";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useState, useRef } from "react";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";

const Settings = () => {
  const { user, logout } = useUser();
  const { settings, updateSettings } = useApp();
  const [isLoading, setIsLoading] = useState(false);
  const [profileData, setProfileData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    role: user?.role || "",
  });
  const [passwordData, setPasswordData] = useState({
    current: "",
    new: "",
    confirm: "",
  });
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !user) return;

    if (file.size > 2 * 1024 * 1024) {
      toast.error("File size must be less than 2MB");
      return;
    }

    setIsLoading(true);
    try {
      const fileExt = file.name.split('.').pop();
      const filePath = `${user.id}/avatar.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, file, { upsert: true });

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('avatars')
        .getPublicUrl(filePath);

      const { error: updateError } = await supabase
        .from('profiles')
        .update({ avatar: publicUrl })
        .eq('id', user.id);

      if (updateError) throw updateError;

      toast.success("Avatar updated successfully");
      window.location.reload();
    } catch (error: any) {
      toast.error(error.message || "Failed to upload avatar");
    } finally {
      setIsLoading(false);
    }
  };

  const handleProfileUpdate = async () => {
    if (!user) return;

    setIsLoading(true);
    try {
      const { error } = await supabase
        .from('profiles')
        .update({
          name: profileData.name,
          role: profileData.role,
        })
        .eq('id', user.id);

      if (error) throw error;

      toast.success("Profile updated successfully");
      window.location.reload();
    } catch (error: any) {
      toast.error(error.message || "Failed to update profile");
    } finally {
      setIsLoading(false);
    }
  };

  const handlePasswordChange = async () => {
    if (passwordData.new !== passwordData.confirm) {
      toast.error("New passwords don't match");
      return;
    }

    if (passwordData.new.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    setIsLoading(true);
    try {
      const { error } = await supabase.auth.updateUser({
        password: passwordData.new
      });

      if (error) throw error;

      toast.success("Password updated successfully");
      setPasswordData({ current: "", new: "", confirm: "" });
    } catch (error: any) {
      toast.error(error.message || "Failed to update password");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteAccount = async () => {
    if (!user) return;

    setIsLoading(true);
    try {
      // Delete user data
      await supabase.from('conversations').delete().eq('user_id', user.id);
      await supabase.from('training_sessions').delete().eq('user_id', user.id);
      await supabase.from('engines').delete().eq('user_id', user.id);

      // Delete auth user
      const { error } = await supabase.auth.admin.deleteUser(user.id);
      if (error) throw error;

      toast.success("Account deleted successfully");
      await logout();
    } catch (error: any) {
      toast.error(error.message || "Failed to delete account");
    } finally {
      setIsLoading(false);
    }
  };

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
                  {user?.avatar && <AvatarImage src={user.avatar} alt={user.name} />}
                  <AvatarFallback className="bg-gradient-primary text-white text-2xl">
                    {user?.name.substring(0, 2).toUpperCase() || "U"}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleAvatarUpload}
                  />
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => fileInputRef.current?.click()}
                    disabled={isLoading}
                  >
                    {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4 mr-2" />}
                    Change Avatar
                  </Button>
                  <p className="text-xs text-muted-foreground mt-2">JPG, PNG or GIF. Max 2MB.</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Name</Label>
                  <Input 
                    value={profileData.name} 
                    onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                    className="bg-muted/30" 
                  />
                </div>

                <div className="space-y-2">
                  <Label>Email</Label>
                  <Input 
                    value={profileData.email} 
                    type="email" 
                    className="bg-muted/30" 
                    disabled
                  />
                  <p className="text-xs text-muted-foreground">Email cannot be changed</p>
                </div>

                <div className="space-y-2">
                  <Label>Role</Label>
                  <Input 
                    value={profileData.role}
                    onChange={(e) => setProfileData({ ...profileData, role: e.target.value })}
                    className="bg-muted/30" 
                    placeholder="e.g., AI Researcher"
                  />
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <Button 
                  className="bg-gradient-primary hover:opacity-90 hover:scale-105 transition-all duration-200 hover:shadow-lg"
                  onClick={handleProfileUpdate}
                  disabled={isLoading}
                >
                  {isLoading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
                  Save Changes
                </Button>
                <Button 
                  variant="outline" 
                  className="hover:scale-105 transition-all duration-200"
                  onClick={() => setProfileData({ 
                    name: user?.name || "", 
                    email: user?.email || "", 
                    role: user?.role || "" 
                  })}
                >
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
                      <Label>New Password</Label>
                      <Input 
                        type="password" 
                        className="bg-muted/30"
                        value={passwordData.new}
                        onChange={(e) => setPasswordData({ ...passwordData, new: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Confirm New Password</Label>
                      <Input 
                        type="password" 
                        className="bg-muted/30"
                        value={passwordData.confirm}
                        onChange={(e) => setPasswordData({ ...passwordData, confirm: e.target.value })}
                      />
                    </div>
                  </div>
                  <Button 
                    className="mt-4 bg-gradient-primary hover:opacity-90"
                    onClick={handlePasswordChange}
                    disabled={isLoading || !passwordData.new || !passwordData.confirm}
                  >
                    {isLoading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
                    Update Password
                  </Button>
                </div>

                <div className="pt-6 border-t border-border/50">
                  <h4 className="font-medium mb-4">Session Information</h4>
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <p>User ID: {user?.id}</p>
                    <p>Subscription: {user?.subscription}</p>
                    <p>Joined: {user?.joinedDate ? new Date(user.joinedDate).toLocaleDateString() : 'N/A'}</p>
                  </div>
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
                    <button 
                      className={`p-4 border-2 ${settings.theme === 'dark' ? 'border-primary' : 'border-border'} bg-muted/30 rounded-lg transition-all hover:scale-105`}
                      onClick={() => updateSettings({ theme: 'dark' })}
                    >
                      <div className="w-full h-20 bg-background rounded mb-2"></div>
                      <p className="text-sm font-medium">Dark</p>
                    </button>
                    <button 
                      className={`p-4 border-2 ${settings.theme === 'light' ? 'border-primary' : 'border-border'} bg-muted/30 rounded-lg transition-all hover:scale-105`}
                      onClick={() => updateSettings({ theme: 'light' })}
                    >
                      <div className="w-full h-20 bg-white rounded mb-2"></div>
                      <p className="text-sm font-medium">Light</p>
                    </button>
                    <button 
                      className={`p-4 border-2 ${settings.theme === 'system' ? 'border-primary' : 'border-border'} bg-muted/30 rounded-lg transition-all hover:scale-105`}
                      onClick={() => updateSettings({ theme: 'system' })}
                    >
                      <div className="w-full h-20 bg-gradient-to-br from-background to-white rounded mb-2"></div>
                      <p className="text-sm font-medium">System</p>
                    </button>
                  </div>
                </div>

                <div className="pt-6 border-t border-border/50">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Notifications</p>
                      <p className="text-sm text-muted-foreground">
                        Enable browser notifications
                      </p>
                    </div>
                    <Switch 
                      checked={settings.notifications}
                      onCheckedChange={(checked) => updateSettings({ notifications: checked })}
                    />
                  </div>
                </div>

                <div className="pt-6 border-t border-border/50">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Auto Save</p>
                      <p className="text-sm text-muted-foreground">
                        Automatically save changes
                      </p>
                    </div>
                    <Switch 
                      checked={settings.autoSave}
                      onCheckedChange={(checked) => updateSettings({ autoSave: checked })}
                    />
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
                  <Button variant="outline" className="gap-2" disabled>
                    <Database className="w-4 h-4" />
                    Request Data Export
                  </Button>
                  <p className="text-xs text-muted-foreground mt-2">Coming soon</p>
                </div>

                <div className="pt-6 border-t border-border/50">
                  <h4 className="font-medium mb-3 text-destructive">Danger Zone</h4>
                  <p className="text-sm text-muted-foreground mb-4">
                    Permanently delete your account and all associated data. This action cannot be undone.
                  </p>
                  <Button 
                    variant="destructive"
                    onClick={() => setShowDeleteDialog(true)}
                  >
                    Delete Account
                  </Button>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </main>

      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your account
              and remove all your data including engines, training sessions, and conversations.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteAccount}
              className="bg-destructive hover:bg-destructive/90"
              disabled={isLoading}
            >
              {isLoading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
              Delete Account
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Settings;
