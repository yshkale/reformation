/* eslint-disable @typescript-eslint/no-explicit-any */
import Image from "next/image";
import { CartItem } from "../store/App/app.slice";

interface CartItemRenderer {
  cartItem: CartItem;
  handleCartItemRemove: any;
}

export const CartItemRenderer = ({
  cartItem,
  handleCartItemRemove,
}: CartItemRenderer) => {
  return (
    <div key={cartItem.productId} className="flex space-x-5 space-y-12">
      <Image
        src={cartItem.productInfo?.thumbnail || ""}
        width={200}
        height={200}
        alt="cart item thumbnail"
        className="w-18 h-max lg:w-24"
      />

      <div className="flex flex-col gap-1">
        <div>
          <div className="flex space-x-2 items-center">
            <h4 className="text-sm font-semibold lg:text-base">
              {cartItem.productInfo?.name}
            </h4>
            <p className="text-xs text-neutral-600 lg:text-sm">
              x {cartItem.quantity}
            </p>
          </div>
          <p className="text-sm text-neutral-700">
            {cartItem.productInfo?.price}
          </p>
        </div>

        <div className="flex space-x-2 items-center text-neutral-500 mb-3">
          {cartItem.variants?.map((variant) => {
            if (variant.variantName === "COLOR") {
              return (
                <div
                  key={variant.variantName}
                  className="w-3 h-3"
                  style={{ backgroundColor: variant.variantOption }}
                ></div>
              );
            }
            return (
              <p key={variant.variantName} className="text-sm">
                {variant.variantOption}
              </p>
            );
          })}
        </div>

        <div
          className="text-neutral-600 border-b border-neutral-300 text-xs w-fit -mt-1 cursor-pointer lg:text-sm"
          onClick={() =>
            handleCartItemRemove(cartItem.productId, cartItem.variants)
          }
        >
          Remove
        </div>
      </div>
    </div>
  );
};
