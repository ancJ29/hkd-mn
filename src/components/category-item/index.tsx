import config from "@/configs/custom";
import { Center, Text } from "@mantine/core";
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
    <Center
      id={`category-item.${id}`}
      w='15vw'
      ta='center'
      m={2}
      lh={"xs"}
      style={style}
      onClick={() => onSelect && onSelect(id)}
    >
      <Text component='div'>
        <Text component='div' style={{ fontSize: ".7rem" }}>
          {secondaryName.toUpperCase()}
        </Text>
        <Text component='div' style={{ fontSize: ".6rem", fontWeight: "600" }}>
          {name.toUpperCase()}
        </Text>
      </Text>
    </Center>
  );
};

export default CategoryItem;
