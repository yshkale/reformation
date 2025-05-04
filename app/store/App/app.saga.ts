/* eslint-disable @typescript-eslint/no-explicit-any */
import { call, put, takeLatest } from "redux-saga/effects";
import { PayloadAction } from "@reduxjs/toolkit";
import { ActionState } from "../../helper/constants";
import { getProductData } from "../../services";

export const Actions = {
  getProductBySlug: "get-product-by-slug/",
  addToCart: "add-to-cart/",
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

export const appSaga = [...getProductBySlugSaga()];
