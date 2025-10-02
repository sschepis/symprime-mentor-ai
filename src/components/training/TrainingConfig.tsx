import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";

export const TrainingConfig = () => {
  return (
    <Card className="glass-card p-6 space-y-4">
      <h3 className="font-semibold mb-4">Configuration</h3>
      
      <div className="space-y-4">
        <div className="space-y-2">
          <Label className="text-sm text-muted-foreground">Batch Size</Label>
          <div className="text-2xl font-semibold">10</div>
        </div>

        <div className="space-y-2">
          <Label className="text-sm text-muted-foreground">Category</Label>
          <div className="text-lg font-medium">All Categories</div>
        </div>

        <div className="flex items-center justify-between py-2">
          <Label htmlFor="auto-adjust" className="text-sm">Auto-adjust</Label>
          <Switch id="auto-adjust" defaultChecked />
        </div>

        <Button variant="outline" className="w-full justify-between mt-4">
          Advanced
          <ChevronDown className="w-4 h-4" />
        </Button>
      </div>
    </Card>
  );
};
