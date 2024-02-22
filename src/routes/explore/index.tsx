import CategoryBand from "@/components/category-band";
import FoodHighlight from "@/components/food-highlights";
import Loading from "@/components/loading";
import MenuLayout from "@/components/menu-layout";
import TastyOrigins from "@/components/tasty-origins";
import VideoFrame from "@/components/video-frame";
import {
  getCategories,
  getFoodAdvertisement,
  getMaterialAdvertisement,
} from "@/services/menu";
import { Advertisement, Category } from "@/types";
import { CATEGORY_ID } from "@/utils/constant";
import { ReactNode, useEffect, useState } from "react";
import classes from "./index.module.scss";

const Explore = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState("");
  const [foodAdvertisements, setFoodAdvertisements] = useState<Advertisement[]>([]);
  const [materialAdvertisement, setMaterialAdvertisement] = useState<Advertisement[]>([]);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    console.log("fetch data...");

    getCategories().then((categories) => {
      if (categories === undefined) {
        setIsError(true);
        return;
      }
      setCategories(categories);
      handleSelectCategoryId(sessionStorage.getItem(CATEGORY_ID) || categories[0]?.id);
    });

    getFoodAdvertisement().then((items) => {
      setFoodAdvertisements(items);
    });

    getMaterialAdvertisement().then((items) => {
      setMaterialAdvertisement(items);
    });
  }, []);

  const handleSelectCategoryId = (id: string) => {
    setSelectedCategoryId(id);
    sessionStorage.setItem(CATEGORY_ID, id);
  };

  if ((foodAdvertisements.length < 1 || materialAdvertisement.length < 1) && !isError) {
    return <Loading />;
  }

  const header = (): ReactNode => {
    return (
      <CategoryBand
        categories={categories}
        selectedId={selectedCategoryId}
        onSelect={handleSelectCategoryId}
      />
    );
  };

  return (
    <MenuLayout header={header()} isError={isError}>
      <div className={classes.main}>
        <VideoFrame />

        <FoodHighlight foodAdvertisements={foodAdvertisements} />

        <TastyOrigins materialAdvertisement={materialAdvertisement} />
      </div>
    </MenuLayout>
  );
};

export default Explore;
