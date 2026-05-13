import type { ComponentProps } from "react";

type FormFieldProps = ComponentProps<"input"> & {
  error?: string;
  label: string;
};

export default function FormField({ error, id, label, ...props }: FormFieldProps) {
  const inputId = id ?? props.name;

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-foreground" htmlFor={inputId}>
        {label}
      </label>
      <input
        className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-primary focus:ring-3 focus:ring-primary/20 disabled:cursor-not-allowed disabled:opacity-60"
        id={inputId}
        {...props}
      />
      {error ? <p className="text-sm text-destructive">{error}</p> : null}
    </div>
  );
}
