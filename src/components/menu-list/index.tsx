/* eslint-disable no-console */
import MenuItem from "@/components/menu-item";
import { Menu } from "@/types";
import { Box, ScrollArea } from "@mantine/core";
import Arrow from "./arrow";

const boxStyle = {
  display: "grid",
  gridAutoFlow: "column",
  gridTemplateRows: "auto auto auto", // 3 row
  gridAutoColumns: "auto",
  gridGap: ".3rem",
};
type MenuListProps = {
  page: number;
  lastPage: number;
  selectedMenuItemId: string;
  menuItems: Menu[];
  onPrevPage: () => void;
  onNextPage: () => void;
  onSelect: (id: string) => void;
};

const MenuList = ({
  selectedMenuItemId,
  menuItems,
  page,
  lastPage,
  onPrevPage,
  onNextPage,
  onSelect,
}: MenuListProps) => {
  return (
    <Box style={{ position: "relative", padding: ".1rem" }}>
      <ScrollArea type='auto' scrollbarSize={0}>
        <Box style={boxStyle}>
          {page > 1 && <Arrow direction='left' onClick={onPrevPage} />}
          {page < lastPage && <Arrow direction='right' onClick={onNextPage} />}
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
    </Box>
  );
};

export default MenuList;
