"use client";

import { motion, useScroll, useSpring, useTransform } from "framer-motion";

/**
 * Плетёная лампа из зала. Раскачивается от скорости скролла —
 * пружина превращает смещение страницы в угол наклона.
 */
export function PendantLamp({ className }: { className?: string }) {
  const { scrollY } = useScroll();
  const swing = useSpring(scrollY, { stiffness: 40, damping: 14, mass: 1.1 });
  const rotate = useTransform(swing, (v) => Math.sin(v / 260) * 5);

  return (
    <motion.svg
      viewBox="0 0 120 190"
      className={className}
      style={{ rotate, transformOrigin: "60px 0px" }}
      aria-hidden="true"
      fill="none"
    >
      {/* Шнур */}
      <line x1="60" y1="0" x2="60" y2="74" stroke="currentColor" strokeWidth="2" opacity="0.7" />

      {/* Плетёный плафон — вертикальные рейки */}
      {Array.from({ length: 13 }, (_, i) => {
        const t = i / 12;
        const x = 12 + t * 96;
        const bulge = Math.sin(t * Math.PI) * 44;
        return (
          <path
            key={i}
            d={`M${x} 78 C ${x + (60 - x) * -0.12} ${78 + bulge * 0.5}, ${x + (60 - x) * -0.12} ${150 - bulge * 0.5}, ${x} 150`}
            stroke="currentColor"
            strokeWidth="2.2"
            opacity={0.35 + Math.sin(t * Math.PI) * 0.5}
            strokeLinecap="round"
          />
        );
      })}
      <ellipse cx="60" cy="78" rx="48" ry="9" stroke="currentColor" strokeWidth="2.4" />
      <ellipse cx="60" cy="150" rx="48" ry="9" stroke="currentColor" strokeWidth="2.4" />

      {/* Нить накаливания */}
      <g>
        <circle cx="60" cy="118" r="15" fill="var(--lamp, #FFCF7A)" fillOpacity="0.9" />
        <circle cx="60" cy="118" r="34" fill="var(--lamp, #FFCF7A)" fillOpacity="0.16" />
        <circle cx="60" cy="118" r="56" fill="var(--lamp, #FFCF7A)" fillOpacity="0.07" />
      </g>
    </motion.svg>
  );
}
