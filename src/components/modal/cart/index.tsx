import Modal from "@/components/modal";
import Price from "@/components/modal/cart/price";
import SpecialRequirements from "@/components/modal/cart/special-requirements";
import TableHeader from "@/components/modal/cart/table-header";
import TableItem from "@/components/modal/cart/table-item";
import ModalOrderSuccess from "@/components/modal/order-success";
import { Button, Text } from "@mantine/core";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import classes from "./index.module.scss";

type ModalCartProps = {
  opened: boolean;
  onClose: () => void;
};

const ModalCart = ({ opened, onClose }: ModalCartProps) => {
  const navigate = useNavigate();
  const [openedModalOrderSuccess, setOpenedModalOrderSuccess] = useState(false);

  const _onClose = () => {
    onClose();
    navigate("/");
  };

  const onOrderSuccess = () => {
    onClose();
    setOpenedModalOrderSuccess(true);
  };

  const onCloseModalOrderSuccess = () => {
    setOpenedModalOrderSuccess(false);
    navigate("/");
  };

  return (
    <>
      <ModalOrderSuccess
        opened={openedModalOrderSuccess}
        onClose={onCloseModalOrderSuccess}
      />

      <Modal opened={opened} onClose={_onClose} title="GIỎ HÀNG CỦA BẠN">
        <TableHeader />

        <div className={classes.itemContainer}>
          {[...Array(10).keys()].map((_, index) => (
            <TableItem key={index} />
          ))}
        </div>

        <SpecialRequirements />

        <Price />

        <div className={classes.containerButton}>
          <Button className={classes.button} fullWidth onClick={onOrderSuccess}>
            <Text className={classes.buttonText}>ĐẶT MÓN</Text>
          </Button>
        </div>
      </Modal>
    </>
  );
};

export default ModalCart;
