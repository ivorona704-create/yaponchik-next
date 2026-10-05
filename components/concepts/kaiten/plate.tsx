"use client";

import { DishGlyph } from "@/components/shared/dish-glyph";
import { AddButton } from "@/components/shared/add-button";
import { itemPrice, type MenuItem } from "@/lib/menu";
import { plateFor } from "@/lib/plate";
import { cn, money } from "@/lib/utils";

/**
 * Тарелка кайтена. Обод красится по цене, в центре — срез блюда.
 * Под курсором тарелка поднимается и наезжает на соседей.
 */
export function Plate({
  item,
  className,
  onAdded,
  compact = false,
}: {
  item: MenuItem;
  className?: string;
  compact?: boolean;
  onAdded?: (e: { id: string; x: number; y: number }) => void;
}) {
  const price = itemPrice(item);
  const tier = plateFor(price);

  return (
    <article
      className={cn(
        "group relative flex flex-col transition-transform duration-300 ease-out hover:z-10 hover:-translate-y-2",
        className,
      )}
    >
      {/* Тарелка */}
      <div
        className="relative aspect-square w-full rounded-full shadow-[0_10px_30px_-12px_rgb(0_0_0_/_0.45)] transition-shadow duration-300 group-hover:shadow-[0_22px_44px_-14px_rgb(0_0_0_/_0.5)]"
        style={{ background: tier.color }}
      >
        <div
          className="absolute inset-[9%] rounded-full"
          style={{ background: tier.inner, boxShadow: "inset 0 2px 8px rgb(0 0 0 / 0.14)" }}
        />
        <DishGlyph
          item={item}
          style="flat"
          className="absolute inset-[19%] size-[62%] drop-shadow-[0_3px_6px_rgb(0_0_0_/_0.18)] transition-transform duration-500 group-hover:scale-105"
        />

        {item.tags?.includes("hit") && (
          <span className="absolute -top-1 right-0 rounded-full bg-brand px-2 py-0.5 text-[10px] font-bold tracking-wide text-[var(--brand-on)] uppercase">
            хит
          </span>
        )}
        {!item.tags?.includes("hit") && item.tags?.includes("new") && (
          <span className="absolute -top-1 right-0 rounded-full bg-foreground px-2 py-0.5 text-[10px] font-bold tracking-wide text-background uppercase">
            new
          </span>
        )}
      </div>

      {/* Подпись */}
      <div className="mt-3 flex items-start gap-2">
        <div className="min-w-0 flex-1">
          <h3 className={cn("leading-tight font-semibold", compact ? "text-[13px]" : "text-sm")}>
            {item.name}
          </h3>
          {!compact && item.desc && (
            <p className="mt-0.5 line-clamp-2 text-[11.5px] leading-snug text-muted-foreground">
              {item.desc}
              {item.weight ? ` · ${item.weight}` : ""}
            </p>
          )}
          <p className="mt-1 text-sm font-bold tabular-nums">
            {price === null ? (
              <span className="text-[11px] font-normal text-muted-foreground">
                цена по телефону
              </span>
            ) : (
              <>
                {item.variants?.length ? "от " : ""}
                {money(price)}
                {item.benefit && (
                  <span className="ml-1.5 text-[11px] font-semibold text-brand">
                    выгода {money(item.benefit)}
                  </span>
                )}
              </>
            )}
          </p>
        </div>

        {!item.variants?.length && (
          <AddButton item={item} onAdded={onAdded} className="bg-brand text-[var(--brand-on)]" />
        )}
      </div>

      {item.variants?.length ? (
        <AddButton item={item} onAdded={onAdded} className="mt-2 justify-start" />
      ) : null}
    </article>
  );
}
