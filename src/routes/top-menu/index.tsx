/* eslint-disable no-console */
import CartModal from "@/components/cart-modal";
import CategoryBand from "@/components/category-band";
import ConfirmModal from "@/components/confirm-modal";
import MenuAction from "@/components/menu-action";
import MenuDetail from "@/components/menu-detail";
import MenuList from "@/components/menu-list";
import MenuNavigation from "@/components/menu-navigation";
import ViewOrderModal from "@/components/view-order-modal";
import config from "@/configs/custom";
import { getCategories, getMenuItems, order } from "@/services/menu";
import { Cart, Category, Menu } from "@/types";
import { cloneCart } from "@/utils";
import { Flex } from "@mantine/core";
import { useToggle } from "@mantine/hooks";
import { useCallback, useEffect, useMemo, useState } from "react";

function _scroll(id: string) {
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

const TopMenu = () => {
  const [categories, setCategory] = useState<Category[]>([]);
  const [menuItems, setMenuItems] = useState<Menu[]>([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState("");
  const [selectedMenuItemId, setSelectedMenuItemId] = useState("");
  const [openConfirm, toggleConfirm] = useToggle([false, true]);
  const [openCart, toggleCart] = useToggle([false, true]);
  const [openView, toggleView] = useToggle([false, true]);
  const [isPlaceOrder, setIsPlaceOrder] = useState<boolean>(false);

  const selectedMenuItem = useMemo(() => {
    return menuItems.find((item) => item.id === selectedMenuItemId);
  }, [menuItems, selectedMenuItemId]);

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
    if (selectedMenuItemId) {
      const _cart = cloneCart(cart);
      _cart.items = _cart.items.filter((el) => el.menuId !== selectedMenuItemId);
      setCart(_cart);
      toggleCart();
    }
  }, [cart, selectedMenuItemId, toggleCart]);

  const onSelectCategory = useCallback(
    (id: string) => {
      if (selectedCategoryId === id) {
        return;
      }
      setSelectedCategoryId(id);
      const menuItem = menuItems.find((el) => el.categoryId === id);
      if (menuItem) {
        setSelectedMenuItemId(menuItem.id);
        _scroll(`menu-item.${menuItem.id}`);
      }
    },
    [menuItems, selectedCategoryId],
  );

  const onIntersect = useCallback(
    (categoryId: string, prevCategoryId: string) => {
      if (categoryId && selectedCategoryId === prevCategoryId) {
        _scroll(`category-item.${categoryId}`);
        setSelectedCategoryId(categoryId);
      }
    },
    [selectedCategoryId],
  );

  useEffect(() => {
    getCategories().then((categories: Category[]) => {
      setCategory(categories);
      categories.sort((a, b) => a.order - b.order);
      setSelectedCategoryId(categories[0]?.id || "");
    });
    getMenuItems().then((items) => {
      items.sort((a, b) => a.order - b.order);
      setMenuItems(items);
      setSelectedMenuItemId(items[0].id);
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
  }, []);

  return (
    <Flex direction='column' justify='flex-start' align='flex-center' p={2} style={config.base}>
      <CategoryBand categories={categories} selectedId={selectedCategoryId} onSelect={onSelectCategory} />
      <MenuList
        selectedMenuItemId={selectedMenuItemId}
        menuItems={menuItems}
        onSelect={(id) => setSelectedMenuItemId(id)}
        onIntersect={onIntersect}
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
        onOrder={async (cart) => {
          alert("Order successfully!");
          const _cart = cloneCart(cart);
          _cart.items = _cart.items.filter((el) => el.quantity > 0);
          setCart(_cart);
          await order(cart);
          toggleCart();
          setIsPlaceOrder(true);
        }}
        onSave={(cart) => {
          setCart(cloneCart(cart));
          toggleCart();
        }}
      />
    </Flex>
  );
};

export default TopMenu;
