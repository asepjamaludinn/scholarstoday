import { Icon } from "@iconify/react";
import type { ExpertiseItem } from "../../../types/expertise";
import Heading from "../../../components/ui/Heading";
import Text from "../../../components/ui/Text";

type ExpertisePanelProps = {
  item: ExpertiseItem;
  index: number;
  isActive: boolean;
  onSelect: () => void;
};

export default function ExpertisePanel({
  item,
  index,
  isActive,
  onSelect,
}: ExpertisePanelProps) {
  const orderLabel = String(index + 1).padStart(2, "0");

  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={isActive}
      className={`group relative flex shrink-0 flex-col overflow-hidden border-b border-slate-100 text-left transition-all duration-500 ease-in-out last:border-b-0 md:border-b-0 md:border-r md:last:border-r-0 ${
        isActive
          ? "basis-full bg-white md:basis-[42%]"
          : "basis-auto bg-slate-50/70 hover:bg-slate-50 md:basis-[19.33%]"
      }`}
    >
      {!isActive && (
        <img
          src={item.image}
          alt=""
          aria-hidden="true"
          width={400}
          height={225}
          loading="lazy"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover opacity-[0.07] transition-opacity duration-500 group-hover:opacity-[0.12]"
        />
      )}

      <div className="relative z-10 flex items-center justify-between px-6 pt-6">
        <Text
          size="xs"
          className={`font-light uppercase tracking-wide ${
            isActive ? "text-primary" : "hidden text-slate-400 md:block"
          }`}
        >
          Program
        </Text>
        <span className="ml-auto flex items-center gap-2 text-xs font-semibold text-slate-400">
          <span className="hidden h-px w-8 bg-slate-200 md:inline-block" />(
          {orderLabel})
        </span>
      </div>

      {isActive ? (
        <div className="relative z-10 flex flex-1 flex-col gap-5 px-6 pb-8 pt-5 md:px-8 md:pb-10">
          <div className="aspect-[16/9] w-full overflow-hidden rounded-2xl bg-slate-100 md:flex-1">
            <img
              src={item.image}
              alt={item.program}
              width={800}
              height={450}
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover"
            />
          </div>

          <div>
            <Heading level="h3" className="text-slate-900">
              {item.program}
            </Heading>
            <Text size="body" className="mt-2 text-slate-500">
              {item.description}
            </Text>
          </div>

          <div className="flex flex-wrap gap-2">
            {item.skills.map((skill) => (
              <span
                key={skill}
                className="rounded-full border border-slate-200 px-4 py-2 text-xs font-medium text-slate-600"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      ) : (
        <div className="relative z-10 flex flex-1 items-center justify-between px-6 py-8 md:flex-col md:justify-center md:gap-6 md:py-0">
          <Icon
            icon="lucide:arrow-right"
            className="text-lg text-slate-400 transition-colors group-hover:text-primary md:hidden"
          />
          <span className="text-lg font-bold text-slate-700 transition-colors group-hover:text-primary md:rotate-180 md:text-2xl md:[writing-mode:vertical-rl]">
            {item.program}
          </span>
        </div>
      )}
    </button>
  );
}
