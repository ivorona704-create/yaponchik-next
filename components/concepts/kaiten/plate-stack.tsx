"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useCart, cartCount, cartTotal } from "@/lib/cart-store";
import { useHydrated, usePrefersReducedMotion } from "@/lib/use-menu";
import { plateFor } from "@/lib/plate";
import { cn, money } from "@/lib/utils";

/** Куда летят тарелки — счёт кайтена «пробивают» по стопке. */
export const STACK_ANCHOR_ID = "kaiten-stack";

/**
 * Корзина в виде стопки цветных тарелок: высота стопки и её цвета
 * читаются раньше суммы — ровно как счёт в кайтен-ресторане.
 */
export function PlateStack({ className }: { className?: string }) {
  const lines = useCart((s) => s.lines);
  const setOpen = useCart((s) => s.setOpen);
  const hydrated = useHydrated();

  const count = hydrated ? cartCount(lines) : 0;
  const sum = hydrated ? cartTotal(lines) : 0;

  // Каждая штука — отдельная тарелка; показываем максимум 7 верхних
  const plates = hydrated
    ? lines.flatMap((l) => Array.from({ length: l.qty }, () => plateFor(l.price))).slice(-7)
    : [];

  return (
    <button
      type="button"
      id={STACK_ANCHOR_ID}
      onClick={() => setOpen(true)}
      aria-label={count ? `Открыть заказ: ${count} шт. на ${money(sum)}` : "Открыть корзину"}
      className={cn(
        "relative inline-flex h-11 items-center gap-3 rounded-full border border-hairline bg-surface pr-4 pl-3 text-sm font-semibold transition-transform active:scale-95",
        className,
      )}
    >
      <span className="relative block h-8 w-9" aria-hidden="true">
        <AnimatePresence initial={false}>
          {plates.map((t, i) => (
            <motion.span
              key={`${i}-${t.id}`}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: -i * 3.4 }}
              exit={{ opacity: 0 }}
              transition={{ type: "spring", stiffness: 420, damping: 26 }}
              className="absolute bottom-1 left-0 h-[7px] w-9 rounded-[3px] border border-black/15"
              style={{ background: t.color, zIndex: i }}
            />
          ))}
        </AnimatePresence>
        {plates.length === 0 && (
          <span className="absolute bottom-1 left-0 h-[7px] w-9 rounded-[3px] border border-dashed border-current opacity-35" />
        )}
      </span>

      {count > 0 ? (
        <span className="tabular-nums">{money(sum)}</span>
      ) : (
        <span className="text-muted-foreground">Пусто</span>
      )}
    </button>
  );
}

interface Flight {
  key: number;
  x: number;
  y: number;
  /** Куда лететь — стопку меряем в момент клика, а не в эффекте */
  tx: number;
  ty: number;
  color: string;
}

/** Координаты стопки на момент клика по «+» */
export function stackTarget(): { tx: number; ty: number } {
  const el = document.getElementById(STACK_ANCHOR_ID);
  if (!el) return { tx: window.innerWidth - 60, ty: 30 };
  const r = el.getBoundingClientRect();
  return { tx: r.left + 22, ty: r.top + r.height / 2 };
}

/**
 * Тарелка поднимается с ленты и улетает в стопку. Живёт поверх страницы,
 * координаты берутся с кнопки «+», цель — стопка в шапке.
 */
export function PlateFlight({ flight }: { flight: Flight | null }) {
  const reduced = usePrefersReducedMotion();

  if (reduced) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden" aria-hidden="true">
      <AnimatePresence>
        {flight && (
          <motion.span
            key={flight.key}
            initial={{ x: flight.x - 24, y: flight.y - 6, scale: 1, opacity: 1 }}
            animate={{
              x: flight.tx - 18,
              y: [flight.y - 6, Math.min(flight.y, flight.ty) - 120, flight.ty - 4],
              scale: [1, 1.15, 0.45],
              opacity: [1, 1, 0.9],
            }}
            exit={{ opacity: 0, transition: { duration: 0.12 } }}
            transition={{ duration: 0.72, ease: [0.16, 1, 0.3, 1] }}
            className="absolute top-0 left-0 h-3 w-12 rounded-full border border-black/20 shadow-lg"
            style={{ background: flight.color }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

export type { Flight };
