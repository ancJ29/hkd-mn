import FoodHighlight from "@/components/food-highlights";
import MenuNavigation, { MenuAction } from "@/components/menu-detail/menu-navigation";
import MenuLayout from "@/components/menu-layout";
import TastyOrigins from "@/components/tasty-origins";
import VideoFrame from "@/components/video-frame";
import { getCategories } from "@/services/menu";
import { Category } from "@/types";
import { useCallback, useEffect, useState } from "react";

const Dashboard = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState("");

  useEffect(() => {
    console.log("fetch data...");
    getCategories().then((categories) => {
      setCategories(categories);
      setSelectedCategoryId(categories[0]?.id || "");
    });
  }, []);

  const actionHandler = useCallback((action: MenuAction) => {
    switch (action) {
    case MenuAction.CART: {
      break;
    }
    }
  }, []);

  return (
    <MenuLayout
      categories={categories}
      selectedCategoryId={selectedCategoryId}
      setSelectedCategoryId={setSelectedCategoryId}
    >
      <VideoFrame />

      <FoodHighlight />

      <TastyOrigins />

      <MenuNavigation onAction={actionHandler} totals={{}} />
    </MenuLayout>
  );
};

export default Dashboard;
