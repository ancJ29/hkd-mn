import { Menu } from "@/types";
import { toLocaleString } from "@/utils";
import { Box, Flex, Image, Text } from "@mantine/core";
import MenuNavigation, { MenuAction } from "../menu-navigation";
import classes from "./index.module.css";

type MenuDetailProps = {
  menuItem?: Menu;
  total: number;
  onChange: (total: number) => void;
  onAction: (action: MenuAction) => void;
};

const MenuDetail = ({
  menuItem,
  total,
  onChange,
  onAction,
}: MenuDetailProps) => {
  return (
    <Box pt="4rem" pos={"relative"} style={{ flexGrow: 1 }}>
      <Image src={menuItem?.image} h="100%" />
      <Box pos="absolute" bottom={0} pb="2rem" w="100%">
        <Flex justify="space-between" align="center" pl="2.7rem" pr="1.3rem">
          <div className={classes.detail}>
            <Text c="white" className={classes.name}>
              {menuItem?.name || ""}
            </Text>
            <Text c="white" fz="5rem" className={classes.price}>
              {menuItem?.price
                ? toLocaleString(menuItem.price)
                : ""}
            </Text>
          </div>
          <Flex justify="space-between" align="center">
            <Box h={150}>
              <Image
                h={150}
                src={"/images/decrease.svg"}
                onClick={onChange.bind(null, Math.max(total - 1, 1))}
              />
            </Box>
            <Text c="white" fz="6rem" fw="700" ff="SourceSans3Black">
              {total}
            </Text>
            <Box h={150}>
              <Image
                h={150}
                src={"/images/increase.svg"}
                onClick={onChange.bind(null, total + 1)}
              />
            </Box>
        </Flex>

        </Flex>
        <MenuNavigation onAction={onAction} />
      </Box>
    </Box>
  );
};

export default MenuDetail;
