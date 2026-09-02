import { Icon } from "@iconify/react";

type BadgeProps = {
  icon?: string;
  children: string;
};

export default function Badge({ icon = "lucide:radio", children }: BadgeProps) {
  return (
    <div className="inline-flex items-center gap-2 rounded-full bg-slate-50 px-4 py-2 text-xs font-semibold text-slate-600 ring-1 ring-slate-200">
      <span className="flex h-4 w-4 items-center justify-center rounded-full bg-primary">
        <Icon icon={icon} className="text-[10px] text-white" />
      </span>
      {children}
    </div>
  );
}
