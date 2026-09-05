import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import ErrorBoundary from "./components/ErrorBoundary";
import PageLoader from "./components/ui/PageLoader";
import LandingPage from "./pages/Landing";

const RegistrationForm = lazy(() => import("./pages/Registration"));
const TestPage = lazy(() => import("./pages/Test"));
const ResultPage = lazy(() => import("./pages/Result"));
const TermsPage = lazy(() => import("./pages/Terms"));
const NotFoundPage = lazy(() => import("./pages/NotFound"));

function App() {
  return (
    <ErrorBoundary>
      <Router>
        <div className="flex min-h-screen flex-col bg-slate-50 font-sans">
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/register" element={<RegistrationForm />} />
              <Route path="/terms" element={<TermsPage />} />

              <Route
                path="/test"
                element={
                  <ProtectedRoute>
                    <TestPage />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/result"
                element={
                  <ProtectedRoute requireAnswers>
                    <ResultPage />
                  </ProtectedRoute>
                }
              />

              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </Suspense>
        </div>
      </Router>
    </ErrorBoundary>
  );
}

export default App;
