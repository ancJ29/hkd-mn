import config from "@/configs/custom";
import { Menu } from "@/types";
import { Box, Image, Text } from "@mantine/core";
import { useMemo } from "react";
const MenuDetail = ({ menuItem }: { menuItem?: Menu }) => {
  const imageUrl = useMemo(() => {
    const debug = true;
    if (debug) {
      return "/images/sample.jpeg";
    }
    if (menuItem?.image) {
      return menuItem.image;
    }
    if (menuItem?.base64SmallImage) {
      return `data:image/png;base64,${menuItem.base64SmallImage}`;
    }
    return "";
  }, [menuItem]);
  return (
    <Box w="100%" h="100%">
      <Image
        my='auto'
        h="100%"
        src={imageUrl}
        fallbackSrc='http://via.placeholder.com/712x524'
      />
      <Box pos="sticky" bottom={0} p=".3rem">
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Text style={config.menuDetail.name}>
            {menuItem?.foreignName}
            <br />
            {menuItem?.name}
          </Text>
          <Text style={config.menuDetail.price}>{menuItem?.price?.toLocaleString().replace(/,/g, ".")}đ</Text>
        </div>
      </Box>
    </Box>
  );
};

export default MenuDetail;
