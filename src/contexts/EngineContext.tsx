import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useUser } from "./UserContext";
import { toast } from "@/hooks/use-toast";

export interface Engine {
  id: string;
  name: string;
  description?: string;
  model_type: string;
  status: "active" | "training" | "paused" | "archived";
  accuracy?: number;
  training_time?: number;
  last_trained?: string;
  version: string;
  created_at: string;
}

interface EngineContextType {
  engines: Engine[];
  selectedEngine: Engine | null;
  isLoading: boolean;
  setSelectedEngine: (engine: Engine | null) => void;
  addEngine: (engine: Omit<Engine, "id" | "created_at" | "version">) => Promise<void>;
  updateEngine: (id: string, updates: Partial<Engine>) => Promise<void>;
  deleteEngine: (id: string) => Promise<void>;
  refreshEngines: () => Promise<void>;
}

const EngineContext = createContext<EngineContextType | undefined>(undefined);

export const EngineProvider = ({ children }: { children: ReactNode }) => {
  const [engines, setEngines] = useState<Engine[]>([]);
  const [selectedEngine, setSelectedEngine] = useState<Engine | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { session, isAuthenticated } = useUser();

  const fetchEngines = async () => {
    if (!session?.user?.id) return;

    try {
      const { data, error } = await supabase
        .from("engines")
        .select("*")
        .eq("user_id", session.user.id)
        .order("created_at", { ascending: false });

      if (error) throw error;

      setEngines(data || []);
      if (data && data.length > 0 && !selectedEngine) {
        setSelectedEngine(data[0]);
      }
    } catch (error) {
      console.error("Error fetching engines:", error);
      toast({
        title: "Error loading engines",
        description: "Failed to load your AI engines",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchEngines();
    } else {
      setEngines([]);
      setSelectedEngine(null);
      setIsLoading(false);
    }
  }, [isAuthenticated, session?.user?.id]);

  const addEngine = async (engine: Omit<Engine, "id" | "created_at" | "version">) => {
    if (!session?.user?.id) return;

    try {
      const { data, error } = await supabase
        .from("engines")
        .insert([
          {
            ...engine,
            user_id: session.user.id,
          },
        ])
        .select()
        .single();

      if (error) throw error;

      setEngines((prev) => [data, ...prev]);
      toast({
        title: "Engine created",
        description: `${engine.name} has been created successfully`,
      });
    } catch (error) {
      console.error("Error creating engine:", error);
      toast({
        title: "Error creating engine",
        description: "Failed to create the AI engine",
        variant: "destructive",
      });
    }
  };

  const updateEngine = async (id: string, updates: Partial<Engine>) => {
    try {
      const { error } = await supabase
        .from("engines")
        .update(updates)
        .eq("id", id);

      if (error) throw error;

      setEngines((prev) =>
        prev.map((engine) => (engine.id === id ? { ...engine, ...updates } : engine))
      );

      if (selectedEngine?.id === id) {
        setSelectedEngine({ ...selectedEngine, ...updates });
      }

      toast({
        title: "Engine updated",
        description: "Engine has been updated successfully",
      });
    } catch (error) {
      console.error("Error updating engine:", error);
      toast({
        title: "Error updating engine",
        description: "Failed to update the AI engine",
        variant: "destructive",
      });
    }
  };

  const deleteEngine = async (id: string) => {
    try {
      const { error } = await supabase
        .from("engines")
        .delete()
        .eq("id", id);

      if (error) throw error;

      setEngines((prev) => prev.filter((engine) => engine.id !== id));
      if (selectedEngine?.id === id) {
        setSelectedEngine(engines[0] || null);
      }

      toast({
        title: "Engine deleted",
        description: "Engine has been deleted successfully",
      });
    } catch (error) {
      console.error("Error deleting engine:", error);
      toast({
        title: "Error deleting engine",
        description: "Failed to delete the AI engine",
        variant: "destructive",
      });
    }
  };

  const refreshEngines = async () => {
    setIsLoading(true);
    await fetchEngines();
  };

  return (
    <EngineContext.Provider
      value={{
        engines,
        selectedEngine,
        isLoading,
        setSelectedEngine,
        addEngine,
        updateEngine,
        deleteEngine,
        refreshEngines,
      }}
    >
      {children}
    </EngineContext.Provider>
  );
};

export const useEngines = () => {
  const context = useContext(EngineContext);
  if (context === undefined) {
    throw new Error("useEngines must be used within an EngineProvider");
  }
  return context;
};
