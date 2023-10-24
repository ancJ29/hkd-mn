import config from "@/configs/custom";
import { Menu } from "@/types";
import { Image, Paper, Text } from "@mantine/core";
const MenuDetail = ({ menuItem }: { menuItem?: Menu }) => {
  return (
    <Paper bg='transparent' style={{ position: "relative" }}>
      <Image mt='4px' h={"25vh"} src={menuItem?.image} />
      <Text
        style={{
          position: "absolute",
          bottom: "4px",
          ...config.menuDetail.name,
        }}
        c={"white"}
      >
        {menuItem?.foreignName}
        <br />
        {menuItem?.name}
      </Text>
      <Text
        mr={4}
        style={{
          position: "absolute",
          bottom: "4px",
          right: "4px",
          ...config.menuDetail.price,
        }}
        c={"white"}
      >
        {menuItem?.price?.toLocaleString().replace(/,/g, ".")}đ
      </Text>
    </Paper>
  );
};

export default MenuDetail;