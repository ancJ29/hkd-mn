import CategoryBand from "@/components/category-band";
import MenuDetail from "@/components/menu-detail";
import MenuList from "@/components/menu-list";
import { MenuAction } from "@/components/menu-navigation";
import { getCategories, getMenuItems } from "@/services/menu";
import { Category, Menu } from "@/types";
import { AppShell } from "@mantine/core";
import { useCallback, useEffect, useState } from "react";
import classes from "./index.module.css";

const debug = true;
const TopMenu = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState("");
  const [selectedMenuItem, setSelectedMenuItem] = useState<Menu | undefined>(
    undefined,
  );
  const [menuItems, setMenuItems] = useState<Menu[]>([]);
  const [totals, setTotals] = useState<{ [key: string]: number }>({});

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
    alert(`onAction: ${action}`);
  }, []);

  const onChange = useCallback((id: string, total: number) => {
    const newTotals = { ...totals, [id]: total };
    setTotals(newTotals);
  }, []);

  return (
    <AppShell header={{ height: 60, offset: false }}>
      <AppShell.Header h="200px" bg="transparent" withBorder={false}>
        <CategoryBand
          categories={categories}
          selectedId={selectedCategoryId}
          onSelect={setSelectedCategoryId}
        />
      </AppShell.Header>
      <AppShell.Main mt="200px">
        <div className={classes.container}>
          <MenuList
            key={menuItems.length}
            menuItems={menuItems}
            selectedMenuItem={selectedMenuItem}
            onSelect={setSelectedMenuItem}
          />
          <MenuDetail
            menuItem={selectedMenuItem}
            total={totals[selectedMenuItem?.id || "-"] || 1}
            onChange={onChange.bind(null, selectedMenuItem?.id || "-")}
            onAction={actionHandler}
          />
        </div>
      </AppShell.Main>
    </AppShell>
  );
};

export default TopMenu;
