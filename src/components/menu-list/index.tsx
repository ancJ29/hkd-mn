import MenuItem from "@/components/menu-item";
import { Menu } from "@/types";
import { Box, ScrollArea } from "@mantine/core";
import { useRef } from "react";

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
  onIntersect?: (id: string, prevId: string) => void;
};

const MenuList = ({ selectedMenuItemId, menuItems, onSelect, onIntersect }: MenuListProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <ScrollArea scrollbarSize={0} type='auto' ref={containerRef}>
      <Box style={boxStyle}>
        {menuItems.map((menuItem, index) => {
          return (
            <MenuItem
              containerRef={containerRef}
              prevCategoryId={menuItems[index - 1]?.categoryId || ""}
              nextCategoryId={menuItems[index + 1]?.categoryId || ""}
              key={menuItem.id}
              menuItem={menuItem}
              active={menuItem.id === selectedMenuItemId}
              onSelect={onSelect}
              onIntersect={onIntersect}
            />
          );
        })}
      </Box>
    </ScrollArea>
  );
};

export default MenuList;
