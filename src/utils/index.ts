import { Category, Menu } from "@/types";

export const formatCurrency = (value?: number) => {
  if (!value) {
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

export const convertToMenuItems = (categories: Category[]) => {
  const SIZE = 9;
  let index = 0;
  // const menu: Menu[] = ([] as Menu[]).concat(...categories.map((e) => e.menuItems));
  const menu: Menu[] = [];
  categories.forEach((category) => {
    menu.push(...category.menuItems);

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
          categoryId: category.id,
        } as Menu);
      }
    }
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
