import { LucideIcon } from "lucide-react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export interface StatItem {
  icon?: LucideIcon;
  label: string;
  value: string | number;
  change?: string;
  iconColor?: string;
}

interface StatsGridProps {
  stats: StatItem[];
  columns?: 2 | 3 | 4;
  centered?: boolean;
  hoverable?: boolean;
}

export const StatsGrid = ({ 
  stats, 
  columns = 4, 
  centered = false,
  hoverable = true 
}: StatsGridProps) => {
  const gridCols = {
    2: "grid-cols-1 md:grid-cols-2",
    3: "grid-cols-1 md:grid-cols-3",
    4: "grid-cols-1 md:grid-cols-2 lg:grid-cols-4"
  };

  return (
    <div className={`grid ${gridCols[columns]} gap-6`}>
      {stats.map((stat, idx) => {
        const Icon = stat.icon;
        
        return (
          <Card 
            key={idx} 
            className={cn(
              "glass-card p-6 transition-transform duration-300",
              hoverable && "hover:scale-105 cursor-pointer group",
              centered && "text-center"
            )}
          >
            {centered ? (
              <div>
                <p className="text-3xl font-bold text-primary">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </div>
            ) : (
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                  <p className="text-3xl font-bold">{stat.value}</p>
                  {stat.change && (
                    <p className="text-xs text-muted-foreground">{stat.change}</p>
                  )}
                </div>
                {Icon && (
                  <div className={cn(
                    "p-3 rounded-lg bg-card transition-transform",
                    hoverable && "group-hover:scale-110",
                    stat.iconColor
                  )}>
                    <Icon className="w-6 h-6" />
                  </div>
                )}
              </div>
            )}
          </Card>
        );
      })}
    </div>
  );
};
