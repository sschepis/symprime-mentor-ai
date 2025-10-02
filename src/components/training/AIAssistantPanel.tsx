import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Bot, HelpCircle } from "lucide-react";

export const AIAssistantPanel = () => {
  return (
    <Card className="glass-card p-6 pulse-glow">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 rounded-lg bg-gradient-ai">
          <Bot className="w-5 h-5 text-white" />
        </div>
        <div>
          <h3 className="font-semibold">AI Training Assistant</h3>
          <p className="text-xs text-success">● Active</p>
        </div>
      </div>

      <div className="space-y-4">
        {/* Assistant Message */}
        <div className="bg-muted/30 rounded-lg p-4 space-y-3">
          <p className="text-sm leading-relaxed">
            I've detected strong symbol relationships in Greek mythology. 
            Should we increase training on compound symbols to boost autonomy?
          </p>
          
          <div className="flex flex-wrap gap-2">
            <Button size="sm" variant="outline" className="gap-2 hover:bg-success/10 hover:text-success hover:border-success">
              Yes, proceed
            </Button>
            <Button size="sm" variant="outline" className="gap-2">
              No, skip
            </Button>
            <Button size="sm" variant="ghost" className="gap-2">
              <HelpCircle className="w-3 h-3" />
              Explain
            </Button>
          </div>
        </div>

        {/* Assistant Insights */}
        <div className="space-y-2 pt-4 border-t border-border/50">
          <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            Recent Insights
          </h4>
          <div className="space-y-2">
            <div className="text-xs p-2 bg-accent/10 rounded border border-accent/20">
              <p className="text-accent font-medium">Pattern Detected</p>
              <p className="text-muted-foreground">Zeus-Lightning correlation at 0.92</p>
            </div>
            <div className="text-xs p-2 bg-success/10 rounded border border-success/20">
              <p className="text-success font-medium">Optimization Opportunity</p>
              <p className="text-muted-foreground">Reduce temperature to 0.6 for better stability</p>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};
