# State Management Documentation

## Overview

This application uses React Context API for global state management, organized into four main contexts:

1. **UserContext** - User profile and authentication
2. **EngineContext** - AI engines management
3. **TrainingContext** - Training sessions state
4. **AppContext** - Application-wide settings

All contexts are combined in a single `AppProviders` wrapper for easy setup.

## Setup

All providers are wrapped in `src/App.tsx`:

```tsx
import { AppProviders } from "./contexts";

<AppProviders>
  {/* Your app components */}
</AppProviders>
```

## UserContext

### Purpose
Manages user authentication and profile information.

### State
```typescript
interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: string;
  joinedDate: string;
  subscription: "free" | "pro" | "enterprise";
}
```

### Usage
```tsx
import { useUser } from "@/contexts";

const Component = () => {
  const { user, setUser, isAuthenticated, logout } = useUser();
  
  return <div>{user?.name}</div>;
};
```

### Methods
- `setUser(user)` - Update user profile
- `logout()` - Clear user session
- `isAuthenticated` - Boolean check for login status

## EngineContext

### Purpose
Manages AI engines, their state, and the currently selected engine.

### State
```typescript
interface Engine {
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
```

### Usage
```tsx
import { useEngines } from "@/contexts";

const Component = () => {
  const { 
    engines, 
    selectedEngine, 
    setSelectedEngine,
    addEngine,
    updateEngine,
    deleteEngine 
  } = useEngines();
  
  return (
    <div>
      {engines.map(engine => (
        <div key={engine.id}>{engine.name}</div>
      ))}
    </div>
  );
};
```

### Methods
- `setSelectedEngine(engine)` - Select an engine
- `addEngine(engine)` - Add new engine
- `updateEngine(id, updates)` - Update engine properties
- `deleteEngine(id)` - Remove engine

## TrainingContext

### Purpose
Manages training sessions, including current session state and history.

### State
```typescript
interface TrainingSession {
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
```

### Usage
```tsx
import { useTraining } from "@/contexts";

const Component = () => {
  const { 
    currentSession,
    trainingSessions,
    startTraining,
    pauseTraining,
    resumeTraining,
    stopTraining,
    updateProgress
  } = useTraining();
  
  return (
    <div>
      {currentSession && (
        <div>Progress: {currentSession.progress}%</div>
      )}
    </div>
  );
};
```

### Methods
- `startTraining(engineId, config)` - Start new training session
- `pauseTraining()` - Pause current session
- `resumeTraining()` - Resume paused session
- `stopTraining()` - End current session
- `updateProgress(progress, examples)` - Update session metrics

## AppContext

### Purpose
Manages application-wide settings and UI state.

### State
```typescript
interface AppSettings {
  theme: "light" | "dark" | "system";
  notifications: boolean;
  autoSave: boolean;
  language: string;
}
```

### Usage
```tsx
import { useApp } from "@/contexts";

const Component = () => {
  const { settings, updateSettings, isLoading, setIsLoading } = useApp();
  
  const toggleNotifications = () => {
    updateSettings({ notifications: !settings.notifications });
  };
  
  return <div>Theme: {settings.theme}</div>;
};
```

### Methods
- `updateSettings(updates)` - Update app settings (persists to localStorage)
- `setIsLoading(boolean)` - Control global loading state

### Persistence
Settings are automatically saved to `localStorage` and restored on app load.

## Best Practices

### 1. Use Contexts Sparingly
Only use contexts for truly global state. Local component state with `useState` is fine for component-specific data.

### 2. Keep Contexts Focused
Each context has a single responsibility:
- User → Authentication
- Engines → Engine management
- Training → Session state
- App → Global settings

### 3. Type Safety
All contexts are fully typed with TypeScript interfaces. Always use the exported types:

```tsx
import { useEngines, type Engine } from "@/contexts";
```

### 4. Avoid Deep Nesting
All contexts are flat - no nested contexts within each other. This makes the state predictable and easy to debug.

### 5. Context Performance
Contexts re-render all consumers when state changes. For frequently updating values, consider:
- Splitting into smaller contexts
- Using React Query for server state
- Memoizing expensive computations

## Example: Full Integration

```tsx
import { useUser, useEngines, useTraining } from "@/contexts";

const Dashboard = () => {
  const { user } = useUser();
  const { engines, selectedEngine } = useEngines();
  const { currentSession, trainingSessions } = useTraining();
  
  const activeTraining = trainingSessions.filter(s => s.status === "running");
  
  return (
    <div>
      <h1>Welcome, {user?.name}</h1>
      <p>Engines: {engines.length}</p>
      <p>Active Sessions: {activeTraining.length}</p>
      
      {currentSession && (
        <div>
          Training: {selectedEngine?.name}
          Progress: {currentSession.progress}%
        </div>
      )}
    </div>
  );
};
```

## Migration from Local State

If you have components using local state that should be global:

1. Identify the state that needs to be shared
2. Choose the appropriate context
3. Move state to context provider
4. Replace `useState` with context hook
5. Remove local state declarations

Example:

```tsx
// Before (local state)
const [engines, setEngines] = useState([]);

// After (global state)
const { engines } = useEngines();
```

## Future Enhancements

Consider these additions as the app grows:

1. **React Query Integration** - For server-side state and caching
2. **Optimistic Updates** - Update UI before server confirms
3. **Undo/Redo** - Add command pattern for state changes
4. **State Persistence** - Save more state to localStorage/IndexedDB
5. **WebSocket Integration** - Real-time updates for training sessions
