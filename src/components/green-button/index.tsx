import { Button, Text } from "@mantine/core";
import classes from "./index.module.scss";

type GreenButtonProps = {
  onClick?: () => void;
};

const GreenButton = ({ onClick }: GreenButtonProps) => {
  return (
    <Button className={classes.button} onClick={onClick}>
      <Text className={classes.textButton}>
        <a>追加 | </a>
        <a className={classes.italic}>Chọn</a>
      </Text>
    </Button>
  );
};

export default GreenButton;
