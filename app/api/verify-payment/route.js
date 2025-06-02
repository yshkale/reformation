import crypto from "crypto";

export async function POST(request) {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      orderData,
    } = await request.json();

    // Validate required fields
    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return Response.json(
        {
          success: false,
          error: "Missing required payment verification data",
        },
        { status: 400 }
      );
    }

    // Create the signature to verify
    const generated_signature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET) // Remove NEXT_PUBLIC_ prefix
      .update(razorpay_order_id + "|" + razorpay_payment_id)
      .digest("hex");

    console.log("Verifying payment signature...");

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
      console.error("Payment signature verification failed");
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
        error: error.message || "Payment verification failed",
      },
      { status: 500 }
    );
  }
}
