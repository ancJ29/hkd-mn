import FoodHighlight from "@/components/food-highlights";
import Loading from "@/components/loading";
import MenuLayout from "@/components/menu-layout";
import TastyOrigins from "@/components/tasty-origins";
import VideoFrame from "@/components/video-frame";
import { getFoodAdvertisement, getMaterialAdvertisement } from "@/services/menu";
import { Advertisement } from "@/types";
import { useEffect, useState } from "react";
import classes from "./index.module.scss";

const Explore = () => {
  const [foodAdvertisements, setFoodAdvertisements] = useState<Advertisement[]>([]);
  const [materialAdvertisement, setMaterialAdvertisement] = useState<Advertisement[]>([]);

  useEffect(() => {
    console.log("fetch data...");

    getFoodAdvertisement().then((items) => {
      setFoodAdvertisements(items);
    });

    getMaterialAdvertisement().then((items) => {
      setMaterialAdvertisement(items);
    });
  }, []);

  if (foodAdvertisements.length < 1 || materialAdvertisement.length < 1) {
    return <Loading />;
  }

  return (
    <MenuLayout>
      <div className={classes.main}>
        <VideoFrame />

        <FoodHighlight foodAdvertisements={foodAdvertisements} />

        <TastyOrigins materialAdvertisement={materialAdvertisement} />
      </div>
    </MenuLayout>
  );
};

export default Explore;
