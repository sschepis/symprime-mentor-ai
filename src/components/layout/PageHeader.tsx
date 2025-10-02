import { ReactNode } from "react";

interface PageHeaderProps {
  title: string;
  description?: string;
  actions?: ReactNode;
  centered?: boolean;
  gradient?: boolean;
}

export const PageHeader = ({ 
  title, 
  description, 
  actions, 
  centered = false,
  gradient = true 
}: PageHeaderProps) => {
  return (
    <header className={`mb-8 ${centered ? 'text-center' : 'flex items-start justify-between'}`}>
      <div className={centered ? 'max-w-2xl mx-auto' : ''}>
        <h1 className={`text-4xl font-bold ${gradient ? 'bg-gradient-primary bg-clip-text text-transparent' : ''}`}>
          {title}
        </h1>
        {description && (
          <p className="text-muted-foreground mt-2">
            {description}
          </p>
        )}
      </div>
      {actions && !centered && (
        <div>{actions}</div>
      )}
    </header>
  );
};
