import {
  Onest,
  Cormorant,
  Dela_Gothic_One,
  Golos_Text,
  Unbounded,
  Rampart_One,
  Manrope,
} from "next/font/google";

/** Основной текстовый шрифт всего сайта */
export const onest = Onest({
  subsets: ["latin", "cyrillic"],
  variable: "--font-onest",
  display: "swap",
});

/**
 * «Мох»: контрастная антиква для заголовков.
 * Японские минтё (Zen Old Mincho и родня) в кириллице дают полноширинные
 * глифы — заголовок рассыпается на буквы с огромными просветами.
 * Cormorant рисует кириллицу нормально и держит нужную золотую графику.
 */
export const mincho = Cormorant({
  subsets: ["latin", "cyrillic"],
  variable: "--font-mincho",
  display: "swap",
});

/* ── «Конвейер»: плотный гротеск-плакат и текст ── */
export const dela = Dela_Gothic_One({
  subsets: ["latin", "cyrillic"],
  weight: "400",
  variable: "--font-dela",
  display: "swap",
});

export const golos = Golos_Text({
  subsets: ["latin", "cyrillic"],
  variable: "--font-golos",
  display: "swap",
});

/* ── «Сэнсэй»: тяжёлый капс и звукоподражания манги ── */
export const unbounded = Unbounded({
  subsets: ["latin", "cyrillic"],
  variable: "--font-unbounded",
  display: "swap",
});

export const rampart = Rampart_One({
  subsets: ["latin", "cyrillic"],
  weight: "400",
  variable: "--font-rampart",
  display: "swap",
});

/**
 * «Классика»: пара с самого первого сайта «Япончика» —
 * Manrope в тексте и Unbounded в заголовках.
 */
export const manrope = Manrope({
  subsets: ["latin", "cyrillic"],
  variable: "--font-manrope",
  display: "swap",
});
