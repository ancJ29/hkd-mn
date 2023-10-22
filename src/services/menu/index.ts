import callApi from "@/services/http";

import { categories, menuItems } from "@/fake-data";
import { Category, Menu, menuSchemaArray } from "@/types";
import logger from "../logger";

export async function getCategories(): Promise<Category[]> {
  return categories;
}

export async function getMenuItems(): Promise<Menu[]> {
  return menuItems;
}

export async function getMenu(): Promise<Menu[]> {
  const path = "/api/get_hokkaido_emenu";

  const data = await callApi({
    path,
    method: "GET",
    defaultValue: [],
    cache: true,
  });

  const res = menuSchemaArray.safeParse(data);
  if (res.success) {
    return res.data;
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
