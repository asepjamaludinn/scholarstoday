import { useState } from "react";
import { Icon } from "@iconify/react";
import Text from "../../../components/ui/Text";
import type { Question } from "../../../types/quiz";
import type { UserAnswers } from "../../../hooks/useQuiz";

type TestSidebarProps = {
  progressPercentage: number;
  answeredCount: number;
  totalQuestions: number;
  currentProgram: string;
  questions: Question[];
  answers: UserAnswers;
  currentIndex: number;
  onGoToQuestion: (index: number) => void;
  onResetQuiz: () => void;
};

export default function TestSidebar({
  progressPercentage,
  answeredCount,
  totalQuestions,
  currentProgram,
  questions,
  answers,
  currentIndex,
  onGoToQuestion,
  onResetQuiz,
}: TestSidebarProps) {
  const [isNavOpen, setIsNavOpen] = useState(false);

  return (
    <aside className="flex flex-col gap-4 lg:sticky lg:top-6 lg:self-start">
      <div className="flex flex-row items-center gap-4 rounded-2xl border border-slate-100 bg-white p-4 shadow-sm lg:flex-col lg:justify-center lg:rounded-3xl lg:p-6">
        <div
          className="relative flex h-16 w-16 shrink-0 items-center justify-center rounded-full lg:h-28 lg:w-28"
          style={{
            background: `conic-gradient(#1e3d7e ${progressPercentage * 3.6}deg, #e2e8f0 0deg)`,
          }}
        >
          <div className="flex h-[54px] w-[54px] flex-col items-center justify-center rounded-full bg-white lg:h-[92px] lg:w-[92px]">
            <span className="text-sm font-bold text-primary lg:text-2xl">
              {progressPercentage}%
            </span>
            <span className="hidden text-xs text-slate-400 lg:block">
              selesai
            </span>
          </div>
        </div>

        <div className="flex flex-1 flex-col items-start lg:items-center lg:text-center">
          <Text size="small" className="font-semibold text-slate-700">
            {answeredCount} dari {totalQuestions}{" "}
            <span className="hidden sm:inline">soal dijawab</span>
          </Text>
          <span className="mt-1 inline-block rounded-full bg-primary/10 px-2 py-1 text-[10px] font-semibold text-primary lg:px-3 lg:text-xs">
            {currentProgram}
          </span>
        </div>
      </div>

      <div className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm lg:rounded-3xl lg:p-5">
        <button
          type="button"
          onClick={() => setIsNavOpen(!isNavOpen)}
          className="flex w-full items-center justify-between lg:pointer-events-none lg:cursor-default"
        >
          <Text size="small" className="font-semibold text-slate-700">
            Navigasi Soal
          </Text>
          <Icon
            icon="lucide:chevron-down"
            className={`text-lg text-slate-400 transition-transform lg:hidden ${
              isNavOpen ? "rotate-180" : ""
            }`}
          />
        </button>

        <div
          className={`mt-4 ${
            isNavOpen ? "grid" : "hidden"
          } grid-cols-6 gap-2 sm:grid-cols-8 md:grid-cols-10 lg:grid lg:grid-cols-5`}
        >
          {questions.map((q, idx) => {
            const isAnswered = !!answers[q.id];
            const isCurrent = idx === currentIndex;

            let btnStyle =
              "bg-slate-100 text-slate-500 border-transparent hover:bg-slate-200";
            if (isCurrent) {
              btnStyle =
                "bg-primary text-white border-primary shadow-sm scale-105";
            } else if (isAnswered) {
              btnStyle =
                "bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100";
            }

            return (
              <button
                key={q.id}
                type="button"
                onClick={() => {
                  onGoToQuestion(idx);
                  setIsNavOpen(false);
                }}
                className={`flex h-9 w-9 cursor-pointer items-center justify-center rounded-xl border text-small font-bold transition-all sm:h-10 sm:w-10 ${btnStyle}`}
                title={`Soal ${idx + 1} ${isAnswered ? "(Sudah dijawab)" : ""}`}
              >
                {idx + 1}
              </button>
            );
          })}
        </div>
      </div>

      <button
        type="button"
        onClick={onResetQuiz}
        className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-xs font-semibold text-slate-500 shadow-sm transition-colors hover:border-red-200 hover:bg-red-50 hover:text-red-500 lg:rounded-3xl"
      >
        <Icon icon="lucide:rotate-ccw" className="text-sm" />
        Ulangi Tes dari Awal
      </button>
    </aside>
  );
}
