import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart3, Brain, Calendar, TrendingUp, Trash2, Settings } from "lucide-react";

interface EngineDetailsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  engine: {
    name: string;
    icon: string;
    autonomy: number;
    trainingSessions: number;
    lastUsed: string;
  };
}

export const EngineDetailsDialog = ({ open, onOpenChange, engine }: EngineDetailsDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[700px] glass-card border-border/50 max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3">
            <span className="text-3xl">{engine.icon}</span>
            {engine.name}
          </DialogTitle>
          <DialogDescription>
            Detailed information and statistics
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-muted/30">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            {/* Autonomy */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Current Autonomy</span>
                <span className="text-2xl font-bold text-primary">{engine.autonomy}%</span>
              </div>
              <Progress value={engine.autonomy} className="h-3" />
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-card p-4 rounded-lg border border-border/50">
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                  <Brain className="w-4 h-4" />
                  Training Sessions
                </div>
                <p className="text-2xl font-bold">{engine.trainingSessions}</p>
              </div>
              <div className="bg-card p-4 rounded-lg border border-border/50">
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                  <Calendar className="w-4 h-4" />
                  Last Used
                </div>
                <p className="text-lg font-semibold">{engine.lastUsed}</p>
              </div>
              <div className="bg-card p-4 rounded-lg border border-border/50">
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                  <BarChart3 className="w-4 h-4" />
                  Total Queries
                </div>
                <p className="text-2xl font-bold">2.4k</p>
              </div>
              <div className="bg-card p-4 rounded-lg border border-border/50">
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                  <TrendingUp className="w-4 h-4" />
                  Success Rate
                </div>
                <p className="text-2xl font-bold text-success">94%</p>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="space-y-2">
              <h4 className="text-sm font-semibold">Recent Training History</h4>
              <div className="space-y-2">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex items-center justify-between p-3 bg-muted/20 rounded-lg">
                    <div className="flex items-center gap-3">
                      <Badge variant="outline" className="bg-success/10 text-success border-success/20">
                        Completed
                      </Badge>
                      <span className="text-sm">Session #{120 - i}</span>
                    </div>
                    <span className="text-xs text-muted-foreground">{i} day{i > 1 ? 's' : ''} ago</span>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="performance" className="space-y-4">
            <div className="h-64 bg-muted/20 rounded-lg flex items-center justify-center">
              <p className="text-sm text-muted-foreground">Performance charts will be displayed here</p>
            </div>
            
            <div className="grid grid-cols-3 gap-3">
              <div className="text-center p-3 bg-card rounded-lg border border-border/50">
                <p className="text-xs text-muted-foreground mb-1">Avg Response Time</p>
                <p className="text-lg font-bold text-accent">320ms</p>
              </div>
              <div className="text-center p-3 bg-card rounded-lg border border-border/50">
                <p className="text-xs text-muted-foreground mb-1">Symbols Learned</p>
                <p className="text-lg font-bold text-secondary">1,247</p>
              </div>
              <div className="text-center p-3 bg-card rounded-lg border border-border/50">
                <p className="text-xs text-muted-foreground mb-1">Relationships</p>
                <p className="text-lg font-bold text-primary">3,891</p>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="settings" className="space-y-4">
            <div className="space-y-3">
              <Button variant="outline" className="w-full justify-start gap-2">
                <Settings className="w-4 h-4" />
                Configure Training Parameters
              </Button>
              <Button variant="outline" className="w-full justify-start gap-2">
                <Brain className="w-4 h-4" />
                Export Model Data
              </Button>
              <Button variant="outline" className="w-full justify-start gap-2 text-destructive hover:text-destructive hover:bg-destructive/10">
                <Trash2 className="w-4 h-4" />
                Delete Engine
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};
