import { useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";
import { useResult } from "../../hooks/useResult";
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

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <header className="w-full bg-white border-b border-slate-200 px-6 py-4">
        <div className="mx-auto max-w-4xl flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary font-bold">
            ST
          </span>
          <div>
            <Heading level="h4" className="text-slate-900">
              Hasil Placement Test
            </Heading>
            <Text size="xs" className="text-slate-500">
              Rekomendasi kelas berdasarkan hasil kuismu
            </Text>
          </div>
        </div>
      </header>

      <main className="flex-1 mx-auto max-w-4xl w-full p-4 sm:p-6 md:py-10 flex flex-col gap-6">
        <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-sm border border-slate-100 flex flex-col items-center text-center gap-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary">
            <Icon icon="lucide:medal" className="text-3xl" />
          </div>

          {user?.fullName && (
            <Text size="body" className="text-slate-500">
              Selamat, {user.fullName}!
            </Text>
          )}

          <Heading level="h2" className="text-slate-900">
            Skormu: {scorePercentage}%
          </Heading>

          <Text size="small" className="text-slate-500">
            Menjawab benar {correctCount} dari {totalQuestions} soal untuk
            program {program}
          </Text>

          {recommendation && <div className="mt-2"></div>}
        </div>

        {recommendation ? (
          <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-sm border border-slate-100 flex flex-col gap-5">
            <div>
              <Text size="small" className="font-semibold text-primary">
                Rekomendasi Kelas
              </Text>
              <Heading level="h3" className="mt-1 text-slate-900">
                {recommendation.title}
              </Heading>
            </div>

            <Text size="body" className="text-slate-600 leading-relaxed">
              {recommendation.description}
            </Text>

            <div>
              <Text size="small" className="font-semibold text-slate-700 mb-3">
                Fokus materi:
              </Text>
              <div className="flex flex-col gap-2.5">
                {recommendation.focusAreas.map((area) => (
                  <div key={area} className="flex items-start gap-3">
                    <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
                      <Icon icon="lucide:check" className="text-sm" />
                    </span>
                    <Text size="body" className="text-slate-700">
                      {area}
                    </Text>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-sm border border-slate-100 text-center">
            <Text size="body" className="text-slate-500">
              Rekomendasi kelas belum tersedia untuk program ini.
            </Text>
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button variant="dark" onClick={() => navigate("/")}>
            Kembali ke Beranda
          </Button>
        </div>
      </main>
    </div>
  );
}
