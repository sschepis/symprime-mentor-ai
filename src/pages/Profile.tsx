import { PageLayout } from "@/components/layout/PageLayout";
import { PageHeader } from "@/components/layout/PageHeader";
import { StatsGrid, StatItem } from "@/components/common/StatsGrid";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Calendar, Mail, MapPin, Briefcase, Github, Twitter, Linkedin, Globe } from "lucide-react";
import { useUser, useEngines, useTraining } from "@/contexts";

const Profile = () => {
  const { user } = useUser();
  const { engines } = useEngines();
  const { trainingSessions } = useTraining();

  if (!user) return null;

  const avgAccuracy = engines.length > 0 
    ? Math.round(engines.reduce((sum, e) => sum + (e.accuracy || 0), 0) / engines.length)
    : 0;

  const stats: StatItem[] = [
    { label: "Engines", value: engines.length.toString() },
    { label: "Training Sessions", value: trainingSessions.length.toString() },
    { label: "Queries Processed", value: "12.4k" },
    { label: "Avg Accuracy", value: `${avgAccuracy}%` },
  ];

  return (
    <PageLayout>
      <div className="max-w-4xl mx-auto space-y-6">
          {/* Profile Header */}
          <Card className="glass-card p-8">
            <div className="flex flex-col md:flex-row gap-6">
              <Avatar className="w-32 h-32">
                <AvatarFallback className="bg-gradient-primary text-white text-4xl">
                  {user.avatar}
                </AvatarFallback>
              </Avatar>
              
              <div className="flex-1 space-y-4">
                <div>
                  <h1 className="text-3xl font-bold">{user.name}</h1>
                  <p className="text-lg text-muted-foreground">{user.role}</p>
                </div>

                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                    {user.subscription.charAt(0).toUpperCase() + user.subscription.slice(1)} Member
                  </Badge>
                  <Badge variant="outline" className="bg-accent/10 text-accent border-accent/20">
                    Early Adopter
                  </Badge>
                  <Badge variant="outline" className="bg-secondary/10 text-secondary border-secondary/20">
                    {engines.length} Active Engines
                  </Badge>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Mail className="w-4 h-4" />
                    {user.email}
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
                    Joined {user.joinedDate}
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
          <StatsGrid stats={stats} columns={4} centered hoverable={false} />

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
    </PageLayout>
  );
};

export default Profile;
