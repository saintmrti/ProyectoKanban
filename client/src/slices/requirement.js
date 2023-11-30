import { createSlice } from "@reduxjs/toolkit";
import _ from "lodash";

const Slice = createSlice({
  name: "requirement",
  initialState: {
    data: {},
    isFetching: false,
    didError: false,
  },
  reducers: {
    fetchRequirementRequest: (state) => {
      state.isFetching = true;
      state.didError = false;
    },
    fetchRequirementSuccess: (state, action) => {
      const { data } = action.payload;
      state.data = _.keyBy(data, "id");
      state.isFetching = false;
    },
    fetchRequirementError: (state) => {
      state.isFetching = false;
      state.didError = true;
    },
  },
});

export const {
  fetchRequirementRequest,
  fetchRequirementSuccess,
  fetchRequirementError,
} = Slice.actions;
export default Slice.reducer;
