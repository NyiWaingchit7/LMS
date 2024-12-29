import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { CreateSetting, SettingSlice } from "../../types/setting";
import { fetchFunction } from "../../utils/useFetchFunction";
import toast from "react-hot-toast";
const initialState: SettingSlice = {
  data: null,
  isLoading: false,
  error: null,
};

export const getSetting = createAsyncThunk(
  "get/setting",
  async (_, thunkApi) => {
    try {
      const { data, response } = await fetchFunction({ url: "settings" });
      if (!response.ok) {
        toast.error(data.message);
        return;
      }
      thunkApi.dispatch(setSetting(data.settings));
    } catch (error) {
      console.log(error);
    }
  }
);

export const createSetting = createAsyncThunk(
  "create/setting",
  async (option: CreateSetting, thunkApi) => {
    try {
      const { settings, onSuccess } = option;
      const { data, response } = await fetchFunction({
        url: "settings",
        body: JSON.stringify({ ...settings }),
        method: "POST",
      });
      if (!response.ok) {
        thunkApi.dispatch(setSettingError(data.errors));
        return;
      }
      onSuccess && onSuccess();
    } catch (error) {
      console.log(error);
    }
  }
);

export const settingSlice = createSlice({
  name: "settingSlice",
  initialState,
  reducers: {
    setSetting: (state, action) => {
      state.data = action.payload;
    },
    setSettingError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { setSetting, setSettingError } = settingSlice.actions;
export default settingSlice.reducer;
