import CategoryBand from "@/components/category-band";
import MenuDetail from "@/components/menu-detail";
import MenuLayout from "@/components/menu-layout";
import MenuList from "@/components/menu-list";
import { getCategories, getMenuItems } from "@/services/menu";
import { Category, Menu } from "@/types";
import { delayedExecution, parseJSON, scroll, swapMenuItems } from "@/utils";
import { CATEGORY_ID, FIRST_ORDER, MENU_ITEM, TOTALS } from "@/utils/constant";
import { ReactNode, useCallback, useEffect, useRef, useState } from "react";

const TopMenu = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState("");
  const [menuItems, setMenuItems] = useState<Menu[]>([]);
  const [selectedMenuItem, setSelectedMenuItem] = useState<Menu | undefined>(undefined);
  const [cart, setCart] = useState<{ [key: string]: number }>({});
  const [isScrolledMenuByCode, setIsScrolledMenuByCode] = useState(false);
  const [timeOutId, setTimeOutId] = useState(0);
  const [isError, setIsError] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    console.log("fetch data...");
    getMenuItems().then((menuItems) => {
      getCategories().then((categories) => {
        if (menuItems === undefined || categories === undefined) {
          setIsError(true);
          return;
        }
        setCategories(categories);
        setMenuItems(() => {
          const swapMenu = swapMenuItems(menuItems);
          handleSelectCategoryId(
            sessionStorage.getItem(CATEGORY_ID) || categories[0]?.id,
            swapMenu,
          );
          return swapMenu;
        });
      });
    });
    setUpTotals();
  }, []);

  const setUpTotals = () => {
    sessionStorage.getItem(TOTALS) === null
      ? setCart({})
      : setCart(parseJSON(sessionStorage.getItem(TOTALS) ?? ""));
  };

  const onChangeCart = useCallback((id: string, quantity: number) => {
    setCart((state) => {
      const newState = { ...state, [id]: quantity };
      sessionStorage.setItem(TOTALS, JSON.stringify(newState));
      window.dispatchEvent(new Event(TOTALS));
      return newState;
    });
  }, []);

  const handleSelectCategoryId = (id: string, menu?: Menu[]) => {
    clearTimeout(timeOutId);
    setIsScrolledMenuByCode(true);
    setSelectedCategoryId(id);
    sessionStorage.setItem(CATEGORY_ID, id);
    const menuSelected = (menu || menuItems).find(
      (e) => e.categoryId === id && e.order === FIRST_ORDER,
    );
    const menuToScroll = (menu || menuItems).find((e) => e.categoryId === id);
    setSelectedMenuItem(menuSelected);
    delayedExecution(() => {
      scroll(`${MENU_ITEM}.${menuToScroll?.id}`);
    }, 500);
    const timeOut = delayedExecution(() => {
      setIsScrolledMenuByCode(false);
    }, 2500);
    setTimeOutId(timeOut);
  };

  const handleScroll = () => {
    if (menuRef.current && !isScrolledMenuByCode) {
      const menuRect = menuRef.current.getBoundingClientRect();
      const visibleItems = menuItems.filter((menuItem) => {
        const itemRect = document
          .getElementById(`${MENU_ITEM}.${menuItem.id}`)
          ?.getBoundingClientRect();
        return (
          itemRect && itemRect.left >= menuRect.left && itemRect.right <= menuRect.right
        );
      });

      if (visibleItems.length > 0) {
        setSelectedCategoryId(visibleItems[0].categoryId);
      }
    }
  };

  const handleSelectedMenuItem = (selectedMenu: Menu) => {
    setSelectedMenuItem(selectedMenu);
    setSelectedCategoryId(selectedMenu.categoryId);
  };

  const header = (): ReactNode => {
    return (
      <CategoryBand
        categories={categories}
        selectedId={selectedCategoryId}
        onSelect={handleSelectCategoryId}
        isScrolledMenuByCode={isScrolledMenuByCode}
      />
    );
  };

  return (
    <MenuLayout header={header()} isError={isError}>
      <MenuList
        key={menuItems.length}
        menuItems={menuItems}
        selectedMenuItem={selectedMenuItem}
        onSelect={handleSelectedMenuItem}
        menuRef={menuRef}
        onScroll={handleScroll}
      />
      <MenuDetail
        menuItem={selectedMenuItem}
        cart={cart}
        onChange={onChangeCart.bind(null, selectedMenuItem?.id || "-")}
      />
    </MenuLayout>
  );
};

export default TopMenu;
