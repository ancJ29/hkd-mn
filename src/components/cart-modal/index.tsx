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

  const total = useMemo(
    () =>
      cart.items.reduce((total, item) => {
        return total + item.quantity * item.menu.price;
      }, 0),
    [cart.items],
  );

  const onIncrease = useCallback(
    (item: CartItem) => {
      item.quantity++;
      setCart(cloneCart(cart));
    },
    [cart],
  );

  const onDecrease = useCallback(
    (item: CartItem) => {
      item.quantity = Math.max(item.quantity - 1, 0);
      setCart(cloneCart(cart));
    },
    [cart],
  );

  const onClose = useCallback(() => {
    onSave(cart);
  }, [cart, onSave]);

  return (
    <Modal centered size='lg' opened={opened} onClose={onClose} withCloseButton={false}>
      <Modal.Title>
        <Flex p={9} align='center' justify='between' bg='#3477ae' c='white'>
          <Text fw={700} w='100%'>
          ご注文内容 | CÁC MÓN ĐANG CHỌN
          </Text>
          <Image onClick={onClose} h={25} w={25} src='/close.png' />
        </Flex>
      </Modal.Title>
      <Modal.Body key={_cart.updatedAt}>
        <Box px={5} py={10}>
          <Flex style={config.cartModal.row}>
            <Text component='div' w='50%' style={config.cartModal.rowText}>
              商品
              <br />
              <Text fw={800}>Tên món</Text>
            </Text>
            <Text component='div' w='20%' style={config.cartModal.rowText}>
              数量
              <br />
              <Text fw={800}>Số lượng</Text>
            </Text>
            <Text component='div' ta='right' w='30%' style={config.cartModal.rowText}>
              お会計
              <br />
              <Text fw={800}>Thành Tiền</Text>
            </Text>
          </Flex>
          <ScrollArea scrollbarSize={0}>
            <Box mih='20vh' mah='60vh'>
              {cart.items.map((item, index: number) => {
                const style = { ...config.cartModal.row };
                if (index + 1 === cart.items.length) {
                  style.borderBottom = "none";
                }
                return (
                  <Flex style={style} key={item.menuId} align='center'>
                    <Text w='50%' style={config.cartModal.rowText}>
                      {item.menu.foreignName}
                      <br />
                      {item.menu.name}
                    </Text>
                    <Center w='20%'>
                      <Quantity
                        total={item.quantity}
                        onIncrease={() => onIncrease(item)}
                        onDecrease={() => onDecrease(item)}
                      />
                    </Center>
                    <Text ta='right' w='30%' style={config.cartModal.rowText}>
                      {toLocale(item.menu.price * item.quantity)}
                    </Text>
                  </Flex>
                );
              })}
            </Box>
          </ScrollArea>
          <Flex
            justify='between'
            gap='xs'
            align='center'
            py={12}
            style={{
              borderTop: "dotted 1px",
              borderColor: "#555",
            }}
          >
            <Box w='100%' pr={10}>
              <Flex w={"100%"} mb={4}>
                <Text w='60%' fz="1.1rem"fw={500} ta='right'>
                  Thành Tiền:
                </Text>
                <Text w='40%' fz="1.1rem"fw={500} ta='right'>
                  {toLocale(total)}
                </Text>
              </Flex>
              <Flex mb={4}>
                <Text w='60%' fz="1.1rem"fw={500} ta='right'>
                  VAT:
                </Text>
                <Text w='40%' fz="1.1rem"fw={500} ta='right'>
                  {toLocale(0.1 * total)}
                </Text>
              </Flex>
              <Flex>
                <Text w='60%' fz="1.1rem"fw={500} ta='right'>
                  Tổng Thành Tiền:
                </Text>
                <Text w='40%' fz="1.1rem"fw={500} ta='right' c='#ca3a30'>
                  {toLocale(1.1 * total)}
                </Text>
              </Flex>
            </Box>
            <Image h={"60px"} src='/order.png' onClick={() => onOrder(cart)} />
          </Flex>
        </Box>
      </Modal.Body>
    </Modal>
  );
};

export default CartModal;
