import Modal from "@/components/modal";
import { Button, Text, Textarea } from "@mantine/core";
import classes from "./index.module.scss";

type ModalNoteProps = {
  opened: boolean;
  onClose: () => void;
};

const ModalNote = ({ opened, onClose }: ModalNoteProps) => {
  return (
    <Modal
      opened={opened}
      onClose={onClose}
      zIndex={300}
      withCloseButton={false}
      size="85%"
    >
      <Text className={classes.title}>Thêm ghi chú</Text>

      <Textarea
        placeholder="Nhập yêu cầu thêm tại đây"
        autosize
        minRows={3}
        maxRows={3}
        size="xs"
      />

      <div className={classes.buttonContainer}>
        <Button className={classes.deleteButton}>
          <Text className={classes.textButton}>Xoá</Text>
        </Button>

        <Button className={classes.saveButton}>
          <Text className={classes.textButton}>Lưu</Text>
        </Button>
      </div>
    </Modal>
  );
};

export default ModalNote;
