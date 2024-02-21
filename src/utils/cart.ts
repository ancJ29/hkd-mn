import { Menu } from "@/types";
import { faker } from "@faker-js/faker";

const _int = faker.number.int;

const randomNumber = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

export const CART = [
  /* cspell:disable  */
  "Kanpachi sashimi",
  "Hokkigai sashimi",
  "Salmon sashimi",
  "Komochinisshin sashimi",
  "Kawahashi sashimi",
  "Katsuika sugata zukushi",
  "Hokkaido uni sashimi",
  "Kimmedai sashimi",
  "Ootoro sashimi",
  /* cspell:enable  */
].map((name, index) => {
  return {
    id: index.toString(),
    name,
    image: "",
    smallImage: "",
    quantity: randomNumber(1, 10),
    price: _int({ min: 50, max: 200 }) * 1e3,
  };
}) as Menu[];
