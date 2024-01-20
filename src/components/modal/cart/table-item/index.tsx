import QuantitySelector from "@/components/menu-detail/quantity-selector";
import { Text } from "@mantine/core";
import { useState } from "react";
import classes from "./index.module.scss";
import NameAndNote from "./name-and-note";
import ModalNote from "../../note";

const TableItem = () => {
  const [openedNote, setOpenedNote] = useState(false);

  return (
    <>
      <ModalNote opened={openedNote} onClose={() => setOpenedNote(false)} />
      <div className={classes.container}>
        <NameAndNote onOpenedModalNote={() => setOpenedNote(true)} />

        <QuantitySelector total={1} onChange={() => null} size={35} totalClassName={classes.total} />

        <Text className={classes.price}>270,000</Text>
      </div>
    </>
  );
};

export default TableItem;
