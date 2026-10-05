"use client";

import { Phone, ShoppingBag } from "lucide-react";
import { useCart, cartCount, cartTotal } from "@/lib/cart-store";
import { useHydrated } from "@/lib/use-menu";
import { CONTACTS } from "@/lib/menu";
import { cn, money } from "@/lib/utils";

/** Нижняя панель на телефоне: позвонить и корзина всегда под большим пальцем. */
export function MobileBar({ className }: { className?: string }) {
  const lines = useCart((s) => s.lines);
  const setOpen = useCart((s) => s.setOpen);
  const hydrated = useHydrated();
  const count = hydrated ? cartCount(lines) : 0;
  const sum = hydrated ? cartTotal(lines) : 0;

  return (
    <div
      className={cn(
        "fixed inset-x-0 bottom-0 z-40 flex gap-2 border-t border-hairline bg-background/92 px-3 py-2.5 pb-[max(0.625rem,env(safe-area-inset-bottom))] backdrop-blur-xl sm:hidden",
        className,
      )}
    >
      <a
        href={`tel:${CONTACTS.phones[0].raw}`}
        className="inline-flex h-12 flex-1 items-center justify-center gap-2 rounded-full border border-border text-sm font-medium"
      >
        <Phone className="size-4" /> Позвонить
      </a>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="inline-flex h-12 flex-1 items-center justify-center gap-2 rounded-full bg-primary text-sm font-semibold text-primary-foreground"
      >
        <ShoppingBag className="size-4" />
        {count > 0 ? <span className="tabular-nums">{money(sum)}</span> : "Корзина"}
      </button>
    </div>
  );
}
