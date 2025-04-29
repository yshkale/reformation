import { createSlice, PayloadAction } from "@reduxjs/toolkit";
interface AppState {
  cartState: "open" | "closed";
  // Add other app-wide state as needed
}

const initialState: AppState = {
  cartState: "closed",
};

const slice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setCartState: (state, action: PayloadAction<"open" | "closed">) => {
      state.cartState = action.payload;
    },
  },
});

export const { setCartState } = slice.actions;

export const AppReducer = slice.reducer;
