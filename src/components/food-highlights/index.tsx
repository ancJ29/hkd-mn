import { Advertisement } from "@/types";
import { Box, ScrollArea } from "@mantine/core";
import classes from "./index.module.scss";
import FoodHighlightItem from "./item";
import Title from "./title";

type FoodHighlightProps = {
  foodAdvertisements: Advertisement[];
};

const FoodHighlight = ({ foodAdvertisements }: FoodHighlightProps) => {
  return (
    <>
      <Title value="-- MÓN NGON GỢI Ý --" />
      <ScrollArea type="auto" scrollbarSize={0}>
        <Box className={classes.box}>
          {foodAdvertisements?.map((e, i) => (
            <FoodHighlightItem key={i} foodAdvertisements={e} />
          ))}
        </Box>
      </ScrollArea>
    </>
  );
};

export default FoodHighlight;
