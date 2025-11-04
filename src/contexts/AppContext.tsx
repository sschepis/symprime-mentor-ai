import { createContext, useContext, useState, ReactNode, useEffect } from "react";

interface AppSettings {
  theme: "light" | "dark" | "system";
  notifications: boolean;
  autoSave: boolean;
  language: string;
}

interface AppContextType {
  settings: AppSettings;
  updateSettings: (updates: Partial<AppSettings>) => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const defaultSettings: AppSettings = {
  theme: "system",
  notifications: true,
  autoSave: true,
  language: "en",
};

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [settings, setSettings] = useState<AppSettings>(defaultSettings);
  const [isLoading, setIsLoading] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  // Load settings from localStorage after mount
  useEffect(() => {
    const saved = localStorage.getItem("app-settings");
    if (saved) {
      try {
        setSettings(JSON.parse(saved));
      } catch (error) {
        console.error("Failed to parse saved settings:", error);
      }
    }
    setIsInitialized(true);
  }, []);

  // Save settings to localStorage when they change (skip first render)
  useEffect(() => {
    if (isInitialized) {
      localStorage.setItem("app-settings", JSON.stringify(settings));
    }
  }, [settings, isInitialized]);

  const updateSettings = (updates: Partial<AppSettings>) => {
    setSettings((prev) => ({ ...prev, ...updates }));
  };

  return (
    <AppContext.Provider
      value={{
        settings,
        updateSettings,
        isLoading,
        setIsLoading,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
};
