import config from "@/configs/custom";
import { Menu } from "@/types";
import { Image, Text } from "@mantine/core";
import { useMemo } from "react";
const MenuDetail = ({ menuItem }: { menuItem?: Menu }) => {
  const imageUrl = useMemo(() => {
    if (menuItem?.image) {
      return menuItem.image;
    }
    if (menuItem?.base64SmallImage) {
      return `data:image/png;base64,${menuItem.base64SmallImage}`;
    }
    return "";
  }, [menuItem]);
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        overflow: "scroll",
        position: "relative",
        padding: "2px",
        // display: "flex",
        // flexDirection: "column",
        // alignItems: "center",
        // justifyContent: "center",
      }}
    >
      <Image my='auto' src={imageUrl} fallbackSrc='http://via.placeholder.com/712x524' />
      <div style={{ position: "sticky", bottom: "0", padding: ".3rem" }}>
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
