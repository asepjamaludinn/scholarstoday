import type { InputHTMLAttributes } from "react";

type TextFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  error?: string;
};

export default function TextField({
  label,
  error,
  id,
  className = "",
  ...props
}: TextFieldProps) {
  return (
    <div>
      <label htmlFor={id} className="mb-1 block text-sm text-slate-500">
        {label}
      </label>

      <div className="relative">
        <input
          id={id}
          className={`peer w-full border-b border-slate-200 bg-transparent px-0.5 py-3 text-slate-900 placeholder:text-slate-300 focus:outline-none ${className}`}
          aria-invalid={!!error}
          aria-describedby={error ? `${id}-error` : undefined}
          {...props}
        />
        <span
          className={`absolute bottom-0 left-0 h-[2px] w-full origin-left scale-x-0 transition-transform duration-300 peer-focus:scale-x-100 ${
            error ? "bg-red-400 scale-x-100" : "bg-primary"
          }`}
        />
      </div>

      {error && (
        <p id={`${id}-error`} className="mt-1.5 text-xs text-red-500">
          {error}
        </p>
      )}
    </div>
  );
}
