import { Icon } from "@iconify/react";
import type { StepType } from "../../../constants/howItWorks";

type StepIllustrationProps = {
  type: StepType;
  icon: string;
};

export default function StepIllustration({
  type,
  icon,
}: StepIllustrationProps) {
  if (type === "form") {
    return (
      <div className="relative flex h-44 w-full items-center justify-center">
        <div className="absolute h-40 w-44 rotate-3 rounded-2xl bg-primary/10 transition-transform duration-500 group-hover:rotate-6" />

        <div className="relative h-40 w-44 -rotate-1 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-transform duration-500 group-hover:-rotate-3 group-hover:-translate-y-1">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
            <Icon
              icon={icon}
              className="text-lg text-primary"
              aria-hidden="true"
            />
          </div>

          <div className="mt-5 space-y-2">
            <div className="h-2 w-full rounded-full bg-slate-100" />
            <div className="h-2 w-4/5 rounded-full bg-slate-100" />
            <div className="h-2 w-3/5 rounded-full bg-slate-100" />
          </div>

          <div
            className="absolute -bottom-3 -right-3 flex h-8 w-8 items-center justify-center rounded-full bg-lime-300 text-slate-900 shadow-sm"
            aria-hidden="true"
          >
            <Icon icon="lucide:pencil" className="text-sm" />
          </div>
        </div>
      </div>
    );
  }

  if (type === "quiz") {
    return (
      <div className="relative flex h-44 w-full items-center justify-center">
        <div className="absolute h-24 w-48 translate-x-2 translate-y-2 rounded-2xl bg-primary/10 transition-transform duration-500 group-hover:translate-x-3 group-hover:translate-y-3" />

        <div className="relative transition-transform duration-500 group-hover:-translate-y-1">
          <div className="relative flex w-52 items-center gap-4 rounded-2xl bg-white p-4 shadow-md">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10">
              <Icon
                icon={icon}
                className="text-xl text-primary"
                aria-hidden="true"
              />
            </div>

            <div className="flex-1">
              <div className="h-3 w-full rounded-full bg-slate-100" />
              <div className="mt-2 h-2 w-3/4 rounded-full bg-slate-100" />
            </div>
          </div>

          <div
            className="absolute -right-4 -top-4 flex h-11 w-11 items-center justify-center rounded-full bg-emerald-50 shadow-sm ring-1 ring-emerald-100 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6"
            aria-hidden="true"
          >
            <Icon icon="lucide:check" className="text-emerald-500" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative flex h-44 w-full items-center justify-center">
      <div className="absolute h-32 w-24 -rotate-6 rounded-2xl bg-primary/10 transition-transform duration-500 group-hover:-rotate-12" />

      <div className="relative flex h-36 w-28 rotate-3 flex-col items-center rounded-2xl bg-white px-4 py-5 shadow-md transition-transform duration-500 group-hover:rotate-6 group-hover:-translate-y-1">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
          <Icon icon={icon} className="text-primary" aria-hidden="true" />
        </div>

        <div className="mt-5 h-2 w-full rounded-full bg-slate-100" />
        <div className="mt-2 h-2 w-4/5 rounded-full bg-slate-100" />
        <div className="mt-2 h-2 w-3/5 rounded-full bg-slate-100" />
      </div>

      <div
        className="absolute right-6 top-2 flex h-9 w-9 items-center justify-center rounded-full bg-amber-300 text-slate-900 shadow-sm transition-transform duration-500 group-hover:scale-110"
        aria-hidden="true"
      >
        <Icon icon="lucide:trophy" className="text-sm" />
      </div>
    </div>
  );
}
