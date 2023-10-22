import CategoryBand from "@/components/category-band";
import config from "@/configs/custom";
import { getCategories } from "@/services/menu";
import { Category } from "@/types";
import { Box } from "@mantine/core";
import { useEffect, useState } from "react";

const TopMenu = () => {
  const [categories, setCategory] = useState<Category[]>([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState("");

  useEffect(() => {
    getCategories().then((categories: Category[]) => setCategory(categories));
  }, []);

  return (
    <Box w='100vw' h='100vh' lh={1.2} style={config.base}>
      <CategoryBand
        categories={categories}
        selectedId={selectedCategoryId || categories[0]?.id || ""}
        onSelect={(id) => setSelectedCategoryId(id)}
      />
    </Box>
  );
};

export default TopMenu;
