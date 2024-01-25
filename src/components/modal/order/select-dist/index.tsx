import { Image, Text } from "@mantine/core";
import classes from "./index.module.scss";

type SelectDishProps = {
  isAvailable: boolean;
  onOpenModalSelectReplaceDish: () => void;
};

const SelectDish = ({ isAvailable, onOpenModalSelectReplaceDish }: SelectDishProps) => {
  return (
    <div className={classes.selectFoodContainer}>
      <Text
        className={[classes.foodText, isAvailable ? "" : classes.unAvailable].join(" ")}
      >
        Hotate Sashimi
      </Text>

      <Image
        w="30"
        src={`/images/${isAvailable ? "available" : "un_available"}.svg`}
        className={classes.image}
        onClick={onOpenModalSelectReplaceDish}
      />
    </div>
  );
};

export default SelectDish;
