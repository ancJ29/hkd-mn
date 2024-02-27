import Modal from "@/components/modal";
import Price from "@/components/modal/cart/price";
import TableHeader from "@/components/modal/cart/table-header";
import TableItem from "@/components/modal/history-order/table-item";
import useTranslation from "@/hooks/useTranslation";
import { Menu } from "@/types";
import { toUpperCase } from "@/utils";
import { CART } from "@/utils/cart";
import { useState } from "react";
import classes from "./index.module.scss";

type ModalHistoryOrderProps = {
  opened: boolean;
  onClose: () => void;
};

const ModalHistoryOrder = ({ opened, onClose }: ModalHistoryOrderProps) => {
  const t = useTranslation();
  const [cart] = useState<Menu[]>(CART);

  return (
    <Modal opened={opened} onClose={onClose} title={toUpperCase(t("View orders"))}>
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
