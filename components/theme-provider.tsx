"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import type { ComponentProps } from "react";

/**
 * У каждого концепта свой storageKey, поэтому выбор темы на одной странице
 * не тянет за собой остальные: «Мох» помнит вечер, «Конвейер» — день.
 */
export function ThemeProvider({ children, ...props }: ComponentProps<typeof NextThemesProvider>) {
  return (
    <NextThemesProvider attribute="class" enableSystem={false} {...props}>
      {children}
    </NextThemesProvider>
  );
}
