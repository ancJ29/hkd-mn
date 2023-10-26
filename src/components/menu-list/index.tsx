/* eslint-disable no-console */
import MenuItem from "@/components/menu-item";
import { Menu } from "@/types";
import { Box, ScrollArea } from "@mantine/core";
import { useCallback, useState } from "react";
import Arrow from "./arrow";

const boxStyle = {
  display: "grid",
  gridAutoFlow: "column",
  gridTemplateRows: "auto auto auto", // 3 row
  gridAutoColumns: "auto",
  gridGap: ".1rem",
};
type MenuListProps = {
  page: number;
  lastPage: number;
  selectedMenuItemId: string;
  menuItems: Menu[];
  onScrollToColumn: (column: number) => void;
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
  onScrollToColumn,
  onSelect,
}: MenuListProps) => {
  const [x, setX] = useState(0);
  const onScrollPositionChange = useCallback(
    (scrollPosition: { x: number }) => {
      if (Math.abs(scrollPosition.x - x) < 100) {
        return;
      }
      onScrollToColumn(Math.ceil((scrollPosition.x * 3) / window.innerWidth) + 1);
      setX(scrollPosition.x);
    },
    [onScrollToColumn, x],
  );
  return (
    <Box style={{ position: "relative" }}>
      <ScrollArea type='auto' scrollbarSize={0} onScrollPositionChange={onScrollPositionChange}>
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
