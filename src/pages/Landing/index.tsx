import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";
import Seo from "../../components/Seo";
import HeroSection from "./HeroSection";
import HowItWorks from "./HowItWorks";
import Expertise from "./Expertise";

export default function LandingPage() {
  return (
    <>
      <Seo
        title="Temukan Jalur Belajar yang Tepat"
        description="Ikuti tes penempatan singkat Scholars Today dan dapatkan rekomendasi kelas Web Development, Data Science, UI/UX Design, hingga Digital Marketing sesuai levelmu."
      />
      <Navbar />
      <HeroSection />
      <HowItWorks />
      <Expertise />
      <Footer />
    </>
  );
}
