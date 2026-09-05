import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuiz } from "../../hooks/useQuiz";
import { useToast } from "../../hooks/useToast";
import { useBeforeUnload } from "../../hooks/useBeforeUnload";
import { useLeaveGuard } from "../../hooks/useLeaveGuard";
import Toast from "../../components/ui/Toast";
import TestHeader from "./components/TestHeader";
import TestSidebar from "./components/TestSidebar";
import QuestionArea from "./components/QuestionArea";
import SubmitModal from "./components/SubmitModal";

export default function TestPage() {
  const navigate = useNavigate();
  const { message, variant, visible, showToast } = useToast();

  const {
    user,
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
  } = useQuiz({
    onAutoSave: () =>
      showToast("Jawaban tersimpan otomatis", { variant: "success" }),
  });

  const [showSubmitModal, setShowSubmitModal] = useState(false);
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
    setIsSubmitted(true);
    navigate("/result");
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <TestHeader user={user} onFinish={handleFinishQuiz} />

      <main className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-4 p-4 sm:p-6 md:gap-6 md:py-10 lg:grid-cols-[300px_1fr]">
        <TestSidebar
          progressPercentage={progressPercentage}
          answeredCount={answeredCount}
          totalQuestions={totalQuestions}
          currentProgram={currentQuestion.program}
          questions={questions}
          answers={answers}
          currentIndex={currentIndex}
          onGoToQuestion={goToQuestion}
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
        onClose={() => setShowSubmitModal(false)}
        onConfirm={confirmSubmit}
      />

      <Toast message={message} variant={variant} visible={visible} />
    </div>
  );
}
