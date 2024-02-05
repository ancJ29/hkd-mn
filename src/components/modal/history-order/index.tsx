import Modal from "@/components/modal";
import Price from "../cart/price";
import TableHeader from "../cart/table-header";
import classes from "./index.module.scss";
import TableItem from "./table-item";

type ModalHistoryOrderProps = {
  opened: boolean;
  onClose: () => void;
};

const ModalHistoryOrder = ({ opened, onClose }: ModalHistoryOrderProps) => {
  return (
    <Modal opened={opened} onClose={onClose} title="XEM LẠI MÓN">
      <TableHeader className={classes.columnRatio} />

      <div className={classes.itemContainer}>
        {[...Array(10).keys()].map((_, index) => (
          <TableItem key={index} className={classes.columnRatio} />
        ))}
      </div>

      <Price />
    </Modal>
  );
};

export default ModalHistoryOrder;
