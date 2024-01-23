import GreenButton from "@/components/green-button";
import { Text } from "@mantine/core";
import classes from "./index.module.scss";

type DishItemProps = {
  onButtonClick: () => void;
};

const DishItem = ({ onButtonClick }: DishItemProps) => {
  return (
    <div className={classes.container}>
      <Text className={classes.text}>Hirame Sashimi</Text>
      <Text className={classes.total}>+0</Text>

      <GreenButton onClick={onButtonClick} />
    </div>
  );
};

export default DishItem;
