/* eslint-disable no-console */
import { Cart } from "@/types";
import clonedeep from "lodash.clonedeep";

export function toLocale(value?: number) {
  if (!value) {
    return "-";
  }
  return `${value.toLocaleString().replace(/,/g, ".")}đ`;
}

export function cloneCart(cart: Cart) {
  return {
    ...clonedeep(cart),
    updatedAt: Date.now(),
  };
}

export function swap<T>(arr: T[], a: number, b: number) {
  if (arr[a] && arr[b]) {
    const tmp = arr[a];
    arr[a] = arr[b];
    arr[b] = tmp;
  }
}

export function scroll(id: string, options?: ScrollIntoViewOptions) {
  const el = document.getElementById(id);
  if (el) {
    // console.log("scroll to", id);
    el.scrollIntoView(
      options || {
        behavior: "smooth",
        block: "start",
        inline: "nearest",
      },
    );
  }
}
