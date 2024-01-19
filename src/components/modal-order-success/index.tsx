import { Image, Modal, Text } from "@mantine/core";
import classes from "./index.module.css";

type ModalOrderSuccessProps = {
  opened: boolean;
  onClose: () => void;
};

const ModalOrderSuccess = ({ opened, onClose }: ModalOrderSuccessProps) => {
  const content =
    "Quý khách đã đặt món thành công.\nMón ăn sẽ được phục vụ Quý khách tại bàn trong thời gian sớm.";

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      centered
      withCloseButton={false}
      size="lg"
      padding={0}
      radius={20}
    >
      <div className={classes.container}>
        <Image
          src="/images/close.svg"
          w={60}
          className={classes.closeButton}
          onClick={onClose}
        />

        <div className={classes.contentContainer}>
          <Image src="/images/order.png" w={200} onClick={onClose} />

          <Text className={classes.content}>{content}</Text>
        </div>
      </div>
    </Modal>
  );
};

export default ModalOrderSuccess;
