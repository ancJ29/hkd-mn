import FoodHighlight from "@/components/food-highlights";
import MenuNavigation, { MenuAction } from "@/components/menu-detail/menu-navigation";
import MenuLayout from "@/components/menu-layout";
import TastyOrigins from "@/components/tasty-origins";
import VideoFrame from "@/components/video-frame";
import {
  getCategories,
  getFoodAdvertisement,
  getMaterialAdvertisement,
} from "@/services/menu";
import { Advertisement, Category } from "@/types";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import classes from "./index.module.scss";

const Explore = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState("");
  const [foodAdvertisements, setFoodAdvertisements] = useState<Advertisement[]>([]);
  const [materialAdvertisement, setMaterialAdvertisement] = useState<Advertisement[]>([]);

  useEffect(() => {
    console.log("fetch data...");
    getCategories().then((categories) => {
      setCategories(categories);
      setSelectedCategoryId(categories[0]?.id || "");
    });

    getFoodAdvertisement().then((items) => {
      setFoodAdvertisements(items);
    });

    getMaterialAdvertisement().then((items) => {
      setMaterialAdvertisement(items);
    });
  }, []);

  const actionHandler = useCallback((action: MenuAction) => {
    switch (action) {
    case MenuAction.MENU: {
      navigate("/");
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
      <div className={classes.main}>
        <VideoFrame />

        <FoodHighlight foodAdvertisements={foodAdvertisements} />

        <TastyOrigins materialAdvertisement={materialAdvertisement} />
      </div>

      <MenuNavigation
        onAction={actionHandler}
        totals={{}}
        className={classes.navigation}
      />
    </MenuLayout>
  );
};

export default Explore;
