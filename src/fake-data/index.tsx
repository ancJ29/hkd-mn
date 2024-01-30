import { Advertisement, Category } from "@/types";
import { faker } from "@faker-js/faker";
import { menuData } from "./menu-data";

faker.seed(20231022);
const _uuid = faker.string.uuid;
const _int = faker.number.int;

const baseImageURL = import.meta.env.BASE_IMAGE_URL;

export const categories = menuData.map((categoryData, index) => ({
  id: (index + 1).toString(),
  name: categoryData.categoryName,
  menuItems: categoryData.menu.map((menuItem) => ({
    id: _uuid(),
    name: menuItem.name,
    image: `${baseImageURL}${menuItem.imageUrl}`,
    smallImage: `${baseImageURL}${menuItem.smallImageUrl}`,
    price: _int({ min: 50, max: 200 }) * 1e3,
  })),
})) as Category[];

export const foodAdvertisement = [...Array(6).keys()].map((_, index) => {
  return {
    id: _uuid(),
    image: `/images/food_highlight/a_${index % 2}.png`,
  };
}) as Advertisement[];

export const materialAdvertisement = [...Array(6).keys()].map((_, index) => {
  return {
    id: _uuid(),
    image: `/images/materials/a_${index % 3}.png`,
  };
}) as Advertisement[];
