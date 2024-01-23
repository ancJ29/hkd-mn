import { Text } from "@mantine/core";
import classes from "./index.module.scss";

const AvailableText = () => {
  const content = "Bạn đã chọn món thay thế thành công! Vui lòng xác nhận món.";
  return <Text className={classes.content}>{content}</Text>;
};

export default AvailableText;
