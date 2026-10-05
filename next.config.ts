import type { NextConfig } from "next";

/**
 * Весь сайт статический, поэтому его можно выгрузить папкой и залить
 * на любой хостинг. Режим включается переменной: `npm run build:static`
 * кладёт готовые файлы в `out/`. Обычный `npm run dev` и `npm run build`
 * при этом работают как раньше, с оптимизацией картинок.
 */
const isStaticExport =
  process.env.STATIC_EXPORT === "1" ||
  process.env.npm_lifecycle_event === "build:static";

const nextConfig: NextConfig = {
  ...(isStaticExport
    ? {
        output: "export",
        // в статике нет сервера, который ужимал бы картинки на лету
        images: { unoptimized: true },
        // каждая страница становится папкой с index.html —
        // так ссылки вида /classic работают без настройки хостинга
        trailingSlash: true,
      }
    : {}),
};

export default nextConfig;
