import { Image, Text } from "@mantine/core";
import classes from "./index.module.scss";

type ModalHeaderProps = {
  title?: string;
  onClose: () => void;
};

const ModalHeader = ({ title, onClose }: ModalHeaderProps) => {
  return (
    <div className={classes.container}>
      <Text className={classes.title}>{title}</Text>
      <Image src="/images/close.svg" onClick={onClose} w={30} />
    </div>
  );
};

export default ModalHeader;
