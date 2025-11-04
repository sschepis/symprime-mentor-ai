import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AppProviders } from "./contexts";
import { useUser } from "@/contexts/UserContext";
import { Navigation } from "@/components/Navigation";
import Index from "./pages/Index";
import Training from "./pages/Training";
import Inference from "./pages/Inference";
import Settings from "./pages/Settings";
import Profile from "./pages/Profile";
import Billing from "./pages/Billing";
import HelpSupport from "./pages/HelpSupport";
import Auth from "./pages/Auth";
import NotFound from "./pages/NotFound";
import { Loader2 } from "lucide-react";

const queryClient = new QueryClient();

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, isLoading } = useUser();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/auth" replace />;
  }

  return <>{children}</>;
};

const AppRoutes = () => (
  <Routes>
    <Route path="/auth" element={<Auth />} />
    <Route
      path="/"
      element={
        <ProtectedRoute>
          <div className="min-h-screen bg-background">
            <Navigation />
            <Index />
          </div>
        </ProtectedRoute>
      }
    />
    <Route
      path="/training"
      element={
        <ProtectedRoute>
          <div className="min-h-screen bg-background">
            <Navigation />
            <Training />
          </div>
        </ProtectedRoute>
      }
    />
    <Route
      path="/inference"
      element={
        <ProtectedRoute>
          <div className="min-h-screen bg-background">
            <Navigation />
            <Inference />
          </div>
        </ProtectedRoute>
      }
    />
    <Route
      path="/settings"
      element={
        <ProtectedRoute>
          <div className="min-h-screen bg-background">
            <Navigation />
            <Settings />
          </div>
        </ProtectedRoute>
      }
    />
    <Route
      path="/profile"
      element={
        <ProtectedRoute>
          <div className="min-h-screen bg-background">
            <Navigation />
            <Profile />
          </div>
        </ProtectedRoute>
      }
    />
    <Route
      path="/billing"
      element={
        <ProtectedRoute>
          <div className="min-h-screen bg-background">
            <Navigation />
            <Billing />
          </div>
        </ProtectedRoute>
      }
    />
    <Route
      path="/help-support"
      element={
        <ProtectedRoute>
          <div className="min-h-screen bg-background">
            <Navigation />
            <HelpSupport />
          </div>
        </ProtectedRoute>
      }
    />
    <Route path="*" element={<NotFound />} />
  </Routes>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <AppProviders>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <AppRoutes />
        </TooltipProvider>
      </AppProviders>
    </BrowserRouter>
  </QueryClientProvider>
);

export default App;
