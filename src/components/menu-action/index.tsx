import config from "@/configs/custom";
import { Center, Flex, Image } from "@mantine/core";

const MenuAction = ({ onAdd, onRemove }: { onAdd: () => void; onRemove: () => void }) => {
  return (
    <Flex justify='between' align='center' w='100vw' h='4rem' style={config.menuAction}>
      <Center w='33%' onClick={onRemove}>
        {/* cspell:disable-next-line  */}
        BỎ
      </Center>
      <Image h='5rem' src='/divider.png' />
      <Center w='33%'>1</Center>
      <Image h='5rem' src='/divider.png' />
      <Center w='33%' onClick={onAdd}>
        {/* cspell:disable-next-line  */}
        CHỌN
      </Center>
    </Flex>
  );
};

export default MenuAction;
