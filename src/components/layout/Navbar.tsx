import { useNavigate } from "react-router-dom";
import logoImg from "../../assets/images/logo.jpg";
import Button from "../ui/Button";

export default function Navbar() {
  const navigate = useNavigate();

  return (
    <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-5xl flex items-center justify-between px-6 py-3 bg-white/80 backdrop-blur-md shadow-sm ring-1 ring-slate-900/5 rounded-full">
      <div className="flex items-center gap-3 cursor-pointer">
        <img
          src={logoImg}
          alt="Scholars Today Logo"
          width={40}
          height={40}
          loading="eager"
          fetchPriority="high"
          className="h-10 w-10 object-cover rounded-full"
        />
      </div>

      <Button variant="primary" onClick={() => navigate("/register")}>
        Mulai
      </Button>
    </nav>
  );
}
