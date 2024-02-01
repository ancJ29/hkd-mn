import { categories, foodAdvertisement, materialAdvertisement } from "@/fake-data";
import { Advertisement, Category, Menu } from "@/types";

export async function getCategories(): Promise<Category[]> {
  await _delay(200);
  return categories();
}

function _delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function getMenuItems(categoryId: string): Promise<Menu[]> {
  await _delay(200);
  return categories().find((e) => e.id === categoryId)?.menuItems || [];
}

export async function getFoodAdvertisement(): Promise<Advertisement[]> {
  await _delay(200);
  return foodAdvertisement;
}

export async function getMaterialAdvertisement(): Promise<Advertisement[]> {
  await _delay(200);
  return materialAdvertisement;
}
