import Modal from "@/components/modal";
import useTranslation from "@/hooks/useTranslation";
import { Image, Text } from "@mantine/core";
import classes from "./index.module.scss";

type ModalOrderSuccessProps = {
  opened: boolean;
  onClose: () => void;
};

const ModalOrderSuccess = ({ opened, onClose }: ModalOrderSuccessProps) => {
  const t = useTranslation();

  return (
    <Modal opened={opened} onClose={onClose} size="85%" closeSize={16}>
      <div className={classes.contentContainer}>
        <Image src="/images/order.svg" h={80} onClick={onClose} />

        <Text className={classes.content}>{t("Successful order")}</Text>
      </div>
    </Modal>
  );
};

export default ModalOrderSuccess;
