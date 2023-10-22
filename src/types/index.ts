import { z } from "zod";

const lang = localStorage.getItem("lang") || "vi";

export const menuSchema = z
  .object({
    prod_name: z.string(),
    prod_name_en: z.string(),
    prod_name_jp: z.string(),
    inventory: z.number(),
    sales_pr: z.number(), // price
    // TODO: add more fields...
  })
  .transform((data) => {
    let foreignName = data.prod_name_jp;
    if (lang === "en") {
      foreignName = data.prod_name_en;
    }
    return {
      name: data.prod_name,
      foreignName,
      price: data.sales_pr,
      inventory: data.inventory,
      // TODO: add more fields...
    };
  });

export const menuSchemaArray = z.array(menuSchema);

export type Menu = z.infer<typeof menuSchema>;

export type Category = {
  id: string;
  name: string;
  secondaryName: string;
};
