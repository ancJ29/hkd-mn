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

const FAKE = true;
const _categories: Category[] = [];

function _delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function getCategories(): Promise<Category[] | undefined> {
  if (FAKE) {
    await _delay(200);
    return categories();
  }
  return _categories.length > 0 ? _categories : undefined;
}

export async function getMenuItems(): Promise<Menu[] | undefined> {
  if (FAKE) {
    await _delay(200);
    const menu = menuItems();
    addImageLinkFromMenuItems(menu);
    return menu;
  }
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
  if (FAKE) {
    await _delay(200);
    return foodAdvertisement;
  } else {
    return await callApi({
      method: "GET",
      path: "/api/food-advertisement",
      defaultValue: [],
    });
  }
}

export async function getMaterialAdvertisement(): Promise<Advertisement[]> {
  if (FAKE) {
    await _delay(200);
    return materialAdvertisement;
  } else {
    return await callApi({
      method: "GET",
      path: "/api/material-advertisement",
      defaultValue: [],
    });
  }
}
