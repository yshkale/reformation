"use client";

import { Search, ShoppingBag } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { setCartState } from "../../store/App/app.slice";

export const Header = () => {
  const dispatch = useDispatch();

  const openCart = () => {
    dispatch(setCartState("open"));
  };
  return (
    <header className="py-6 px-4 flex items-center justify-between border-b border-neutral-200">
      <Link href={"/"}>
        <Image
          src="/logo2x-light.webp"
          className="mr-auto"
          alt="logo"
          width={120}
          height={120}
        />
      </Link>

      <div className="flex items-center space-x-4">
        <Search size={20} className="cursor-pointer" strokeWidth={2} />
        <ShoppingBag size={20} className="cursor-pointer" onClick={openCart} />
      </div>
    </header>
  );
};
