import { Flex, Image, Indicator, Text } from "@mantine/core";
import { memo, useMemo } from "react";
import classes from "./index.module.css";

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
    console.log("render MenuNavigation");

    let total = 0;
    Object.keys(totals).forEach((key) => {
      total += totals[key];
    });

    const label = useMemo(() => <Text fz='1rem'>{total}</Text>, [total]);
    return (
      <Flex
        className={classes.container}
        justify={"space-between"}
        align={"center"}
      >
        <div />
        <Image
          className={classes.icon}
          src='/images/menu.svg'
          onClick={onAction.bind(null, MenuAction.MENU)}
        />
        <Image
          className={classes.icon}
          src='/images/explore.svg'
          onClick={onAction.bind(null, MenuAction.EXPLORE)}
        />
        <Indicator
          offset={26}
          label={label}
          color='red'
          size={26}
          disabled={total < 1}
        >
          <Image
            className={classes.icon}
            src='/images/cart.svg'
            onClick={onAction.bind(null, MenuAction.CART)}
          />
        </Indicator>
        <Image
          className={classes.icon}
          src='/images/history.svg'
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

export default MenuNavigation;
