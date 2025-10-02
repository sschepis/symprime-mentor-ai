import { ReactNode } from "react";
import { Navigation } from "@/components/Navigation";

interface PageLayoutProps {
  children: ReactNode;
  gradientFrom?: string;
  gradientTo?: string;
}

export const PageLayout = ({ 
  children, 
  gradientFrom = "from-primary/5",
  gradientTo = "to-accent/5" 
}: PageLayoutProps) => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className={`absolute inset-0 bg-gradient-to-br ${gradientFrom} via-transparent ${gradientTo} pointer-events-none`} />
      
      <main className="relative container mx-auto px-6 py-8">
        {children}
      </main>
    </div>
  );
};
