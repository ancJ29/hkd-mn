import QuantitySelector from "@/components/menu-detail/quantity-selector";
import NameAndNote from "@/components/modal/cart/table-item/name-and-note";
import ModalNote from "@/components/modal/note";
import { Menu } from "@/types";
import { formatCurrency } from "@/utils";
import { Text } from "@mantine/core";
import { useState } from "react";
import classes from "./index.module.scss";

type TableItemProps = {
  menu?: Menu;
  onChangeQuantity: (quantity: number) => void;
  onChangeNote: (note: string) => void;
  className?: string;
};

const TableItem = ({
  menu,
  onChangeQuantity,
  onChangeNote,
  className,
}: TableItemProps) => {
  const [isOpenedModalNote, setIsOpenedModalNote] = useState(false);

  return (
    <>
      <ModalNote
        opened={isOpenedModalNote}
        onClose={() => setIsOpenedModalNote(false)}
        menu={menu}
        onChangeNote={onChangeNote}
      />

      <div className={`${className} ${classes.container}`}>
        <NameAndNote menu={menu} onOpenedModalNote={() => setIsOpenedModalNote(true)} />

        <QuantitySelector
          total={menu?.quantity || 0}
          onChange={onChangeQuantity}
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
