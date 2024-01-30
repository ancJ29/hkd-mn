import { Menu } from "@/types";
import { Box, Flex, Image, Skeleton, Text } from "@mantine/core";
import { useState } from "react";
import classes from "./index.module.scss";

type MenuItemProps = {
  menuItem: Menu;
  active?: boolean;
  onSelect: (item: Menu) => void;
};

const MenuItem = ({ active, menuItem, onSelect }: MenuItemProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const handleLoadingImage = () => {
    setIsLoading(false);
  };

  return (
    <Box w="32vw" className={classes.container}>
      <Flex className={[classes.imageContainer, active ? classes.active : ""].join(" ")}>
        <Skeleton visible={isLoading} className={classes.skeleton}>
          <Image
            h="9.45vh"
            className={classes.image}
            onClick={() => onSelect(menuItem)}
            src={menuItem.smallImage}
            loading="lazy"
            onLoad={handleLoadingImage}
          />
        </Skeleton>
      </Flex>

      <Text c="white" ml={12} fz="10px">
        {menuItem.name}
      </Text>
    </Box>
  );
};

export default MenuItem;
