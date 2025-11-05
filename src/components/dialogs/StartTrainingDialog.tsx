import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Zap, Loader2 } from "lucide-react";
import { useTraining, useEngines, Engine } from "@/contexts";
import { toast } from "sonner";

interface StartTrainingDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const StartTrainingDialog = ({ open, onOpenChange }: StartTrainingDialogProps) => {
  const [name, setName] = useState("");
  const [selectedEngineId, setSelectedEngineId] = useState<string>("");
  const [batchSize, setBatchSize] = useState([32]);
  const [epochs, setEpochs] = useState([10]);
  const [learningRate, setLearningRate] = useState([0.001]);
  const [isStarting, setIsStarting] = useState(false);
  
  const { startTraining } = useTraining();
  const { engines } = useEngines();

  const handleStart = async () => {
    if (!name.trim()) {
      toast.error("Please enter a session name");
      return;
    }
    
    if (!selectedEngineId) {
      toast.error("Please select an engine");
      return;
    }

    setIsStarting(true);
    try {
      await startTraining(selectedEngineId, {
        name: name.trim(),
        batch_size: batchSize[0],
        epochs: epochs[0],
        learning_rate: learningRate[0],
        dataset_size: 1000, // Default dataset size
      });
      
      toast.success("Training session started!");
      setName("");
      setSelectedEngineId("");
      setBatchSize([32]);
      setEpochs([10]);
      setLearningRate([0.001]);
      onOpenChange(false);
    } catch (error) {
      toast.error("Failed to start training session");
      console.error("Error starting training:", error);
    } finally {
      setIsStarting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] glass-card border-border/50">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-accent" />
            Start Training Session
          </DialogTitle>
          <DialogDescription>
            Configure and launch a new training session for your AI engine
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="session-name">Session Name</Label>
            <Input
              id="session-name"
              placeholder="e.g., Mythology Training v1"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="bg-muted/30"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="engine">Select Engine</Label>
            <Select value={selectedEngineId} onValueChange={setSelectedEngineId}>
              <SelectTrigger className="bg-muted/30">
                <SelectValue placeholder="Choose an engine" />
              </SelectTrigger>
              <SelectContent className="bg-card border-border z-50">
                {engines.map((engine) => (
                  <SelectItem key={engine.id} value={engine.id}>
                    {engine.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Batch Size: {batchSize[0]}</Label>
            <Slider
              value={batchSize}
              onValueChange={setBatchSize}
              min={8}
              max={128}
              step={8}
              className="cursor-pointer"
            />
          </div>

          <div className="space-y-2">
            <Label>Epochs: {epochs[0]}</Label>
            <Slider
              value={epochs}
              onValueChange={setEpochs}
              min={5}
              max={100}
              step={5}
              className="cursor-pointer"
            />
          </div>

          <div className="space-y-2">
            <Label>Learning Rate: {learningRate[0].toFixed(4)}</Label>
            <Slider
              value={learningRate}
              onValueChange={setLearningRate}
              min={0.0001}
              max={0.01}
              step={0.0001}
              className="cursor-pointer"
            />
          </div>

          <div className="bg-accent/10 border border-accent/20 rounded-lg p-4">
            <p className="text-sm text-muted-foreground">
              💡 Training will run in the background. You can monitor progress from the Training page.
            </p>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)} disabled={isStarting}>
            Cancel
          </Button>
          <Button 
            onClick={handleStart} 
            className="bg-gradient-primary hover:opacity-90"
            disabled={isStarting}
          >
            {isStarting && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
            {isStarting ? "Starting..." : "Start Training"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
