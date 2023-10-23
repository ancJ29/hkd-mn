import MenuItem from "@/components/menu-item";
import { Menu } from "@/types";
import { Box, ScrollArea } from "@mantine/core";

const boxStyle = {
  display: "grid",
  gridAutoFlow: "column",
  gridTemplateRows: "auto auto auto", // 3 row
  gridAutoColumns: "auto",
  gridGap: ".1rem",
};
type MenuListProps = {
  selectedMenuItemId: string;
  menuItems: Menu[];
  onSelect: (id: string) => void;
};

const MenuList = ({ selectedMenuItemId, menuItems, onSelect }: MenuListProps) => {
  return (
    <ScrollArea type='auto'>
      <Box style={boxStyle}>
        {menuItems.map((menuItem) => {
          return (
            <MenuItem
              key={menuItem.id}
              menuItem={menuItem}
              active={menuItem.id === selectedMenuItemId}
              onSelect={onSelect}
            />
          );
        })}
      </Box>
    </ScrollArea>
  );
};

export default MenuList;
