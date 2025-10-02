import { Brain, LayoutDashboard, Zap, MessageSquare, Settings } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { UserProfileDropdown } from "./UserProfileDropdown";
import { cn } from "@/lib/utils";

export const Navigation = () => {
  const location = useLocation();
  
  const links = [
    { to: "/", label: "Dashboard", icon: LayoutDashboard },
    { to: "/training", label: "Training", icon: Zap },
    { to: "/inference", label: "Inference", icon: MessageSquare },
    { to: "/settings", label: "Settings", icon: Settings },
  ];

  return (
    <nav className="sticky top-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl animate-fade-in">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="p-2 rounded-lg bg-gradient-primary transition-all duration-300 group-hover:shadow-lg group-hover:scale-110">
              <Brain className="w-6 h-6 text-white transition-transform duration-300 group-hover:rotate-12" />
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent transition-all duration-300 group-hover:scale-105">
                SymPrime AI
              </h1>
              <p className="text-xs text-muted-foreground">Symbolic Intelligence</p>
            </div>
          </Link>

          {/* Navigation Links */}
          <div className="flex items-center gap-2">
            {links.map((link) => {
              const Icon = link.icon;
              const isActive = location.pathname === link.to;
              
              return (
                <Link key={link.to} to={link.to}>
                  <Button
                    variant="ghost"
                    className={cn(
                      "gap-2 transition-all duration-200 hover:scale-105",
                      isActive && "bg-primary/10 text-primary font-medium"
                    )}
                  >
                    <Icon className={cn(
                      "w-4 h-4 transition-transform duration-200",
                      isActive && "scale-110"
                    )} />
                    {link.label}
                  </Button>
                </Link>
              );
            })}

            {/* User Profile */}
            <div className="ml-4">
              <UserProfileDropdown />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};
