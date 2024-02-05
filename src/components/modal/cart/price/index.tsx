import { Menu } from "@/types";
import { formatCurrency } from "@/utils";
import { Text } from "@mantine/core";
import classes from "./index.module.scss";

type PriceProps = {
  cart?: Menu[];
};

const TOTAL = 1240000;

const Price = ({ cart }: PriceProps) => {
  const total = cart?.reduce((acc, item) => {
    const itemTotal = (item.quantity || 0) * item.price;
    return acc + itemTotal;
  }, 0) || TOTAL;

  return (
    <div className={classes.container}>
      <div className={classes.grid}>
        <Text className={classes.textPrice}>Thành tiền:</Text>
        <Text className={classes.price}>{formatCurrency(total)}</Text>
      </div>

      <div className={classes.grid}>
        <Text className={classes.textPrice}>VAT:</Text>
        <Text className={classes.price}>{formatCurrency(total * 0.1)}</Text>
      </div>

      <div className={classes.grid}>
        <Text className={classes.textPrice}>Tổng thành tiền (vnd):</Text>
        <Text className={[classes.price, classes.red].join(" ")}>
          {formatCurrency(total * 1.1)}
        </Text>
      </div>
    </div>
  );
};

export default Price;
