import { Button, Modal, Text, Textarea } from "@mantine/core";
import classes from "./index.module.css";

type ModalNoteProps = {
  opened: boolean;
  onClose: () => void;
};

const ModalNote = ({ opened, onClose }: ModalNoteProps) => {
  return (
    <Modal
      opened={opened}
      onClose={onClose}
      centered
      zIndex={300}
      radius={20}
      withCloseButton={false}
      size="lg"
      padding={0}
      overlayProps={{
        backgroundOpacity: 0.55,
        blur: 5,
      }}
    >
      <div className={classes.container}>
        <Text className={classes.title}>Thêm ghi chú</Text>

        <Textarea
          placeholder="Nhập yêu cầu thêm tại đây"
          autosize
          minRows={3}
          maxRows={3}
          radius={10}
          size="xl"
        />

        <div className={classes.buttonContainer}>
          <Button className={classes.deleteButton}>
            <Text className={classes.textButton}>Xoá</Text>
          </Button>

          <Button className={classes.saveButton}>
            <Text className={classes.textButton}>Lưu</Text>
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default ModalNote;
