import { Navigate } from "react-router-dom";
import { getRegistration } from "../services/registrationStorage";
import { QUIZ_STORAGE_KEY } from "../constants/mockQuestions";

type ProtectedRouteProps = {
  children: React.ReactNode;
  requireAnswers?: boolean;
};

function hasQuizAnswers(): boolean {
  try {
    const raw = localStorage.getItem(QUIZ_STORAGE_KEY + "_answers");
    if (!raw) return false;

    const parsed = JSON.parse(raw);
    return typeof parsed === "object" && Object.keys(parsed).length > 0;
  } catch {
    return false;
  }
}

export default function ProtectedRoute({
  children,
  requireAnswers = false,
}: ProtectedRouteProps) {
  const user = getRegistration();

  if (!user) {
    return <Navigate to="/register" replace />;
  }

  if (requireAnswers && !hasQuizAnswers()) {
    return <Navigate to="/test" replace />;
  }

  return <>{children}</>;
}
