import { Minus, Plus } from "lucide-react";
import { cn } from "../../lib/utils";

interface QuantitySelectorProps {
  quantity: number;
  setQuantity: (quantity: number) => void;
}

export const QuantitySelector = ({
  quantity,
  setQuantity,
}: QuantitySelectorProps) => {
  return (
    <div className="border border-neutral-900 flex items-center space-x-5 w-max px-3 py-2">
      <Minus
        size={12}
        className={`${cn(
          quantity === 1 && "pointer-events-none text-neutral-500"
        )}`}
        onClick={() => setQuantity(quantity - 1)}
      />
      <span className="text-sm font-medium">{quantity}</span>
      <Plus size={12} onClick={() => setQuantity(quantity + 1)} />
    </div>
  );
};
