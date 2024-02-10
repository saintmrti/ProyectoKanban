import { createSlice } from "@reduxjs/toolkit";
import _ from "lodash";

const Slice = createSlice({
  name: "production",
  initialState: {
    data: {},
    isFetching: false,
    didError: false,
    isFetchingInsert: false,
    didErrorInsert: false,
    isFetchingDelete: false,
    didErrorDelete: false,
  },
  reducers: {
    fetchProductionRequest: (state) => {
      state.isFetching = true;
      state.didError = false;
    },
    fetchProductionSuccess: (state, action) => {
      const { data } = action.payload;
      state.data = _.keyBy(data, "idOrdenProduccion");
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
      state.data[data.idOrdenProduccion] = data;
      state.isFetchingInsert = false;
    },
    insertProductionError: (state) => {
      state.isFetchingInsert = false;
      state.didErrorInsert = true;
    },
    deleteProductionRequest: (state) => {
      state.isFetchingDelete = true;
      state.didErrorDelete = false;
    },
    deleteProductionSuccess: (state, action) => {
      const { data } = action.payload;
      delete state.data[parseInt(data)];
      state.isFetchingDelete = false;
    },
    deleteProductionError: (state) => {
      state.isFetchingDelete = false;
      state.didErrorDelete = true;
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
  deleteProductionRequest,
  deleteProductionSuccess,
  deleteProductionError,
} = Slice.actions;
export default Slice.reducer;
