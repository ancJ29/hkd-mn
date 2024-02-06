import MenuItem from "@/components/menu-list/menu-item";
import { Menu } from "@/types";
import { Box } from "@mantine/core";
import classes from "./index.module.scss";

type MenuListProps = {
  selectedMenuItem?: Menu;
  menuItems: Menu[];
  onSelect: (item: Menu) => void;
  menuRef: React.RefObject<HTMLDivElement>;
  onScroll: () => void;
};

const MenuList = ({
  selectedMenuItem,
  menuItems,
  onSelect,
  menuRef,
  onScroll,
}: MenuListProps) => {
  return (
    <Box className={classes.container}>
      <Box className={classes.box} ref={menuRef} onScroll={onScroll}>
        {menuItems?.map((menuItem) => {
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
    </Box>
  );
};

export default MenuList;
