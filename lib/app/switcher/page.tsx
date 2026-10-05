import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { ThemeProvider } from "@/components/theme-provider";
import CinematicThemeSwitcher from "@/components/ui/cinematic-theme-switcher";

export const metadata: Metadata = {
  title: "Переключатель тем",
  description:
    "Демо компонента cinematic-theme-switcher: неоморфный тумблер с пружиной и зернистыми частицами.",
};

export default function SwitcherPage() {
  return (
    <ThemeProvider storageKey="yaponchik-switcher" defaultTheme="light">
      <main className="flex min-h-dvh w-full flex-col bg-white transition-colors duration-700 ease-in-out dark:bg-[#1d1e1f]">
        <div className="mx-auto w-full max-w-[1180px] px-4 py-6">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs text-neutral-500 transition-colors hover:text-neutral-900 dark:hover:text-neutral-100"
          >
            <ArrowLeft className="size-3.5" /> Все концепты
          </Link>
        </div>

        <div className="flex flex-1 flex-col items-center justify-center gap-8 px-4 pb-24 text-center">
          <CinematicThemeSwitcher />

          <div className="max-w-[46ch] text-sm leading-relaxed text-neutral-500">
            <p>
              Компонент лежит в <code className="font-mono">components/ui/cinematic-theme-switcher.tsx</code>{" "}
              и работает через <code className="font-mono">next-themes</code>.
            </p>
            <p className="mt-3">
              На страницах концептов у каждого свой <code className="font-mono">storageKey</code>,
              поэтому «Мох» помнит вечер, а «Конвейер» — день. В шапке тумблер
              уменьшен через <code className="font-mono">scale</code>, сам компонент не тронут.
            </p>
          </div>
        </div>
      </main>
    </ThemeProvider>
  );
}
