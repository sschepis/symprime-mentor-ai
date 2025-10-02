import { LucideIcon } from "lucide-react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface StatCardProps {
  icon: LucideIcon;
  label: string;
  value: string;
  change: string;
  iconColor?: string;
}

export const StatCard = ({ icon: Icon, label, value, change, iconColor }: StatCardProps) => {
  return (
    <Card className="glass-card p-6 hover:scale-105 transition-transform duration-300 cursor-pointer group">
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">{label}</p>
          <p className="text-3xl font-bold">{value}</p>
          <p className="text-xs text-muted-foreground">{change}</p>
        </div>
        <div className={cn(
          "p-3 rounded-lg bg-card group-hover:scale-110 transition-transform",
          iconColor
        )}>
          <Icon className="w-6 h-6" />
        </div>
      </div>
    </Card>
  );
};
