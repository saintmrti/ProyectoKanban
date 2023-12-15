import { takeLatest, call, put, cancelled } from "redux-saga/effects";

import { fetchRequirementApi } from "../api";
import {
  fetchRequirementRequest,
  fetchRequirementSuccess,
  fetchRequirementError,
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
