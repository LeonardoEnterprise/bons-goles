"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import {
  House,
  LogInIcon,
  LogOutIcon,
  MenuIcon,
  ShoppingBasketIcon,
  Truck,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";

import { authClient } from "@/lib/auth-client";

import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import Cart from "./cart";

interface HeaderClientProps {
  categories: Array<{ id: string; name: string; slug: string }>;
}

export const HeaderClient = ({ categories }: HeaderClientProps) => {
  const { data: session } = authClient.useSession();
  const cartTriggerRef = useRef<HTMLButtonElement>(null);

  return (
    <header className="flex items-center justify-between p-5">
      <Link href="/">
        <Image src="/logo.svg" alt="Bons Goles" width={60} height={26.14} />
      </Link>

      <div className="item-center flex gap-4">
        <Cart ref={cartTriggerRef} />
        <Sheet>
          <SheetTrigger asChild>
            <Button variant={"outline"} size={"icon"}>
              <MenuIcon></MenuIcon>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="p-0">
            <SheetHeader className="p-4">
              <SheetTitle>Menu</SheetTitle>
            </SheetHeader>
            <div className="px-5">
              {session?.user ? (
                <>
                  <div className="flex flex-col justify-between space-y-6">
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage
                          src={session?.user?.image as string | undefined}
                          alt={session?.user?.name as string | undefined}
                          className="h-10 w-10 rounded-full"
                        />
                        <AvatarFallback>
                          {session?.user?.name?.split(" ")?.[0]?.[0]}
                          {session?.user?.name?.split(" ")?.[1]?.[0]}
                        </AvatarFallback>
                      </Avatar>

                      <div>
                        <h3 className="font-semibold">
                          {session?.user?.name?.split(" ")[0]}
                        </h3>
                        <span className="text-muted-foreground block truncate text-xs">
                          {session?.user?.email}
                        </span>
                      </div>
                    </div>
                    <Separator />
                    <div className="flex flex-col gap-2">
                      <Link
                        href={`/`}
                        className="flex items-center gap-2 text-sm font-semibold"
                      >
                        <House size={22} />
                        Inicio
                      </Link>
                      <Link
                        href={`/my-orders`}
                        className="flex items-center gap-2 text-sm font-semibold"
                      >
                        <Truck />
                        Meus Pedidos
                      </Link>
                      <button
                        className="flex items-center gap-2 text-left text-sm font-semibold"
                        onClick={() => cartTriggerRef.current?.click()}
                      >
                        <ShoppingBasketIcon />
                        Cestinha
                      </button>
                    </div>
                    <Separator />
                    <div className="flex flex-col gap-2">
                      {categories.map((category) => (
                        <Link
                          key={category.id}
                          href={`/category/${category.slug}`}
                          className="font-semibold"
                        >
                          {category.name}
                        </Link>
                      ))}
                    </div>
                    <Separator />
                    <Button
                      variant="outline"
                      size="icon"
                      className="w-full"
                      onClick={() => authClient.signOut()}
                    >
                      <LogOutIcon />
                      Sair da conta
                    </Button>
                  </div>
                </>
              ) : (
                <div className="flex flex-col justify-between gap-6">
                  <h2 className="font-semibold">Olá. Faça seu login!</h2>
                  <Button
                    size="icon"
                    asChild
                    variant="outline"
                    className="bg-primary w-full text-[#fff]"
                  >
                    <Link href="/authentication">
                      Login
                      <LogInIcon />
                    </Link>
                  </Button>
                  <Separator />
                  <div className="flex flex-col gap-2">
                    <Link
                      href={`/`}
                      className="flex items-center gap-2 text-sm font-semibold"
                    >
                      <House size={22} />
                      Inicio
                    </Link>
                    <Link
                      href={`/my-orders`}
                      className="flex items-center gap-2 text-sm font-semibold"
                    >
                      <Truck />
                      Meus Pedidos
                    </Link>
                    <button
                      className="flex items-center gap-2 text-left text-sm font-semibold"
                      onClick={() => cartTriggerRef.current?.click()}
                    >
                      <ShoppingBasketIcon />
                      Cestinha
                    </button>
                  </div>
                  <Separator />
                  <div className="flex flex-col gap-2">
                    {categories.map((category) => (
                      <Link
                        key={category.id}
                        href={`/category/${category.slug}`}
                        className="font-semibold"
                      >
                        {category.name}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
};
