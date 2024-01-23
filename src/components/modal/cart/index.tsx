import Modal from "@/components/modal";
import Price from "@/components/modal/cart/price";
import SpecialRequirements from "@/components/modal/cart/special-requirements";
import TableHeader from "@/components/modal/cart/table-header";
import TableItem from "@/components/modal/cart/table-item";
import ModalOrderSuccess from "@/components/modal/order-success";
import { Button, Text } from "@mantine/core";
import { useState } from "react";
import classes from "./index.module.scss";

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
      <ModalOrderSuccess
        opened={openedModalOrderSuccess}
        onClose={() => setOpenedModalOrderSuccess(false)}
      />
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
