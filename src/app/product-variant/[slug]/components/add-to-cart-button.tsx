import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";

import { addProductToCart } from "@/actions/add-cart-product";
import { Button } from "@/components/ui/button";

interface AddToCartButtonProps {
  productVariantId: string;
  quantity: number;
}

const AddToCartButton = ({
  quantity,
  productVariantId,
}: AddToCartButtonProps) => {
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
  return (
    <div className="flex flex-col space-y-4 px-5">
      <Button
        variant="outline"
        disabled={isPending}
        className="h-[50px] w-full rounded-2xl"
        onClick={() => mutate()}
      >
        {isPending && <Loader2 className="mr-1 animate-spin" />}
        Adicionar á sacola
      </Button>
      <Button
        className="h-[50px] w-full rounded-2xl font-extrabold"
        size={"lg"}
      >
        Comprar agora
      </Button>
    </div>
  );
};

export default AddToCartButton;
