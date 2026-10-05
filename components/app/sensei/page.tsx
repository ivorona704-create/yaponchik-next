import Link from "next/link";
import { ArrowLeft, Phone, Send, MessageCircle } from "lucide-react";
import { SenseiShell } from "@/components/concepts/sensei/sensei-shell";
import { CONTACTS, PROMOS } from "@/lib/menu";
import { money } from "@/lib/utils";

export default function SenseiPage() {
  return (
    <>
      <SenseiShell />

      {/* ═══════════════ ЗАЛ ═══════════════ */}
      <section id="hall" className="border-t-2 border-current">
        <div className="mx-auto grid max-w-[1180px] items-center gap-8 px-4 py-16 md:grid-cols-2">
          <div className="border-2 border-current shadow-[8px_8px_0_var(--brand)]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/interior.jpg"
              alt="Зал «Япончика»: стена из стабилизированного мха с золотыми буквами, зелёные банкетки, длинный деревянный стол"
              className="aspect-4/3 w-full object-cover grayscale-[0.15]"
              loading="lazy"
            />
          </div>
          <div>
            <h2 className="font-unbounded text-[clamp(1.7rem,5vw,3rem)] leading-[0.95] font-extrabold uppercase italic">
              Зал и большие
              <br />
              компании
            </h2>
            <ul className="mt-6 space-y-2.5">
              {[
                ["Можно приехать к нам", "посидеть в зале, а не ждать курьера"],
                ["Длинный стол на компанию", "день рождения, встреча выпускников, корпоратив"],
                ["Соберём сет под бюджет", "скажите, сколько человек и кто что любит"],
                ["Самовывоз", `${CONTACTS.street}, ${CONTACTS.landmark}`],
              ].map(([title, text]) => (
                <li key={title} className="border-2 border-current bg-surface p-3">
                  <b className="text-sm">{title}</b>
                  <p className="text-[13px] text-muted-foreground">{text}</p>
                </li>
              ))}
            </ul>
            <a
              href={`tel:${CONTACTS.phones[1].raw}`}
              className="mt-6 inline-flex h-12 items-center gap-2 border-2 border-current bg-brand px-6 font-unbounded text-sm font-bold text-[var(--brand-on)] uppercase shadow-[5px_5px_0_var(--ink)]"
            >
              <Phone className="size-4" /> Забронировать
            </a>
          </div>
        </div>
      </section>

      {/* ═══════════════ АКЦИИ И ДОСТАВКА ═══════════════ */}
      <section id="delivery" className="border-t-2 border-current bg-surface-2">
        <div className="mx-auto max-w-[1180px] px-4 py-16">
          <h2 className="font-unbounded text-[clamp(1.7rem,5vw,3rem)] font-extrabold uppercase italic">
            Акции и доставка
          </h2>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {PROMOS.map((p) => (
              <article
                key={p.title}
                className="border-2 border-current bg-surface p-5 shadow-[6px_6px_0_var(--brand)]"
              >
                <span className="text-2xl" aria-hidden="true">
                  {p.icon}
                </span>
                <h3 className="mt-3 text-base leading-snug font-bold">{p.title}</h3>
                <p className="mt-2 text-[13px] leading-relaxed text-muted-foreground">{p.text}</p>
              </article>
            ))}
          </div>

          <dl className="mt-10 grid gap-x-8 gap-y-6 border-t-2 border-current pt-8 sm:grid-cols-2 lg:grid-cols-4">
            {[
              ["Бесплатно", `от ${money(CONTACTS.freeDeliveryFrom)}`, "Заказы меньше тоже возим — стоимость уточнит оператор."],
              ["Приём заказов", CONTACTS.hoursShort, "Ежедневно, без выходных."],
              ["Оплата", "карта и наличные", "Курьеру при получении. Онлайн-оплаты нет."],
              ["Самовывоз", CONTACTS.street, CONTACTS.landmark],
            ].map(([label, value, note]) => (
              <div key={label}>
                <dt className="font-mono text-[10px] tracking-[0.18em] text-muted-foreground uppercase">
                  {label}
                </dt>
                <dd className="mt-1.5 font-unbounded text-base leading-tight font-bold">{value}</dd>
                <p className="mt-1.5 text-[12.5px] leading-relaxed text-muted-foreground">{note}</p>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* ═══════════════ КОНТАКТЫ ═══════════════ */}
      <section id="contacts" className="border-t-2 border-current">
        <div className="mx-auto grid max-w-[1180px] gap-8 px-4 py-16 md:grid-cols-[1fr_1.2fr]">
          <div>
            <h2 className="font-unbounded text-[clamp(1.7rem,5vw,3rem)] font-extrabold uppercase italic">
              Контакты
            </h2>
            <div className="mt-7 space-y-6">
              <div>
                <p className="font-mono text-[10px] tracking-[0.18em] text-muted-foreground uppercase">
                  Телефоны
                </p>
                {CONTACTS.phones.map((p) => (
                  <a
                    key={p.raw}
                    href={`tel:${p.raw}`}
                    className="mt-1 block font-unbounded text-lg font-bold hover:text-brand"
                  >
                    {p.pretty}
                  </a>
                ))}
              </div>
              <div>
                <p className="font-mono text-[10px] tracking-[0.18em] text-muted-foreground uppercase">
                  Адрес
                </p>
                <p className="mt-1 text-[15px]">
                  {CONTACTS.city}, {CONTACTS.street}
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
                  className="inline-flex h-11 items-center gap-2 border-2 border-current bg-surface px-4 text-sm font-bold"
                >
                  <Send className="size-4" /> Telegram
                </a>
                <a
                  href={`https://wa.me/${CONTACTS.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-11 items-center gap-2 border-2 border-current bg-surface px-4 text-sm font-bold"
                >
                  <MessageCircle className="size-4" /> WhatsApp
                </a>
              </div>
            </div>
          </div>

          <div className="border-2 border-current">
            <iframe
              src={`https://yandex.ru/map-widget/v1/?ll=${CONTACTS.coords.lon}%2C${CONTACTS.coords.lat}&z=17&pt=${CONTACTS.coords.lon}%2C${CONTACTS.coords.lat}%2Cpm2grm`}
              title="Карта: ул. Красного Бойца, 41, с. Александров-Гай"
              loading="lazy"
              className="h-[320px] w-full md:h-full"
            />
          </div>
        </div>
      </section>

      <footer className="border-t-2 border-current bg-[var(--ink)] text-background">
        <div className="mx-auto flex max-w-[1180px] flex-wrap items-center gap-x-6 gap-y-2 px-4 py-8 pb-28 text-xs sm:pb-8">
          <Link href="/" className="inline-flex items-center gap-1.5 hover:text-brand">
            <ArrowLeft className="size-3.5" /> Все концепты
          </Link>
          <span className="opacity-70">
            {CONTACTS.city}, {CONTACTS.street} · {CONTACTS.hours}
          </span>
          <span className="ml-auto opacity-70">Концепт 3 — «Сэнсэй»</span>
        </div>
      </footer>
    </>
  );
}
