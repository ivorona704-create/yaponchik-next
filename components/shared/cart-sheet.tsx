"use client";

import { useState } from "react";
import { Minus, Plus, Trash2, MessageCircle, Phone, Copy, Check } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { useCart, cartTotal, orderText, whatsappHref } from "@/lib/cart-store";
import { CONTACTS } from "@/lib/menu";
import { cn, money, plural } from "@/lib/utils";
import { DeliveryMeter } from "@/components/shared/delivery-meter";

export function CartSheet() {
  const { lines, open, setOpen, changeQty, remove } = useCart();
  const [copied, setCopied] = useState(false);
  const sum = cartTotal(lines);

  async function copyOrder() {
    try {
      await navigator.clipboard.writeText(orderText(lines));
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent
        side="right"
        className="flex w-full flex-col gap-0 bg-background p-0 sm:max-w-md"
      >
        <SheetHeader className="border-b border-border px-5 py-4">
          <SheetTitle className="text-lg font-semibold">Ваш заказ</SheetTitle>
          <SheetDescription className="text-xs text-muted-foreground">
            {lines.length
              ? `${lines.length} ${plural(lines.length, ["позиция", "позиции", "позиций"])} в корзине`
              : "Пока пусто"}
          </SheetDescription>
        </SheetHeader>

        {lines.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-3 px-8 text-center">
            <p className="text-sm text-muted-foreground">
              Нажимайте «+» у блюд — корзина посчитает сумму и подскажет, сколько
              осталось до бесплатной доставки.
            </p>
            <Button variant="outline" onClick={() => setOpen(false)}>
              Вернуться к меню
            </Button>
          </div>
        ) : (
          <>
            <ul className="flex-1 divide-y divide-border overflow-y-auto px-5">
              {lines.map((l) => (
                <li key={l.key} className="flex items-start gap-3 py-3.5">
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium leading-snug">
                      {l.name}
                      {l.variant && (
                        <span className="text-muted-foreground"> · {l.variant}</span>
                      )}
                    </p>
                    <p className="mt-0.5 text-xs text-muted-foreground tabular-nums">
                      {money(l.price)} × {l.qty} = <b>{money(l.price * l.qty)}</b>
                    </p>
                  </div>

                  <div className="flex shrink-0 items-center gap-1">
                    <Button
                      size="icon-sm"
                      variant="outline"
                      aria-label={`Убрать одну штуку: ${l.name}`}
                      onClick={() => changeQty(l.key, -1)}
                    >
                      <Minus />
                    </Button>
                    <span className="w-6 text-center text-sm tabular-nums">{l.qty}</span>
                    <Button
                      size="icon-sm"
                      variant="outline"
                      aria-label={`Добавить ещё одну штуку: ${l.name}`}
                      onClick={() => changeQty(l.key, 1)}
                    >
                      <Plus />
                    </Button>
                    <Button
                      size="icon-sm"
                      variant="ghost"
                      aria-label={`Удалить из заказа: ${l.name}`}
                      onClick={() => remove(l.key)}
                    >
                      <Trash2 />
                    </Button>
                  </div>
                </li>
              ))}
            </ul>

            <div className="border-t border-border px-5 py-4">
              <DeliveryMeter sum={sum} />

              <div className="mt-4 flex items-baseline justify-between">
                <span className="text-sm text-muted-foreground">Итого</span>
                <b className="text-2xl font-semibold tabular-nums">{money(sum)}</b>
              </div>

              <div className="mt-4 grid gap-2">
                <Button
                  size="lg"
                  className="h-11 w-full text-sm"
                  nativeButton={false}
                  render={
                    <a
                      href={whatsappHref(lines)}
                      target="_blank"
                      rel="noopener noreferrer"
                    />
                  }
                >
                  <MessageCircle /> Отправить заказ в WhatsApp
                </Button>

                <div className="grid grid-cols-2 gap-2">
                  <Button variant="outline" className="h-10" onClick={copyOrder}>
                    {copied ? <Check /> : <Copy />}
                    {copied ? "Скопировано" : "Скопировать"}
                  </Button>
                  <Button
                    variant="outline"
                    className="h-10"
                    nativeButton={false}
                    render={<a href={`tel:${CONTACTS.phones[0].raw}`} />}
                  >
                    <Phone /> Позвонить
                  </Button>
                </div>
              </div>

              <p className={cn("mt-3 text-[11px] leading-relaxed text-muted-foreground")}>
                Онлайн-оплаты нет: заказ уходит сообщением, оплата курьеру наличными
                или картой. Оператор перезвонит и подтвердит состав.
              </p>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
