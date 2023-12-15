import { Menu } from "@/types";
import { Box, Image, Text } from "@mantine/core";
import classes from "./index.module.css";

type MenuItemProps = {
  menuItem: Menu;
  active?: boolean;
  onSelect: (item: Menu) => void;
};

const MenuItem = ({ active, menuItem, onSelect }: MenuItemProps) => {
  return (
    <Box w="30vw" id={`menu-item.${menuItem.id}`} className={classes.container}>
      <div
        className={[classes.imageContainer, active ? classes.active : ""].join(
          " ",
        )}
      >
        <Image
          w="30vw"
          className={classes.image}
          onClick={() => onSelect(menuItem)}
          src={menuItem.smallImage}
        />
      </div>

      <Text c="white" ml={20} mt={5} fz={"1.5rem"} ff="MyriadProLight">
        {menuItem.name}
      </Text>
    </Box>
  );
};

export default MenuItem;
