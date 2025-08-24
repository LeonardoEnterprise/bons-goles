"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { useState } from "react";

import { addProductToCart } from "@/actions/add-cart-product";
import LoginModal from "@/components/common/login-modal";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";

interface AddToCartButtonProps {
  productVariantId: string;
  quantity: number;
}

const AddToCartButton = ({
  quantity,
  productVariantId,
}: AddToCartButtonProps) => {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const { data: session } = authClient.useSession();
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationKey: ["addProductToCart", productVariantId, quantity],
    mutationFn: () =>
      addProductToCart({
        productVariantId,
        quantity,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["cart"],
      });
    },
  });

  const handleAddToCart = () => {
    if (!session?.user) {
      setShowLoginModal(true);
      return;
    }
    mutate();
  };

  const handleBuyNow = () => {
    if (!session?.user) {
      setShowLoginModal(true);
      return;
    }
  };

  return (
    <>
      <div className="flex flex-col space-y-4 px-5">
        <Button
          variant="outline"
          disabled={isPending}
          className="h-[50px] w-full rounded-2xl"
          onClick={handleAddToCart}
        >
          {isPending && <Loader2 className="mr-1 animate-spin" />}
          Adicionar á sacola
        </Button>
        <Button
          className="h-[50px] w-full rounded-2xl font-extrabold"
          size={"lg"}
          onClick={handleBuyNow}
        >
          Comprar agora
        </Button>
      </div>
      <LoginModal open={showLoginModal} onOpenChange={setShowLoginModal} />
    </>
  );
};

export default AddToCartButton;
