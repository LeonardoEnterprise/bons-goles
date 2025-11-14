import { db } from "@/db";

import { HeaderClient } from "./header-client";

export const Header = async () => {
  const categories = await db.query.categoryTable.findMany();

  return <HeaderClient categories={categories} />;
};
