/**
 * ═══════════════════════════════════════════════════════════════════════════
 *  АВТО СУШИ ЯПОНЧИК — все данные сайта
 *  с. Александров-Гай, ул. Красного Бойца, 41
 * ═══════════════════════════════════════════════════════════════════════════
 *
 *  Это ЕДИНСТВЕННЫЙ файл, который нужно править, чтобы обновить сайт:
 *  меню, цены, телефоны, адрес, акции. Остальные файлы трогать не надо.
 *
 *  Источник — два скана печатного меню (yaponchik/assets/menu-*.jpg),
 *  описание Telegram-канала и уточнения владельца.
 *
 *  price: null  → покажет «цену уточните по телефону»
 *  variants     → несколько размеров/начинок, каждый добавляется отдельно
 *  pieces       → количество штук в порции; в печатном меню его нет,
 *                 заполняется по мере подтверждения владельцем
 */

export type Tag = "hit" | "new" | "spicy" | "baked" | "fried";

/** Форма блюда для процедурной иллюстрации вместо фото */
export type Kind =
  | "nigiri"
  | "roll"
  | "donut"
  | "set"
  | "salad"
  | "hot"
  | "burger"
  | "pizza"
  | "shake"
  | "sauce"
  | "drink"
  | "dessert";

export interface Variant {
  label: string;
  price: number;
}

export interface MenuItem {
  id: string;
  name: string;
  desc: string;
  price?: number | null;
  variants?: Variant[];
  weight?: string;
  pieces?: number;
  tags?: Tag[];
  /** Выгода сета в рублях против сборки теми же позициями поштучно */
  benefit?: number;
}

export interface MenuCategory {
  id: string;
  name: string;
  short: string;
  kind: Kind;
  desc: string;
  items: MenuItem[];
}

/* ═══════════════════════ КОНТАКТЫ И УСЛОВИЯ ═══════════════════════ */

export const CONTACTS = {
  name: "Авто суши Япончик",
  tagline: "Доставка суши, роллов и пиццы",

  region: "Саратовская область",
  city: "с. Александров-Гай",
  street: "ул. Красного Бойца, 41",
  landmark: "рядом с «Магнитом»",
  coords: { lat: 50.14419, lon: 48.576749 },

  phones: [
    { raw: "+79063136218", pretty: "8 (906) 313-62-18" },
    { raw: "+79271183018", pretty: "8 (927) 118-30-18" },
  ],

  /** На какой номер уходит заказ из корзины через WhatsApp */
  whatsapp: "79271183018",

  hours: "ежедневно с 9:00 до 21:40",
  hoursShort: "9:00 – 21:40",

  /** Порог бесплатной доставки, ₽ */
  freeDeliveryFrom: 800,
  /** Порог подарка, ₽ */
  giftFrom: 1500,

  telegram: "https://t.me/+B41ngwnzEr1kNTI1",
} as const;

export interface Promo {
  icon: string;
  title: string;
  text: string;
  /** Главная акция — выделяется рамкой */
  accent?: boolean;
}

export const PROMOS: Promo[] = [
  {
    icon: "🛵",
    title: "Доставка бесплатно от 800 ₽",
    text: "Собрали заказ на 800 ₽ и больше — привезём без доплаты за доставку.",
    accent: true,
  },
  {
    icon: "🎁",
    title: "Подарок при заказе роллов от 1500 ₽",
    text: "К заказу роллов на 1500 ₽ — набор специй и ролл «Калифорния II» в подарок.",
  },
  {
    icon: "🍱",
    title: "Сеты выгоднее поштучно",
    text: "В каждом сете уже заложена скидка — от 40 до 200 ₽ против сборки теми же позициями по отдельности.",
  },
];

/* ═══════════════════════════ МЕНЮ ═══════════════════════════ */

const pizzaSizes: Variant[] = [
  { label: "33 см", price: 510 },
  { label: "40 см", price: 695 },
];

const shakeSizes: Variant[] = [
  { label: "300 мл", price: 190 },
  { label: "400 мл", price: 205 },
  { label: "500 мл", price: 225 },
];

export const MENU: MenuCategory[] = [
  {
    id: "sushi",
    name: "Суши",
    short: "Суши",
    kind: "nigiri",
    desc: "Нигири на прессованном рисе — с лососем, угрём, креветкой и икрой.",
    items: [
      { id: "s-sake", name: "Сяке", desc: "рис, лосось", price: 135 },
      { id: "s-unagi", name: "Унаги", desc: "рис, копчёный угорь", price: 135 },
      { id: "s-sake-kunse", name: "Сяке кунсей", desc: "рис, копчёный лосось", price: 125 },
      { id: "s-maguro", name: "Магуро", desc: "рис, тунец", price: 130 },
      { id: "s-tai", name: "Тай", desc: "рис, окунь", price: 125 },
      { id: "s-ebi", name: "Эби", desc: "рис, креветка", price: 130 },
      { id: "s-tomago", name: "Томаго", desc: "рис, японский омлет", price: 90 },
      { id: "s-kani", name: "Кани", desc: "рис, краб", price: 115 },
      { id: "s-ikura", name: "Икура", desc: "рис, икра лососевая", price: 130 },
      { id: "s-tobiko", name: "Тобико", desc: "рис, икра летучей рыбы", price: 125 },
      { id: "s-chuka", name: "Чука", desc: "рис, салат чука", price: 105 },
    ],
  },

  {
    id: "sushi-spicy",
    name: "Острые суши",
    short: "Острые",
    kind: "nigiri",
    desc: "Те же нигири, но под фирменным острым соусом.",
    items: [
      { id: "ss-sake", name: "С лососем", desc: "рис, лосось, острый соус", price: 140, tags: ["spicy"] },
      { id: "ss-unagi", name: "С угрём", desc: "рис, угорь, острый соус", price: 140, tags: ["spicy"] },
      { id: "ss-ebi", name: "С креветкой", desc: "рис, креветка, острый соус", price: 140, tags: ["spicy"] },
      { id: "ss-kani", name: "С крабом", desc: "рис, краб, острый соус", price: 125, tags: ["spicy"] },
      { id: "ss-maguro", name: "С тунцом", desc: "рис, тунец, острый соус", price: 140, tags: ["spicy"] },
      { id: "ss-midii", name: "С мидиями", desc: "рис, мидии, острый соус", price: 130, tags: ["spicy"] },
    ],
  },

  {
    id: "rolls-classic",
    name: "Классические роллы",
    short: "Роллы",
    kind: "roll",
    desc: "Основа меню — 56 роллов, от простых маки до больших фирменных.",
    items: [
      { id: "r-sake-maki", name: "Сяке маки", desc: "рис, лосось", price: 190 },
      { id: "r-unagi-maki", name: "Унаги маки", desc: "рис, копчёный угорь", price: 190 },
      { id: "r-teka-maki", name: "Тека маки", desc: "рис, тунец", price: 190 },
      { id: "r-ebi-maki", name: "Эби маки", desc: "рис, креветка, сыр", price: 190 },
      { id: "r-chiz-maki", name: "Чиз маки", desc: "рис, огурец, сыр", price: 120 },
      { id: "r-kappa-maki", name: "Каппа маки", desc: "рис, огурец", price: 110 },
      { id: "r-ovoshnoy", name: "Овощной", desc: "рис, огурец, сыр", price: 170 },
      { id: "r-ikura-maki", name: "Икура маки", desc: "рис, лосось, икра", price: 260 },
      { id: "r-midii-spicy", name: "Мидии спайси", desc: "рис, мидии, спайси соус", price: 195, tags: ["spicy"] },
      { id: "r-futo-maki", name: "Футо маки", desc: "рис, сыр, огурец, лосось, креветка", price: 290 },
      { id: "r-geisha", name: "Гейша", desc: "рис, лосось, сыр, майонез, масаго", price: 290 },
      { id: "r-teishoku", name: "Тейшоку", desc: "рис, лосось, огурец, креветка", price: 310 },
      { id: "r-in-yan", name: "Инь-Янь", desc: "рис, угорь, лосось", price: 300 },
      { id: "r-tori", name: "Тори", desc: "рис, курица, огурец, масаго", price: 310 },
      { id: "r-mega", name: "Мега", desc: "рис, лосось, сыр, огурец, икра", price: 315 },
      { id: "r-bansai", name: "Бансай", desc: "рис, лосось, сыр, огурец, икра деликатесная", price: 300 },
      { id: "r-arigato", name: "Аригато", desc: "фирменный ролл", price: 320 },
      { id: "r-spicy-sake", name: "Спайси-сяке ролл", desc: "рис, лосось, острый соус", price: 305, tags: ["spicy"] },
      { id: "r-spicy-maguro", name: "Спайси-магуро ролл", desc: "рис, тунец, острый соус", price: 305, tags: ["spicy"] },
      { id: "r-spicy-tai", name: "Спайси-тай ролл", desc: "рис, окунь, острый соус", price: 305, tags: ["spicy"] },
      { id: "r-cal-1", name: "Калифорния I", desc: "рис, снежный краб, масаго, креветка, угорь", price: 340 },
      { id: "r-cal-2", name: "Калифорния II", desc: "рис, лосось, огурец, масаго, майонез", price: 300, tags: ["hit"] },
      { id: "r-cal-3", name: "Калифорния III", desc: "рис, креветка, сыр, масаго", price: 350 },
      { id: "r-tate", name: "Татэ ролл", desc: "рис, снежный краб, королевская креветка, огурец, масаго", price: 460 },
      { id: "r-yasiro", name: "Ясиро", desc: "рис, лосось, омлет, снежный краб", price: 285 },
      { id: "r-alaska", name: "Аляска", desc: "рис, лосось, масаго, майонез", price: 330 },
      { id: "r-nezhny", name: "Нежный", desc: "рис, лосось, сыр", price: 410 },
      { id: "r-arizona", name: "Аризона", desc: "рис, говядина, помидор, шампиньоны", price: 320 },
      { id: "r-piramida", name: "Пирамида", desc: "рис, лосось, масаго", price: 380 },
      { id: "r-bonito", name: "Бонито", desc: "рис, лосось, огурец, острый соус, стружка тунца", price: 325, tags: ["spicy"] },
      { id: "r-hawaii", name: "Гавайский", desc: "рис, сыр, огурец, кунжут, лосось", price: 330, tags: ["hit"] },
      { id: "r-europa", name: "Европа", desc: "рис, креветка, лосось, сыр, майонез, масаго", price: 310 },
      { id: "r-totigi", name: "Тотиги", desc: "рис, лосось, омлет, жареный лосось, майонез, масаго", price: 330 },
      { id: "r-umino", name: "Умино", desc: "рис, лосось, тунец, окунь, спайси соус, огурец, стружка тунца", price: 330, tags: ["spicy"] },
      { id: "r-seita", name: "Сейта", desc: "рис, сыр, огурец, жареный лосось, масаго", price: 300 },
      { id: "r-canada", name: "Канада", desc: "рис, лосось, угорь, сыр", price: 400 },
      { id: "r-kasado", name: "Касадо", desc: "рис, лосось, огурец, жареный лосось, стружка тунца", price: 305 },
      { id: "r-korolevsky", name: "Королевский", desc: "рис, сыр, огурец, икра лосося", price: 310 },
      { id: "r-niyama", name: "Нияма", desc: "рис, лосось, огурец, омлет, креветки, копчёный лосось", price: 360 },
      { id: "r-pantera", name: "Пантера", desc: "рис, масаго, сыр, огурец, тунец", price: 335 },
      { id: "r-raduga", name: "Радуга", desc: "рис, лосось, сыр, огурец, тунец", price: 420 },
      { id: "r-yakudzuno", name: "Якудзуно", desc: "рис, лосось, огурец, кунжут", price: 310 },
      { id: "r-samurai", name: "Самурай", desc: "рис, лосось, сыр, маринованный лосось, икра деликатесная", price: 380 },
      { id: "r-texas", name: "Техас", desc: "рис, бекон, огурец, омлет", price: 330 },
      { id: "r-philadelphia", name: "Филадельфия", desc: "рис, лосось, сыр, огурец", price: 480, tags: ["hit"] },
      { id: "r-chuka", name: "Чука ролл", desc: "рис, огурец, омлет, майонез, чука", price: 310 },
      { id: "r-fusion", name: "Фьюжн", desc: "рис, креветка, лосось, огурец, лист салата, кунжут, сыр", price: 325 },
      { id: "r-scotland", name: "Шотландия", desc: "рис, угорь, лосось, сыр, огурец", price: 400 },
      { id: "r-mexico", name: "Мексика", desc: "рис, лосось, сыр, масаго, майонез", price: 360 },
      { id: "r-marble", name: "Мраморный", desc: "рис, лосось, сыр, огурец", price: 320 },
      { id: "r-yellow-sea", name: "Жёлтое море", desc: "рис, лосось, сыр, майонез, огурец, омлет", price: 500 },
      { id: "r-yuko", name: "Юко", desc: "рис, лосось, майонез, угорь, огурец, кунжут", price: 320 },
      { id: "r-asia", name: "Азия", desc: "рис, креветка, сыр, майонез, огурец, яичный омлет, масаго", price: 380 },
      { id: "r-tomago", name: "Томаго ролл", desc: "рис, снежный краб, майонез, масаго, яичный блинчик", price: 310 },
      { id: "r-oregon", name: "Орегон", desc: "рис, лосось, угорь, сыр, огурец", price: 340 },
      { id: "r-yaponchik", name: "Япончик", desc: "рис, сыр, огурец, тигровая креветка в кляре, кунжут", price: 390, tags: ["hit"] },
    ],
  },

  {
    id: "rolls-new",
    name: "Новинки: роллы",
    short: "Новинки",
    kind: "roll",
    desc: "Свежие позиции — авокадо, сыр креметте, тигровая креветка.",
    items: [
      { id: "n-horoshiki", name: "Хорошики", desc: "рис, лосось, авокадо, сыр, креветка", price: 450, tags: ["new"] },
      { id: "n-salmon-chiz", name: "Лосось чиз", desc: "рис, лосось, сыр, сыр чеддер", price: 500, tags: ["new"] },
      { id: "n-hosi-tunec", name: "Хоси тунец", desc: "рис, сыр креметте, тигровая креветка, авокадо, чёрный масаго, фирменный соус", price: 500, tags: ["new"] },
      { id: "n-cesar", name: "Цезарь ролл", desc: "рис, пармезан, филе курицы, лист салата, соус цезарь", price: 350, tags: ["new"] },
      { id: "n-green", name: "Грин ролл", desc: "рис, зелёная масаго, лосось, авокадо, угорь, чука", price: 320, tags: ["new"] },
      { id: "n-avocado", name: "Авокадо маки", desc: "рис, авокадо", price: 140, tags: ["new"] },
      { id: "n-daikon", name: "Дайкон ролл", desc: "рис, сыр креметте, лосось, огурец, дайкон", price: 380, tags: ["new"] },
      { id: "n-fresh", name: "Фреш ролл", desc: "рис, сыр креметте, тигровая креветка, авокадо, огурец, икра деликатесная", price: 420, tags: ["new"] },
      { id: "n-osaka", name: "Осака классик", desc: "рис, омлет, снежный краб, творожный сыр креметте, икра масаго, огурец", price: 320, tags: ["new"] },
      { id: "n-avtorsky", name: "Авторский", desc: "рис, лосось, авокадо, тигровая креветка, угорь, тунец", price: 500, tags: ["new"] },
      { id: "n-4-cheese", name: "Четыре сыра", desc: "рис, сыр хохланд, сыр креметте, сыр чеддер, сыр пармезан", price: 450, tags: ["new"] },
    ],
  },

  {
    id: "rolls-baked",
    name: "Запечённые роллы",
    short: "Запечённые",
    kind: "roll",
    desc: "Под сырно-майонезной шапкой, из печи — подаются горячими.",
    items: [
      { id: "b-nagano", name: "Нагано", desc: "рис, лосось, креветка, майонез, огурец, сыр, масаго", price: 355, tags: ["baked"] },
      { id: "b-nevada", name: "Невада", desc: "рис, креветка, майонез, огурец, омлет, краб, икра, масаго, сыр", price: 340, tags: ["baked"] },
      { id: "b-tokyo", name: "Токио", desc: "рис, лосось, огурец, майонез, масаго, кунжут, сыр", price: 350, tags: ["baked"] },
      { id: "b-kariba", name: "Кариба", desc: "рис, лосось, сыр, майонез, масаго", price: 320, tags: ["baked"] },
      { id: "b-boston", name: "Бостон", desc: "рис, сыр, огурец, майонез, масаго", price: 310, tags: ["baked"] },
      { id: "b-espanola", name: "Испаньола", desc: "рис, омлет, мидии, сыр", price: 350, tags: ["baked", "new"] },
    ],
  },

  {
    id: "rolls-fried",
    name: "Жареные роллы",
    short: "Жареные",
    kind: "roll",
    desc: "В хрустящей панировке темпура — снаружи корочка, внутри горячая начинка.",
    items: [
      { id: "f-sapporo", name: "Саппоро", desc: "рис, бекон, креветка, сыр, острый соус, огурец", price: 330, tags: ["fried", "spicy"] },
      { id: "f-sake", name: "С лососем", desc: "рис, лосось, сыр", price: 330, tags: ["fried"] },
      { id: "f-honshu", name: "Хонсю", desc: "рис, угорь, огурец", price: 350, tags: ["fried"] },
      { id: "f-chicago", name: "Чикаго", desc: "рис, копчёный лосось, сыр, огурец", price: 350, tags: ["fried"] },
      { id: "f-kobe", name: "Кобе", desc: "рис, креветка, сыр, огурец, омлет", price: 295, tags: ["fried"] },
      { id: "f-kani", name: "Кани", desc: "рис, краб, сыр, огурец, масаго", price: 320, tags: ["fried"] },
      { id: "f-rio", name: "Рио", desc: "рис, креветка, мидии, кальмар, сыр, масаго", price: 320, tags: ["fried"] },
      { id: "f-florida", name: "Флорида", desc: "рис, сыр, огурец", price: 300, tags: ["fried"] },
      { id: "f-segun", name: "Сегун", desc: "рис, тигровая креветка, сыр, огурец", price: 400, tags: ["fried"] },
      { id: "f-okinawa", name: "Окинава", desc: "рис, угорь, креветка, сыр, масаго, огурец", price: 360, tags: ["fried"] },
      { id: "f-osaka", name: "Осака", desc: "рис, лосось, омлет, майонез, масаго, огурец", price: 360, tags: ["fried"] },
      { id: "f-macedonia", name: "Македония", desc: "рис, лосось, креветка, сыр, икра деликатесная", price: 310, tags: ["fried"] },
      { id: "f-colorado", name: "Колорадо", desc: "рис, угорь, лосось, сыр, огурец, омлет", price: 360, tags: ["fried"] },
      { id: "f-italian", name: "Итальянский", desc: "рис, креветка, сыр, огурец, перец болгарский", price: 305, tags: ["fried"] },
      { id: "f-yokohama", name: "Йокогама", desc: "рис, сыр, огурец, окунь, омлет", price: 305, tags: ["fried"] },
      { id: "f-america", name: "Америка", desc: "рис, лосось, креветка, сыр, огурец, масаго", price: 400, tags: ["fried"] },
      { id: "f-kansas", name: "Канзас", desc: "рис, говядина, помидор, огурец, лук", price: 350, tags: ["fried"] },
      { id: "f-torino", name: "Торино", desc: "рис, курица, сыр, огурец, лук", price: 340, tags: ["fried"] },
    ],
  },

  {
    id: "tempura-sandwich",
    name: "Ролл темпура сэндвич",
    short: "Темпура сэндвич",
    kind: "roll",
    desc: "Новый формат: ролл-сэндвич в темпуре — крупный, сытный, едят руками.",
    items: [
      {
        id: "ts",
        name: "Ролл темпура сэндвич",
        desc: "в хрустящей темпуре, на выбор три начинки",
        tags: ["new", "fried"],
        variants: [
          { label: "с курицей", price: 450 },
          { label: "с лососем", price: 480 },
          { label: "с тунцом", price: 500 },
        ],
      },
    ],
  },

  {
    id: "sushi-donut",
    name: "Суши пончик",
    short: "Пончики",
    kind: "donut",
    desc: "Суши в форме пончика — необычная подача, отлично заходит детям.",
    items: [
      { id: "d-unagi", name: "С угрём", desc: "рис, угорь, сыр", price: 310, tags: ["new"] },
      { id: "d-tempura", name: "Темпура с лососем", desc: "рис, лосось, сыр, темпура", price: 350, tags: ["new", "fried"] },
      { id: "d-sake", name: "С лососем", desc: "рис, лосось, сыр, огурец", price: 280, tags: ["new"] },
      { id: "d-tiger", name: "С тигровой креветкой", desc: "рис, сыр, тигровая креветка, маринованный дайкон", price: 300, tags: ["new"] },
    ],
  },

  {
    id: "sets",
    name: "Сеты",
    short: "Сеты",
    kind: "set",
    desc: "Готовые наборы на компанию — дешевле, чем собирать теми же позициями поштучно.",
    items: [
      { id: "set-1", name: "Сет 1", desc: "каппа маки, сяке маки ×2, унаги маки ×2", price: 940, weight: "660 г", benefit: 50 },
      { id: "set-2", name: "Сет 2", desc: "самурай, аляска, сяке маки, суши сяке ×2, спайси сяке ×2", price: 1350, weight: "750 г", benefit: 80 },
      { id: "set-3", name: "Сет 3", desc: "аригато, гавайский, филадельфия, калифорния III, бонито, тейшоку, гейша", price: 2300, weight: "1540 г", benefit: 100 },
      { id: "set-4", name: "Сет 4", desc: "саппоро, с лососем, кани, хонсю", price: 1300, weight: "960 г", benefit: 50 },
      { id: "set-5", name: "Сет 5", desc: "футо маки, нежный, итальянский, мега", price: 1270, weight: "900 г", benefit: 50 },
      { id: "set-6", name: "Сет 6", desc: "тейшоку, калифорния II, чикаго, кобе", price: 1515, weight: "1200 г", benefit: 40 },
      { id: "set-7", name: "Сет 7", desc: "гавайский, самурай, невада, бостон", price: 1285, weight: "980 г", benefit: 45 },
      { id: "set-two", name: "Сет «На двоих»", desc: "нежный, аригато, ясиро, каппа маки", price: 1275, weight: "860 г", benefit: 50 },
      { id: "set-econom", name: "Сет «Эконом»", desc: "гавайский, сяке маки, унаги маки", price: 660, weight: "450 г", benefit: 50 },
      { id: "set-hot", name: "Сет «Горячая штучка»", desc: "горячие жареные и запечённые роллы", price: 1350, benefit: 100, tags: ["new"] },
      { id: "set-baked-maki", name: "Сет «Запечённые маки»", desc: "сяке маки, унаги маки, тека маки, эби маки, мидии спайси", price: 1200, benefit: 100, tags: ["new", "baked"] },
      { id: "set-beer", name: "Пивной сет", desc: "картофель фри, курочка фри, наггетсы, луковые кольца, кольца кальмара, соус на выбор", price: 1000, tags: ["new"] },
      { id: "set-mega", name: "МЕГА СЕТ", desc: "филадельфия, канада, калифорния II, умино, аризона, сегун, кобе, колорадо, осака, креветка, сяке маки, суши сяке кунсей ×2, суши томаго ×2, суши унаги ×2, суши тобико ×2", price: 4060, weight: "2620 г", benefit: 200, tags: ["hit"] },
    ],
  },

  {
    id: "salads",
    name: "Салаты",
    short: "Салаты",
    kind: "salad",
    desc: "Фирменные салаты — от классического цезаря до копчёного угря.",
    items: [
      { id: "sal-cesar-chicken", name: "Цезарь с курицей", desc: "курица, салат романо, пармезан, соус цезарь", price: 320, weight: "200 г" },
      { id: "sal-cesar-shrimp", name: "Цезарь с тигровой креветкой", desc: "тигровая креветка, салат романо, пармезан, соус цезарь", price: null, weight: "200 г" },
      { id: "sal-chuka", name: "Чука", desc: "водоросли чука, ореховый соус", price: 200, weight: "150 г" },
      { id: "sal-yaponchik", name: "Япончик", desc: "фирменный салат заведения", price: 350, weight: "160 г", tags: ["hit"] },
      { id: "sal-knyazhesky", name: "Княжеский", desc: "фирменный салат заведения", price: 350, weight: "265 г" },
      { id: "sal-unagi", name: "С копчёным угрём", desc: "лист салата, помидоры, угорь, чука, огурец", price: 400, tags: ["new"] },
    ],
  },

  {
    id: "hot",
    name: "Горячие закуски",
    short: "Горячее",
    kind: "hot",
    desc: "Удон, креветки и всё, что доезжает горячим и хрустящим.",
    items: [
      { id: "h-cheese-balls", name: "Сырные шарики", desc: "жареные, с соусом", price: 250, weight: "160 г" },
      { id: "h-fries", name: "Картофель фри", desc: "", price: 150, weight: "150 г" },
      { id: "h-country", name: "Картофель по-деревенски", desc: "", price: 150, weight: "150 г" },
      { id: "h-squid", name: "Кальмары жареные", desc: "", price: 250, weight: "150 г" },
      { id: "h-nuggets", name: "Наггетсы", desc: "", price: 160, weight: "110 г" },
      { id: "h-onion", name: "Луковые кольца", desc: "", price: null, weight: "150 г · 6 шт", pieces: 6, tags: ["new"] },
      { id: "h-udon-mix", name: "Удон морской микс с курицей", desc: "лапша удон, креветка, мидии, овощи", price: 320, weight: "220 г" },
      { id: "h-udon-chicken", name: "Удон с курицей", desc: "лапша удон, курица, овощи", price: 320, weight: "220 г" },
      { id: "h-udon-shrimp", name: "Удон с креветкой", desc: "лапша удон, креветка, овощи", price: 340, weight: "220 г" },
      { id: "h-udon-tiger", name: "Удон с тигровой креветкой", desc: "лапша удон, тигровая креветка, овощи", price: 380, weight: "220 г" },
      { id: "h-shrimp-batter", name: "Жареные креветки в кляре", desc: "со сливочным соусом", price: 400, weight: "150 г" },
      { id: "h-wings", name: "Крылышки в кисло-сладком соусе", desc: "соус унаги", price: 370 },
      { id: "h-chicken-fry", name: "Курочка фри", desc: "", price: 295, weight: "150 г" },
      { id: "h-shrimp-chiz", name: "Креветка чиз лосось", desc: "соус унаги", price: 720, weight: "3 шт", pieces: 3 },
    ],
  },

  {
    id: "fastfood",
    name: "Фастфуд и бургеры",
    short: "Бургеры",
    kind: "burger",
    desc: "Бургеры на булочке бриош, сэндвичи и корн доги.",
    items: [
      {
        id: "ff-corndog",
        name: "Корн дог",
        desc: "поливается кетчупом",
        variants: [
          { label: "с сыром", price: 120 },
          { label: "с сосиской", price: 140 },
          { label: "с сосиской и сыром", price: 160 },
        ],
      },
      { id: "ff-sandwich-chicken", name: "Сэндвич с курицей", desc: "помидор, огурец, лук, курица, сыр", price: 245 },
      {
        id: "ff-sandwich-closed",
        name: "Закрытый сэндвич",
        desc: "на выбор две начинки",
        variants: [
          { label: "с ветчиной", price: 230 },
          { label: "с курицей", price: 235 },
        ],
      },
      { id: "ff-burger-chicken", name: "Бургер с курицей", desc: "булочка бриош, филе курицы в панировке, сыр, огурец, помидор, лист салата", price: 340 },
      { id: "ff-burger-florida", name: "Флорида-бургер", desc: "булочка, фирменный соус, лук, помидор, огурец, сыр моцарелла, куриная котлета, бекон", price: 340 },
      { id: "ff-burger-big", name: "Биг бургер", desc: "булочка бриош, котлета из филе говядины, маринованный огурец, сыр чеддер, салатный микс, репчатый лук, помидор, фирменный соус", price: 370, tags: ["hit"] },
    ],
  },

  {
    id: "pizza",
    name: "Пицца",
    short: "Пицца",
    kind: "pizza",
    desc: "Два размера: 33 см — 510 ₽, 40 см — 695 ₽. Из печи прямо в коробку.",
    items: [
      { id: "p-margarita", name: "Маргарита", desc: "фирменный соус, сыр моцарелла, помидоры", variants: pizzaSizes },
      { id: "p-pepperoni", name: "Пепперони", desc: "фирменный соус, пепперони чоризо, сыр моцарелла", variants: pizzaSizes, tags: ["hit"] },
      { id: "p-4-cheese", name: "Два сыра", desc: "фирменный соус, сыр моцарелла, сыр чеддер", variants: pizzaSizes },
      { id: "p-hawaii", name: "Гавайская", desc: "фирменный соус, сыр моцарелла, курица, ананас", variants: pizzaSizes },
      { id: "p-korol", name: "Королевская", desc: "фирменный соус, моцарелла, ветчина, курица, шампиньоны", variants: pizzaSizes },
      { id: "p-bbq", name: "Барбекю", desc: "фирменный соус, моцарелла, ветчина, курица, барбекю-соус", variants: pizzaSizes },
      { id: "p-florence", name: "Флоренция", desc: "фирменный соус, салями, ветчина, бекон, сыр моцарелла, шампиньоны, помидоры, перец болгарский, маслины, орегано", variants: pizzaSizes },
      { id: "p-sicily", name: "Сицилия", desc: "фирменный соус, сыр моцарелла, перец болгарский, шампиньоны", variants: pizzaSizes },
      { id: "p-sea", name: "Морская", desc: "фирменный соус, моцарелла, креветки, мидии, краб, маслины", variants: pizzaSizes },
      { id: "p-verona", name: "Верона", desc: "фирменный соус, сыр моцарелла, салями, помидоры, огурцы маринованные", variants: pizzaSizes },
      { id: "p-palermo", name: "Палермо", desc: "фирменный соус, сыр моцарелла, бекон, помидоры, перец болгарский, орегано", variants: pizzaSizes },
      { id: "p-diablo", name: "Дьябло", desc: "фирменный соус, соус кимчи, сыр моцарелла, помидоры, бекон, сервелат, охотничьи колбаски, перец халапеньо", variants: pizzaSizes, tags: ["spicy"] },
    ],
  },

  {
    id: "shakes",
    name: "Молочные коктейли",
    short: "Коктейли",
    kind: "shake",
    desc: "Три объёма на выбор — 300, 400 и 500 мл.",
    items: [
      { id: "sh-strawberry", name: "Клубничный", desc: "", variants: shakeSizes },
      { id: "sh-chocolate", name: "Шоколадный", desc: "", variants: shakeSizes },
      { id: "sh-banana", name: "Банановый", desc: "", variants: shakeSizes },
      { id: "sh-mango", name: "Манго", desc: "", variants: shakeSizes },
      {
        id: "sh-plombir",
        name: "Пломбир",
        desc: "",
        variants: [
          { label: "300 мл", price: 170 },
          { label: "400 мл", price: 195 },
          { label: "500 мл", price: 225 },
        ],
      },
    ],
  },

  {
    id: "sauces",
    name: "Соусы и специи",
    short: "Соусы",
    kind: "sauce",
    desc: "Все соусы — 40 г по 60 ₽.",
    items: [
      { id: "sc-bbq", name: "Барбекю", desc: "", price: 60, weight: "40 г" },
      { id: "sc-nut", name: "Ореховый", desc: "", price: 60, weight: "40 г" },
      { id: "sc-garlic", name: "Чесночный", desc: "", price: 60, weight: "40 г" },
      { id: "sc-soy", name: "Соевый", desc: "", price: 60, weight: "40 г" },
      { id: "sc-spicy", name: "Спайси", desc: "", price: 60, weight: "40 г", tags: ["spicy"] },
      { id: "sc-cheese", name: "Сырный", desc: "", price: 60, weight: "40 г" },
      { id: "sc-cream", name: "Сливочный", desc: "", price: 60, weight: "40 г" },
      { id: "sc-pepper", name: "Перечный", desc: "", price: 60, weight: "40 г", tags: ["spicy"] },
      { id: "sc-kimchi", name: "Кимчи", desc: "", price: 60, weight: "40 г", tags: ["spicy"] },
      { id: "sc-teriyaki", name: "Терияки", desc: "", price: 60, weight: "40 г" },
      { id: "sc-oyster", name: "Устричный", desc: "", price: 60, weight: "40 г" },
      { id: "sc-siracha", name: "Ширача", desc: "", price: 60, weight: "40 г", tags: ["spicy"] },
      { id: "sc-unagi", name: "Унаги", desc: "", price: 60, weight: "40 г" },
      { id: "sc-sweetsour", name: "Кисло-сладкий", desc: "", price: 60, weight: "40 г" },
      { id: "sc-hotsweet", name: "Остро-сладкий", desc: "", price: 60, weight: "40 г", tags: ["spicy"] },
      { id: "sc-tonkatsu", name: "Тонкацу", desc: "", price: 60, weight: "40 г" },
      { id: "sc-ginger", name: "Имбирь", desc: "", price: 25, weight: "20 г" },
      { id: "sc-wasabi", name: "Васаби", desc: "", price: 15, weight: "5 г" },
    ],
  },

  {
    id: "drinks",
    name: "Напитки, чай и кофе",
    short: "Напитки",
    kind: "drink",
    desc: "Газировка, соки, энергетики и кофе на вынос.",
    items: [
      {
        id: "dr-cola",
        name: "Кола",
        desc: "",
        variants: [
          { label: "0,5 л", price: 90 },
          { label: "1 л", price: 180 },
        ],
      },
      { id: "dr-fanta", name: "Фанта", desc: "", price: 90, weight: "0,5 л" },
      { id: "dr-sprite", name: "Спрайт", desc: "", price: 90, weight: "0,5 л" },
      { id: "dr-burn", name: "Энергетик Burn", desc: "любой вкус", price: 120 },
      { id: "dr-juice", name: "Натуральный сок", desc: "", price: 200, weight: "1 л" },
      { id: "dr-tea-black", name: "Чай чёрный", desc: "", price: null },
      { id: "dr-tea-green", name: "Чай зелёный", desc: "", price: null },
      { id: "dr-tea-karkade", name: "Чай каркаде", desc: "", price: null },
      { id: "dr-espresso", name: "Эспрессо", desc: "", price: 130 },
      { id: "dr-americano", name: "Американо", desc: "", price: 160 },
      { id: "dr-cappuccino", name: "Капучино", desc: "", price: 230 },
      { id: "dr-latte", name: "Латте макиато", desc: "", price: 260 },
    ],
  },

  {
    id: "desserts",
    name: "Десерты",
    short: "Десерты",
    kind: "dessert",
    desc: "Ассортимент меняется — уточните у оператора, что есть сегодня.",
    items: [
      { id: "de-cakepops", name: "Кейк попс", desc: "", price: null },
      { id: "de-cheesecake", name: "Чизкейк", desc: "", price: null },
      { id: "de-pastry", name: "Пирожное", desc: "", price: null },
    ],
  },
];

/* ═══════════════════════════ ПРОИЗВОДНЫЕ ═══════════════════════════ */

export const ITEM_COUNT = MENU.reduce((n, c) => n + c.items.length, 0);

/** Категория, в которой лежит блюдо — нужна для формы иллюстрации */
export const KIND_BY_ITEM: Record<string, Kind> = Object.fromEntries(
  MENU.flatMap((c) => c.items.map((i) => [i.id, c.kind] as const)),
);

export const CATEGORY_BY_ITEM: Record<string, string> = Object.fromEntries(
  MENU.flatMap((c) => c.items.map((i) => [i.id, c.id] as const)),
);

/** Минимальная цена позиции — по ней красится тарелка в «Конвейере» */
export function itemPrice(item: MenuItem): number | null {
  if (typeof item.price === "number") return item.price;
  if (item.variants?.length) return Math.min(...item.variants.map((v) => v.price));
  return null;
}

/** Значки разделов — их носила полоса категорий на самом первом сайте */
export const CATEGORY_EMOJI: Record<string, string> = {
  sushi: "🍣",
  "sushi-spicy": "🌶️",
  "rolls-classic": "🍥",
  "rolls-new": "✨",
  "rolls-baked": "🔥",
  "rolls-fried": "🍤",
  "tempura-sandwich": "🥪",
  "sushi-donut": "🍩",
  sets: "🍱",
  salads: "🥗",
  hot: "🍟",
  fastfood: "🍔",
  pizza: "🍕",
  shakes: "🥤",
  sauces: "🥢",
  drinks: "☕",
  desserts: "🍰",
};

export const FILTERS: { id: Tag; label: string }[] = [
  { id: "hit", label: "Хиты" },
  { id: "new", label: "Новинки" },
  { id: "baked", label: "Запечённые" },
  { id: "spicy", label: "Острые" },
];

/** Хиты для конвейера и витрин — в порядке, в котором приятно смотреть */
export const HIGHLIGHT_IDS = [
  "r-philadelphia",
  "r-yaponchik",
  "n-avtorsky",
  "b-tokyo",
  "r-cal-2",
  "f-segun",
  "n-fresh",
  "r-hawaii",
  "set-mega",
  "d-tiger",
  "r-raduga",
  "ff-burger-big",
];

export function findItem(id: string): MenuItem | undefined {
  for (const c of MENU) {
    const hit = c.items.find((i) => i.id === id);
    if (hit) return hit;
  }
  return undefined;
}

export const HIGHLIGHTS = HIGHLIGHT_IDS.map(findItem).filter(
  (i): i is MenuItem => Boolean(i),
);
