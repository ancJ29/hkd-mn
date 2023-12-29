import CategoryItem from "@/components/category-item";
import { Category } from "@/types";
import { Box, Image, ScrollArea } from "@mantine/core";
import classes from "./index.module.css";

type CategoryBandProps = {
  selectedId?: string;
  categories: Category[];
  onSelect?: (id: string) => void;
};

const CategoryBand = ({
  categories,
  selectedId,
  onSelect,
}: CategoryBandProps) => {
  return (
    <div className={classes.container}>
      <Image w={100} mx={35} mt={28} src="/images/logo.svg" />
      <ScrollArea type="auto" scrollbarSize={0}>
        <Box className={classes.box} key={selectedId}>
          {categories.map((item: Category) => {
            return (
              <CategoryItem
                key={item.id}
                name={item.name}
                active={selectedId === item.id}
                onSelect={() => onSelect && onSelect(item.id)}
              />
            );
          })}
        </Box>
      </ScrollArea>
    </div>
  );
};

export default CategoryBand;
