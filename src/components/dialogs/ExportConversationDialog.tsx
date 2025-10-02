import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Download, FileJson, FileText, FileCode } from "lucide-react";

interface ExportConversationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const ExportConversationDialog = ({ open, onOpenChange }: ExportConversationDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[450px] glass-card border-border/50">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Download className="w-5 h-5 text-primary" />
            Export Conversation
          </DialogTitle>
          <DialogDescription>
            Choose the format for your conversation export
          </DialogDescription>
        </DialogHeader>

        <RadioGroup defaultValue="json" className="space-y-3 py-4">
          <div className="flex items-center space-x-3 p-3 rounded-lg border border-border/50 hover:bg-muted/30 transition-colors">
            <RadioGroupItem value="json" id="json" />
            <Label htmlFor="json" className="flex-1 flex items-center gap-3 cursor-pointer">
              <FileJson className="w-5 h-5 text-accent" />
              <div>
                <p className="font-medium">JSON</p>
                <p className="text-xs text-muted-foreground">Structured data with metadata</p>
              </div>
            </Label>
          </div>

          <div className="flex items-center space-x-3 p-3 rounded-lg border border-border/50 hover:bg-muted/30 transition-colors">
            <RadioGroupItem value="txt" id="txt" />
            <Label htmlFor="txt" className="flex-1 flex items-center gap-3 cursor-pointer">
              <FileText className="w-5 h-5 text-secondary" />
              <div>
                <p className="font-medium">Plain Text</p>
                <p className="text-xs text-muted-foreground">Simple readable format</p>
              </div>
            </Label>
          </div>

          <div className="flex items-center space-x-3 p-3 rounded-lg border border-border/50 hover:bg-muted/30 transition-colors">
            <RadioGroupItem value="md" id="md" />
            <Label htmlFor="md" className="flex-1 flex items-center gap-3 cursor-pointer">
              <FileCode className="w-5 h-5 text-primary" />
              <div>
                <p className="font-medium">Markdown</p>
                <p className="text-xs text-muted-foreground">Formatted with syntax highlighting</p>
              </div>
            </Label>
          </div>
        </RadioGroup>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button className="bg-gradient-primary hover:opacity-90 gap-2">
            <Download className="w-4 h-4" />
            Export
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
