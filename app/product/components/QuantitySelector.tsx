import { Minus, Plus } from "lucide-react";

export const QuantitySelector = () => {
  return (
    <div className="border border-neutral-900 flex items-center space-x-5 w-max px-3 py-2">
      <Minus size={12} />
      <span className="text-sm font-medium">1</span>
      <Plus size={12} />
    </div>
  );
};
