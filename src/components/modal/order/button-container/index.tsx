import useTranslation from "@/hooks/useTranslation";
import { toUpperCase } from "@/utils";
import { Button, Text } from "@mantine/core";
import classes from "./index.module.scss";

type ButtonContainerProps = {
  onClose: () => void;
  isAvailable: boolean;
};

const ButtonContainer = ({ onClose, isAvailable }: ButtonContainerProps) => {
  const t = useTranslation();
  return (
    <div className={classes.buttonContainer}>
      <Button className={`${classes.cancelButton} ${classes.button}`} onClick={onClose}>
        <Text className={classes.textButton}>{toUpperCase(t("Decline"))}</Text>
      </Button>
      <Button
        className={[
          classes.button,
          classes.confirmButton,
          isAvailable ? "" : classes.disabledButton,
        ].join(" ")}
        disabled={!isAvailable}
      >
        <Text className={classes.textButton}>{toUpperCase(t("Accept"))}</Text>
      </Button>
    </div>
  );
};

export default ButtonContainer;
