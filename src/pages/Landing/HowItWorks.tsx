import { Fragment } from "react";
import { Icon } from "@iconify/react";
import StepIllustration from "../../pages/Landing/StepIllustration";
import {
  HOW_IT_WORKS_STEPS,
  HOW_IT_WORKS_HEADING,
  HOW_IT_WORKS_SUBHEADING,
} from "../../constants/howItWorks";
import Heading from "../../components/ui/Heading";
import Text from "../../components/ui/Text";

export default function HowItWorks() {
  return (
    <section className="relative overflow-hidden bg-white px-4 py-16 sm:px-6 sm:py-20 md:px-12 md:py-24">
      <div
        className="pointer-events-none absolute left-1/2 top-0 h-[420px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/5 blur-3xl"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-[1400px]">
        <div className="mb-10 flex flex-col items-center text-center sm:mb-14">
          <Heading level="h1" className="text-slate-900">
            {HOW_IT_WORKS_HEADING}
          </Heading>

          <Text size="body" className="mt-1 max-w-lg text-slate-500">
            {HOW_IT_WORKS_SUBHEADING}
          </Text>
        </div>

        <div className="relative">
          <div className="grid gap-5 sm:grid-cols-1 md:grid-cols-3 md:gap-5">
            {HOW_IT_WORKS_STEPS.map((step, index) => (
              <div
                key={step.title}
                className="group relative min-h-[320px] overflow-visible rounded-[2rem] border border-slate-100 bg-slate-50 p-5 transition-all duration-300 hover:-translate-y-1.5 hover:border-primary/20 hover:bg-white hover:shadow-xl hover:shadow-primary/5 sm:min-h-[340px] sm:p-6 md:p-7"
              >
                <div className="relative z-10 flex items-start justify-between">
                  <div>
                    <p className="text-small font-medium tracking-tight text-slate-500">
                      {step.label}
                    </p>

                    <Heading level="h4" className="mt-1 text-slate-900">
                      {step.title}
                    </Heading>
                  </div>

                  <span className="select-none text-3xl font-black text-slate-200 transition-colors duration-300 group-hover:text-primary/15 sm:text-4xl">
                    0{index + 1}
                  </span>
                </div>

                <div className="relative z-10">
                  <StepIllustration type={step.type} icon={step.icon} />
                </div>

                <div className="absolute bottom-6 left-6 z-10 rounded-full border border-slate-200 bg-white px-5 py-2 text-small font-medium text-slate-700 shadow-sm transition-colors duration-300 group-hover:border-primary/20 group-hover:text-primary">
                  {step.caption}
                </div>
              </div>
            ))}
          </div>

          <div
            className="pointer-events-none absolute inset-0 z-[100] hidden md:grid md:grid-cols-3 md:gap-5"
            aria-hidden="true"
          >
            {HOW_IT_WORKS_STEPS.map((step, index) => (
              <Fragment key={step.title}>
                <div className="relative">
                  {index < HOW_IT_WORKS_STEPS.length - 1 && (
                    <div className="absolute left-[calc(100%+10px)] top-1/2 -translate-y-1/2">
                      <div className="absolute right-1/2 top-1/2 h-px w-[calc(100%+20px)] -translate-y-1/2 bg-slate-200" />

                      <div className="relative flex h-12 w-12 -translate-x-1/2 items-center justify-center rounded-full border border-white bg-slate-100 shadow-md">
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
      </div>
    </section>
  );
}
