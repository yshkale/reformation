import { NextResponse } from "next/server";
import clientPromise from "../../lib/db";

// Helper function to generate order ID
function generateOrderId() {
  return "ORD-" + Math.floor(100000 + Math.random() * 900000);
}

export async function POST(request) {
  try {
    // Connect to database using your existing connection
    const client = await clientPromise;
    const db = client.db("reformation"); // Replace with your actual database name
    const ordersCollection = db.collection("orders");

    // Parse the request body
    const orderData = await request.json();

    // Validate required fields
    if (!orderData.customerContact?.email) {
      return NextResponse.json(
        { error: "Customer email is required" },
        { status: 400 }
      );
    }

    if (
      !orderData.customerDelivery?.firstName ||
      !orderData.customerDelivery?.address ||
      !orderData.customerDelivery?.city
    ) {
      return NextResponse.json(
        { error: "Customer delivery information is incomplete" },
        { status: 400 }
      );
    }

    if (!orderData.cartItems || orderData.cartItems.length === 0) {
      return NextResponse.json(
        { error: "Cart cannot be empty" },
        { status: 400 }
      );
    }

    // Generate unique order ID
    const orderId = generateOrderId();

    // Create new order object
    const newOrder = {
      orderId: orderId,
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
      status: "pending",
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    // Insert into database
    const result = await ordersCollection.insertOne(newOrder);

    if (!result.insertedId) {
      throw new Error("Failed to insert order into database");
    }

    // Return success response with order details
    return NextResponse.json(
      {
        success: true,
        message: "Order created successfully",
        orderId: orderId,
        order: newOrder,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating order:", error);

    // Log the full error for debugging
    console.error("Full error details:", {
      message: error.message,
      stack: error.stack,
      name: error.name,
    });

    // Return more specific error information for debugging
    return NextResponse.json(
      {
        error: "Failed to create order. Please try again.",
        details:
          process.env.NODE_ENV === "development" ? error.message : undefined,
      },
      { status: 500 }
    );
  }
}
