/* eslint-disable no-console */
import { categories as _categories, menuItems as _menuItems } from "@/fake-data";
import callApi from "@/services/http";
import { Bill, Cart, Category, Menu, billSchema, categorySchemaArray, menuSchemaArray } from "@/types";
import { v4 as uuidv4 } from "uuid";
import logger from "../logger";

const FAKE = true;
const categories: Category[] = [];
let menuItems: Menu[] = [];

export async function getCategories(): Promise<Category[]> {
  if (FAKE) return _categories;
  return categories;
}

function _delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function getMenuItems(): Promise<Menu[]> {
  if (FAKE) {
    await _delay(1000);
    return _menuItems;
  }
  if (menuItems.length > 0) {
    return menuItems;
  }
  // http://125.253.116.236:56585/api/get_hokkaido_emenu
  const path = "/api/get_hokkaido_emenu";

  const data = await callApi({
    path,
    method: "GET",
    defaultValue: [],
    cache: false,
  });
  // console.log(
  //   data.length,
  //   // eslint-disable-next-line @typescript-eslint/no-explicit-any
  //   data.map((el: any) => {
  //     return {
  //       name: el.prod_name,
  //       jp: el.prod_name_jp,
  //       en: el.prod_name_en,
  //       grpname: el.grpname,
  //       groupindex: el.groupindex,
  //     };
  //   }),
  // );
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
    // console.log(menuItems.length);

    return menuItems;
  } else {
    logger.error("[menu-service] Schema parse error for getMenu!!!", data);
  }
  return [];
}

export async function getBillDetail(tableId: string, billId: string): Promise<Bill> {
  if (FAKE) {
    return {
      total: 0,
      subTotal: 0,
      vat: 0,
      items: [],
    };
  }
  const path = `/api/Get_Table_Bill_Detail?ban=${tableId}&bill=${billId}`;
  const data = await callApi({
    path,
    method: "GET",
    defaultValue: [],
    cache: false,
  });
  const res = billSchema.safeParse(data);
  if (res.success) {
    return res.data;
  }
  return {
    total: 0,
    subTotal: 0,
    vat: 0,
    items: [],
  };
}

export async function order(cart: Cart, tableId: string) {
  if (FAKE) {
    await _delay(1000);
    return;
  }
  // eslint-disable-next-line no-console
  /* cspell:disable  */
  const data = cart.items.map((el, index) => ({
    Printerdescription: "",
    Uom: el.menu.raw.uom,
    ban: tableId,
    bill: 1,
    customers: 0,
    dispercent: 0,
    kind: "FOOD",
    line: index + 1,
    logincode: "QRCODE",
    loginname: "QRCODE",
    mainprz: el.menu.price,
    note: "",
    orderid: uuidv4(),
    ParentID: null,
    prntype: el.menu.raw.prntype,
    prod_code: el.menu.raw.prod_code,
    prod_id: el.menu.raw.itemid,
    prod_name: el.menu.name,
    quant: el.quantity,
    selection: [],
    stationid: 9,
    total: el.quantity * el.menu.price,
  }));
  console.log(data);
  await callApi({
    path: "/api/Save_Order",
    method: "POST",
    data,
    cache: false,
  });
  /* cspell:disable  */
}
