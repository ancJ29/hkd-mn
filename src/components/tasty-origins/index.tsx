import Title from "@/components/food-highlights/title";
import TastyOriginsItem from "@/components/tasty-origins/tasty-origins-item";
import useTranslation from "@/hooks/useTranslation";
import { Advertisement } from "@/types";
import { Box, ScrollArea } from "@mantine/core";
import classes from "./index.module.scss";

type TastyOriginsProps = {
  materialAdvertisement: Advertisement[];
};

const TastyOrigins = ({ materialAdvertisement }: TastyOriginsProps) => {
  const t = useTranslation();

  return (
    <div className={classes.container}>
      <Title value={t("Do you know?")} />
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
