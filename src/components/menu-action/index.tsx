import config from "@/configs/custom";
import { Center, Flex, Image, Text } from "@mantine/core";

const MenuAction = ({ onAdd, onRemove }: { onAdd: () => void; onRemove: () => void }) => {
  return (
    <Flex justify='between' align='center' w='100vw' h='4rem' style={config.menuAction}>
      <Center w='33%' onClick={onRemove}>
        <Text ta="center" fw={800} c='white'>
          削除
          <br/>
          BỎ
        </Text>
      </Center>
      <Image h='5rem' src='/divider.png' />
      <Center w='33%'>1</Center>
      <Image h='5rem' src='/divider.png' />
      <Center w='33%' onClick={onAdd}>
        <Text ta="center" fw={800} c='white'>
          追加
          <br/>
          {/* cspell:disable-next-line  */}
          CHỌN
        </Text>
      </Center>
    </Flex>
  );
};

export default MenuAction;
