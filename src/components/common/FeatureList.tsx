import { Check } from "lucide-react";

interface FeatureListProps {
  features: string[];
  columns?: 1 | 2;
  checkColor?: string;
}

export const FeatureList = ({ 
  features, 
  columns = 2,
  checkColor = "text-success" 
}: FeatureListProps) => {
  const gridCols = columns === 1 ? "grid-cols-1" : "grid-cols-1 md:grid-cols-2";
  
  return (
    <div className={`grid ${gridCols} gap-3`}>
      {features.map((feature, idx) => (
        <div key={idx} className="flex items-center gap-2">
          <Check className={`w-4 h-4 ${checkColor}`} />
          <span className="text-sm">{feature}</span>
        </div>
      ))}
    </div>
  );
};
