import { Icon } from "@iconify/react";
import IconButton from "../ui/IconButton";
import { FOOTER_SOCIAL_LINKS } from "../../constants/footer";

export default function Footer() {
  return (
    <footer className="w-full overflow-hidden rounded-t-[2.5rem] bg-white px-4 pb-8 pt-12 sm:px-6 sm:pb-10 sm:pt-16 md:px-14 md:pt-20">
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

        <div className="mt-6 select-none sm:mt-8">
          <span
            className="block w-full whitespace-nowrap text-center font-black italic text-wordmark text-primary"
            aria-hidden="true"
          >
            scholarstoday
          </span>

          <div className="mt-3 flex flex-col items-center gap-1.5 text-center text-xs font-medium text-slate-400 sm:mt-2 sm:flex-row sm:items-center sm:justify-between sm:gap-0 sm:text-left sm:text-small">
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
