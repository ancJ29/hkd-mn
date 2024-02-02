import { Category, Menu } from "@/types";

export const toLocaleString = (value: number) => {
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
  for (let i = 0; i < menuItems.length; i += SIZE) {
    swap(menuItems, 1 + i, 3 + i);
    swap(menuItems, 2 + i, 6 + i);
    swap(menuItems, 5 + i, 7 + i);
  }
  return menuItems;
};

export const scroll = (id: string, options?: ScrollIntoViewOptions) => {
  const el = document.getElementById(id);
  el?.scrollIntoView(
    options || {
      block: "nearest",
      inline: "start",
      behavior: "smooth",
    }
  );
};

export const addImageLinkFromCategory = (categories: Category[]) => {
  categories.forEach((category) => {
    category.menuItems.forEach((menu) => {
      addLinkTagToHead(menu.image);
      addLinkTagToHead(menu.smallImage);
    });
  });
};

const addLinkTagToHead = (url: string) => {
  const linkTag = document.createElement("link");
  linkTag.rel = "preload";
  linkTag.as = "image";
  linkTag.href = url;

  document.head.appendChild(linkTag);
};
