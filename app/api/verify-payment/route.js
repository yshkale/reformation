// app/api/verify-payment/route.js
import crypto from "crypto";

export async function POST(request) {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      orderData,
    } = await request.json();

    // Create the signature to verify
    const generated_signature = crypto
      .createHmac("sha256", process.env.NEXT_PUBLIC_RAZORPAY_SECRET)
      .update(razorpay_order_id + "|" + razorpay_payment_id)
      .digest("hex");

    if (generated_signature === razorpay_signature) {
      // Payment is verified, save order to database
      console.log("Payment verified successfully");

      // Here you would typically save the order to your database
      const savedOrder = {
        orderId: `ORD-${Date.now()}`,
        razorpayOrderId: razorpay_order_id,
        razorpayPaymentId: razorpay_payment_id,
        status: "paid",
        ...orderData,
      };

      return Response.json({
        success: true,
        order: savedOrder,
        message: "Payment verified successfully",
      });
    } else {
      return Response.json(
        {
          success: false,
          error: "Invalid payment signature",
        },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error("Error verifying payment:", error);
    return Response.json(
      {
        success: false,
        error: error.message,
      },
      { status: 500 }
    );
  }
}
