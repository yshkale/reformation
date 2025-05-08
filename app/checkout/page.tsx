"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */
import { ArrowLeftFromLine } from "lucide-react";
import Image from "next/image";
import { OrderSummary } from "./components/OrderSummary";
import { useSelector } from "react-redux";

export default function Page() {
  const cartItems = useSelector((state: any) => state.app.cartItems);
  const cartTotal = useSelector((state: any) => state.app.cartTotal);

  return (
    <main className="bg-neutral-100 h-screen">
      <div className="flex items-center justify-between p-6">
        <Image
          src={"/logo2x-light.webp"}
          width={500}
          height={500}
          alt="logo"
          className="w-40"
        />

        <ArrowLeftFromLine strokeWidth={2} size={21} />
      </div>

      <OrderSummary cartItems={cartItems} cartTotal={cartTotal} />
    </main>
  );
}
