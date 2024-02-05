import { Text } from "@mantine/core";
import classes from "./index.module.scss";

type TableItemProps = {
  className?: string;
};

const TableItem = ({ className }: TableItemProps) => {
  return (
    <div className={`${className} ${classes.container}`}>
      <Text className={classes.name}>Komochi Nisshin Sashimi</Text>

      <Text className={classes.quantity}>1</Text>

      <Text className={classes.price}>270,000</Text>
    </div>
  );
};

export default TableItem;
