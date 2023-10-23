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
