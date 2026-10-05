"use client";

import { motion } from "framer-motion";

export type Mood = "grumpy" | "watching" | "pleased" | "delighted";

export function moodFor(sum: number, freeFrom: number, giftFrom: number): Mood {
  if (sum >= giftFrom) return "delighted";
  if (sum >= freeFrom) return "pleased";
  if (sum > 0) return "watching";
  return "grumpy";
}

/**
 * Маскот «Япончика» — перерисовка повара со стены зала и с печатного меню.
 * Лицо привязано к сумме заказа: ворчит на пустой корзине, щурится по пути
 * к бесплатной доставке, ухмыляется на 800 ₽ и сияет на 1500 ₽.
 * На подносе появляются роллы — по одному на каждую добавленную штуку.
 *
 * Вертикальная раскладка: волосы 28–56, повязка 56–92, брови ~108,
 * глаза 126, усы 146, рот 164. Ничего не наезжает друг на друга.
 */
export function Mascot({
  mood,
  plates = 0,
  className,
}: {
  mood: Mood;
  plates?: number;
  className?: string;
}) {
  const brows = {
    grumpy: "M52 102 L84 112 M148 102 L116 112",
    watching: "M52 100 L84 110 M150 94 L118 100",
    pleased: "M54 104 L86 98 M146 104 L114 98",
    delighted: "M54 100 L86 92 M146 100 L114 92",
  }[mood];

  const mouth = {
    grumpy: "M78 172 Q100 164 122 172",
    watching: "M84 170 Q100 178 116 170",
    pleased: "M74 166 Q100 188 126 166 Q100 176 74 166 Z",
    delighted: "M70 164 Q100 198 130 164 Q100 180 70 164 Z",
  }[mood];

  const filled = mouth.endsWith("Z");

  return (
    <svg viewBox="0 0 200 268" className={className} fill="none" role="img" aria-label="Повар «Япончика»">
      {/* Тело: поварская куртка */}
      <path
        d="M50 268 L58 206 Q100 192 142 206 L150 268 Z"
        fill="var(--surface)"
        stroke="currentColor"
        strokeWidth="5"
        strokeLinejoin="round"
      />
      <path d="M76 200 L100 226 L124 200" fill="none" stroke="currentColor" strokeWidth="5" strokeLinejoin="round" />
      <text
        x="100"
        y="236"
        textAnchor="middle"
        className="font-jp"
        fontSize="20"
        fill="var(--brand)"
        aria-hidden="true"
      >
        寿司
      </text>

      {/* Голова */}
      <path
        d="M38 112 Q38 44 100 44 Q162 44 162 112 Q162 194 100 194 Q38 194 38 112 Z"
        fill="var(--surface)"
        stroke="currentColor"
        strokeWidth="5"
      />

      {/* Волосы */}
      <path d="M36 70 Q42 26 100 26 Q158 26 164 70 Q148 50 100 50 Q52 50 36 70 Z" fill="currentColor" />
      {/* Бакенбарды */}
      <path d="M38 76 Q34 104 42 122 Q46 96 48 78 Z" fill="currentColor" />
      <path d="M162 76 Q166 104 158 122 Q154 96 152 78 Z" fill="currentColor" />

      {/* Повязка хатимаки */}
      <path
        d="M30 76 Q100 54 170 76 L170 94 Q100 72 30 94 Z"
        fill="var(--surface)"
        stroke="currentColor"
        strokeWidth="4.5"
        strokeLinejoin="round"
      />
      <circle cx="100" cy="72" r="11" fill="var(--brand)" />
      {/* Концы повязки */}
      <path
        d="M168 80 L196 68 L186 86 L198 92 L168 96 Z"
        fill="var(--surface)"
        stroke="currentColor"
        strokeWidth="4.5"
        strokeLinejoin="round"
      />

      {/* Брови */}
      <path d={brows} stroke="currentColor" strokeWidth="9" strokeLinecap="round" />

      {/* Глаза */}
      {mood === "delighted" ? (
        <>
          <path d="M60 128 Q74 114 88 128" stroke="currentColor" strokeWidth="6" strokeLinecap="round" />
          <path d="M112 128 Q126 114 140 128" stroke="currentColor" strokeWidth="6" strokeLinecap="round" />
          <circle cx="54" cy="146" r="9" fill="var(--brand)" fillOpacity="0.3" />
          <circle cx="146" cy="146" r="9" fill="var(--brand)" fillOpacity="0.3" />
        </>
      ) : mood === "grumpy" ? (
        <>
          <path d="M62 126 L88 130" stroke="currentColor" strokeWidth="7" strokeLinecap="round" />
          <path d="M138 126 L112 130" stroke="currentColor" strokeWidth="7" strokeLinecap="round" />
        </>
      ) : (
        <>
          <circle cx="75" cy="126" r={mood === "watching" ? 8 : 7} fill="currentColor" />
          <circle cx="125" cy="126" r={mood === "watching" ? 8 : 7} fill="currentColor" />
        </>
      )}

      {/* Усы */}
      <path
        d="M64 152 Q84 144 100 152 Q116 144 136 152 Q126 166 100 161 Q74 166 64 152 Z"
        fill="currentColor"
      />

      {/* Рот */}
      <path
        d={mouth}
        fill={filled ? "var(--brand)" : "none"}
        stroke="currentColor"
        strokeWidth="5"
        strokeLinejoin="round"
        strokeLinecap="round"
      />

      {/* Поднос: по роллу на каждую добавленную штуку */}
      <g>
        <ellipse
          cx="100"
          cy="254"
          rx="84"
          ry="12"
          fill="var(--surface-2)"
          stroke="currentColor"
          strokeWidth="4.5"
        />
        {Array.from({ length: Math.min(plates, 7) }, (_, i) => {
          const cx = 46 + (i % 7) * 18;
          return (
            <motion.g
              key={i}
              initial={{ opacity: 0, y: -18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 380, damping: 22 }}
            >
              <circle cx={cx} cy={248} r="9" fill="var(--surface)" stroke="currentColor" strokeWidth="3.5" />
              <circle cx={cx} cy={248} r="3.6" fill="var(--brand)" />
            </motion.g>
          );
        })}
      </g>
    </svg>
  );
}

export const MOOD_LINES: Record<Mood, string> = {
  grumpy: "Пустая корзина — пустой стол. Начинай.",
  watching: "Уже теплее. Ещё немного — и повезу бесплатно.",
  pleased: "Вот это заказ! Доставка за мой счёт.",
  delighted: "Подарок твой. Специи и «Калифорния II» в пакет.",
};
