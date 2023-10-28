import CategoryItem from "@/components/category-item";
import { Category } from "@/types";
import { Box } from "@mantine/core";

const boxStyle = {
  display: "grid",
  gridAutoFlow: "column",
  gridTemplateRows: "auto auto", // 2 row
  gridAutoColumns: "auto",
};

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
    <Box style={boxStyle} key={selectedId}>
      {categories.map((item: Category) => {
        return (
          <CategoryItem
            key={item.id}
            name={item.name}
            active={selectedId === item.id}
            onClick={() => onSelect && onSelect(item.id)}
          />
        );
      })}
    </Box>
  );
};

export default CategoryBand;
