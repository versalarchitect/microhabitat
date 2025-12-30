import { cn } from "@/lib/utils";

export interface FilterOption {
  label: string;
  value: string;
  count?: number;
}

export interface FilterButtonGroupProps {
  options: FilterOption[];
  activeValue: string;
  onChange: (value: string) => void;
  className?: string;
}

export function FilterButtonGroup({
  options,
  activeValue,
  onChange,
  className,
}: FilterButtonGroupProps) {
  return (
    <div className={cn("flex flex-wrap gap-2", className)}>
      {options.map((option) => (
        <button
          key={option.value}
          type="button"
          onClick={() => onChange(option.value)}
          className={cn(
            "px-4 py-2 rounded-md text-sm font-medium transition-colors",
            activeValue === option.value
              ? "bg-primary text-primary-foreground"
              : "bg-card border border-border text-muted-foreground hover:text-foreground"
          )}
        >
          {option.label}
          {option.count !== undefined && ` (${option.count})`}
        </button>
      ))}
    </div>
  );
}
