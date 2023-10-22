import { Menu } from "@/types";
import { Image } from "@mantine/core";

type MenuItemProps = {
  menuItem: Menu;
  active?: boolean;
  onSelect?: (id: string) => void;
};

const MenuItem = ({ active, menuItem, onSelect }: MenuItemProps) => {
  return (
    <Image
      bg='#ddd'
      w='30vw'
      h='30vw'
      radius='md'
      style={{
        border: active ? "solid 4px #f00" : "none",
        cursor: "pointer",
      }}
      onClick={() => onSelect && onSelect(menuItem.id)}
      src={menuItem.smallImage}
    />
  );
};

export default MenuItem;
