import config from "@/configs/custom";
import { Menu } from "@/types";
import { Image, Paper, Text } from "@mantine/core";
const MenuDetail = ({ menuItem }: { menuItem?: Menu }) => {
  return (
    <Paper
      style={{
        position: "relative",
      }}
    >
      <Image mt='4px' src={menuItem?.image} />
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
        style={{
          position: "absolute",
          bottom: "4px",
          right: "4px",
          ...config.menuDetail.price,
        }}
        c={"white"}
      >
        {menuItem?.price?.toLocaleString().replace(/,/g, ".")}
      </Text>
    </Paper>
  );
};

export default MenuDetail;
