import { useNavigate } from "react-router-dom";
import heroImg from "../../assets/images/hero.jpg";
import heroVideo from "../../assets/videos/hero.mp4";
import Button from "../../components/ui/Button";

export default function HeroSection() {
  const navigate = useNavigate();

  return (
    <section className="relative w-full overflow-hidden">
      <div className="relative mx-auto aspect-[16/9] w-full max-h-[820px] min-h-[560px]">
        <img
          src={heroImg}
          alt="Siswa belajar dengan semangat"
          className="absolute inset-0 h-full w-full object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />

        <div className="absolute left-6 top-24 max-w-xl md:left-14 md:top-28">
          <h1 className="text-5xl font-black leading-[1.05] tracking-tight text-primary sm:text-6xl lg:text-7xl">
            Temukan jalur
            <br />
            <span
              className="px-1"
              style={{ boxShadow: "inset 0 -0.32em 0 0 #bef264" }}
            >
              belajar yang tepat
            </span>
            <br />
            untukmu
          </h1>
        </div>

        <div className="absolute bottom-6 left-6 w-[70%] max-w-sm rounded-3xl bg-white p-3 shadow-xl md:bottom-10 md:left-14 md:max-w-md">
          <div className="relative aspect-video overflow-hidden rounded-2xl bg-slate-200">
            <video
              src={heroVideo}
              className="h-full w-full object-cover"
              controls
              preload="metadata"
            />
          </div>
        </div>

        <div className="absolute bottom-6 right-6 max-w-xs rounded-3xl bg-slate-900/70 p-6 backdrop-blur-md md:bottom-10 md:right-14 md:max-w-sm">
          <p className="text-sm font-medium leading-relaxed text-white md:text-base">
            Ikuti tes penempatan singkat kami dan dapatkan rekomendasi kelas
            yang sesuai levelmu, tanpa buang waktu belajar dari nol.
          </p>

          <Button
            variant="primary"
            onClick={() => navigate("/register")}
            className="mt-5"
          >
            Mulai tes sekarang
          </Button>
        </div>
      </div>
    </section>
  );
}
