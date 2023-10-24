import { Flex, Image } from "@mantine/core";

const MenuNavigation = ({
  onCheck,
  onOrder,
}: {
  isPlaceOrder: boolean;
  onOrder?: () => void;
  onCheck?: () => void;
}) => {
  return (
    <Flex mt={4} mx={2} justify='between' align='center' w='100vw' c='white'>
      <Image w='40%' src='/images/cart.png' onClick={onOrder} />
      <Image h='3rem' mx={12} src='/images/home.png' />
      <Image w='40%' src='/images/check.png' onClick={onCheck} />
    </Flex>
  );
};

export default MenuNavigation;
