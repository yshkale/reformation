import { CartItem } from "../store/App/app.slice";

// Helper function to calculate cart total
export const calculateCartTotal = (cartItems: CartItem[]): number => {
  return cartItems.reduce((total, item) => {
    const itemPrice = item.productInfo?.price
      ? parseFloat(item.productInfo.price.replace(/[^0-9.-]+/g, ""))
      : 0;
    return total + itemPrice * item.quantity;
  }, 0);
};
