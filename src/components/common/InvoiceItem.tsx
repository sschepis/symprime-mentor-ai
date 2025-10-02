import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Download } from "lucide-react";

export interface InvoiceData {
  date: string;
  amount: string;
  status: string;
  invoice: string;
  onDownload?: () => void;
}

interface InvoiceItemProps {
  invoices: InvoiceData[];
}

export const InvoiceItem = ({ invoices }: InvoiceItemProps) => {
  return (
    <div className="space-y-2">
      {invoices.map((invoice, idx) => (
        <div 
          key={idx} 
          className="flex items-center justify-between p-4 bg-muted/20 rounded-lg hover:bg-muted/30 transition-colors"
        >
          <div className="flex items-center gap-4">
            <Calendar className="w-5 h-5 text-muted-foreground" />
            <div>
              <p className="font-semibold">{invoice.invoice}</p>
              <p className="text-sm text-muted-foreground">{invoice.date}</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <p className="font-semibold">{invoice.amount}</p>
            <Badge variant="outline" className="bg-success/10 text-success border-success/20">
              {invoice.status}
            </Badge>
            <Button 
              variant="ghost" 
              size="sm" 
              className="gap-2"
              onClick={invoice.onDownload}
            >
              <Download className="w-4 h-4" />
              Download
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
};
