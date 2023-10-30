{
  /* cspell:disable */
}
import config from "@/configs/custom";
import { Cart } from "@/types";
import { toLocale } from "@/utils";
import { Box, Flex, Image, Modal, ScrollArea, Text } from "@mantine/core";
import { useMemo } from "react";

const CartModal = ({ cart, opened, onClose }: { cart: Cart; opened: boolean; onClose: () => void }) => {
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

  return (
    <Modal centered size='lg' opened={opened} onClose={onClose} withCloseButton={false}>
      <Modal.Title>
        <Flex p={9} align='center' justify='between' bg='#e78f3d' c='white'>
          <Text fw={700} w='100%'>
            注文内容の確認 | XEM LẠI MÓN
          </Text>
          <Image onClick={onClose} h={25} w={25} src='/images/close.png' />
        </Flex>
      </Modal.Title>
      <Modal.Body key={cart.updatedAt}>
        <Box px={5} py={10}>
          <Flex style={config.cartModal.row}>
            <Text component='div' w='70%' style={config.cartModal.rowText}>
              商品
              <br />
              <Text fw={800}>Tên món</Text>
            </Text>
            <Flex w='30%' justify='right' pr={12}>
              <Text component='div' style={config.cartModal.rowText}>
                お会計
                <br />
                <Text fw={800} style={config.cartModal.rowText}>
                  Thành Tiền
                </Text>
              </Text>
            </Flex>
          </Flex>
          <ScrollArea scrollbarSize={0}>
            <Box mih='20vh' mah='50vh'>
              {cart.items
                .filter((el) => el.quantity > 0)
                .map((item, index: number) => {
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
                      <Text ta='right' pr={12} w='50%' style={config.cartModal.rowText}>
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
                <Text w='60%' fz='1.1rem' fw={500} ta='right'>
                  Thành Tiền:
                </Text>
                <Text w='40%' fz='1.1rem' fw={500} ta='right'>
                  {toLocale(subTotal)}
                </Text>
              </Flex>
              <Flex w={"100%"} mb={4}>
                <Text w='60%' fz='1.1rem' fw={500} ta='right'>
                  VAT:
                </Text>
                <Text w='40%' fz='1.1rem' fw={500} ta='right'>
                  {toLocale(vat)}
                </Text>
              </Flex>
              <Flex>
                <Text w='60%' fz='1.1rem' fw={500} ta='right'>
                  Tổng Thành Tiền:
                </Text>
                <Text w='40%' fz='1.1rem' fw={500} ta='right' c='#ca3a30'>
                  {toLocale(total)}
                </Text>
              </Flex>
            </Box>
          </Flex>
        </Box>
      </Modal.Body>
    </Modal>
  );
};

export default CartModal;
