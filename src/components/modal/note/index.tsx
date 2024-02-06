import Modal from "@/components/modal";
import { Menu } from "@/types";
import { Button, Text, Textarea } from "@mantine/core";
import { useState } from "react";
import classes from "./index.module.scss";

type ModalNoteProps = {
  opened: boolean;
  onClose: () => void;
  menu?: Menu;
  onChangeNote: (note: string) => void;
};

const ModalNote = ({ opened, onClose, menu, onChangeNote }: ModalNoteProps) => {
  const [value, setValue] = useState(menu?.note || "");
  const onChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(event.currentTarget.value);
  };

  const onSave = () => {
    onChangeNote(value);
    onClose();
  };

  const onDelete = () => {
    setValue("");
  };

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
        value={value}
        onChange={onChange}
        autosize
        minRows={3}
        maxRows={3}
        size="xs"
      />

      <div className={classes.buttonContainer}>
        <Button className={classes.deleteButton} onClick={onDelete}>
          <Text className={classes.textButton}>Xoá</Text>
        </Button>

        <Button className={classes.saveButton} onClick={onSave}>
          <Text className={classes.textButton}>Lưu</Text>
        </Button>
      </div>
    </Modal>
  );
};

export default ModalNote;
