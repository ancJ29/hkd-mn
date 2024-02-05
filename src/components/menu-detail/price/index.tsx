import { Menu } from "@/types";
import { Text } from "@mantine/core";
import classes from "./index.module.scss";
import { formatCurrency } from "@/utils";

type PriceProps = {
  menuItem?: Menu;
};

const Price = ({ menuItem }: PriceProps) => {
  return (
    <div className={classes.detail}>
      <Text className={classes.name}>{menuItem?.name || ""}</Text>
      <Text className={classes.price}>
        {menuItem?.price ? formatCurrency(menuItem.price) : ""}
      </Text>
    </div>
  );
};

export default Price;
