import { Image } from "@mantine/core";
import classes from "./index.module.scss";

const FoodHighlightItem = () => {
  return <Image h={100} className={classes.image} src="/images/recommend_food.png" />;
};

export default FoodHighlightItem;
