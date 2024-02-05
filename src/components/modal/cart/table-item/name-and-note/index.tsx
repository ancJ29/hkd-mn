import { Menu } from "@/types";
import { Image, Text } from "@mantine/core";
import classes from "./index.module.scss";

type NameAndNoteProps = {
  menu?: Menu;
  onOpenedModalNote: () => void;
};

const NameAndNote = ({ menu, onOpenedModalNote }: NameAndNoteProps) => {
  return (
    <div className={classes.container}>
      <Text className={classes.name}>{menu?.name}</Text>

      <div className={classes.noteContainer}>
        <Image w={10} src="/images/edit.svg" />
        <Text className={classes.note} onClick={onOpenedModalNote}>
          Thêm ghi chú
        </Text>
      </div>
    </div>
  );
};

export default NameAndNote;
