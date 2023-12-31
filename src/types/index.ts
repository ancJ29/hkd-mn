import { z } from "zod";

export const menuSchema = z.object({
  id: z.string(),
  name: z.string(),
  image: z.string(),
  smallImage: z.string(),
  price: z.number(),
  // TODO: add more fields...
});

export const categorySchema = z.object({
  id: z.string(),
  name: z.string(),
  // TODO: add more fields...
});

export const menuSchemaArray = z.array(menuSchema);
export const categorySchemaArray = z.array(categorySchema);

export type Menu = z.infer<typeof menuSchema>;
export type Category = z.infer<typeof categorySchema>;
