"use client";
import Image from "next/image";
import Link from "next/link";

import { productVariantTable } from "@/db/schema";

interface VariantSelectorProps {
  selectedVariantSlug: string;
  variants: (typeof productVariantTable.$inferSelect)[];
}

const VariantSelector = ({
  selectedVariantSlug,
  variants,
}: VariantSelectorProps) => {
  return (
    <div className="flex items-center gap-4">
      {variants.map((variant) => (
        <Link
          href={`/product-variant/${variant.slug}`}
          key={variant.id}
          className={`h-16 w-16`}
        >
          <Image
            src={variant.imageUrl}
            alt={variant.name}
            width={68}
            height={68}
            className={`h-full w-full rounded-xl object-cover ${
              selectedVariantSlug === variant.slug
                ? "border-primary rounded-xl border-4 border-solid"
                : ""
            }`}
          />
        </Link>
      ))}
    </div>
  );
};

export default VariantSelector;
