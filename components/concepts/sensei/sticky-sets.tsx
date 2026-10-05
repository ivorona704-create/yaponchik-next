"use client";

import { useEffect, useRef, useState } from "react";
import { DishGlyph } from "@/components/shared/dish-glyph";
import { AddButton } from "@/components/shared/add-button";
import { MENU, type MenuItem } from "@/lib/menu";
import { usePrefersReducedMotion } from "@/lib/use-menu";
import { money } from "@/lib/utils";

const SETS = MENU.find((c) => c.id === "sets")!.items.filter((i) => i.benefit).slice(0, 5);

/**
 * Липкая стопка сетов: карточки наезжают друг на друга и приклеиваются.
 * Каждая следующая на 3% мельче, сдвиг индекс × 28 px.
 * Выгода докручивается цифрами при появлении.
 */
export function StickySets() {
  return (
    <section className="border-y-2 border-current bg-surface-2">
      <div className="mx-auto max-w-[1180px] px-4 py-16">
        <p className="font-mono text-[11px] tracking-[0.2em] text-brand uppercase">Сеты</p>
        <h2 className="mt-2 font-unbounded text-[clamp(1.8rem,5.5vw,3.6rem)] leading-[0.95] font-extrabold tracking-tight uppercase italic">
          Собрано за вас
        </h2>
        <p className="mt-3 max-w-[48ch] text-sm text-muted-foreground">
          В печатном меню выгода пряталась за значком «%50 р.». Здесь видно
          сразу: сколько рублей вы экономите против сборки теми же позициями.
        </p>
      </div>

      {SETS.map((item, i) => (
        <div key={item.id} className="sticky top-[76px] h-[85vh] px-4">
          <SetCard item={item} index={i} />
        </div>
      ))}
    </section>
  );
}

function SetCard({ item, index }: { item: MenuItem; index: number }) {
  return (
    <article
      className="mx-auto grid max-w-[1000px] gap-6 overflow-hidden rounded-3xl border-2 border-current bg-surface p-6 shadow-[8px_8px_0_var(--brand)] sm:grid-cols-[1fr_auto] sm:p-9"
      style={{
        transform: `scale(${1 - index * 0.03}) translateY(${index * 28}px)`,
        transformOrigin: "top center",
      }}
    >
      <div>
        <p className="font-mono text-[11px] tracking-[0.18em] text-muted-foreground uppercase">
          {String(index + 1).padStart(2, "0")} / {String(SETS.length).padStart(2, "0")}
          {item.weight ? ` · ${item.weight}` : ""}
        </p>
        <h3 className="mt-2 font-unbounded text-[clamp(1.6rem,4.5vw,2.8rem)] leading-none font-extrabold uppercase italic">
          {item.name}
        </h3>
        <p className="mt-4 max-w-[52ch] text-sm leading-relaxed">{item.desc}</p>

        <div className="mt-7 flex flex-wrap items-end gap-x-8 gap-y-4">
          <div>
            <p className="font-mono text-[10px] tracking-[0.16em] text-muted-foreground uppercase">
              Цена
            </p>
            <p className="font-unbounded text-3xl leading-none font-extrabold tabular-nums">
              {money(item.price!)}
            </p>
          </div>
          {item.benefit && (
            <div>
              <p className="font-mono text-[10px] tracking-[0.16em] text-muted-foreground uppercase">
                Выгода
              </p>
              <p className="font-unbounded text-3xl leading-none font-extrabold text-brand tabular-nums">
                <CountUp to={item.benefit} /> ₽
              </p>
            </div>
          )}
          <AddButton item={item} className="h-12 w-12 bg-brand text-[var(--brand-on)]" />
        </div>
      </div>

      <DishGlyph
        item={item}
        style="ink"
        className="size-36 self-center justify-self-center text-[var(--ink)] sm:size-48"
      />
    </article>
  );
}

/** Резкий старт, долгий доезд */
function CountUp({ to }: { to: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const reduced = usePrefersReducedMotion();
  const [value, setValue] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el || reduced) return;

    let raf = 0;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        const start = performance.now();
        const tick = (now: number) => {
          const t = Math.min(1, (now - start) / 1400);
          setValue(Math.round(to * (1 - Math.pow(1 - t, 4))));
          if (t < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [to, reduced]);

  return <span ref={ref}>{reduced ? to : value}</span>;
}
