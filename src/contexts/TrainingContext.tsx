import { createContext, useContext, useState, ReactNode } from "react";

export interface TrainingSession {
  id: string;
  engineId: string;
  startTime: string;
  endTime?: string;
  status: "running" | "paused" | "completed" | "stopped";
  progress: number;
  examplesProcessed: number;
  autonomyGain: number;
  batchSize: number;
  category: string;
}

interface TrainingContextType {
  currentSession: TrainingSession | null;
  trainingSessions: TrainingSession[];
  startTraining: (engineId: string, config: Partial<TrainingSession>) => void;
  pauseTraining: () => void;
  resumeTraining: () => void;
  stopTraining: () => void;
  updateProgress: (progress: number, examplesProcessed: number) => void;
}

const TrainingContext = createContext<TrainingContextType | undefined>(undefined);

export const TrainingProvider = ({ children }: { children: ReactNode }) => {
  const [currentSession, setCurrentSession] = useState<TrainingSession | null>({
    id: "session-1",
    engineId: "engine-1",
    startTime: new Date().toISOString(),
    status: "running",
    progress: 42,
    examplesProcessed: 420,
    autonomyGain: 3.2,
    batchSize: 10,
    category: "All Categories",
  });

  const [trainingSessions, setTrainingSessions] = useState<TrainingSession[]>([
    {
      id: "session-1",
      engineId: "engine-1",
      startTime: new Date().toISOString(),
      status: "running",
      progress: 42,
      examplesProcessed: 420,
      autonomyGain: 3.2,
      batchSize: 10,
      category: "All Categories",
    },
  ]);

  const startTraining = (engineId: string, config: Partial<TrainingSession>) => {
    const newSession: TrainingSession = {
      id: `session-${Date.now()}`,
      engineId,
      startTime: new Date().toISOString(),
      status: "running",
      progress: 0,
      examplesProcessed: 0,
      autonomyGain: 0,
      batchSize: 10,
      category: "All Categories",
      ...config,
    };
    setCurrentSession(newSession);
    setTrainingSessions((prev) => [...prev, newSession]);
  };

  const pauseTraining = () => {
    if (currentSession) {
      const updated = { ...currentSession, status: "paused" as const };
      setCurrentSession(updated);
      setTrainingSessions((prev) =>
        prev.map((s) => (s.id === currentSession.id ? updated : s))
      );
    }
  };

  const resumeTraining = () => {
    if (currentSession) {
      const updated = { ...currentSession, status: "running" as const };
      setCurrentSession(updated);
      setTrainingSessions((prev) =>
        prev.map((s) => (s.id === currentSession.id ? updated : s))
      );
    }
  };

  const stopTraining = () => {
    if (currentSession) {
      const updated = {
        ...currentSession,
        status: "stopped" as const,
        endTime: new Date().toISOString(),
      };
      setCurrentSession(null);
      setTrainingSessions((prev) =>
        prev.map((s) => (s.id === currentSession.id ? updated : s))
      );
    }
  };

  const updateProgress = (progress: number, examplesProcessed: number) => {
    if (currentSession) {
      const updated = { ...currentSession, progress, examplesProcessed };
      setCurrentSession(updated);
      setTrainingSessions((prev) =>
        prev.map((s) => (s.id === currentSession.id ? updated : s))
      );
    }
  };

  return (
    <TrainingContext.Provider
      value={{
        currentSession,
        trainingSessions,
        startTraining,
        pauseTraining,
        resumeTraining,
        stopTraining,
        updateProgress,
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
