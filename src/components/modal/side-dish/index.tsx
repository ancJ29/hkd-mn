import Modal from "@/components/modal";
import SideDishItem from "@/components/modal/side-dish/side-dish-item";
import { Text } from "@mantine/core";
import classes from "./index.module.scss";

type ModalSideDishProps = {
  opened: boolean;
  onClose: () => void;
};

const ModalSideDish = ({ opened, onClose }: ModalSideDishProps) => {
  return (
    <Modal opened={opened} onClose={onClose} title="THÔNG TIN MÓN">
      <Text className={classes.title}>Chọn Set ăn kèm.</Text>

      <div className={classes.itemContainer}>
        {[...Array(10).keys()].map((_, index) => (
          <SideDishItem key={index} />
        ))}
      </div>

      <Text className={classes.pass}>{`BỎ QUA >`}</Text>
    </Modal>
  );
};

export default ModalSideDish;
