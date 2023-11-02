{
  /* cspell:disable */
}
import Quantity from "@/components/quantity";
import config from "@/configs/custom";
import { Cart, CartItem } from "@/types";
import { cloneCart, toLocale } from "@/utils";
import { Box, Center, Flex, Image, Modal, ScrollArea, Text } from "@mantine/core";
import cloneDeep from "lodash.clonedeep";
import { useCallback, useMemo, useState } from "react";

const CartModal = ({
  cart: _cart,
  opened,
  onOrder,
  onSave,
}: {
  cart: Cart;
  opened: boolean;
  onOrder: (cart: Cart) => Promise<void>;
  onSave: (cart: Cart) => void;
}) => {
  const [cart, setCart] = useState<Cart>(cloneDeep(_cart));

  const subTotal = useMemo(() => {
    if (cart.total) return cart.total;
    return cart.items.reduce((total, item) => {
      return total + item.quantity * item.menu.price;
    }, 0);
  }, [cart.items, cart.total]);

  const vat = useMemo(() => {
    if (cart.vat) return cart.vat;
    return 0.1 * subTotal;
  }, [subTotal, cart.vat]);

  const total = useMemo(() => {
    if (cart.total) return cart.total;
    return subTotal + vat;
  }, [vat, subTotal, cart.total]);

  const onIncrease = useCallback(
    (item: CartItem) => {
      item.quantity++;
      cart.subTotal = Math.round(cart.total + item.menu.price);
      cart.vat = Math.round(cart.vat + item.menu.price * 0.1);
      cart.total = Math.round(cart.total + item.menu.price * 1.1);
      setCart(cloneCart(cart));
    },
    [cart],
  );

  const onDecrease = useCallback(
    (item: CartItem) => {
      if (item.quantity === Math.max(item.quantity - 1, 0)) {
        return;
      }
      item.quantity = Math.max(item.quantity - 1, 0);
      cart.subTotal = Math.round(cart.total - item.menu.price);
      cart.vat = Math.round(cart.vat - item.menu.price * 0.1);
      cart.total = Math.round(cart.total - item.menu.price * 1.1);
      if (item.quantity === 0) {
        cart.items = cart.items.filter((i) => i.menuId !== item.menuId);
      }
      setCart(cloneCart(cart));
    },
    [cart],
  );

  const onClose = useCallback(() => {
    onSave(cart);
  }, [cart, onSave]);

  return (
    <Modal centered size='lg' opened={opened} onClose={onClose} withCloseButton={false} radius='1.4rem'>
      <Modal.Title>
        <Flex p={9} align='center' justify='between' bg='#3477ae' c='white'>
          <Text fw={700} w='100%'>
            ご注文内容 | CÁC MÓN ĐANG CHỌN
          </Text>
          <Image onClick={onClose} h={25} w={25} src='/images/close.png' />
        </Flex>
      </Modal.Title>
      <Modal.Body key={_cart.updatedAt}>
        <Box px={9} py={10}>
          <Flex style={config.cartModal.row}>
            <Text component='div' w={config.cartModal.widths[0]} style={config.cartModal.rowText}>
              商品
              <br />
              <Text fw={800}>Tên món</Text>
            </Text>
            <Text component='div' w={config.cartModal.widths[1]} style={config.cartModal.rowText}>
              数量
              <br />
              <Text fw={800}>Số lượng</Text>
            </Text>
            <Flex w={config.cartModal.widths[2]} justify='right'>
              <Text component='div' style={config.cartModal.rowText}>
                お会計
                <br />
                <Text fw={800}>Thành Tiền</Text>
              </Text>
            </Flex>
          </Flex>
          <ScrollArea scrollbarSize={0}>
            <Box mih='20vh' mah='50vh'>
              {cart.items.map((item, index: number) => {
                const style = { ...config.cartModal.row };
                if (index + 1 === cart.items.length) {
                  style.borderBottom = "none";
                }
                return (
                  <Flex style={style} key={item.menuId} align='center'>
                    <Text w={config.cartModal.widths[0]} style={config.cartModal.rowText}>
                      {item.menu.foreignName}
                      <br />
                      {item.menu.name}
                    </Text>
                    <Center w={config.cartModal.widths[1]}>
                      <Quantity
                        total={item.quantity}
                        onIncrease={() => onIncrease(item)}
                        onDecrease={() => onDecrease(item)}
                      />
                    </Center>
                    <Text ta='center' fw='bold' w={config.cartModal.widths[2]} style={config.cartModal.rowText}>
                      {toLocale(item.menu.price * item.quantity)}
                    </Text>
                  </Flex>
                );
              })}
            </Box>
          </ScrollArea>
          <Flex justify='space-between' gap='xs' align='center' pt={12} pb={6}>
            <Box w='100%' pr={10}>
              <Flex w={"100%"} mb={4}>
                <Text w='60%' fz='1rem' fw={700} ta='right'>
                  Thành Tiền:
                </Text>
                <Text w='40%' fz='1rem' fw={500} ta='right'>
                  {toLocale(subTotal)}
                </Text>
              </Flex>
              <Flex mb={4}>
                <Text w='60%' fz='1rem' fw={700} ta='right'>
                  VAT:
                </Text>
                <Text w='40%' fz='1rem' fw={500} ta='right'>
                  {toLocale(vat)}
                </Text>
              </Flex>
              <Flex>
                <Text w='60%' fz='1rem' fw={700} ta='right'>
                  Tổng Thành Tiền:
                </Text>
                <Text w='40%' fz='1rem' fw={500} ta='right' c='#ca3a30'>
                  {toLocale(total)}
                </Text>
              </Flex>
            </Box>
            <Image h='70px' src='/images/order.png' onClick={() => onOrder(cart)} />
          </Flex>
        </Box>
      </Modal.Body>
    </Modal>
  );
};

export default CartModal;
