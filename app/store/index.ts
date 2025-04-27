/* eslint-disable @typescript-eslint/no-explicit-any */
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import { rootSaga } from "./sagas";

const sagaMiddleware = createSagaMiddleware();

// Combine multiple reducers using combineReducers - Add new reducers here
const rootReducer = combineReducers({});

export const store = configureStore({
  reducer: rootReducer,
  middleware: ((getDefaultMiddleware: any) =>
    getDefaultMiddleware().concat(sagaMiddleware)) as any,
  devTools: true,
});

sagaMiddleware.run(rootSaga);
