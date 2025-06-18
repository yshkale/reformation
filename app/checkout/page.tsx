/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { FormEvent, useEffect, useState } from "react";
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
  createRazorpayOrder,
  updatePaymentMethod,
  updateShippingMethod,
  verifyRazorpayPayment,
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

  const createOrderError = useSelector(
    (state: any) => state.app.createOrderError
  );
  const lastCreatedOrder = useSelector(
    (state: any) => state.app.lastCreatedOrder
  );

  const razorpayOrder = useSelector((state: any) => state.app.razorpayOrder);
  const createRazorpayOrderApiStatus = useSelector(
    (state: any) => state.app.createRazorpayOrderApiStatus
  );
  const verifyPaymentApiStatus = useSelector(
    (state: any) => state.app.verifyPaymentApiStatus
  );

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

    dispatch(createRazorpayOrder(orderData));
  };

  // Handle Razorpay order creation
  useEffect(() => {
    if (createRazorpayOrderApiStatus === "fulfilled" && razorpayOrder) {
      // Initialize Razorpay payment
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: razorpayOrder.order.amount,
        currency: razorpayOrder.order.currency,
        name: "Reformation", // Replace with your store name
        description: "Order Payment",
        order_id: razorpayOrder.order.id,
        handler: function (response: any) {
          // Check if payment was successful
          if (response.razorpay_payment_id) {
            // Payment successful, verify it
            dispatch(
              verifyRazorpayPayment({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                orderData: razorpayOrder.orderData,
              })
            );
          } else {
            // Payment failed
            alert("Payment failed. Please try again.");
            setIsProcessing(false);
          }
        },
        prefill: {
          name: `${customerDelivery.firstName} ${customerDelivery.lastName}`,
          email: customerContact.email,
          contact: customerDelivery.phone,
        },
        theme: {
          color: "#000000",
        },
        modal: {
          ondismiss: function () {
            setIsProcessing(false);
          },
        },
      };

      const razorpay = new (window as any).Razorpay(options);
      razorpay.open();
    }

    if (createRazorpayOrderApiStatus === "rejected") {
      alert("Failed to create order. Please try again.");
      setIsProcessing(false);
    }
  }, [
    createRazorpayOrderApiStatus,
    razorpayOrder,
    dispatch,
    customerContact,
    customerDelivery,
  ]);

  // Handle payment verification
  useEffect(() => {
    if (verifyPaymentApiStatus === "fulfilled" && lastCreatedOrder) {
      // Success! Redirect to success page
      router.push(`/order/success?orderId=${lastCreatedOrder.orderId}`);
    }

    if (verifyPaymentApiStatus === "rejected") {
      alert("Payment verification failed. Please contact support.");
      setIsProcessing(false);
    }
  }, [verifyPaymentApiStatus, lastCreatedOrder, router]);

  // Update the isProcessing state
  useEffect(() => {
    setIsProcessing(
      createRazorpayOrderApiStatus === "pending" ||
        verifyPaymentApiStatus === "pending"
    );
  }, [createRazorpayOrderApiStatus, verifyPaymentApiStatus]);

  // Redirect if cart is empty
  useEffect(() => {
    if (cartItems?.length === 0) {
      router.push("/");
    }
  }, [cartItems, router]);

  // Add this useEffect for better error tracking
  useEffect(() => {
    if (createRazorpayOrderApiStatus === "rejected") {
      console.error("Razorpay order creation failed:", createOrderError);
      alert(`Failed to create order: ${createOrderError || "Unknown error"}`);
      setIsProcessing(false);
    }
  }, [createRazorpayOrderApiStatus, createOrderError]);

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

      <section className="lg:flex lg:flex-row-reverse lg:border-t lg:border-neutral-200 lg:gap-10 lg:justify-center">
        <OrderSummary cartItems={cartItems} cartTotal={cartTotal} />
        <OrderForm />
      </section>

      <section className="lg:w-full">
        <div className="lg:ml-72 lg:flex lg:flex-col lg:justify-center lg:w-2/6">
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
                  Razorpay Secure (UPI, Cards, Wallets, NetBanking) to complete
                  your purchase securely.
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
        </div>
      </section>

      <Separator />

      <div className="flex flex-wrap gap-2 p-4 text-xs lg:ml-72">
        <p className="underline whitespace-nowrap">Refund policy</p>
        <p className="underline whitespace-nowrap">Shipping policy</p>
        <p className="underline whitespace-nowrap">Privacy policy</p>
        <p className="underline whitespace-nowrap">Terms of service</p>
        <p className="underline whitespace-nowrap">Contact Information</p>
      </div>
    </main>
  );
}
