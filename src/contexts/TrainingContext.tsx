import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useUser } from "./UserContext";
import { toast } from "@/hooks/use-toast";

export interface TrainingSession {
  id: string;
  engine_id: string;
  name: string;
  status: "pending" | "running" | "completed" | "failed" | "cancelled";
  dataset_size?: number;
  epochs?: number;
  batch_size?: number;
  learning_rate?: number;
  progress: number;
  started_at?: string;
  completed_at?: string;
  error_message?: string;
  created_at: string;
}

interface TrainingContextType {
  currentSession: TrainingSession | null;
  trainingSessions: TrainingSession[];
  isLoading: boolean;
  startTraining: (engineId: string, config: Partial<TrainingSession>) => Promise<void>;
  updateSession: (id: string, updates: Partial<TrainingSession>) => Promise<void>;
  cancelTraining: (id: string) => Promise<void>;
  refreshSessions: () => Promise<void>;
}

const TrainingContext = createContext<TrainingContextType | undefined>(undefined);

export const TrainingProvider = ({ children }: { children: ReactNode }) => {
  const [currentSession, setCurrentSession] = useState<TrainingSession | null>(null);
  const [trainingSessions, setTrainingSessions] = useState<TrainingSession[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { session, isAuthenticated } = useUser();

  const fetchSessions = async () => {
    if (!session?.user?.id) return;

    try {
      const { data, error } = await supabase
        .from("training_sessions")
        .select("*")
        .eq("user_id", session.user.id)
        .order("created_at", { ascending: false });

      if (error) throw error;

      setTrainingSessions(data || []);
      
      // Set current session to the most recent running session
      const runningSession = data?.find((s) => s.status === "running");
      setCurrentSession(runningSession || null);
    } catch (error) {
      console.error("Error fetching training sessions:", error);
      toast({
        title: "Error loading sessions",
        description: "Failed to load training sessions",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchSessions();
    } else {
      setTrainingSessions([]);
      setCurrentSession(null);
      setIsLoading(false);
    }
  }, [isAuthenticated, session?.user?.id]);

  const startTraining = async (
    engineId: string,
    config: Partial<TrainingSession>
  ) => {
    if (!session?.user?.id) return;

    try {
      const { data, error } = await supabase
        .from("training_sessions")
        .insert([
          {
            user_id: session.user.id,
            engine_id: engineId,
            name: config.name || "Training Session",
            status: "running",
            progress: 0,
            started_at: new Date().toISOString(),
            dataset_size: config.dataset_size,
            epochs: config.epochs,
            batch_size: config.batch_size,
            learning_rate: config.learning_rate,
          },
        ])
        .select()
        .single();

      if (error) throw error;

      setTrainingSessions((prev) => [data, ...prev]);
      setCurrentSession(data);

      toast({
        title: "Training started",
        description: "Training session has been started successfully",
      });
    } catch (error) {
      console.error("Error starting training:", error);
      toast({
        title: "Error starting training",
        description: "Failed to start the training session",
        variant: "destructive",
      });
    }
  };

  const updateSession = async (id: string, updates: Partial<TrainingSession>) => {
    try {
      const { error } = await supabase
        .from("training_sessions")
        .update(updates)
        .eq("id", id);

      if (error) throw error;

      setTrainingSessions((prev) =>
        prev.map((s) => (s.id === id ? { ...s, ...updates } : s))
      );

      if (currentSession?.id === id) {
        setCurrentSession({ ...currentSession, ...updates });
      }
    } catch (error) {
      console.error("Error updating session:", error);
      toast({
        title: "Error updating session",
        description: "Failed to update training session",
        variant: "destructive",
      });
    }
  };

  const cancelTraining = async (id: string) => {
    try {
      const { error } = await supabase
        .from("training_sessions")
        .update({
          status: "cancelled",
          completed_at: new Date().toISOString(),
        })
        .eq("id", id);

      if (error) throw error;

      setTrainingSessions((prev) =>
        prev.map((s) =>
          s.id === id
            ? { ...s, status: "cancelled", completed_at: new Date().toISOString() }
            : s
        )
      );

      if (currentSession?.id === id) {
        setCurrentSession(null);
      }

      toast({
        title: "Training cancelled",
        description: "Training session has been cancelled",
      });
    } catch (error) {
      console.error("Error cancelling training:", error);
      toast({
        title: "Error cancelling training",
        description: "Failed to cancel training session",
        variant: "destructive",
      });
    }
  };

  const refreshSessions = async () => {
    setIsLoading(true);
    await fetchSessions();
  };

  return (
    <TrainingContext.Provider
      value={{
        currentSession,
        trainingSessions,
        isLoading,
        startTraining,
        updateSession,
        cancelTraining,
        refreshSessions,
      }}
    >
      {children}
    </TrainingContext.Provider>
  );
};

export const useTraining = () => {
  const context = useContext(TrainingContext);
  if (context === undefined) {
    throw new Error("useTraining must be used within a TrainingProvider");
  }
  return context;
};
