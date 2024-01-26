import { getCategories } from "@/services/menu";
import { Category } from "@/types";
import { parseJSON } from "@/utils";
import { TOTALS } from "@/utils/constant";
import { AppShell } from "@mantine/core";
import { ReactNode, useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CategoryBand from "../category-band";
import LanguageFlag from "../language-flag";
import MenuNavigation, { MenuAction } from "../menu-detail/menu-navigation";
import ModalCart from "../modal/cart";
import ModalOrder from "../modal/order";
import ModalSideDish from "../modal/side-dish";
import classes from "./index.module.scss";

type MenuLayoutProps = {
  children: ReactNode;
};

const MenuLayout = ({ children }: MenuLayoutProps) => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState("");
  const [totals, setTotals] = useState<{ [key: string]: number }>({});
  const [openedCart, setOpenedCart] = useState(false);

  useEffect(() => {
    const listenStorageChange = () => setUpTotals();
    window.addEventListener(TOTALS, listenStorageChange);
    return () => window.removeEventListener(TOTALS, listenStorageChange);
  }, []);

  useEffect(() => {
    console.log("fetch data...");
    getCategories().then((categories) => {
      setCategories(categories);
      setSelectedCategoryId(categories[0]?.id || "");
    });

    setUpTotals();
  }, []);

  const setUpTotals = () => {
    sessionStorage.getItem(TOTALS) === null
      ? setTotals({})
      : setTotals(parseJSON(sessionStorage.getItem(TOTALS) ?? ""));
  };

  const actionHandler = useCallback((action: MenuAction) => {
    switch (action) {
    case MenuAction.MENU: {
      navigate("/");
      break;
    }
    case MenuAction.EXPLORE: {
      navigate("/explore");
      break;
    }
    case MenuAction.CART: {
      setOpenedCart(true);
      break;
    }
    }
  }, []);

  const onCloseModalCart = () => {
    navigate("/");
    setOpenedCart(false);
  };

  return (
    <>
      <ModalCart opened={openedCart} onClose={onCloseModalCart} />

      <ModalOrder opened={false} onClose={() => null} />

      <ModalSideDish opened={false} onClose={() => null} />

      <div className={classes.container}>
        <AppShell header={{ height: 80, offset: false }}>
          <AppShell.Header h="80px" bg="transparent" withBorder={false}>
            <CategoryBand
              categories={categories}
              selectedId={selectedCategoryId}
              onSelect={setSelectedCategoryId}
            />
            <LanguageFlag />
          </AppShell.Header>
          <AppShell.Main mt="80px">
            <div className={classes.main}>{children}</div>
            <MenuNavigation onAction={actionHandler} totals={totals} />
          </AppShell.Main>
        </AppShell>
      </div>
    </>
  );
};

export default MenuLayout;
