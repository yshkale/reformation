/* eslint-disable @typescript-eslint/no-explicit-any */
import { call, put, takeLatest } from "redux-saga/effects";
import { PayloadAction } from "@reduxjs/toolkit";
import { ActionState } from "../../helper/constants";
import { createOrderService, getProductData } from "../../services";

export const Actions = {
  getProductBySlug: "get-product-by-slug/",
  addToCart: "add-to-cart/",
  createOrder: "create-order/",
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

function* createOrderSaga() {
  yield takeLatest(
    Actions.createOrder,
    function* (action: PayloadAction<any>): Generator<any> {
      try {
        yield put({
          type: Actions.createOrder + ActionState.PENDING,
          payload: {},
        });
        const orderData = action.payload;
        const data = yield call(async () => {
          return createOrderService(orderData);
        });
        yield put({
          type: Actions.createOrder + ActionState.FULFILLED,
          payload: data,
        });
        // You can add navigation logic here if needed
        // window.location.href = `/order/success?orderId=${data.orderId}`;
      } catch (err) {
        yield put({
          type: Actions.createOrder + ActionState.REJECTED,
          payload: err,
        });
      }
    }
  );
}

// Add these new saga functions
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
        const data = yield call(async () => {
          const response = await fetch("/api/create-order", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              amount: orderData.cartTotal + orderData.cartTotal * 0.08, // Including tax
              currency: "INR",
              receipt: `receipt_${Date.now()}`,
            }),
          });

          const result = await response.json();

          if (!result.success) {
            throw new Error(result.error);
          }

          return { ...result, orderData };
        });

        yield put({
          type: Actions.createRazorpayOrder + ActionState.FULFILLED,
          payload: data,
        });
      } catch (err: any) {
        yield put({
          type: Actions.createRazorpayOrder + ActionState.REJECTED,
          payload: err.message || err,
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
        const data = yield call(async () => {
          const response = await fetch("/api/verify-payment", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(paymentData),
          });

          const result = await response.json();

          if (!result.success) {
            throw new Error(result.error);
          }

          return result;
        });

        yield put({
          type: Actions.verifyRazorpayPayment + ActionState.FULFILLED,
          payload: data,
        });
      } catch (err: any) {
        yield put({
          type: Actions.verifyRazorpayPayment + ActionState.REJECTED,
          payload: err.message || err,
        });
      }
    }
  );
}

export const appSaga = [
  ...getProductBySlugSaga(),
  ...createOrderSaga(),
  ...createRazorpayOrderSaga(),
  ...verifyRazorpayPaymentSaga(),
];
