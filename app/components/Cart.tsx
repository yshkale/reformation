/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ShoppingBasketIcon, XIcon } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { setCartState } from "../store/App/app.slice";
import { Button } from "./ui/button";

export const Cart = () => {
  const dispatch = useDispatch();

  const cartState = useSelector((state: any) => state.app.cartState);
  const cart = useSelector((state: any) => state.app.cart);

  const closeCart = () => {
    dispatch(setCartState("closed"));
  };

  return (
    <AnimatePresence>
      {cartState !== "closed" && (
        <motion.div
          className="fixed top-0 right-0 w-7/8 h-full bg-white shadow-lg z-50 border-l border-t border-neutral-200"
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          exit={{ x: "100%" }}
        >
          <div className="p-6 border-b border-neutral-200 flex justify-between items-center">
            <h3 className="uppercase">Cart</h3>
            <XIcon size={19} onClick={closeCart} className="cursor-pointer" />
          </div>

          {cart.length === 0 && (
            <div className="h-full w-full flex flex-col space-y-4 items-center justify-center">
              <ShoppingBasketIcon strokeWidth={1} size={60} />

              <p className="text-sm">Your cart is currently empty.</p>

              <Button className="uppercase font-light text-xs tracking-wide">
                Start Shopping
              </Button>
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};
