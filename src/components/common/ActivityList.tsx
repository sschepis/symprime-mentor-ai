import { LucideIcon } from "lucide-react";
import { Card } from "@/components/ui/card";

export interface ActivityItem {
  icon: LucideIcon;
  title: string;
  description: string;
  time: string;
  color: string;
}

interface ActivityListProps {
  title?: string;
  activities: ActivityItem[];
}

export const ActivityList = ({ title, activities }: ActivityListProps) => {
  return (
    <Card className="glass-card p-6">
      {title && <h3 className="text-xl font-semibold mb-6">{title}</h3>}
      <div className="space-y-4">
        {activities.map((activity, index) => {
          const Icon = activity.icon;
          return (
            <div
              key={index}
              className="flex items-start gap-4 p-3 rounded-lg hover:bg-muted/30 transition-colors cursor-pointer"
            >
              <div className={`p-2 rounded-lg bg-card ${activity.color}`}>
                <Icon className="w-4 h-4" />
              </div>
              <div className="flex-1 space-y-1">
                <p className="font-medium">{activity.title}</p>
                <p className="text-sm text-muted-foreground">
                  {activity.description}
                </p>
              </div>
              <span className="text-xs text-muted-foreground whitespace-nowrap">
                {activity.time}
              </span>
            </div>
          );
        })}
      </div>
    </Card>
  );
};
