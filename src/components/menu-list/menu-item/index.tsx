import { Menu } from "@/types";
import { Box, Flex, Image, Text } from "@mantine/core";
import classes from "./index.module.scss";

type MenuItemProps = {
  menuItem: Menu;
  active?: boolean;
  onSelect: (item: Menu) => void;
};

const MenuItem = ({ active, menuItem, onSelect }: MenuItemProps) => {
  return (
    <Box w="32vw" className={classes.container}>
      <Flex className={[classes.imageContainer, active ? classes.active : ""].join(" ")}>
        <Image
          className={classes.image}
          onClick={() => onSelect(menuItem)}
          src={menuItem.smallImage}
          loading="lazy"
        />
      </Flex>

      <Text c="white" ml={12} fz="10px">
        {menuItem.name}
      </Text>
    </Box>
  );
};

export default MenuItem;
