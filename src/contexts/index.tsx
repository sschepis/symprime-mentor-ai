import { ReactNode } from "react";
import { UserProvider } from "./UserContext";
import { EngineProvider } from "./EngineContext";
import { TrainingProvider } from "./TrainingContext";
import { ConversationProvider } from "./ConversationContext";
import { AppProvider } from "./AppContext";

export const AppProviders = ({ children }: { children: ReactNode }) => {
  return (
    <AppProvider>
      <UserProvider>
        <EngineProvider>
          <TrainingProvider>
            <ConversationProvider>
              {children}
            </ConversationProvider>
          </TrainingProvider>
        </EngineProvider>
      </UserProvider>
    </AppProvider>
  );
};

export { useUser } from "./UserContext";
export { useEngines } from "./EngineContext";
export { useTraining } from "./TrainingContext";
export { useConversation } from "./ConversationContext";
export { useApp } from "./AppContext";
export type { Engine } from "./EngineContext";
export type { TrainingSession } from "./TrainingContext";
export type { Conversation, Message } from "./ConversationContext";
