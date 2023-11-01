/* eslint-disable no-console */
import { z } from "zod";

// const lang = localStorage.getItem("lang") || "vi";
export const menuSchema = z
  .object({
    idx: z.number(),
    itemid: z.number(),
    kind: z.string(),
    prod_code: z.string(),
    groupindex: z.number(),
    grpname: z.string(),
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
      code: data.prod_code.toString(),
      name: data.prod_name || "--",
      foreignName: data.prod_name_jp || "----",
      price: data.sales_pr,
      inventory: data.inventory || 0,
      smallImage: "",
      base64SmallImage: data.small_image || "",
      // data.small_image,
      // TODO: add more fields...
      image: "",
      order: data.groupindex * 1e6 + data.idx,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      raw: data as any,
    };
  });

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
    };
  });

const billDetailSchema = z
  .object({
    /* cspell:disable  */
    Prod_code: z.string(),
    Quant: z.string(),
    TotalStr: z.string(),
  })
  .transform((data) => {
    let quantity = parseInt(data.Quant);
    isNaN(quantity) && (quantity = 0);
    let total = parseInt(data.TotalStr.replace(/,/g, ""));
    isNaN(total) && (total = 0);
    return {
      itemCode: data.Prod_code.toString(),
      quantity,
      total,
    };
  });
/* cspell:enable  */

export const billSchema = z
  .object({
    Total: z.string(),
    SubTotal: z.string(),
    Vat: z.string(),
    Items: z.array(billDetailSchema),
  })
  .transform((data) => {
    let subTotal = parseInt(data.SubTotal.replace(/,/g, ""));
    let total = parseInt(data.Total.replace(/,/g, ""));
    let vat = parseInt(data.Vat.replace(/,/g, ""));
    isNaN(subTotal) && (subTotal = 0);
    isNaN(total) && (total = 0);
    isNaN(vat) && (vat = 0);
    return {
      subTotal,
      total,
      vat,
      items: data.Items,
    };
  });
export const menuSchemaArray = z.array(menuSchema);
export const categorySchemaArray = z.array(categorySchema);

export type Bill = z.infer<typeof billSchema>;
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
  vat: number;
  subTotal: number;
  updatedAt: number;
};
