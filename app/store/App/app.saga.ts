/* eslint-disable @typescript-eslint/no-explicit-any */
import { call, put, takeLatest } from "redux-saga/effects";
import { PayloadAction } from "@reduxjs/toolkit";
import { ActionState } from "../../helper/constants";
import { getProductData } from "../../services";

export const Actions = {
  getProductBySlug: "get-product-by-slug/",
  addToCart: "add-to-cart/",
  createRazorpayOrder: "create-razorpay-order/",
  verifyRazorpayPayment: "verify-razorpay-payment/",
};

function* getProductBySlugSaga() {
  yield takeLatest(
    Actions.getProductBySlug,
    function* (action: PayloadAction<string>): Generator<any> {
      try {
        yield put({
          type: Actions.getProductBySlug + ActionState.PENDING,
          payload: {},
        });

        const slug = action.payload;
        const data = yield call(async () => {
          return getProductData(slug);
        });

        yield put({
          type: Actions.getProductBySlug + ActionState.FULFILLED,
          payload: data,
        });
      } catch (err) {
        yield put({
          type: Actions.getProductBySlug + ActionState.REJECTED,
          payload: err,
        });
      }
    }
  );
}

// Updated saga functions with better error handling

function* createRazorpayOrderSaga() {
  yield takeLatest(
    Actions.createRazorpayOrder,
    function* (action: PayloadAction<any>): Generator<any> {
      try {
        yield put({
          type: Actions.createRazorpayOrder + ActionState.PENDING,
          payload: {},
        });

        const orderData = action.payload;

        // Calculate amount more carefully
        const baseAmount = parseFloat(orderData.cartTotal.toString());
        const taxAmount = baseAmount * 0.08; // 8% tax
        const totalAmount = baseAmount + taxAmount;

        console.log("Creating order with amount:", totalAmount);

        const data = yield call(async () => {
          const response = await fetch("/api/create-order", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              amount: totalAmount,
              currency: "INR",
              receipt: `receipt_${Date.now()}`,
            }),
          });

          if (!response.ok) {
            const errorText = await response.text();
            console.error("API Response Error:", response.status, errorText);
            throw new Error(`HTTP ${response.status}: ${errorText}`);
          }

          const result = await response.json();
          console.log("API Response:", result);

          if (!result.success) {
            throw new Error(result.error || "Unknown API error");
          }

          return { ...result, orderData };
        });

        yield put({
          type: Actions.createRazorpayOrder + ActionState.FULFILLED,
          payload: data,
        });
      } catch (err: any) {
        console.error("Saga Error:", err);
        yield put({
          type: Actions.createRazorpayOrder + ActionState.REJECTED,
          payload: err.message || err.toString(),
        });
      }
    }
  );
}

function* verifyRazorpayPaymentSaga() {
  yield takeLatest(
    Actions.verifyRazorpayPayment,
    function* (action: PayloadAction<any>): Generator<any> {
      try {
        yield put({
          type: Actions.verifyRazorpayPayment + ActionState.PENDING,
          payload: {},
        });

        const paymentData = action.payload;
        console.log("Verifying payment:", paymentData);

        const data = yield call(async () => {
          const response = await fetch("/api/verify-payment", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(paymentData),
          });

          if (!response.ok) {
            const errorText = await response.text();
            console.error(
              "Verify Payment API Error:",
              response.status,
              errorText
            );
            throw new Error(`HTTP ${response.status}: ${errorText}`);
          }

          const result = await response.json();
          console.log("Verify Payment Response:", result);

          if (!result.success) {
            throw new Error(result.error || "Payment verification failed");
          }

          return result;
        });

        yield put({
          type: Actions.verifyRazorpayPayment + ActionState.FULFILLED,
          payload: data,
        });
      } catch (err: any) {
        console.error("Payment Verification Error:", err);
        yield put({
          type: Actions.verifyRazorpayPayment + ActionState.REJECTED,
          payload: err.message || err.toString(),
        });
      }
    }
  );
}

export const appSaga = [
  ...getProductBySlugSaga(),
  ...createRazorpayOrderSaga(),
  ...verifyRazorpayPaymentSaga(),
];
