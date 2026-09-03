export interface TermSection {
  title: string;
  content: string[];
  listItems?: string[];
}

export const TERMS_VERSION = "v1.0.0";
export const TERMS_LAST_UPDATED = "3 September 2026";

export const termsContent: TermSection[] = [
  {
    title: "Tentang Scholars Today",
    content: [
      "Scholars Today adalah platform edukasi berbasis teknologi yang membantu siswa dan profesional menemukan jalur belajar, kelas pengembangan diri, serta rekomendasi penempatan program yang akurat melalui tes interaktif. Tujuan kami adalah membimbing proses belajar secara terarah dan efisien.",
    ],
  },
  {
    title: "Registrasi Akun & Data Pengguna",
    content: [
      "Anda wajib menyediakan informasi yang akurat, lengkap, dan terbaru saat mengisi formulir pendaftaran atau mengambil tes penempatan. Anda bertanggung jawab penuh atas kerahasiaan data serta aktivitas apa pun yang terjadi sehubungan dengan sesi Anda.",
      "Semua data yang Anda masukkan disimpan secara lokal di perangkat Anda atau diproses sesuai dengan kebutuhan fungsional platform untuk menghasilkan rekomendasi kelas terbaik.",
    ],
  },
  {
    title: "Data & Privasi",
    content: [
      "Kami menghargai privasi Anda. Dengan menggunakan platform ini, Anda memberikan izin kepada kami untuk memproses data jawaban kuis dan informasi kontak Anda semata-mata untuk keperluan kalkulasi hasil tes dan pengarahan konsultasi via WhatsApp.",
    ],
  },
  {
    title: "Perilaku yang Dilarang",
    content: ["Anda setuju untuk tidak:"],
    listItems: [
      "Menggunakan layanan untuk tujuan yang melanggar hukum atau berbahaya.",
      "Memanipulasi sistem kuis, melakukan scraping data, atau mengganggu infrastruktur platform.",
      "Melakukan reverse engineering, menyalin, atau menduplikasi bagian mana pun dari produk kami tanpa izin tertulis.",
    ],
  },
  {
    title: "Penghentian & Perubahan Layanan",
    content: [
      "Kami berhak menangguhkan atau menghentikan akses Anda jika ditemukan pelanggaran terhadap Ketentuan ini. Kami juga dapat memperbarui Syarat & Ketentuan ini dari waktu ke waktu. Perubahan material akan diumumkan melalui pembaruan di halaman ini.",
    ],
  },
  {
    title: "Batasan Tanggung Jawab",
    content: [
      "Sejauh diizinkan oleh hukum yang berlaku, Scholars Today beserta afiliasinya tidak bertanggung jawab atas kerugian tidak langsung, insidental, atau konsekuensial yang timbul dari penggunaan platform ini.",
      "Ketentuan ini diatur dan ditafsirkan berdasarkan hukum yang berlaku di wilayah operasional kami tanpa memandang konflik prinsip hukum.",
    ],
  },
];
