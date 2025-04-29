import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface CartItem {
  productId: string;
  quantity: number;
  variantName?: string;
  variantOption?: string;
  productInfo?: {
    name: string;
    price: string;
    compareWithPrice: string;
    thumbnail?: string;
  };
}

export interface AppState {
  cartState: "open" | "closed";
  cartItems: CartItem[];
  cartTotal: number;
}

const initialState: AppState = {
  cartState: "closed",
  cartItems: [],
  cartTotal: 0,
};

const slice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setCartState: (state, action: PayloadAction<"open" | "closed">) => {
      state.cartState = action.payload;
    },

    addToCart: (state, action: PayloadAction<CartItem>) => {
      const { productId, variantName, variantOption, quantity } =
        action.payload;

      const existingItemIndex = state.cartItems.findIndex(
        (item) =>
          item.productId === productId &&
          item.variantName === variantName &&
          item.variantOption === variantOption
      );

      if (existingItemIndex !== -1) {
        //update quantity
        state.cartItems[existingItemIndex].quantity += quantity || 1;
      } else {
        state.cartItems.push(action.payload);
      }
    },
  },
});

export const { setCartState, addToCart } = slice.actions;

export const AppReducer = slice.reducer;
