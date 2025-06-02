/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAction, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ActionState, AsyncState } from "../../helper/constants";
import { Product } from "../../types/product";
import { Actions } from "./app.saga";
import { calculateCartTotal } from "../../helper/calculateCartTotal";

export interface SelectedVariant {
  variantName: string;
  variantOption: string;
}

export interface CartItem {
  productId: string;
  quantity: number;
  variants?: SelectedVariant[];
  productInfo?: {
    name: string;
    price: string;
    compareWithPrice: string;
    thumbnail?: string;
  };
}

// New interfaces for customer data
export interface CustomerContact {
  email: string;
  receiveOffers: boolean;
}

export interface CustomerDelivery {
  country: string;
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  state: string;
  pinCode: string;
  phone: string;
  saveInfo: boolean;
}

export interface ShippingMethod {
  method: string;
  cost: string;
}

export interface PaymentMethod {
  method: string;
}

// Simplified AppState interface - remove redundant order states
export interface AppState {
  cartState: "open" | "closed";
  cartItems: CartItem[];
  cartTotal: number;

  currentProduct: Product | null;
  currentProductApiStatus: string;
  currentProductError: string;

  // Customer data
  customerContact: CustomerContact;
  customerDelivery: CustomerDelivery;
  shippingMethod: ShippingMethod;
  paymentMethod: PaymentMethod;

  // Only keep Razorpay order states (remove regular order states)
  createRazorpayOrderApiStatus: string;
  createRazorpayOrderError: string;
  razorpayOrder: any | null;

  // Payment verification
  verifyPaymentApiStatus: string;
  verifyPaymentError: string;

  // Final order after successful payment
  lastCreatedOrder: any | null;
}

// Updated initial state
const initialState: AppState = {
  cartState: "closed",
  cartItems: [],
  cartTotal: 0,

  currentProduct: null,
  currentProductApiStatus: AsyncState.IDLE,
  currentProductError: "",

  customerContact: {
    email: "",
    receiveOffers: false,
  },
  customerDelivery: {
    country: "",
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    state: "",
    pinCode: "",
    phone: "",
    saveInfo: false,
  },
  shippingMethod: {
    method: "Express Shipping",
    cost: "FREE",
  },
  paymentMethod: {
    method: "Razorpay Secure",
  },

  // Remove regular order states, keep only Razorpay flow
  createRazorpayOrderApiStatus: AsyncState.IDLE,
  createRazorpayOrderError: "",
  razorpayOrder: null,

  verifyPaymentApiStatus: AsyncState.IDLE,
  verifyPaymentError: "",
  lastCreatedOrder: null, // This gets set after successful payment verification
};

const slice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setCartState: (state, action: PayloadAction<"open" | "closed">) => {
      state.cartState = action.payload;
    },

    addToCart: (state, action: PayloadAction<CartItem>) => {
      const { productId, variants, quantity } = action.payload;

      // Helper function to compare variants arrays
      const areVariantsEqual = (
        variantsA?: SelectedVariant[],
        variantsB?: SelectedVariant[]
      ) => {
        // If both are undefined or empty, they are equal
        if (!variantsA?.length && !variantsB?.length) return true;
        // If only one is undefined/empty, they are not equal
        if (!variantsA?.length || !variantsB?.length) return false;
        // If counts don't match, they are not equal
        if (variantsA.length !== variantsB.length) return false;

        // Check if every variant in A has a matching variant in B
        return variantsA.every((variantA) => {
          return variantsB.some(
            (variantB) =>
              variantB.variantName === variantA.variantName &&
              variantB.variantOption === variantA.variantOption
          );
        });
      };

      const existingItemIndex = state.cartItems.findIndex(
        (item) =>
          item.productId === productId &&
          areVariantsEqual(item.variants, variants)
      );

      if (existingItemIndex !== -1) {
        // Update quantity
        state.cartItems[existingItemIndex].quantity += quantity || 1;
      } else {
        state.cartItems.push(action.payload);
      }

      // Update cart total after modifying items
      state.cartTotal = calculateCartTotal(state.cartItems);
    },

    removeFromCart: (
      state,
      action: PayloadAction<{ productId: string; variants?: SelectedVariant[] }>
    ) => {
      const { productId, variants } = action.payload;

      // Helper function to compare variants arrays (reuse the one from addToCart)
      const areVariantsEqual = (
        variantsA?: SelectedVariant[],
        variantsB?: SelectedVariant[]
      ) => {
        // If both are undefined or empty, they are equal
        if (!variantsA?.length && !variantsB?.length) return true;
        // If only one is undefined/empty, they are not equal
        if (!variantsA?.length || !variantsB?.length) return false;
        // If counts don't match, they are not equal
        if (variantsA.length !== variantsB.length) return false;
        // Check if every variant in A has a matching variant in B
        return variantsA.every((variantA) => {
          return variantsB.some(
            (variantB) =>
              variantB.variantName === variantA.variantName &&
              variantB.variantOption === variantA.variantOption
          );
        });
      };

      // Filter out the item that matches both productId and variants
      state.cartItems = state.cartItems.filter(
        (item) =>
          !(
            item.productId === productId &&
            areVariantsEqual(item.variants, variants)
          )
      );

      // Update cart total after modifying items
      state.cartTotal = calculateCartTotal(state.cartItems);
    },

    updateCartTotal: (state) => {
      state.cartTotal = calculateCartTotal(state.cartItems);
    },

    resetCart: (state) => {
      state.cartItems = [];
      state.cartTotal = 0;
    },

    resetProductState: (state) => {
      state.currentProduct = null;
      state.currentProductApiStatus = AsyncState.IDLE;
      state.currentProductError = "";
    },

    // Customer contact data actions
    updateCustomerContact: (
      state,
      action: PayloadAction<Partial<CustomerContact>>
    ) => {
      state.customerContact = {
        ...state.customerContact,
        ...action.payload,
      };
    },

    // Customer delivery data actions
    updateCustomerDelivery: (
      state,
      action: PayloadAction<Partial<CustomerDelivery>>
    ) => {
      state.customerDelivery = {
        ...state.customerDelivery,
        ...action.payload,
      };
    },

    // Shipping method actions
    updateShippingMethod: (state, action: PayloadAction<ShippingMethod>) => {
      state.shippingMethod = action.payload;
    },

    // Payment method actions
    updatePaymentMethod: (state, action: PayloadAction<PaymentMethod>) => {
      state.paymentMethod = action.payload;
    },

    resetPaymentState: (state) => {
      state.createRazorpayOrderApiStatus = AsyncState.IDLE;
      state.createRazorpayOrderError = "";
      state.razorpayOrder = null;
      state.verifyPaymentApiStatus = AsyncState.IDLE;
      state.verifyPaymentError = "";
      state.lastCreatedOrder = null;
    },
  },
  extraReducers: (builder) => {
    // Get Product By Slug
    builder.addCase(Actions.getProductBySlug + ActionState.PENDING, (state) => {
      state.currentProductApiStatus = AsyncState.PENDING;
    });
    builder.addCase(
      Actions.getProductBySlug + ActionState.FULFILLED,
      (state, action: PayloadAction<Product>) => {
        state.currentProduct = action.payload;
        state.currentProductApiStatus = AsyncState.FULFILLED;
      }
    );
    builder.addCase(
      Actions.getProductBySlug + ActionState.REJECTED,
      (state, action: PayloadAction<string>) => {
        state.currentProductError = action.payload;
        state.currentProductApiStatus = AsyncState.REJECTED;
      }
    );

    // Create Razorpay Order
    builder.addCase(
      Actions.createRazorpayOrder + ActionState.PENDING,
      (state) => {
        state.createRazorpayOrderApiStatus = AsyncState.PENDING;
      }
    );
    builder.addCase(
      Actions.createRazorpayOrder + ActionState.FULFILLED,
      (state, action: PayloadAction<any>) => {
        state.razorpayOrder = action.payload;
        state.createRazorpayOrderApiStatus = AsyncState.FULFILLED;
      }
    );
    builder.addCase(
      Actions.createRazorpayOrder + ActionState.REJECTED,
      (state, action: PayloadAction<string>) => {
        state.createRazorpayOrderError = action.payload;
        state.createRazorpayOrderApiStatus = AsyncState.REJECTED;
      }
    );

    // Verify Razorpay Payment
    builder.addCase(
      Actions.verifyRazorpayPayment + ActionState.PENDING,
      (state) => {
        state.verifyPaymentApiStatus = AsyncState.PENDING;
      }
    );
    builder.addCase(
      Actions.verifyRazorpayPayment + ActionState.FULFILLED,
      (state, action: PayloadAction<any>) => {
        state.lastCreatedOrder = action.payload.order;
        state.verifyPaymentApiStatus = AsyncState.FULFILLED;
      }
    );
    builder.addCase(
      Actions.verifyRazorpayPayment + ActionState.REJECTED,
      (state, action: PayloadAction<string>) => {
        state.verifyPaymentError = action.payload;
        state.verifyPaymentApiStatus = AsyncState.REJECTED;
      }
    );
  },
});

export const {
  setCartState,
  addToCart,
  removeFromCart,
  resetProductState,
  updateCartTotal,
  updateCustomerContact,
  updateCustomerDelivery,
  updateShippingMethod,
  updatePaymentMethod,
  resetCart,
  resetPaymentState,
} = slice.actions;

export const getProductBySlug = createAction<string>(Actions.getProductBySlug);
export const createRazorpayOrder = createAction<any>(
  Actions.createRazorpayOrder
);
export const verifyRazorpayPayment = createAction<any>(
  Actions.verifyRazorpayPayment
);

export const AppReducer = slice.reducer;
