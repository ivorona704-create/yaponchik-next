"use client";

import Link from "next/link";
import Image from "next/image";
import { Phone, Search, X, ShoppingBag, Flame, Sparkles } from "lucide-react";
import CinematicThemeSwitcher from "@/components/ui/cinematic-theme-switcher";
import { AddButton } from "@/components/shared/add-button";
import { DishGlyph } from "@/components/shared/dish-glyph";
import { CartSheet } from "@/components/shared/cart-sheet";
import { MobileBar } from "@/components/shared/mobile-bar";
import { useCart, cartCount, cartTotal } from "@/lib/cart-store";
import { useActiveCategory, useHydrated, useMenuFilter } from "@/lib/use-menu";
import {
  CATEGORY_EMOJI,
  CONTACTS,
  FILTERS,
  ITEM_COUNT,
  MENU,
  itemPrice,
  type MenuItem,
} from "@/lib/menu";
import { cn, money, plural } from "@/lib/utils";

const ALL_IDS = MENU.map((c) => c.id);

/**
 * Концепт «Классика» — тот самый первый сайт «Япончика».
 * Ничего не прячется за эффектами: логотип-маскот в шапке, фото зала
 * на первом экране и всё меню одним списком в стиле печатного,
 * только с читаемым составом и нормальным контрастом цен.
 */
export function ClassicShell() {
  const { query, setQuery, tags, toggleTag, categories, found, reset } = useMenuFilter();
  const active = useActiveCategory(ALL_IDS, 180);

  const lines = useCart((s) => s.lines);
  const setOpen = useCart((s) => s.setOpen);
  const hydrated = useHydrated();
  const count = hydrated ? cartCount(lines) : 0;
  const sum = hydrated ? cartTotal(lines) : 0;

  return (
    <>
      {/* ═══════════════ ШАПКА С ЛОГОТИПОМ ═══════════════ */}
      <header className="sticky top-0 z-40 border-b border-hairline bg-background/92 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-[1180px] items-center gap-4 px-4">
          <Link href="/" className="flex shrink-0 items-center gap-2.5">
            <Image
              src="/logo.jpg"
              alt=""
              width={40}
              height={40}
              className="size-10 rounded-full border-[1.6px] border-brand bg-surface object-cover"
            />
            <span className="leading-none">
              <b className="block text-[10px] font-semibold tracking-[0.18em] text-muted-foreground uppercase">
                Авто суши
              </b>
              <i className="mt-0.5 block font-unbounded text-lg font-bold not-italic">
                Япон<span className="text-brand">чик</span>
              </i>
            </span>
          </Link>

          <nav className="ml-auto hidden items-center gap-5 md:flex">
            {[
              ["#menu", "Меню"],
              ["#promo", "Акции"],
              ["#hall", "Зал"],
              ["#delivery", "Доставка"],
              ["#contacts", "Контакты"],
            ].map(([href, label]) => (
              <a
                key={href}
                href={href}
                className="text-[13px] font-medium transition-colors hover:text-brand"
              >
                {label}
              </a>
            ))}
          </nav>

          <a
            href={`tel:${CONTACTS.phones[0].raw}`}
            className="ml-auto hidden h-10 items-center gap-2 rounded-full bg-brand px-4 text-[13px] font-semibold text-[var(--brand-on)] transition-transform active:scale-95 md:ml-0 lg:inline-flex"
          >
            <Phone className="size-3.5" />
            {CONTACTS.phones[0].pretty}
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
            className="hidden h-10 items-center gap-2 rounded-full bg-brand px-3.5 text-sm font-semibold text-[var(--brand-on)] transition-transform active:scale-95 sm:inline-flex"
          >
            <ShoppingBag className="size-4" />
            {count > 0 ? <span className="tabular-nums">{money(sum)}</span> : "Корзина"}
            {count > 0 && (
              <span className="grid size-5 place-items-center rounded-full bg-black/20 text-[11px] tabular-nums">
                {count}
              </span>
            )}
          </button>
        </div>
      </header>

      {/* ═══════════════ ПЕРВЫЙ ЭКРАН ═══════════════ */}
      <section className="relative isolate overflow-hidden bg-[#1c1a17] text-[#F2EBE1]">
        <Image
          src="/interior.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="-z-10 object-cover opacity-55"
        />
        <div
          className="absolute inset-0 -z-10 bg-linear-to-t from-[#1c1a17] via-[#1c1a17]/75 to-[#1c1a17]/45"
          aria-hidden="true"
        />

        <div className="mx-auto max-w-[1180px] px-4 py-16 sm:py-24">
          <p className="text-[11px] font-semibold tracking-[0.18em] text-[#F0B5B5] uppercase">
            {CONTACTS.city} · доставка и самовывоз
          </p>
          {/* Перенос ставим вручную, как на первом сайте: иначе на телефоне
              заголовок рассыпается на пять строк */}
          <h1 className="mt-4 font-unbounded text-[clamp(1.75rem,5.2vw,3.6rem)] leading-[1.08] font-bold text-balance">
            Роллы, суши и пицца
            <br />
            <span className="text-[#FF8080]">за один звонок</span>
          </h1>
          <p className="mt-5 max-w-[48ch] text-[15px] leading-relaxed text-[#F2EBE1]/85">
            Крутим роллы, печём пиццу, жарим бургеры и удон. Готовим под заказ
            и привозим горячим по Александрову Гаю.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={`tel:${CONTACTS.phones[0].raw}`}
              className="inline-flex h-12 items-center gap-2 rounded-full bg-brand px-6 text-sm font-semibold text-[var(--brand-on)] transition-transform active:scale-95"
            >
              <Phone className="size-4" /> {CONTACTS.phones[0].pretty}
            </a>
            <a
              href={`tel:${CONTACTS.phones[1].raw}`}
              className="inline-flex h-12 items-center rounded-full border border-[#F2EBE1]/35 px-6 text-sm font-medium backdrop-blur-sm transition-colors hover:bg-[#F2EBE1]/10"
            >
              {CONTACTS.phones[1].pretty}
            </a>
          </div>

          <ul className="mt-10 flex flex-wrap gap-2.5">
            {[
              ["🛵", `Доставка бесплатно от ${money(CONTACTS.freeDeliveryFrom)}`, true],
              ["🕘", `Каждый день ${CONTACTS.hoursShort}`, false],
              ["🍣", `Больше ${ITEM_COUNT} позиций`, false],
              ["🏠", CONTACTS.street, false],
            ].map(([icon, text, accent]) => (
              <li
                key={text as string}
                className={cn(
                  "inline-flex items-center gap-2 rounded-full border px-3.5 py-2 text-[13px] backdrop-blur-sm",
                  accent
                    ? "border-brand/60 bg-brand/15 font-semibold"
                    : "border-[#F2EBE1]/25 bg-[#F2EBE1]/5",
                )}
              >
                <span aria-hidden="true">{icon as string}</span>
                {text as string}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ═══════════════ МЕНЮ ═══════════════ */}
      <section id="menu">
        <div className="mx-auto max-w-[1180px] px-4 pt-16 sm:pt-20">
          <p className="text-[11px] font-semibold tracking-[0.18em] text-brand uppercase">
            Что у нас есть
          </p>
          <h2 className="mt-2 font-unbounded text-[clamp(1.8rem,4.5vw,2.8rem)] font-bold">
            Меню
          </h2>
          <p className="mt-3 max-w-[60ch] text-[15px] leading-relaxed text-muted-foreground">
            Найдите блюдо поиском или выберите раздел. Нажмите «+», чтобы собрать
            заказ — потом отправим его нам одним сообщением.
          </p>
        </div>

        {/* Липкая панель: поиск, фильтры, разделы со счётчиками */}
        <div className="sticky top-16 z-30 mt-8 border-y border-hairline bg-background/92 backdrop-blur-xl">
          <div className="mx-auto max-w-[1180px] px-4 py-3">
            <div className="flex flex-col gap-2.5 sm:flex-row sm:items-center">
              <label className="relative flex h-11 flex-1 items-center">
                <Search className="pointer-events-none absolute left-3.5 size-4 text-muted-foreground" />
                <span className="sr-only">Поиск по меню</span>
                <input
                  type="search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Найти ролл, пиццу, соус…"
                  className="h-11 w-full rounded-full border border-hairline bg-surface pr-10 pl-10 text-sm outline-none placeholder:text-muted-foreground focus-visible:border-brand focus-visible:ring-2 focus-visible:ring-brand/25"
                />
                {query && (
                  <button
                    type="button"
                    onClick={() => setQuery("")}
                    aria-label="Очистить поиск"
                    className="absolute right-3.5 text-muted-foreground hover:text-foreground"
                  >
                    <X className="size-4" />
                  </button>
                )}
              </label>

              <div className="flex gap-1.5 overflow-x-auto no-scrollbar">
                {FILTERS.map((f) => {
                  const on = tags.includes(f.id);
                  const Icon = f.id === "hit" ? Flame : f.id === "new" ? Sparkles : null;
                  return (
                    <button
                      key={f.id}
                      type="button"
                      aria-pressed={on}
                      onClick={() => toggleTag(f.id)}
                      className={cn(
                        "inline-flex h-11 shrink-0 items-center gap-1.5 rounded-full border px-4 text-[13px] font-medium transition-colors",
                        on
                          ? "border-transparent bg-brand text-[var(--brand-on)]"
                          : "border-hairline bg-surface hover:bg-secondary",
                      )}
                    >
                      {Icon && <Icon className="size-3.5" />}
                      {f.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Счётчик у раздела — деталь первого сайта */}
            <nav
              aria-label="Разделы меню"
              className="-mx-4 mt-2.5 flex gap-1.5 overflow-x-auto px-4 no-scrollbar"
            >
              {MENU.map((c) => (
                <a
                  key={c.id}
                  href={`#${c.id}`}
                  className={cn(
                    "inline-flex shrink-0 items-center gap-1.5 rounded-full border px-3.5 py-2 text-[13px] whitespace-nowrap transition-colors",
                    active === c.id
                      ? "border-transparent bg-brand text-[var(--brand-on)]"
                      : "border-hairline bg-surface text-muted-foreground hover:text-foreground",
                  )}
                >
                  <span aria-hidden="true">{CATEGORY_EMOJI[c.id]}</span>
                  {c.short}
                  <span
                    className={cn(
                      "tabular-nums",
                      active === c.id ? "opacity-70" : "opacity-45",
                    )}
                  >
                    {c.items.length}
                  </span>
                </a>
              ))}
            </nav>
          </div>
        </div>

        <div className="mx-auto max-w-[1180px] px-4">
          {(query || tags.length > 0) && (
            <p className="pt-6 text-sm text-muted-foreground">
              Нашлось {found} {plural(found, ["блюдо", "блюда", "блюд"])}.{" "}
              <button
                onClick={reset}
                className="font-medium text-brand underline underline-offset-4"
              >
                Показать всё меню
              </button>
            </p>
          )}

          {found === 0 && (
            <div className="py-24 text-center">
              <p className="font-unbounded text-xl font-bold">Ничего не нашлось</p>
              <p className="mt-2 text-sm text-muted-foreground">
                Позвоните — оператор подскажет, есть ли это блюдо сегодня.
              </p>
            </div>
          )}

          {categories.map((cat) => (
            <div key={cat.id} id={cat.id} className="pt-12">
              <header className="flex flex-wrap items-baseline gap-x-3 gap-y-1 border-b-2 border-brand pb-3">
                <h3 className="font-unbounded text-[clamp(1.3rem,3.2vw,1.9rem)] font-bold">
                  {cat.name}
                </h3>
                <span className="text-sm text-muted-foreground tabular-nums">
                  {cat.items.length}
                </span>
                <p className="w-full text-[13px] text-muted-foreground sm:w-auto sm:flex-1">
                  {cat.desc}
                </p>
              </header>

              <ul>
                {cat.items.map((item) => (
                  <ClassicRow key={item.id} item={item} />
                ))}
              </ul>
            </div>
          ))}

          <div className="my-14 rounded-2xl border border-hairline bg-surface p-6 text-center sm:p-8">
            <p className="mx-auto max-w-[56ch] text-[15px] leading-relaxed">
              Не нашли любимое блюдо или сомневаетесь в цене? Позвоните — оператор
              подскажет актуальный состав и наличие.
            </p>
            <a
              href={`tel:${CONTACTS.phones[0].raw}`}
              className="mt-5 inline-flex h-12 items-center gap-2 rounded-full bg-brand px-6 text-sm font-semibold text-[var(--brand-on)]"
            >
              <Phone className="size-4" /> Позвонить и спросить
            </a>
          </div>
        </div>
      </section>

      <MobileBar />
      <CartSheet />
    </>
  );
}

/** Строка меню: название ····· цена «+» — ритм печатного меню */
function ClassicRow({ item }: { item: MenuItem }) {
  const price = itemPrice(item);
  const multi = Boolean(item.variants?.length);

  return (
    <li className="flex items-start gap-3.5 border-b border-hairline py-3.5 last:border-0">
      <DishGlyph item={item} style="flat" className="mt-0.5 size-9 shrink-0" />

      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-baseline gap-x-2">
          <h4 className="text-[15px] font-semibold">{item.name}</h4>
          {item.tags?.includes("hit") && <Tag tone="wood">хит</Tag>}
          {item.tags?.includes("new") && <Tag tone="brand">новинка</Tag>}
          {item.tags?.includes("spicy") && <Tag tone="brick">остро</Tag>}
          {item.benefit && <Tag tone="wood">выгода {money(item.benefit)}</Tag>}

          <span className="leader hidden sm:block" />

          {!multi && (
            <span className="ml-auto shrink-0 font-unbounded text-[15px] font-bold tabular-nums sm:ml-0">
              {price === null ? (
                <span className="text-[13px] font-normal text-muted-foreground">
                  по телефону
                </span>
              ) : (
                money(price)
              )}
            </span>
          )}
        </div>

        {(item.desc || item.weight) && (
          <p className="mt-0.5 text-[13px] leading-relaxed text-muted-foreground">
            {item.desc}
            {item.weight ? `${item.desc ? " · " : ""}${item.weight}` : ""}
          </p>
        )}

        {multi && <AddButton item={item} className="mt-2 justify-start" />}
      </div>

      {!multi && <AddButton item={item} className="mt-0.5" />}
    </li>
  );
}

function Tag({ children, tone }: { children: React.ReactNode; tone: "brand" | "wood" | "brick" }) {
  return (
    <span
      className={cn(
        "rounded-full px-2 py-0.5 text-[10px] font-bold tracking-wide uppercase",
        tone === "brand" && "bg-brand text-[var(--brand-on)]",
        tone === "wood" && "bg-[var(--wood)] text-[#2a1f10]",
        tone === "brick" && "bg-[#8C3A2A] text-[#FDEFEA]",
      )}
    >
      {children}
    </span>
  );
}
