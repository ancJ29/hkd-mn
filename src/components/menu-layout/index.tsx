import { parseJSON } from "@/utils";
import { TOTALS } from "@/utils/constant";
import { AppShell } from "@mantine/core";
import { ReactNode, useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import LanguageFlag from "../language-flag";
import MenuNavigation, { MenuAction } from "../menu-detail/menu-navigation";
import ModalCart from "../modal/cart";
import ModalOrder from "../modal/order";
import ModalSideDish from "../modal/side-dish";
import classes from "./index.module.scss";

type MenuLayoutProps = {
  header: ReactNode;
  children: ReactNode;
};

const MenuLayout = ({ header, children }: MenuLayoutProps) => {
  const navigate = useNavigate();
  const [totals, setTotals] = useState<{ [key: string]: number }>({});
  const [openedCart, setOpenedCart] = useState(false);

  useEffect(() => {
    const listenStorageChange = () => setUpTotals();
    window.addEventListener(TOTALS, listenStorageChange);
    return () => window.removeEventListener(TOTALS, listenStorageChange);
  }, []);

  useEffect(() => {
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

  return (
    <>
      <ModalCart opened={openedCart} onClose={() => setOpenedCart(false)} />

      <ModalOrder opened={false} onClose={() => null} />

      <ModalSideDish opened={false} onClose={() => null} />

      <div className={classes.container}>
        <AppShell header={{ height: 80, offset: false }}>
          <AppShell.Header h="80px" bg="transparent" withBorder={false}>
            {header}
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
