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
      align='center'
      bg='#534E4D'
      style={{
        borderRadius: ".4rem",
        border :".01rem solid #534E4D",
      }}
    >
      <Center style={{ flex: "1" }}>
        <Image src='/svg/sub.svg' onClick={onDecrease} />
      </Center>
      <Center c='white' fz={20} fw={900} style={{ flex: "1" }}>
        {total}
      </Center>
      <Center h='100%' style={{ flex: "1" }}>
        <Image h='100%' src='/svg/add.svg' onClick={onIncrease} />
      </Center>
    </Flex>
  );
};

export default Quantity;
