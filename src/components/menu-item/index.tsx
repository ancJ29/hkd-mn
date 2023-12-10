import { Menu } from "@/types";
import { Box, Image, Text } from "@mantine/core";
import classes from "./index.module.css";

type MenuItemProps = {
  menuItem: Menu;
  active?: boolean;
  onSelect: (item: Menu) => void;
};

const MenuItem = ({ active, menuItem, onSelect }: MenuItemProps) => {
  // console.log(`render MenuItem ${menuItem.id}...`);
  return (
    <Box w='31.3vw' id={`menu-item.${menuItem.id}`}>
      <Image
        w='31.3vw'
        className={[classes.container, active ? classes.active : ""].join(" ")}
        onClick={() => onSelect(menuItem)}
        src={menuItem.smallImage}
      />

      <Text c='white' ml={20} mt={5} fz={"1.5rem"}>
        {menuItem.name}
      </Text>
    </Box>
  );
};

export default MenuItem;
