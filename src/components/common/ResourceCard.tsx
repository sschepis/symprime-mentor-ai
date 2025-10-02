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
            className="glass-card p-6 hover:border-primary/50 hover:shadow-glow-primary transition-all duration-300 cursor-pointer group hover:scale-105 hover:-translate-y-1 animate-fade-in"
            onClick={resource.onClick}
            style={{ animationDelay: `${idx * 100}ms` }}
          >
            <Icon className={`w-8 h-8 mb-3 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300 ${resource.iconColor || 'text-primary'}`} />
            <h3 className="font-semibold mb-2 group-hover:text-primary transition-colors duration-200">{resource.title}</h3>
            <p className="text-sm text-muted-foreground">
              {resource.description}
            </p>
          </Card>
        );
      })}
    </div>
  );
};
