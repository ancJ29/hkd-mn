import Price from "@/components/menu-detail/price";
import QuantitySelector from "@/components/menu-detail/quantity-selector";
import { Menu } from "@/types";
import { Box, Flex, Image } from "@mantine/core";
import { useRef, useState } from "react";
import classes from "./index.module.scss";

type MenuDetailProps = {
  menuItem?: Menu;
  totals: {
    [key: string]: number;
  };
  onChange: (total: number) => void;
};

const MenuDetail = ({ menuItem, totals, onChange }: MenuDetailProps) => {
  const imageRef = useRef<HTMLImageElement>(null);
  const total = totals[menuItem?.id || "-"] || 0;
  const [isMoving, setIsMoving] = useState(false);

  const handleProductAdd = () => {
    setIsMoving(true);
    imageRef.current?.classList.add(classes.sendToCart);
    setTimeout(() => {
      if (!isMoving) {
        imageRef.current?.classList.remove(classes.sendToCart);
        setIsMoving(false);
      }
    }, 600);
  };

  return (
    <Box className={classes.container}>
      <Image src={menuItem?.image} className={classes.smallImage} ref={imageRef} />

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
