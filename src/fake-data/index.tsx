import { menuData } from "@/fake-data/menu-data";
import { Advertisement, Category, Menu } from "@/types";
import { faker } from "@faker-js/faker";

faker.seed(20231022);
const _uuid = faker.string.uuid;
const _int = faker.number.int;

const baseImageURL = import.meta.env.BASE_IMAGE_URL;

const getDummyMenuItems = (categoryId: string) => {
  const dummyMenuItems: Menu[] = [
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
      categoryId,
    };
  });
  return dummyMenuItems;
};

export const categories = () => {
  const categoryData: Category[] = menuData.map((categoryData, index) => {
    const id = (index + 1).toString();
    return {
      id: id,
      name: categoryData.categoryName,
      menuItems:
        categoryData.menu.length > 0
          ? categoryData.menu.map((menuItem) => ({
            id: _uuid(),
            name: menuItem.name,
            image: `${baseImageURL}${menuItem.imageUrl}`,
            smallImage: `${baseImageURL}${menuItem.smallImageUrl}`,
            price: _int({ min: 50, max: 200 }) * 1e3,
            categoryId: id,
          }))
          : getDummyMenuItems(id),
    };
  });
  return categoryData;
};

export const foodAdvertisement: Advertisement[] = [...Array(6).keys()].map((_, index) => {
  return {
    id: _uuid(),
    image: `/images/food_highlight/a_${index % 2}.png`,
  };
});

export const materialAdvertisement: Advertisement[] = [...Array(6).keys()].map(
  (_, index) => {
    return {
      id: _uuid(),
      image: `/images/materials/a_${index % 3}.png`,
    };
  },
);
