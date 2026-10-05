"use client";

import { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useMediaQuery, usePrefersReducedMotion } from "@/lib/use-menu";

export interface Toss {
  key: number;
  x: number;
  y: number;
  /** Поднос меряем в момент клика по «+» */
  tx: number;
  ty: number;
}

/** Куда летит кусочек — поднос маскота */
export function trayTarget(targetId: string): { tx: number; ty: number } {
  const el = document.getElementById(targetId);
  if (!el) return { tx: window.innerWidth / 2, ty: window.innerHeight - 60 };
  const r = el.getBoundingClientRect();
  return { tx: r.left + r.width / 2, ty: r.top + r.height * 0.86 };
}

/**
 * ВАУ-ЭФФЕКТ КОНЦЕПТА «СЭНСЭЙ» — палочки вместо курсора.
 *
 * Палочки едут за мышью со сглаживанием лерпом 0.14, над блюдом раскрываются,
 * а по «+» кусочек летит по дуге в поднос маскота.
 * Только для мыши: на тачскрине и при prefers-reduced-motion курсор системный.
 */
export function ChopstickCursor({ toss }: { toss: Toss | null }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();
  const fine = useMediaQuery("(pointer: fine)");

  useEffect(() => {
    if (!fine || reduced) return;
    const el = ref.current;
    if (!el) return;

    let tx = -200;
    let ty = -200;
    let x = tx;
    let y = ty;
    let raf = 0;

    function onMove(e: PointerEvent) {
      tx = e.clientX;
      ty = e.clientY;
      const over = (e.target as Element | null)?.closest?.("[data-grab]");
      el!.dataset.open = over ? "1" : "0";
    }

    function frame() {
      x += (tx - x) * 0.14;
      y += (ty - y) * 0.14;
      el!.style.transform = `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, 0)`;
      raf = requestAnimationFrame(frame);
    }

    document.documentElement.classList.add("sensei-cursor");
    window.addEventListener("pointermove", onMove);
    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      document.documentElement.classList.remove("sensei-cursor");
    };
  }, [fine, reduced]);

  if (!fine || reduced) return null;

  return (
    <>
      {/* Палочки */}
      <div
        ref={ref}
        className="group pointer-events-none fixed top-0 left-0 z-[60] will-change-transform data-[open=1]:*:[--spread:9deg]"
        data-open="0"
        aria-hidden="true"
      >
        <svg viewBox="0 0 60 60" className="-ml-4 -mt-5 h-14 w-14 [--spread:2deg]">
          <g className="origin-[46px_46px] transition-transform duration-200" style={{ transform: "rotate(calc(var(--spread) * -1))" }}>
            <path d="M46 46 L8 8" stroke="#8A5A3C" strokeWidth="4" strokeLinecap="round" />
            <path d="M14 14 L8 8" stroke="#2A1A10" strokeWidth="5" strokeLinecap="round" />
          </g>
          <g className="origin-[46px_46px] transition-transform duration-200" style={{ transform: "rotate(var(--spread))" }}>
            <path d="M46 46 L20 4" stroke="#8A5A3C" strokeWidth="4" strokeLinecap="round" />
            <path d="M25 12 L20 4" stroke="#2A1A10" strokeWidth="5" strokeLinecap="round" />
          </g>
        </svg>
      </div>

      {/* Бросок в поднос */}
      <div className="pointer-events-none fixed inset-0 z-[59] overflow-hidden" aria-hidden="true">
        <AnimatePresence>
          {toss && (
            <motion.svg
              key={toss.key}
              viewBox="0 0 40 40"
              className="absolute top-0 left-0 size-9"
              initial={{ x: toss.x - 18, y: toss.y - 18, rotate: 0, scale: 1, opacity: 1 }}
              animate={{
                x: toss.tx - 18,
                y: [toss.y - 18, Math.min(toss.y, toss.ty) - 150, toss.ty - 18],
                rotate: 420,
                scale: [1, 1.1, 0.5],
                opacity: [1, 1, 0],
              }}
              exit={{ opacity: 0, transition: { duration: 0.1 } }}
              transition={{ duration: 0.78, ease: [0.16, 1, 0.3, 1] }}
            >
              <circle cx="20" cy="20" r="18" fill="var(--surface)" stroke="var(--ink)" strokeWidth="3" />
              <circle cx="20" cy="20" r="7" fill="var(--brand)" />
            </motion.svg>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
