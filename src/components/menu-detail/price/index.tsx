import { Menu } from "@/types";
import { toLocaleString } from "@/utils";
import { Text } from "@mantine/core";
import classes from "./index.module.scss";

type PriceProps = {
  menuItem?: Menu;
};

const Price = ({ menuItem }: PriceProps) => {
  return (
    <div className={classes.detail}>
      <Text className={classes.name}>{menuItem?.name || ""}</Text>
      <Text className={classes.price}>
        {menuItem?.price ? toLocaleString(menuItem.price) : ""}
      </Text>
    </div>
  );
};

export default Price;
