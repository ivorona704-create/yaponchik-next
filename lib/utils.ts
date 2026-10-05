export { cn } from "cn";

/** «480 ₽». Неразрывный пробел перед знаком рубля. */
export function money(value: number): string {
  return `${value.toLocaleString("ru-RU")} ₽`;
}

/** Склонение: 1 блюдо / 2 блюда / 5 блюд */
export function plural(n: number, forms: [string, string, string]): string {
  const abs = Math.abs(n) % 100;
  const last = abs % 10;
  if (abs > 10 && abs < 20) return forms[2];
  if (last > 1 && last < 5) return forms[1];
  if (last === 1) return forms[0];
  return forms[2];
}

/** Стабильное псевдослучайное число 0..1 из строки — чтобы иллюстрации не повторялись. */
export function hashUnit(seed: string): number {
  let h = 2166136261;
  for (let i = 0; i < seed.length; i++) {
    h ^= seed.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return ((h >>> 0) % 10000) / 10000;
}
