import { Center, Image } from "@mantine/core";
import { useMemo } from "react";

type CategoryItemProps = {
  name: string;
  active?: boolean;
  onClick?: () => void;
};

/* cspell:disable  */
/*
  "DRINK",
  "SASHIMI",
  "SALAD",
  "TSUKIDASHI",
  "SUSHI",
  "MAKI_SUSHI",
  "ROLL",
  "NABE",
  "WAGYU",
  "SPECIAL",
  "OTHERS",
  "DESSERT",
*/
const names: Record<string, string> = {
  // "DRINK": "",
  SEASONAL: "OTHERS",
  // "SASHIMI": "",
  // "SALAD": "",
  // "TSUKIDASHI": "",
  // "SUSHI": "",
  "MAKI SUSHI": "MAKI_SUSHI",
  // "ROLL": "",
  // "NABE": "",
  // "WAGYU": "",
  "SPECIAL SET": "SPECIAL",
  GOHAN: "OTHERS",
  NOODLE: "OTHERS",
  DESERT: "DESSERT",
};
/* cspell:enable  */

const CategoryItem = ({ active, name, onClick }: CategoryItemProps) => {
  const url = useMemo(() => {
    const _name = names[name.toUpperCase()] || name.toUpperCase();
    if (active) {
      return `/images/categories/active/${_name}.svg`;
    }
    return `/images/categories/inactive/${_name}.svg`;
  }, [active, name]);

  return (
    <Center w='15vw' ta='center' m={2} lh={"xs"} onClick={onClick}>
      <Image src={url} />
    </Center>
  );
};

export default CategoryItem;
