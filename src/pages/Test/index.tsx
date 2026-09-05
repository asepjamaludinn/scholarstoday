import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";
import { useQuiz } from "../../hooks/useQuiz";
import { useToast } from "../../hooks/useToast";
import { useBeforeUnload } from "../../hooks/useBeforeUnload";
import { useLeaveGuard } from "../../hooks/useLeaveGuard";
import Toast from "../../components/ui/Toast";
import Button from "../../components/ui/Button";
import Heading from "../../components/ui/Heading";
import Text from "../../components/ui/Text";
import TestHeader from "./components/TestHeader";
import TestSidebar from "./components/TestSidebar";
import QuestionArea from "./components/QuestionArea";
import SubmitModal from "./components/SubmitModal";
import Seo from "../../components/Seo";

export default function TestPage() {
  const navigate = useNavigate();
  const { message, variant, visible, showToast } = useToast();

  const {
    user,
    targetProgram,
    questions,
    currentIndex,
    currentQuestion,
    answers,
    answeredCount,
    totalQuestions,
    progressPercentage,
    isQuizComplete,
    selectAnswer,
    goToQuestion,
    nextQuestion,
    prevQuestion,
    resetQuiz,
  } = useQuiz({
    onAutoSave: () =>
      showToast("Jawaban tersimpan otomatis", { variant: "success" }),
    onAutoSaveError: () =>
      showToast("Gagal menyimpan jawaban, periksa penyimpanan browsermu", {
        variant: "warning",
      }),
  });

  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [showResetModal, setShowResetModal] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const currentSelectedOption = answers[currentQuestion.id];

  useLeaveGuard(
    !isSubmitted,
    "Kamu yakin ingin keluar dari kuis? Progressmu tetap tersimpan, tapi kamu perlu masuk lagi lewat menu Tes.",
    () => navigate("/", { replace: true }),
  );

  useBeforeUnload(
    !isSubmitted,
    "Progress kuismu tersimpan, tapi yakin mau meninggalkan halaman ini?",
  );

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentIndex]);

  const handleFinishQuiz = () => setShowSubmitModal(true);

  const confirmSubmit = () => {
    if (!isQuizComplete) {
      showToast("Selesaikan semua soal terlebih dahulu", {
        variant: "warning",
      });
      return;
    }

    setIsSubmitted(true);
    navigate("/result");
  };

  const handleResetQuiz = () => {
    setShowResetModal(true);
  };

  const confirmReset = () => {
    resetQuiz();
    setShowResetModal(false);
    setShowSubmitModal(false);
    showToast("Kuis diulang dari awal", { variant: "info" });
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Seo title="Kerjakan Kuis Penempatan" noIndex />
      <TestHeader user={user} onFinish={handleFinishQuiz} />

      <main className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-4 p-4 sm:p-6 md:gap-6 md:py-10 lg:grid-cols-[300px_1fr]">
        <TestSidebar
          progressPercentage={progressPercentage}
          answeredCount={answeredCount}
          totalQuestions={totalQuestions}
          currentProgram={targetProgram}
          questions={questions}
          answers={answers}
          currentIndex={currentIndex}
          onGoToQuestion={goToQuestion}
          onResetQuiz={handleResetQuiz}
        />

        <QuestionArea
          currentIndex={currentIndex}
          totalQuestions={totalQuestions}
          currentQuestion={currentQuestion}
          currentSelectedOption={currentSelectedOption}
          onSelectAnswer={selectAnswer}
          onPrev={prevQuestion}
          onNext={nextQuestion}
          onFinish={handleFinishQuiz}
        />
      </main>

      <SubmitModal
        isOpen={showSubmitModal}
        answeredCount={answeredCount}
        totalQuestions={totalQuestions}
        isComplete={isQuizComplete}
        onClose={() => setShowSubmitModal(false)}
        onConfirm={confirmSubmit}
      />

      {showResetModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-xs"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) setShowResetModal(false);
          }}
        >
          <div className="animate-in fade-in zoom-in w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl duration-200 sm:p-8">
            <div
              className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-red-100 text-red-600"
              aria-hidden="true"
            >
              <Icon icon="lucide:rotate-ccw" className="text-2xl" />
            </div>

            <Heading level="h3" className="mb-2 text-slate-900">
              Ulangi Kuis dari Awal?
            </Heading>
            <Text size="body" className="mb-6 text-slate-500">
              Semua jawaban yang sudah kamu simpan akan dihapus dan progress
              akan kembali ke 0%. Tindakan ini tidak dapat dibatalkan.
            </Text>

            <div className="flex flex-col-reverse items-stretch gap-3 sm:flex-row sm:items-center">
              <Button
                variant="outline"
                iconVariant="none"
                onClick={() => setShowResetModal(false)}
                className="flex-1 text-slate-700"
              >
                Batal
              </Button>
              <Button
                variant="warning"
                iconVariant="none"
                onClick={confirmReset}
                className="flex-1 bg-red-600 text-white shadow-sm hover:bg-red-700"
              >
                Ya, Ulangi
              </Button>
            </div>
          </div>
        </div>
      )}

      <Toast message={message} variant={variant} visible={visible} />
    </div>
  );
}
