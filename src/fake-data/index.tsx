import { Menu } from "@/types";
import { faker } from "@faker-js/faker";

faker.seed(20231022);
const _uuid = faker.string.uuid;
const _int = faker.number.int;
// const _arrayElement = faker.helpers.arrayElement;

// const colors: Record<string, string> = {};
export const categories = [
  /* cspell:disable  */
  "Thức uống",
  "Món theo mùa",
  "Sashimi",
  "Salad",
  "Món ăn chơi",
  "Sushi",
  "Cơm cuộn",
  "Lẩu",
  "Bò Wagyu",
  "Món khác",
  "Tráng miệng",
  /* cspell:enable  */
].map((name: string, index: number) => ({
  id: (index + 1).toString(),
  name,
}));

// function _name() {
//   return faker.commerce.productName().split(" ").slice(0, 2).join(" ");
// }

export const menuItems = [
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
    id: _uuid(),
    name,
    image: `/images/menu/a_detail_${index % 9}.jpg`,
    smallImage: `/images/menu/a_${index % 9}.jpg`,
    price: _int({ min: 50, max: 200 }) * 1e3,
  };
}) as Menu[];
