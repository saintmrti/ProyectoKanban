import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";

import reducer from "../slices";
import initSagas from "../utilities/initSagas";

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer,
  middleware: [sagaMiddleware],
});

initSagas(sagaMiddleware);
