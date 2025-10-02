import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { MessageSquare, Zap } from "lucide-react";
import { Link } from "react-router-dom";

interface EngineCardProps {
  name: string;
  autonomy: number;
  trainingSessions: number;
  lastUsed: string;
  icon: string;
}

export const EngineCard = ({ 
  name, 
  autonomy, 
  trainingSessions, 
  lastUsed, 
  icon 
}: EngineCardProps) => {
  return (
    <Card className="glass-card p-6 hover:border-primary/50 transition-all duration-300 group">
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="text-3xl">{icon}</div>
            <div>
              <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">
                {name}
              </h3>
              <p className="text-sm text-muted-foreground">
                Last used: {lastUsed}
              </p>
            </div>
          </div>
        </div>

        {/* Autonomy Progress */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Autonomy</span>
            <span className="font-semibold text-primary">{autonomy}%</span>
          </div>
          <Progress value={autonomy} className="h-2" />
        </div>

        {/* Stats */}
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <span>Trained: {trainingSessions} sessions</span>
        </div>

        {/* Actions */}
        <div className="flex gap-2 pt-2">
          <Link to="/training" className="flex-1">
            <Button variant="outline" className="w-full gap-2 hover:bg-accent/10 hover:text-accent hover:border-accent transition-colors">
              <Zap className="w-4 h-4" />
              Train
            </Button>
          </Link>
          <Link to="/inference" className="flex-1">
            <Button className="w-full gap-2 bg-gradient-primary hover:opacity-90 transition-opacity">
              <MessageSquare className="w-4 h-4" />
              Chat
            </Button>
          </Link>
        </div>
      </div>
    </Card>
  );
};
