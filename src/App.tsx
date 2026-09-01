import logoImg from "./assets/images/logo.jpg";

function App() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6">
      <header className="mb-8 text-center">
        <img
          src={logoImg}
          alt="Scholars Today Logo"
          className="w-32 md:w-40 h-auto mx-auto rounded-xl shadow-lg mb-6"
        />
        <h1 className="text-3xl md:text-4xl font-bold text-primary">
          Scholars Today
        </h1>
        <p className="text-slate-500 mt-2">Placement Test Engine</p>
      </header>

      <main className="w-full max-w-2xl bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
        <p className="text-center text-slate-600">
          Proyek siap dikembangkan! Ruang ini akan diisi oleh form registrasi.
        </p>
      </main>
    </div>
  );
}

export default App;
