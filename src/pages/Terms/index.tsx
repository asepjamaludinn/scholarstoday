import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";
import Heading from "../../components/ui/Heading";
import Text from "../../components/ui/Text";
import Button from "../../components/ui/Button";
import TermsSectionItem from "./components/TermsSectionItem";
import {
  termsContent,
  TERMS_VERSION,
  TERMS_LAST_UPDATED,
} from "../../constants/termsData";
import Seo from "../../components/Seo";

export default function TermsPage() {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 selection:bg-primary selection:text-white flex flex-col">
      <Seo
        title="Syarat & Ketentuan"
        description="Baca Syarat & Ketentuan penggunaan platform Scholars Today."
      />
      <Navbar />

      <main className="flex-1 mx-auto w-full max-w-3xl px-4 pt-32 pb-20 sm:px-6 md:pt-36">
        <div className="text-center">
          <Heading level="h1" className="text-slate-900 tracking-tight">
            Syarat & Ketentuan
          </Heading>

          <div className="mt-4 flex items-center justify-center gap-2">
            <span className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-medium text-slate-600 shadow-xs">
              {TERMS_VERSION}
            </span>
            <span className="rounded-full bg-lime-100 px-3 py-1 text-xs font-medium text-slate-800">
              {TERMS_LAST_UPDATED}
            </span>
          </div>
        </div>

        <hr className="my-10 border-slate-200/60" />

        <div className="space-y-8 text-slate-700">
          <Text className="text-base leading-relaxed text-slate-800 font-medium">
            Syarat dan Ketentuan (“Ketentuan”) ini mengatur penggunaan platform
            dan layanan Scholars Today. Dengan mengakses atau menggunakan
            Scholars Today, Anda menyetujui Ketentuan ini. Jika Anda tidak
            setuju, mohon untuk tidak melanjutkan penggunaan layanan.
          </Text>

          {termsContent.map((section, index) => (
            <TermsSectionItem
              key={index}
              title={section.title}
              content={section.content}
              listItems={section.listItems}
            />
          ))}
        </div>

        <div className="mt-12 pt-6 border-t border-slate-200/60 flex justify-center">
          <Button
            variant="dark"
            onClick={() => navigate("/")}
            icon="lucide:home"
            className="px-8 cursor-pointer"
          >
            Kembali ke Beranda
          </Button>
        </div>
      </main>

      <Footer />
    </div>
  );
}
