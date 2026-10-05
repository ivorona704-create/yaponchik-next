import Link from "next/link";
import { ArrowRight, ClipboardList, ToggleRight } from "lucide-react";
import { CONTACTS, ITEM_COUNT } from "@/lib/menu";

const CONCEPTS = [
  {
    href: "/classic",
    index: "01",
    name: "Классика",
    tagline: "Самый первый сайт",
    wow: "Логотип-маскот и всё меню на виду",
    text: "Тёплая песочная палитра с фото зала, красный акцент и привычная структура. Без трюков: 202 позиции одним списком, у каждого раздела счётчик.",
    palette: ["#F2EBE1", "#D22E2E", "#B98F55", "#232426"],
  },
  {
    href: "/moss",
    index: "02",
    name: "Мох",
    tagline: "Вечер в зале",
    wow: "Прожектор по курсору",
    text: "Зал в полумраке, курсор работает как луч плетёной лампы. Переключатель тем — выключатель света.",
    palette: ["#0F1C14", "#1F3A2B", "#C8A45A", "#FFCF7A"],
  },
  {
    href: "/kaiten",
    index: "03",
    name: "Конвейер",
    tagline: "Кайтен-суши",
    wow: "Горизонтальный пин ленты",
    text: "Лента с тарелками едет вбок от вертикального скролла. Цвет тарелки — это цена, как в настоящем кайтене.",
    palette: ["#FBF8F3", "#E2561A", "#DFE4E8", "#17181A"],
  },
  {
    href: "/sensei",
    index: "04",
    name: "Сэнсэй",
    tagline: "Манга с ворчливым поваром",
    wow: "Курсор-палочки и живой маскот",
    text: "Палочки вместо курсора бросают кусочек в поднос маскота, а тот меняет лицо по мере роста заказа.",
    palette: ["#F6F1E7", "#D7261E", "#111111", "#E8E1D3"],
  },
];

export default function HubPage() {
  return (
    <main className="mx-auto w-full max-w-[1180px] flex-1 px-4 py-16 sm:py-24">
      <header className="max-w-[46ch]">
        <p className="font-mono text-[11px] tracking-[0.2em] text-muted-foreground uppercase">
          {CONTACTS.name} · {CONTACTS.city}
        </p>
        <h1 className="mt-4 text-[clamp(2.4rem,7vw,4.5rem)] leading-[0.95] font-semibold tracking-tight">
          Четыре концепта сайта
        </h1>
        <p className="mt-5 text-[15px] leading-relaxed text-muted-foreground">
          Одно меню на {ITEM_COUNT} позиций, одна корзина с отправкой заказа в
          WhatsApp — и четыре разных визуальных мира. Первый знаком: это самый
          первый сайт «Япончика». Остальные три строят бренд на зале и маскоте.
        </p>

        <div className="mt-6 flex flex-wrap gap-2">
          <Link
            href="/audit"
            className="inline-flex h-10 items-center gap-2 rounded-full border border-border px-4 text-sm transition-colors hover:bg-muted"
          >
            <ClipboardList className="size-4" /> Аудит печатного меню
          </Link>
          <Link
            href="/switcher"
            className="inline-flex h-10 items-center gap-2 rounded-full border border-border px-4 text-sm transition-colors hover:bg-muted"
          >
            <ToggleRight className="size-4" /> Переключатель тем
          </Link>
        </div>
      </header>

      <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {CONCEPTS.map((c) => (
          <Link
            key={c.href}
            href={c.href}
            className="group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-card p-6 transition-all hover:-translate-y-1 hover:shadow-xl"
          >
            <div className="flex items-baseline justify-between">
              <span className="font-mono text-[11px] tracking-[0.18em] text-muted-foreground">
                {c.index}
              </span>
              <ArrowRight className="size-4 -translate-x-1 opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100" />
            </div>

            <h2 className="mt-4 text-2xl font-semibold tracking-tight">{c.name}</h2>
            <p className="text-sm text-muted-foreground">{c.tagline}</p>

            <p className="mt-5 flex-1 text-[13px] leading-relaxed text-muted-foreground">
              {c.text}
            </p>

            <p className="mt-5 text-[11px] tracking-[0.12em] uppercase">
              Вау-эффект
              <span className="mt-1 block text-[13px] tracking-normal normal-case">
                {c.wow}
              </span>
            </p>

            <div className="mt-5 flex gap-1.5">
              {c.palette.map((p) => (
                <span
                  key={p}
                  className="size-6 rounded-full border border-black/10"
                  style={{ background: p }}
                />
              ))}
            </div>
          </Link>
        ))}
      </div>

      <footer className="mt-16 border-t border-border pt-6 text-xs text-muted-foreground">
        {CONTACTS.city}, {CONTACTS.street} · {CONTACTS.hours} ·{" "}
        {CONTACTS.phones.map((p) => p.pretty).join(" · ")}
      </footer>
    </main>
  );
}
