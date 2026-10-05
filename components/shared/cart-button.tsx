"use client";

import { ShoppingBag } from "lucide-react";
import { useCart, cartCount, cartTotal } from "@/lib/cart-store";
import { useHydrated } from "@/lib/use-menu";
import { cn, money } from "@/lib/utils";

export function CartButton({ className }: { className?: string }) {
  const lines = useCart((s) => s.lines);
  const setOpen = useCart((s) => s.setOpen);
  const hydrated = useHydrated();

  const count = hydrated ? cartCount(lines) : 0;
  const sum = hydrated ? cartTotal(lines) : 0;

  return (
    <button
      type="button"
      onClick={() => setOpen(true)}
      className={cn(
        "inline-flex h-10 items-center gap-2 rounded-full bg-primary px-3.5 text-sm font-semibold text-primary-foreground transition-transform active:scale-95",
        className,
      )}
    >
      <ShoppingBag className="size-4" />
      {count > 0 ? (
        <span className="tabular-nums">{money(sum)}</span>
      ) : (
        <span>Корзина</span>
      )}
      {count > 0 && (
        <span className="grid size-5 place-items-center rounded-full bg-primary-foreground/20 text-[11px] tabular-nums">
          {count}
        </span>
      )}
    </button>
  );
}
