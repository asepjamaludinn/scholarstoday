import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import HeroSection from "./pages/Landing/HeroSection";
import HowItWorks from "./pages/Landing/HowItWorks";
import Expertise from "./pages/Landing/Expertise";
import RegistrationForm from "./pages/Registration";
import TestPage from "./pages/Test";
import ResultPage from "./pages/Result";

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

function ComingSoonPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 p-6 text-center">
      <p className="text-lg font-medium text-slate-500">
        Halaman ini sedang dalam pengembangan.
      </p>
    </div>
  );
}

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/register" element={<RegistrationForm />} />
          <Route path="/test" element={<TestPage />} />
          <Route path="/result" element={<ResultPage />} />
          <Route path="*" element={<ComingSoonPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
