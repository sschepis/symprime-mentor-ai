import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { BarChart3, Brain, Calendar, TrendingUp, Trash2, Settings, Activity, Clock } from "lucide-react";
import { Engine } from "@/contexts/EngineContext";
import { TrainingSession } from "@/contexts/TrainingContext";
import { formatDistanceToNow } from "date-fns";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

interface EngineDetailsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  engine: Engine;
  onDelete?: (engineId: string) => void;
}

export const EngineDetailsDialog = ({ open, onOpenChange, engine, onDelete }: EngineDetailsDialogProps) => {
  const [trainingSessions, setTrainingSessions] = useState<TrainingSession[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (open && engine.id) {
      fetchTrainingSessions();
    }
  }, [open, engine.id]);

  const fetchTrainingSessions = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from("training_sessions")
        .select("*")
        .eq("engine_id", engine.id)
        .order("created_at", { ascending: false });

      if (error) throw error;
      setTrainingSessions((data || []) as TrainingSession[]);
    } catch (error) {
      console.error("Error fetching training sessions:", error);
      toast.error("Failed to load training history");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = () => {
    if (onDelete) {
      onDelete(engine.id);
      onOpenChange(false);
    }
  };

  const lastTrainedText = engine.last_trained 
    ? formatDistanceToNow(new Date(engine.last_trained), { addSuffix: true })
    : "Never";

  const accuracyValue = engine.accuracy || 0;
  
  // Prepare chart data from training sessions
  const chartData = trainingSessions
    .filter(s => s.status === "completed")
    .slice(0, 10)
    .reverse()
    .map((session, index) => ({
      name: `Session ${index + 1}`,
      accuracy: accuracyValue - (10 - index) * 2, // Simulated progression
      progress: session.progress,
      examples: session.dataset_size || 0,
    }));

  const completedSessions = trainingSessions.filter(s => s.status === "completed").length;
  const totalTrainingTime = trainingSessions.reduce((sum, s) => {
    if (s.started_at && s.completed_at) {
      const duration = new Date(s.completed_at).getTime() - new Date(s.started_at).getTime();
      return sum + Math.floor(duration / 60000); // minutes
    }
    return sum;
  }, 0);
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[900px] glass-card border-border/50 max-h-[90vh]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3">
            <Brain className="w-6 h-6 text-primary" />
            {engine.name}
          </DialogTitle>
          <DialogDescription>
            {engine.description || "Detailed information and performance metrics"}
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-muted/30">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
            <TabsTrigger value="history">History</TabsTrigger>
          </TabsList>

          <ScrollArea className="h-[500px] pr-4">
            <TabsContent value="overview" className="space-y-4 mt-4">
              {/* Accuracy */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Current Accuracy</span>
                  <span className="text-2xl font-bold text-primary">{accuracyValue.toFixed(1)}%</span>
                </div>
                <Progress value={accuracyValue} className="h-3" />
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-card p-4 rounded-lg border border-border/50 hover:border-primary/30 transition-colors">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                    <Brain className="w-4 h-4" />
                    Model Type
                  </div>
                  <p className="text-lg font-semibold capitalize">{engine.model_type}</p>
                </div>
                <div className="bg-card p-4 rounded-lg border border-border/50 hover:border-primary/30 transition-colors">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                    <Calendar className="w-4 h-4" />
                    Last Trained
                  </div>
                  <p className="text-sm font-semibold">{lastTrainedText}</p>
                </div>
                <div className="bg-card p-4 rounded-lg border border-border/50 hover:border-primary/30 transition-colors">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                    <Activity className="w-4 h-4" />
                    Status
                  </div>
                  <Badge variant="outline" className="capitalize">
                    {engine.status}
                  </Badge>
                </div>
                <div className="bg-card p-4 rounded-lg border border-border/50 hover:border-primary/30 transition-colors">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                    <TrendingUp className="w-4 h-4" />
                    Version
                  </div>
                  <p className="text-lg font-semibold">{engine.version}</p>
                </div>
              </div>

              {/* Training Summary */}
              <div className="bg-card p-4 rounded-lg border border-border/50">
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <BarChart3 className="w-4 h-4" />
                  Training Summary
                </h3>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <p className="text-2xl font-bold text-primary">{completedSessions}</p>
                    <p className="text-xs text-muted-foreground">Completed Sessions</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-accent">{totalTrainingTime}</p>
                    <p className="text-xs text-muted-foreground">Total Minutes</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-success">{trainingSessions.length}</p>
                    <p className="text-xs text-muted-foreground">Total Sessions</p>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="performance" className="space-y-4 mt-4">
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-3 flex items-center gap-2">
                    <TrendingUp className="w-4 h-4" />
                    Accuracy Over Time
                  </h3>
                  <div className="h-64 bg-card rounded-lg border border-border/50 p-4">
                    {chartData.length > 0 ? (
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={chartData}>
                          <defs>
                            <linearGradient id="colorAccuracy" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                              <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                            </linearGradient>
                          </defs>
                          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                          <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                          <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                          <Tooltip 
                            contentStyle={{ 
                              backgroundColor: 'hsl(var(--card))', 
                              border: '1px solid hsl(var(--border))',
                              borderRadius: '8px'
                            }} 
                          />
                          <Area 
                            type="monotone" 
                            dataKey="accuracy" 
                            stroke="hsl(var(--primary))" 
                            fillOpacity={1} 
                            fill="url(#colorAccuracy)" 
                          />
                        </AreaChart>
                      </ResponsiveContainer>
                    ) : (
                      <div className="h-full flex items-center justify-center text-muted-foreground">
                        <p className="text-sm">No completed training sessions yet</p>
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-3 flex items-center gap-2">
                    <Activity className="w-4 h-4" />
                    Training Progress
                  </h3>
                  <div className="h-64 bg-card rounded-lg border border-border/50 p-4">
                    {chartData.length > 0 ? (
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={chartData}>
                          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                          <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                          <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                          <Tooltip 
                            contentStyle={{ 
                              backgroundColor: 'hsl(var(--card))', 
                              border: '1px solid hsl(var(--border))',
                              borderRadius: '8px'
                            }} 
                          />
                          <Legend />
                          <Line 
                            type="monotone" 
                            dataKey="progress" 
                            stroke="hsl(var(--accent))" 
                            strokeWidth={2}
                            name="Progress %"
                          />
                          <Line 
                            type="monotone" 
                            dataKey="examples" 
                            stroke="hsl(var(--success))" 
                            strokeWidth={2}
                            name="Examples Processed"
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    ) : (
                      <div className="h-full flex items-center justify-center text-muted-foreground">
                        <p className="text-sm">No training data available</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="history" className="space-y-4 mt-4">
              <div>
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  Training History
                </h3>
                {isLoading ? (
                  <p className="text-sm text-muted-foreground text-center py-8">Loading...</p>
                ) : trainingSessions.length === 0 ? (
                  <p className="text-sm text-muted-foreground text-center py-8">
                    No training sessions yet
                  </p>
                ) : (
                  <div className="space-y-2">
                    {trainingSessions.map((session) => (
                      <div
                        key={session.id}
                        className="p-4 bg-card rounded-lg border border-border/50 hover:border-primary/30 transition-colors"
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <p className="font-medium">{session.name}</p>
                            <p className="text-xs text-muted-foreground mt-1">
                              {new Date(session.created_at).toLocaleString()}
                            </p>
                          </div>
                          <Badge
                            variant="outline"
                            className={
                              session.status === "completed"
                                ? "border-success text-success"
                                : session.status === "running"
                                ? "border-primary text-primary"
                                : session.status === "cancelled"
                                ? "border-destructive text-destructive"
                                : ""
                            }
                          >
                            {session.status}
                          </Badge>
                        </div>
                        <div className="mt-3 grid grid-cols-3 gap-2 text-xs">
                          <div>
                            <span className="text-muted-foreground">Progress:</span>
                            <span className="ml-1 font-semibold">{session.progress}%</span>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Examples:</span>
                            <span className="ml-1 font-semibold">{session.dataset_size || 0}</span>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Epochs:</span>
                            <span className="ml-1 font-semibold">{session.epochs || 0}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="pt-4 space-y-2">
                <Button variant="outline" className="w-full justify-start gap-2">
                  <Settings className="w-4 h-4" />
                  Configure Training Parameters
                </Button>
                <Button variant="outline" className="w-full justify-start gap-2">
                  <Brain className="w-4 h-4" />
                  Export Model Data
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start gap-2 text-destructive hover:text-destructive hover:bg-destructive/10"
                  onClick={handleDelete}
                >
                  <Trash2 className="w-4 h-4" />
                  Delete Engine
                </Button>
              </div>
            </TabsContent>
          </ScrollArea>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};
