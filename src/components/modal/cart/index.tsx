import { Button, Text } from "@mantine/core";
import { useState } from "react";
import Modal from "..";
import ModalOrderSuccess from "../order-success";
import classes from "./index.module.scss";
import Price from "./price";
import SpecialRequirements from "./special-requirements";
import TableHeader from "./table-header";
import TableItem from "./table-item";

type ModalCartProps = {
  opened: boolean;
  onClose: () => void;
};

const ModalCart = ({ opened, onClose }: ModalCartProps) => {
  const [openedModalOrderSuccess, setOpenedModalOrderSuccess] = useState(false);

  const onOrderSuccess = () => {
    onClose();
    setOpenedModalOrderSuccess(true);
  };

  return (
    <>
      <ModalOrderSuccess opened={openedModalOrderSuccess} onClose={() => setOpenedModalOrderSuccess(false)} />
      <Modal opened={opened} onClose={onClose} title="GIỎ HÀNG CỦA BẠN">
        <TableHeader />

        <div className={classes.itemContainer}>
          {[...Array(10).keys()].map((_, index) => (
            <TableItem key={index} />
          ))}
        </div>

        <SpecialRequirements />

        <Price />

        <Button className={classes.button} fullWidth onClick={onOrderSuccess}>
          <Text className={classes.buttonText}>ĐẶT MÓN</Text>
        </Button>
      </Modal>
    </>
  );
};

export default ModalCart;
