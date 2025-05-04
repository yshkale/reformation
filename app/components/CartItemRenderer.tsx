import Image from "next/image";
import { CartItem } from "../store/App/app.slice";
import { Minus, Plus, Trash2Icon } from "lucide-react";
import { cn } from "../lib/utils";

interface CartItemRenderer {
  cartItem: CartItem;
}

export const CartItemRenderer = ({ cartItem }: CartItemRenderer) => {
  return (
    <div key={cartItem.productId} className="flex space-x-4 space-y-12">
      <Image
        src={cartItem.productInfo?.thumbnail || ""}
        width={200}
        height={200}
        alt="cart item thumbnail"
        className="w-18 h-max"
      />

      <div className="flex flex-col gap-1">
        <div>
          <h4 className="text-sm font-semibold">
            {cartItem.productInfo?.name}
          </h4>
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

        <div className="flex items-center space-x-2">
          <div className="border border-neutral-300 flex items-center space-x-4 w-max px-3 py-1.5">
            <Minus
              size={12}
              className={`${cn(
                cartItem.quantity === 1 &&
                  "pointer-events-none text-neutral-500"
              )}`}
            />
            <span className="text-xs font-medium">{cartItem.quantity}</span>
            <Plus size={12} />
          </div>

          <Trash2Icon size={15} className="text-red-700" />
        </div>
      </div>
    </div>
  );
};
