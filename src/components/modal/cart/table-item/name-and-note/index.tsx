import { Image, Text } from "@mantine/core";
import classes from "./index.module.scss";

type NameAndNoteProps = {
  onOpenedModalNote: () => void;
};

const NameAndNote = ({ onOpenedModalNote }: NameAndNoteProps) => {
  return (
    <div className={classes.container}>
      <Text className={classes.name}>Komochi Nisshin Sashimi</Text>

      <div className={classes.noteContainer}>
        <Image h={10} src="/images/edit.svg" />
        <Text className={classes.note} onClick={onOpenedModalNote}>
          Thêm ghi chú
        </Text>
      </div>
    </div>
  );
};

export default NameAndNote;
