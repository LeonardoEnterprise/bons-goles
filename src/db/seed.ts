import crypto from "crypto";

import { db } from ".";
import { categoryTable, productTable, productVariantTable } from "./schema";

function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .trim();
}

const categories = [
  {
    name: "Vinhos",
    description: "Vinhos tintos, brancos e rosés selecionados",
  },
  {
    name: "Cervejas",
    description: "Cervejas artesanais e tradicionais",
  },
  {
    name: "Destilados",
    description: "Vodkas, whiskys, cachaças e outros destilados",
  },
];

const products = [
  // Vinhos
  {
    name: "Vinho Tinto Cabernet Sauvignon",
    description: "Vinho tinto encorpado com notas de frutas vermelhas e taninos macios.",
    categoryName: "Vinhos",
    priceInCents: 4500,
    variants: [
      { name: "750ml", imageUrl: "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=400" },
      { name: "1.5L", imageUrl: "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=400" },
    ],
  },
  {
    name: "Vinho Branco Chardonnay",
    description: "Vinho branco seco com aroma floral e sabor refrescante.",
    categoryName: "Vinhos",
    priceInCents: 3800,
    variants: [
      { name: "750ml", imageUrl: "https://images.unsplash.com/photo-1547595628-c61a29f496f0?w=400" },
    ],
  },
  {
    name: "Vinho Rosé",
    description: "Vinho rosé delicado com notas frutadas e final suave.",
    categoryName: "Vinhos",
    priceInCents: 3200,
    variants: [
      { name: "750ml", imageUrl: "https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=400" },
    ],
  },

  // Cervejas
  {
    name: "Cerveja Pilsen Premium",
    description: "Cerveja pilsen refrescante com sabor equilibrado e amargor suave.",
    categoryName: "Cervejas",
    priceInCents: 800,
    variants: [
      { name: "350ml", imageUrl: "https://images.unsplash.com/photo-1608270586620-248524c67de9?w=400" },
      { name: "600ml", imageUrl: "https://images.unsplash.com/photo-1608270586620-248524c67de9?w=400" },
    ],
  },
  {
    name: "Cerveja IPA Artesanal",
    description: "Cerveja IPA com lúpulos aromáticos e sabor intenso.",
    categoryName: "Cervejas",
    priceInCents: 1200,
    variants: [
      { name: "355ml", imageUrl: "https://images.unsplash.com/photo-1535958636474-b021ee887b13?w=400" },
    ],
  },
  {
    name: "Cerveja Weiss",
    description: "Cerveja de trigo alemã com sabor suave e refrescante.",
    categoryName: "Cervejas",
    priceInCents: 950,
    variants: [
      { name: "500ml", imageUrl: "https://images.unsplash.com/photo-1618885472179-5e474019f2a9?w=400" },
    ],
  },

  // Destilados
  {
    name: "Vodka Premium",
    description: "Vodka premium destilada cinco vezes, sabor puro e suave.",
    categoryName: "Destilados",
    priceInCents: 8500,
    variants: [
      { name: "750ml", imageUrl: "https://images.unsplash.com/photo-1551538827-9c037cb4f32a?w=400" },
      { name: "1L", imageUrl: "https://images.unsplash.com/photo-1551538827-9c037cb4f32a?w=400" },
    ],
  },
  {
    name: "Whisky Single Malt",
    description: "Whisky escocês envelhecido 12 anos com notas amadeiradas.",
    categoryName: "Destilados",
    priceInCents: 15000,
    variants: [
      { name: "750ml", imageUrl: "https://images.unsplash.com/photo-1569529465841-dfecdab7503b?w=400" },
    ],
  },
  {
    name: "Cachaça Artesanal",
    description: "Cachaça artesanal envelhecida em barris de carvalho.",
    categoryName: "Destilados",
    priceInCents: 4200,
    variants: [
      { name: "700ml", imageUrl: "https://images.unsplash.com/photo-1544145945-f90425340c7e?w=400" },
    ],
  },
];

async function main() {
  console.log("🌱 Iniciando o seeding do banco de dados...");

  try {
    // Limpar dados existentes
    console.log("🧹 Limpando dados existentes...");
    await db.delete(productVariantTable);
    await db.delete(productTable);
    await db.delete(categoryTable);
    console.log("✅ Dados limpos com sucesso!");

    // Inserir categorias primeiro
    const categoryMap = new Map<string, string>();

    console.log("📂 Criando categorias...");
    for (const categoryData of categories) {
      const categoryId = crypto.randomUUID();
      const categorySlug = generateSlug(categoryData.name);

      console.log(`  📁 Criando categoria: ${categoryData.name}`);

      await db.insert(categoryTable).values({
        id: categoryId,
        name: categoryData.name,
        slug: categorySlug,
      });

      categoryMap.set(categoryData.name, categoryId);
    }

    // Inserir produtos
    for (const productData of products) {
      const productId = crypto.randomUUID();
      const productSlug = generateSlug(productData.name);
      const categoryId = categoryMap.get(productData.categoryName);

      if (!categoryId) {
        throw new Error(
          `Categoria "${productData.categoryName}" não encontrada`,
        );
      }

      console.log(`📦 Criando produto: ${productData.name}`);

      await db.insert(productTable).values({
        id: productId,
        name: productData.name,
        slug: productSlug,
        description: productData.description,
        categoryId: categoryId,
        priceInCents: productData.priceInCents,
      });

      // Inserir variantes do produto
      for (const variantData of productData.variants) {
        const variantId = crypto.randomUUID();

        console.log(`  🍷 Criando variante: ${variantData.name}`);

        await db.insert(productVariantTable).values({
          id: variantId,
          name: variantData.name,
          productId: productId,
          imageUrl: variantData.imageUrl,
          priceInCents: productData.priceInCents,
          slug: generateSlug(`${productData.name}-${variantData.name}`),
        });
      }
    }

    console.log("✅ Seeding concluído com sucesso!");
    console.log(
      `📊 Foram criadas ${categories.length} categorias, ${
        products.length
      } produtos com ${products.reduce(
        (acc, p) => acc + p.variants.length,
        0,
      )} variantes.`,
    );
  } catch (error) {
    console.error("❌ Erro durante o seeding:", error);
    throw error;
  }
}

main().catch(console.error);