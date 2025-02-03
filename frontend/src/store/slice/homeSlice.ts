import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { errorHelper } from "@/utils/errorHelper";
import { HomeSlice } from "@/types/home";
import { fetchFunction } from "@/utils/useFetchFunction";
const initialState: HomeSlice = {
  isLoading: false,
  homeData: null,
  error: null,
};
export const getHomeChart = createAsyncThunk(
  "get/home",
  async (_, thunkApi) => {
    try {
      const { data } = await fetchFunction({ url: "home" });
      thunkApi.dispatch(setHomeData(data));
    } catch (error: any) {
      errorHelper(error.message);
    }
  }
);
export const homeSlice = createSlice({
  name: "homeSlice",
  initialState,
  reducers: {
    setHomeData: (state, action) => {
      state.homeData = action.payload;
    },
  },
});

export const { setHomeData } = homeSlice.actions;
export default homeSlice.reducer;
