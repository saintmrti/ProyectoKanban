import { createSlice } from "@reduxjs/toolkit";
// import _ from "lodash";

const Slice = createSlice({
  name: "production",
  initialState: {
    data: {},
    isFetching: false,
    didError: false,
    isFetchingInsert: false,
    didErrorInsert: false,
  },
  reducers: {
    fetchProductionRequest: (state) => {
      state.isFetching = true;
      state.didError = false;
    },
    fetchProductionSuccess: (state, action) => {
      const { data } = action.payload;
      state.data = data;
      state.isFetching = false;
    },
    fetchProductionError: (state) => {
      state.isFetching = false;
      state.didError = true;
    },
    insertProductionRequest: (state) => {
      state.isFetchingInsert = true;
      state.didErrorInsert = false;
    },
    insertProductionSuccess: (state, action) => {
      const { data } = action.payload;
      state.data = data;
      state.isFetchingInsert = false;
    },
  },
});

export const {
  fetchProductionRequest,
  fetchProductionSuccess,
  fetchProductionError,
  insertProductionRequest,
  insertProductionSuccess,
  insertProductionError,
} = Slice.actions;
export default Slice.reducer;
