import mongoose from "mongoose";

// Define the schema for order items
const OrderItemSchema = new mongoose.Schema({
  productId: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    min: 1,
  },
  variants: [
    {
      variantName: String,
      variantOption: String,
    },
  ],
  productInfo: {
    name: String,
    price: String,
    compareWithPrice: String,
    thumbnail: String,
  },
});

// Define the main order schema
const OrderSchema = new mongoose.Schema({
  orderId: {
    type: String,
    required: true,
    unique: true,
  },

  // Customer information
  customerContact: {
    email: {
      type: String,
      required: true,
    },
    receiveOffers: {
      type: Boolean,
      default: false,
    },
  },

  customerDelivery: {
    country: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    pinCode: { type: String, required: true },
    phone: { type: String, required: true },
    saveInfo: { type: Boolean, default: false },
  },

  // Order details
  cartItems: [OrderItemSchema],
  cartTotal: {
    type: Number,
    required: true,
  },

  shippingMethod: {
    method: String,
    cost: String,
  },

  paymentMethod: {
    method: String,
  },

  // Order status and metadata
  status: {
    type: String,
    enum: [
      "pending",
      "confirmed",
      "processing",
      "shipped",
      "delivered",
      "cancelled",
    ],
    default: "pending",
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },

  updatedAt: {
    type: Number,
    default: Date.now,
  },
});

// Update the updatedAt field before saving
OrderSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

// Create the model, but check if it already exists to avoid re-compilation errors
const Order = mongoose.models.Order || mongoose.model("Order", OrderSchema);

export default Order;
