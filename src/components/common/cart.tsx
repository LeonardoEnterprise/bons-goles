import { Loader2, ShoppingBasketIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
} from "@/components/ui/dialog";
import { formatCentsToBRL } from "@/helpers/money";
import { useCart } from "@/hooks/queries/use-cart";

import { Button } from "../ui/button";
import { ScrollArea } from "../ui/scroll-area";
import { Separator } from "../ui/separator";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import CartItem from "./cart-item";

const Cart = () => {
  const { data: cart, isPending, isFetching } = useCart();

  const isCartUpdating = isPending || isFetching;
  return (
    <Sheet>
      <SheetTrigger asChild>
        <div className="relative inline-block">
          <Button variant="outline" className="">
            <ShoppingBasketIcon className="" size={"icon"} />
            {cart?.items.length ? (
              <span className="bg-primary absolute -top-1 -right-1 rounded-full px-1.5 py-0.5 text-xs font-bold text-white">
                {cart?.items?.length}
              </span>
            ) : null}
          </Button>
        </div>
      </SheetTrigger>
      <SheetContent className="w-full max-w-md">
        <SheetHeader>
          <SheetTitle>Cestinha</SheetTitle>
        </SheetHeader>
        <div className="flex h-full flex-col px-5 pb-5">
          {cart?.items.length && cart?.items.length > 0 ? (
            <>
              <div className="flex h-full max-h-full flex-col overflow-hidden">
                <ScrollArea className="h-full">
                  <div className="flex h-full flex-col gap-8">
                    {cart?.items?.map((item) => (
                      <CartItem
                        key={item.id}
                        id={item.id}
                        productName={item.productVariant.product.name}
                        productVariantId={item.productVariant.id}
                        productVariantName={item.productVariant.name}
                        productVariantImageUrl={item.productVariant.imageUrl}
                        productVariantPriceInCents={
                          item.productVariant.priceInCents
                        }
                        quantity={item.quantity}
                      />
                    ))}
                  </div>
                </ScrollArea>
              </div>

              {cart?.items.length && cart?.items.length > 0 && (
                <div className="flex flex-col gap-4">
                  <Separator />

                  <div className="flex items-center justify-between text-xs font-medium">
                    <p>Subtotal</p>
                    {isCartUpdating ? (
                      <Loader2 className="h-3 w-3 animate-spin" />
                    ) : (
                      <p>{formatCentsToBRL(cart?.totalPriceInCents ?? 0)}</p>
                    )}
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between text-xs font-medium">
                    <p>Entrega</p>
                    {isCartUpdating ? (
                      <Loader2 className="h-3 w-3 animate-spin" />
                    ) : (
                      <p>GRÁTIS</p>
                    )}
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between text-xs font-medium">
                    <p>Total</p>
                    {isCartUpdating ? (
                      <Loader2 className="h-3 w-3 animate-spin" />
                    ) : (
                      <p>{formatCentsToBRL(cart?.totalPriceInCents ?? 0)}</p>
                    )}
                  </div>

                  <Button
                    className="rounded-full"
                    disabled={isFetching}
                    asChild
                  >
                    <Link href="/cart/identification">Finalizar Compra</Link>
                  </Button>
                </div>
              )}
            </>
          ) : (
            <div className="flex flex-col gap-4 text-center">
              <Image
                height={0}
                width={0}
                src="/carrinho-empty.svg"
                sizes="100vw"
                alt="Cesta vazia"
                className="h-auto w-full"
              />
              <DialogTitle className="mt-4 text-2xl">Cesta vazia!</DialogTitle>
              <DialogDescription className="font-medium">
                Momentos especiais começam com a escolha certa. Adicione sua
                primeira garrafa e venha experimentar bons goles.
              </DialogDescription>

              <DialogFooter>
                <Button className="rounded-full" size="lg" asChild>
                  <Link href="/my-orders">Quero muitooo.</Link>
                </Button>
              </DialogFooter>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default Cart;
