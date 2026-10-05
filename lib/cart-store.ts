"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { CONTACTS, type MenuItem } from "@/lib/menu";
import { money } from "@/lib/utils";

export interface CartLine {
  /** id + вариант — одна позиция корзины */
  key: string;
  id: string;
  name: string;
  variant?: string;
  price: number;
  qty: number;
}

interface CartState {
  lines: CartLine[];
  open: boolean;
  /** Растёт при каждом добавлении — по нему концепты запускают свою анимацию */
  pulse: number;
  lastAdded: string | null;
  add: (item: MenuItem, variant?: { label: string; price: number }) => void;
  changeQty: (key: string, delta: number) => void;
  remove: (key: string) => void;
  clear: () => void;
  setOpen: (open: boolean) => void;
}

const keyOf = (id: string, variant?: string) => (variant ? `${id}::${variant}` : id);

export const useCart = create<CartState>()(
  persist(
    (set) => ({
      lines: [],
      open: false,
      pulse: 0,
      lastAdded: null,

      add: (item, variant) => {
        const price = variant ? variant.price : item.price;
        if (typeof price !== "number") return; // «уточните по телефону» — в корзину не кладём

        const key = keyOf(item.id, variant?.label);
        set((s) => {
          const existing = s.lines.find((l) => l.key === key);
          const lines = existing
            ? s.lines.map((l) => (l.key === key ? { ...l, qty: l.qty + 1 } : l))
            : [
                ...s.lines,
                { key, id: item.id, name: item.name, variant: variant?.label, price, qty: 1 },
              ];
          return { lines, pulse: s.pulse + 1, lastAdded: item.id };
        });
      },

      changeQty: (key, delta) =>
        set((s) => ({
          lines: s.lines
            .map((l) => (l.key === key ? { ...l, qty: l.qty + delta } : l))
            .filter((l) => l.qty > 0),
        })),

      remove: (key) => set((s) => ({ lines: s.lines.filter((l) => l.key !== key) })),
      clear: () => set({ lines: [] }),
      setOpen: (open) => set({ open }),
    }),
    {
      name: "yaponchik-cart",
      storage: createJSONStorage(() => localStorage),
      partialize: (s) => ({ lines: s.lines }) as unknown as CartState,
    },
  ),
);

/* ─────────────────────────── Производные ─────────────────────────── */

export const cartTotal = (lines: CartLine[]) =>
  lines.reduce((sum, l) => sum + l.price * l.qty, 0);

export const cartCount = (lines: CartLine[]) => lines.reduce((n, l) => n + l.qty, 0);

/** Текст заказа — уходит в WhatsApp одним сообщением */
export function orderText(lines: CartLine[]): string {
  const sum = cartTotal(lines);
  const free = sum >= CONTACTS.freeDeliveryFrom;

  const out: string[] = [`Заказ с сайта «${CONTACTS.name}»`, ""];

  lines.forEach((l, i) => {
    const name = l.variant ? `${l.name} (${l.variant})` : l.name;
    out.push(`${i + 1}. ${name} — ${l.qty} × ${money(l.price)} = ${money(l.price * l.qty)}`);
  });

  out.push("");
  out.push(`Итого: ${money(sum)}`);
  out.push(
    free
      ? `Доставка бесплатная (заказ от ${money(CONTACTS.freeDeliveryFrom)})`
      : `До бесплатной доставки не хватает ${money(CONTACTS.freeDeliveryFrom - sum)}`,
  );
  if (sum >= CONTACTS.giftFrom) {
    out.push("К заказу полагается подарок — набор специй и ролл «Калифорния II»");
  }
  out.push("");
  out.push("Имя:");
  out.push("Адрес:");
  out.push("Телефон:");

  return out.join("\n");
}

export function whatsappHref(lines: CartLine[]): string {
  return `https://wa.me/${CONTACTS.whatsapp}?text=${encodeURIComponent(orderText(lines))}`;
}
