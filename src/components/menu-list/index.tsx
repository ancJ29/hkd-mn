/* eslint-disable no-console */
import MenuItem from "@/components/menu-item";
import { Menu } from "@/types";
import { Box, Image, ScrollArea } from "@mantine/core";


const boxStyle = {
  display: "grid",
  gridAutoFlow: "column",
  gridTemplateRows: "auto auto auto", // 3 row
  gridAutoColumns: "auto",
  gridGap: ".1rem",
};
type MenuListProps = {
  page: number;
  lastPage: number;
  selectedMenuItemId: string;
  menuItems: Menu[];
  onPrevPage: () => void;
  onNextPage: () => void;
  onSelect: (id: string) => void;
};

const MenuList = ({
  selectedMenuItemId,
  menuItems,
  page,
  lastPage,
  onPrevPage,
  onNextPage,
  onSelect,
}: MenuListProps) => {
  return (
    <Box
      style={{ position: "relative" }}
    >
      <ScrollArea
        scrollbarSize={0}
        type='auto'
        // onScrollPositionChange={(scrollPosition) => {
        //   setX(scrollPosition.x);
        //   if (scrollPosition.x > x) {
        //     console.log("scroll right");
        //     _onNextPage();
        //   // } else {
        //   //   onPrevPage();
        //   }
        // }}
      >
        <Box style={boxStyle}>
          {page > 1 && (
            <Image
              h={89}
              w={45}
              src='/images/left.svg'
              style={{
                position: "absolute",
                left: 0,
                top: "50%",
              }}
              onClick={onPrevPage}
            />
          )}
          {page < lastPage && (
            <Image
              onClick={onNextPage}
              h={89}
              w={45}
              src='/images/right.svg'
              style={{
                position: "absolute",
                right: 0,
                top: "50%",
              }}
            />
          )}
          {menuItems.map((menuItem) => {
            return (
              <MenuItem
                key={menuItem.id}
                menuItem={menuItem}
                active={menuItem.id === selectedMenuItemId}
                onSelect={onSelect}
              />
            );
          })}
        </Box>
      </ScrollArea>
    </Box>
  );
};

export default MenuList;
