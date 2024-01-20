import { Box, Flex, Image, Text } from "@mantine/core";
import classes from "./index.module.scss";

type QuantitySelectorProps = {
  total: number;
  onChange: (total: number) => void;
  size?: number;
  totalClassName?: string;
};

const QuantitySelector = ({ total, onChange, size = 50, totalClassName }: QuantitySelectorProps) => {
  return (
    <Flex justify="center" align="center">
      <Box h={size}>
        <Image w={size} src={"/images/decrease.svg"} onClick={onChange.bind(null, Math.max(total - 1, 0))} />
      </Box>
      <Text className={`${totalClassName} ${classes.total}`}>{total}</Text>
      <Box h={size}>
        <Image w={size} src={"/images/increase.svg"} onClick={onChange.bind(null, total + 1)} />
      </Box>
    </Flex>
  );
};

export default QuantitySelector;
