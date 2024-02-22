import { Menu } from "@/types";

export const formatCurrency = (value?: number) => {
  if (value === undefined || value === null) {
    return "";
  }
  return value
    .toLocaleString("vi-Vi", {
      style: "currency",
      currency: "VND",
    })
    .replace("₫", "");
};

export const parseJSON = (value: string) => {
  const parseData = JSON.parse(value);
  return parseData;
};

export function swap<T>(arr: T[], a: number, b: number) {
  if (arr[a] && arr[b]) {
    const tmp = arr[a];
    arr[a] = arr[b];
    arr[b] = tmp;
  }
}

export const swapMenuItems = (menuItems: Menu[]) => {
  const SIZE = 9;
  let index = 0;
  const menu: Menu[] = [];
  let previousCategoryId = menuItems[0].categoryId;

  menuItems.forEach((menuItem) => {
    if (menuItem.categoryId !== previousCategoryId) {
      if (menu.length % SIZE > 3) {
        const fillCount = SIZE - (menu.length % SIZE);
        for (let i = 0; i < fillCount; i++) {
          menu.push({
            id: (index++).toString(),
            name: "",
            image: "",
            smallImage: "",
            price: 0,
            quantity: 0,
            categoryId: previousCategoryId,
          } as Menu);
        }
      }
      previousCategoryId = menuItem.categoryId;
    }
    menu.push(menuItem);
  });

  for (let i = 0; i < menu.length; i += SIZE) {
    swap(menu, 1 + i, 3 + i);
    swap(menu, 2 + i, 6 + i);
    swap(menu, 5 + i, 7 + i);
  }

  return menu;
};

export const scroll = (id: string, options?: ScrollIntoViewOptions) => {
  const el = document.getElementById(id);
  el?.scrollIntoView(
    options || {
      block: "nearest",
      inline: "start",
      behavior: "smooth",
    },
  );
};

export const addImageLinkFromMenuItems = (menuItems: Menu[]) => {
  menuItems.forEach((menu) => {
    addLinkTagToHead(menu.image);
    addLinkTagToHead(menu.smallImage);
  });
};

const addLinkTagToHead = (url: string) => {
  const linkTag = document.createElement("link");
  linkTag.rel = "stylesheet";
  linkTag.as = "image";
  linkTag.href = url;

  document.head.appendChild(linkTag);
};

export const delayedExecution = (callback: () => void, timeOut: number) => {
  return setTimeout(() => {
    callback();
  }, timeOut);
};
