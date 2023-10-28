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
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
            id={item.id}
            name={item.name}
            secondaryName={item.secondaryName}
            active={selectedId === item.id}
            onSelect={onSelect}
          />
        );
      })}
    </Box>
  );
};

export default CategoryBand;
