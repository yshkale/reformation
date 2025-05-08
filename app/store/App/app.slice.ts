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

export interface AppState {
  cartState: "open" | "closed";
  cartItems: CartItem[];
  cartTotal: number;

  currentProduct: Product | null;
  currentProductApiStatus: string;
  currentProductError: string;
}

const initialState: AppState = {
  cartState: "closed",
  cartItems: [],
  cartTotal: 0,

  currentProduct: null,
  currentProductApiStatus: AsyncState.IDLE,
  currentProductError: "",
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

    resetProductState: (state) => {
      state.currentProduct = null;
      state.currentProductApiStatus = AsyncState.IDLE;
      state.currentProductError = "";
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
  },
});

export const {
  setCartState,
  addToCart,
  removeFromCart,
  resetProductState,
  updateCartTotal,
} = slice.actions;

export const getProductBySlug = createAction<string>(Actions.getProductBySlug);

export const AppReducer = slice.reducer;
