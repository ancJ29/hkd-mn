import LanguageFlag from "@/components/language-flag";
import MenuNavigation, { MenuAction } from "@/components/menu-layout/menu-navigation";
import ModalCart from "@/components/modal/cart";
import ModalHistoryOrder from "@/components/modal/history-order";
import ModalOrder from "@/components/modal/order";
import ModalSideDish from "@/components/modal/side-dish";
import useLoading from "@/hooks/useLoading";
import { parseJSON } from "@/utils";
import { TOTALS } from "@/utils/constant";
import { AppShell } from "@mantine/core";
import { ReactNode, useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Error from "../error";
import classes from "./index.module.scss";

type MenuLayoutProps = {
  header: ReactNode;
  children: ReactNode;
  isError: boolean;
};

const MenuLayout = ({ header, children, isError }: MenuLayoutProps) => {
  const navigate = useNavigate();
  const [totals, setTotals] = useState<{ [key: string]: number }>({});
  const { loading, toggleLoading } = useLoading({
    isOpenedCart: false,
    isOpenedHistoryOrder: false,
    isOpenedOrder: false,
    isOpenedSideDish: false,
  });

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
      toggleLoading("isOpenedCart");
      break;
    }
    case MenuAction.HISTORY: {
      toggleLoading("isOpenedHistoryOrder");
      break;
    }
    }
  }, []);

  return !isError ? (
    <>
      <ModalCart
        opened={loading.isOpenedCart}
        onClose={() => toggleLoading("isOpenedCart")}
      />

      <ModalOrder opened={loading.isOpenedOrder} onClose={() => null} />

      <ModalSideDish opened={loading.isOpenedSideDish} onClose={() => null} />

      <ModalHistoryOrder
        opened={loading.isOpenedHistoryOrder}
        onClose={() => toggleLoading("isOpenedHistoryOrder")}
      />

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
  ) : (
    <Error />
  );
};

export default MenuLayout;
