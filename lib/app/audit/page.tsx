import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { CONTACTS } from "@/lib/menu";

export const metadata: Metadata = {
  title: "Аудит печатного меню",
  description:
    "Разбор печатного меню «Авто суши Япончик» как интерфейса: читаемость, контраст, навигация, путь к заказу.",
};

interface Finding {
  area: string;
  score: number;
  problem: string;
  fix: string;
}

const FINDINGS: Finding[] = [
  {
    area: "Поиск блюда, структура",
    score: 1,
    problem:
      "17 разделов разбросаны по шести панелям двух разворотов. Роллы лежат в четырёх местах: классика 1–18 и 19–54 на втором развороте, запечённые там же, жареные 60–77 на первом, новинки на обложке.",
    fix: "Один сквозной список с поиском и липкой полосой разделов. Все роллы рядом; новинки остаются в своих категориях с бейджем.",
  },
  {
    area: "Читаемость",
    score: 1,
    problem:
      "Состав набран примерно 5 pt. В JPG шириной 1280 px это 4–5 экранных пикселей на телефоне — без зума не прочитать. Цены оранжевым по белому дают около 2.3:1 при норме 4.5:1, а цветочная подложка съедает остаток.",
    fix: "Состав 13 px с контрастом не ниже 4.5:1. Цена набрана тем же кеглем, что название, и стоит в конце строки.",
  },
  {
    area: "Понятность цен",
    score: 2,
    problem:
      "У роллов нет количества штук, поэтому Калифорнию I за 340 ₽ и Калифорнию II за 300 ₽ не с чем сравнить. Форматы разные: «200 гр./ 320 руб.», «% 50 р.», «1350 руб / %100 р.». Знак «%» стоит там, где имеется в виду выгода в рублях.",
    fix: "Единый формат «480 ₽ · 8 шт». Выгода сета подписана словами: «выгода 50 ₽». Позиции без цены ведут не в корзину, а на звонок.",
  },
  {
    area: "Путь к заказу",
    score: 2,
    problem:
      "Номер №1 носят сразу три блюда: Сяке, «С лососем» из острых суши и Сяке маки. У новинок, «Испаньолы» и «Темпура сэндвича» номеров нет вовсе. Нет WhatsApp, Telegram и QR-кода, не указаны зона доставки и способы оплаты.",
    fix: "Номера не нужны: кнопка «+» и корзина, которая собирает заказ и отправляет его одним сообщением в WhatsApp. Оплата и самовывоз вынесены в отдельный блок.",
  },
  {
    area: "Бренд",
    score: 2,
    problem:
      "Маскот-повар яркий и запоминается, но появляется дважды и мелко. Оранжевый с белым и вырезанными фото — шаблон «доставка суши», таких тысячи. Главного визуального актива, стены из мха с золотыми буквами в зале, в меню нет совсем.",
    fix: "Три концепта строят фирменный стиль на том, чего у конкурентов нет: на реальном зале и на маскоте.",
  },
  {
    area: "Фотографии",
    score: 2,
    problem:
      "Фото есть почти у каждой позиции — это сильная сторона. Но свет и масштаб разные, а при такой плотности снимки сливаются в фон и перестают вызывать аппетит.",
    fix: "До появления единой съёмки — процедурная иллюстрация: срез ролла собирается из состава, поэтому картинки различимы и не врут.",
  },
  {
    area: "Тексты",
    score: 2,
    problem:
      "Опечатки: «КЛАССЧЕСКИЕ», «ЗАПЕЧЕНЫЕ», «Сендвич». Раздел «Специи» на самом деле про соусы. Фраза «подарок набор специй Калифорния 2» не читается как предложение.",
    fix: "Раздел переименован в «Соусы и специи», формулировка подарка развёрнута в понятную фразу.",
  },
  {
    area: "Акции",
    score: 1,
    problem:
      "Подарок за заказ от 1500 ₽ спрятан мелким текстом на обложке. Выгода сетов записана шифром «%50 р.». Лучшее место на развороте занимает вертикальная надпись «Проверяйте заказ при курьере» — она читается как предупреждение, а не как забота.",
    fix: "Две шкалы в корзине: до бесплатной доставки и до подарка. Пороги видно всё время, а не после оформления.",
  },
];

const PRIORITIES = [
  {
    level: "P0",
    title: "Мешает заказать",
    items: [
      "дубли номеров у блюд",
      "нечитаемый состав",
      "цены без контраста",
      "нет цен у напитков, десертов и завтраков",
    ],
  },
  {
    level: "P1",
    title: "Заставляет гадать",
    items: [
      "нет количества штук у роллов",
      "обозначение «%» вместо слова «выгода»",
      "новинки оторваны от своих категорий",
      "роллы разбросаны по четырём местам",
    ],
  },
  {
    level: "P2",
    title: "Портит впечатление",
    items: [
      "опечатки в заголовках",
      "цветочная подложка под ценами",
      "вертикальный разделитель на лучшем месте",
      "формулировка акции",
    ],
  },
  {
    level: "P3",
    title: "Упущенные возможности",
    items: [
      "маскот почти не используется",
      "зала в меню нет",
      "нет QR-кода и ссылок на мессенджеры",
      "нет карточки в Яндекс.Картах и 2ГИС",
    ],
  },
];

const CONFIRM = [
  "Количество штук в роллах — в печатном меню его нет вовсе.",
  "«Луковые кольца 150 р. — 6 шт»: 150 — это рубли или граммы?",
  "Цена «Цезаря с тигровой креветкой» — виден только вес 200 г.",
  "Цены на чай (чёрный, зелёный, каркаде) и на десерты.",
  "Завтраки: на скане «уточнять у администратора».",
  "Зона доставки: только по селу или в соседние тоже?",
  "Точная формулировка подарка за заказ от 1500 ₽.",
  "Оригиналы фото зала и маскота в высоком разрешении.",
];

export default function AuditPage() {
  return (
    <main className="mx-auto w-full max-w-[860px] flex-1 px-4 py-14 sm:py-20">
      <Link
        href="/"
        className="inline-flex items-center gap-1.5 text-xs text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="size-3.5" /> Все концепты
      </Link>

      <h1 className="mt-8 text-[clamp(2rem,6vw,3.4rem)] leading-[1.02] font-semibold tracking-tight">
        Аудит печатного меню
      </h1>
      <p className="mt-5 max-w-[62ch] text-[15px] leading-relaxed text-muted-foreground">
        Меню расходится JPG-файлом в Telegram-канале, поэтому я смотрел на него
        не как на полиграфию, а как на интерфейс: житель села открывает картинку
        шириной 1280 px на телефоне и по ней решает, что заказать. Оценка по
        шкале 0–4, где 4 — «претензий нет».
      </p>

      {/* Сводка */}
      <ol className="mt-12 space-y-8">
        {FINDINGS.map((f, i) => (
          <li key={f.area} className="border-t border-border pt-6">
            <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
              <span className="font-mono text-[11px] text-muted-foreground tabular-nums">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h2 className="text-lg font-semibold">{f.area}</h2>
              <span
                className="ml-auto flex items-center gap-1"
                aria-label={`Оценка ${f.score} из 4`}
              >
                {[0, 1, 2, 3].map((n) => (
                  <span
                    key={n}
                    className={
                      n < f.score
                        ? "size-2.5 rounded-full bg-foreground"
                        : "size-2.5 rounded-full border border-border"
                    }
                  />
                ))}
                <span className="ml-1 font-mono text-[11px] text-muted-foreground tabular-nums">
                  {f.score}/4
                </span>
              </span>
            </div>

            <p className="mt-3 text-[14.5px] leading-relaxed">{f.problem}</p>
            <p className="mt-3 border-l-2 border-foreground/25 pl-4 text-[14.5px] leading-relaxed text-muted-foreground">
              <b className="font-semibold text-foreground">Что делает сайт. </b>
              {f.fix}
            </p>
          </li>
        ))}
      </ol>

      {/* Приоритеты */}
      <h2 className="mt-16 text-2xl font-semibold tracking-tight">Приоритеты</h2>
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {PRIORITIES.map((p) => (
          <section key={p.level} className="rounded-2xl border border-border bg-card p-5">
            <p className="font-mono text-[11px] tracking-[0.14em] text-muted-foreground">
              {p.level}
            </p>
            <h3 className="mt-1 text-base font-semibold">{p.title}</h3>
            <ul className="mt-3 space-y-1.5 text-[13.5px] leading-relaxed text-muted-foreground">
              {p.items.map((it) => (
                <li key={it} className="flex gap-2">
                  <span aria-hidden="true">—</span>
                  {it}
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>

      {/* Что подтвердить */}
      <h2 className="mt-16 text-2xl font-semibold tracking-tight">Что нужно подтвердить</h2>
      <p className="mt-3 max-w-[62ch] text-[14.5px] leading-relaxed text-muted-foreground">
        Часть данных снята со сканов и читается неуверенно. Такие позиции стоят
        на сайте как «цену уточните по телефону» — сайт не выдумывает цифры.
      </p>
      <ul className="mt-6 space-y-2 text-[14.5px] leading-relaxed">
        {CONFIRM.map((c) => (
          <li key={c} className="flex gap-3 border-b border-border pb-2">
            <input
              type="checkbox"
              className="mt-1 size-4 shrink-0 accent-current"
              aria-label={c}
            />
            <span>{c}</span>
          </li>
        ))}
      </ul>

      {/* Сканы */}
      <h2 className="mt-16 text-2xl font-semibold tracking-tight">Источник</h2>
      <p className="mt-3 text-[14.5px] text-muted-foreground">
        Два разворота печатного меню, ~200 позиций. Это первоисточник всех цен
        на сайте.
      </p>
      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        {["menu-1", "menu-2"].map((n, i) => (
          <a
            key={n}
            href={`/scans/${n}.jpg`}
            target="_blank"
            rel="noopener noreferrer"
            className="block overflow-hidden rounded-xl border border-border transition-opacity hover:opacity-90"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`/scans/${n}.jpg`}
              alt={`Печатное меню «Авто суши Япончик», разворот ${i + 1}`}
              className="w-full"
              loading="lazy"
            />
          </a>
        ))}
      </div>

      <footer className="mt-16 border-t border-border pt-6 text-xs text-muted-foreground">
        {CONTACTS.name} · {CONTACTS.city}, {CONTACTS.street} · {CONTACTS.hours}
      </footer>
    </main>
  );
}
