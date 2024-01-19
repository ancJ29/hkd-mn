import { Box, Flex, Image, Text } from "@mantine/core";
import classes from "./index.module.css";

type QuantitySelectorProps = {
  total: number;
  onChange: (total: number) => void;
  size?: number;
  totalClassName?: string;
};

const QuantitySelector = ({
  total,
  onChange,
  size = 120,
  totalClassName,
}: QuantitySelectorProps) => {
  return (
    <Flex justify="space-between" align="center">
      <Box h={size} mr={10}>
        <Image
          h={size}
          src={"/images/decrease.svg"}
          onClick={onChange.bind(null, Math.max(total - 1, 0))}
        />
      </Box>
      <Text className={`${totalClassName} ${classes.total}`}>{total}</Text>
      <Box h={size} ml={7}>
        <Image
          h={size}
          src={"/images/increase.svg"}
          onClick={onChange.bind(null, total + 1)}
        />
      </Box>
    </Flex>
  );
};

export default QuantitySelector;
