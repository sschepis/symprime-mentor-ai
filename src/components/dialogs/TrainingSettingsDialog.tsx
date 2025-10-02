import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Settings } from "lucide-react";

interface TrainingSettingsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const TrainingSettingsDialog = ({ open, onOpenChange }: TrainingSettingsDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[550px] glass-card border-border/50">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Settings className="w-5 h-5 text-primary" />
            Advanced Training Settings
          </DialogTitle>
          <DialogDescription>
            Fine-tune training parameters for optimal performance
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Batch Size */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label>Batch Size</Label>
              <span className="text-sm font-semibold text-primary">10</span>
            </div>
            <Slider defaultValue={[10]} min={1} max={50} step={1} />
            <p className="text-xs text-muted-foreground">
              Number of examples processed per training iteration
            </p>
          </div>

          {/* Temperature */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label>Temperature</Label>
              <span className="text-sm font-semibold text-accent">0.65</span>
            </div>
            <Slider defaultValue={[0.65]} min={0.1} max={1.0} step={0.05} />
            <p className="text-xs text-muted-foreground">
              Controls randomness in symbol selection (lower = more focused)
            </p>
          </div>

          {/* Learning Rate */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label>Learning Rate</Label>
              <span className="text-sm font-semibold text-secondary">0.01</span>
            </div>
            <Slider defaultValue={[0.01]} min={0.001} max={0.1} step={0.001} />
            <p className="text-xs text-muted-foreground">
              Speed of pattern recognition adjustment
            </p>
          </div>

          {/* Category Filter */}
          <div className="space-y-2">
            <Label>Training Category</Label>
            <Select defaultValue="all">
              <SelectTrigger className="bg-muted/30">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-card border-border z-50">
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="compound">Compound Symbols</SelectItem>
                <SelectItem value="simple">Simple Symbols</SelectItem>
                <SelectItem value="relationships">Relationships Only</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Toggles */}
          <div className="space-y-4 pt-4 border-t border-border/50">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Auto-adjust Parameters</Label>
                <p className="text-xs text-muted-foreground">Let AI optimize settings automatically</p>
              </div>
              <Switch defaultChecked />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Apply Relationship Decay</Label>
                <p className="text-xs text-muted-foreground">Reduce weak symbol connections over time</p>
              </div>
              <Switch defaultChecked />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Enable Pattern Prediction</Label>
                <p className="text-xs text-muted-foreground">Predict upcoming symbol relationships</p>
              </div>
              <Switch />
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button className="bg-gradient-primary hover:opacity-90">
            Apply Settings
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
