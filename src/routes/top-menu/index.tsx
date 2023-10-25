/* eslint-disable no-console */
import CartModal from "@/components/cart-modal";
import CategoryBand from "@/components/category-band";
import ConfirmModal from "@/components/confirm-modal";
import MenuAction from "@/components/menu-action";
import MenuDetail from "@/components/menu-detail";
import MenuList from "@/components/menu-list";
import MenuNavigation from "@/components/menu-navigation";
import ViewOrderModal from "@/components/view-order-modal";
import { getCategories, getMenuItems, order } from "@/services/menu";
import { Cart, Category, Menu } from "@/types";
import { cloneCart, scroll, swap } from "@/utils";
import { Flex } from "@mantine/core";
import { useToggle } from "@mantine/hooks";
import { useCallback, useEffect, useMemo, useState } from "react";

const blankMenuItem: Menu = {
  id: "",
  order: 0,
  foreignName: "",
  name: "",
  price: 0,
  inventory: 0,
  smallImage: "",
  image: "",
  categoryId: "",
};

const TopMenu = () => {
  const [x, setX] = useState("");
  const [y, setY] = useState("");
  const [updatedAt, setUpdatedAt] = useState(Date.now());
  const [page, setPage] = useState<number>(1);
  const [categories, setCategory] = useState<Category[]>([]);
  const [menuItems, setMenuItems] = useState<Menu[]>([]);
  const [selected, setSelected] = useState({ categoryId: "", menuId: "" });
  const [openConfirm, toggleConfirm] = useToggle([false, true]);
  const [openCart, toggleCart] = useToggle([false, true]);
  const [openView, toggleView] = useToggle([false, true]);
  const [isPlaceOrder, setIsPlaceOrder] = useState<boolean>(false);

  const lastPage = useMemo(() => {
    return Math.ceil(menuItems.length / 9);
  }, [menuItems]);

  const selectedMenuItem = useMemo(() => {
    return menuItems.find((item) => item.id === selected.menuId);
  }, [menuItems, selected.menuId]);

  const [cart, setCart] = useState<Cart>({
    items: [],
    total: 0,
    updatedAt: Date.now(),
  });

  const addToCart = useCallback(() => {
    if (!selectedMenuItem?.id) {
      return;
    }
    const _cart = cloneCart(cart);
    const menuId = selectedMenuItem.id;
    const item = _cart.items.find((el) => el.menuId === menuId);
    if (item) {
      item.quantity++;
    } else {
      _cart.items.unshift({
        menuId: selectedMenuItem?.id,
        quantity: 1,
        menu: selectedMenuItem,
      });
    }
    setCart(_cart);
    toggleCart();
  }, [cart, selectedMenuItem, toggleCart]);

  const removeFromCart = useCallback(() => {
    if (selected.menuId) {
      const _cart = cloneCart(cart);
      _cart.items = _cart.items.filter((el) => el.menuId !== selected.menuId);
      setCart(_cart);
      toggleCart();
    }
  }, [cart, selected.menuId, toggleCart]);

  const updateCartItems = useCallback(() => {
    setCart(cloneCart(cart));
    toggleCart();
  }, [cart, toggleCart]);

  const placeOrder = useCallback(
    async (cart: Cart) => {
      alert("Order successfully!");
      const _cart = cloneCart(cart);
      _cart.items = _cart.items.filter((el) => el.quantity > 0);
      setCart(_cart);
      await order(cart);
      toggleCart();
      setIsPlaceOrder(true);
    },
    [toggleCart],
  );

  const selectCategory = useCallback(
    (categoryId: string) => {
      if (selected.categoryId === categoryId) {
        return;
      }
      const menuItemIdx = menuItems.findIndex((el) => el.categoryId === categoryId);
      if (menuItemIdx > -1) {
        const _page = 1 + Math.floor(menuItemIdx / 9);
        const menuItem = menuItems[menuItemIdx];
        const targetId = page > _page ? menuItem.id : menuItems[(_page - 1) * 9 + 8].id;
        setSelected({ categoryId, menuId: menuItem.id });
        setX(categoryId);
        setY(targetId);
        setPage(_page);
      } else {
        setSelected({ categoryId, menuId: selected.menuId });
      }
    },
    [menuItems, page, selected],
  );

  const [prevColumn, setPrevColumn] = useState<number>(0);

  const updateCategoryByColumn = useCallback(
    (column: number) => {
      if (updatedAt + 1000 > Date.now()) return;
      if (column === prevColumn) return;
      setPrevColumn(column);
      const menuItem = menuItems[column * 3 - 3];
      if (menuItem.categoryId) {
        setX(menuItem.categoryId);
      }
      setPage(Math.floor(column / 3) + 1);
    },
    [menuItems, prevColumn, updatedAt],
  );

  const gotoPage = useCallback(
    (_page: number) => {
      const menuItem = menuItems[(_page - 1) * 9];
      const targetId = page > _page ? menuItem.id : menuItems[(_page - 1) * 9 + 8].id;
      setSelected({ categoryId: menuItem.categoryId, menuId: menuItem.id });
      setY(targetId);
      // setUpdatedAt(Date.now());
      setPage(_page);
    },
    [menuItems, page],
  );

  const selectMenuItem = useCallback(
    (id: string) => {
      const menuItem = menuItems.find((el) => el.id === id);
      if (menuItem?.categoryId) {
        setSelected({ categoryId: menuItem.categoryId, menuId: id });
      }
    },
    [menuItems],
  );

  useEffect(() => {
    getCategories().then((categories: Category[]) => {
      setCategory(categories);
      categories.sort((a, b) => a.order - b.order);
      setSelected({
        categoryId: categories[0]?.id || "",
        menuId: selected.menuId,
      });
    });
    getMenuItems().then((items) => {
      items.sort((a, b) => a.order - b.order);
      const _items = _build(items);
      setMenuItems(_items);
      setSelected({
        categoryId: selected.categoryId || items[0].categoryId,
        menuId: _items[0].id,
      });
      setCart({
        items: items.slice(0, 10).map((item) => ({
          menuId: item.id,
          quantity: 1,
          menu: item,
        })),
        total: 0,
        updatedAt: Date.now(),
      });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (y) {
      setUpdatedAt(Date.now());
      scroll(`menu-item.${y}`);
      if (selected.menuId !== y) {
        setSelected({ categoryId: selected.categoryId, menuId: y });
      }
    }
  }, [selected, y]);

  useEffect(() => {
    if (x) {
      // console.log("x", x);
      if (selected.categoryId !== x) {
        setUpdatedAt(Date.now());
        setSelected({ categoryId: x, menuId: selected.menuId });
        // console.log("scroll...", x);
        scroll(`category-item.${x}`);
      }
    }

  }, [selected, x]);

  return (
    <Flex direction='column' h='100vh' justify='flex-start' align='flex-center' p={2}>
      <CategoryBand categories={categories} selectedId={selected.categoryId} onSelect={selectCategory} />
      <MenuList
        page={page}
        lastPage={lastPage}
        menuItems={menuItems}
        onScrollToColumn={updateCategoryByColumn}
        selectedMenuItemId={selected.menuId}
        onSelect={selectMenuItem}
        onNextPage={() => gotoPage(Math.min(page + 1, lastPage))}
        onPrevPage={() => gotoPage(Math.max(page - 1, 1))}
      />
      <MenuDetail menuItem={selectedMenuItem} />
      <MenuAction
        onAdd={isPlaceOrder ? toggleConfirm : addToCart}
        onRemove={isPlaceOrder ? toggleConfirm : removeFromCart}
      />
      <MenuNavigation
        isPlaceOrder={isPlaceOrder}
        onOrder={isPlaceOrder ? toggleConfirm : toggleCart}
        onCheck={toggleView}
      />
      <ConfirmModal opened={openConfirm} onClose={toggleConfirm} />
      <ViewOrderModal key={`view.${cart.updatedAt}`} opened={openView} cart={cart} onClose={toggleView} />
      <CartModal
        key={`cart.${cart.updatedAt}`}
        cart={cart}
        opened={openCart}
        onOrder={placeOrder}
        onSave={updateCartItems}
      />
    </Flex>
  );
};

export default TopMenu;

function _build(items: Menu[]) {
  const _items = [];
  let counter = 0,
    categoryId = items[0].categoryId;
  for (const item of items) {
    if (categoryId == item.categoryId) {
      counter++;
      _items.push(item);
      continue;
    }
    const r = counter % 9;
    categoryId = item.categoryId;
    if (r > 5) {
      counter += 9 - r;
      Array(9 - r)
        .fill(null)
        .forEach(() => {
          _items.push({
            ...blankMenuItem,
            id: `${Date.now()}.${(Math.random() + 1).toString(36).substring(7)}`,
          });
        });
      _items.push(item);
      counter++;
    } else {
      counter++;
      _items.push(item);
    }
  }
  const SIZE = 9;
  for (let i = 0; i < _items.length; i += SIZE) {
    swap(_items, 1 + i, 3 + i);
    swap(_items, 2 + i, 6 + i);
    swap(_items, 5 + i, 7 + i);
  }
  return _items;
}
