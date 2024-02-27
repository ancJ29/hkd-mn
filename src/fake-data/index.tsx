import { menuData } from "@/fake-data/menu-data";
import { Advertisement } from "@/types";
import { faker } from "@faker-js/faker";

const baseImageURL = import.meta.env.BASE_IMAGE_URL;

faker.seed(20231022);
const _uuid = faker.string.uuid;
const _int = faker.number.int;

const getDummyMenuItems = (categoryId: number, categoryName: string) => {
  const dummyMenuItems: unknown[] = [
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
      idx: _uuid(),
      grpname: categoryName,
      grpname_en: categoryName,
      grpname_cn: categoryName,
      prod_name_en: name,
      prod_name_jp: name,
      prod_name_vn: name,
      image: `/images/menu/a_detail_${index % 9}.jpg`,
      small_image: `/images/menu/a_${index % 9}.jpg`,
      sales_pr: _int({ min: 50, max: 200 }) * 1e3,
      groupindex: categoryId,
    };
  });
  return dummyMenuItems;
};

export const menuItems = () => {
  const _menuItems: unknown[] = [];
  menuData.map((categoryData, index) => {
    const id = (index + 1).toString();
    _menuItems.push(
      ...(categoryData.menu.length > 0
        ? categoryData.menu.map((menuItem) => ({
          idx: _uuid(),
          prod_name_en: menuItem.name,
          prod_name_jp: menuItem.name,
          prod_name_vn: menuItem.name,
          grpname: categoryData.categoryName,
          grpname_en: categoryData.categoryName,
          grpname_cn: categoryData.categoryName,
          image: `${baseImageURL}${menuItem.imageUrl}`,
          small_image: `${baseImageURL}${menuItem.smallImageUrl}`,
          sales_pr: _int({ min: 50, max: 200 }) * 1e3,
          groupindex: parseInt(id),
        }))
        : getDummyMenuItems(parseInt(id), categoryData.categoryName)),
    );
  });
  return _menuItems;
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
