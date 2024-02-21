import CategoryItem from "@/components/category-band/category-item";
import { Category } from "@/types";
import { scroll } from "@/utils";
import { CATEGORY_ITEM } from "@/utils/constant";
import { Box, Image, ScrollArea } from "@mantine/core";
import { useEffect } from "react";
import classes from "./index.module.scss";

type CategoryBandProps = {
  selectedId?: string;
  categories: Category[];
  onSelect?: (id: string) => void;
  isScrolledMenuByCode?: boolean;
};

const CategoryBand = ({
  categories,
  selectedId,
  onSelect,
  isScrolledMenuByCode = true,
}: CategoryBandProps) => {
  useEffect(() => {
    scroll(`${CATEGORY_ITEM}.${selectedId}`, {
      behavior: isScrolledMenuByCode ? "smooth" : "auto",
      block: "center",
      inline: "center",
    });
  }, [selectedId]);

  return (
    <div className={classes.container}>
      <Image w={40} ml={10} mr={6} src="/images/logo.svg" />

      <ScrollArea type="auto" scrollbarSize={0}>
        <Box className={classes.box}>
          {categories.map((item: Category, index: number) => {
            return (
              <div key={index} id={`${CATEGORY_ITEM}.${item.id}`}>
                <CategoryItem
                  name={item.name}
                  active={selectedId === item.id}
                  onSelect={() => onSelect && onSelect(item.id)}
                />
              </div>
            );
          })}
        </Box>
      </ScrollArea>
    </div>
  );
};

export default CategoryBand;
//
