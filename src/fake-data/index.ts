import { Category, Menu } from "@/types";
import { faker } from "@faker-js/faker";

faker.seed(20231022);
const _uuid = faker.string.uuid;
const _int = faker.number.int;
// const _numeric = faker.string.numeric;
// const _alphaNumeric = faker.string.alphanumeric;
const _arrayElement = faker.helpers.arrayElement;
// const _arrayElements = faker.helpers.arrayElements;

export const categories = Array.from({ length: 10 }, (): Category => {
  return {
    id: _uuid(),
    name: "Drink",
    secondaryName: "点心",
  };
});

const categoryIds = categories.map((item) => item.id);

function _name() {
  return faker.commerce.productName().split(" ").slice(0, 2).join(" ");
}

export const menuItems = Array.from({ length: 1000 }, (): Menu => {
  return {
    id: _uuid(),
    foreignName: _name(),
    name: _name(),
    price: _int({ min: 50, max: 200 }) * 1e3,
    inventory: 1,
    smallImage: "http://via.placeholder.com/300x300",
    image: "http://via.placeholder.com/600x300",
    // image: faker.image.urlLoremFlickr({
    //   category: "food",
    // }),
    categoryId: _arrayElement(categoryIds),
  };
});
