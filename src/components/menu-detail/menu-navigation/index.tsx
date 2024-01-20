import { Flex, Image, Indicator, Text } from "@mantine/core";
import { memo, useMemo } from "react";
import classes from "./index.module.scss";

export enum MenuAction {
  MENU = "MENU",
  EXPLORE = "EXPLORE",
  CART = "CART",
  HISTORY = "HISTORY",
}

type MenuNavigationProps = {
  totals: {
    [key: string]: number;
  };
  onAction: (action: MenuAction) => void;
};

const MenuNavigation = memo(
  ({ totals, onAction }: MenuNavigationProps) => {
    let total = 0;
    Object.keys(totals).forEach((key) => {
      total += totals[key];
    });

    const label = useMemo(() => <Text className={classes.text}>{total}</Text>, [total]);
    return (
      <Flex className={classes.container} justify={"space-between"} align={"center"}>
        <div />
        <Image
          h={40}
          className={classes.icon}
          src="/images/tab/menu.svg"
          onClick={onAction.bind(null, MenuAction.MENU)}
        />
        <Image
          h={40}
          className={classes.icon}
          src="/images/tab/explore.svg"
          onClick={onAction.bind(null, MenuAction.EXPLORE)}
        />
        <Indicator offset={10} label={label} color="#f21825" size={16} disabled={total < 1}>
          <Image
            w={40}
            className={classes.icon}
            src="/images/tab/cart.svg"
            onClick={onAction.bind(null, MenuAction.CART)}
          />
        </Indicator>
        <Image
          h={40}
          className={classes.icon}
          src="/images/tab/history.svg"
          onClick={onAction.bind(null, MenuAction.HISTORY)}
        />
        <div />
      </Flex>
    );
  },
  (oldProps: MenuNavigationProps, newProps: MenuNavigationProps) => {
    if (oldProps.totals !== newProps.totals) {
      return false;
    }
    return oldProps.onAction === newProps.onAction;
  },
);

MenuNavigation.displayName = "MenuNavigation";
export default MenuNavigation;
