import { createSlice } from "@reduxjs/toolkit";
import _ from "lodash";

const Slice = createSlice({
  name: "sliced",
  initialState: {
    data: {},
    isFetchingInsert: false,
    didErrorInsert: false,
  },
  reducers: {
    insertSlicedRequest: (state) => {
      state.isFetchingInsert = true;
      state.didErrorInsert = false;
    },
    insertSlicedSuccess: (state, { payload: { data } }) => {
      _.forEach(data, (item) => {
        state.data[item.id] = item;
      });
      state.isFetchingInsert = false;
    },
    insertSlicedError: (state) => {
      state.isFetchingInsert = false;
      state.didErrorInsert = true;
    },
  },
});

export const { insertSlicedRequest, insertSlicedSuccess, insertSlicedError } =
  Slice.actions;
export default Slice.reducer;
