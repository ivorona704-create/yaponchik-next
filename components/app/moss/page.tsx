import Link from "next/link";
import { ArrowLeft, Phone, Send, MessageCircle } from "lucide-react";
import { Spotlight } from "@/components/concepts/moss/spotlight";
import { PendantLamp } from "@/components/concepts/moss/pendant-lamp";
import { MossHeader } from "@/components/concepts/moss/moss-header";
import { MossMenu } from "@/components/concepts/moss/moss-menu";
import { CartSheet } from "@/components/shared/cart-sheet";
import { MobileBar } from "@/components/shared/mobile-bar";
import { CONTACTS, ITEM_COUNT, PROMOS } from "@/lib/menu";
import { money, plural } from "@/lib/utils";

export default function MossPage() {
  return (
    <>
      <MossHeader />

      {/* ═══════════════ ПЕРВЫЙ ЭКРАН: ПРОЖЕКТОР ═══════════════ */}
      {/* Кадр зала тёмный в любой теме, поэтому текст на нём всегда светлый:
          выключатель меняет освещение зала и остальную страницу, а не читаемость. */}
      <section className="relative isolate h-[100svh] min-h-[560px] overflow-hidden bg-[#0B140F] text-[#F1E9D8]">
        <Spotlight className="absolute inset-0" />

        {/* Лампы над залом */}
        <PendantLamp className="absolute -top-2 left-[14%] hidden h-[26vh] w-auto text-[var(--gold-ink)]/70 md:block" />
        <PendantLamp className="absolute -top-2 right-[18%] hidden h-[19vh] w-auto text-[var(--gold-ink)]/60 lg:block" />

        {/* Подложка под шапку: при включённом свете мшистая стена яркая,
            и золотые буквы без неё теряются */}
        <div
          className="absolute inset-x-0 top-0 h-28 bg-linear-to-b from-[#0B140F]/55 to-transparent"
          aria-hidden="true"
        />

        {/* Блюр-маска вместо затемнения: низ кадра уходит в размытие,
            но сам кадр под ней остаётся живым */}
        <div
          className="absolute inset-x-0 bottom-0 h-[64%] backdrop-blur-xl"
          style={{
            WebkitMaskImage: "linear-gradient(to top, #000 68%, transparent 100%)",
            maskImage: "linear-gradient(to top, #000 68%, transparent 100%)",
            background:
              "linear-gradient(to top, rgb(11 20 15 / 0.97) 0%, rgb(11 20 15 / 0.9) 42%, rgb(11 20 15 / 0.55) 78%, transparent 100%)",
          }}
          aria-hidden="true"
        />

        {/* Технический слой по углам */}
        <div className="pointer-events-none absolute inset-0 hidden font-mono text-[10px] tracking-[0.18em] text-[#F1E9D8]/45 uppercase lg:block">
          <span className="absolute top-1/2 right-6 -rotate-90 origin-right">
            50.1442° N · 48.5768° E
          </span>
          <span className="absolute bottom-6 right-6">
            приём заказов {CONTACTS.hoursShort}
          </span>
        </div>

        {/* Заголовок в две строки внизу слева */}
        <div className="absolute inset-x-0 bottom-0">
          <div className="mx-auto max-w-[1180px] px-4 pb-14 sm:pb-20">
            {/* Надпись лежит выше шторки, а луч лампы может оказаться прямо
                под ней — поэтому подстраховываемся мягкой тенью */}
            <p className="font-mono text-[11px] tracking-[0.22em] text-[#D8B877] uppercase [text-shadow:0_1px_12px_rgb(11_20_15/0.95)]">
              Александров-Гай · зал, доставка, самовывоз
            </p>
            <h1 className="mt-4 font-mincho text-[clamp(3.2rem,12vw,9rem)] leading-[0.84] font-black tracking-[-0.01em]">
              Свет
              <br />
              <span className="text-[#D8B877]">на стол</span>
            </h1>
            <p className="mt-6 max-w-[42ch] text-[15px] leading-relaxed text-[#F1E9D8]/80">
              Крутим роллы, печём пиццу, жарим удон. Готовим под заказ и привозим
              горячим — или накрываем длинный стол у мшистой стены.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a
                href="#menu"
                className="inline-flex h-12 items-center rounded-full bg-[#D8B877] px-6 text-sm font-semibold text-[#0B140F] transition-transform active:scale-95"
              >
                Смотреть меню · {ITEM_COUNT}{" "}
                {plural(ITEM_COUNT, ["блюдо", "блюда", "блюд"])}
              </a>
              <a
                href={`tel:${CONTACTS.phones[0].raw}`}
                className="inline-flex h-12 items-center gap-2 rounded-full border border-[#F1E9D8]/30 px-5 text-sm font-medium backdrop-blur-sm transition-colors hover:bg-[#F1E9D8]/10"
              >
                <Phone className="size-4" />
                {CONTACTS.phones[0].pretty}
              </a>
            </div>

            <p className="mt-6 text-xs text-[#F1E9D8]/55 md:hidden">
              Коснитесь кадра — луч лампы пойдёт за пальцем
            </p>
          </div>
        </div>
      </section>

      {/* ═══════════════ АКЦИИ ═══════════════ */}
      <section className="border-y border-hairline bg-surface">
        <div className="mx-auto grid max-w-[1180px] gap-px px-4 py-0 sm:grid-cols-3">
          {PROMOS.map((p) => (
            <article key={p.title} className="py-8 sm:px-6 sm:first:pl-0 sm:last:pr-0">
              <span className="text-2xl" aria-hidden="true">
                {p.icon}
              </span>
              <h3 className="mt-3 font-mincho text-lg font-bold">{p.title}</h3>
              <p className="mt-1.5 text-[13px] leading-relaxed text-muted-foreground">
                {p.text}
              </p>
            </article>
          ))}
        </div>
      </section>

      {/* ═══════════════ МЕНЮ ═══════════════ */}
      <MossMenu />

      {/* ═══════════════ ЗАЛ ═══════════════ */}
      <section id="hall" className="border-t border-hairline bg-surface">
        <div className="mx-auto grid max-w-[1180px] items-center gap-10 px-4 py-20 md:grid-cols-2 md:py-28">
          <div>
            <p className="font-mono text-[11px] tracking-[0.2em] text-[var(--gold-ink)] uppercase">
              Не только доставка
            </p>
            <h2 className="mt-3 font-mincho text-[clamp(2.2rem,6vw,4rem)] leading-[0.95] font-bold">
              Зал и большие
              <br />
              компании
            </h2>
            <ul className="mt-8 space-y-4">
              {[
                ["Можно приехать к нам", "посидеть в зале, а не ждать курьера"],
                ["Длинный стол на компанию", "день рождения, встреча выпускников, корпоратив"],
                ["Соберём сет под бюджет", "скажите, сколько человек и кто что любит"],
                ["Самовывоз", `${CONTACTS.street}, ${CONTACTS.landmark}`],
              ].map(([title, text]) => (
                <li key={title} className="border-l border-[var(--gold-ink)]/40 pl-4">
                  <b className="text-[15px]">{title}</b>
                  <p className="text-[13px] text-muted-foreground">{text}</p>
                </li>
              ))}
            </ul>
            <a
              href={`tel:${CONTACTS.phones[1].raw}`}
              className="mt-9 inline-flex h-12 items-center gap-2 rounded-full bg-[var(--gold-ink)] px-6 text-sm font-semibold text-background"
            >
              <Phone className="size-4" /> Забронировать стол
            </a>
          </div>

          <div className="relative aspect-4/3 overflow-hidden rounded-2xl border border-hairline">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/interior.jpg"
              alt="Зал «Япончика»: стена из стабилизированного мха с золотыми буквами, зелёные банкетки, длинный деревянный стол"
              className="size-full object-cover"
              loading="lazy"
            />
          </div>
        </div>
      </section>

      {/* ═══════════════ ДОСТАВКА ═══════════════ */}
      <section id="delivery" className="border-t border-hairline">
        <div className="mx-auto max-w-[1180px] px-4 py-20 md:py-28">
          <h2 className="font-mincho text-[clamp(2rem,5vw,3.2rem)] font-bold">
            Доставка и оплата
          </h2>
          <dl className="mt-10 grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-4">
            {[
              ["Бесплатно", `от ${money(CONTACTS.freeDeliveryFrom)}`, "Заказы меньше тоже возим — стоимость уточнит оператор."],
              ["Приём заказов", CONTACTS.hoursShort, "Ежедневно, без выходных."],
              ["Оплата", "картой и наличными", "Курьеру при получении. Онлайн-оплаты нет."],
              ["Подарок", `от ${money(CONTACTS.giftFrom)}`, "Набор специй и ролл «Калифорния II»."],
            ].map(([label, value, note]) => (
              <div key={label} className="border-t border-hairline pt-4">
                <dt className="font-mono text-[10px] tracking-[0.18em] text-muted-foreground uppercase">
                  {label}
                </dt>
                <dd className="mt-2 font-mincho text-2xl leading-tight font-bold text-[var(--gold-ink)]">
                  {value}
                </dd>
                <p className="mt-2 text-[13px] leading-relaxed text-muted-foreground">{note}</p>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* ═══════════════ КОНТАКТЫ ═══════════════ */}
      <section id="contacts" className="border-t border-hairline bg-surface">
        <div className="mx-auto max-w-[1180px] px-4 py-20 md:py-28">
          <div className="grid gap-10 md:grid-cols-[1fr_1.2fr]">
            <div>
              <h2 className="font-mincho text-[clamp(2rem,5vw,3.2rem)] font-bold">Контакты</h2>

              <div className="mt-8 space-y-6">
                <div>
                  <p className="font-mono text-[10px] tracking-[0.18em] text-muted-foreground uppercase">
                    Телефоны
                  </p>
                  {CONTACTS.phones.map((p) => (
                    <a
                      key={p.raw}
                      href={`tel:${p.raw}`}
                      className="mt-1.5 block font-mincho text-2xl font-bold hover:text-[var(--gold-ink)]"
                    >
                      {p.pretty}
                    </a>
                  ))}
                </div>

                <div>
                  <p className="font-mono text-[10px] tracking-[0.18em] text-muted-foreground uppercase">
                    Адрес
                  </p>
                  <p className="mt-1.5 text-lg">
                    {CONTACTS.city},<br />
                    {CONTACTS.street}
                  </p>
                  <p className="mt-1 text-[13px] text-muted-foreground">
                    {CONTACTS.region}. Ориентир — «Магнит» в 50 метрах.
                  </p>
                </div>

                <div className="flex flex-wrap gap-2">
                  <a
                    href={CONTACTS.telegram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-11 items-center gap-2 rounded-full border border-hairline px-4 text-sm transition-colors hover:bg-secondary"
                  >
                    <Send className="size-4" /> Telegram-канал
                  </a>
                  <a
                    href={`https://wa.me/${CONTACTS.whatsapp}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-11 items-center gap-2 rounded-full border border-hairline px-4 text-sm transition-colors hover:bg-secondary"
                  >
                    <MessageCircle className="size-4" /> WhatsApp
                  </a>
                </div>
              </div>
            </div>

            <div className="overflow-hidden rounded-2xl border border-hairline">
              <iframe
                src={`https://yandex.ru/map-widget/v1/?ll=${CONTACTS.coords.lon}%2C${CONTACTS.coords.lat}&z=17&pt=${CONTACTS.coords.lon}%2C${CONTACTS.coords.lat}%2Cpm2grm`}
                title="Карта: ул. Красного Бойца, 41, с. Александров-Гай"
                loading="lazy"
                className="h-[320px] w-full md:h-full"
              />
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-hairline">
        <div className="mx-auto flex max-w-[1180px] flex-wrap items-center gap-x-6 gap-y-2 px-4 py-8 pb-24 text-xs text-muted-foreground sm:pb-8">
          <Link href="/" className="inline-flex items-center gap-1.5 hover:text-foreground">
            <ArrowLeft className="size-3.5" /> Все концепты
          </Link>
          <span>
            {CONTACTS.city}, {CONTACTS.street} · {CONTACTS.hours}
          </span>
          <span className="ml-auto">Концепт 1 — «Мох»</span>
        </div>
      </footer>

      <MobileBar />
      <CartSheet />
    </>
  );
}
