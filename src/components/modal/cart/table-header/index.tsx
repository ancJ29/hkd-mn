import useTranslation from "@/hooks/useTranslation";
import { Text } from "@mantine/core";
import classes from "./index.module.scss";

type TableHeaderProps = {
  className?: string;
};

const TableHeader = ({ className }: TableHeaderProps) => {
  const t = useTranslation();
  return (
    <div className={`${className} ${classes.container}`}>
      <Text className={classes.name}>{t("Items name")}</Text>
      <Text className={classes.quantity}>{t("Quantity")}</Text>
      <Text className={classes.price}>{`${t("Total")} (vnd)`}</Text>
    </div>
  );
};

export default TableHeader;
