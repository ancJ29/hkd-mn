import MenuDetail from "@/components/menu-detail";
import { MenuAction } from "@/components/menu-detail/menu-navigation";
import MenuLayout from "@/components/menu-layout";
import MenuList from "@/components/menu-list";
import ModalCart from "@/components/modal/cart";
import ModalOrder from "@/components/modal/order";
import ModalSideDish from "@/components/modal/side-dish";
import { getCategories, getMenuItems } from "@/services/menu";
import { Category, Menu } from "@/types";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const TopMenu = () => {
  const navigate = useNavigate();
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
    case MenuAction.EXPLORE: {
      navigate("/explore");
      break;
    }
    }
  }, []);

  const onChange = useCallback((id: string, total: number) => {
    setTotals((state) => ({ ...state, [id]: total }));
  }, []);

  return (
    <>
      <ModalCart opened={openedCart} onClose={() => setOpenedCart(false)} />

      <ModalOrder opened={false} onClose={() => null} />

      <ModalSideDish opened={false} onClose={() => null} />

      <MenuLayout
        categories={categories}
        selectedCategoryId={selectedCategoryId}
        setSelectedCategoryId={setSelectedCategoryId}
      >
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
      </MenuLayout>
    </>
  );
};

export default TopMenu;
