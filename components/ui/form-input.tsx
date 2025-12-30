import { cn } from "@/lib/utils";

export interface FormInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export function FormInput({
  label,
  id,
  className,
  ...props
}: FormInputProps) {
  return (
    <div>
      <label
        htmlFor={id}
        className="block text-sm font-medium text-foreground mb-1.5"
      >
        {label}
      </label>
      <input
        id={id}
        name={id}
        className={cn(
          "w-full px-3 py-2 border border-border rounded-md bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring",
          className
        )}
        {...props}
      />
    </div>
  );
}

export interface FormTextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
}

export function FormTextarea({
  label,
  id,
  className,
  ...props
}: FormTextareaProps) {
  return (
    <div>
      <label
        htmlFor={id}
        className="block text-sm font-medium text-foreground mb-1.5"
      >
        {label}
      </label>
      <textarea
        id={id}
        name={id}
        className={cn(
          "w-full px-3 py-2 border border-border rounded-md bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring resize-none",
          className
        )}
        {...props}
      />
    </div>
  );
}

export interface FormSelectProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  options: Array<{ value: string; label: string }>;
}

export function FormSelect({
  label,
  id,
  options,
  className,
  ...props
}: FormSelectProps) {
  return (
    <div>
      <label
        htmlFor={id}
        className="block text-sm font-medium text-foreground mb-1.5"
      >
        {label}
      </label>
      <select
        id={id}
        name={id}
        className={cn(
          "w-full px-3 py-2 border border-border rounded-md bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring",
          className
        )}
        {...props}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
