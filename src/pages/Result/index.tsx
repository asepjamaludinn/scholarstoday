import { useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";
import { useResult } from "../../hooks/useResult";
import { buildWaUrl } from "../../services/waMessage";
import logoImg from "../../assets/images/logo.jpg";
import Heading from "../../components/ui/Heading";
import Text from "../../components/ui/Text";
import Button from "../../components/ui/Button";

export default function ResultPage() {
  const navigate = useNavigate();
  const {
    user,
    program,
    correctCount,
    totalQuestions,
    scorePercentage,
    recommendation,
  } = useResult();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, []);

  const waUrl = useMemo(
    () =>
      buildWaUrl({
        user,
        program,
        scorePercentage,
        recommendation,
      }),
    [user, program, scorePercentage, recommendation],
  );

  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-50 selection:bg-primary selection:text-white">
      <div className="pointer-events-none absolute -top-40 left-1/2 h-[600px] w-[800px] -translate-x-1/2 rounded-full bg-primary/5 blur-[100px]" />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(45deg, #000 0, #000 1px, transparent 1px, transparent 14px)",
        }}
      />

      <main className="relative z-10 mx-auto flex w-full max-w-4xl flex-col gap-6 p-4 pt-10 sm:p-6 sm:pt-16 md:py-16">
        <div className="mb-5 flex items-center justify-center sm:mb-8">
          <img
            src={logoImg}
            alt="Scholars Today"
            className="h-32 w-32 rounded-full object-cover shadow-lg sm:h-40 sm:w-40"
          />
        </div>

        <div className="group relative overflow-hidden rounded-[2.5rem] bg-white p-8 text-center shadow-xl shadow-slate-200/40 ring-1 ring-slate-100 transition-transform duration-500 hover:-translate-y-1 sm:p-14">
          <div className="relative z-10 flex flex-col items-center">
            <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-xs font-semibold tracking-wide text-primary">
              TES SELESAI
            </span>

            {user?.fullName && (
              <Text size="body" className="mb-2 font-medium text-slate-500">
                Luar biasa,{" "}
                <span className="text-slate-900">{user.fullName}</span>!
              </Text>
            )}

            <h1 className="mb-2 bg-gradient-to-br from-slate-900 via-primary to-slate-800 bg-clip-text text-[5rem] font-black tracking-tighter text-transparent sm:text-[7rem] md:text-[8rem] leading-none">
              {scorePercentage}
              <span className="text-4xl text-slate-300 sm:text-6xl">%</span>
            </h1>

            <Text
              size="small"
              className="mt-4 max-w-sm text-slate-500 sm:text-base"
            >
              Kamu berhasil menjawab <b>{correctCount}</b> dari{" "}
              <b>{totalQuestions}</b> pertanyaan dengan benar pada program{" "}
              <b>{program}</b>.
            </Text>
          </div>

          <Icon
            icon="lucide:medal"
            className="absolute -right-10 -top-10 z-0 text-[15rem] text-slate-50 opacity-50 transition-transform duration-700 group-hover:scale-110 group-hover:opacity-100"
          />
        </div>

        {recommendation ? (
          <div className="relative overflow-hidden rounded-[2.5rem] bg-slate-900 p-8 shadow-2xl sm:p-12">
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-50" />

            <div className="relative z-10 flex flex-col gap-6 md:flex-row md:items-start md:gap-12">
              <div className="flex-1">
                <Text
                  size="xs"
                  className="mb-2 font-bold uppercase tracking-widest text-sky-400"
                >
                  Rekomendasi Kelas Untukmu
                </Text>
                <Heading level="h2" className="text-white mb-4">
                  {recommendation.title}
                </Heading>
                <Text
                  size="body"
                  className="text-slate-300 leading-relaxed md:text-lg"
                >
                  {recommendation.description}
                </Text>
              </div>

              <div className="w-full rounded-3xl bg-white/10 p-6 backdrop-blur-md md:w-[320px]">
                <Text size="small" className="mb-4 font-semibold text-white">
                  Fokus Pembelajaran:
                </Text>
                <div className="flex flex-col gap-3">
                  {recommendation.focusAreas.map((area) => (
                    <div key={area} className="flex items-start gap-3">
                      <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-sky-500/20 text-sky-400">
                        <Icon icon="lucide:check" className="text-sm" />
                      </span>
                      <Text size="small" className="text-slate-200">
                        {area}
                      </Text>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="rounded-[2.5rem] bg-white p-8 text-center shadow-sm ring-1 ring-slate-100 sm:p-12">
            <Text size="body" className="text-slate-500">
              Rekomendasi kelas belum tersedia untuk program ini.
            </Text>
          </div>
        )}

        <div className="mt-4 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          {waUrl ? (
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex w-full cursor-pointer items-center justify-between gap-3 rounded-full bg-[#25D366] py-3 pl-6 pr-3 text-sm font-bold tracking-tight text-white shadow-lg shadow-[#25D366]/20 transition-all hover:scale-[1.02] hover:bg-[#20ba5a] active:scale-[0.98] sm:w-auto sm:py-2.5 sm:pr-2 sm:text-base"
            >
              <span>Daftar via WhatsApp</span>
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-[#25D366] transition-transform group-hover:-rotate-12 sm:h-11 sm:w-11">
                <Icon
                  icon="ic:baseline-whatsapp"
                  className="text-xl sm:text-2xl"
                />
              </span>
            </a>
          ) : (
            <div className="flex w-full items-center gap-3 rounded-full bg-slate-100 py-3 px-6 text-sm font-medium text-slate-400 sm:w-auto">
              <Icon icon="lucide:alert-circle" className="text-base" />
              <span>Tautan WhatsApp tidak tersedia saat ini</span>
            </div>
          )}

          <Button
            variant="dark"
            onClick={() => navigate("/")}
            icon="lucide:home"
            className="w-full py-3 sm:w-auto sm:py-2.5"
          >
            Kembali ke Beranda
          </Button>
        </div>
      </main>
    </div>
  );
}
