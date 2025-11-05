import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ChevronDown, Upload } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export const TrainingConfig = () => {
  const [batchSize, setBatchSize] = useState(10);
  const [learningRate, setLearningRate] = useState(0.001);
  const [epochs, setEpochs] = useState(5);
  const [autoAdjust, setAutoAdjust] = useState(true);
  const [showAdvanced, setShowAdvanced] = useState(false);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      toast.success(`File "${file.name}" selected for training`);
      // In a real app, this would upload to storage bucket
    }
  };

  return (
    <Card className="glass-card p-6 space-y-4">
      <h3 className="font-semibold mb-4">Configuration</h3>
      
      <div className="space-y-4">
        {/* File Upload */}
        <div className="space-y-2">
          <Label className="text-sm text-muted-foreground">Training Data</Label>
          <label htmlFor="file-upload">
            <div className="flex items-center gap-2 p-3 border border-border rounded-lg cursor-pointer hover:bg-muted/30 transition-colors">
              <Upload className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm">Upload dataset</span>
            </div>
            <input
              id="file-upload"
              type="file"
              accept=".txt,.csv,.json"
              onChange={handleFileUpload}
              className="hidden"
            />
          </label>
        </div>

        {/* Batch Size */}
        <div className="space-y-2">
          <Label className="text-sm text-muted-foreground">Batch Size</Label>
          <div className="flex items-center gap-3">
            <Slider
              value={[batchSize]}
              onValueChange={([value]) => setBatchSize(value)}
              min={1}
              max={64}
              step={1}
              className="flex-1"
            />
            <span className="text-xl font-semibold w-12 text-right">{batchSize}</span>
          </div>
        </div>

        {/* Epochs */}
        <div className="space-y-2">
          <Label className="text-sm text-muted-foreground">Epochs</Label>
          <Select value={epochs.toString()} onValueChange={(v) => setEpochs(parseInt(v))}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">1 epoch</SelectItem>
              <SelectItem value="5">5 epochs</SelectItem>
              <SelectItem value="10">10 epochs</SelectItem>
              <SelectItem value="20">20 epochs</SelectItem>
              <SelectItem value="50">50 epochs</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Category */}
        <div className="space-y-2">
          <Label className="text-sm text-muted-foreground">Category</Label>
          <Select defaultValue="all">
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="mythology">Mythology</SelectItem>
              <SelectItem value="science">Science</SelectItem>
              <SelectItem value="history">History</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Auto-adjust */}
        <div className="flex items-center justify-between py-2">
          <Label htmlFor="auto-adjust" className="text-sm">Auto-adjust parameters</Label>
          <Switch 
            id="auto-adjust" 
            checked={autoAdjust}
            onCheckedChange={setAutoAdjust}
          />
        </div>

        {/* Advanced Settings */}
        <Button 
          variant="outline" 
          className="w-full justify-between mt-4"
          onClick={() => setShowAdvanced(!showAdvanced)}
        >
          Advanced
          <ChevronDown className={`w-4 h-4 transition-transform ${showAdvanced ? 'rotate-180' : ''}`} />
        </Button>

        {showAdvanced && (
          <div className="space-y-4 pt-2 animate-fade-in">
            <div className="space-y-2">
              <Label className="text-sm text-muted-foreground">Learning Rate</Label>
              <div className="flex items-center gap-3">
                <Slider
                  value={[learningRate * 10000]}
                  onValueChange={([value]) => setLearningRate(value / 10000)}
                  min={1}
                  max={100}
                  step={1}
                  className="flex-1"
                />
                <span className="text-sm font-mono w-16 text-right">{learningRate.toFixed(4)}</span>
              </div>
            </div>
            
            <div className="flex items-center justify-between py-2">
              <Label htmlFor="early-stop" className="text-sm">Early stopping</Label>
              <Switch id="early-stop" defaultChecked />
            </div>
            
            <div className="flex items-center justify-between py-2">
              <Label htmlFor="validation" className="text-sm">Validation split</Label>
              <Switch id="validation" defaultChecked />
            </div>
          </div>
        )}
      </div>
    </Card>
  );
};
