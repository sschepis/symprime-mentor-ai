import { ReactNode } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface FormFieldProps {
  label: string;
  id: string;
  type?: "text" | "email" | "password" | "textarea";
  placeholder?: string;
  defaultValue?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  className?: string;
  rows?: number;
}

export const FormField = ({ 
  label, 
  id, 
  type = "text", 
  placeholder, 
  defaultValue,
  value,
  onChange,
  className = "bg-muted/30",
  rows = 3
}: FormFieldProps) => {
  return (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}</Label>
      {type === "textarea" ? (
        <Textarea
          id={id}
          placeholder={placeholder}
          defaultValue={defaultValue}
          value={value}
          onChange={onChange}
          className={className}
          rows={rows}
        />
      ) : (
        <Input
          id={id}
          type={type}
          placeholder={placeholder}
          defaultValue={defaultValue}
          value={value}
          onChange={onChange}
          className={className}
        />
      )}
    </div>
  );
};
