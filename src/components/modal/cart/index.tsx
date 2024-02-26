import Modal from "@/components/modal";
import Price from "@/components/modal/cart/price";
import SpecialRequirements from "@/components/modal/cart/special-requirements";
import TableHeader from "@/components/modal/cart/table-header";
import TableItem from "@/components/modal/cart/table-item";
import ModalOrderSuccess from "@/components/modal/order-success";
import useTranslation from "@/hooks/useTranslation";
import { Menu } from "@/types";
import { toUpperCase } from "@/utils";
import { CART } from "@/utils/cart";
import { Button, Text } from "@mantine/core";
import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import classes from "./index.module.scss";

type ModalCartProps = {
  opened: boolean;
  onClose: () => void;
};

const ModalCart = ({ opened, onClose }: ModalCartProps) => {
  const t = useTranslation();
  const navigate = useNavigate();
  const [cart, setCart] = useState<Menu[]>(CART);
  const [isOpenedModalOrderSuccess, setIsOpenedModalOrderSuccess] = useState(false);

  const _onClose = () => {
    onClose();
    navigate("/");
  };

  const onOrderSuccess = () => {
    if (cart.length > 0) {
      onClose();
      setIsOpenedModalOrderSuccess(true);
    }
  };

  const onCloseModalOrderSuccess = () => {
    setIsOpenedModalOrderSuccess(false);
    navigate("/");
  };

  const handleChangeQuantity = useCallback((id: string, quantity: number) => {
    if (quantity === 0) {
      removeMenuItem(id);
    } else {
      setCart((prevCart) => {
        return prevCart.map((item) => {
          if (item.id === id) {
            return { ...item, quantity };
          }
          return item;
        });
      });
    }
  }, []);

  const removeMenuItem = (id: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  const handleChangeNote = (id: string, note: string) => {
    setCart((prevCart) => {
      return prevCart.map((item) => {
        if (item.id === id) {
          return { ...item, note };
        }
        return item;
      });
    });
  };

  return (
    <>
      <ModalOrderSuccess
        opened={isOpenedModalOrderSuccess}
        onClose={onCloseModalOrderSuccess}
      />

      <Modal opened={opened} onClose={_onClose} title="GIỎ HÀNG CỦA BẠN">
        <TableHeader className={classes.columnRatio} />

        <div className={classes.itemContainer}>
          {cart.map((e, i) => (
            <TableItem
              key={i}
              menu={e}
              onChangeQuantity={handleChangeQuantity.bind(null, e?.id || "-")}
              onChangeNote={handleChangeNote.bind(null, e?.id || "-")}
              className={classes.columnRatio}
            />
          ))}
        </div>

        <SpecialRequirements />

        <Price cart={cart} />

        <div className={classes.containerButton}>
          <Button className={classes.button} fullWidth onClick={onOrderSuccess}>
            <Text className={classes.buttonText}>{toUpperCase(t("Confirm"))}</Text>
          </Button>
        </div>
      </Modal>
    </>
  );
};

export default ModalCart;
