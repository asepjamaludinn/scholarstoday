import { useEffect, useState } from "react";
import Heading from "../../../components/ui/Heading";
import Text from "../../../components/ui/Text";
import Button from "../../../components/ui/Button";
import type { Question, AnswerKey } from "../../../types/quiz";

type QuestionAreaProps = {
  currentIndex: number;
  totalQuestions: number;
  currentQuestion: Question;
  currentSelectedOption?: string;
  onSelectAnswer: (key: AnswerKey) => void;
  onPrev: () => void;
  onNext: () => void;
  onFinish: () => void;
};

const TRANSITION_MS = 200;

export default function QuestionArea({
  currentIndex,
  totalQuestions,
  currentQuestion,
  currentSelectedOption,
  onSelectAnswer,
  onPrev,
  onNext,
  onFinish,
}: QuestionAreaProps) {
  const isLastQuestion = currentIndex === totalQuestions - 1;

  const [isVisible, setIsVisible] = useState(true);
  const [displayedQuestion, setDisplayedQuestion] = useState(currentQuestion);

  useEffect(() => {
    if (currentQuestion.id === displayedQuestion.id) return;

    setIsVisible(false);

    const timeout = setTimeout(() => {
      setDisplayedQuestion(currentQuestion);
      setIsVisible(true);
    }, TRANSITION_MS);

    return () => clearTimeout(timeout);
  }, [currentQuestion.id]);

  return (
    <div className="flex flex-1 flex-col justify-between rounded-[2rem] border border-slate-100 border-l-4 border-l-primary bg-white p-5 shadow-sm sm:p-8 lg:p-10">
      <div
        className={`transition-all duration-200 ease-out ${
          isVisible ? "translate-x-0 opacity-100" : "translate-x-2 opacity-0"
        }`}
      >
        <div className="mb-4 flex items-center justify-between lg:mb-6">
          <span className="text-2xl font-black text-slate-200 sm:text-3xl">
            {String(currentIndex + 1).padStart(2, "0")}
          </span>
          <Text size="small" className="font-medium text-slate-400">
            Soal {currentIndex + 1} dari {totalQuestions}
          </Text>
        </div>

        <Heading
          level="h3"
          className="mb-5 text-[1.1rem] leading-relaxed text-slate-900 sm:mb-6 sm:text-h3"
        >
          {displayedQuestion.question}
        </Heading>

        <div className="space-y-3">
          {displayedQuestion.options.map((opt) => {
            const isSelected = currentSelectedOption === opt.key;

            return (
              <button
                key={opt.key}
                type="button"
                onClick={() => onSelectAnswer(opt.key)}
                className={`group flex w-full cursor-pointer items-center gap-3 rounded-2xl border p-3.5 text-left transition-all sm:gap-4 sm:p-5 ${
                  isSelected
                    ? "border-primary bg-primary/5 font-medium text-primary shadow-xs"
                    : "border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50"
                }`}
              >
                <span
                  className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-xl text-xs font-bold transition-colors sm:h-8 sm:w-8 sm:text-sm ${
                    isSelected
                      ? "bg-primary text-white"
                      : "bg-slate-100 text-slate-500 group-hover:bg-slate-200"
                  }`}
                >
                  {opt.key}
                </span>
                <span className="text-sm sm:text-base flex-1">{opt.text}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="mt-8 flex items-center justify-between border-t border-slate-100 pt-5 sm:mt-10 sm:pt-6">
        <Button
          variant="outline"
          iconVariant="inline"
          size="sm"
          icon="lucide:arrow-left"
          onClick={onPrev}
          disabled={currentIndex === 0}
          className="cursor-pointer"
        >
          <span className="hidden sm:inline">Sebelumnya</span>
          <span className="inline sm:hidden">Kembali</span>
        </Button>

        {isLastQuestion ? (
          <Button
            variant="warning"
            onClick={onFinish}
            icon="lucide:check-circle"
            className="cursor-pointer"
          >
            Selesai
          </Button>
        ) : (
          <Button
            variant="primary"
            onClick={onNext}
            icon="lucide:arrow-right"
            className="cursor-pointer"
          >
            Selanjutnya
          </Button>
        )}
      </div>
    </div>
  );
}
