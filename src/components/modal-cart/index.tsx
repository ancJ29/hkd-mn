import { Button, Modal, Text } from "@mantine/core";
import { useState } from "react";
import ModalOrderSuccess from "../modal-order-success";
import classes from "./index.module.css";
import ModalHeader from "./modal-header";
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
      <ModalOrderSuccess
        opened={openedModalOrderSuccess}
        onClose={() => setOpenedModalOrderSuccess(false)}
      />

      <Modal
        opened={opened}
        onClose={onClose}
        withCloseButton={false}
        size="100%"
        radius={20}
        padding={0}
        centered
      >
        <div className={classes.container}>
          <ModalHeader onClose={onClose} />

          <TableHeader />

          <div className={classes.itemContainer}>
            {[...Array(10).keys()].map((_, index) => (
              <TableItem key={index} />
            ))}
          </div>

          <SpecialRequirements />

          <Price />

          <Button className={classes.button} onClick={onOrderSuccess}>
            <Text className={classes.buttonText}>ĐẶT MÓN</Text>
          </Button>
        </div>
      </Modal>
    </>
  );
};

export default ModalCart;
