import { Brain, Zap, MessageSquare, TrendingUp, Plus, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { StatCard } from "@/components/dashboard/StatCard";
import { EngineCard } from "@/components/dashboard/EngineCard";
import { ActivityFeed } from "@/components/dashboard/ActivityFeed";
import { Navigation } from "@/components/Navigation";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10 pointer-events-none" />
      
      <main className="relative container mx-auto px-6 py-8 space-y-8">
        {/* Header */}
        <header className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              Dashboard
            </h1>
            <p className="text-muted-foreground mt-2">
              Manage your symbolic AI engines and training sessions
            </p>
          </div>
          <Button className="gap-2 bg-gradient-primary hover:opacity-90 transition-opacity">
            <Plus className="w-4 h-4" />
            New Engine
          </Button>
        </header>

        {/* Quick Stats */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            icon={Brain}
            label="Engines"
            value="5"
            change="+2 this week"
            iconColor="text-primary"
          />
          <StatCard
            icon={Zap}
            label="Training Sessions"
            value="12"
            change="3 active"
            iconColor="text-accent"
          />
          <StatCard
            icon={MessageSquare}
            label="Queries"
            value="1.2k"
            change="+15% this week"
            iconColor="text-secondary"
          />
          <StatCard
            icon={TrendingUp}
            label="Avg Autonomy"
            value="82%"
            change="+5% improvement"
            iconColor="text-success"
          />
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
            <EngineCard
              name="Greek Mythology Engine"
              autonomy={85}
              trainingSessions={120}
              lastUsed="2 hours ago"
              icon="🧠"
            />
            <EngineCard
              name="Historical Analysis Engine"
              autonomy={72}
              trainingSessions={80}
              lastUsed="1 day ago"
              icon="📚"
            />
            <EngineCard
              name="Scientific Research Engine"
              autonomy={68}
              trainingSessions={65}
              lastUsed="3 days ago"
              icon="🔬"
            />
            <EngineCard
              name="Cultural Context Engine"
              autonomy={91}
              trainingSessions={200}
              lastUsed="30 minutes ago"
              icon="🌍"
            />
          </div>
        </section>

        {/* Recent Activity */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <ActivityFeed />
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
            <Link to="/settings" className="block">
              <Button variant="outline" className="w-full justify-start gap-3 hover:bg-primary/10 transition-colors">
                <Settings className="w-4 h-4 text-muted-foreground" />
                Settings
              </Button>
            </Link>
          </Card>
        </section>
      </main>
    </div>
  );
};

export default Index;
