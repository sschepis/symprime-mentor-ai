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
import { useEngines, useTraining } from "@/contexts";

const Index = () => {
  const [newEngineOpen, setNewEngineOpen] = useState(false);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const { engines, selectedEngine, setSelectedEngine } = useEngines();
  const { trainingSessions } = useTraining();

  const activeTrainingSessions = trainingSessions.filter(s => s.status === "running").length;

  const avgAutonomy = engines.length > 0 
    ? Math.round(engines.reduce((sum, e) => sum + e.autonomy, 0) / engines.length)
    : 0;

  const stats: StatItem[] = [
    { icon: Brain, label: "Engines", value: engines.length.toString(), change: "+2 this week", iconColor: "text-primary" },
    { icon: Zap, label: "Training Sessions", value: trainingSessions.length.toString(), change: `${activeTrainingSessions} active`, iconColor: "text-accent" },
    { icon: MessageSquare, label: "Queries", value: "1.2k", change: "+15% this week", iconColor: "text-secondary" },
    { icon: TrendingUp, label: "Avg Autonomy", value: `${avgAutonomy}%`, change: "+5% improvement", iconColor: "text-success" },
  ];

  const activities: ActivityItem[] = [
    { icon: Zap, title: "Training session completed", description: "Greek Mythology Engine", time: "2 minutes ago", color: "text-accent" },
    { icon: TrendingUp, title: "Autonomy increased to 85%", description: "Greek Mythology Engine", time: "15 minutes ago", color: "text-success" },
    { icon: Target, title: "100 queries processed", description: "Historical Analysis Engine", time: "1 hour ago", color: "text-secondary" },
    { icon: BarChart3, title: "New patterns detected", description: "Scientific Research Engine", time: "3 hours ago", color: "text-primary" },
    { icon: Zap, title: "Training session started", description: "Cultural Context Engine", time: "5 hours ago", color: "text-accent" },
  ];

  const handleEngineClick = (engine: typeof engines[0]) => {
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
            className="gap-2 bg-gradient-primary hover:opacity-90 transition-all duration-200 hover:scale-105 hover:shadow-lg"
            onClick={() => setNewEngineOpen(true)}
          >
            <Plus className="w-4 h-4" />
            New Engine
          </Button>
        }
      />

      <div className="space-y-8">
        {/* Quick Stats */}
        <section className="animate-fade-in" style={{ animationDelay: '100ms' }}>
          <StatsGrid stats={stats} />
        </section>

        {/* My Engines */}
        <section className="animate-fade-in" style={{ animationDelay: '200ms' }}>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold flex items-center gap-2">
              <Brain className="w-6 h-6 text-primary" />
              My Engines
            </h2>
            <Link to="/engines">
              <Button variant="ghost" size="sm" className="hover:scale-105 transition-all duration-200">
                View All
              </Button>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {engines.map((engine, idx) => (
              <div key={engine.name} onClick={() => handleEngineClick(engine)} style={{ animationDelay: `${(idx + 1) * 100}ms` }}>
                <EngineCard {...engine} />
              </div>
            ))}
          </div>
        </section>

        {/* Recent Activity */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-fade-in" style={{ animationDelay: '300ms' }}>
          <div className="lg:col-span-2">
            <ActivityList title="Recent Activity" activities={activities} />
          </div>
          
          {/* Quick Actions */}
          <Card className="glass-card p-6 space-y-4 animate-fade-in hover:shadow-glow-accent transition-all duration-300" style={{ animationDelay: '400ms' }}>
            <h3 className="text-xl font-semibold mb-4">Quick Actions</h3>
            <Link to="/training" className="block">
              <Button variant="outline" className="w-full justify-start gap-3 hover:bg-primary/10 hover:scale-105 transition-all duration-200">
                <Zap className="w-4 h-4 text-accent transition-transform duration-200 hover:rotate-12" />
                Start Training
              </Button>
            </Link>
            <Link to="/inference" className="block">
              <Button variant="outline" className="w-full justify-start gap-3 hover:bg-primary/10 hover:scale-105 transition-all duration-200">
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
