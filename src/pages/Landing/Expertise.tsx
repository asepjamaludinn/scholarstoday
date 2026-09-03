import { useState } from "react";
import ExpertisePanel from "./ExpertisePanel";
import Heading from "../../components/ui/Heading";
import Text from "../../components/ui/Text";
import {
  EXPERTISE_ITEMS,
  EXPERTISE_HEADING,
  EXPERTISE_SUBHEADING,
} from "../../constants/expertise";

export default function Expertise() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="bg-white px-4 py-16 sm:px-6 sm:py-20 md:px-12 md:py-24">
      <div className="mx-auto max-w-[1400px]">
        <div className="border-b border-slate-100 pb-6 sm:pb-8">
          <Heading level="h1" className="text-slate-900">
            {EXPERTISE_HEADING}
          </Heading>

          <Text size="body" className="mt-1 max-w-lg text-slate-500">
            {EXPERTISE_SUBHEADING}
          </Text>
        </div>

        <div className="mt-10 flex flex-col overflow-hidden rounded-[2rem] border border-slate-100 shadow-sm md:h-[560px] md:flex-row">
          {EXPERTISE_ITEMS.map((item, index) => (
            <ExpertisePanel
              key={item.program}
              item={item}
              index={index}
              isActive={activeIndex === index}
              onSelect={() => setActiveIndex(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
