/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ShoppingBasketIcon, XIcon } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import {
  CartItem,
  removeFromCart,
  SelectedVariant,
  setCartState,
} from "../store/App/app.slice";
import { Button } from "./ui/button";
import { CartItemRenderer } from "./CartItemRenderer";
import { useRouter } from "next/navigation";
import { Checkbox } from "./ui/checkbox";
import { useState } from "react";

export const Cart = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const cartState = useSelector((state: any) => state.app.cartState);
  const cart = useSelector((state: any) => state.app.cartItems);
  const cartTotal = useSelector((state: any) => state.app.cartTotal);

  const [termsConsent, setTermsConsent] = useState(false);

  const closeCart = () => {
    dispatch(setCartState("closed"));
  };

  const handleCartItemRemove = (
    productId: string,
    variants: SelectedVariant[]
  ) => {
    dispatch(
      removeFromCart({
        productId,
        variants,
      })
    );
  };

  const handleContinueShopping = () => {
    router.push("/");
    closeCart();
  };

  const handleCheckout = () => {
    router.push("/checkout");
    closeCart();
  };

  const handleCheckedChange = (checked: boolean) => {
    setTermsConsent(checked);
  };

  return (
    <AnimatePresence>
      {cartState !== "closed" && (
        <>
          {/* Overlay with blur effect */}
          <motion.div
            className="fixed inset-0 bg-black/40 backdrop-blur-xs z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
          />

          {/* Cart sidebar */}
          <motion.div
            className="fixed top-0 right-0 w-7/8 lg:w-3/9 h-full bg-white shadow-lg z-50 border-l border-t border-neutral-200 flex flex-col"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            exit={{ x: "100%" }}
          >
            <div className="p-6 border-b border-neutral-200 flex justify-between items-center">
              <h3 className="uppercase">Cart</h3>
              <XIcon size={19} onClick={closeCart} className="cursor-pointer" />
            </div>
            <section className="m-6 h-max mb-auto overflow-y-auto">
              {cart?.length === 0 ? (
                <div className="w-full flex flex-col space-y-4 items-center justify-center mt-60">
                  <ShoppingBasketIcon strokeWidth={1} size={60} />
                  <p className="text-sm">Your cart is currently empty.</p>

                  <Button
                    className="uppercase font-light text-xs tracking-wide"
                    onClick={handleContinueShopping}
                  >
                    Start Shopping
                  </Button>
                </div>
              ) : (
                cart?.map((cartItem: CartItem) => (
                  <CartItemRenderer
                    cartItem={cartItem}
                    key={cartItem.productId}
                    handleCartItemRemove={handleCartItemRemove}
                  />
                ))
              )}
            </section>
            {cart.length !== 0 && (
              <section className="text-xs text-center space-y-1 mx-6 mb-8 border-t border-neutral-200 pt-4">
                <p>Taxes and shipping calculated at checkout</p>
                <div className="flex items-center space-x-2 justify-center">
                  <Checkbox
                    checked={termsConsent}
                    onCheckedChange={handleCheckedChange}
                  />
                  <p>
                    I agree with the{" "}
                    <span className="border-b border-neutral-400">
                      terms and conditions
                    </span>
                  </p>
                </div>

                <Button
                  className="w-full mt-3"
                  onClick={handleCheckout}
                  disabled={!termsConsent}
                >
                  Checkout &nbsp; &middot; &nbsp; ${cartTotal}
                </Button>
              </section>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
