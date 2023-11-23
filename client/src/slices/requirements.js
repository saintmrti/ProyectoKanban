import { createSlice } from "@reduxjs/toolkit";
import _ from "lodash";

const Slice = createSlice({
  name: "requirements",
  initialState: {
    data: {},
    isFetching: false,
    didError: false,
  },
  reducers: {
    fetchRequirementsRequest: (state) => {
      state.isFetching = true;
      state.didError = false;
    },
    fetchRequirementsSuccess: (state, action) => {
      const { data } = action.payload;
      state.data = _.keyBy(data, "id");
      state.isFetching = false;
    },
    fetchRequirementsError: (state) => {
      state.isFetching = false;
      state.didError = true;
    },
  },
});

export const {
  fetchRequirementsRequest,
  fetchRequirementsSuccess,
  fetchRequirementsError,
} = Slice.actions;
export default Slice.reducer;
