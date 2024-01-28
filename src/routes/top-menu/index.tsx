import Loading from "@/components/loading";
import MenuDetail from "@/components/menu-detail";
import MenuLayout from "@/components/menu-layout";
import MenuList from "@/components/menu-list";
import { getMenuItems } from "@/services/menu";
import { Menu } from "@/types";
import { parseJSON } from "@/utils";
import { TOTALS } from "@/utils/constant";
import { useCallback, useEffect, useState } from "react";

const TopMenu = () => {
  const [menuItems, setMenuItems] = useState<Menu[]>([]);
  const [selectedMenuItem, setSelectedMenuItem] = useState<Menu | undefined>(undefined);
  const [totals, setTotals] = useState<{ [key: string]: number }>({});

  useEffect(() => {
    console.log("fetch data...");
    getMenuItems().then((items) => {
      setMenuItems(items);
      setSelectedMenuItem(items[0] || null);
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

  if (menuItems.length < 1) {
    return <Loading />;
  }

  return (
    <>
      <MenuLayout>
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
    </>
  );
};

export default TopMenu;
