import config from "@/configs/custom";
import { Menu } from "@/types";
import { Image, Text } from "@mantine/core";
const MenuDetail = ({ menuItem }: { menuItem?: Menu }) => {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        overflow: "scroll",
        position: "relative",
        // display: "flex",
        // flexDirection: "column",
        // alignItems: "center",
        // justifyContent: "center",
      }}
    >
      <Image my='auto' src={menuItem?.image} fallbackSrc='http://via.placeholder.com/712x524' />
      <div style={{ position: "sticky", bottom: "0" }}>
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
      </div>
    </div>
  );
};

export default MenuDetail;
