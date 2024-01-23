import Modal from "@/components/modal";
import DishItem from "@/components/modal/replacement-dish/dish-item";
import { Text } from "@mantine/core";
import classes from "./index.module.scss";

type ModalReplacementDishProps = {
  opened: boolean;
  onClose: () => void;
  onChangeAvailable: () => void;
};

const ModalReplacementDish = ({
  opened,
  onClose,
  onChangeAvailable,
}: ModalReplacementDishProps) => {
  const handleButtonClick = () => {
    onChangeAvailable();
    onClose();
  };

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      zIndex={300}
      title="THÔNG TIN MÓN"
      size="80%"
    >
      <Text className={classes.title}>Chọn món thay thế!</Text>

      <div className={classes.itemContainer}>
        {[...Array(10).keys()].map((_, index) => (
          <DishItem key={index} onButtonClick={handleButtonClick} />
        ))}
      </div>
    </Modal>
  );
};

export default ModalReplacementDish;
