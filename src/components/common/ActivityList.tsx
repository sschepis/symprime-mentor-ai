import { LucideIcon } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

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
  loading?: boolean;
}

export const ActivityList = ({ title, activities, loading = false }: ActivityListProps) => {
  return (
    <Card className="glass-card p-6 animate-fade-in">
      {title && <h3 className="text-xl font-semibold mb-6">{title}</h3>}
      <div className="space-y-4">
        {loading ? (
          [...Array(5)].map((_, index) => (
            <div key={index} className="flex items-start gap-4 p-3">
              <Skeleton className="w-8 h-8 rounded-lg" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-3 w-1/2" />
              </div>
              <Skeleton className="h-3 w-16" />
            </div>
          ))
        ) : (
          activities.map((activity, index) => {
            const Icon = activity.icon;
            return (
              <div
                key={index}
                className="flex items-start gap-4 p-3 rounded-lg hover:bg-muted/30 transition-all duration-200 cursor-pointer group animate-fade-in hover:scale-[1.02]"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className={`p-2 rounded-lg bg-gradient-primary transition-transform duration-200 group-hover:scale-110 group-hover:rotate-6 ${activity.color}`}>
                  <Icon className="w-4 h-4 text-white" />
                </div>
                <div className="flex-1 space-y-1">
                  <p className="font-medium group-hover:text-primary transition-colors duration-200">{activity.title}</p>
                  <p className="text-sm text-muted-foreground">
                    {activity.description}
                  </p>
                </div>
                <span className="text-xs text-muted-foreground whitespace-nowrap">
                  {activity.time}
                </span>
              </div>
            );
          })
        )}
      </div>
    </Card>
  );
};
