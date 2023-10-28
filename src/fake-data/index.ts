import { Menu } from "@/types";
import { faker } from "@faker-js/faker";

faker.seed(20231022);
const _uuid = faker.string.uuid;
const _int = faker.number.int;
// const _numeric = faker.string.numeric;
// const _alphaNumeric = faker.string.alphanumeric;
const _arrayElement = faker.helpers.arrayElement;
// const _arrayElements = faker.helpers.arrayElements;

const colors: Record<string, string> = {};
/* cspell:disable  */
export const categories = [
  "DRINK",
  "SASHIMI",
  "SALAD",
  "TSUKIDASHI",
  "SUSHI",
  "MAKI SUSHI",
  "ROLL",
  "NABE",
  "WAGYU +",
  "SPECIAL SET",
  "OTHERS",
  "DESSERT",
].map((name: string, index: number) => {
  /* cspell:enable  */
  const id = (index + 1).toString();
  colors[id] = faker.color.rgb().replace("#", "");
  return {
    order: 1 + index,
    id,
    name,
  };
});

function _name() {
  return faker.commerce.productName().split(" ").slice(0, 2).join(" ");
}

let counter = 0;

let menuItemOrder = 0;
export const menuItems = Array.from({ length: categories.length * 20 }, (): Menu => {
  menuItemOrder++;
  counter++;
  let category = _arrayElement(categories);
  if (counter < 8) {
    category = categories[0];
  } else if (category.id === categories[0].id) {
    category = categories[1];
  }
  const order = category.order * 1e6 + menuItemOrder;
  // const color = colors[category.id];
  const id = _uuid();
  return {
    id: id,
    itemId: id,
    order,
    foreignName: "料理名となります",
    name: `${counter}.${_name()}`,
    price: _int({ min: 50, max: 200 }) * 1e3,
    inventory: 1,
    base64SmallImage: "",
    smallImage: `/images/assets/a_${counter % 9}.png`,
    image: `/images/assets/a_${counter % 9}.png`,
    categoryId: category.id,
  };
});
