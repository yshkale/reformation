/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Search, ShoppingBag } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { setCartState } from "../../store/App/app.slice";

export const Header = () => {
  const dispatch = useDispatch();

  const cart = useSelector((state: any) => state.app.cartItems);

  const openCart = () => {
    dispatch(setCartState("open"));
  };
  return (
    <header className="py-6 px-4 lg:px-8 flex items-center justify-between border-b border-neutral-200">
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
        <div className="relative">
          <ShoppingBag
            size={20}
            className="cursor-pointer"
            onClick={openCart}
          />
          {cart?.length !== 0 && (
            <div className="absolute top-[0.80rem] -right-0.5">
              <span className="relative flex size-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-neutral-800 opacity-75"></span>
                <span className="relative inline-flex size-2 rounded-full bg-neutral-950"></span>
              </span>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
