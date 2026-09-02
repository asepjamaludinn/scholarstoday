export type StepType = "form" | "quiz" | "result";

export type HowItWorksStep = {
  label: string;
  title: string;
  caption: string;
  icon: string;
  type: StepType;
};

export const HOW_IT_WORKS_STEPS: HowItWorksStep[] = [
  {
    label: "Langkah Satu",
    title: "Isi Biodata Diri",
    caption: "Cepat & mudah!",
    icon: "lucide:clipboard-edit",
    type: "form",
  },
  {
    label: "Langkah Dua",
    title: "Kerjakan Kuis",
    caption: "Cuma 15 soal!",
    icon: "lucide:brain-circuit",
    type: "quiz",
  },
  {
    label: "Langkah Tiga",
    title: "Dapatkan Hasil",
    caption: "Langsung akurat!",
    icon: "lucide:medal",
    type: "result",
  },
];

export const HOW_IT_WORKS_BADGE = "Alur Pengerjaan";
export const HOW_IT_WORKS_HEADING =
  "Hanya butuh 3 langkah mudah untuk menemukan kelas yang tepat";
