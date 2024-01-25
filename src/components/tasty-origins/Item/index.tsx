import { Advertisement } from "@/types";
import { Image } from "@mantine/core";
import classes from "./index.module.scss";

type TastyOriginsItemProps = {
  materialAdvertisement: Advertisement;
};

const TastyOriginsItem = ({ materialAdvertisement }: TastyOriginsItemProps) => {
  return (
    <Image
      w="auto"
      h="20vh"
      fit="contain"
      className={classes.image}
      src={materialAdvertisement.image}
    />
  );
};

export default TastyOriginsItem;
