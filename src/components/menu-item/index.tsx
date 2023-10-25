/* eslint-disable no-console */
import { Menu } from "@/types";
import { Box, Image } from "@mantine/core";

type MenuItemProps = {
  menuItem: Menu;
  active?: boolean;
  onSelect?: (id: string) => void;
};

const MenuItem = ({ active, menuItem, onSelect }: MenuItemProps) => {
  return (
    <Box w='33vw' id={`menu-item.${menuItem.id}`}>
      <Image
        bg='#ddd'
        w='33.3vw'
        radius='md'
        style={{
          border: active ? "solid 4px #f00" : "solid 1px #7A7C7F",
          cursor: "pointer",
        }}
        onClick={() => onSelect && onSelect(menuItem.id)}
        src={menuItem.smallImage}
      />
    </Box>
  );
};

export default MenuItem;
