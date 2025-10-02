import { LucideIcon } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
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
  loading?: boolean;
}

export const StatsGrid = ({ 
  stats, 
  columns = 4, 
  centered = false,
  hoverable = true,
  loading = false 
}: StatsGridProps) => {
  const gridCols = {
    2: "grid-cols-1 md:grid-cols-2",
    3: "grid-cols-1 md:grid-cols-3",
    4: "grid-cols-1 md:grid-cols-2 lg:grid-cols-4"
  };

  if (loading) {
    return (
      <div className={`grid ${gridCols[columns]} gap-6`}>
        {[...Array(columns)].map((_, idx) => (
          <Card key={idx} className="glass-card p-6">
            <div className="flex items-start justify-between">
              <div className="space-y-2 flex-1">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-8 w-20" />
                <Skeleton className="h-3 w-32" />
              </div>
              <Skeleton className="w-12 h-12 rounded-lg" />
            </div>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className={`grid ${gridCols[columns]} gap-6`}>
      {stats.map((stat, idx) => {
        const Icon = stat.icon;
        
        return (
          <Card 
            key={idx} 
            className={cn(
              "glass-card p-6 transition-all duration-300 animate-fade-in",
              hoverable && "hover:scale-105 hover:shadow-glow-primary cursor-pointer group hover:-translate-y-1",
              centered && "text-center"
            )}
            style={{ animationDelay: `${idx * 100}ms` }}
          >
            {centered ? (
              <div>
                <p className="text-3xl font-bold text-primary group-hover:scale-110 transition-transform duration-200 inline-block">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </div>
            ) : (
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                  <p className="text-3xl font-bold group-hover:text-primary transition-colors duration-200">{stat.value}</p>
                  {stat.change && (
                    <p className="text-xs text-muted-foreground">{stat.change}</p>
                  )}
                </div>
                {Icon && (
                  <div className={cn(
                    "p-3 rounded-lg bg-gradient-primary transition-all duration-300 group-hover:shadow-lg group-hover:rotate-6",
                    stat.iconColor
                  )}>
                    <Icon className="w-6 h-6 text-white" />
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
