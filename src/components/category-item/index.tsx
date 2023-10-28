import { Center, Image } from "@mantine/core";
import { useMemo } from "react";

type CategoryItemProps = {
  name: string;
  active?: boolean;
  onClick?: () => void;
};

const CategoryItem = ({ active, name, onClick }: CategoryItemProps) => {
  const url = useMemo(
    () => {
      if (active) {
        return `/images/category/active/${name.toUpperCase()}.svg`;
      }
      return `/images/category/inactive/${name.toUpperCase()}.svg`;
    },
    [active, name],
  );

  return (
    <Center
      w='15vw'
      ta='center'
      m={2}
      lh={"xs"}
      onClick={onClick}
    >
      <Image src={url}/>
    </Center>
  );
};

export default CategoryItem;
