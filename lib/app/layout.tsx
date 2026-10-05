import type { Metadata, Viewport } from "next";
import { onest } from "@/lib/fonts";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://yaponchik.example"),
  title: {
    default: "Авто суши Япончик — Александров-Гай",
    template: "%s · Авто суши Япончик",
  },
  description:
    "Роллы, суши, пицца, удон и бургеры в с. Александров-Гай, ул. Красного Бойца, 41. Доставка бесплатно от 800 ₽, заказы с 9:00 до 21:40.",
  openGraph: {
    type: "website",
    locale: "ru_RU",
    siteName: "Авто суши Япончик",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#F4EEE2" },
    { media: "(prefers-color-scheme: dark)", color: "#0F1C14" },
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="ru"
      data-scroll-behavior="smooth"
      suppressHydrationWarning
      className={`${onest.variable} h-full scroll-smooth antialiased`}
    >
      <body className="flex min-h-full flex-col">{children}</body>
    </html>
  );
}
