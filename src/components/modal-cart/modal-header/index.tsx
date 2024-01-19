import { Image, Text } from "@mantine/core";
import classes from "./index.module.css";

type ModalHeaderProps = {
  onClose: () => void;
};

const ModalHeader = ({ onClose }: ModalHeaderProps) => {
  return (
    <div className={classes.container}>
      <Text className={classes.text}>GIỎ HÀNG CỦA BẠN</Text>
      <Image src="/images/close.svg" onClick={onClose} w={60} />
    </div>
  );
};

export default ModalHeader;
