import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { MessageSquare, Zap, Brain } from "lucide-react";
import { Link } from "react-router-dom";
import { Engine } from "@/contexts/EngineContext";
import { EngineDetailsDialog } from "@/components/dialogs/EngineDetailsDialog";
import { formatDistanceToNow } from "date-fns";
import { useEngines } from "@/contexts";

interface EngineCardProps {
  engine: Engine;
}

export const EngineCard = ({ engine }: EngineCardProps) => {
  const [detailsOpen, setDetailsOpen] = useState(false);
  const { deleteEngine } = useEngines();

  const lastTrainedText = engine.last_trained 
    ? formatDistanceToNow(new Date(engine.last_trained), { addSuffix: true })
    : "Never";

  const accuracyValue = engine.accuracy || 0;
  
  return (
    <>
      <Card 
        className="glass-card p-6 hover:border-primary/50 hover:shadow-glow-primary transition-all duration-300 group cursor-pointer hover:scale-105 hover:-translate-y-1 animate-fade-in"
        onClick={() => setDetailsOpen(true)}
      >
        <div className="space-y-4">
          {/* Header */}
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-gradient-primary transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12">
                <Brain className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-lg group-hover:text-primary transition-colors duration-200">
                  {engine.name}
                </h3>
                <p className="text-sm text-muted-foreground">
                  Last trained: {lastTrainedText}
                </p>
              </div>
            </div>
          </div>

          {/* Accuracy Progress */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Accuracy</span>
              <span className="font-semibold text-primary transition-all duration-300 group-hover:scale-110 inline-block">
                {accuracyValue.toFixed(1)}%
              </span>
            </div>
            <Progress value={accuracyValue} className="h-2 transition-all duration-500" />
          </div>

          {/* Stats */}
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span className="capitalize">{engine.status}</span>
            <span>{engine.model_type}</span>
          </div>

          {/* Actions */}
          <div className="flex gap-2 pt-2">
            <Link to="/training" className="flex-1" onClick={(e) => e.stopPropagation()}>
              <Button variant="outline" className="w-full gap-2 hover:bg-accent/10 hover:text-accent hover:border-accent transition-all duration-200 hover:scale-105">
                <Zap className="w-4 h-4 transition-transform duration-200 hover:rotate-12" />
                Train
              </Button>
            </Link>
            <Link to="/inference" className="flex-1" onClick={(e) => e.stopPropagation()}>
              <Button className="w-full gap-2 bg-gradient-primary hover:opacity-90 transition-all duration-200 hover:scale-105 hover:shadow-lg">
                <MessageSquare className="w-4 h-4" />
                Chat
              </Button>
            </Link>
          </div>
        </div>
      </Card>

      <EngineDetailsDialog
        open={detailsOpen}
        onOpenChange={setDetailsOpen}
        engine={engine}
        onDelete={deleteEngine}
      />
    </>
  );
};
