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
export const categories = (
  [
    ["DRINKS", "ドリンク"],
    ["SASHIMI", "刺身"],
    ["SALAD", "サラダ"],
    ["TSUKIDASHI", "突き出し"],
    ["SUSHI", "寿司"],
    ["MAKI SUSHI", "巻き寿司"],
    ["ROLL", "ロール"],
    ["NABE", "鍋"],
    ["WAGYU", "和牛"],
    ["SPECIAL SET", "スペシャルセット"],
    ["GOHAN", "ご飯"],
    ["NOODLE", "麺"],
    ["DESSERT", "デザート"],
  ] as [string, string][]
).map(([name, secondaryName]: [string, string], index: number) => {
  /* cspell:enable  */
  const id = (index + 1).toString();
  colors[id] = faker.color.rgb().replace("#", "");
  return {
    order: 1 + index,
    id,
    name,
    secondaryName,
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
  const color = colors[category.id];
  const id = _uuid();
  return {
    id: id,
    itemId: id,
    order,
    foreignName: "料理名となります",
    name: _name(),
    price: _int({ min: 50, max: 200 }) * 1e3,
    inventory: 1,
    base64SmallImage: "",
    smallImage: `http://via.placeholder.com/356x262/${color}`,
    image: `http://via.placeholder.com/712x524/${color}`,
    categoryId: category.id,
  };
});
