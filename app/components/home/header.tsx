import { Search, ShoppingBag } from "lucide-react";
import Image from "next/image";

export const Header = () => {
  return (
    <header className="py-6 px-4 flex items-center justify-center border-b border-neutral-200">
      <Image
        src="/logo2x-light.webp"
        className="mr-auto"
        alt="logo"
        width={120}
        height={120}
      />

      <div className="flex items-center space-x-4">
        <Search size={20} className="cursor-pointer" strokeWidth={2} />
        <ShoppingBag size={20} className="cursor-pointer" />
      </div>
    </header>
  );
};
