import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import ProtectedRoute from "./components/ProtectedRoute";
import HeroSection from "./pages/Landing/HeroSection";
import HowItWorks from "./pages/Landing/HowItWorks";
import Expertise from "./pages/Landing/Expertise";
import RegistrationForm from "./pages/Registration";
import TestPage from "./pages/Test";
import ResultPage from "./pages/Result";
import NotFoundPage from "./pages/NotFound";
import TermsPage from "./pages/Terms";

function LandingPage() {
  return (
    <>
      <Navbar />
      <HeroSection />
      <HowItWorks />
      <Expertise />
      <Footer />
    </>
  );
}

function App() {
  return (
    <Router>
      <div className="flex min-h-screen flex-col bg-slate-50 font-sans">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/register" element={<RegistrationForm />} />
          <Route path="/terms" element={<TermsPage />} />{" "}
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
      </div>
    </Router>
  );
}

export default App;
