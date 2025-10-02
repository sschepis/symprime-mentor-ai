import { Navigation } from "@/components/Navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Pause, Square, Settings as SettingsIcon, Bot } from "lucide-react";
import { AIAssistantPanel } from "@/components/training/AIAssistantPanel";
import { TrainingConfig } from "@/components/training/TrainingConfig";
import { TrainingFeed } from "@/components/training/TrainingFeed";

const Training = () => {
  const currentSession = 45;
  const totalSessions = 100;
  const autonomy = 78;
  const successRate = 82;
  const patternRecognition = 156;
  const entropy = 3.2;
  const temperature = 0.65;

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-primary/5 pointer-events-none" />
      
      <main className="relative container mx-auto px-6 py-8">
        {/* Header */}
        <header className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-ai bg-clip-text text-transparent">
              Training Studio
            </h1>
            <p className="text-muted-foreground mt-2">
              Greek Mythology Engine • Session {currentSession}/{totalSessions}
            </p>
          </div>
        </header>

        {/* Main Training Interface */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column - AI Assistant & Config */}
          <div className="lg:col-span-3 space-y-6">
            <AIAssistantPanel />
            <TrainingConfig />
          </div>

          {/* Center Column - Progress & Feed */}
          <div className="lg:col-span-6 space-y-6">
            {/* Training Progress */}
            <Card className="glass-card p-6 space-y-6">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-semibold">Training Progress</h3>
                  <span className="text-sm text-muted-foreground">
                    Session {currentSession}/{totalSessions}
                  </span>
                </div>
                <Progress value={(currentSession / totalSessions) * 100} className="h-3" />
              </div>

              {/* Current Autonomy */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-medium text-muted-foreground">
                    Current Autonomy
                  </h4>
                  <span className="text-2xl font-bold text-primary">{autonomy}%</span>
                </div>
                <div className="relative h-8 bg-muted rounded-full overflow-hidden">
                  <div 
                    className="absolute inset-y-0 left-0 bg-gradient-primary rounded-full transition-all duration-500"
                    style={{ width: `${autonomy}%` }}
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-sm font-semibold text-foreground mix-blend-difference">
                      {autonomy}%
                    </span>
                  </div>
                </div>
              </div>

              {/* Metrics Grid */}
              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border/50">
                <div>
                  <p className="text-sm text-muted-foreground">Success Rate</p>
                  <p className="text-xl font-semibold text-success">{successRate}%</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Patterns</p>
                  <p className="text-xl font-semibold text-secondary">{patternRecognition}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Entropy</p>
                  <p className="text-xl font-semibold text-accent">{entropy}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Temperature</p>
                  <p className="text-xl font-semibold text-warning">{temperature}</p>
                </div>
              </div>

              {/* Control Buttons */}
              <div className="flex gap-3 pt-4">
                <Button variant="outline" className="flex-1 gap-2">
                  <Pause className="w-4 h-4" />
                  Pause
                </Button>
                <Button variant="destructive" className="flex-1 gap-2">
                  <Square className="w-4 h-4" />
                  Stop
                </Button>
                <Button variant="outline" size="icon">
                  <SettingsIcon className="w-4 h-4" />
                </Button>
              </div>
            </Card>

            {/* Training Examples Feed */}
            <TrainingFeed />
          </div>

          {/* Right Column - Real-time Visualizations */}
          <div className="lg:col-span-3 space-y-6">
            <Card className="glass-card p-6">
              <h3 className="text-lg font-semibold mb-4">Symbol Network</h3>
              <div className="aspect-square bg-muted/20 rounded-lg flex items-center justify-center">
                <p className="text-sm text-muted-foreground">Network visualization</p>
              </div>
            </Card>

            <Card className="glass-card p-6">
              <h3 className="text-lg font-semibold mb-4">Autonomy Over Time</h3>
              <div className="h-32 bg-muted/20 rounded-lg flex items-center justify-center">
                <p className="text-sm text-muted-foreground">Chart placeholder</p>
              </div>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Training;
