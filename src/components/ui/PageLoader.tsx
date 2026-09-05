import { Icon } from "@iconify/react";

export default function PageLoader() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50">
      <Icon
        icon="lucide:loader-2"
        className="animate-spin text-4xl text-primary"
      />
    </div>
  );
}
