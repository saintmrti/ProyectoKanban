import { takeLatest, call, put, cancelled } from "redux-saga/effects";

import {
  fetchProductionApi,
  insertProductionApi,
  deleteProductionApi,
} from "../api";
import {
  fetchProductionRequest,
  fetchProductionSuccess,
  fetchProductionError,
  insertProductionRequest,
  insertProductionSuccess,
  insertProductionError,
  deleteProductionRequest,
  deleteProductionSuccess,
  deleteProductionError,
} from "../slices/production";

function* fetchProduction({ payload: { date } }) {
  try {
    const { data, isError } = yield call(fetchProductionApi.run, date);
    if (isError) throw new Error();
    yield put(fetchProductionSuccess({ data }));
  } catch (e) {
    yield put(fetchProductionError());
  } finally {
    if (yield cancelled()) {
      yield call(fetchProductionApi.cancel);
    }
  }
}

export function* fetchProductionSaga() {
  yield takeLatest(fetchProductionRequest.toString(), fetchProduction);
}

function* insertProduction({ payload }) {
  try {
    const { data, isError } = yield call(insertProductionApi.run, payload);
    if (isError) throw new Error();
    yield put(insertProductionSuccess({ data }));
  } catch (e) {
    yield put(insertProductionError());
  } finally {
    if (yield cancelled()) {
      yield call(insertProductionApi.cancel);
    }
  }
}

export function* insertProductionSaga() {
  yield takeLatest(insertProductionRequest.toString(), insertProduction);
}

function* deleteProduction({ payload: { idProd } }) {
  try {
    const { data, isError } = yield call(deleteProductionApi.run, idProd);
    if (isError) throw new Error();
    yield put(deleteProductionSuccess({ data }));
  } catch (e) {
    yield put(deleteProductionError());
  } finally {
    if (yield cancelled()) {
      yield call(deleteProductionApi.cancel);
    }
  }
}

export function* deleteProductionSaga() {
  yield takeLatest(deleteProductionRequest.toString(), deleteProduction);
}
