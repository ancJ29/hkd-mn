import QuantitySelector from "@/components/menu-detail/quantity-selector";
import NameAndNote from "@/components/modal/cart/table-item/name-and-note";
import ModalNote from "@/components/modal/note";
import { Menu } from "@/types";
import { Text } from "@mantine/core";
import { useState } from "react";
import classes from "./index.module.scss";
import { formatCurrency } from "@/utils";

type TableItemProps = {
  menu?: Menu;
  onChange: (quantity: number) => void;
  className?: string;
};

const TableItem = ({ menu, onChange, className }: TableItemProps) => {
  const [openedNote, setOpenedNote] = useState(false);

  return (
    <>
      <ModalNote opened={openedNote} onClose={() => setOpenedNote(false)} />

      <div className={`${className} ${classes.container}`}>
        <NameAndNote menu={menu} onOpenedModalNote={() => setOpenedNote(true)} />

        <QuantitySelector
          total={menu?.quantity || 0}
          onChange={onChange}
          size={35}
          totalClassName={classes.total}
        />

        <Text className={classes.price}>
          {formatCurrency((menu?.price || 0) * (menu?.quantity || 0))}
        </Text>
      </div>
    </>
  );
};

export default TableItem;
