import { Icon } from "@iconify/react";
import IconButton from "../ui/IconButton";
import { FOOTER_SOCIAL_LINKS } from "../../constants/footer";

export default function Footer() {
  return (
    <footer className="w-full overflow-hidden rounded-t-[2.5rem] bg-slate-100 px-6 pb-10 pt-16 md:px-14 md:pt-20">
      <div className="mx-auto max-w-[1400px]">
        <div className="flex items-center justify-center gap-3">
          {FOOTER_SOCIAL_LINKS.map((social) => (
            <IconButton
              key={social.label}
              as="a"
              href={social.href}
              target="_blank"
              rel="noreferrer"
              aria-label={social.label}
            >
              <Icon icon={social.icon} className="text-sm" />
            </IconButton>
          ))}
        </div>

        <div className="mt-8 -mb-4 select-none md:mt-10">
          <span
            className="block w-full text-center text-[20vw] font-black italic leading-[0.75] tracking-tighter text-primary md:text-[9rem] lg:text-[11rem]"
            aria-hidden="true"
          >
            scholars
          </span>

          <div className="mt-1 flex items-center justify-between text-xs font-medium text-slate-400 md:text-sm">
            <span>© {new Date().getFullYear()} Scholars Today</span>
            <a href="/terms" className="transition-colors hover:text-primary">
              Syarat & Ketentuan
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
