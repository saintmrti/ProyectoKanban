import { takeLatest, call, put, cancelled } from "redux-saga/effects";

import { fetchRequirementApi, insertRequirementApi } from "../api";
import {
  fetchRequirementRequest,
  fetchRequirementSuccess,
  fetchRequirementError,
  insertRequirementRequest,
  insertRequirementSuccess,
  insertRequirementError,
} from "../slices/requirement";

function* fetchRequirement({ payload: { date } }) {
  try {
    const { data, isError } = yield call(fetchRequirementApi.run, date);
    if (isError) throw new Error();
    yield put(fetchRequirementSuccess({ data }));
  } catch (e) {
    yield put(fetchRequirementError());
  } finally {
    if (yield cancelled()) {
      yield call(fetchRequirementApi.cancel);
    }
  }
}

export function* fetchRequirementSaga() {
  yield takeLatest(fetchRequirementRequest.toString(), fetchRequirement);
}

function* insertRequirement({ payload }) {
  try {
    console.log(payload);
    const { data, isError } = yield call(insertRequirementApi.run, payload);
    if (isError) throw new Error();
    yield put(insertRequirementSuccess({ data }));
  } catch (e) {
    yield put(insertRequirementError());
  } finally {
    if (yield cancelled()) {
      yield call(insertRequirementApi.cancel);
    }
  }
}

export function* insertRequirementSaga() {
  yield takeLatest(insertRequirementRequest.toString(), insertRequirement);
}
