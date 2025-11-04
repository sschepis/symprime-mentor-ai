import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart3, Brain, Calendar, TrendingUp, Trash2, Settings } from "lucide-react";
import { Engine } from "@/contexts/EngineContext";
import { formatDistanceToNow } from "date-fns";

interface EngineDetailsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  engine: Engine;
}

export const EngineDetailsDialog = ({ open, onOpenChange, engine }: EngineDetailsDialogProps) => {
  const lastTrainedText = engine.last_trained 
    ? formatDistanceToNow(new Date(engine.last_trained), { addSuffix: true })
    : "Never";

  const accuracyValue = engine.accuracy || 0;
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[700px] glass-card border-border/50 max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3">
            <Brain className="w-6 h-6 text-primary" />
            {engine.name}
          </DialogTitle>
          <DialogDescription>
            {engine.description || "Detailed information and statistics"}
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-muted/30">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
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
              <div className="bg-card p-4 rounded-lg border border-border/50">
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                  <Brain className="w-4 h-4" />
                  Model Type
                </div>
                <p className="text-lg font-semibold capitalize">{engine.model_type}</p>
              </div>
              <div className="bg-card p-4 rounded-lg border border-border/50">
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                  <Calendar className="w-4 h-4" />
                  Last Trained
                </div>
                <p className="text-sm font-semibold">{lastTrainedText}</p>
              </div>
              <div className="bg-card p-4 rounded-lg border border-border/50">
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                  <BarChart3 className="w-4 h-4" />
                  Status
                </div>
                <Badge variant="outline" className="capitalize">
                  {engine.status}
                </Badge>
              </div>
              <div className="bg-card p-4 rounded-lg border border-border/50">
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                  <TrendingUp className="w-4 h-4" />
                  Version
                </div>
                <p className="text-lg font-semibold">{engine.version}</p>
              </div>
            </div>

            {/* Training Time */}
            {engine.training_time && (
              <div className="bg-card p-4 rounded-lg border border-border/50">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-muted-foreground">Total Training Time</span>
                  <span className="text-lg font-bold">{engine.training_time} minutes</span>
                </div>
              </div>
            )}
          </TabsContent>

          <TabsContent value="performance" className="space-y-4">
            <div className="h-64 bg-muted/20 rounded-lg flex items-center justify-center">
              <p className="text-sm text-muted-foreground">Performance charts will be displayed here</p>
            </div>
            
            <div className="grid grid-cols-3 gap-3">
              <div className="text-center p-3 bg-card rounded-lg border border-border/50">
                <p className="text-xs text-muted-foreground mb-1">Accuracy</p>
                <p className="text-lg font-bold text-accent">{accuracyValue.toFixed(1)}%</p>
              </div>
              <div className="text-center p-3 bg-card rounded-lg border border-border/50">
                <p className="text-xs text-muted-foreground mb-1">Version</p>
                <p className="text-lg font-bold text-secondary">{engine.version}</p>
              </div>
              <div className="text-center p-3 bg-card rounded-lg border border-border/50">
                <p className="text-xs text-muted-foreground mb-1">Status</p>
                <p className="text-lg font-bold text-primary capitalize">{engine.status}</p>
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
