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
          className="flex items-center justify-between p-4 bg-muted/20 rounded-lg hover:bg-muted/30 transition-all duration-200 group cursor-pointer hover:scale-[1.02] animate-fade-in"
          style={{ animationDelay: `${idx * 50}ms` }}
        >
          <div className="flex items-center gap-4">
            <Calendar className="w-5 h-5 text-muted-foreground group-hover:scale-110 transition-transform duration-200" />
            <div>
              <p className="font-semibold group-hover:text-primary transition-colors duration-200">{invoice.invoice}</p>
              <p className="text-sm text-muted-foreground">{invoice.date}</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <p className="font-semibold group-hover:text-primary transition-colors duration-200">{invoice.amount}</p>
            <Badge variant="outline" className="bg-success/10 text-success border-success/20 transition-all duration-200 group-hover:scale-105">
              {invoice.status}
            </Badge>
            <Button 
              variant="ghost" 
              size="sm" 
              className="gap-2 hover:bg-primary/10 hover:text-primary transition-all duration-200 hover:scale-110"
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
