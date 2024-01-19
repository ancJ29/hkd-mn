import { Menu } from "@/types";
import { toLocaleString } from "@/utils";
import { Box, Flex, Image, Text } from "@mantine/core";
import MenuNavigation, { MenuAction } from "../menu-navigation";
import QuantitySelector from "../quantity-selector";
import classes from "./index.module.css";

type MenuDetailProps = {
  menuItem?: Menu;
  totals: {
    [key: string]: number;
  };
  onChange: (total: number) => void;
  onAction: (action: MenuAction) => void;
};

const MenuDetail = ({
  menuItem,
  totals,
  onChange,
  onAction,
}: MenuDetailProps) => {
  const total = totals[menuItem?.id || "-"] || 0;

  return (
    <Box pt="1.5rem" pos={"relative"} className={classes.container}>
      <Image src={menuItem?.image} h="100%" />
      <Box pos="absolute" bottom={0} pb="1rem" w="100%">
        <Flex justify="space-between" align="center" pl="2.7rem" pr="1.3rem">
          <div className={classes.detail}>
            <Text c="white" className={classes.name}>
              {menuItem?.name || ""}
            </Text>
            <Text c="white" fz="4rem" className={classes.price}>
              {menuItem?.price ? toLocaleString(menuItem.price) : ""}
            </Text>
          </div>

          <QuantitySelector total={total} onChange={onChange} />
        </Flex>
        <MenuNavigation onAction={onAction} totals={totals} />
      </Box>
    </Box>
  );
};

export default MenuDetail;
