/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { FormEvent, useState } from "react";
import { CircleCheck, MonitorCheck, ShoppingBag } from "lucide-react";
import Image from "next/image";
import { OrderSummary } from "./components/OrderSummary";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import { OrderForm } from "./components/OrderForm";
import { Button } from "../components/ui/button";
import { Separator } from "../components/ui/separator";

import { useRouter } from "next/navigation";
import {
  updatePaymentMethod,
  updateShippingMethod,
} from "../store/App/app.slice";

export default function Page() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [isProcessing, setIsProcessing] = useState(false);

  const cartItems = useSelector((state: any) => state.app.cartItems);
  const cartTotal = useSelector((state: any) => state.app.cartTotal);
  const customerContact = useSelector(
    (state: any) => state.app.customerContact
  );
  const customerDelivery = useSelector(
    (state: any) => state.app.customerDelivery
  );
  const shippingMethod = useSelector((state: any) => state.app.shippingMethod);
  const paymentMethod = useSelector((state: any) => state.app.paymentMethod);

  // Set default shipping method when component mounts (if needed)
  const selectExpressShipping = () => {
    dispatch(
      updateShippingMethod({ method: "Express Shipping", cost: "FREE" })
    );
  };

  // Set default payment method
  const selectRazorpayPayment = () => {
    dispatch(updatePaymentMethod({ method: "Razorpay Secure" }));
  };

  // Handle form submission
  const handlePayNow = async (e: FormEvent) => {
    e.preventDefault();

    // Validate form fields
    if (!customerContact.email) {
      alert("Please enter your email");
      return;
    }

    if (
      !customerDelivery.country ||
      !customerDelivery.firstName ||
      !customerDelivery.address ||
      !customerDelivery.city ||
      !customerDelivery.state ||
      !customerDelivery.pinCode ||
      !customerDelivery.phone
    ) {
      alert("Please fill all required delivery fields");
      return;
    }

    // Prepare order data
    const orderData = {
      customerContact,
      customerDelivery,
      shippingMethod,
      paymentMethod,
      cartItems,
      cartTotal,
    };

    // For demonstration purposes, just log the data
    console.log("Order data ready for submission:", orderData);

    // Simulate payment process
    setIsProcessing(true);

    try {
      // Simulate API call to payment gateway
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Generate a random order ID
      const orderId = "ORD-" + Math.floor(100000 + Math.random() * 900000);

      // Redirect to success page
      router.push(`/order/success?orderId=${orderId}`);
    } catch (error) {
      console.error("Payment failed:", error);
      alert("Payment processing failed. Please try again.");
      setIsProcessing(false);
    }
  };

  return (
    <main className="bg-neutral-100 min-h-screen">
      <div className="flex items-center justify-between p-6">
        <Image
          src={"/logo2x-light.webp"}
          width={500}
          height={500}
          alt="logo"
          className="w-40"
        />

        <Link href={"/"}>
          <ShoppingBag strokeWidth={2} size={20} className="cursor-pointer" />
        </Link>
      </div>

      <OrderSummary cartItems={cartItems} cartTotal={cartTotal} />

      <OrderForm />

      <div className="mx-4 space-y-2">
        <h3 className="font-semibold text-lg">Shipping method</h3>

        <div
          className="mb-6 py-4 space-y-3 flex items-center justify-between text-sm border border-neutral-900 rounded-md px-4 cursor-pointer"
          onClick={selectExpressShipping}
        >
          <div className="flex space-x-2 items-center mb-0">
            <CircleCheck fill="#000" className="text-white" size={20} />
            <p>Express Shipping</p>
          </div>
          <p className="text-xs text-neutral-500">FREE</p>
        </div>
      </div>

      <div className="mx-4 space-y-2">
        <h3 className="font-semibold text-lg">Payment</h3>

        <div className="text-sm">
          <div
            className="flex items-center justify-between px-3 py-2 border border-neutral-950 rounded-t-md cursor-pointer"
            onClick={selectRazorpayPayment}
          >
            <p className="max-w-72">
              Razorpay Secure (UPI, Cards, Wallets, NetBanking)
            </p>
            <div className="flex space-x-2 items-center">
              <Image
                src={"/icons/visa.svg"}
                alt="payment icon"
                width={30}
                height={30}
              />
              <Image
                src={"/icons/mastercard.svg"}
                alt="payment icon"
                width={25}
                height={25}
              />
              <Image
                src={"/icons/american-express.svg"}
                alt="payment icon"
                width={25}
                height={25}
              />
              <div className="bg-white border border-neutral-300 px-1.5 h-6 text-xs flex items-center justify-center text-center rounded-sm">
                <p>+18</p>
              </div>
            </div>
          </div>

          <div className="border-b border-x border-neutral-400 rounded-b-md p-2 flex flex-col justify-center items-center space-y-1">
            <MonitorCheck
              className="text-neutral-500"
              size={90}
              strokeWidth={0.5}
            />
            <p className="text-center px-4 text-xs">
              After clicking &apos;Pay now&apos;, you will be redirected to
              Razorpay Secure (UPI, Cards, Wallets, NetBanking) to complete your
              purchase securely.
            </p>
          </div>
        </div>
      </div>

      <div className="mx-4 mt-10 mb-6">
        <Button
          className="px-6 rounded-sm w-full h-12"
          onClick={handlePayNow}
          disabled={isProcessing}
        >
          {isProcessing ? (
            <>
              <span className="animate-pulse">Processing</span>
              <span className="ml-2">...</span>
            </>
          ) : (
            "Pay now"
          )}
        </Button>
      </div>

      <Separator />

      <div className="flex flex-wrap gap-2 p-4 text-xs">
        <p className="underline whitespace-nowrap">Refund policy</p>
        <p className="underline whitespace-nowrap">Shipping policy</p>
        <p className="underline whitespace-nowrap">Privacy policy</p>
        <p className="underline whitespace-nowrap">Terms of service</p>
        <p className="underline whitespace-nowrap">Contact Information</p>
      </div>
    </main>
  );
}
