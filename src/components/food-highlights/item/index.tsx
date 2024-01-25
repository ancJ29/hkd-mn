import { Advertisement } from "@/types";
import { Image } from "@mantine/core";
import classes from "./index.module.scss";

type FoodHighlightItemProps = {
  foodAdvertisements: Advertisement;
};

const FoodHighlightItem = ({ foodAdvertisements }: FoodHighlightItemProps) => {
  return (
    <Image
      h="10vh"
      w="auto"
      fit="contain"
      className={classes.image}
      src={foodAdvertisements.image}
    />
  );
};

export default FoodHighlightItem;
