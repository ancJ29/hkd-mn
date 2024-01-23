import GreenButton from "@/components/green-button";
import { Text } from "@mantine/core";
import classes from "./index.module.scss";

const SideDishItem = () => {
  return (
    <div className={classes.container}>
      <div className={classes.nameContainer}>
        <Text className={classes.text}>Set A</Text>
        <Text className={classes.text2}>{`(cơm, salad, súp miso, kim chi,rau củ)`}</Text>
      </div>

      <Text className={classes.total}>+28.000</Text>

      <GreenButton />
    </div>
  );
};

export default SideDishItem;
