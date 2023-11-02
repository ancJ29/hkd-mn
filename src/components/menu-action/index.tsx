import config from "@/configs/custom";
import { Center, Flex, Image } from "@mantine/core";

const h = "3.5rem";
const MenuAction = ({ onAdd, onRemove }: { onAdd: () => void; onRemove: () => void }) => {
  return (
    <Flex justify='space-between' align='center' w='100%' h={h} style={config.menuAction} mx={2}>
      <Image h={h} src='/images/remove.png' onClick={onRemove} />
      <Image h={h} src='/images/divider.png' />
      <Center w='33%' c='white'>
        1
      </Center>
      <Image h={h} src='/images/divider.png' />
      <Image h={h} src='/images/add.png' onClick={onAdd} />
    </Flex>
  );
};

export default MenuAction;
