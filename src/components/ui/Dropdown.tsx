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
  const [highlightedIndex, setHighlightedIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const optionRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const listboxId = `${id ?? "dropdown"}-listbox`;
  const getOptionId = (index: number) => `${id ?? "dropdown"}-option-${index}`;

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (isOpen) {
      optionRefs.current[highlightedIndex]?.scrollIntoView({
        block: "nearest",
      });
    }
  }, [isOpen, highlightedIndex]);

  const openDropdown = (initialIndex?: number) => {
    const selectedIndex = options.indexOf(value);
    setHighlightedIndex(
      initialIndex ?? (selectedIndex >= 0 ? selectedIndex : 0),
    );
    setIsOpen(true);
  };

  const handleSelect = (option: string) => {
    onChange(option);
    setIsOpen(false);
    buttonRef.current?.focus();
  };

  const handleButtonKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        if (!isOpen) {
          openDropdown();
        } else {
          setHighlightedIndex((prev) => Math.min(prev + 1, options.length - 1));
        }
        break;
      case "ArrowUp":
        e.preventDefault();
        if (!isOpen) {
          openDropdown();
        } else {
          setHighlightedIndex((prev) => Math.max(prev - 1, 0));
        }
        break;
      case "Home":
        if (isOpen) {
          e.preventDefault();
          setHighlightedIndex(0);
        }
        break;
      case "End":
        if (isOpen) {
          e.preventDefault();
          setHighlightedIndex(options.length - 1);
        }
        break;
      case "Enter":
      case " ":
        e.preventDefault();
        if (isOpen) {
          const option = options[highlightedIndex];
          if (option) handleSelect(option);
        } else {
          openDropdown();
        }
        break;
      case "Escape":
        if (isOpen) {
          e.preventDefault();
          setIsOpen(false);
        }
        break;
      case "Tab":
        setIsOpen(false);
        break;
      default:
        break;
    }
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
          ref={buttonRef}
          id={id}
          type="button"
          onClick={() => (isOpen ? setIsOpen(false) : openDropdown())}
          onKeyDown={handleButtonKeyDown}
          aria-haspopup="listbox"
          aria-expanded={isOpen}
          aria-invalid={!!error}
          aria-controls={listboxId}
          aria-activedescendant={
            isOpen && options[highlightedIndex]
              ? getOptionId(highlightedIndex)
              : undefined
          }
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
            id={listboxId}
            role="listbox"
            aria-activedescendant={
              options[highlightedIndex]
                ? getOptionId(highlightedIndex)
                : undefined
            }
            className="absolute left-0 right-0 top-[calc(100%+10px)] z-20 overflow-hidden rounded-xl border border-slate-100 bg-white py-1.5 shadow-[0_16px_40px_-12px_rgba(15,23,42,0.18)]"
          >
            {options.map((option, index) => {
              const selected = value === option;
              const highlighted = index === highlightedIndex;
              return (
                <button
                  key={option}
                  id={getOptionId(index)}
                  ref={(el) => {
                    optionRefs.current[index] = el;
                  }}
                  type="button"
                  role="option"
                  aria-selected={selected}
                  onMouseEnter={() => setHighlightedIndex(index)}
                  onClick={() => handleSelect(option)}
                  className={`flex w-full items-center justify-between px-4 py-2.5 text-left text-sm transition-colors ${
                    selected
                      ? "bg-primary/5 font-medium text-primary"
                      : highlighted
                        ? "bg-slate-50 text-slate-900"
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
