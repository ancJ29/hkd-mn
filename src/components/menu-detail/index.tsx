import { Menu } from "@/types";
import { Box, Flex, Image } from "@mantine/core";
import classes from "./index.module.scss";
import MenuNavigation, { MenuAction } from "./menu-navigation";
import Price from "./price";
import QuantitySelector from "./quantity-selector";

type MenuDetailProps = {
  menuItem?: Menu;
  totals: {
    [key: string]: number;
  };
  onChange: (total: number) => void;
  onAction: (action: MenuAction) => void;
};

const MenuDetail = ({ menuItem, totals, onChange, onAction }: MenuDetailProps) => {
  const total = totals[menuItem?.id || "-"] || 0;

  return (
    <Box className={classes.container}>
      <Image src={menuItem?.image} h="100%" />
      <Box className={classes.detail}>
        <Flex className={classes.priceContainer}>
          <Price menuItem={menuItem} />
          <QuantitySelector total={total} onChange={onChange} />
        </Flex>
        <MenuNavigation onAction={onAction} totals={totals} />
      </Box>
    </Box>
  );
};

export default MenuDetail;
