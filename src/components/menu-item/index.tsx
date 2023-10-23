import { Menu } from "@/types";
import { Image } from "@mantine/core";

type MenuItemProps = {
  menuItem: Menu;
  active?: boolean;
  onSelect?: (id: string) => void;
};

const MenuItem = ({ active, menuItem, onSelect }: MenuItemProps) => {
  return (
    <div id={`menu-item.${menuItem.id}`}>
      <Image
        bg='#ddd'
        w='32vw'
        radius='md'
        style={{
          border: active ? "solid 4px #f00" : "none",
          cursor: "pointer",
        }}
        onClick={() => onSelect && onSelect(menuItem.id)}
        src={menuItem.smallImage}
      />
    </div>
  );
};

export default MenuItem;
