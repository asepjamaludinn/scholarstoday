import { useEffect, useRef, useState } from "react";
import { Icon } from "@iconify/react";

type DropdownProps = {
  label?: string;
  placeholder?: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
  error?: string;
  id?: string;
};  

export default function Dropdown({
  label,
  placeholder = "Pilih...",
  value,
  options,
  onChange,
  error,
  id,
}: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  const handleSelect = (option: string) => {
    onChange(option);
    setIsOpen(false);
  };

  return (
    <div ref={containerRef}>
      {label && (
        <label htmlFor={id} className="mb-1 block text-sm text-slate-500">
          {label}
        </label>
      )}

      <div className="relative">
        <button
          id={id}
          type="button"
          onClick={() => setIsOpen((open) => !open)}
          aria-haspopup="listbox"
          aria-expanded={isOpen}
          aria-invalid={!!error}
          className={`peer flex w-full items-center justify-between border-b border-slate-200 bg-transparent px-0.5 py-3 text-left focus:outline-none ${
            value ? "text-slate-900" : "text-slate-300"
          }`}
        >
          <span>{value || placeholder}</span>
          <Icon
            icon="lucide:chevron-down"
            className={`text-slate-400 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
          />
        </button>

        <span
          className={`absolute bottom-0 left-0 h-[2px] w-full origin-left scale-x-0 transition-transform duration-300 peer-focus:scale-x-100 ${
            error ? "bg-red-400 scale-x-100" : "bg-primary"
          }`}
        />

        {isOpen && (
          <div
            role="listbox"
            className="absolute left-0 right-0 top-[calc(100%+10px)] z-20 overflow-hidden rounded-xl border border-slate-100 bg-white py-1.5 shadow-[0_16px_40px_-12px_rgba(15,23,42,0.18)]"
          >
            {options.map((option) => {
              const selected = value === option;
              return (
                <button
                  key={option}
                  type="button"
                  role="option"
                  aria-selected={selected}
                  onClick={() => handleSelect(option)}
                  className={`flex w-full items-center justify-between px-4 py-2.5 text-left text-sm transition-colors ${
                    selected
                      ? "bg-primary/5 font-medium text-primary"
                      : "text-slate-700 hover:bg-slate-50"
                  }`}
                >
                  {option}
                  {selected && (
                    <Icon icon="lucide:check" className="text-base" />
                  )}
                </button>
              );
            })}
          </div>
        )}
      </div>

      {error && <p className="mt-1.5 text-xs text-red-500">{error}</p>}
    </div>
  );
}
