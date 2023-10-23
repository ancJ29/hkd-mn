import { z } from "zod";

const lang = localStorage.getItem("lang") || "vi";

export const menuSchema = z
  .object({
    idx: z.number(),
    groupindex: z.number(),
    prod_name: z.string(),
    prod_name_en: z.string(),
    prod_name_jp: z.string(),
    inventory: z.number(),
    sales_pr: z.number(), // price
    small_image: z.string(),
    // TODO: add more fields...
  })
  .transform((data) => {
    let foreignName = data.prod_name_jp;
    if (lang === "en") {
      foreignName = data.prod_name_en;
    }
    return {
      id: data.idx.toString(),
      categoryId: data.groupindex.toString(),
      name: data.prod_name,
      foreignName,
      price: data.sales_pr,
      inventory: data.inventory,
      smallImage: data.small_image,
      // TODO: add more fields...
      image: data.small_image,
      order: data.idx,
    };
  });

export const menuSchemaArray = z.array(menuSchema);

export type Menu = z.infer<typeof menuSchema>;

export type Category = {
  id: string;
  name: string;
  secondaryName: string;
  order: number;
};

export type CartItem = {
  menuId: string;
  menu: Menu;
  quantity: number;
};

export type Cart = {
  items: CartItem[];
  total: number;
  updatedAt: number;
};
