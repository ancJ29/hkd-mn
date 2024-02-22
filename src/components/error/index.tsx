import { Text } from "@mantine/core";
import classes from "./index.module.scss";

const Error = () => {
  return (
    <div className={classes.container}>
      <Text className={classes.text}>Something went wrong...</Text>
    </div>
  );
};

export default Error;
