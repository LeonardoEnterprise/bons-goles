import { eq } from "drizzle-orm";
import Image from "next/image";
import { notFound } from "next/navigation";

import Footer from "@/components/common/footer";
import { Header } from "@/components/common/header";
import ProductList from "@/components/common/product-list";
import { Button } from "@/components/ui/button";
import { db } from "@/db";
import { productTable } from "@/db/schema";
import { formatCentsToBRL } from "@/helpers/money";

import QuantitySelector from "./components/quantity-selector";
import VariantSelector from "./components/variant-selector";

interface ProductPageProps {
  params: Promise<{
    slug: string;
  }>;
}

const ProductVariantPage = async ({ params }: ProductPageProps) => {
  const { slug } = await params;
  const productVariant = await db.query.productVariantTable.findFirst({
    where: eq(productTable.slug, slug),
    with: {
      product: {
        with: {
          variants: true,
        },
      },
    },
  });

  if (!productVariant) {
    return notFound();
  }

  const productsSameCategory = await db.query.productTable.findMany({
    where: eq(productTable.categoryId, productVariant?.product.categoryId),
    with: {
      variants: true,
    },
  });

  return (
    <>
      <Header />
      <div className="flex flex-col space-y-6">
        <Image
          src={productVariant.imageUrl}
          alt={productVariant.name}
          width={0}
          height={0}
          sizes="100vw"
          className="h-[480px] w-full object-cover object-center"
        />

        <div className="px-5">
          <VariantSelector
            selectedVariantSlug={productVariant.slug}
            variants={productVariant.product.variants}
          />
        </div>

        <div className="px-5">
          <h2 className="text-lg font-semibold">
            {productVariant.product.name}
          </h2>
          <h3 className="text-muted-foreground text-sm">
            {productVariant.name}
          </h3>
          <h3 className="text-lg font-semibold">
            {formatCentsToBRL(productVariant.priceInCents)}
          </h3>
        </div>

        {/* <ProductActions productVariantId={productVariant.id} /> */}

        <QuantitySelector />

        <div className="flex flex-col space-y-4 px-5">
          <Button variant="outline" className="h-[50px] w-full rounded-2xl">
            Adicionar á sacola
          </Button>
          <Button
            className="h-[50px] w-full rounded-2xl font-extrabold"
            size={"lg"}
          >
            Comprar agora
          </Button>
        </div>

        <div className="px-5">
          <p className="text-muted-foreground text-sm">
            {productVariant.product.description}
          </p>
        </div>

        <ProductList
          products={productsSameCategory}
          title="Talvez você goste"
        />

        <Footer />
      </div>
    </>
  );
};

export default ProductVariantPage;
