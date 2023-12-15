import { Box, Text } from "@mantine/core";
import classes from "./index.module.css";

type CategoryItemProps = {
  name: string;
  active?: boolean;
  onSelect?: () => void;
};

const CategoryItem = ({ active, name, onSelect }: CategoryItemProps) => {
  return (
    <Box
      className={[classes.container, active ? classes.active : ""].join(" ")}
      onClick={onSelect}
    >
      <Text
        className={[classes.title, active ? "" : classes.titleInactive].join(
          " ",
        )}
      >
        {name}
      </Text>
    </Box>
  );
};

export default CategoryItem;
