import QuantitySelector from "@/components/menu-detail/quantity-selector";
import NameAndNote from "@/components/modal/cart/table-item/name-and-note";
import ModalNote from "@/components/modal/note";
import { Text } from "@mantine/core";
import { useState } from "react";
import classes from "./index.module.scss";

const TableItem = () => {
  const [openedNote, setOpenedNote] = useState(false);

  return (
    <>
      <ModalNote opened={openedNote} onClose={() => setOpenedNote(false)} />
      <div className={classes.container}>
        <NameAndNote onOpenedModalNote={() => setOpenedNote(true)} />

        <QuantitySelector
          total={1}
          onChange={() => null}
          size={35}
          totalClassName={classes.total}
        />

        <Text className={classes.price}>270,000</Text>
      </div>
    </>
  );
};

export default TableItem;
