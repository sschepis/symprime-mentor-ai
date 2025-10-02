import { Navigation } from "@/components/Navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Calendar, Mail, MapPin, Briefcase, Globe, Github, Twitter, Linkedin } from "lucide-react";

const Profile = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 pointer-events-none" />
      
      <main className="relative container mx-auto px-6 py-8">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Profile Header */}
          <Card className="glass-card p-8">
            <div className="flex flex-col md:flex-row gap-6">
              <Avatar className="w-32 h-32">
                <AvatarFallback className="bg-gradient-primary text-white text-4xl">
                  JD
                </AvatarFallback>
              </Avatar>
              
              <div className="flex-1 space-y-4">
                <div>
                  <h1 className="text-3xl font-bold">John Doe</h1>
                  <p className="text-lg text-muted-foreground">AI Researcher & Symbolic Intelligence Enthusiast</p>
                </div>

                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                    Premium Member
                  </Badge>
                  <Badge variant="outline" className="bg-accent/10 text-accent border-accent/20">
                    Early Adopter
                  </Badge>
                  <Badge variant="outline" className="bg-secondary/10 text-secondary border-secondary/20">
                    5 Active Engines
                  </Badge>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Mail className="w-4 h-4" />
                    john@example.com
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <MapPin className="w-4 h-4" />
                    San Francisco, CA
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Briefcase className="w-4 h-4" />
                    AI Research Lab
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Calendar className="w-4 h-4" />
                    Joined March 2024
                  </div>
                </div>

                <div className="flex gap-3 pt-2">
                  <Button variant="outline" size="sm" className="gap-2">
                    <Github className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="sm" className="gap-2">
                    <Twitter className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="sm" className="gap-2">
                    <Linkedin className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="sm" className="gap-2">
                    <Globe className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <div className="flex md:flex-col gap-2">
                <Button className="bg-gradient-primary hover:opacity-90">
                  Edit Profile
                </Button>
                <Button variant="outline">
                  Share Profile
                </Button>
              </div>
            </div>
          </Card>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card className="glass-card p-4 text-center">
              <p className="text-3xl font-bold text-primary">5</p>
              <p className="text-sm text-muted-foreground">Engines</p>
            </Card>
            <Card className="glass-card p-4 text-center">
              <p className="text-3xl font-bold text-accent">357</p>
              <p className="text-sm text-muted-foreground">Training Sessions</p>
            </Card>
            <Card className="glass-card p-4 text-center">
              <p className="text-3xl font-bold text-secondary">12.4k</p>
              <p className="text-sm text-muted-foreground">Queries Processed</p>
            </Card>
            <Card className="glass-card p-4 text-center">
              <p className="text-3xl font-bold text-success">82%</p>
              <p className="text-sm text-muted-foreground">Avg Autonomy</p>
            </Card>
          </div>

          {/* Recent Activity */}
          <Card className="glass-card p-6">
            <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
            <div className="space-y-3">
              {[
                { action: "Completed training session", engine: "Greek Mythology Engine", time: "2 hours ago" },
                { action: "Created new engine", engine: "Scientific Research Engine", time: "1 day ago" },
                { action: "Reached 85% autonomy", engine: "Greek Mythology Engine", time: "2 days ago" },
                { action: "Processed 100+ queries", engine: "Historical Analysis Engine", time: "3 days ago" },
                { action: "Updated engine settings", engine: "Cultural Context Engine", time: "4 days ago" },
              ].map((activity, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 bg-muted/20 rounded-lg">
                  <div>
                    <p className="font-medium">{activity.action}</p>
                    <p className="text-sm text-muted-foreground">{activity.engine}</p>
                  </div>
                  <span className="text-xs text-muted-foreground">{activity.time}</span>
                </div>
              ))}
            </div>
          </Card>

          {/* Achievements */}
          <Card className="glass-card p-6">
            <h2 className="text-xl font-semibold mb-4">Achievements</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { icon: "🏆", name: "First Engine", desc: "Created your first engine" },
                { icon: "⚡", name: "Training Master", desc: "Completed 100 sessions" },
                { icon: "🎯", name: "High Autonomy", desc: "Reached 90% autonomy" },
                { icon: "💬", name: "Conversationalist", desc: "Processed 10k queries" },
              ].map((achievement, idx) => (
                <div key={idx} className="text-center p-4 bg-gradient-to-br from-primary/10 to-accent/10 rounded-lg border border-border/50">
                  <div className="text-4xl mb-2">{achievement.icon}</div>
                  <p className="font-semibold text-sm">{achievement.name}</p>
                  <p className="text-xs text-muted-foreground mt-1">{achievement.desc}</p>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Profile;
