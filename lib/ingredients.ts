/**
 * Разбор состава блюда на слои иллюстрации.
 * Фото блюд нет, поэтому картинка собирается из текста состава:
 * «рис, лосось, сыр, огурец» → срез ролла с тремя начинками.
 */

export interface Ingredient {
  key: string;
  label: string;
  color: string;
}

/** Порядок важен: длинные названия идут раньше коротких. */
const TABLE: { re: RegExp; ing: Ingredient }[] = [
  { re: /тигров\w* креветк/i, ing: { key: "tiger", label: "тигровая креветка", color: "#F0824A" } },
  { re: /королевск\w* креветк/i, ing: { key: "king", label: "королевская креветка", color: "#F2925F" } },
  { re: /креветк/i, ing: { key: "shrimp", label: "креветка", color: "#F6A98C" } },
  { re: /копч[ёе]н\w* лосос/i, ing: { key: "smoked", label: "копчёный лосось", color: "#E08A5F" } },
  { re: /маринованн\w* лосос/i, ing: { key: "marinated", label: "маринованный лосось", color: "#EC8C63" } },
  { re: /жарен\w* лосос/i, ing: { key: "friedsalmon", label: "жареный лосось", color: "#D4734A" } },
  { re: /лосос|с[ёе]мг/i, ing: { key: "salmon", label: "лосось", color: "#F4845A" } },
  { re: /тунц|тунец|стружк\w* тунц/i, ing: { key: "tuna", label: "тунец", color: "#C2453E" } },
  { re: /угор|угр[ёе]м|угря/i, ing: { key: "eel", label: "угорь", color: "#6B3E24" } },
  { re: /сн[ёе]жн\w* краб|краб/i, ing: { key: "crab", label: "краб", color: "#EFD9C6" } },
  { re: /окун/i, ing: { key: "perch", label: "окунь", color: "#EFE3D6" } },
  { re: /мидии|мидий/i, ing: { key: "mussel", label: "мидии", color: "#D9944F" } },
  { re: /кальмар/i, ing: { key: "squid", label: "кальмар", color: "#EFE6DA" } },
  { re: /ч[ёе]рн\w* масаго/i, ing: { key: "blackroe", label: "чёрная масаго", color: "#2F3033" } },
  { re: /зел[ёе]н\w* масаго/i, ing: { key: "greenroe", label: "зелёная масаго", color: "#7FA83C" } },
  { re: /масаго|тобико|икра летуч/i, ing: { key: "masago", label: "масаго", color: "#F2802A" } },
  { re: /икра деликатесн|икра лосос|икур|икра/i, ing: { key: "ikura", label: "икра", color: "#EE6C2B" } },
  { re: /сыр ч[ае]ддер|ч[ае]ддер/i, ing: { key: "cheddar", label: "чеддер", color: "#F2A93B" } },
  { re: /пармезан/i, ing: { key: "parmesan", label: "пармезан", color: "#F0DFAE" } },
  { re: /моцарелл/i, ing: { key: "mozzarella", label: "моцарелла", color: "#FBF4E4" } },
  { re: /кремет|хохланд|творожн\w* сыр|сыр/i, ing: { key: "cheese", label: "сыр", color: "#FAF0D8" } },
  { re: /авокадо/i, ing: { key: "avocado", label: "авокадо", color: "#8CB369" } },
  { re: /огур/i, ing: { key: "cucumber", label: "огурец", color: "#7FB069" } },
  { re: /чука/i, ing: { key: "chuka", label: "чука", color: "#3E7A3A" } },
  { re: /дайкон/i, ing: { key: "daikon", label: "дайкон", color: "#F6F2E8" } },
  { re: /омлет|блинчик/i, ing: { key: "omelet", label: "омлет", color: "#F7D046" } },
  { re: /кури|цыпл/i, ing: { key: "chicken", label: "курица", color: "#E8C79A" } },
  { re: /бекон/i, ing: { key: "bacon", label: "бекон", color: "#C25A3C" } },
  { re: /говядин|котлет/i, ing: { key: "beef", label: "говядина", color: "#A8452F" } },
  { re: /салями|пепперони|сервелат|ветчин|колбаск/i, ing: { key: "salami", label: "салями", color: "#C04A3E" } },
  { re: /помидор|томат/i, ing: { key: "tomato", label: "помидор", color: "#D6412F" } },
  { re: /шампиньон|гриб/i, ing: { key: "mushroom", label: "шампиньоны", color: "#C9B49A" } },
  { re: /перец болгарск|болгарск/i, ing: { key: "pepper", label: "перец", color: "#D94F2B" } },
  { re: /халапеньо|кимчи|остр\w* соус|спайси/i, ing: { key: "spicy", label: "острый соус", color: "#D63A22" } },
  { re: /ананас/i, ing: { key: "pineapple", label: "ананас", color: "#F2C541" } },
  { re: /маслин/i, ing: { key: "olive", label: "маслины", color: "#3B3B46" } },
  { re: /лист салата|салат романо|салатн\w* микс/i, ing: { key: "lettuce", label: "салат", color: "#6FA84B" } },
  { re: /лук/i, ing: { key: "onion", label: "лук", color: "#EBDCEB" } },
  { re: /майонез/i, ing: { key: "mayo", label: "майонез", color: "#FFF6E0" } },
  { re: /темпур|кляр|панировк/i, ing: { key: "tempura", label: "темпура", color: "#E3A84E" } },
];

const OUTSIDE = new Set(["masago", "ikura", "blackroe", "greenroe"]);

export interface DishRecipe {
  /** Начинки в середине среза */
  fillings: Ingredient[];
  /** Икра снаружи, по ободу риса */
  roe?: Ingredient;
  sesame: boolean;
  /** Рис снаружи (урамаки) вместо нори */
  riceOutside: boolean;
}

export function parseRecipe(desc: string, tags: readonly string[] = []): DishRecipe {
  const found: Ingredient[] = [];
  const seen = new Set<string>();

  for (const { re, ing } of TABLE) {
    if (found.length >= 6) break;
    if (seen.has(ing.key)) continue;
    if (re.test(desc)) {
      seen.add(ing.key);
      found.push(ing);
    }
  }

  const roe = found.find((i) => OUTSIDE.has(i.key));
  const sesame = /кунжут/i.test(desc);
  const fillings = found.filter((i) => i !== roe).slice(0, 5);

  return {
    fillings: fillings.length ? fillings : [{ key: "rice", label: "рис", color: "#EFE6D4" }],
    roe,
    sesame,
    riceOutside:
      Boolean(roe) || sesame || tags.includes("baked") || tags.includes("fried"),
  };
}
