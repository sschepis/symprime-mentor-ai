import { Card } from "@/components/ui/card";
import { Zap, Crown, Church } from "lucide-react";

const examples = [
  {
    text: "Zeus hurled lightning from Olympus",
    symbols: [
      { icon: Zap, label: "Lightning", prime: 17, color: "text-accent" },
      { icon: Church, label: "Temple", prime: 23, color: "text-secondary" },
      { icon: Crown, label: "Crown", prime: 11, color: "text-warning" },
    ],
    relationships: [
      { pair: "⚡↔️👑", strength: 0.85 },
      { pair: "⚡↔️🏛️", strength: 0.72 },
    ],
  },
];

export const TrainingFeed = () => {
  return (
    <Card className="glass-card p-6">
      <h3 className="text-lg font-semibold mb-4">Training Examples Feed</h3>
      
      <div className="space-y-6">
        {examples.map((example, idx) => (
          <div key={idx} className="space-y-4">
            {/* Processing Text */}
            <div className="bg-muted/30 rounded-lg p-4">
              <p className="text-sm text-muted-foreground mb-2">Processing:</p>
              <p className="font-medium">{example.text}</p>
            </div>

            {/* Detected Symbols */}
            <div>
              <p className="text-sm text-muted-foreground mb-3">Symbols detected:</p>
              <div className="space-y-2">
                {example.symbols.map((symbol, idx) => {
                  const Icon = symbol.icon;
                  return (
                    <div key={idx} className="flex items-center gap-3 p-2 bg-card rounded-lg">
                      <Icon className={`w-5 h-5 ${symbol.color}`} />
                      <span className="flex-1">{symbol.label}</span>
                      <span className="text-sm text-muted-foreground">
                        Prime: <span className="font-semibold text-primary">{symbol.prime}</span>
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Relationships */}
            <div>
              <p className="text-sm text-muted-foreground mb-3">Relationships learned:</p>
              <div className="space-y-2">
                {example.relationships.map((rel, idx) => (
                  <div key={idx} className="flex items-center justify-between p-2 bg-success/10 rounded-lg border border-success/20">
                    <span className="font-mono">{rel.pair}</span>
                    <span className="text-sm">
                      Strength: <span className="font-semibold text-success">{rel.strength}</span>
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};
