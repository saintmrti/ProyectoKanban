import { takeLatest, call, put, cancelled } from "redux-saga/effects";

import { insertSlicedApi } from "../api";
import {
  insertSlicedRequest,
  insertSlicedSuccess,
  insertSlicedError,
} from "../slices/sliced";

function* insertSliced({ payload }) {
  try {
    const { data, isError } = yield call(insertSlicedApi.run, payload);
    if (isError) throw new Error();
    yield put(insertSlicedSuccess({ data }));
  } catch (e) {
    yield put(insertSlicedError());
  } finally {
    if (yield cancelled()) {
      yield call(insertSlicedApi.cancel);
    }
  }
}

export function* insertSlicedSaga() {
  yield takeLatest(insertSlicedRequest.toString(), insertSliced);
}
