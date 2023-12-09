import { takeLatest, call, put, cancelled } from "redux-saga/effects";

import { fetchCapacityApi } from "../api";
import {
  fetchCapacityRequest,
  fetchCapacitySuccess,
  fetchCapacityError,
} from "../slices/capacity";

function* fetchCapacity() {
  try {
    const { data, isError } = yield call(fetchCapacityApi.run);
    if (isError) throw new Error();
    yield put(fetchCapacitySuccess({ data }));
  } catch (e) {
    yield put(fetchCapacityError());
  } finally {
    if (yield cancelled()) {
      yield call(fetchCapacityApi.cancel);
    }
  }
}

export function* fetchCapacitySaga() {
  yield takeLatest(fetchCapacityRequest.toString(), fetchCapacity);
}
