import FoodHighlightItem from "@/components/food-highlights/item";
import Title from "@/components/food-highlights/title";
import useTranslation from "@/hooks/useTranslation";
import { Advertisement } from "@/types";
import { Box, ScrollArea } from "@mantine/core";
import classes from "./index.module.scss";

type FoodHighlightProps = {
  foodAdvertisements: Advertisement[];
};

const FoodHighlight = ({ foodAdvertisements }: FoodHighlightProps) => {
  const t = useTranslation();

  return (
    <>
      <Title value={t("Suggested delicious dishes")} />
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
