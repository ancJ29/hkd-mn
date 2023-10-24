/* eslint-disable no-console */
import { Menu } from "@/types";
import { Image } from "@mantine/core";
import { useIntersection } from "@mantine/hooks";
import { useEffect, useMemo } from "react";

type MenuItemProps = {
  menuItem: Menu;
  active?: boolean;
  containerRef: React.RefObject<HTMLDivElement>;
  prevCategoryId: string;
  nextCategoryId: string;
  onSelect?: (id: string) => void;
  onIntersect?: (id: string, prevId: string) => void;
};

const MenuItem = ({
  active,
  menuItem,
  containerRef,
  prevCategoryId,
  nextCategoryId,
  onSelect,
  onIntersect,
}: MenuItemProps) => {
  const isLastItem = useMemo(() => {
    return menuItem.categoryId !== nextCategoryId;
  }, [menuItem.categoryId, nextCategoryId]);
  const isNewCategory = useMemo(() => {
    return menuItem.categoryId !== prevCategoryId;
  }, [prevCategoryId, menuItem.categoryId]);
  const { ref, entry } = useIntersection({
    root: containerRef.current,
    threshold: 1,
  });
  useEffect(() => {
    if (onIntersect && isNewCategory && entry && entry.intersectionRect.x > 200) {
      const [from, to] = entry.isIntersecting
        ? [prevCategoryId, menuItem.categoryId]
        : [menuItem.categoryId, prevCategoryId];
      onIntersect(to, from);
    }
  }, [isNewCategory, onIntersect, menuItem.categoryId, prevCategoryId, entry, isLastItem]);
  return (
    <div id={`menu-item.${menuItem.id}`} ref={ref}>
      <Image
        bg='#ddd'
        w='32vw'
        radius='md'
        style={{
          border: active ? "solid 4px #f00" : "none",
          cursor: "pointer",
        }}
        onClick={() => onSelect && onSelect(menuItem.id)}
        src={menuItem.smallImage}
      />
    </div>
  );
};

export default MenuItem;
