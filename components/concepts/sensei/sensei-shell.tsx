"use client";

import Link from "next/link";
import { useCallback, useState } from "react";
import { Phone, Search, X, ShoppingBag } from "lucide-react";
import CinematicThemeSwitcher from "@/components/ui/cinematic-theme-switcher";
import { DishGlyph } from "@/components/shared/dish-glyph";
import { AddButton } from "@/components/shared/add-button";
import { CartSheet } from "@/components/shared/cart-sheet";
import { StickySets } from "@/components/concepts/sensei/sticky-sets";
import { Mascot, MOOD_LINES, moodFor } from "@/components/concepts/sensei/mascot";
import {
  ChopstickCursor,
  trayTarget,
  type Toss,
} from "@/components/concepts/sensei/chopstick-cursor";
import { Wordmark } from "@/components/concepts/sensei/wordmark";
import { useCart, cartCount, cartTotal } from "@/lib/cart-store";
import { useActiveCategory, useHydrated, useMenuFilter } from "@/lib/use-menu";
import { CONTACTS, FILTERS, ITEM_COUNT, MENU, itemPrice, type MenuItem } from "@/lib/menu";
import { cn, money, plural } from "@/lib/utils";

const ALL_IDS = MENU.map((c) => c.id);
const MASCOT_ID = "sensei-mascot";

export function SenseiShell() {
  const { query, setQuery, tags, toggleTag, categories, found, reset } = useMenuFilter();
  const active = useActiveCategory(ALL_IDS, 190);
  const [toss, setToss] = useState<Toss | null>(null);

  const lines = useCart((s) => s.lines);
  const setOpen = useCart((s) => s.setOpen);
  const hydrated = useHydrated();
  const sum = hydrated ? cartTotal(lines) : 0;
  const count = hydrated ? cartCount(lines) : 0;
  const mood = moodFor(sum, CONTACTS.freeDeliveryFrom, CONTACTS.giftFrom);

  const handleAdded = useCallback(({ x, y }: { x: number; y: number }) => {
    setToss({ key: Date.now(), x, y, ...trayTarget(MASCOT_ID) });
  }, []);

  const left = Math.max(0, CONTACTS.freeDeliveryFrom - sum);
  const line =
    mood === "watching" ? `Ещё ${money(left)} — и повезу бесплатно.` : MOOD_LINES[mood];

  return (
    <>
      {/* ═══════════════ ШАПКА ═══════════════ */}
      <header className="sticky top-0 z-40 border-b-2 border-current bg-background">
        <div className="mx-auto flex h-[74px] max-w-[1180px] items-center gap-4 px-4">
          <Link
            href="/"
            className="font-unbounded text-xl leading-none font-black tracking-tight uppercase italic"
          >
            Япон<span className="text-brand">чик</span>
          </Link>

          <nav className="ml-auto hidden items-center gap-5 md:flex">
            {[
              ["#menu", "Меню"],
              ["#sets", "Сеты"],
              ["#hall", "Зал"],
              ["#contacts", "Контакты"],
            ].map(([href, label]) => (
              <a
                key={href}
                href={href}
                className="font-unbounded text-[11px] font-bold tracking-wide uppercase transition-colors hover:text-brand"
              >
                {label}
              </a>
            ))}
          </nav>

          <a
            href={`tel:${CONTACTS.phones[0].raw}`}
            className="ml-auto hidden h-11 items-center gap-2 border-2 border-current bg-brand px-4 text-xs font-bold text-[var(--brand-on)] shadow-[3px_3px_0_var(--ink)] md:ml-0 md:inline-flex"
          >
            <Phone className="size-3.5" />
            <span className="hidden lg:inline">{CONTACTS.phones[0].pretty}</span>
          </a>

          {/* Тумблер 104×64 уменьшен до 64×40, но место в строке занимал бы
              полный размер — поэтому держим его в коробке по факту. */}
          <div className="flex h-10 w-[66px] shrink-0 items-center justify-end">
            <div className="origin-right scale-[0.62]">
              <CinematicThemeSwitcher />
            </div>
          </div>

          <button
            type="button"
            onClick={() => setOpen(true)}
            data-grab
            className="inline-flex h-11 items-center gap-2 border-2 border-current bg-surface px-3.5 text-sm font-bold shadow-[3px_3px_0_var(--brand)]"
          >
            <ShoppingBag className="size-4" />
            {count > 0 ? <span className="tabular-nums">{money(sum)}</span> : "Корзина"}
          </button>
        </div>
      </header>

      {/* ═══════════════ ПЕРВЫЙ ЭКРАН ═══════════════ */}
      <section className="relative overflow-hidden border-b-2 border-current">
        {/* Растр манги на фоне */}
        <div
          className="halftone pointer-events-none absolute inset-0 opacity-[0.16]"
          style={{ "--halftone-color": "var(--brand)" } as React.CSSProperties}
          aria-hidden="true"
        />

        <div className="relative mx-auto max-w-[1180px] px-4 pt-10 pb-0">
          <p className="font-mono text-[11px] tracking-[0.2em] text-brand uppercase">
            {CONTACTS.city} · {CONTACTS.street}
          </p>

          {/* Капс во всю ширину — SVG, поэтому слово всегда в край экрана */}
          <h1 className="mt-4">
            <Wordmark className="block w-full">ЯПОНЧИК</Wordmark>
          </h1>

          <div className="mt-6 grid items-end gap-8 md:grid-cols-[1fr_auto]">
            <div>
              <p className="max-w-[46ch] text-[15px] leading-relaxed">
                Роллы, суши, пицца и удон. Готовим под заказ, везём сами.
                Сэнсэй смотрит в вашу корзину и комментирует — не обижайтесь,
                он такой со всеми.
              </p>

              <div className="mt-7 flex flex-wrap gap-3">
                <a
                  href="#menu"
                  data-grab
                  className="inline-flex h-12 items-center border-2 border-current bg-brand px-6 font-unbounded text-sm font-bold text-[var(--brand-on)] uppercase shadow-[5px_5px_0_var(--ink)] transition-transform active:translate-x-[2px] active:translate-y-[2px] active:shadow-[3px_3px_0_var(--ink)]"
                >
                  Меню · {ITEM_COUNT}
                </a>
                <a
                  href={`tel:${CONTACTS.phones[0].raw}`}
                  className="inline-flex h-12 items-center gap-2 border-2 border-current bg-surface px-5 text-sm font-bold shadow-[5px_5px_0_var(--brand)]"
                >
                  <Phone className="size-4" /> {CONTACTS.phones[0].pretty}
                </a>
              </div>
            </div>

            {/* Маскот + облако реплики */}
            <div className="relative mx-auto w-[min(320px,78vw)] md:mx-0">
              <div className="absolute -top-2 -left-6 z-10 max-w-[230px] border-2 border-current bg-surface px-3.5 py-2.5 text-[13px] leading-snug font-semibold shadow-[4px_4px_0_var(--brand)] md:-left-28">
                {line}
                <span
                  className="absolute -bottom-[10px] left-10 size-0 border-x-[9px] border-t-[10px] border-x-transparent"
                  style={{ borderTopColor: "var(--ink)" }}
                  aria-hidden="true"
                />
              </div>
              <Mascot
                mood={mood}
                plates={count}
                className="w-full text-[var(--ink)]"
              />
              <span id={MASCOT_ID} className="absolute inset-0" aria-hidden="true" />
            </div>
          </div>
        </div>

        {/* Бегущая лента реплик */}
        <div className="mt-10 overflow-hidden border-t-2 border-current bg-brand py-2 text-[var(--brand-on)]">
          <div
            className="marquee-track flex w-max"
            style={{ "--marquee-duration": "42s" } as React.CSSProperties}
          >
            {[0, 1].map((dup) => (
              <span key={dup} className="flex shrink-0 items-center">
                {[
                  "Рис варим порционно",
                  "Рыбу режем после звонка",
                  "Возим сами, без агрегаторов",
                  `Бесплатно от ${money(CONTACTS.freeDeliveryFrom)}`,
                  `Подарок от ${money(CONTACTS.giftFrom)}`,
                  `Каждый день ${CONTACTS.hoursShort}`,
                ].map((t) => (
                  <span
                    key={t}
                    className="px-5 font-unbounded text-[11px] font-bold tracking-wide whitespace-nowrap uppercase"
                  >
                    {t} <span className="opacity-50">✦</span>
                  </span>
                ))}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ СЕТЫ ═══════════════ */}
      <div id="sets">
        <StickySets />
      </div>

      {/* ═══════════════ МЕНЮ ═══════════════ */}
      <section id="menu">
        <div className="sticky top-[74px] z-30 border-b-2 border-current bg-background">
          <div className="mx-auto max-w-[1180px] px-4 py-3">
            <div className="flex flex-col gap-2.5 sm:flex-row">
              <label className="relative flex h-11 flex-1 items-center">
                <Search className="pointer-events-none absolute left-3 size-4" />
                <span className="sr-only">Поиск по меню</span>
                <input
                  type="search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Найти ролл, пиццу, соус…"
                  className="h-11 w-full border-2 border-current bg-surface pr-9 pl-9 text-sm font-medium outline-none focus-visible:shadow-[3px_3px_0_var(--brand)]"
                />
                {query && (
                  <button
                    type="button"
                    onClick={() => setQuery("")}
                    aria-label="Очистить поиск"
                    className="absolute right-3"
                  >
                    <X className="size-4" />
                  </button>
                )}
              </label>

              <div className="flex gap-1.5 overflow-x-auto no-scrollbar">
                {FILTERS.map((f) => (
                  <button
                    key={f.id}
                    type="button"
                    aria-pressed={tags.includes(f.id)}
                    onClick={() => toggleTag(f.id)}
                    className={cn(
                      "h-11 shrink-0 border-2 border-current px-3.5 font-unbounded text-[11px] font-bold uppercase transition-all",
                      tags.includes(f.id)
                        ? "bg-brand text-[var(--brand-on)] shadow-[3px_3px_0_var(--ink)]"
                        : "bg-surface hover:shadow-[3px_3px_0_var(--brand)]",
                    )}
                  >
                    {f.label}
                  </button>
                ))}
              </div>
            </div>

            <nav
              aria-label="Разделы меню"
              className="-mx-4 mt-2.5 flex gap-1.5 overflow-x-auto px-4 no-scrollbar"
            >
              {MENU.map((c) => (
                <a
                  key={c.id}
                  href={`#${c.id}`}
                  className={cn(
                    "shrink-0 border-2 border-current px-3 py-1.5 text-[11px] font-bold whitespace-nowrap uppercase transition-colors",
                    active === c.id
                      ? "bg-[var(--ink)] text-background"
                      : "bg-surface hover:bg-secondary",
                  )}
                >
                  {c.short}
                </a>
              ))}
            </nav>
          </div>
        </div>

        <div className="mx-auto max-w-[1180px] px-4">
          {(query || tags.length > 0) && (
            <p className="pt-6 text-sm">
              Нашлось {found} {plural(found, ["блюдо", "блюда", "блюд"])}.{" "}
              <button onClick={reset} className="font-bold text-brand underline underline-offset-4">
                Показать всё меню
              </button>
            </p>
          )}

          {found === 0 && (
            <div className="py-24 text-center">
              <p className="font-rampart text-3xl text-brand">Пусто!</p>
              <p className="mt-3 text-sm text-muted-foreground">
                Позвоните — оператор подскажет, есть ли это блюдо сегодня.
              </p>
            </div>
          )}

          {categories.map((cat) => (
            <div key={cat.id} id={cat.id} className="py-12">
              <div className="mb-6 flex flex-wrap items-baseline gap-x-4">
                <h2 className="font-unbounded text-[clamp(1.5rem,4vw,2.4rem)] leading-none font-extrabold uppercase italic">
                  {cat.name}
                </h2>
                <p className="text-[13px] text-muted-foreground">{cat.desc}</p>
              </div>

              <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {cat.items.map((item) => (
                  <SenseiPanel key={item.id} item={item} onAdded={handleAdded} />
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <ChopstickCursor toss={toss} />

      {/* Нижняя панель на телефоне: маскот едет вместе с корзиной */}
      <div className="fixed inset-x-0 bottom-0 z-40 flex items-center gap-2 border-t-2 border-current bg-background px-3 py-2.5 pb-[max(0.625rem,env(safe-area-inset-bottom))] sm:hidden">
        <Mascot mood={mood} plates={count} className="h-11 w-9 shrink-0 text-[var(--ink)]" />
        <a
          href={`tel:${CONTACTS.phones[0].raw}`}
          className="inline-flex h-12 flex-1 items-center justify-center gap-2 border-2 border-current text-sm font-bold"
        >
          <Phone className="size-4" /> Позвонить
        </a>
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="inline-flex h-12 flex-1 items-center justify-center gap-2 border-2 border-current bg-brand text-sm font-bold text-[var(--brand-on)]"
        >
          <ShoppingBag className="size-4" />
          {count > 0 ? <span className="tabular-nums">{money(sum)}</span> : "Корзина"}
        </button>
      </div>

      <CartSheet />
    </>
  );
}

function SenseiPanel({
  item,
  onAdded,
}: {
  item: MenuItem;
  onAdded: (e: { id: string; x: number; y: number }) => void;
}) {
  const price = itemPrice(item);

  return (
    <li
      data-grab
      className="flex gap-3 border-2 border-current bg-surface p-3 transition-shadow hover:shadow-[5px_5px_0_var(--brand)]"
    >
      <DishGlyph item={item} style="ink" className="size-16 shrink-0 text-[var(--ink)]" />

      <div className="min-w-0 flex-1">
        <div className="flex items-start gap-2">
          <h3 className="flex-1 text-sm leading-tight font-bold">{item.name}</h3>
          <span className="shrink-0 font-unbounded text-sm font-extrabold tabular-nums">
            {price === null ? (
              <span className="text-[11px] font-normal">по телефону</span>
            ) : (
              <>
                {item.variants?.length ? "от " : ""}
                {money(price)}
              </>
            )}
          </span>
        </div>

        {(item.desc || item.weight) && (
          <p className="mt-1 text-[12px] leading-snug text-muted-foreground">
            {item.desc}
            {item.weight ? `${item.desc ? " · " : ""}${item.weight}` : ""}
          </p>
        )}

        <div className="mt-2 flex flex-wrap items-center gap-1.5">
          {item.tags?.includes("hit") && <Tag>хит</Tag>}
          {item.tags?.includes("new") && <Tag>новинка</Tag>}
          {item.tags?.includes("spicy") && <Tag>остро</Tag>}
          <AddButton
            item={item}
            onAdded={onAdded}
            className="ml-auto rounded-none border-2 border-current bg-brand text-[var(--brand-on)]"
          />
        </div>
      </div>
    </li>
  );
}

function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="border border-current px-1.5 py-0.5 text-[9.5px] font-bold tracking-wide uppercase">
      {children}
    </span>
  );
}

