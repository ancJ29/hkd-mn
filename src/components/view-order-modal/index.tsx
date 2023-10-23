{
  /* cspell:disable */
}
import config from "@/configs/custom";
import { Cart } from "@/types";
import { toLocale } from "@/utils";
import { Box, Flex, Image, Modal, ScrollArea, Text } from "@mantine/core";
import { useMemo } from "react";

const CartModal = ({ cart, opened, onClose }: { cart: Cart; opened: boolean; onClose: () => void }) => {
  const total = useMemo(
    () =>
      cart.items.reduce((total, item) => {
        return total + item.quantity * item.menu.price;
      }, 0),
    [cart.items],
  );

  return (
    <Modal centered size='lg' opened={opened} onClose={onClose} withCloseButton={false}>
      <Modal.Title>
        <Flex p={9} align='center' justify='between' bg='#e78f3d' c='white'>
          <Text fw={700} w='100%'>
            XEM LẠI MÓN | 料理名となります
          </Text>
          <Image onClick={onClose} h={25} w={25} src='/close.png' />
        </Flex>
      </Modal.Title>
      <Modal.Body key={cart.updatedAt}>
        <Box px={5} py={10}>
          <Flex style={config.cartModal.row}>
            <Text component='div' w='50%' style={config.cartModal.rowText}>
              料理名となります
              <br />
              <Text fw={800}>Tên món</Text>
            </Text>
            <Text component='div' ta='right' w='50%' style={config.cartModal.rowText}>
              料理名
              <br />
              <Text fw={800}>Thành Tiền</Text>
            </Text>
          </Flex>
          <ScrollArea>
            <Box mih='20vh' mah='40vh'>
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
                    <Text ta='right' w='50%' style={config.cartModal.rowText}>
                      {toLocale(item.menu.price * item.quantity)}
                    </Text>
                  </Flex>
                );
              })}
            </Box>
          </ScrollArea>
          <Flex justify='between' gap='xs' align='center'>
            <Box w='100%' pr={10}>
              <Flex w={"100%"}>
                <Text w='60%' fz='14px' fw={500} ta='right'>
                  Thành Tiền:
                </Text>
                <Text w='40%' fz='14px' fw={500} ta='right'>
                  {toLocale(total)}
                </Text>
              </Flex>
              <Flex>
                <Text w='60%' fz='14px' fw={500} ta='right'>
                  VAT(10%):
                </Text>
                <Text w='40%' fz='14px' fw={500} ta='right'>
                  {toLocale(0.1 * total)}
                </Text>
              </Flex>
              <Flex>
                <Text w='60%' fz='14px' fw={500} ta='right'>
                  Tổng Thành Tiền:
                </Text>
                <Text w='40%' fz='14px' fw={500} ta='right' c='#ca3a30'>
                  {toLocale(1.1 * total)}
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
