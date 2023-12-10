import { Menu } from "@/types";
import { Box, Flex, Image, Text } from "@mantine/core";

type MenuDetailProps = {
  menuItem?: Menu;
  total: number;
  onChange: (total: number) => void;
};

const MenuDetail = ({ menuItem, total, onChange }: MenuDetailProps) => {
  return (
    <Box py='2rem' pos={"relative"}>
      <Image src={menuItem?.image} />
      <Box pos='absolute' bottom={0} pb='2rem' px='2.5rem' w='100%'>
        <Flex justify='space-between' align='center'>
          <Text c='white' fz='5rem' fw='500'>
            <span style={{ fontSize: "3rem" }}>{menuItem?.name || ""}</span>
            <br />
            <span>
              {menuItem?.price
                ? menuItem.price.toLocaleString("vi-Vi", {
                    style: "currency",
                    currency: "VND",
                  })
                : ""}
            </span>
          </Text>
          <Flex justify='space-between' align='center'>
            <Image
              h={150}
              src={"/images/decrease.svg"}
              onClick={onChange.bind(null, Math.max(total - 1, 1))}
            />
            <Text c='white' fz='6rem' fw='500'>
              {total}
            </Text>
            <Image
              h={150}
              src={"/images/increase.svg"}
              onClick={onChange.bind(null, total + 1)}
            />
          </Flex>
        </Flex>
      </Box>
    </Box>
  );
};

export default MenuDetail;
