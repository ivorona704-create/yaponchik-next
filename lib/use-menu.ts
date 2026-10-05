"use client";

import { useEffect, useMemo, useState, useSyncExternalStore } from "react";
import { MENU, type MenuCategory, type Tag } from "@/lib/menu";

/** Поиск + фильтры по тегам. Возвращает только непустые категории. */
export function useMenuFilter() {
  const [query, setQuery] = useState("");
  const [tags, setTags] = useState<Tag[]>([]);

  const categories: MenuCategory[] = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q && tags.length === 0) return MENU;

    return MENU.map((c) => ({
      ...c,
      items: c.items.filter((i) => {
        const byTag = tags.length === 0 || tags.every((t) => i.tags?.includes(t));
        if (!byTag) return false;
        if (!q) return true;
        return (
          i.name.toLowerCase().includes(q) ||
          i.desc.toLowerCase().includes(q) ||
          c.name.toLowerCase().includes(q)
        );
      }),
    })).filter((c) => c.items.length > 0);
  }, [query, tags]);

  const found = categories.reduce((n, c) => n + c.items.length, 0);

  function toggleTag(tag: Tag) {
    setTags((prev) => (prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]));
  }

  function reset() {
    setQuery("");
    setTags([]);
  }

  return { query, setQuery, tags, toggleTag, categories, found, reset };
}

/**
 * Подсветка текущего раздела в липкой полосе категорий.
 * Берём самый верхний заголовок, который ещё не ушёл за панель.
 */
export function useActiveCategory(ids: string[], offset = 140) {
  const [active, setActive] = useState(ids[0] ?? "");

  useEffect(() => {
    if (ids.length === 0) return;

    function onScroll() {
      let current = ids[0];
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top - offset <= 0) current = id;
      }
      setActive(current);
    }

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [ids, offset]);

  return active;
}

/**
 * Медиазапрос без useEffect: на сервере всегда false, на клиенте —
 * реальное значение. useSyncExternalStore не вызывает лишний рендер
 * и не спорит с правилом react-hooks/set-state-in-effect.
 */
export function useMediaQuery(query: string) {
  return useSyncExternalStore(
    (onChange) => {
      const mq = window.matchMedia(query);
      mq.addEventListener("change", onChange);
      return () => mq.removeEventListener("change", onChange);
    },
    () => window.matchMedia(query).matches,
    () => false,
  );
}

/** Пользователь просил не анимировать — уважаем на клиенте. */
export function usePrefersReducedMotion() {
  return useMediaQuery("(prefers-reduced-motion: reduce)");
}

const noopSubscribe = () => () => {};

/** Корзина живёт в localStorage — до гидрации показываем пустую. */
export function useHydrated() {
  return useSyncExternalStore(
    noopSubscribe,
    () => true,
    () => false,
  );
}
