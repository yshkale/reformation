"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { CartItem } from "../../store/App/app.slice";
import Image from "next/image";

interface OrderSummaryProps {
  cartItems: CartItem[];
  cartTotal: string;
}

export const OrderSummary = ({ cartItems, cartTotal }: OrderSummaryProps) => {
  // State to track if the accordion is expanded
  const [isExpanded, setIsExpanded] = useState(true);

  // Order data (hardcoded for now, will be props later)
  const orderData = {
    subtotal: 29.99,
    shipping: 2.99,
    tax: 2.22,
    total: 35.2,
    items: [
      { name: "T-shirt", quantity: 1, price: 19.99 },
      { name: "Socks", quantity: 2, price: 5.0 },
    ],
  };

  // Toggle accordion expansion
  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <section className="border-y border-neutral-300">
      {/* Header - always visible */}
      <div
        className="flex justify-between items-center cursor-pointer bg-neutral-200 px-4 py-5"
        onClick={toggleExpand}
      >
        <div className="flex items-center space-x-2 text-sm ">
          <p>Order summary</p>
          <motion.div
            animate={{ rotate: isExpanded ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <ChevronDown size={14} />
          </motion.div>
        </div>

        <p className="font-semibold">${orderData.total.toFixed(2)}</p>
      </div>

      {/* Expandable content */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="py-5 px-4 border-t border-neutral-300 bg-neutral-50 space-y-4">
              {cartItems?.length > 0 &&
                cartItems?.map((item: CartItem) => {
                  return (
                    <div className="flex space-x-4" key={item.productId}>
                      <Image
                        src={item.productInfo?.thumbnail || ""}
                        width={500}
                        height={500}
                        className="w-18 h-20 object-cover rounded-md border border-neutral-50"
                        alt="product-thumbnail"
                      />

                      <div className="mr-auto text-sm">
                        <p>{item.productInfo?.name}</p>
                        <div className="flex space-x-2 items-center text-neutral-500">
                          {item.variants?.map((variant) => {
                            if (variant.variantName === "COLOR") {
                              return (
                                <div
                                  key={variant.variantName}
                                  className="w-2.5 h-2.5"
                                  style={{
                                    backgroundColor: variant.variantOption,
                                  }}
                                ></div>
                              );
                            }
                            return (
                              <p key={variant.variantName} className="text-xs">
                                {variant.variantOption}
                              </p>
                            );
                          })}
                        </div>
                        <p className="text-xs text-neutral-400">
                          Quantity: {item.quantity}
                        </p>
                      </div>

                      <p className="text-sm">${cartTotal}</p>
                    </div>
                  );
                })}

              <div className="space-y-2 text-neutral-800 text-xs">
                <div className="flex justify-between items-center">
                  <p>Subtotal</p>
                  <p>$32.07</p>
                </div>
                <div className="flex justify-between items-center">
                  <p>Shipping</p>
                  <p>FREE</p>
                </div>
                <div className="flex justify-between items-center">
                  <p>Estimated Taxes</p>
                  <p>$0</p>
                </div>
              </div>

              <div className="flex justify-between items-center font-semibold">
                <p className="text-base">Total</p>
                <p>$32.07</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
