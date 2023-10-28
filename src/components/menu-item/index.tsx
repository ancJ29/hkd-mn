/* eslint-disable no-console */
import { Menu } from "@/types";
import { Box, Image } from "@mantine/core";
import { useEffect, useMemo, useRef } from "react";

type MenuItemProps = {
  menuItem: Menu;
  active?: boolean;
  isScrollTarget?: boolean;
  onSelect?: (id: string) => void;
};

const MenuItem = ({ active, menuItem, isScrollTarget, onSelect }: MenuItemProps) => {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    isScrollTarget && ref.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
      inline: "nearest",
    });
  }, [isScrollTarget]);

  const src = useMemo(() => {
    if (!menuItem.categoryId) {
      return "";
    }
    if (menuItem.base64SmallImage) {
      return `data:image/png;base64,${menuItem.smallImage}`;
    }
    return menuItem.smallImage || "http://via.placeholder.com/356x262";
  }, [menuItem]);
  return (
    <Box w='33vw' id={`menu-item.${menuItem.id}`} ref={ref}>
      <Image
        bg='#ddd'
        w='33.3vw'
        radius='md'
        style={{
          border: src ? (active ? "solid 4px #f00" : "solid 1px #7A7C7F") : "none",
          cursor: "pointer",
        }}
        onClick={() => onSelect && onSelect(menuItem.id)}
        src={src}
      />
    </Box>
  );
};

export default MenuItem;
