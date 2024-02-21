import Modal from "@/components/modal";
import { Menu } from "@/types";
import { CART } from "@/utils/cart";
import { useState } from "react";
import Price from "../cart/price";
import TableHeader from "../cart/table-header";
import classes from "./index.module.scss";
import TableItem from "./table-item";

type ModalHistoryOrderProps = {
  opened: boolean;
  onClose: () => void;
};

const ModalHistoryOrder = ({ opened, onClose }: ModalHistoryOrderProps) => {
  const [cart] = useState<Menu[]>(CART);

  return (
    <Modal opened={opened} onClose={onClose} title="XEM LẠI MÓN">
      <TableHeader className={classes.columnRatio} />

      <div className={classes.itemContainer}>
        {CART.map((e, i) => (
          <TableItem key={i} menu={e} className={classes.columnRatio} />
        ))}
      </div>

      <Price cart={cart} />
    </Modal>
  );
};

export default ModalHistoryOrder;
