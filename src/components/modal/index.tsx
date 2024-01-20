import { Modal as MantineModal, ModalProps as MantineModalProps } from "@mantine/core";
import { ReactNode } from "react";
import ModalHeader from "./header";
import classes from "./index.module.scss";

interface ModalProps extends MantineModalProps {
  children: ReactNode;
  title?: string;
  withCloseButton?: boolean;
}

const Modal = ({ children, title, withCloseButton = true, ...props }: ModalProps) => {
  return (
    <MantineModal centered withCloseButton={false} size="100%" radius={10} padding={0} {...props}>
      <div className={classes.container}>
        {withCloseButton && <ModalHeader title={title} onClose={props.onClose} />}
        {children}
      </div>
    </MantineModal>
  );
};

export default Modal;
