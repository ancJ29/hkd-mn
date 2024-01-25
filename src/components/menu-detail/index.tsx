import Price from "@/components/menu-detail/price";
import QuantitySelector from "@/components/menu-detail/quantity-selector";
import { Menu } from "@/types";
import { Box, Flex, Image } from "@mantine/core";
import { useRef } from "react";
import classes from "./index.module.scss";

type MenuDetailProps = {
  menuItem?: Menu;
  totals: {
    [key: string]: number;
  };
  onChange: (total: number) => void;
};

const MenuDetail = ({ menuItem, totals, onChange }: MenuDetailProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const total = totals[menuItem?.id || "-"] || 0;

  const handleProductAdd = () => {
    ref.current?.classList.remove(classes.sendToCart);
    ref.current?.classList.add(classes.sendToCart);
    setTimeout(() => {
      ref.current?.classList.remove(classes.sendToCart);
    }, 900);
  };

  return (
    <Box className={classes.container}>
      <div ref={ref} className={classes.smallImage}>
        <Image src={menuItem?.image} />
      </div>

      <Image src={menuItem?.image} h="100%" />
      <Box className={classes.detail}>
        <Flex className={classes.priceContainer}>
          <Price menuItem={menuItem} />
          <QuantitySelector
            total={total}
            onChange={onChange}
            onProductAdd={handleProductAdd}
          />
        </Flex>
      </Box>
    </Box>
  );
};

export default MenuDetail;
