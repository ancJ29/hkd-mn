import Modal from "@/components/modal";
import { Image, Text } from "@mantine/core";
import classes from "./index.module.scss";

type ModalOrderSuccessProps = {
  opened: boolean;
  onClose: () => void;
};

const ModalOrderSuccess = ({ opened, onClose }: ModalOrderSuccessProps) => {
  const content =
    "Quý khách đã đặt món thành công.\nMón ăn sẽ được phục vụ Quý khách tại bàn trong thời gian sớm.";

  return (
    <Modal opened={opened} onClose={onClose} size="85%" closeSize={16}>
      <div className={classes.contentContainer}>
        <Image src="/images/order.svg" h={80} onClick={onClose} />

        <Text className={classes.content}>{content}</Text>
      </div>
    </Modal>
  );
};

export default ModalOrderSuccess;
