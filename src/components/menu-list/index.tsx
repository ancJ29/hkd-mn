import MenuItem from "@/components/menu-item";
import { Menu } from "@/types";
import { Box, ScrollArea } from "@mantine/core";
import classes from "./index.module.css";

type MenuListProps = {
  selectedMenuItem?: Menu;
  menuItems: Menu[];
  onSelect: (item: Menu) => void;
};

const MenuList = ({ selectedMenuItem, menuItems, onSelect }: MenuListProps) => {
  console.log("render MenuList...");
  return (
    <Box className={classes.container}>
      <ScrollArea type="auto" scrollbarSize={0}>
        <Box className={classes.box}>
          {menuItems.map((menuItem) => {
            return (
              <MenuItem
                key={menuItem.id}
                menuItem={menuItem}
                active={menuItem.id === selectedMenuItem?.id}
                onSelect={onSelect}
              />
            );
          })}
        </Box>
      </ScrollArea>
    </Box>
  );
};

export default MenuList;
