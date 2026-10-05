import Link from "next/link";
import { ArrowLeft, Phone, Send, MessageCircle } from "lucide-react";
import { ClassicShell } from "@/components/concepts/classic/classic-shell";
import { CONTACTS, PROMOS } from "@/lib/menu";
import { money } from "@/lib/utils";

const FEATURES = [
  ["🔪", "Готовим под заказ", "Ничего не лежит на витрине. Рис варим порционно, рыбу режем после звонка."],
  ["🛵", "Свой курьер", "Возим по селу сами — без агрегаторов, наценок и потерянных заказов."],
  ["🍽️", "Есть зал", "Можно не заказывать домой, а прийти к нам — или занять большой стол на компанию."],
];

const STEPS = [
  ["Соберите заказ", "Нажимайте «+» у блюд в меню — корзина сама посчитает сумму и покажет, сколько осталось до бесплатной доставки."],
  ["Отправьте или позвоните", "Одна кнопка — и заказ уходит нам в WhatsApp готовым списком. Или просто звоните."],
  ["Встречайте курьера", "Привезём горячим и упакованным. Оплата при получении — наличными или картой."],
];

export default function ClassicPage() {
  return (
    <>
      <ClassicShell />

      {/* ═══════════════ АКЦИИ ═══════════════ */}
      <section id="promo" className="border-t border-hairline bg-surface">
        <div className="mx-auto max-w-[1180px] px-4 py-16 sm:py-20">
          <p className="text-[11px] font-semibold tracking-[0.18em] text-brand uppercase">
            Выгодно
          </p>
          <h2 className="mt-2 font-unbounded text-[clamp(1.8rem,4.5vw,2.8rem)] font-bold">
            Акции
          </h2>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {PROMOS.map((p) => (
              <article
                key={p.title}
                className={`rounded-2xl border bg-background p-6 ${
                  p.accent ? "border-brand" : "border-hairline"
                }`}
              >
                <span className="text-2xl" aria-hidden="true">
                  {p.icon}
                </span>
                <h3 className="mt-3 text-base leading-snug font-semibold">{p.title}</h3>
                <p className="mt-2 text-[13px] leading-relaxed text-muted-foreground">
                  {p.text}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ ПРЕИМУЩЕСТВА ═══════════════ */}
      <section className="border-t border-hairline">
        <div className="mx-auto grid max-w-[1180px] gap-8 px-4 py-16 md:grid-cols-3 sm:py-20">
          {FEATURES.map(([icon, title, text]) => (
            <article key={title}>
              <span className="text-3xl" aria-hidden="true">
                {icon}
              </span>
              <h3 className="mt-3 font-unbounded text-lg font-bold">{title}</h3>
              <p className="mt-2 text-[14px] leading-relaxed text-muted-foreground">{text}</p>
            </article>
          ))}
        </div>
      </section>

      {/* ═══════════════ КАК ЗАКАЗАТЬ ═══════════════ */}
      <section id="how" className="border-t border-hairline bg-surface">
        <div className="mx-auto max-w-[1180px] px-4 py-16 sm:py-20">
          <p className="text-[11px] font-semibold tracking-[0.18em] text-brand uppercase">
            Всё просто
          </p>
          <h2 className="mt-2 font-unbounded text-[clamp(1.8rem,4.5vw,2.8rem)] font-bold">
            Как заказать
          </h2>

          <ol className="mt-9 grid gap-6 md:grid-cols-3">
            {STEPS.map(([title, text], i) => (
              <li key={title} className="relative rounded-2xl border border-hairline bg-background p-6">
                <span
                  className="grid size-10 place-items-center rounded-full bg-brand font-unbounded text-base font-bold text-[var(--brand-on)]"
                  aria-hidden="true"
                >
                  {i + 1}
                </span>
                <h3 className="mt-4 text-base font-semibold">{title}</h3>
                <p className="mt-2 text-[14px] leading-relaxed text-muted-foreground">
                  {text}
                  {i === 1 && (
                    <>
                      {" "}
                      <a
                        href={`tel:${CONTACTS.phones[0].raw}`}
                        className="font-medium text-brand underline underline-offset-4"
                      >
                        {CONTACTS.phones[0].pretty}
                      </a>
                      .
                    </>
                  )}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ═══════════════ ЗАЛ ═══════════════ */}
      <section id="hall" className="border-t border-hairline">
        <div className="mx-auto grid max-w-[1180px] items-center gap-10 px-4 py-16 md:grid-cols-2 sm:py-20">
          <div>
            <p className="text-[11px] font-semibold tracking-[0.18em] text-brand uppercase">
              Не только доставка
            </p>
            <h2 className="mt-2 font-unbounded text-[clamp(1.8rem,4.5vw,2.8rem)] leading-tight font-bold">
              Зал и большие компании
            </h2>
            <ul className="mt-7 space-y-3.5">
              {[
                ["Можно приехать к нам", "посидеть в зале, а не ждать курьера"],
                ["Длинный стол на компанию", "день рождения, встреча выпускников, корпоратив"],
                ["Соберём сет под ваш бюджет", "скажите, сколько человек и кто что любит"],
                ["Самовывоз", `${CONTACTS.street}, ${CONTACTS.landmark}`],
              ].map(([title, text]) => (
                <li key={title} className="flex gap-3">
                  <span className="mt-2 size-1.5 shrink-0 rounded-full bg-brand" aria-hidden="true" />
                  <span>
                    <b className="text-[15px]">{title}</b>
                    <span className="block text-[13px] text-muted-foreground">{text}</span>
                  </span>
                </li>
              ))}
            </ul>
            <a
              href={`tel:${CONTACTS.phones[1].raw}`}
              className="mt-8 inline-flex h-12 items-center gap-2 rounded-full bg-[var(--wood)] px-6 text-sm font-semibold text-[#2a1f10]"
            >
              <Phone className="size-4" /> Забронировать стол
            </a>
          </div>

          <div className="overflow-hidden rounded-2xl border border-hairline">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/interior.jpg"
              alt="Зал «Япончика»: стена из стабилизированного мха с золотыми буквами, зелёные банкетки, длинный деревянный стол"
              className="aspect-4/3 w-full object-cover"
              loading="lazy"
            />
          </div>
        </div>
      </section>

      {/* ═══════════════ ДОСТАВКА ═══════════════ */}
      <section id="delivery" className="border-t border-hairline bg-surface">
        <div className="mx-auto grid max-w-[1180px] gap-8 px-4 py-16 md:grid-cols-[1.3fr_1fr] sm:py-20">
          <div>
            <p className="text-[11px] font-semibold tracking-[0.18em] text-brand uppercase">
              Условия
            </p>
            <h2 className="mt-2 font-unbounded text-[clamp(1.8rem,4.5vw,2.8rem)] font-bold">
              Доставка и оплата
            </h2>
            <ul className="mt-7 space-y-3.5">
              {[
                [`Бесплатно от ${money(CONTACTS.freeDeliveryFrom)}`, "заказы меньше этой суммы тоже возим, стоимость уточнит оператор"],
                ["Приём заказов", `ежедневно с ${CONTACTS.hoursShort}`],
                ["Оплата", "наличными или картой при получении"],
                ["Самовывоз", CONTACTS.street],
                ["Время доставки", "зависит от загрузки кухни — в час пик оператор предупредит заранее"],
              ].map(([title, text]) => (
                <li key={title} className="flex gap-3">
                  <span className="mt-2 size-1.5 shrink-0 rounded-full bg-brand" aria-hidden="true" />
                  <span>
                    <b className="text-[15px]">{title}</b>
                    <span className="block text-[13px] text-muted-foreground">{text}</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <aside className="self-start rounded-2xl border border-brand bg-background p-6">
            <h3 className="font-unbounded text-lg font-bold">Заказ на компанию?</h3>
            <p className="mt-3 text-[14px] leading-relaxed text-muted-foreground">
              Позвоните заранее — соберём сет под ваш бюджет, количество человек
              и вкусы: кому острое, кому запечённое, кому пиццу. На больших сетах
              скидка уже заложена в цену.
            </p>
            <a
              href={`tel:${CONTACTS.phones[1].raw}`}
              className="mt-5 inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-brand text-sm font-semibold text-[var(--brand-on)]"
            >
              <Phone className="size-4" /> Обсудить заказ
            </a>
          </aside>
        </div>
      </section>

      {/* ═══════════════ КОНТАКТЫ ═══════════════ */}
      <section id="contacts" className="border-t border-hairline">
        <div className="mx-auto max-w-[1180px] px-4 py-16 sm:py-20">
          <p className="text-[11px] font-semibold tracking-[0.18em] text-brand uppercase">
            Мы на связи
          </p>
          <h2 className="mt-2 font-unbounded text-[clamp(1.8rem,4.5vw,2.8rem)] font-bold">
            Контакты
          </h2>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            <article className="rounded-2xl border border-hairline bg-surface p-6">
              <h3 className="text-sm font-semibold">Телефоны</h3>
              {CONTACTS.phones.map((p) => (
                <a
                  key={p.raw}
                  href={`tel:${p.raw}`}
                  className="mt-2 block font-unbounded text-lg font-bold text-brand"
                >
                  {p.pretty}
                </a>
              ))}
              <p className="mt-3 text-[13px] text-muted-foreground">
                Приём заказов {CONTACTS.hours}
              </p>
            </article>

            <article className="rounded-2xl border border-hairline bg-surface p-6">
              <h3 className="text-sm font-semibold">Адрес</h3>
              <p className="mt-2 text-[17px] leading-snug font-medium">
                {CONTACTS.city},<br />
                {CONTACTS.street}
              </p>
              <p className="mt-3 text-[13px] text-muted-foreground">
                {CONTACTS.region}. Ориентир — «Магнит» в 50 метрах.
              </p>
            </article>

            <article className="rounded-2xl border border-hairline bg-surface p-6">
              <h3 className="text-sm font-semibold">Мы в сети</h3>
              <div className="mt-3 flex flex-col gap-2">
                <a
                  href={CONTACTS.telegram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-11 items-center gap-2 rounded-full border border-hairline px-4 text-sm hover:bg-secondary"
                >
                  <Send className="size-4" /> Telegram-канал
                </a>
                <a
                  href={`https://wa.me/${CONTACTS.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-11 items-center gap-2 rounded-full border border-hairline px-4 text-sm hover:bg-secondary"
                >
                  <MessageCircle className="size-4" /> WhatsApp
                </a>
              </div>
              <p className="mt-3 text-[13px] text-muted-foreground">
                Новинки и акции выкладываем в Telegram.
              </p>
            </article>
          </div>

          <div className="mt-6 overflow-hidden rounded-2xl border border-hairline">
            <iframe
              src={`https://yandex.ru/map-widget/v1/?ll=${CONTACTS.coords.lon}%2C${CONTACTS.coords.lat}&z=17&pt=${CONTACTS.coords.lon}%2C${CONTACTS.coords.lat}%2Cpm2grm`}
              title="Карта: ул. Красного Бойца, 41, с. Александров-Гай"
              loading="lazy"
              className="h-[340px] w-full"
            />
          </div>
        </div>
      </section>

      <footer className="border-t border-hairline bg-surface">
        <div className="mx-auto flex max-w-[1180px] flex-wrap items-center gap-x-6 gap-y-2 px-4 py-8 pb-24 text-xs text-muted-foreground sm:pb-8">
          <Link href="/" className="inline-flex items-center gap-1.5 hover:text-foreground">
            <ArrowLeft className="size-3.5" /> Все концепты
          </Link>
          <span>
            {CONTACTS.city}, {CONTACTS.street} · {CONTACTS.hours}
          </span>
          <span className="ml-auto">Концепт 4 — «Классика»</span>
        </div>
      </footer>
    </>
  );
}
