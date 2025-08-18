"use client";
import { Loader2, MinusIcon, PlusIcon, TrashIcon } from "lucide-react";
import Image from "next/image";
import { useCallback, useRef } from "react";
import { toast } from "sonner";

import { formatCentsToBRL } from "@/helpers/money";
import { useDecreaseCartProductQuantity } from "@/hooks/mutations/use-decrease-cart-product-quantity";
import { useIncreaseCartProductQuantity } from "@/hooks/mutations/use-increase-cart-product-quantity";
import { useRemoveProductFromCart } from "@/hooks/mutations/use-remove-product-from-cart";

import { Button } from "../ui/button";

interface CartItemProps {
  id: string;
  productName: string;
  productVariantId: string;
  productVariantName: string;
  productVariantImageUrl: string;
  productVariantPriceInCents: number;
  quantity: number;
}

const CartItem = ({
  id,
  productName,
  productVariantId,
  productVariantName,
  productVariantImageUrl,
  productVariantPriceInCents,
  quantity,
}: CartItemProps) => {
  const removeProductFromCartMutation = useRemoveProductFromCart(id);

  const decreaseCartProductQuantityMutation =
    useDecreaseCartProductQuantity(id);

  const increaseCartProductQuantityMutation =
    useIncreaseCartProductQuantity(productVariantId);

  const isUpdating = decreaseCartProductQuantityMutation.isPending || increaseCartProductQuantityMutation.isPending;

  const toastTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const showDebouncedToast = useCallback((message: string) => {
    if (toastTimeoutRef.current) {
      clearTimeout(toastTimeoutRef.current);
    }
    toastTimeoutRef.current = setTimeout(() => {
      toast.success(message);
    }, 500);
  }, []);

  const handleDeleteClick = () => {
    removeProductFromCartMutation.mutate(undefined, {
      onSuccess: () => {
        toast.success("Produto removido do carrinho.");
      },
      onError: () => {
        toast.error("Erro ao remover produto do carrinho.");
      },
    });
  };

  const handleDecreaseQuantityClick = () => {
    decreaseCartProductQuantityMutation.mutate(undefined, {
      onError: () => {
        toast.error("Erro ao atualizar quantidade do produto.");
      },
    });
    showDebouncedToast("Quantidade atualizada.");
  };

  const handleIncreaseQuantityClick = () => {
    increaseCartProductQuantityMutation.mutate(undefined, {
      onError: () => {
        toast.error("Erro ao atualizar quantidade do produto.");
      },
    });
    showDebouncedToast("Quantidade atualizada.");
  };

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-4">
        <Image
          src={productVariantImageUrl}
          alt={productVariantName}
          width={0}
          height={0}
          sizes="100vw"
          className="h-[65px] w-[60px] rounded-lg object-cover"
        />
        <div className="flex flex-col gap-1">
          <p className="text-sm font-semibold">{productName}</p>
          <p className="text-muted-foreground text-xs font-medium">
            {productVariantName}
          </p>
          <div className="flex w-[100px] items-center justify-between rounded-lg border p-1">
            <Button
              className="h-4 w-4"
              variant="ghost"
              disabled={isUpdating}
              onClick={handleDecreaseQuantityClick}
            >
              <MinusIcon />
            </Button>
            <div className="flex items-center justify-center w-8">
              {isUpdating ? (
                <Loader2 className="h-3 w-3 animate-spin" />
              ) : (
                <p className="text-xs font-medium">{quantity}</p>
              )}
            </div>
            <Button
              className="h-4 w-4"
              variant="ghost"
              disabled={isUpdating}
              onClick={handleIncreaseQuantityClick}
            >
              <PlusIcon />
            </Button>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-end justify-center gap-2">
        <Button variant="outline" size="icon" onClick={handleDeleteClick}>
          <TrashIcon />
        </Button>
        <p className="text-sm font-bold">
          {formatCentsToBRL(productVariantPriceInCents)}
        </p>
      </div>
    </div>
  );
};

export default CartItem;
