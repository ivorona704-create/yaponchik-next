import type { Metadata } from "next";
import { ThemeProvider } from "@/components/theme-provider";
import { dela, golos } from "@/lib/fonts";

export const metadata: Metadata = {
  title: "Конвейер — кайтен-суши",
  description:
    "Концепт сайта «Авто суши Япончик»: лента кайтена едет вбок от вертикального скролла, цвет тарелки означает цену.",
};

export default function KaitenLayout({ children }: LayoutProps<"/kaiten">) {
  return (
    <ThemeProvider storageKey="yaponchik-kaiten" defaultTheme="light">
      <div
        data-concept="kaiten"
        className={`${dela.variable} ${golos.variable} flex min-h-dvh flex-col bg-background font-golos text-foreground`}
      >
        {children}
      </div>
    </ThemeProvider>
  );
}
