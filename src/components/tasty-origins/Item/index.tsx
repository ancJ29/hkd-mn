import { Advertisement } from "@/types";
import { Image } from "@mantine/core";
import classes from "./index.module.scss";

type TastyOriginsItemProps = {
  materialAdvertisement: Advertisement;
};

const TastyOriginsItem = ({ materialAdvertisement }: TastyOriginsItemProps) => {
  return <Image className={classes.image} src={materialAdvertisement.image} />;
};

export default TastyOriginsItem;
