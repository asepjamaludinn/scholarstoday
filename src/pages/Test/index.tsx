import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";
import { useQuiz } from "../../hooks/useQuiz";
import Button from "../../components/ui/Button";
import Heading from "../../components/ui/Heading";
import Text from "../../components/ui/Text";

export default function TestPage() {
  const navigate = useNavigate();
  const {
    questions,
    currentIndex,
    currentQuestion,
    answers,
    answeredCount,
    totalQuestions,
    progressPercentage,
    selectAnswer,
    goToQuestion,
    nextQuestion,
    prevQuestion,
  } = useQuiz();

  const [showSubmitModal, setShowSubmitModal] = useState(false);

  const currentSelectedOption = answers[currentQuestion.id];

  const handleFinishQuiz = () => {
    setShowSubmitModal(true);
  };

  const confirmSubmit = () => {
    navigate("/result");
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <header className="w-full bg-white border-b border-slate-200 px-6 py-4 sticky top-0 z-30 shadow-xs">
        <div className="mx-auto max-w-5xl flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary font-bold">
              ST
            </span>
            <div>
              <Heading level="h4" className="text-slate-900">
                Placement Test Engine
              </Heading>
              <Text size="xs" className="text-slate-500">
                Uji kemampuan dan tentukan jalur belajarmu
              </Text>
            </div>
          </div>

          <button
            type="button"
            onClick={handleFinishQuiz}
            className="rounded-full bg-slate-100 px-4 py-2 text-small font-semibold text-slate-700 transition-colors hover:bg-slate-200 cursor-pointer"
          >
            Selesai & Kumpulkan
          </button>
        </div>
      </header>

      <main className="flex-1 mx-auto max-w-4xl w-full p-4 sm:p-6 md:py-10 flex flex-col gap-6">
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <Text size="small" className="font-semibold text-slate-700">
              Progres Pengerjaan:{" "}
              <span className="text-primary">{answeredCount}</span> dari{" "}
              {totalQuestions} soal dijawab
            </Text>
            <span className="text-small font-bold text-primary">
              {progressPercentage}%
            </span>
          </div>

          <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-primary transition-all duration-300 rounded-full"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto pt-2 pb-1 scrollbar-none">
            {questions.map((q, idx) => {
              const isAnswered = !!answers[q.id];
              const isCurrent = idx === currentIndex;

              let btnStyle =
                "bg-slate-100 text-slate-600 border-slate-200 hover:bg-slate-200";
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
                  onClick={() => goToQuestion(idx)}
                  className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border text-small font-bold transition-all cursor-pointer ${btnStyle}`}
                  title={`Soal ${idx + 1} ${isAnswered ? "(Sudah dijawab)" : ""}`}
                >
                  {idx + 1}
                </button>
              );
            })}
          </div>
        </div>

        <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-sm border border-slate-100 flex flex-col justify-between flex-1">
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                {currentQuestion.program}
              </span>
              <Text size="small" className="font-medium text-slate-400">
                Soal {currentIndex + 1} dari {totalQuestions}
              </Text>
            </div>

            <Heading level="h3" className="text-slate-900 mb-6 leading-relaxed">
              {currentQuestion.question}
            </Heading>

            <div className="space-y-3">
              {currentQuestion.options.map((opt) => {
                const isSelected = currentSelectedOption === opt.key;

                return (
                  <button
                    key={opt.key}
                    type="button"
                    onClick={() => selectAnswer(opt.key)}
                    className={`w-full flex items-center gap-4 p-4 sm:p-5 rounded-2xl border text-left transition-all cursor-pointer group ${
                      isSelected
                        ? "border-primary bg-primary/5 text-primary font-medium shadow-xs"
                        : "border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50"
                    }`}
                  >
                    <span
                      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-xl text-small font-bold transition-colors ${
                        isSelected
                          ? "bg-primary text-white"
                          : "bg-slate-100 text-slate-500 group-hover:bg-slate-200"
                      }`}
                    >
                      {opt.key}
                    </span>
                    <span className="text-body flex-1">{opt.text}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="mt-10 pt-6 border-t border-slate-100 flex items-center justify-between">
            <button
              type="button"
              onClick={prevQuestion}
              disabled={currentIndex === 0}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-slate-200 text-small font-semibold text-slate-600 transition-colors hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
            >
              <Icon icon="lucide:arrow-left" className="text-base" />
              Sebelumnya
            </button>

            {currentIndex < totalQuestions - 1 ? (
              <Button
                variant="primary"
                onClick={nextQuestion}
                icon="lucide:arrow-right"
              >
                Selanjutnya
              </Button>
            ) : (
              <Button
                variant="primary"
                onClick={handleFinishQuiz}
                icon="lucide:check-circle"
              >
                Selesai Ujian
              </Button>
            )}
          </div>
        </div>
      </main>

      {showSubmitModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl animate-in fade-in zoom-in duration-200">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary mb-4">
              <Icon icon="lucide:help-circle" className="text-2xl" />
            </div>

            <Heading level="h3" className="text-slate-900 mb-2">
              Konfirmasi Pengumpulan
            </Heading>
            <Text size="body" className="text-slate-500 mb-6">
              Kamu telah menjawab{" "}
              <span className="font-semibold text-slate-900">
                {answeredCount}
              </span>{" "}
              dari{" "}
              <span className="font-semibold text-slate-900">
                {totalQuestions}
              </span>{" "}
              soal. Yakin ingin mengakhiri kuis dan melihat hasilnya?
            </Text>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setShowSubmitModal(false)}
                className="flex-1 rounded-full border border-slate-200 py-3 text-small font-semibold text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer"
              >
                Lanjutkan Ujian
              </button>
              <button
                type="button"
                onClick={confirmSubmit}
                className="flex-1 rounded-full bg-primary py-3 text-small font-semibold text-white hover:bg-primary/90 transition-colors cursor-pointer shadow-sm"
              >
                Ya, Lihat Hasil
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
