/* eslint-disable no-console */
import { Menu } from "@/types";
import { Box, Image } from "@mantine/core";
import { useMemo } from "react";

type MenuItemProps = {
  menuItem: Menu;
  active?: boolean;
  onSelect?: (id: string) => void;
};

const MenuItem = ({ active, menuItem, onSelect }: MenuItemProps) => {
  const src = useMemo(() => {
    if (!menuItem.categoryId) {
      return "";
    }
    if (menuItem.base64SmallImage) {
      return `data:image/png;base64,${menuItem.base64SmallImage}`;
    }
    return menuItem.smallImage || "http://via.placeholder.com/356x262";
  }, [menuItem]);
  return (
    <Box w='33vw' id={`menu-item.${menuItem.id}`}>
      <Image
        bg='#ddd'
        w='33vw'
        style={{
          border: src ? (active ? "solid 2px #f00" : "solid 1px #7A7C7F") : "none",
          cursor: "pointer",
        }}
        onClick={() => onSelect && onSelect(menuItem.id)}
        src={src}
      />
    </Box>
  );
};

export default MenuItem;
