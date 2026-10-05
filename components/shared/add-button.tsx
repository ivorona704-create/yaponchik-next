"use client";

import { Plus, Phone } from "lucide-react";
import { useCart } from "@/lib/cart-store";
import { CONTACTS, itemPrice, type MenuItem } from "@/lib/menu";
import { cn, money } from "@/lib/utils";

/**
 * Одна кнопка «+» на позицию, либо по кнопке на каждый вариант
 * (33/40 см, 300/400/500 мл, три начинки сэндвича).
 * Если цена неизвестна — вместо корзины предлагаем позвонить:
 * в печатном меню такие позиции просто висели без цены.
 */
export function AddButton({
  item,
  className,
  onAdded,
}: {
  item: MenuItem;
  className?: string;
  onAdded?: (event: { id: string; x: number; y: number }) => void;
}) {
  const add = useCart((s) => s.add);
  const price = itemPrice(item);

  if (price === null) {
    return (
      <a
        href={`tel:${CONTACTS.phones[0].raw}`}
        className={cn(
          "inline-flex h-9 items-center gap-1.5 rounded-full border border-border px-3 text-xs font-medium whitespace-nowrap transition-colors hover:bg-muted",
          className,
        )}
      >
        <Phone className="size-3.5" />
        Уточнить цену
      </a>
    );
  }

  function fire(e: React.MouseEvent<HTMLButtonElement>) {
    const r = e.currentTarget.getBoundingClientRect();
    onAdded?.({ id: item.id, x: r.left + r.width / 2, y: r.top + r.height / 2 });
  }

  if (item.variants?.length) {
    return (
      <div className={cn("flex flex-wrap justify-end gap-1.5", className)}>
        {item.variants.map((v) => (
          <button
            key={v.label}
            type="button"
            onClick={(e) => {
              add(item, v);
              fire(e);
            }}
            className="inline-flex h-9 items-center gap-1.5 rounded-full bg-primary px-3 text-xs font-semibold whitespace-nowrap text-primary-foreground transition-transform hover:brightness-110 active:scale-95"
          >
            {v.label}
            <span className="tabular-nums opacity-80">{money(v.price)}</span>
            <Plus className="size-3.5" />
          </button>
        ))}
      </div>
    );
  }

  return (
    <button
      type="button"
      aria-label={`Добавить в заказ: ${item.name}, ${money(price)}`}
      onClick={(e) => {
        add(item);
        fire(e);
      }}
      className={cn(
        "inline-flex size-9 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground transition-transform hover:brightness-110 active:scale-90",
        className,
      )}
    >
      <Plus className="size-4" />
    </button>
  );
}
