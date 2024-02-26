import {
  categories,
  foodAdvertisement,
  materialAdvertisement,
  menuItems,
} from "@/fake-data";
import callApi from "@/services/http";
import {
  Advertisement,
  Category,
  Menu,
  categorySchemaArray,
  menuSchemaArray,
} from "@/types";
import { addImageLinkFromMenuItems } from "@/utils";

const _categories: Category[] = [];

export async function getCategories(): Promise<Category[] | undefined> {
  return _categories.length > 0 ? _categories : undefined;
}

export async function getMenuItems(): Promise<Menu[] | undefined> {
  const data = await callApi({
    method: "GET",
    path: "/api/get_Jin_din_rou_menu",
    defaultValue: undefined,
  });
  const res1 = menuSchemaArray.safeParse(data);
  const res2 = categorySchemaArray.safeParse(data);

  if (res2.success) {
    const ids: Record<string, number> = {};
    res2.data.forEach((item) => {
      if (ids[item.id]) {
        return;
      }
      ids[item.id] = 1;
      _categories.push(item);
    });
  }

  if (res1.success) {
    const menu = res1.data.filter((el) => "" !== el.categoryId);
    addImageLinkFromMenuItems(menu);
    return menu;
  }

  return undefined;
}

export async function getFoodAdvertisement(): Promise<Advertisement[]> {
  return await callApi({
    method: "GET",
    path: "/api/food-advertisement",
    defaultValue: [],
  });
}

export async function getMaterialAdvertisement(): Promise<Advertisement[]> {
  return await callApi({
    method: "GET",
    path: "/api/material-advertisement",
    defaultValue: [],
  });
}
