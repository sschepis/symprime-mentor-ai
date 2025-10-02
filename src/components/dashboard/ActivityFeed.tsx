import { Card } from "@/components/ui/card";
import { BarChart3, Zap, Target, TrendingUp } from "lucide-react";

const activities = [
  {
    icon: Zap,
    title: "Training session completed",
    description: "Greek Mythology Engine",
    time: "2 minutes ago",
    color: "text-accent",
  },
  {
    icon: TrendingUp,
    title: "Autonomy increased to 85%",
    description: "Greek Mythology Engine",
    time: "15 minutes ago",
    color: "text-success",
  },
  {
    icon: Target,
    title: "100 queries processed",
    description: "Historical Analysis Engine",
    time: "1 hour ago",
    color: "text-secondary",
  },
  {
    icon: BarChart3,
    title: "New patterns detected",
    description: "Scientific Research Engine",
    time: "3 hours ago",
    color: "text-primary",
  },
  {
    icon: Zap,
    title: "Training session started",
    description: "Cultural Context Engine",
    time: "5 hours ago",
    color: "text-accent",
  },
];

export const ActivityFeed = () => {
  return (
    <Card className="glass-card p-6">
      <h3 className="text-xl font-semibold mb-6">Recent Activity</h3>
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
