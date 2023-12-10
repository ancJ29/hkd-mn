import { categories, menuItems } from "@/fake-data";
import { Category, Menu } from "@/types";

export async function getCategories(): Promise<Category[]> {
  await _delay(200);
  return categories;
}

function _delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function getMenuItems(): Promise<Menu[]> {
  await _delay(200);
  return menuItems;
}
