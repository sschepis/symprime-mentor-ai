import { createContext, useContext, useState, ReactNode } from "react";

export interface Engine {
  id: string;
  name: string;
  autonomy: number;
  trainingSessions: number;
  lastUsed: string;
  icon: string;
  status: "active" | "idle" | "training";
  category: string;
  createdAt: string;
}

interface EngineContextType {
  engines: Engine[];
  selectedEngine: Engine | null;
  setSelectedEngine: (engine: Engine | null) => void;
  addEngine: (engine: Engine) => void;
  updateEngine: (id: string, updates: Partial<Engine>) => void;
  deleteEngine: (id: string) => void;
}

const EngineContext = createContext<EngineContextType | undefined>(undefined);

export const EngineProvider = ({ children }: { children: ReactNode }) => {
  const [engines, setEngines] = useState<Engine[]>([
    {
      id: "engine-1",
      name: "Greek Mythology Engine",
      autonomy: 85,
      trainingSessions: 120,
      lastUsed: "2 hours ago",
      icon: "🧠",
      status: "active",
      category: "Mythology",
      createdAt: "2024-01-15",
    },
    {
      id: "engine-2",
      name: "Historical Analysis Engine",
      autonomy: 72,
      trainingSessions: 80,
      lastUsed: "1 day ago",
      icon: "📚",
      status: "idle",
      category: "History",
      createdAt: "2024-02-10",
    },
    {
      id: "engine-3",
      name: "Scientific Research Engine",
      autonomy: 68,
      trainingSessions: 65,
      lastUsed: "3 days ago",
      icon: "🔬",
      status: "idle",
      category: "Science",
      createdAt: "2024-03-01",
    },
    {
      id: "engine-4",
      name: "Cultural Context Engine",
      autonomy: 91,
      trainingSessions: 200,
      lastUsed: "30 minutes ago",
      icon: "🌍",
      status: "training",
      category: "Culture",
      createdAt: "2024-01-20",
    },
  ]);

  const [selectedEngine, setSelectedEngine] = useState<Engine | null>(engines[0]);

  const addEngine = (engine: Engine) => {
    setEngines((prev) => [...prev, engine]);
  };

  const updateEngine = (id: string, updates: Partial<Engine>) => {
    setEngines((prev) =>
      prev.map((engine) => (engine.id === id ? { ...engine, ...updates } : engine))
    );
  };

  const deleteEngine = (id: string) => {
    setEngines((prev) => prev.filter((engine) => engine.id !== id));
    if (selectedEngine?.id === id) {
      setSelectedEngine(null);
    }
  };

  return (
    <EngineContext.Provider
      value={{
        engines,
        selectedEngine,
        setSelectedEngine,
        addEngine,
        updateEngine,
        deleteEngine,
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
