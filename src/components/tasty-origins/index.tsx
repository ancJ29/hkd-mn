import { Advertisement } from "@/types";
import { Box, ScrollArea } from "@mantine/core";
import Title from "../food-highlights/title";
import TastyOriginsItem from "./Item";
import classes from "./index.module.scss";

type TastyOriginsProps = {
  materialAdvertisement: Advertisement[];
};

const TastyOrigins = ({ materialAdvertisement }: TastyOriginsProps) => {
  return (
    <>
      <Title value="-- BẠN ĐÃ BIẾT ? --" />
      <ScrollArea type="auto" scrollbarSize={0}>
        <Box className={classes.box}>
          {materialAdvertisement?.map((e, i) => (
            <TastyOriginsItem key={i} materialAdvertisement={e} />
          ))}
        </Box>
      </ScrollArea>
    </>
  );
};

export default TastyOrigins;
