import { KIND_BY_ITEM, type Kind, type MenuItem } from "@/lib/menu";
import { parseRecipe } from "@/lib/ingredients";
import { hashUnit } from "@/lib/utils";

/**
 * Иллюстрация блюда вместо фотографии.
 * Срез ролла собирается из состава: рис, нори, начинки секторами,
 * икра и кунжут по ободу, корочка у жареных, шапка соуса у запечённых.
 * Поворот зависит от id — двух одинаковых картинок в меню нет.
 *
 *   line — золотая гравюра    («Мох»)
 *   flat — цветная плоская    («Конвейер»)
 *   ink  — тушь и растр       («Сэнсэй»)
 */
export type GlyphStyle = "line" | "flat" | "ink";

const NORI = "#22301F";
const RICE = "#F7F1E4";

interface Props {
  item: MenuItem;
  style?: GlyphStyle;
  className?: string;
  /** Переопределить форму, если блюдо рисуется вне своей категории */
  kind?: Kind;
}

export function DishGlyph({ item, style = "flat", className, kind }: Props) {
  const k = kind ?? KIND_BY_ITEM[item.id] ?? "roll";
  const seed = hashUnit(item.id);
  const rotate = Math.round(seed * 360);

  return (
    <svg
      viewBox="0 0 100 100"
      className={className}
      role="img"
      aria-label={`${item.name} — рисунок блюда`}
      fill="none"
    >
      <g transform={`rotate(${k === "roll" || k === "donut" ? rotate : 0} 50 50)`}>
        <Shape kind={k} item={item} style={style} seed={seed} />
      </g>
    </svg>
  );
}

function Shape({
  kind,
  item,
  style,
  seed,
}: {
  kind: Kind;
  item: MenuItem;
  style: GlyphStyle;
  seed: number;
}) {
  switch (kind) {
    case "nigiri":
      return <Nigiri item={item} style={style} />;
    case "donut":
      return <Donut item={item} style={style} />;
    case "set":
      return <SetPlate style={style} seed={seed} />;
    case "pizza":
      return <Pizza item={item} style={style} seed={seed} />;
    case "burger":
      return <Burger style={style} />;
    case "shake":
      return <Shake item={item} style={style} />;
    case "sauce":
      return <SauceCup item={item} style={style} />;
    case "drink":
      return <DrinkCup style={style} />;
    case "dessert":
      return <Dessert style={style} />;
    case "salad":
      return <SaladBowl item={item} style={style} />;
    case "hot":
      return <HotBasket style={style} />;
    default:
      return <Roll item={item} style={style} seed={seed} />;
  }
}

/* ══════════════════════ Общие помощники стиля ══════════════════════ */

/**
 * Манга знает четыре значения: тушь, киноварь, полутон и чистая бумага.
 * Раскладываем ингредиент по его же цвету, иначе все суши в меню
 * получились бы одинаковыми красными пятнами.
 */
function inkTone(color: string): { fill: string; fillOpacity?: number } {
  const hex = color.replace("#", "");
  const r = parseInt(hex.slice(0, 2), 16) / 255;
  const g = parseInt(hex.slice(2, 4), 16) / 255;
  const b = parseInt(hex.slice(4, 6), 16) / 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const lightness = (max + min) / 2;
  const chroma = max - min;

  // угорь, тунец, говядина, чёрная икра — сплошная тушь
  if (lightness < 0.45) return { fill: "currentColor" };
  // огурец, авокадо, чука — полутон
  if (g >= r && g > b) return { fill: "var(--brand)", fillOpacity: 0.32 };
  // сыр, майонез, дайкон, рис — чистая бумага
  if (lightness > 0.84 && chroma < 0.28) return { fill: "var(--surface)" };
  // лосось, креветка, икра, омлет — киноварь, светлое бледнее
  return { fill: "var(--brand)", fillOpacity: lightness > 0.78 ? 0.62 : 1 };
}

/** В line-режиме цвет ингредиента не используется: рисуем золотом. */
function paint(style: GlyphStyle, color: string, index = 0) {
  if (style === "line") {
    return {
      fill: "currentColor",
      fillOpacity: 0.08 + (index % 3) * 0.09,
      stroke: "currentColor",
      strokeWidth: 1.6,
      strokeOpacity: 0.85,
    };
  }
  if (style === "ink") {
    return {
      ...inkTone(color),
      stroke: "currentColor",
      strokeWidth: 2.4,
      strokeLinejoin: "round" as const,
    };
  }
  return { fill: color, stroke: "rgb(0 0 0 / 0.18)", strokeWidth: 1 };
}

function base(style: GlyphStyle, color: string) {
  if (style === "line")
    return { fill: "none", stroke: "currentColor", strokeWidth: 1.8, strokeOpacity: 0.9 };
  if (style === "ink")
    return {
      fill: "var(--surface, #FFFDF7)",
      stroke: "currentColor",
      strokeWidth: 2.6,
      strokeLinejoin: "round" as const,
    };
  return { fill: color, stroke: "rgb(0 0 0 / 0.16)", strokeWidth: 1.1 };
}

/**
 * Math.sin/cos в Node и в браузере расходятся в последних разрядах,
 * поэтому все вычисленные координаты округляем — иначе React ругается
 * на несовпадение серверной и клиентской разметки.
 */
const r2 = (n: number) => Math.round(n * 100) / 100;

/** Точки по окружности — икра и кунжут на ободе */
function ring(radius: number, count: number, dot: number, offset = 0) {
  return Array.from({ length: count }, (_, i) => {
    const a = ((i + offset) / count) * Math.PI * 2;
    return { cx: r2(50 + Math.cos(a) * radius), cy: r2(50 + Math.sin(a) * radius), r: dot };
  });
}

/** Волнистая окружность — хрустящая корочка темпуры */
function crustPath(radius: number, bumps = 16, amp = 2.4) {
  const pts: string[] = [];
  const steps = bumps * 6;
  for (let i = 0; i <= steps; i++) {
    const a = (i / steps) * Math.PI * 2;
    const r = radius + Math.sin(a * bumps) * amp;
    const x = 50 + Math.cos(a) * r;
    const y = 50 + Math.sin(a) * r;
    pts.push(`${i === 0 ? "M" : "L"}${x.toFixed(2)} ${y.toFixed(2)}`);
  }
  return pts.join(" ") + " Z";
}

/** Раскладка начинок внутри среза */
function layout(n: number): { x: number; y: number; r: number }[] {
  if (n <= 1) return [{ x: 50, y: 50, r: 13 }];
  if (n === 2)
    return [
      { x: 41, y: 50, r: 10 },
      { x: 59, y: 50, r: 10 },
    ];
  if (n === 3)
    return [0, 1, 2].map((i) => {
      const a = (i / 3) * Math.PI * 2 - Math.PI / 2;
      return { x: r2(50 + Math.cos(a) * 10), y: r2(50 + Math.sin(a) * 10), r: 8.6 };
    });
  if (n === 4)
    return [0, 1, 2, 3].map((i) => {
      const a = (i / 4) * Math.PI * 2 - Math.PI / 4;
      return { x: r2(50 + Math.cos(a) * 10.5), y: r2(50 + Math.sin(a) * 10.5), r: 8 };
    });
  return [
    { x: 50, y: 50, r: 7.6 },
    ...[0, 1, 2, 3].map((i) => {
      const a = (i / 4) * Math.PI * 2 - Math.PI / 4;
      return { x: r2(50 + Math.cos(a) * 13.5), y: r2(50 + Math.sin(a) * 13.5), r: 6.6 };
    }),
  ];
}

/* ══════════════════════════════ Ролл ══════════════════════════════ */

function Roll({ item, style, seed }: { item: MenuItem; style: GlyphStyle; seed: number }) {
  const tags = item.tags ?? [];
  const recipe = parseRecipe(item.desc || item.name, tags);
  const fried = tags.includes("fried");
  const baked = tags.includes("baked");
  const slots = layout(recipe.fillings.length);

  return (
    <>
      {/* Обод: нори снаружи или рис с корочкой */}
      {fried ? (
        <path d={crustPath(45, 18, 2.6)} {...base(style, "#E3A84E")} />
      ) : (
        <circle cx="50" cy="50" r="45" {...base(style, recipe.riceOutside ? RICE : NORI)} />
      )}

      {recipe.riceOutside || fried ? (
        <>
          {!fried && <circle cx="50" cy="50" r="45" {...base(style, RICE)} />}
          <circle
            cx="50"
            cy="50"
            r="29"
            {...(style === "flat"
              ? { fill: NORI }
              : { fill: "none", stroke: "currentColor", strokeWidth: style === "ink" ? 2.4 : 1.4, strokeOpacity: 0.75 })}
          />
          <circle cx="50" cy="50" r="25.5" {...base(style, RICE)} />
        </>
      ) : (
        <circle cx="50" cy="50" r="38" {...base(style, RICE)} />
      )}

      {/* Начинки */}
      {recipe.fillings.map((ing, i) => (
        <circle
          key={ing.key}
          cx={slots[i].x}
          cy={slots[i].y}
          r={slots[i].r}
          {...paint(style, ing.color, i)}
        />
      ))}

      {/* Икра по ободу */}
      {recipe.roe &&
        ring(41, 26, 2.1, seed * 3).map((d, i) => (
          <circle
            key={`roe-${i}`}
            {...d}
            {...(style === "flat"
              ? { fill: recipe.roe!.color }
              : { fill: "currentColor", fillOpacity: style === "ink" ? 1 : 0.55 })}
          />
        ))}

      {/* Кунжут */}
      {recipe.sesame &&
        ring(41.5, 18, 1.5, seed * 5 + 0.5).map((d, i) => (
          <ellipse
            key={`ses-${i}`}
            cx={d.cx}
            cy={d.cy}
            rx={d.r * 1.4}
            ry={d.r}
            {...(style === "flat"
              ? { fill: "#D9CBAE" }
              : { fill: "currentColor", fillOpacity: 0.45 })}
          />
        ))}

      {/* Запечённая шапка */}
      {baked && (
        <path
          d="M18 38 Q50 8 82 38 Q50 30 18 38 Z"
          {...(style === "flat"
            ? { fill: "#F2C77A", stroke: "rgb(0 0 0 / 0.14)", strokeWidth: 1 }
            : { fill: "currentColor", fillOpacity: style === "ink" ? 1 : 0.22, stroke: "currentColor", strokeWidth: 1.8 })}
        />
      )}
    </>
  );
}

/* ══════════════════════════════ Суши ══════════════════════════════ */

function Nigiri({ item, style }: { item: MenuItem; style: GlyphStyle }) {
  const recipe = parseRecipe(item.desc || item.name, item.tags ?? []);
  const top = recipe.roe ?? recipe.fillings[0];
  const gunkan = Boolean(recipe.roe) || /чука/i.test(item.desc);

  return (
    <>
      {/* Рисовая подушка */}
      <rect x="12" y="46" width="76" height="36" rx="18" {...base(style, RICE)} />

      {gunkan ? (
        <>
          {/* Полоска нори вокруг подушки */}
          <rect
            x="10"
            y="34"
            width="80"
            height="44"
            rx="10"
            {...(style === "flat"
              ? { fill: NORI }
              : { fill: "none", stroke: "currentColor", strokeWidth: 2.2 })}
          />
          <rect x="16" y="39" width="68" height="15" rx="7.5" {...paint(style, top.color, 0)} />
        </>
      ) : (
        <path d="M6 50 Q50 16 94 50 Q50 64 6 50 Z" {...paint(style, top.color, 0)} />
      )}
    </>
  );
}

/* ════════════════════════════ Пончик ════════════════════════════ */

function Donut({ item, style }: { item: MenuItem; style: GlyphStyle }) {
  const recipe = parseRecipe(item.desc || item.name, item.tags ?? []);
  const glaze = recipe.fillings[0];

  return (
    <>
      <circle cx="50" cy="50" r="44" {...base(style, RICE)} />
      <circle
        cx="50"
        cy="50"
        r="43"
        fill="none"
        {...(style === "flat"
          ? { stroke: glaze.color, strokeWidth: 14, strokeOpacity: 0.9 }
          : { stroke: "currentColor", strokeWidth: style === "ink" ? 3 : 2, strokeOpacity: 0.8 })}
        strokeDasharray={style === "flat" ? undefined : "10 6"}
      />
      <circle cx="50" cy="50" r="16" {...base(style, "var(--background, #fff)")} />
      {ring(43, 14, 2, 0.3).map((d, i) => (
        <circle
          key={i}
          {...d}
          {...(style === "flat" ? { fill: "#FFF6E0" } : { fill: "currentColor", fillOpacity: 0.5 })}
        />
      ))}
    </>
  );
}

/* ══════════════════════════════ Сет ══════════════════════════════ */

function SetPlate({ style, seed }: { style: GlyphStyle; seed: number }) {
  const spots = [
    { x: 32, y: 34, s: 0.46 },
    { x: 66, y: 30, s: 0.4 },
    { x: 30, y: 68, s: 0.4 },
    { x: 64, y: 66, s: 0.5 },
    { x: 50, y: 50, s: 0.34 },
  ];
  const colors = ["#F4845A", "#C2453E", "#8CB369", "#F2802A", "#6B3E24"];

  return (
    <>
      <rect x="6" y="14" width="88" height="72" rx="10" {...base(style, "var(--surface-2, #E9E2D4)")} />
      {spots.map((s, i) => (
        <g key={i} transform={`translate(${s.x - 50 * s.s} ${s.y - 50 * s.s}) scale(${s.s}) rotate(${Math.round(seed * 360 + i * 47)} 50 50)`}>
          <circle cx="50" cy="50" r="45" {...base(style, NORI)} />
          <circle cx="50" cy="50" r="36" {...base(style, RICE)} />
          <circle cx="50" cy="50" r="15" {...paint(style, colors[i % colors.length], i)} />
        </g>
      ))}
    </>
  );
}

/* ═════════════════════════════ Пицца ═════════════════════════════ */

function Pizza({ item, style, seed }: { item: MenuItem; style: GlyphStyle; seed: number }) {
  const recipe = parseRecipe(item.desc || item.name, item.tags ?? []);
  const toppings = recipe.fillings.slice(0, 4);

  return (
    <>
      <circle cx="50" cy="50" r="45" {...base(style, "#E7B76A")} />
      <circle cx="50" cy="50" r="37" {...base(style, "#F6DFA8")} />
      {[0, 1, 2, 3, 4, 5].map((i) => {
        const a = (i / 6) * Math.PI * 2 + seed;
        return (
          <line
            key={i}
            x1="50"
            y1="50"
            x2={r2(50 + Math.cos(a) * 37)}
            y2={r2(50 + Math.sin(a) * 37)}
            stroke="currentColor"
            strokeOpacity={style === "flat" ? 0.18 : 0.5}
            strokeWidth="1.2"
          />
        );
      })}
      {toppings.flatMap((ing, i) =>
        [0, 1, 2].map((j) => {
          const a = ((i * 3 + j) / (toppings.length * 3)) * Math.PI * 2 + seed * 2;
          const r = 14 + ((i + j) % 3) * 8;
          return (
            <circle
              key={`${ing.key}-${j}`}
              cx={r2(50 + Math.cos(a) * r)}
              cy={r2(50 + Math.sin(a) * r)}
              r={5.2 - (j % 2)}
              {...paint(style, ing.color, i)}
            />
          );
        }),
      )}
    </>
  );
}

/* ════════════════════════════ Бургер ════════════════════════════ */

function Burger({ style }: { style: GlyphStyle }) {
  const sesameSeeds = [
    [34, 30],
    [50, 24],
    [66, 30],
    [42, 36],
    [58, 36],
  ];

  return (
    <>
      {/* Верхняя булочка бриош с кунжутом */}
      <path d="M12 44 Q50 8 88 44 Z" {...base(style, "#E0A25E")} />
      {sesameSeeds.map(([cx, cy], i) => (
        <ellipse
          key={i}
          cx={cx}
          cy={cy}
          rx="2.6"
          ry="1.8"
          {...(style === "flat"
            ? { fill: "#FFF4DD" }
            : { fill: "currentColor", fillOpacity: 0.5 })}
        />
      ))}
      <path d="M10 48 Q50 40 90 48 Q50 58 10 48 Z" {...base(style, "#6FA84B")} />
      <rect x="12" y="55" width="76" height="13" rx="6" {...base(style, "#A8452F")} />
      <path d="M14 72 Q50 92 86 72 Z" {...base(style, "#E0A25E")} />
    </>
  );
}

/* ═══════════════════════════ Коктейль ═══════════════════════════ */

function Shake({ item, style }: { item: MenuItem; style: GlyphStyle }) {
  const flavor: Record<string, string> = {
    "sh-strawberry": "#F08099",
    "sh-chocolate": "#8A5A3C",
    "sh-banana": "#F2D257",
    "sh-mango": "#F0A63C",
    "sh-plombir": "#FBF1DC",
  };
  const color = flavor[item.id] ?? "#F0A63C";
  return (
    <>
      <rect x="20" y="16" width="8" height="30" rx="4" transform="rotate(14 24 30)" {...base(style, "#D9534F")} />
      <path d="M30 34 H70 L64 88 H36 Z" {...base(style, color)} />
      <path d="M30 34 H70 L68 44 H32 Z" {...base(style, "#FFFAF0")} />
      <circle cx="50" cy="28" r="10" {...base(style, "#FFFAF0")} />
    </>
  );
}

/* ═══════════════════════════ Соус, напиток ═══════════════════════════ */

function SauceCup({ item, style }: { item: MenuItem; style: GlyphStyle }) {
  const recipe = parseRecipe(item.name, item.tags ?? []);
  const spicy = (item.tags ?? []).includes("spicy");
  const color = spicy ? "#D63A22" : recipe.fillings[0]?.color ?? "#8A5A3C";
  return (
    <>
      <circle cx="50" cy="50" r="40" {...base(style, "var(--surface-2, #E9E2D4)")} />
      <circle cx="50" cy="50" r="29" {...paint(style, color, 0)} />
      <ellipse cx="41" cy="41" rx="7" ry="4.5" transform="rotate(-25 41 41)" fill="#fff" fillOpacity={style === "flat" ? 0.35 : 0.18} />
    </>
  );
}

function DrinkCup({ style }: { style: GlyphStyle }) {
  return (
    <>
      <path d="M31 24 H69 L64 90 H36 Z" {...base(style, "#E8E3D8")} />
      <rect x="27" y="16" width="46" height="11" rx="5" {...base(style, "#C9553C")} />
      <path d="M34 40 H66 L62 84 H38 Z" {...base(style, "#6B3E24")} />
    </>
  );
}

function Dessert({ style }: { style: GlyphStyle }) {
  return (
    <>
      <path d="M26 46 H74 L68 86 H32 Z" {...base(style, "#F2DFC0")} />
      <path d="M24 38 Q50 22 76 38 Q76 48 24 48 Z" {...base(style, "#E88AA0")} />
      <circle cx="50" cy="26" r="7" {...base(style, "#D6412F")} />
      <rect x="28" y="58" width="44" height="7" rx="3.5" {...base(style, "#C9A87C")} />
    </>
  );
}

/* ═══════════════════════════ Салат, горячее ═══════════════════════════ */

function SaladBowl({ item, style }: { item: MenuItem; style: GlyphStyle }) {
  const recipe = parseRecipe(item.desc || item.name, item.tags ?? []);
  return (
    <>
      {[
        [34, 40, -22],
        [50, 34, 4],
        [66, 40, 24],
        [42, 44, -8],
        [58, 44, 12],
      ].map(([cx, cy, rot], i) => (
        <ellipse
          key={i}
          cx={cx}
          cy={cy}
          rx="13"
          ry="9"
          transform={`rotate(${rot} ${cx} ${cy})`}
          {...paint(style, recipe.fillings[i % recipe.fillings.length].color, i)}
        />
      ))}
      <path d="M14 50 H86 Q84 84 50 84 Q16 84 14 50 Z" {...base(style, "var(--surface-2, #E9E2D4)")} />
      <ellipse cx="50" cy="50" rx="36" ry="6" {...base(style, "var(--surface, #fff)")} />
    </>
  );
}

function HotBasket({ style }: { style: GlyphStyle }) {
  return (
    <>
      {[
        [34, 20, -16],
        [46, 14, -4],
        [58, 16, 8],
        [68, 24, 20],
      ].map(([x, y, rot], i) => (
        <rect
          key={i}
          x={x}
          y={y}
          width="9"
          height="46"
          rx="4"
          transform={`rotate(${rot} ${x + 4} ${y + 20})`}
          {...paint(style, "#F0B948", i)}
        />
      ))}
      <path d="M22 52 H78 L70 88 H30 Z" {...base(style, "#C9543A")} />
      <rect x="28" y="60" width="44" height="5" rx="2.5" fill="#fff" fillOpacity={style === "flat" ? 0.35 : 0.15} />
    </>
  );
}
