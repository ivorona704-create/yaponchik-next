import type { Metadata } from "next";
import { ThemeProvider } from "@/components/theme-provider";
import { manrope, unbounded } from "@/lib/fonts";

export const metadata: Metadata = {
  title: "Классика — первый сайт",
  description:
    "Концепт сайта «Авто суши Япончик»: тёплая песочная палитра с фото зала, логотип-маскот в шапке и всё меню одним списком.",
};

export default function ClassicLayout({ children }: LayoutProps<"/classic">) {
  return (
    <ThemeProvider storageKey="yaponchik-classic" defaultTheme="light">
      <div
        data-concept="classic"
        className={`${manrope.variable} ${unbounded.variable} flex min-h-dvh flex-col bg-background font-manrope text-foreground`}
      >
        {children}
      </div>
    </ThemeProvider>
  );
}
