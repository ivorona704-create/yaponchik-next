"use client";

import { CONTACTS } from "@/lib/menu";
import { money } from "@/lib/utils";

/**
 * Две шкалы вместо одной: до бесплатной доставки (800 ₽) и до подарка (1500 ₽).
 * В печатном меню подарок спрятан мелким текстом на обложке — здесь он
 * становится целью, к которой видно расстояние.
 */
export function DeliveryMeter({ sum, compact = false }: { sum: number; compact?: boolean }) {
  const { freeDeliveryFrom, giftFrom } = CONTACTS;
  const free = sum >= freeDeliveryFrom;
  const gift = sum >= giftFrom;

  const target = free ? giftFrom : freeDeliveryFrom;
  const progress = Math.min(1, sum / target);
  const left = Math.max(0, target - sum);

  const label = gift
    ? "Доставка бесплатно и подарок ваш"
    : free
      ? `Доставка бесплатная. До подарка ещё ${money(left)}`
      : `До бесплатной доставки ${money(left)}`;

  return (
    <div>
      <p
        className={
          compact
            ? "mb-1.5 text-[11px] font-medium"
            : "mb-2 text-xs font-medium"
        }
      >
        {gift ? "🎁 " : free ? "🛵 " : ""}
        {label}
      </p>
      <div
        className="h-1.5 w-full overflow-hidden rounded-full bg-muted"
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={target}
        aria-valuenow={Math.min(sum, target)}
        aria-label={label}
      >
        <div
          className="h-full rounded-full bg-primary transition-[width] duration-500 ease-out"
          style={{ width: `${Math.max(progress * 100, sum > 0 ? 6 : 0)}%` }}
        />
      </div>
    </div>
  );
}
