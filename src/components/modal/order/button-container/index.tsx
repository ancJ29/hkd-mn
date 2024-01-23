import { Button, Text } from "@mantine/core";
import classes from "./index.module.scss";

type ButtonContainerProps = {
  onClose: () => void;
  isAvailable: boolean;
};

const ButtonContainer = ({ onClose, isAvailable }: ButtonContainerProps) => {
  return (
    <div className={classes.buttonContainer}>
      <Button className={`${classes.cancelButton} ${classes.button}`} onClick={onClose}>
        <Text className={classes.textButton}>HUỶ BỎ</Text>
      </Button>
      <Button
        className={[
          classes.button,
          classes.confirmButton,
          isAvailable ? "" : classes.disabledButton,
        ].join(" ")}
        disabled={!isAvailable}
      >
        <Text className={classes.textButton}>XÁC NHẬN</Text>
      </Button>
    </div>
  );
};

export default ButtonContainer;
