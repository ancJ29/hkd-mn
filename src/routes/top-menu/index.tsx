import CategoryBand from "@/components/category-band";
import Loading from "@/components/loading";
import MenuDetail from "@/components/menu-detail";
import MenuLayout from "@/components/menu-layout";
import MenuList from "@/components/menu-list";
import { getCategories, getMenuItems } from "@/services/menu";
import { Category, Menu } from "@/types";
import { parseJSON } from "@/utils";
import { CATEGORY_ID, TOTALS } from "@/utils/constant";
import { ReactNode, useCallback, useEffect, useState } from "react";

const TopMenu = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState("");
  const [menuItems, setMenuItems] = useState<Menu[]>([]);
  const [selectedMenuItem, setSelectedMenuItem] = useState<Menu | undefined>(undefined);
  const [totals, setTotals] = useState<{ [key: string]: number }>({});

  useEffect(() => {
    console.log("fetch data...");
    getCategories().then((categories) => {
      setCategories(categories);
      handleSelectCategoryId(sessionStorage.getItem(CATEGORY_ID) || categories[0]?.id);
    });
    setUpTotals();
  }, []);

  const setUpTotals = () => {
    sessionStorage.getItem(TOTALS) === null
      ? setTotals({})
      : setTotals(parseJSON(sessionStorage.getItem(TOTALS) ?? ""));
  };

  const onChangeTotals = useCallback((id: string, total: number) => {
    setTotals((state) => {
      const newState = { ...state, [id]: total };
      sessionStorage.setItem(TOTALS, JSON.stringify(newState));
      window.dispatchEvent(new Event(TOTALS));
      return newState;
    });
  }, []);

  const handleSelectCategoryId = (id: string) => {
    setSelectedCategoryId(id);
    sessionStorage.setItem(CATEGORY_ID, id);
    getMenuItems(id).then((items) => {
      setMenuItems(items);
      setSelectedMenuItem(items[0] || null);
    });
  };

  if (menuItems.length < 1) {
    return <Loading />;
  }

  const header = (): ReactNode => {
    return (
      <CategoryBand
        categories={categories}
        selectedId={selectedCategoryId}
        onSelect={handleSelectCategoryId}
      />
    );
  };

  return (
    <MenuLayout header={header()}>
      <MenuList
        key={menuItems.length}
        menuItems={menuItems}
        selectedMenuItem={selectedMenuItem}
        onSelect={setSelectedMenuItem}
      />
      <MenuDetail
        menuItem={selectedMenuItem}
        totals={totals}
        onChange={onChangeTotals.bind(null, selectedMenuItem?.id || "-")}
      />
    </MenuLayout>
  );
};

export default TopMenu;
