import type { Metadata } from "next";
import { ThemeProvider } from "@/components/theme-provider";
import { mincho } from "@/lib/fonts";

export const metadata: Metadata = {
  title: "Мох — вечер в зале",
  description:
    "Концепт сайта «Авто суши Япончик»: тёмный зал, золото на мшистой стене, курсор работает как луч лампы.",
};

export default function MossLayout({ children }: LayoutProps<"/moss">) {
  return (
    <ThemeProvider storageKey="yaponchik-moss" defaultTheme="dark">
      <div data-concept="moss" className={`${mincho.variable} flex min-h-dvh flex-col bg-background text-foreground`}>
        {children}
        <div className="grain" aria-hidden="true" />
      </div>
    </ThemeProvider>
  );
}
