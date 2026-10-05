"use client";

import { Search, X, Flame, Sparkles, Droplets } from "lucide-react";
import { AddButton } from "@/components/shared/add-button";
import { DishGlyph } from "@/components/shared/dish-glyph";
import { useActiveCategory, useMenuFilter } from "@/lib/use-menu";
import { FILTERS, MENU, itemPrice, type MenuItem } from "@/lib/menu";
import { cn, money, plural } from "@/lib/utils";

const ALL_IDS = MENU.map((c) => c.id);

/**
 * Меню «Мха». Асимметрия в две колонки: слева липкий заголовок раздела
 * шириной 0.39 экрана, справа строки «название ····· цена +» —
 * тот же ритм, что в печатном меню, но с читаемым составом и контрастом.
 */
export function MossMenu() {
  const { query, setQuery, tags, toggleTag, categories, found, reset } = useMenuFilter();
  const active = useActiveCategory(ALL_IDS, 180);

  return (
    <section id="menu" className="relative">
      {/* Липкая панель: поиск, фильтры, разделы */}
      <div className="sticky top-16 z-30 border-y border-hairline bg-background/85 backdrop-blur-xl">
        <div className="mx-auto max-w-[1180px] px-4 py-3">
          <div className="flex flex-col gap-2.5 sm:flex-row sm:items-center">
            <label className="relative flex h-10 flex-1 items-center">
              <Search className="pointer-events-none absolute left-3 size-4 text-muted-foreground" />
              <span className="sr-only">Поиск по меню</span>
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Найти ролл, пиццу, соус…"
                className="h-10 w-full rounded-full border border-hairline bg-surface pl-9 pr-9 text-sm outline-none placeholder:text-muted-foreground focus-visible:border-[var(--gold-ink)] focus-visible:ring-2 focus-visible:ring-[var(--gold-ink)]/25"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => setQuery("")}
                  aria-label="Очистить поиск"
                  className="absolute right-3 text-muted-foreground hover:text-foreground"
                >
                  <X className="size-4" />
                </button>
              )}
            </label>

            <div className="flex gap-1.5 overflow-x-auto no-scrollbar">
              {FILTERS.map((f) => {
                const on = tags.includes(f.id);
                const Icon =
                  f.id === "hit" ? Flame : f.id === "new" ? Sparkles : Droplets;
                return (
                  <button
                    key={f.id}
                    type="button"
                    aria-pressed={on}
                    onClick={() => toggleTag(f.id)}
                    className={cn(
                      "inline-flex h-10 shrink-0 items-center gap-1.5 rounded-full border px-3.5 text-xs font-medium transition-colors",
                      on
                        ? "border-transparent bg-foreground text-background"
                        : "border-hairline hover:bg-secondary",
                    )}
                  >
                    <Icon className="size-3.5" />
                    {f.label}
                  </button>
                );
              })}
            </div>
          </div>

          <nav
            aria-label="Разделы меню"
            className="-mx-4 mt-2.5 flex gap-1 overflow-x-auto px-4 no-scrollbar"
          >
            {MENU.map((c, i) => (
              <a
                key={c.id}
                href={`#${c.id}`}
                className={cn(
                  "shrink-0 rounded-full px-3 py-1.5 text-xs whitespace-nowrap transition-colors",
                  active === c.id
                    ? "bg-[var(--gold-ink)] text-background"
                    : "text-muted-foreground hover:bg-secondary hover:text-foreground",
                )}
              >
                <span className="mr-1.5 tabular-nums opacity-50">
                  {String(i + 1).padStart(2, "0")}
                </span>
                {c.short}
              </a>
            ))}
          </nav>
        </div>
      </div>

      {/* Результат поиска */}
      {(query || tags.length > 0) && (
        <div className="mx-auto max-w-[1180px] px-4 pt-6">
          <p className="text-sm text-muted-foreground">
            Нашлось {found} {plural(found, ["блюдо", "блюда", "блюд"])}.{" "}
            <button onClick={reset} className="underline underline-offset-4 hover:text-foreground">
              Показать всё меню
            </button>
          </p>
        </div>
      )}

      {found === 0 && (
        <div className="mx-auto max-w-[1180px] px-4 py-24 text-center">
          <p className="font-mincho text-2xl">Ничего не нашлось</p>
          <p className="mt-2 text-sm text-muted-foreground">
            Позвоните — оператор подскажет, есть ли это блюдо сегодня.
          </p>
        </div>
      )}

      {categories.map((cat, ci) => (
        <div
          key={cat.id}
          id={cat.id}
          className="mx-auto grid max-w-[1180px] gap-x-12 px-4 py-14 md:grid-cols-[0.39fr_1fr] md:py-20"
        >
          {/* Липкая колонка раздела */}
          <div className="md:sticky md:top-[196px] md:self-start">
            <p className="font-mono text-[11px] tracking-[0.15em] text-[var(--gold-ink)] uppercase">
              {String(ci + 1).padStart(2, "0")} / {String(categories.length).padStart(2, "0")}
            </p>
            <h2 className="mt-2 font-mincho text-[clamp(2rem,5vw,3.4rem)] leading-[0.95] font-bold">
              {cat.name}
            </h2>
            <p className="mt-3 max-w-[34ch] text-sm leading-relaxed text-muted-foreground">
              {cat.desc}
            </p>
            <p className="mt-4 text-xs text-muted-foreground tabular-nums">
              {cat.items.length} {plural(cat.items.length, ["позиция", "позиции", "позиций"])}
            </p>
          </div>

          {/* Строки меню */}
          <ul className="mt-8 md:mt-0">
            {cat.items.map((item, i) => (
              <MossRow key={item.id} item={item} index={i} />
            ))}
          </ul>
        </div>
      ))}
    </section>
  );
}

function MossRow({ item, index }: { item: MenuItem; index: number }) {
  const price = itemPrice(item);
  const multi = Boolean(item.variants?.length);

  return (
    <li
      className="rise group flex items-start gap-4 border-b border-hairline py-4 last:border-0"
      style={{ "--d": `${Math.min(index, 8) * 50}ms` } as React.CSSProperties}
    >
      <DishGlyph
        item={item}
        style="line"
        className="mt-0.5 size-11 shrink-0 text-[var(--gold-ink)] transition-transform duration-500 group-hover:rotate-12"
      />

      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-baseline gap-x-2">
          <h3 className="text-[15px] font-semibold">{item.name}</h3>
          {item.tags?.includes("hit") && <Badge>хит</Badge>}
          {item.tags?.includes("new") && <Badge>новинка</Badge>}
          {item.tags?.includes("spicy") && <Badge>остро</Badge>}
          {item.benefit && <Badge>выгода {money(item.benefit)}</Badge>}

          <span className="leader hidden sm:block" />

          {!multi && (
            <span className="ml-auto shrink-0 font-mincho text-lg font-bold tabular-nums sm:ml-0">
              {price === null ? (
                <span className="text-sm font-normal text-muted-foreground">по телефону</span>
              ) : (
                money(price)
              )}
            </span>
          )}
        </div>

        {(item.desc || item.weight) && (
          <p className="mt-1 text-[13px] leading-relaxed text-muted-foreground">
            {item.desc}
            {item.weight && (
              <span className="whitespace-nowrap">
                {item.desc ? " · " : ""}
                {item.weight}
              </span>
            )}
          </p>
        )}

        {multi && <AddButton item={item} className="mt-2.5 justify-start" />}
      </div>

      {!multi && <AddButton item={item} className="mt-0.5" />}
    </li>
  );
}

function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-full border border-[var(--gold-ink)]/40 px-2 py-0.5 text-[10px] tracking-wide text-[var(--gold-ink)] uppercase">
      {children}
    </span>
  );
}
