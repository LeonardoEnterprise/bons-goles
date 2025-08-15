import { MinusIcon, PlusIcon } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";

const QuantitySelector = () => {
  const [quantity, setQuantity] = useState(1);

  return (
    <div className="space-y-4">
      <h3 className="font-medium">Quantidade:</h3>
      <div className="flex w-[100px] items-center justify-between rounded-lg border">
        <Button
          size="icon"
          variant="ghost"
          onClick={() => setQuantity(quantity - 1)}
          disabled={quantity <= 1}
        >
          <MinusIcon />
        </Button>
        <span className="text-lg font-semibold">{quantity}</span>
        <Button
          size="icon"
          variant="ghost"
          onClick={() => setQuantity(quantity + 1)}
        >
          <PlusIcon />
        </Button>
      </div>
    </div>
  );
};

export default QuantitySelector;
