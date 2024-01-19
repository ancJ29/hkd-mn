import { Text } from "@mantine/core";
import classes from "./index.module.css";

const TableHeader = () => {
  return (
    <div className={classes.container}>
      <Text className={classes.name}>Tên món</Text>
      <Text className={classes.quantity}>Số lượng</Text>
      <Text className={classes.price}>Thành tiền (vnd)</Text>
    </div>
  );
};

export default TableHeader;
