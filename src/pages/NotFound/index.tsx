import { useNavigate } from "react-router-dom";
import Button from "../../components/ui/Button";
import Text from "../../components/ui/Text";
import Seo from "../../components/Seo";

export default function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center bg-slate-50 px-4 text-center selection:bg-primary selection:text-white">
      <Seo title="Halaman Tidak Ditemukan" noIndex />
      <div className="relative z-10 flex flex-col items-center">
        <div className="flex items-center justify-center leading-none select-none">
          <span className="text-[12rem] font-light tracking-tighter text-primary sm:text-[16rem] md:text-[20rem] lg:text-[24rem]">
            4
          </span>

          <div className="flex items-center justify-center ml-3 sm:ml-5 md:ml-7 text-primary self-center">
            <span className="text-[3rem] font-light sm:text-[4.5rem] md:text-[6rem] lg:text-[7.5rem]">
              /
            </span>
            <span className="font-mono text-[2.5rem] font-light mx-0.5 sm:text-[3.5rem] md:text-[4.5rem] lg:text-[5.5rem]">
              Ø
            </span>
            <span className="text-[3rem] font-light sm:text-[4.5rem] md:text-[6rem] lg:text-[7.5rem]">
              /
            </span>
          </div>

          <span className="text-[12rem] font-light tracking-tighter text-primary sm:text-[16rem] md:text-[20rem] lg:text-[24rem]">
            4
          </span>
        </div>

        <Text
          size="lg"
          className="mt-1 mb-8 font-medium tracking-tight text-slate-800 sm:mt-2 md:text-xl"
        >
          Halaman tidak dapat ditemukan.
        </Text>

        <Button
          variant="dark"
          onClick={() => navigate("/")}
          icon="lucide:home"
          className="px-8"
        >
          Kembali ke Beranda
        </Button>
      </div>
    </div>
  );
}
