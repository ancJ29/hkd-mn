import { z } from "zod";

export const menuSchema = z.object({
  id: z.string(),
  name: z.string(),
  image: z.string(),
  smallImage: z.string(),
  price: z.number(),
  total: z.number().optional(),
  // TODO: add more fields...
});

export const categorySchema = z.object({
  id: z.string(),
  name: z.string(),
  menuItems: menuSchema.array(),
  // TODO: add more fields...
});

export const advertisementSchema = z.object({
  id: z.string(),
  image: z.string(),
});

export const menuSchemaArray = z.array(menuSchema);
export const categorySchemaArray = z.array(categorySchema);
export const AdvertisementSchemaArray = z.array(advertisementSchema);

export type Menu = z.infer<typeof menuSchema>;
export type Category = z.infer<typeof categorySchema>;
export type Advertisement = z.infer<typeof advertisementSchema>;
