import { takeLatest, call, put, cancelled } from "redux-saga/effects";

import { fetchRequirementsApi } from "../api";
import {
  fetchRequirementsRequest,
  fetchRequirementsSuccess,
  fetchRequirementsError,
} from "../slices/requirements";

function* fetchRequirements() {
  try {
    const { data, isError } = yield call(fetchRequirementsApi.run);
    if (isError) throw new Error();
    yield put(fetchRequirementsSuccess({ data }));
  } catch (e) {
    yield put(fetchRequirementsError());
  } finally {
    if (yield cancelled()) {
      yield call(fetchRequirementsApi.cancel);
    }
  }
}

export function* fetchRequirementsSaga() {
  yield takeLatest(fetchRequirementsRequest.toString(), fetchRequirements);
}
