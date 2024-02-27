import { Text } from "@mantine/core";
import classes from "./index.module.scss";

const Error = () => {
  const content = "Something went wrong...\nInvalid API data";
  return (
    <div className={classes.container}>
      <Text className={classes.text}>{content}</Text>
    </div>
  );
};

export default Error;
