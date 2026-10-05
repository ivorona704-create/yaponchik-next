"use client";

import Link from "next/link";
import { useCallback, useState } from "react";
import { Phone, Search, X, MapPin, Clock } from "lucide-react";
import CinematicThemeSwitcher from "@/components/ui/cinematic-theme-switcher";
import { Conveyor } from "@/components/concepts/kaiten/conveyor";
import { Plate } from "@/components/concepts/kaiten/plate";
import {
  PlateStack,
  PlateFlight,
  stackTarget,
  type Flight,
} from "@/components/concepts/kaiten/plate-stack";
import { CartSheet } from "@/components/shared/cart-sheet";
import { MobileBar } from "@/components/shared/mobile-bar";
import { useActiveCategory, useMenuFilter } from "@/lib/use-menu";
import { plateFor } from "@/lib/plate";
import { CONTACTS, FILTERS, ITEM_COUNT, MENU, itemPrice } from "@/lib/menu";
import { cn, money, plural } from "@/lib/utils";

const ALL_IDS = MENU.map((c) => c.id);

/**
 * Весь интерактив «Конвейера» в одном клиентском компоненте:
 * лента, меню и полёт тарелки в стопку делят одно состояние.
 */
export function KaitenShell() {
  const { query, setQuery, tags, toggleTag, categories, found, reset } = useMenuFilter();
  const active = useActiveCategory(ALL_IDS, 200);
  const [flight, setFlight] = useState<Flight | null>(null);

  const handleAdded = useCallback(
    ({ id, x, y }: { id: string; x: number; y: number }) => {
      const item = MENU.flatMap((c) => c.items).find((i) => i.id === id);
      const tier = plateFor(item ? itemPrice(item) : null);
      setFlight({ key: Date.now(), x, y, ...stackTarget(), color: tier.color });
    },
    [],
  );

  return (
    <>
      {/* ═══════════ ПЛОТНАЯ ШАПКА В ОДНУ ЛИНИЮ ═══════════ */}
      <header className="sticky top-0 z-40 border-b border-hairline bg-background/92 backdrop-blur-xl">
        <div className="mx-auto flex h-[60px] max-w-[1180px] items-center gap-4 px-4">
          <Link href="/" className="font-dela text-lg leading-none tracking-tight whitespace-nowrap">
            ЯПОН<span className="text-brand">ЧИК</span>
          </Link>

          <span className="hidden items-center gap-1.5 text-[11px] text-muted-foreground xl:flex">
            <MapPin className="size-3.5" /> {CONTACTS.street}
          </span>
          <span className="hidden items-center gap-1.5 text-[11px] text-muted-foreground xl:flex">
            <Clock className="size-3.5" /> {CONTACTS.hoursShort}
          </span>

          <nav className="ml-auto hidden items-center gap-5 md:flex">
            {[
              ["#menu", "Меню"],
              ["#hall", "Зал"],
              ["#delivery", "Доставка"],
              ["#contacts", "Контакты"],
            ].map(([href, label]) => (
              <a
                key={href}
                href={href}
                className="text-xs font-medium tracking-wide uppercase transition-colors hover:text-brand"
              >
                {label}
              </a>
            ))}
          </nav>

          <a
            href={`tel:${CONTACTS.phones[0].raw}`}
            className="ml-auto hidden h-10 items-center gap-2 rounded-lg bg-brand px-3.5 text-xs font-bold text-[var(--brand-on)] md:ml-0 md:inline-flex"
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

          <PlateStack className="hidden sm:inline-flex" />
        </div>
      </header>

      {/* ═══════════════ ПЕРВЫЙ ЭКРАН ═══════════════ */}
      <section className="relative overflow-hidden border-b border-hairline">
        <div className="mx-auto grid max-w-[1180px] gap-10 px-4 pt-14 pb-0 lg:grid-cols-[1.1fr_0.9fr] lg:pt-20">
          <div>
            <p className="font-mono text-[11px] tracking-[0.2em] text-brand uppercase">
              {CONTACTS.city} · доставка и самовывоз
            </p>
            <h1 className="mt-4 font-dela text-[clamp(2.6rem,7.5vw,5.4rem)] leading-[0.92] tracking-[-0.01em]">
              Роллы
              <br />
              <span className="text-brand">уже едут</span>
            </h1>
            <p
              className="mt-4 font-jp text-[clamp(1.1rem,2.4vw,1.8rem)] text-muted-foreground/70"
              aria-hidden="true"
            >
              回転寿司
            </p>
            <p className="mt-5 max-w-[44ch] text-[15px] leading-relaxed text-muted-foreground">
              Готовим под заказ и везём сами — без агрегаторов и наценок.
              Цвет тарелки подскажет цену раньше, чем вы прочитаете цифру.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#menu"
                className="inline-flex h-12 items-center rounded-lg bg-brand px-6 text-sm font-bold text-[var(--brand-on)] transition-transform active:scale-95"
              >
                Собрать заказ
              </a>
              <a
                href={`tel:${CONTACTS.phones[0].raw}`}
                className="inline-flex h-12 items-center gap-2 rounded-lg border border-hairline px-5 text-sm font-semibold transition-colors hover:bg-secondary"
              >
                <Phone className="size-4" /> {CONTACTS.phones[0].pretty}
              </a>
            </div>

            {/* Цифры как герой */}
            {/* Две колонки, а не четыре: цифры живут в узкой колонке первого
                экрана, и «9:00 – 21:40» в четырёх не помещается */}
            <dl className="mt-10 grid grid-cols-2 gap-x-6 gap-y-6 border-t border-hairline pt-7">
              {[
                [money(CONTACTS.freeDeliveryFrom), "доставка бесплатно от"],
                [String(ITEM_COUNT), "позиций в меню"],
                [CONTACTS.hoursShort, "приём заказов"],
                [money(CONTACTS.giftFrom), "подарок от"],
              ].map(([n, label]) => (
                <div key={label}>
                  <dt className="font-dela text-[clamp(1.05rem,2.6vw,1.95rem)] leading-none tabular-nums whitespace-nowrap">
                    {n}
                  </dt>
                  <dd className="mt-2 text-[10px] tracking-[0.15em] text-muted-foreground uppercase">
                    {label}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          {/* Витрина-стопка */}
          <div className="relative hidden lg:block">
            <div className="absolute inset-x-0 top-6 grid grid-cols-2 gap-5">
              {MENU[2].items.slice(20, 24).map((item, i) => (
                <div key={item.id} style={{ marginTop: i % 2 ? 40 : 0 }}>
                  <Plate item={item} onAdded={handleAdded} compact />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Бегущая лента */}
        <div className="mt-14 overflow-hidden border-t border-hairline bg-brand py-2.5 text-[var(--brand-on)] lg:mt-24">
          <div className="marquee-track flex w-max" style={{ "--marquee-duration": "48s" } as React.CSSProperties}>
            {[0, 1].map((dup) => (
              <span key={dup} className="flex shrink-0 items-center">
                {MENU.map((c) => (
                  <span
                    key={c.id}
                    className="px-5 font-dela text-xs tracking-wide whitespace-nowrap uppercase"
                  >
                    {c.name} <span className="opacity-50">·</span>
                  </span>
                ))}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ ВАУ: КОНВЕЙЕР ═══════════════ */}
      <Conveyor onAdded={handleAdded} />

      {/* ═══════════════ МЕНЮ ═══════════════ */}
      <section id="menu">
        <div className="sticky top-[60px] z-30 border-b border-hairline bg-background/92 backdrop-blur-xl">
          <div className="mx-auto max-w-[1180px] px-4 py-3">
            <div className="flex flex-col gap-2.5 sm:flex-row">
              <label className="relative flex h-10 flex-1 items-center">
                <Search className="pointer-events-none absolute left-3 size-4 text-muted-foreground" />
                <span className="sr-only">Поиск по меню</span>
                <input
                  type="search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Найти ролл, пиццу, соус…"
                  className="h-10 w-full rounded-lg border border-hairline bg-surface pr-9 pl-9 text-sm outline-none focus-visible:border-brand focus-visible:ring-2 focus-visible:ring-brand/25"
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
                {FILTERS.map((f) => (
                  <button
                    key={f.id}
                    type="button"
                    aria-pressed={tags.includes(f.id)}
                    onClick={() => toggleTag(f.id)}
                    className={cn(
                      "h-10 shrink-0 rounded-lg border px-3.5 text-xs font-semibold transition-colors",
                      tags.includes(f.id)
                        ? "border-transparent bg-brand text-[var(--brand-on)]"
                        : "border-hairline hover:bg-secondary",
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
                    "shrink-0 rounded-full border px-3.5 py-1.5 text-xs font-medium whitespace-nowrap transition-colors",
                    active === c.id
                      ? "border-transparent bg-foreground text-background"
                      : "border-hairline text-muted-foreground hover:bg-secondary hover:text-foreground",
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
            <p className="pt-6 text-sm text-muted-foreground">
              Нашлось {found} {plural(found, ["блюдо", "блюда", "блюд"])}.{" "}
              <button onClick={reset} className="underline underline-offset-4 hover:text-foreground">
                Показать всё меню
              </button>
            </p>
          )}

          {found === 0 && (
            <div className="py-24 text-center">
              <p className="font-dela text-2xl">Ничего не нашлось</p>
              <p className="mt-2 text-sm text-muted-foreground">
                Позвоните — оператор подскажет, есть ли это блюдо сегодня.
              </p>
            </div>
          )}

          {categories.map((cat) => (
            <div key={cat.id} id={cat.id} className="py-12">
              <div className="mb-7 flex flex-wrap items-baseline gap-x-4 gap-y-1">
                <h2 className="font-dela text-[clamp(1.6rem,4vw,2.6rem)] leading-none">
                  {cat.name}
                </h2>
                <p className="text-[13px] text-muted-foreground">{cat.desc}</p>
              </div>

              {/* Зазор 16px, в верхней четверти 30px */}
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5 lg:[&>*:nth-child(-n+5)]:mb-3.5">
                {cat.items.map((item) => (
                  <Plate key={item.id} item={item} onAdded={handleAdded} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <PlateFlight flight={flight} />
      <MobileBar />
      <CartSheet />
    </>
  );
}

