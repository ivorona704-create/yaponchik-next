"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Phone } from "lucide-react";
import CinematicThemeSwitcher from "@/components/ui/cinematic-theme-switcher";
import { CartButton } from "@/components/shared/cart-button";
import { CONTACTS } from "@/lib/menu";
import { cn } from "@/lib/utils";

const NAV = [
  { href: "#menu", label: "Меню" },
  { href: "#hall", label: "Зал" },
  { href: "#delivery", label: "Доставка" },
  { href: "#contacts", label: "Контакты" },
];

export function MossHeader() {
  // Над первым экраном шапка прозрачная, дальше садится на подложку,
  // иначе золотые буквы легли бы прямо на строки меню.
  const [solid, setSolid] = useState(false);

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > window.innerHeight * 0.75);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "pointer-events-none fixed inset-x-0 top-0 z-40 h-16 transition-colors duration-300",
        solid && "border-b border-hairline bg-background/85 backdrop-blur-xl",
      )}
    >
      {/* Над кадром зала шапка всегда светлая — кадр тёмный в любой теме */}
      <div
        className={cn(
          "mx-auto flex h-16 max-w-[1180px] items-center gap-4 px-4",
          solid ? "text-foreground" : "text-[#F1E9D8]",
        )}
      >
        <Link href="/" className="pointer-events-auto flex items-baseline gap-2">
          <span
            className={cn(
              "font-mincho text-lg leading-none font-bold tracking-tight",
              solid ? "text-[var(--gold-ink)]" : "text-[#D8B877]",
            )}
          >
            ЯПОНЧИК
          </span>
          <span className="hidden text-[10px] tracking-[0.2em] opacity-60 uppercase sm:inline">
            авто суши
          </span>
        </Link>

        <nav className="pointer-events-auto ml-auto hidden items-center gap-6 md:flex">
          {NAV.map((n) => (
            <a
              key={n.href}
              href={n.href}
              className="text-xs tracking-wide opacity-75 uppercase transition-opacity hover:opacity-100"
            >
              {n.label}
            </a>
          ))}
        </nav>

        <div className="pointer-events-auto ml-auto flex items-center gap-2 md:ml-6">
          <a
            href={`tel:${CONTACTS.phones[0].raw}`}
            className={cn(
              "hidden h-10 items-center gap-2 rounded-full border px-3.5 text-xs font-medium transition-colors lg:inline-flex",
              solid
                ? "border-[var(--gold-ink)]/40 text-[var(--gold-ink)] hover:bg-[var(--gold-ink)]/10"
                : "border-[#D8B877]/45 text-[#D8B877] hover:bg-[#D8B877]/12",
            )}
          >
            <Phone className="size-3.5" />
            {CONTACTS.phones[0].pretty}
          </a>

          {/* Тумблер 104×64 уменьшен до 64×40, но место в строке занимал бы
              полный размер — поэтому держим его в коробке по факту. */}
          <div className="flex h-10 w-[66px] shrink-0 items-center justify-end">
            <div className="origin-right scale-[0.62]">
              <CinematicThemeSwitcher />
            </div>
          </div>

          <CartButton
            className={cn(
              "hidden sm:inline-flex",
              solid
                ? "bg-[var(--gold-ink)] text-background"
                : "bg-[#D8B877] text-[#0B140F]",
            )}
          />
        </div>
      </div>
    </header>
  );
}

