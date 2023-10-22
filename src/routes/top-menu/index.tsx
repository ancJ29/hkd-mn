import CategoryBand from "@/components/category-band";
import MenuDetail from "@/components/menu-detail";
import MenuList from "@/components/menu-list";
import config from "@/configs/custom";
import { getCategories, getMenuItems } from "@/services/menu";
import { Category, Menu } from "@/types";
import { Box } from "@mantine/core";
import { useEffect, useMemo, useState } from "react";

const TopMenu = () => {
  const [categories, setCategory] = useState<Category[]>([]);
  const [menuItems, setMenuItems] = useState<Menu[]>([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState("");
  const [selectedMenuItemId, setSelectedMenuItemId] = useState("");

  const categoryMenuItems = useMemo(() => {
    return menuItems.filter((item) => item.categoryId === selectedCategoryId);
  }, [menuItems, selectedCategoryId]);

  const selectedMenuItem = useMemo(() => {
    return menuItems.find((item) => item.id === selectedMenuItemId);
  }, [menuItems, selectedMenuItemId]);

  useEffect(() => {
    getCategories().then((categories: Category[]) => {
      setCategory(categories);
      setSelectedCategoryId(categories[0]?.id || "");
    });
    getMenuItems().then((items) => setMenuItems(items));
  }, []);

  return (
    <Box w='100vw' h='100vh' lh={1.2} p={2} style={config.base}>
      <CategoryBand
        categories={categories}
        selectedId={selectedCategoryId || categories[0]?.id || ""}
        onSelect={(id) => {
          setSelectedCategoryId(id);
          setSelectedMenuItemId("");
        }}
      />
      <MenuList
        selectedMenuItemId={selectedMenuItemId || categoryMenuItems[0]?.id || ""}
        menuItems={categoryMenuItems}
        onSelect={(id) => setSelectedMenuItemId(id)}
      />
      <MenuDetail menuItem={selectedMenuItem} />
    </Box>
  );
};

export default TopMenu;
