/* cspell:disable  */
import { LANGUAGE } from "@/utils/constant";
import { z } from "zod";

export const menuSchema = z
  .object({
    page: z.number(),
    groupindex: z.number(),
    grpname: z.string(),
    grpname_en: z.string(),
    grpname_cn: z.string(),
    idx: z.number(),
    itemid: z.number(),
    prod_code: z.string(),
    prod_name: z.string(),
    purchaseu: z.string(),
    prod_name_en: z.string(),
    prod_name_jp: z.string(),
    prod_name_vn: z.string(),
    uom_vn: z.string(),
    uom_en: z.string(),
    uom_cn: z.string(),
    inventory: z.number(),
    sales_pr: z.number(),
    forcequest: z.number(),
    setmenu: z.number(),
    uom: z.string(),
    kind: z.string(),
    buttontype: z.number(),
    prntype: z.number(),
    vat: z.number(),
    small_image: z.string(),
    lineid: z.string(),
  })
  .transform((data) => {
    const language = localStorage.getItem(LANGUAGE);
    return {
      id: data.idx.toString(),
      name:
        language === "vi"
          ? data.prod_name_vn
          : language === "en"
            ? data.prod_name_en
            : data.prod_name_jp,
      image: data.small_image,
      smallImage: data.small_image,
      price: data.sales_pr,
      quantity: 0,
      note: "",
      categoryId: data.groupindex.toString(),
    };
  });

export const categorySchema = z
  .object({
    groupindex: z.number(),
    grpname: z.string(),
    grpname_en: z.string(),
    grpname_cn: z.string(),
  })
  .transform((data) => {
    const language = localStorage.getItem(LANGUAGE);
    return {
      id: data.groupindex.toString(),
      name:
        language === "vi"
          ? data.grpname
          : language === "en"
            ? data.grpname_en
            : data.grpname_cn,
    };
  });

export const advertisementSchema = z.object({
  id: z.string(),
  image: z.string(),
});

export const menuSchemaArray = z.array(menuSchema);
export const categorySchemaArray = z.array(categorySchema);
export const advertisementSchemaArray = z.array(advertisementSchema);

export type Menu = z.infer<typeof menuSchema>;
export type Category = z.infer<typeof categorySchema>;
export type Advertisement = z.infer<typeof advertisementSchema>;
