import { z } from "zod";

// const lang = localStorage.getItem("lang") || "vi";

export const menuSchema = z
  .object({
    idx: z.number(),
    itemid: z.number(),
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
    return {
      id: `${Date.now()}.${(Math.random() + 1).toString(36).substring(7)}`,
      itemId: data.itemid.toString(),
      categoryId: data.groupindex.toString(),
      name: data.prod_name || "--",
      foreignName: data.prod_name_jp || "----",
      price: data.sales_pr,
      inventory: data.inventory || 0,
      smallImage: "",
      base64SmallImage: data.small_image,
      // TODO: add more fields...
      image: data.small_image,
      order: data.idx,
    };
  });

/* cspell:disable  */
const secondaryNames: Record<string, string> = {
  DRINK: "ドリンク",
  SASHIMI: "刺身",
  SALAD: "サラダ",
  TSUKIDASHI: "突き出し",
  SUSHI: "寿司",
  "MAKI SUSHI": "巻き寿司",
  ROLL: "ロール",
  NABE: "鍋",
  WAGYU: "和牛",
  SPECIAL: "スペシャルセット",
  GOHAN: "ご飯",
  NOODLE: "麺",
  DESSERT: "デザート",
};
/* cspell:enable  */

export const categorySchema = z
  .object({
    idx: z.number(),
    itemid: z.number(),
    groupindex: z.number(),
    grpname: z.string(),
    prod_name_en: z.string(),
    prod_name_jp: z.string(),
    inventory: z.number(),
    sales_pr: z.number(), // price
    small_image: z.string(),
    // TODO: add more fields...
  })
  .transform((data) => {
    return {
      id: data.groupindex.toString(),
      name: data.grpname || "--",
      order: data.groupindex,
      secondaryName: secondaryNames[data.grpname] || "--",
    };
  });

export const menuSchemaArray = z.array(menuSchema);
export const categorySchemaArray = z.array(categorySchema);

export type Menu = z.infer<typeof menuSchema>;

export type Category = z.infer<typeof categorySchema>;

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
