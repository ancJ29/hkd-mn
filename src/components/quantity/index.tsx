import { Center, Flex, Image } from "@mantine/core";

const Quantity = ({
  total,
  onIncrease,
  onDecrease,
}: {
  total: number;
  onIncrease?: () => void;
  onDecrease?: () => void;
}) => {
  return (
    <Flex
      w='100%'
      bg='#534E4D'
      style={{
        border: "solid 1px",
        borderRadius: "5px",
        fontWeight: 700,
        fontSize: "1rem",
      }}
      justify='space-between'
    >
      <Center w='33%'>
        <Image src='/svg/sub.svg' onClick={onDecrease} />
      </Center>
      <Center c='white' w='33%'>
        {total}
      </Center>
      <Center w='33%'>
        <Image src='/svg/add.svg' onClick={onIncrease} />
      </Center>
    </Flex>
  );
};

export default Quantity;
