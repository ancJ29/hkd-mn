import { Center, Flex } from "@mantine/core";

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
      bg='#222'
      style={{
        border: "solid 1px",
        borderRadius: "5px",
        fontWeight: 700,
        fontSize: "1rem",
      }}
    >
      <Center w='33%' bg='white' style={{ border: "solid 1px", borderRadius: "5px" }} onClick={onDecrease}>
        -
      </Center>
      <Center c='white' w='33%'>
        {total}
      </Center>
      <Center w='33%' bg='white' style={{ border: "solid 1px", borderRadius: "5px" }} onClick={onIncrease}>
        +
      </Center>
    </Flex>
  );
};

export default Quantity;
