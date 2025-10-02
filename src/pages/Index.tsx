import { useState } from "react";
import { Brain, Zap, MessageSquare, TrendingUp, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { EngineCard } from "@/components/dashboard/EngineCard";
import { NewEngineDialog } from "@/components/dialogs/NewEngineDialog";
import { EngineDetailsDialog } from "@/components/dialogs/EngineDetailsDialog";
import { PageLayout } from "@/components/layout/PageLayout";
import { PageHeader } from "@/components/layout/PageHeader";
import { StatsGrid, StatItem } from "@/components/common/StatsGrid";
import { ActivityList, ActivityItem } from "@/components/common/ActivityList";
import { BarChart3, Target } from "lucide-react";

const Index = () => {
  const [newEngineOpen, setNewEngineOpen] = useState(false);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [selectedEngine, setSelectedEngine] = useState<any>(null);

  const engines = [
    { name: "Greek Mythology Engine", autonomy: 85, trainingSessions: 120, lastUsed: "2 hours ago", icon: "🧠" },
    { name: "Historical Analysis Engine", autonomy: 72, trainingSessions: 80, lastUsed: "1 day ago", icon: "📚" },
    { name: "Scientific Research Engine", autonomy: 68, trainingSessions: 65, lastUsed: "3 days ago", icon: "🔬" },
    { name: "Cultural Context Engine", autonomy: 91, trainingSessions: 200, lastUsed: "30 minutes ago", icon: "🌍" },
  ];

  const stats: StatItem[] = [
    { icon: Brain, label: "Engines", value: "5", change: "+2 this week", iconColor: "text-primary" },
    { icon: Zap, label: "Training Sessions", value: "12", change: "3 active", iconColor: "text-accent" },
    { icon: MessageSquare, label: "Queries", value: "1.2k", change: "+15% this week", iconColor: "text-secondary" },
    { icon: TrendingUp, label: "Avg Autonomy", value: "82%", change: "+5% improvement", iconColor: "text-success" },
  ];

  const activities: ActivityItem[] = [
    { icon: Zap, title: "Training session completed", description: "Greek Mythology Engine", time: "2 minutes ago", color: "text-accent" },
    { icon: TrendingUp, title: "Autonomy increased to 85%", description: "Greek Mythology Engine", time: "15 minutes ago", color: "text-success" },
    { icon: Target, title: "100 queries processed", description: "Historical Analysis Engine", time: "1 hour ago", color: "text-secondary" },
    { icon: BarChart3, title: "New patterns detected", description: "Scientific Research Engine", time: "3 hours ago", color: "text-primary" },
    { icon: Zap, title: "Training session started", description: "Cultural Context Engine", time: "5 hours ago", color: "text-accent" },
  ];

  const handleEngineClick = (engine: any) => {
    setSelectedEngine(engine);
    setDetailsOpen(true);
  };

  return (
    <PageLayout>
      <PageHeader
        title="Dashboard"
        description="Manage your symbolic AI engines and training sessions"
        actions={
          <Button 
            className="gap-2 bg-gradient-primary hover:opacity-90 transition-opacity"
            onClick={() => setNewEngineOpen(true)}
          >
            <Plus className="w-4 h-4" />
            New Engine
          </Button>
        }
      />

      <div className="space-y-8">
        {/* Quick Stats */}
        <section>
          <StatsGrid stats={stats} />
        </section>

        {/* My Engines */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold">My Engines</h2>
            <Link to="/engines">
              <Button variant="ghost" size="sm">
                View All
              </Button>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {engines.map((engine) => (
              <div key={engine.name} onClick={() => handleEngineClick(engine)}>
                <EngineCard {...engine} />
              </div>
            ))}
          </div>
        </section>

        {/* Recent Activity */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <ActivityList title="Recent Activity" activities={activities} />
          </div>
          
          {/* Quick Actions */}
          <Card className="glass-card p-6 space-y-4">
            <h3 className="text-xl font-semibold mb-4">Quick Actions</h3>
            <Link to="/training" className="block">
              <Button variant="outline" className="w-full justify-start gap-3 hover:bg-primary/10 transition-colors">
                <Zap className="w-4 h-4 text-accent" />
                Start Training
              </Button>
            </Link>
            <Link to="/inference" className="block">
              <Button variant="outline" className="w-full justify-start gap-3 hover:bg-primary/10 transition-colors">
                <MessageSquare className="w-4 h-4 text-secondary" />
                New Chat
              </Button>
            </Link>
          </Card>
        </section>
      </div>

      {/* Dialogs */}
      <NewEngineDialog open={newEngineOpen} onOpenChange={setNewEngineOpen} />
      {selectedEngine && (
        <EngineDetailsDialog 
          open={detailsOpen} 
          onOpenChange={setDetailsOpen} 
          engine={selectedEngine}
        />
      )}
    </PageLayout>
  );
};

export default Index;
