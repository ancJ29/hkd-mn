import { Text } from "@mantine/core";
import classes from "./index.module.scss";

const Price = () => {
  return (
    <div className={classes.container}>
      <div className={classes.grid}>
        <Text className={classes.textPrice}>Thành tiền:</Text>
        <Text className={classes.price}>1,110,000</Text>
      </div>

      <div className={classes.grid}>
        <Text className={classes.textPrice}>VAT:</Text>
        <Text className={classes.price}>111,000</Text>
      </div>

      <div className={classes.grid}>
        <Text className={classes.textPrice}>Tổng thành tiền (vnd):</Text>
        <Text className={[classes.price, classes.red].join(" ")}>1,221,000</Text>
      </div>
    </div>
  );
};

export default Price;
