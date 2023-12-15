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
  total?: number;
  onAction: (action: MenuAction) => void;
};

const MenuNavigation = memo(
  ({ total = 0, onAction }: MenuNavigationProps) => {
    console.log("render MenuNavigation");
    const label = useMemo(() => <Text fz="2rem">{total}</Text>, [total]);
    return (
      <Flex
        className={classes.container}
        justify={"space-between"}
        align={"center"}
      >
        <div />
        <Image
          className={classes.icon}
          src="/images/menu.svg"
          onClick={onAction.bind(null, MenuAction.MENU)}
        />
        <Image
          className={classes.icon}
          src="/images/explore.svg"
          onClick={onAction.bind(null, MenuAction.EXPLORE)}
        />
        <Indicator
          offset={20}
          label={label}
          color="red"
          size={60}
          disabled={total < 1}
        >
          <Image
            className={classes.icon}
            src="/images/cart.svg"
            onClick={onAction.bind(null, MenuAction.CART)}
          />
        </Indicator>
        <Image
          className={classes.icon}
          src="/images/history.svg"
          onClick={onAction.bind(null, MenuAction.HISTORY)}
        />
        <div />
      </Flex>
    );
  },
  (oldProps: MenuNavigationProps, newProps: MenuNavigationProps) => {
    if (oldProps.total !== newProps.total) {
      return false;
    }
    return oldProps.onAction === newProps.onAction;
  },
);

export default MenuNavigation;
