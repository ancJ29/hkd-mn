import Title from "@/components/food-highlights/title";
import TastyOriginsItem from "@/components/tasty-origins/menu-item";
import { Advertisement } from "@/types";
import { Box, ScrollArea } from "@mantine/core";
import classes from "./index.module.scss";

type TastyOriginsProps = {
  materialAdvertisement: Advertisement[];
};

const TastyOrigins = ({ materialAdvertisement }: TastyOriginsProps) => {
  return (
    <div className={classes.container}>
      <Title value="Bạn đã biết?" />
      <ScrollArea type="auto" scrollbarSize={0}>
        <Box className={classes.box}>
          {materialAdvertisement?.map((e, i) => (
            <TastyOriginsItem key={i} materialAdvertisement={e} />
          ))}
        </Box>
      </ScrollArea>
    </div>
  );
};

export default TastyOrigins;
