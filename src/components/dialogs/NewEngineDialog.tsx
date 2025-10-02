import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Brain } from "lucide-react";

interface NewEngineDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const NewEngineDialog = ({ open, onOpenChange }: NewEngineDialogProps) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");

  const handleCreate = () => {
    // Handle engine creation
    console.log({ name, description, category });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] glass-card border-border/50">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Brain className="w-5 h-5 text-primary" />
            Create New Engine
          </DialogTitle>
          <DialogDescription>
            Set up a new symbolic AI engine for training and inference
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="name">Engine Name</Label>
            <Input
              id="name"
              placeholder="e.g., Greek Mythology Engine"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="bg-muted/30"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger className="bg-muted/30">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent className="bg-card border-border z-50">
                <SelectItem value="mythology">Mythology</SelectItem>
                <SelectItem value="history">History</SelectItem>
                <SelectItem value="science">Science</SelectItem>
                <SelectItem value="culture">Culture</SelectItem>
                <SelectItem value="custom">Custom</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Describe what this engine will be trained on..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="bg-muted/30 min-h-[100px]"
            />
          </div>

          <div className="bg-accent/10 border border-accent/20 rounded-lg p-4">
            <p className="text-sm text-muted-foreground">
              💡 Your engine will start with 0% autonomy and require training sessions to build symbolic relationships.
            </p>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleCreate} className="bg-gradient-primary hover:opacity-90">
            Create Engine
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
