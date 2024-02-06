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

      {menu?.note && menu.note !== "" && (
        <Text className={classes.note}>{menu.note}</Text>
      )}

      <div className={classes.addNoteContainer}>
        <Image w={10} src="/images/edit.svg" />

        <Text className={classes.addNote} onClick={onOpenedModalNote}>
          Thêm ghi chú
        </Text>
      </div>
    </div>
  );
};

export default NameAndNote;
