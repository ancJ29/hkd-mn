import config from "@/configs/custom";
import { Center } from "@mantine/core";
import { useMemo } from "react";
type CategoryItemProps = {
  id: string;
  name: string;
  secondaryName: string;
  active?: boolean;
  onSelect?: (id: string) => void;
};

const CategoryItem = ({ id, active, name, secondaryName, onSelect }: CategoryItemProps) => {
  const style = useMemo(
    () => ({
      ...config.categoryItem,
      ...(active ? config.activeCategoryItem : {}),
    }),
    [active],
  );

  return (
    <Center h='4rem' miw='25vw' ta='center' fw={700} m={2} style={style} onClick={() => onSelect && onSelect(id)}>
      {secondaryName.toUpperCase()}
      <br />
      {name.toUpperCase()}
    </Center>
  );
};

export default CategoryItem;
