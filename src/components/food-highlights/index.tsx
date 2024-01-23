import { Box, ScrollArea } from "@mantine/core";
import classes from "./index.module.scss";
import FoodHighlightItem from "./item";
import Title from "./title";

const FoodHighlight = () => {
  return (
    <>
      <Title value="-- MÓN NGON GỢI Ý --" />
      <ScrollArea type="auto" scrollbarSize={0} className={classes.container}>
        <Box className={classes.box}>
          {[...Array(10).keys()].map((_, index) => (
            <FoodHighlightItem key={index} />
          ))}
        </Box>
      </ScrollArea>
    </>
  );
};

export default FoodHighlight;
