import { Box, ScrollArea } from "@mantine/core";
import Title from "../food-highlights/title";
import TastyOriginsItem from "./Item";
import classes from "./index.module.scss";

const TastyOrigins = () => {
  return (
    <>
      <Title value="-- MÓN NGON GỢI Ý --" />
      <ScrollArea type="auto" scrollbarSize={0} className={classes.container}>
        <Box className={classes.box}>
          {[...Array(10).keys()].map((_, index) => (
            <TastyOriginsItem key={index} />
          ))}
        </Box>
      </ScrollArea>
    </>
  );
};

export default TastyOrigins;
