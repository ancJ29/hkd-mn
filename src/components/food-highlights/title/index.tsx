import { Text } from "@mantine/core";
import classes from "./index.module.scss";

type TitleProps = {
  value: string;
};

const Title = ({ value }: TitleProps) => {
  return <Text className={classes.title}>{value}</Text>;
};

export default Title;
