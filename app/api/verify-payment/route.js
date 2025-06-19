import crypto from "crypto";
import clientPromise from "../../lib/db"; // Add this import

// Helper function to generate order ID
function generateOrderId() {
  return "ORD-" + Math.floor(100000 + Math.random() * 900000);
}

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
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(razorpay_order_id + "|" + razorpay_payment_id)
      .digest("hex");

    console.log("Verifying payment signature...");

    if (generated_signature === razorpay_signature) {
      console.log("Payment verified successfully");

      // ** NEW CODE: Save order to MongoDB **
      try {
        // Connect to database
        const client = await clientPromise;
        const db = client.db("reformation");
        const ordersCollection = db.collection("orders");

        // Generate unique order ID
        const orderId = generateOrderId();

        // Create new order object for MongoDB
        const newOrder = {
          orderId: orderId,
          razorpayOrderId: razorpay_order_id,
          razorpayPaymentId: razorpay_payment_id,
          customerContact: {
            email: orderData.customerContact.email,
            receiveOffers: orderData.customerContact.receiveOffers || false,
          },
          customerDelivery: {
            country: orderData.customerDelivery.country,
            firstName: orderData.customerDelivery.firstName,
            lastName: orderData.customerDelivery.lastName || "",
            address: orderData.customerDelivery.address,
            city: orderData.customerDelivery.city,
            state: orderData.customerDelivery.state,
            pinCode: orderData.customerDelivery.pinCode,
            phone: orderData.customerDelivery.phone,
            saveInfo: orderData.customerDelivery.saveInfo || false,
          },
          cartItems: orderData.cartItems,
          cartTotal: orderData.cartTotal,
          shippingMethod: {
            method: orderData.shippingMethod?.method || "Express Shipping",
            cost: orderData.shippingMethod?.cost || "FREE",
          },
          paymentMethod: {
            method: orderData.paymentMethod?.method || "Razorpay Secure",
          },
          status: "paid", // Set to paid since payment is verified
          createdAt: new Date(),
          updatedAt: new Date(),
        };

        // Insert into database
        const result = await ordersCollection.insertOne(newOrder);

        if (!result.insertedId) {
          throw new Error("Failed to insert order into database");
        }

        console.log("Order saved to MongoDB successfully:", orderId);

        // Return the saved order
        return Response.json({
          success: true,
          order: newOrder,
          message: "Payment verified and order saved successfully",
        });
      } catch (dbError) {
        console.error("Error saving order to database:", dbError);
        return Response.json(
          {
            success: false,
            error: "Payment verified but failed to save order",
          },
          { status: 500 }
        );
      }
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
