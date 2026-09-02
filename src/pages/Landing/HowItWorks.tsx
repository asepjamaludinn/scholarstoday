import { Fragment } from "react";
import { Icon } from "@iconify/react";
import StepIllustration from "../../pages/Landing/StepIllustration";
import {
  HOW_IT_WORKS_STEPS,
  HOW_IT_WORKS_BADGE,
  HOW_IT_WORKS_HEADING,
} from "../../constants/howItWorks";
import Badge from "../../components/ui/Badge";

export default function HowItWorks() {
  return (
    <section className="relative overflow-hidden bg-white px-6 py-24 md:px-12">
      <div
        className="pointer-events-none absolute left-1/2 top-0 h-[420px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/5 blur-3xl"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-[1400px]">
        <div className="mb-14 flex flex-col items-center text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-slate-50 px-4 py-2 text-xs font-semibold text-slate-600 ring-1 ring-slate-200">
            <Badge>{HOW_IT_WORKS_BADGE}</Badge>
          </div>

          <h3 className="max-w-2xl text-3xl font-black leading-tight text-slate-900 sm:text-4xl">
            {HOW_IT_WORKS_HEADING}
          </h3>
        </div>

        <div className="grid gap-5 md:grid-cols-3 md:gap-5">
          {HOW_IT_WORKS_STEPS.map((step, index) => (
            <Fragment key={step.title}>
              <div className="group relative min-h-[340px] overflow-visible rounded-[2rem] border border-slate-100 bg-slate-50 p-6 transition-all duration-300 hover:-translate-y-1.5 hover:border-primary/20 hover:bg-white hover:shadow-xl hover:shadow-primary/5 md:p-7">
                <div className="relative z-10 flex items-start justify-between">
                  <div>
                    <p className="text-sm font-medium uppercase tracking-wide text-slate-500">
                      {step.label}
                    </p>

                    <h4 className="mt-1 text-xl font-semibold text-slate-900">
                      {step.title}
                    </h4>
                  </div>

                  <span className="select-none text-4xl font-black text-slate-200 transition-colors duration-300 group-hover:text-primary/15">
                    0{index + 1}
                  </span>
                </div>

                <div className="relative z-10">
                  <StepIllustration type={step.type} icon={step.icon} />
                </div>

                <div className="absolute bottom-6 left-6 z-10 rounded-full border border-slate-200 bg-white px-5 py-2 text-sm font-medium text-slate-700 shadow-sm transition-colors duration-300 group-hover:border-primary/20 group-hover:text-primary">
                  {step.caption}
                </div>

                {index < HOW_IT_WORKS_STEPS.length - 1 && (
                  <div
                    className="
                      absolute
                      left-[calc(100%+10px)]
                      top-1/2
                      z-50
                      hidden
                      -translate-y-1/2
                      md:block
                    "
                  >
                    <div
                      className="
                        absolute
                        right-1/2
                        top-1/2
                        h-px
                        w-[calc(100%+20px)]
                        -translate-y-1/2
                        bg-slate-200
                      "
                    />

                    <div
                      className="
                        relative
                        flex
                        h-12
                        w-12
                        -translate-x-1/2
                        items-center
                        justify-center
                        rounded-full
                        border
                        border-white
                        bg-slate-100
                        shadow-md
                      "
                    >
                      <Icon
                        icon="lucide:arrow-right"
                        className="text-lg text-slate-500"
                      />
                    </div>
                  </div>
                )}
              </div>
            </Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}
