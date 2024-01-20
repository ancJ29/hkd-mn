import CategoryBand from "@/components/category-band";
import LanguageFlag from "@/components/language-flag";
import MenuDetail from "@/components/menu-detail";
import { MenuAction } from "@/components/menu-detail/menu-navigation";
import MenuList from "@/components/menu-list";
import ModalCart from "@/components/modal/cart";
import { getCategories, getMenuItems } from "@/services/menu";
import { Category, Menu } from "@/types";
import { AppShell } from "@mantine/core";
import { useCallback, useEffect, useState } from "react";
import classes from "./index.module.scss";

const TopMenu = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState("");

  const [menuItems, setMenuItems] = useState<Menu[]>([]);
  const [selectedMenuItem, setSelectedMenuItem] = useState<Menu | undefined>(undefined);
  const [totals, setTotals] = useState<{ [key: string]: number }>({});
  const [openedCart, setOpenedCart] = useState(false);

  useEffect(() => {
    console.log("fetch data...");
    getCategories().then((categories) => {
      setCategories(categories);
      setSelectedCategoryId(categories[0]?.id || "");
    });
    getMenuItems().then((items) => {
      setMenuItems(items);
      setSelectedMenuItem(items[0] || null);
    });
  }, []);

  const actionHandler = useCallback((action: MenuAction) => {
    switch (action) {
      case MenuAction.CART: {
        setOpenedCart(true);
        break;
      }
    }
  }, []);

  const onChange = useCallback((id: string, total: number) => {
    setTotals((state) => ({ ...state, [id]: total }));
  }, []);

  return (
    <div className={classes.container}>
      <ModalCart opened={openedCart} onClose={() => setOpenedCart(false)} />

      <AppShell header={{ height: 80, offset: false }}>
        <AppShell.Header h="80px" bg="transparent" withBorder={false}>
          <CategoryBand categories={categories} selectedId={selectedCategoryId} onSelect={setSelectedCategoryId} />
          <LanguageFlag />
        </AppShell.Header>
        <AppShell.Main mt="80px">
          <div className={classes.main}>
            <MenuList
              key={menuItems.length}
              menuItems={menuItems}
              selectedMenuItem={selectedMenuItem}
              onSelect={setSelectedMenuItem}
            />
            <MenuDetail
              menuItem={selectedMenuItem}
              totals={totals}
              onChange={onChange.bind(null, selectedMenuItem?.id || "-")}
              onAction={actionHandler}
            />
          </div>
        </AppShell.Main>
      </AppShell>
    </div>
  );
};

export default TopMenu;
