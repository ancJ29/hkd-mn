import { Text, Textarea } from "@mantine/core";
import classes from "./index.module.css";

const SpecialRequirements = () => {
  return (
    <div className={classes.container}>
      <Text className={classes.text}>*Yêu cầu đặc biệt:</Text>

      <Textarea
        placeholder="Sashimi lên trước, món tráng miệng lên sau cùng..."
        autosize
        minRows={3}
        maxRows={3}
        radius={10}
        size="xl"
      />
    </div>
  );
};

export default SpecialRequirements;
