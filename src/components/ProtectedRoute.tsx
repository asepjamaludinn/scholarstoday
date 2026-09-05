import { Navigate } from "react-router-dom";
import { getRegistration } from "../services/registrationStorage";
import { hasQuizAnswers } from "../services/quizStorage";

type ProtectedRouteProps = {
  children: React.ReactNode;
  requireAnswers?: boolean;
};

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
