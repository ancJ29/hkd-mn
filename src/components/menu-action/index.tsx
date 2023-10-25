import config from "@/configs/custom";
import { Center, Flex, Image } from "@mantine/core";

const MenuAction = ({ onAdd, onRemove }: { onAdd: () => void; onRemove: () => void }) => {
  return (
    <Flex justify='between' align='center' w='100vw' h='4rem' style={config.menuAction}>
      <Image h='4rem' src='/images/remove.png' onClick={onRemove} />
      <Image h='4rem' src='/images/divider.png' />
      <Center w='33%' bg="#bd4017" c="white">1</Center>
      <Image h='4rem' src='/images/divider.png' />
      <Image h='4rem' src='/images/add.png' onClick={onAdd} />
    </Flex>
  );
};

export default MenuAction;
