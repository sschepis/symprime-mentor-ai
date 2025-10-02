import { ReactNode } from "react";
import { UserProvider } from "./UserContext";
import { EngineProvider } from "./EngineContext";
import { TrainingProvider } from "./TrainingContext";
import { AppProvider } from "./AppContext";

export const AppProviders = ({ children }: { children: ReactNode }) => {
  return (
    <AppProvider>
      <UserProvider>
        <EngineProvider>
          <TrainingProvider>
            {children}
          </TrainingProvider>
        </EngineProvider>
      </UserProvider>
    </AppProvider>
  );
};

export { useUser } from "./UserContext";
export { useEngines } from "./EngineContext";
export { useTraining } from "./TrainingContext";
export { useApp } from "./AppContext";
export type { Engine } from "./EngineContext";
export type { TrainingSession } from "./TrainingContext";
