import { useState } from "react";
import { Navigation } from "@/components/Navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Pause, Square, Settings as SettingsIcon } from "lucide-react";
import { AIAssistantPanel } from "@/components/training/AIAssistantPanel";
import { TrainingConfig } from "@/components/training/TrainingConfig";
import { TrainingFeed } from "@/components/training/TrainingFeed";
import { TrainingSettingsDialog } from "@/components/dialogs/TrainingSettingsDialog";
import { ConfirmDialog } from "@/components/dialogs/ConfirmDialog";
import { useTraining, useEngines } from "@/contexts";

const Training = () => {
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [pauseDialogOpen, setPauseDialogOpen] = useState(false);
  const [stopDialogOpen, setStopDialogOpen] = useState(false);
  
  const { currentSession, trainingSessions, updateSession, cancelTraining } = useTraining();
  const { selectedEngine } = useEngines();

  const accuracy = selectedEngine?.accuracy || 0;
  const successRate = currentSession ? Math.round((currentSession.progress / 100) * 95 + 5) : 82;
  const patternRecognition = currentSession ? Math.floor(currentSession.progress * 1.5) : 156;
  const entropy = currentSession ? (3.2 - (currentSession.progress / 100) * 0.5).toFixed(2) : "3.2";
  const temperature = currentSession ? (0.65 + (currentSession.progress / 100) * 0.1).toFixed(2) : "0.65";

  const isTraining = currentSession?.status === "running";
  const isPaused = currentSession?.status === "pending";

  const completedSessions = trainingSessions.filter(s => s.status === "completed").length;
  const totalExamplesProcessed = trainingSessions.reduce((sum, s) => sum + (s.dataset_size || 0), 0);

  const handlePause = async () => {
    if (currentSession) {
      const newStatus = currentSession.status === "running" ? "pending" : "running";
      await updateSession(currentSession.id, { status: newStatus as any });
    }
    setPauseDialogOpen(false);
  };

  const handleStop = async () => {
    if (currentSession) {
      await cancelTraining(currentSession.id);
    }
    setStopDialogOpen(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-primary/5 pointer-events-none" />
      
      <main className="relative container mx-auto px-6 py-8">
        {/* Header */}
        <header className="flex items-center justify-between mb-8 animate-fade-in">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-ai bg-clip-text text-transparent hover:scale-105 transition-transform duration-300 inline-block">
              Training Studio
            </h1>
            <p className="text-muted-foreground mt-2 animate-fade-in" style={{ animationDelay: '100ms' }}>
              {selectedEngine?.name || "No Engine Selected"} • {currentSession ? `Session ${currentSession.progress}%` : "No active session"}
            </p>
          </div>
        </header>

        {/* Main Training Interface */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column - AI Assistant & Config */}
          <div className="lg:col-span-3 space-y-6">
            <AIAssistantPanel />
            <TrainingConfig />
          </div>

          {/* Center Column - Progress & Feed */}
          <div className="lg:col-span-6 space-y-6">
            {/* Training Progress */}
            <Card className="glass-card p-6 space-y-6 animate-fade-in hover:shadow-glow-primary transition-all duration-300" style={{ animationDelay: '300ms' }}>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-semibold">Training Progress</h3>
                  <span className="text-sm text-muted-foreground">
                    {currentSession ? `Processing: ${currentSession.progress}%` : "No active session"}
                  </span>
                </div>
                <Progress value={currentSession?.progress || 0} className="h-3" />
              </div>

              {/* Current Accuracy */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-medium text-muted-foreground">
                    Current Accuracy
                  </h4>
                  <span className="text-2xl font-bold text-primary">{accuracy.toFixed(1)}%</span>
                </div>
                <div className="relative h-8 bg-muted rounded-full overflow-hidden">
                  <div 
                    className="absolute inset-y-0 left-0 bg-gradient-primary rounded-full transition-all duration-500"
                    style={{ width: `${accuracy}%` }}
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-sm font-semibold text-foreground mix-blend-difference">
                      {accuracy.toFixed(1)}%
                    </span>
                  </div>
                </div>
              </div>

              {/* Metrics Grid */}
              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border/50">
                <div>
                  <p className="text-sm text-muted-foreground">Success Rate</p>
                  <p className="text-xl font-semibold text-success">{successRate}%</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Patterns</p>
                  <p className="text-xl font-semibold text-secondary">{patternRecognition}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Entropy</p>
                  <p className="text-xl font-semibold text-accent">{entropy}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Temperature</p>
                  <p className="text-xl font-semibold text-warning">{temperature}</p>
                </div>
              </div>

              {/* Control Buttons */}
              <div className="flex gap-3 pt-4">
                <Button 
                  variant="outline" 
                  className="flex-1 gap-2 hover:scale-105 transition-all duration-200 hover:bg-accent/10"
                  onClick={() => setPauseDialogOpen(true)}
                  disabled={!currentSession || currentSession.status === "cancelled"}
                >
                  <Pause className="w-4 h-4" />
                  {isPaused ? "Resume" : "Pause"}
                </Button>
                <Button 
                  variant="destructive" 
                  className="flex-1 gap-2 hover:scale-105 transition-all duration-200 hover:shadow-lg"
                  onClick={() => setStopDialogOpen(true)}
                  disabled={!currentSession || currentSession.status === "cancelled"}
                >
                  <Square className="w-4 h-4" />
                  Stop
                </Button>
                <Button 
                  variant="outline" 
                  size="icon"
                  onClick={() => setSettingsOpen(true)}
                  className="hover:scale-110 transition-all duration-200 hover:bg-primary/10"
                >
                  <SettingsIcon className="w-4 h-4" />
                </Button>
              </div>
            </Card>

            {/* Training History */}
            <Card className="glass-card p-6 animate-fade-in" style={{ animationDelay: '400ms' }}>
              <h3 className="text-lg font-semibold mb-4">Training History</h3>
              <div className="space-y-3">
                {trainingSessions.length === 0 ? (
                  <p className="text-sm text-muted-foreground text-center py-8">
                    No training sessions yet. Start a session to see history.
                  </p>
                ) : (
                  trainingSessions.slice(0, 5).map((session) => (
                    <div
                      key={session.id}
                      className="flex items-center justify-between p-3 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex-1">
                        <p className="font-medium text-sm">{session.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {new Date(session.created_at).toLocaleDateString()} • {session.dataset_size || 0} examples
                        </p>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="text-right">
                          <p className="text-sm font-semibold">{session.progress}%</p>
                          <p className={`text-xs ${
                            session.status === "completed" ? "text-success" :
                            session.status === "running" ? "text-primary" :
                            session.status === "cancelled" ? "text-destructive" :
                            "text-muted-foreground"
                          }`}>
                            {session.status}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </Card>

            {/* Training Examples Feed */}
            <TrainingFeed />
          </div>

          {/* Right Column - Stats & Visualizations */}
          <div className="lg:col-span-3 space-y-6">
            <Card className="glass-card p-6 animate-fade-in hover:shadow-glow-accent transition-all duration-300" style={{ animationDelay: '500ms' }}>
              <h3 className="text-lg font-semibold mb-4">Session Stats</h3>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground">Total Sessions</p>
                  <p className="text-2xl font-bold text-primary">{trainingSessions.length}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Completed</p>
                  <p className="text-2xl font-bold text-success">{completedSessions}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Examples Processed</p>
                  <p className="text-2xl font-bold text-accent">{totalExamplesProcessed}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Current Engine</p>
                  <p className="text-sm font-medium truncate">{selectedEngine?.name || "None"}</p>
                </div>
              </div>
            </Card>

            <Card className="glass-card p-6 animate-fade-in hover:shadow-glow-accent transition-all duration-300" style={{ animationDelay: '600ms' }}>
              <h3 className="text-lg font-semibold mb-4">Training Status</h3>
              <div className="space-y-3">
                {isTraining && (
                  <div className="flex items-center gap-2 p-3 bg-primary/10 rounded-lg border border-primary/20">
                    <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                    <span className="text-sm font-medium">Training in progress</span>
                  </div>
                )}
                {isPaused && (
                  <div className="flex items-center gap-2 p-3 bg-warning/10 rounded-lg border border-warning/20">
                    <div className="w-2 h-2 rounded-full bg-warning" />
                    <span className="text-sm font-medium">Training paused</span>
                  </div>
                )}
                {!currentSession && (
                  <div className="flex items-center gap-2 p-3 bg-muted/30 rounded-lg">
                    <div className="w-2 h-2 rounded-full bg-muted-foreground" />
                    <span className="text-sm text-muted-foreground">No active session</span>
                  </div>
                )}
              </div>
            </Card>

            <Card className="glass-card p-6 animate-fade-in hover:shadow-glow-accent transition-all duration-300" style={{ animationDelay: '700ms' }}>
              <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
              <div className="space-y-2">
                <Button variant="outline" className="w-full justify-start text-sm" size="sm">
                  View All Sessions
                </Button>
                <Button variant="outline" className="w-full justify-start text-sm" size="sm">
                  Export Training Data
                </Button>
                <Button variant="outline" className="w-full justify-start text-sm" size="sm">
                  Training Analytics
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </main>

      {/* Dialogs */}
      <TrainingSettingsDialog open={settingsOpen} onOpenChange={setSettingsOpen} />
      <ConfirmDialog
        open={pauseDialogOpen}
        onOpenChange={setPauseDialogOpen}
        title="Pause Training"
        description="Are you sure you want to pause the training session? You can resume it later."
        onConfirm={handlePause}
        confirmText="Pause"
      />
      <ConfirmDialog
        open={stopDialogOpen}
        onOpenChange={setStopDialogOpen}
        title="Stop Training"
        description="Are you sure you want to stop the training session? This will end the current session and save progress."
        onConfirm={handleStop}
        confirmText="Stop Training"
        variant="destructive"
      />
    </div>
  );
};

export default Training;
