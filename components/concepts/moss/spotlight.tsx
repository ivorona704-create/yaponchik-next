"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { usePrefersReducedMotion } from "@/lib/use-menu";

/**
 * ВАУ-ЭФФЕКТ КОНЦЕПТА «МОХ» — прожектор по курсору.
 *
 * Зал лежит двумя слоями: тёмный и освещённый. Освещённый открывается
 * CSS-маской radial-gradient, центр которой едет за курсором со сглаживанием
 * лерпом 0.1 через rAF — React при этом не перерисовывается ни разу.
 *
 * Радиус: min(420, max(160, ширина × 0.16)).
 * На телефоне пятно само плывёт вдоль стены по траектории Лиссажу (12 с),
 * касание переносит его в точку касания.
 *
 * В светлой теме «свет включён»: кадр горит целиком, прожектор гаснет.
 * Переключение сделано только классами dark:, без ветвления в JS —
 * иначе серверная разметка не совпала бы с клиентской.
 */
export function Spotlight({ className }: { className?: string }) {
  const hostRef = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    const rect = () => host.getBoundingClientRect();
    let { width, height } = rect();
    let tx = width * 0.62;
    let ty = height * 0.34;
    let x = tx;
    let y = ty;
    let pointer = false;
    let raf = 0;
    const start = performance.now();

    function setRadius() {
      const r = Math.min(420, Math.max(160, width * 0.16));
      host!.style.setProperty("--r", `${r}px`);
    }

    function onResize() {
      const r = rect();
      width = r.width;
      height = r.height;
      setRadius();
    }

    function onMove(e: PointerEvent) {
      const r = rect();
      pointer = true;
      tx = e.clientX - r.left;
      ty = e.clientY - r.top;
    }

    function onLeave() {
      pointer = false;
    }

    function frame(now: number) {
      // Пока курсора нет — пятно плывёт вдоль стены само
      if (!pointer) {
        const t = (now - start) / 1000;
        tx = width * (0.5 + 0.34 * Math.sin((t / 12) * Math.PI * 2));
        ty = height * (0.36 + 0.14 * Math.sin((t / 7.3) * Math.PI * 2));
      }
      x += (tx - x) * 0.1;
      y += (ty - y) * 0.1;
      host!.style.setProperty("--x", `${x.toFixed(1)}px`);
      host!.style.setProperty("--y", `${y.toFixed(1)}px`);
      raf = requestAnimationFrame(frame);
    }

    setRadius();
    host.style.setProperty("--x", `${x}px`);
    host.style.setProperty("--y", `${y}px`);

    window.addEventListener("resize", onResize);
    host.addEventListener("pointermove", onMove);
    host.addEventListener("pointerleave", onLeave);
    if (!reduced) raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      host.removeEventListener("pointermove", onMove);
      host.removeEventListener("pointerleave", onLeave);
    };
  }, [reduced]);

  return (
    <div ref={hostRef} className={className} aria-hidden="true">
      {/* Нижний слой: при включённом свете горит целиком, ночью почти погашен */}
      <Image
        src="/interior.jpg"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover brightness-100 saturate-100 transition-[filter] duration-700 dark:brightness-[0.22] dark:saturate-[0.5]"
      />

      {/* Освещённый слой под маской-прожектором — виден только в тёмной теме */}
      <div className="spotlight-mask absolute inset-0 opacity-0 transition-opacity duration-700 dark:opacity-100">
        <Image
          src="/interior.jpg"
          alt=""
          fill
          sizes="100vw"
          className="object-cover brightness-110 contrast-[1.05] saturate-[1.25]"
        />
        {/* Тёплый ореол лампы */}
        <div className="spotlight-glow absolute inset-0 mix-blend-soft-light" />
      </div>
    </div>
  );
}
