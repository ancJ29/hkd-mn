import { Box, Text } from "@mantine/core";
import { useMemo } from "react";
import classes from "./index.module.css";

type CategoryItemProps = {
  name: string;
  active?: boolean;
  onSelect?: () => void;
};

const CategoryItem = ({ active, name, onSelect }: CategoryItemProps) => {
  // TODO: use css
  const width = useMemo(() => `${name.length * 1.8}rem`, [name]);

  return (
    <Box
      className={[classes.container, active ? classes.active : ""].join(" ")}
      onClick={onSelect}
    >
      <Text className={classes.title} style={{ width }}>
        {name}
      </Text>
    </Box>
  );
};

export default CategoryItem;
