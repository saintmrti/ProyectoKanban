import { createSlice } from "@reduxjs/toolkit";
import _ from "lodash";

const Slice = createSlice({
  name: "capacity",
  initialState: {
    data: {},
    isFetching: false,
    didError: false,
  },
  reducers: {
    fetchCapacityRequest: (state) => {
      state.isFetching = true;
      state.didError = false;
    },
    fetchCapacitySuccess: (state, action) => {
      const { data } = action.payload;
      state.data = _.keyBy(data, "id");
      state.isFetching = false;
    },
    fetchCapacityError: (state) => {
      state.isFetching = false;
      state.didError = true;
    },
  },
});

export const {
  fetchCapacityRequest,
  fetchCapacitySuccess,
  fetchCapacityError,
} = Slice.actions;
export default Slice.reducer;
