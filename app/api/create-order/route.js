// app/api/create-order/route.js
import Razorpay from "razorpay";

const razorpay = new Razorpay({
  key_id: process.env.NEXT_PUBLIC_RAZORPAY_ID,
  key_secret: process.env.NEXT_PUBLIC_RAZORPAY_SECRET,
});

export async function POST(request) {
  try {
    const { amount, currency = "INR", receipt } = await request.json();

    const options = {
      amount: amount * 100, // Razorpay expects amount in paise
      currency,
      receipt,
    };

    const order = await razorpay.orders.create(options);

    return Response.json({
      success: true,
      order,
    });
  } catch (error) {
    console.error("Error creating Razorpay order:", error);
    return Response.json(
      {
        success: false,
        error: error.message,
      },
      { status: 500 }
    );
  }
}
