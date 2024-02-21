import { Menu } from "@/types";
import { formatCurrency } from "@/utils";
import { Text } from "@mantine/core";
import classes from "./index.module.scss";

type TableItemProps = {
  menu?: Menu;
  className?: string;
};

const TableItem = ({ menu, className }: TableItemProps) => {
  return (
    <div className={`${className} ${classes.container}`}>
      <Text className={classes.name}>{menu?.name}</Text>

      <Text className={classes.quantity}>{menu?.quantity}</Text>

      <Text className={classes.price}>
        {formatCurrency((menu?.price || 0) * (menu?.quantity || 0))}
      </Text>
    </div>
  );
};

export default TableItem;
