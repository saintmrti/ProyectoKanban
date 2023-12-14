import { takeLatest, call, put, cancelled } from "redux-saga/effects";

import { fetchProductionApi, insertProductionApi } from "../api";
import {
  fetchProductionRequest,
  fetchProductionSuccess,
  fetchProductionError,
  insertProductionRequest,
  insertProductionSuccess,
  insertProductionError,
} from "../slices/production";

function* fetchProduction() {
  try {
    const { data, isError } = yield call(fetchProductionApi.run);
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
