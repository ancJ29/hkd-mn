/* eslint-disable no-console */
import { categories as _categories, menuItems as _menuItems } from "@/fake-data";
import callApi from "@/services/http";
import { Cart, Category, Menu, categorySchemaArray, menuSchemaArray } from "@/types";
import logger from "../logger";

const FAKE = 1;
const categories: Category[] = [];
let menuItems: Menu[] = [];

export async function getCategories(): Promise<Category[]> {
  if (FAKE) return _categories;
  return categories;
}

export async function getMenuItems(): Promise<Menu[]> {
  if (FAKE) return _menuItems;
  if (menuItems.length > 0) {
    return menuItems;
  }
  // http://125.253.116.236:56585/api/get_hokkaido_emenu
  const path = "/api/get_hokkaido_emenu";

  const data = await callApi({
    path,
    method: "GET",
    defaultValue: [],
    cache: true,
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
      categories.push(item);
    });
  }
  if (res1.success) {
    menuItems = res1.data.filter((el) => "" !== el.categoryId);
    return menuItems;
  } else {
    logger.error("[menu-service] Schema parse error for getMenu!!!", data);
  }
  return [];
}

export async function getBillDetail(table: string, bill: string) {
  const path = `/api/Get_Table_Bill_Detail?ban=${table}&bill=${bill}}`;
  const data = await callApi({
    path,
    method: "GET",
    defaultValue: [],
    cache: true,
  });
  // eslint-disable-next-line no-console
  console.log(data);
  return data;
}

export async function order(cart: Cart) {
  // eslint-disable-next-line no-console
  console.log(cart);
}
