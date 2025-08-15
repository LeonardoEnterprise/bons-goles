import { ShoppingBasketIcon } from "lucide-react";

import { Button } from "../ui/button";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";

const Cart = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" className="">
          <ShoppingBasketIcon className="" size={"icon"} />
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full max-w-md"></SheetContent>
    </Sheet>
  );
};

export default Cart;
