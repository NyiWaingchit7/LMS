import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { config } from "../../utils/config";
import { headerOptions } from "../../utils/requestOption";
import { errorHelper } from "../../utils/errorHelper";
import { HomeSlice } from "../../types/home";
const initialState: HomeSlice = {
  isLoading: false,
  homeData: null,
  error: null,
};
export const getHomeChart = createAsyncThunk(
  "get/home",
  async (_, thunkApi) => {
    try {
      const response = await fetch(`${config.apiUrl}/home`, {
        method: "GET",
        headers: headerOptions(),
      });
      const data = await response.json();
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
