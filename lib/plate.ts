/**
 * Цвет тарелки = цена, как в настоящем кайтен-ресторане.
 * Печатное меню заставляло сравнивать цифры мелким шрифтом;
 * здесь порядок цены виден раньше, чем прочитана сумма.
 */
export interface PlateTier {
  max: number;
  id: string;
  label: string;
  /** Обод тарелки */
  color: string;
  /** Внутреннее поле */
  inner: string;
  /** Текст на ободе */
  ink: string;
}

export const PLATE_TIERS: PlateTier[] = [
  { max: 150, id: "white", label: "до 150 ₽", color: "#F2EDE4", inner: "#FFFFFF", ink: "#17181A" },
  { max: 250, id: "green", label: "до 250 ₽", color: "#5E9B57", inner: "#EAF3E6", ink: "#12210F" },
  { max: 350, id: "blue", label: "до 350 ₽", color: "#3D6E9E", inner: "#E7EFF7", ink: "#0C1A26" },
  { max: 450, id: "red", label: "до 450 ₽", color: "#C8402F", inner: "#FAE8E4", ink: "#2A0B07" },
  { max: 900, id: "gold", label: "до 900 ₽", color: "#C79A3B", inner: "#F8EFD9", ink: "#241A05" },
  { max: Infinity, id: "black", label: "сеты", color: "#26282B", inner: "#43474C", ink: "#F4F2EE" },
];

export function plateFor(price: number | null): PlateTier {
  if (price === null) return PLATE_TIERS[0];
  return PLATE_TIERS.find((t) => price <= t.max) ?? PLATE_TIERS[PLATE_TIERS.length - 1];
}
