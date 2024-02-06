import Modal from "@/components/modal";
import Price from "@/components/modal/cart/price";
import SpecialRequirements from "@/components/modal/cart/special-requirements";
import TableHeader from "@/components/modal/cart/table-header";
import TableItem from "@/components/modal/cart/table-item";
import ModalOrderSuccess from "@/components/modal/order-success";
import { Menu } from "@/types";
import { faker } from "@faker-js/faker";
import { Button, Text } from "@mantine/core";
import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import classes from "./index.module.scss";

type ModalCartProps = {
  opened: boolean;
  onClose: () => void;
};

const ModalCart = ({ opened, onClose }: ModalCartProps) => {
  const navigate = useNavigate();
  const [cart, setCart] = useState<Menu[]>(_cart);
  const [openedModalOrderSuccess, setOpenedModalOrderSuccess] = useState(false);

  const _onClose = () => {
    onClose();
    navigate("/");
  };

  const onOrderSuccess = () => {
    onClose();
    setOpenedModalOrderSuccess(true);
  };

  const onCloseModalOrderSuccess = () => {
    setOpenedModalOrderSuccess(false);
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
        opened={openedModalOrderSuccess}
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
            <Text className={classes.buttonText}>ĐẶT MÓN</Text>
          </Button>
        </div>
      </Modal>
    </>
  );
};

export default ModalCart;

const _int = faker.number.int;

const randomNumber = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

const _cart = [
  /* cspell:disable  */
  "Kanpachi sashimi",
  "Hokkigai sashimi",
  "Salmon sashimi",
  "Komochinisshin sashimi",
  "Kawahashi sashimi",
  "Katsuika sugata zukushi",
  "Hokkaido uni sashimi",
  "Kimmedai sashimi",
  "Ootoro sashimi",
  /* cspell:enable  */
].map((name, index) => {
  return {
    id: index.toString(),
    name,
    image: "",
    smallImage: "",
    quantity: randomNumber(1, 10),
    price: _int({ min: 50, max: 200 }) * 1e3,
  };
}) as Menu[];
