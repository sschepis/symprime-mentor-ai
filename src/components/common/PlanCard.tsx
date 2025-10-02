import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check } from "lucide-react";

export interface PlanData {
  name: string;
  price: string;
  features: string[];
  current?: boolean;
  popular?: boolean;
  cta?: string;
  onClick?: () => void;
}

interface PlanCardProps {
  plans: PlanData[];
  columns?: 2 | 3 | 4;
}

export const PlanCard = ({ plans, columns = 3 }: PlanCardProps) => {
  const gridCols = {
    2: "grid-cols-1 md:grid-cols-2",
    3: "grid-cols-1 md:grid-cols-3",
    4: "grid-cols-1 md:grid-cols-2 lg:grid-cols-4"
  };

  return (
    <div className={`grid ${gridCols[columns]} gap-6`}>
      {plans.map((plan, idx) => (
        <div 
          key={idx} 
          className={`p-6 rounded-lg border-2 ${
            plan.current 
              ? 'border-primary bg-primary/5' 
              : 'border-border bg-muted/20'
          } ${plan.popular ? 'relative' : ''}`}
        >
          {plan.popular && (
            <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gradient-primary text-white">
              Popular
            </Badge>
          )}
          <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
          <div className="mb-4">
            <span className="text-3xl font-bold">{plan.price}</span>
            {plan.price !== "Custom" && <span className="text-muted-foreground">/mo</span>}
          </div>
          <ul className="space-y-2 mb-6">
            {plan.features.map((feature, fidx) => (
              <li key={fidx} className="flex items-center gap-2 text-sm">
                <Check className="w-4 h-4 text-success" />
                {feature}
              </li>
            ))}
          </ul>
          <Button 
            className={plan.current ? "w-full bg-gradient-primary hover:opacity-90" : "w-full"} 
            variant={plan.current ? "default" : "outline"}
            disabled={plan.current}
            onClick={plan.onClick}
          >
            {plan.cta || (plan.current ? "Current Plan" : plan.price === "Custom" ? "Contact Sales" : "Upgrade")}
          </Button>
        </div>
      ))}
    </div>
  );
};
