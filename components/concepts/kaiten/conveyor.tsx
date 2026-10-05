"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Plate } from "@/components/concepts/kaiten/plate";
import { usePrefersReducedMotion } from "@/lib/use-menu";
import { HIGHLIGHTS } from "@/lib/menu";
import { PLATE_TIERS } from "@/lib/plate";

/**
 * ВАУ-ЭФФЕКТ КОНЦЕПТА «КОНВЕЙЕР» — горизонтальный пин.
 *
 * Внешний контейнер высотой в несколько экранов, внутри липкий вьюпорт 100vh.
 * Вертикальный скролл двигает ленту вбок; звенья ленты едут синхронно,
 * поэтому тарелки выглядят стоящими на движущемся полотне.
 *
 * При prefers-reduced-motion пин выключается — остаётся обычная
 * горизонтальная прокрутка со scroll-snap.
 */
export function Conveyor({ onAdded }: { onAdded?: (e: { id: string; x: number; y: number }) => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  const x = useTransform(scrollYProgress, [0, 1], ["2%", "-78%"]);
  const beltX = useTransform(scrollYProgress, [0, 1], ["0px", "-1600px"]);

  if (reduced) {
    return (
      <section className="border-y border-hairline bg-surface-2 py-14">
        <ConveyorHeading />
        <div className="mt-8 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-4">
          {HIGHLIGHTS.map((item) => (
            <div key={item.id} className="w-[210px] shrink-0 snap-start">
              <Plate item={item} onAdded={onAdded} compact />
            </div>
          ))}
        </div>
        <Legend />
      </section>
    );
  }

  return (
    <section ref={ref} className="relative h-[420vh] border-y border-hairline bg-surface-2">
      <div className="sticky top-0 flex h-svh flex-col justify-center overflow-hidden">
        <ConveyorHeading />

        {/* Лента. Полотно проходит ровно под ободом тарелок,
            поэтому они выглядят стоящими на движущемся конвейере. */}
        <div
          className="relative mt-8"
          style={{ "--plate": "clamp(150px, 14vw, 216px)" } as React.CSSProperties}
        >
          <div
            className="absolute inset-x-0 overflow-hidden border-y-2 border-[var(--belt-2)] bg-[var(--belt)]"
            style={{ top: "calc(var(--plate) - 18px)", height: 34 }}
          >
            <motion.div
              className="flex h-full w-[400%] items-center"
              style={{ x: beltX }}
              aria-hidden="true"
            >
              {Array.from({ length: 90 }, (_, i) => (
                <span
                  key={i}
                  className="mx-1 h-full w-9 shrink-0 skew-x-[-18deg] bg-[var(--belt-2)]/45"
                />
              ))}
            </motion.div>
          </div>

          <motion.div className="relative flex w-max gap-7 px-[8vw]" style={{ x }}>
            {HIGHLIGHTS.map((item) => (
              <div key={item.id} className="w-(--plate) shrink-0">
                <Plate item={item} onAdded={onAdded} compact />
              </div>
            ))}
          </motion.div>
        </div>

        <Legend />
      </div>
    </section>
  );
}

function ConveyorHeading() {
  return (
    <div className="mx-auto w-full max-w-[1180px] px-4">
      <p className="font-mono text-[11px] tracking-[0.2em] text-brand uppercase">
        Лента хитов
      </p>
      <h2 className="mt-2 font-dela text-[clamp(1.8rem,4.5vw,3.2rem)] leading-[0.95]">
        Крутите вниз — <span className="text-brand">лента едет вбок</span>
      </h2>
    </div>
  );
}

function Legend() {
  return (
    <div className="mx-auto mt-10 w-full max-w-[1180px] px-4">
      <p className="mb-2 text-[11px] tracking-[0.15em] text-muted-foreground uppercase">
        Цвет тарелки = цена
      </p>
      <ul className="flex flex-wrap gap-x-4 gap-y-2">
        {PLATE_TIERS.map((t) => (
          <li key={t.id} className="flex items-center gap-1.5 text-[11px] whitespace-nowrap">
            <span
              className="size-3.5 rounded-full border border-black/15"
              style={{ background: t.color }}
            />
            {t.label}
          </li>
        ))}
      </ul>
    </div>
  );
}
