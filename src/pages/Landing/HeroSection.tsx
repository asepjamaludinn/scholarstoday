import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";
import heroImg from "../../assets/images/hero.webp";
import heroVideo from "../../assets/videos/hero.mp4";
import Button from "../../components/ui/Button";
import Heading from "../../components/ui/Heading";
import Text from "../../components/ui/Text";

export default function HeroSection() {
  const navigate = useNavigate();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <section className="relative w-full overflow-hidden">
      <div className="relative aspect-[3/4] w-full sm:aspect-[16/10] md:aspect-[16/9] md:max-h-[820px] md:min-h-[560px]">
        <img
          src={heroImg}
          alt="Siswa belajar dengan semangat"
          width={1600}
          height={900}
          loading="eager"
          fetchPriority="high"
          className="absolute inset-0 h-full w-full object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />

        <div className="absolute left-4 right-4 top-28 sm:left-6 sm:right-auto sm:top-32 sm:max-w-md md:left-14 md:top-36 md:max-w-xl">
          <Heading level="display" className="text-primary">
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
          </Heading>
        </div>
      </div>

      <div className="relative z-10 -mt-24 flex flex-col items-center gap-4 px-4 pb-8 sm:-mt-32 sm:px-6 sm:pb-10 md:absolute md:inset-x-0 md:bottom-10 md:mt-0 md:flex-row md:items-end md:justify-between md:gap-6 md:px-14 md:pb-0">
        <div className="w-[85%] max-w-sm rounded-3xl bg-white p-2.5 shadow-2xl md:w-[55%] md:max-w-md md:p-3">
          <div
            className="group relative aspect-video overflow-hidden rounded-2xl bg-slate-200 cursor-pointer"
            onClick={togglePlay}
          >
            <video
              ref={videoRef}
              src={heroVideo}
              className="h-full w-full object-cover pointer-events-none"
              autoPlay
              loop
              muted
              playsInline
              disablePictureInPicture
              disableRemotePlayback
            />

            <div
              className={`absolute inset-0 flex items-center justify-center transition-all duration-300 ${
                isPlaying
                  ? "bg-black/0 opacity-0 group-hover:opacity-100"
                  : "bg-black/30 opacity-100"
              }`}
            >
              <div
                className={`flex h-12 w-12 items-center justify-center rounded-full bg-white/95 shadow-xl backdrop-blur-sm transition-transform duration-300 sm:h-14 sm:w-14 ${
                  isPlaying
                    ? "scale-90 group-hover:scale-100 text-slate-500"
                    : "scale-100 ring-4 ring-white/20 text-primary"
                }`}
              >
                <Icon
                  icon={isPlaying ? "lucide:pause" : "lucide:play"}
                  className={`text-xl sm:text-2xl transition-transform ${isPlaying ? "" : "translate-x-0.5"}`}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="w-full max-w-sm rounded-3xl bg-slate-900/85 p-6 backdrop-blur-md md:max-w-sm md:bg-slate-900/70">
          <Text size="lg" className="leading-relaxed text-white">
            Ikuti tes penempatan singkat kami dan dapatkan rekomendasi kelas
            yang sesuai levelmu, tanpa buang waktu belajar dari nol.
          </Text>

          <Button
            variant="primary"
            onClick={() => navigate("/register")}
            className="mt-5 w-full md:w-auto cursor-pointer"
          >
            Mulai tes sekarang
          </Button>
        </div>
      </div>
    </section>
  );
}
