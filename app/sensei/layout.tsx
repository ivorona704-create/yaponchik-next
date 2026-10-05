import type { Metadata } from "next";
import { ThemeProvider } from "@/components/theme-provider";
import { unbounded, rampart } from "@/lib/fonts";

export const metadata: Metadata = {
  title: "Сэнсэй — манга с ворчливым поваром",
  description:
    "Концепт сайта «Авто суши Япончик»: маскот-повар комментирует заказ, палочки вместо курсора бросают кусочек ему в поднос.",
};

export default function SenseiLayout({ children }: LayoutProps<"/sensei">) {
  return (
    <ThemeProvider storageKey="yaponchik-sensei" defaultTheme="light">
      <div
        data-concept="sensei"
        className={`${unbounded.variable} ${rampart.variable} flex min-h-dvh flex-col bg-background text-foreground`}
      >
        {children}
      </div>
    </ThemeProvider>
  );
}
