import { LucideIcon } from "lucide-react";
import { Card } from "@/components/ui/card";

export interface ResourceCardData {
  icon: LucideIcon;
  title: string;
  description: string;
  iconColor?: string;
  onClick?: () => void;
}

interface ResourceCardProps {
  resources: ResourceCardData[];
  columns?: 2 | 3 | 4;
}

export const ResourceCard = ({ resources, columns = 3 }: ResourceCardProps) => {
  const gridCols = {
    2: "grid-cols-1 md:grid-cols-2",
    3: "grid-cols-1 md:grid-cols-3",
    4: "grid-cols-1 md:grid-cols-2 lg:grid-cols-4"
  };

  return (
    <div className={`grid ${gridCols[columns]} gap-4`}>
      {resources.map((resource, idx) => {
        const Icon = resource.icon;
        return (
          <Card 
            key={idx}
            className="glass-card p-6 hover:border-primary/50 transition-all cursor-pointer group"
            onClick={resource.onClick}
          >
            <Icon className={`w-8 h-8 mb-3 group-hover:scale-110 transition-transform ${resource.iconColor || 'text-primary'}`} />
            <h3 className="font-semibold mb-2">{resource.title}</h3>
            <p className="text-sm text-muted-foreground">
              {resource.description}
            </p>
          </Card>
        );
      })}
    </div>
  );
};
