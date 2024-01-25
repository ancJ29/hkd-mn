import { Image, Text } from "@mantine/core";
import classes from "./index.module.scss";

type ModalHeaderProps = {
  title?: string;
  onClose: () => void;
  closeSize?: number;
};

const ModalHeader = ({ title, onClose, closeSize = 24 }: ModalHeaderProps) => {
  return (
    <div className={classes.container}>
      <Text className={classes.title}>{title}</Text>
      <Image
        src="/images/close.svg"
        onClick={onClose}
        w="auto"
        h={closeSize}
        fit="contain"
      />
    </div>
  );
};

export default ModalHeader;
