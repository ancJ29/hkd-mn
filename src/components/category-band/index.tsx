import CategoryItem from "@/components/category-band/category-item";
import { Category } from "@/types";
import { Box, Image, ScrollArea } from "@mantine/core";
import { useEffect, useRef } from "react";
import classes from "./index.module.scss";

type CategoryBandProps = {
  selectedId?: string;
  categories: Category[];
  onSelect?: (id: string) => void;
};

const CategoryBand = ({ categories, selectedId, onSelect }: CategoryBandProps) => {
  const selectedRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (selectedRef.current) {
      selectedRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
        inline: "center",
      });
    }
  }, [selectedId]);

  return (
    <div className={classes.container}>
      <Image w={40} mx={12} src="/images/logo.svg" />

      <ScrollArea type="auto" scrollbarSize={0}>
        <Box className={classes.box}>
          {categories.map((item: Category) => {
            return (
              <div key={item.id} ref={selectedId === item.id ? selectedRef : null}>
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
