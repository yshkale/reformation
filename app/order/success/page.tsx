/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  CheckCircle,
  ArrowRight,
  MapPin,
  ShoppingBag,
  Calendar,
  Printer,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import { Separator } from "../../components/ui/separator";
import { resetCart } from "../../store/App/app.slice";

export default function Page() {
  const dispatch = useDispatch();

  const searchParams = useSearchParams();
  const orderId =
    searchParams.get("orderId") ||
    "ORD-" + Math.floor(100000 + Math.random() * 900000);

  const cartItems = useSelector((state: any) => state.app.cartItems);
  const cartTotal = useSelector((state: any) => state.app.cartTotal);
  const customerDelivery = useSelector(
    (state: any) => state.app.customerDelivery
  );
  const customerContact = useSelector(
    (state: any) => state.app.customerContact
  );

  const [estimatedDelivery, setEstimatedDelivery] = useState("");

  useEffect(() => {
    // Calculate estimated delivery date (5-7 days from now)
    const deliveryDate = new Date();
    deliveryDate.setDate(deliveryDate.getDate() + 5);

    // Format date as "May 25, 2025"
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    setEstimatedDelivery(deliveryDate.toLocaleDateString("en-US", options));
  }, []);

  const handleContinue = () => {
    dispatch(resetCart());
  };

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Header */}
      <header className="bg-white border-b border-neutral-200">
        <div className="container mx-auto p-6 flex justify-between items-center">
          <Link href="/">
            <Image
              src="/logo2x-light.webp"
              width={500}
              height={500}
              alt="logo"
              className="w-36"
            />
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto p-6 md:p-12 flex flex-col items-center">
        {/* Success Message */}
        <div className="w-full max-w-3xl mb-10 text-center">
          <div className="flex justify-center mb-4">
            <CheckCircle className="text-lime-600 h-14 w-14" strokeWidth={1} />
          </div>
          <h1 className="text-3xl font-bold mb-0.5">
            Thank you for your order!
          </h1>
          <p className="text-neutral-600 mb-5">
            Your order has been confirmed and will be shipping soon.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button
              asChild
              className="bg-neutral-800 hover:bg-neutral-900"
              onClick={handleContinue}
            >
              <Link href="/">Continue Shopping</Link>
            </Button>
            <Button variant="outline" className="flex items-center gap-2">
              <Printer size={16} />
              Print Receipt
            </Button>
          </div>
        </div>

        {/* Order Details Card */}
        <Card className="w-full max-w-3xl mb-8 border border-neutral-200 shadow-sm py-0 rounded-y-sm">
          <CardContent className="p-0">
            {/* Order ID and Date */}
            <div className="bg-neutral-100 p-6 rounded-t-2xl">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="font-semibold">Order #{orderId}</h2>
                  <p className="text-sm text-neutral-500">
                    {new Date().toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </div>
                <div className="flex items-center text-neutral-800 hover:text-neutral-600 text-sm">
                  Track Order
                  <ArrowRight size={16} className="ml-1" />
                </div>
              </div>
            </div>

            <Separator />

            {/* Order Summary */}
            <div className="p-6">
              <div className="grid md:grid-cols-2 gap-6">
                {/* Shipping Info */}
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <MapPin size={18} className="text-neutral-500" />
                    <h3 className="font-semibold text-sm">Shipping Details</h3>
                  </div>
                  <div className="text-sm text-neutral-700 space-y-1">
                    <p className="font-medium">
                      {customerDelivery.firstName} {customerDelivery.lastName}
                    </p>
                    <p>{customerDelivery.address}</p>
                    <p>
                      {customerDelivery.city}, {customerDelivery.state}{" "}
                      {customerDelivery.pinCode}
                    </p>
                    <p>{customerDelivery.country}</p>
                    <p className="mt-2">{customerContact.email}</p>
                    <p>{customerDelivery.phone}</p>
                  </div>
                </div>

                {/* Delivery Info */}
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <Calendar size={18} className="text-neutral-500" />
                    <h3 className="font-semibold text-sm">
                      Delivery Information
                    </h3>
                  </div>
                  <div className="text-sm text-neutral-700 space-y-1">
                    <p>
                      <span className="font-medium">Method:</span> Express
                      Shipping
                    </p>
                    <p>
                      <span className="font-medium">Estimated Delivery:</span>{" "}
                      {estimatedDelivery}
                    </p>
                    <div className="mt-4 pt-3 border-t border-neutral-200">
                      <div className="flex items-center gap-1.5">
                        <div className="h-2 w-2 rounded-full bg-green-500"></div>
                        <p className="text-xs font-medium">Order Confirmed</p>
                      </div>
                      <div className="ml-1 h-6 w-px bg-neutral-300"></div>
                      <div className="flex items-center gap-1.5">
                        <div className="h-2 w-2 rounded-full bg-neutral-300"></div>
                        <p className="text-xs">Processing</p>
                      </div>
                      <div className="ml-1 h-6 w-px bg-neutral-300"></div>
                      <div className="flex items-center gap-1.5">
                        <div className="h-2 w-2 rounded-full bg-neutral-300"></div>
                        <p className="text-xs">Shipped</p>
                      </div>
                      <div className="ml-1 h-6 w-px bg-neutral-300"></div>
                      <div className="flex items-center gap-1.5">
                        <div className="h-2 w-2 rounded-full bg-neutral-300"></div>
                        <p className="text-xs">Delivered</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <Separator />

            {/* Items */}
            <div className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <ShoppingBag size={18} className="text-neutral-500" />
                <h3 className="font-semibold">Order Items</h3>
              </div>

              <div className="space-y-4">
                {cartItems.map((item: any, index: number) => (
                  <div key={index} className="flex items-center gap-4">
                    <div className="bg-neutral-100 rounded-md p-2 flex-shrink-0">
                      {item.productInfo?.thumbnail ? (
                        <Image
                          src={item.productInfo.thumbnail}
                          width={60}
                          height={60}
                          alt={item.productInfo.name || "Product"}
                          className="object-contain"
                        />
                      ) : (
                        <div className="w-[60px] h-[60px] bg-neutral-200 flex items-center justify-center rounded">
                          <ShoppingBag size={24} className="text-neutral-400" />
                        </div>
                      )}
                    </div>
                    <div className="flex-grow">
                      <p className="font-medium">
                        {item.productInfo?.name || `Product #${item.productId}`}
                      </p>
                      {item.variants && item.variants.length > 0 && (
                        <p className="text-xs text-neutral-500">
                          {item.variants
                            ?.map((v: any) => {
                              if (v.variantName === "COLOR") {
                                return (
                                  <div
                                    key={v.variantName}
                                    className="w-3 h-3"
                                    style={{
                                      backgroundColor: v.variantOption,
                                    }}
                                  ></div>
                                );
                              }
                              return (
                                <p key={v.variantName} className="text-sm">
                                  {v.variantOption}
                                </p>
                              );
                            })
                            .join(", ")}
                        </p>
                      )}
                      <p className="text-sm text-neutral-700">
                        Quantity: {item.quantity}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">{item.productInfo?.price}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <Separator />

            {/* Order Summary */}
            <div className="p-6 bg-neutral-50 rounded-b-2xl">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <p>Subtotal</p>
                  <p>${cartTotal.toFixed(2)}</p>
                </div>
                <div className="flex justify-between text-sm">
                  <p>Shipping</p>
                  <p>Free</p>
                </div>
                <div className="flex justify-between text-sm">
                  <p>Tax</p>
                  <p>${(cartTotal * 0.08).toFixed(2)}</p>
                </div>
                <Separator className="my-2" />
                <div className="flex justify-between font-semibold">
                  <p>Total</p>
                  <p>${(cartTotal + cartTotal * 0.08).toFixed(2)}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Customer Support and Support Links */}
        <div className="w-full max-w-3xl text-center text-sm">
          <h3 className="text-lg font-medium mb-3">Need Help?</h3>
          <p className="text-neutral-600 mb-4">
            If you have any questions about your order, please contact our
            support team.
          </p>
          <div className="flex flex-wrap gap-4 justify-center mb-8">
            <Button variant="outline">Contact Support</Button>
            <Button variant="outline">Shipping Policy</Button>
            <Button variant="outline">Returns & Exchanges</Button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-neutral-200 py-6">
        <div className="container mx-auto px-6">
          <div className="flex flex-wrap space-x-3 space-y-1 text-xs justify-center text-neutral-500">
            <div className="hover:text-neutral-800">Refund policy</div>
            <div className="hover:text-neutral-800">Shipping policy</div>
            <div className="hover:text-neutral-800">Privacy policy</div>
            <div className="hover:text-neutral-800">Terms of service</div>
            <div className="hover:text-neutral-800">Contact Information</div>
          </div>
          <p className="text-center text-xs text-neutral-400 mt-6">
            &copy; {new Date().getFullYear()} Reformation. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
