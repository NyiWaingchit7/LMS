import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { errorHelper } from "../../utils/errorHelper";
import { config } from "../../utils/config";
import { headerOptions } from "../../utils/requestOption";
import {
  CreateLecture,
  DeleteLecture,
  LectureSlice,
  UpdateLecture,
} from "../../types/lecture";
const initialState: LectureSlice = {
  items: [],
  data: {
    id: undefined,
    title: "",
    description: "",
    price: 0,
    discount_price: 0,
    isPremium: false,
    assetUrl: "",
    categories: [],
  },
  isLoading: false,
  error: null,
};

export const handleGetLecture = createAsyncThunk(
  "get/lecture",
  async (option, thunkApi) => {
    try {
      const response = await fetch(`${config.apiUrl}/lectures`, {
        method: "GET",
        headers: headerOptions,
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message);
      }

      thunkApi.dispatch(setLecture(data.lectures));
    } catch (error: any) {
      errorHelper(error.message);
    }
  }
);
export const handleShowLecture = createAsyncThunk(
  "show/lecture",
  async (id: number, thunkApi) => {
    try {
      const response = await fetch(`${config.apiUrl}/lectures/${id}`, {
        method: "GET",
        headers: headerOptions,
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message);
      }

      thunkApi.dispatch(setData(data.lecture));
    } catch (error: any) {
      errorHelper(error.message);
    }
  }
);
export const handleCreateLecture = createAsyncThunk(
  "creat/lecture",
  async (option: CreateLecture, thunkApi) => {
    const {
      title,
      description,
      price,
      discount_price,
      isPremium,
      assetUrl,
      categories,
      onSuccess,
    } = option;
    try {
      const response = await fetch(`${config.apiUrl}/lectures`, {
        method: "POST",
        headers: headerOptions,
        body: JSON.stringify({
          title,
          description,
          price,
          discount_price,
          isPremium,
          assetUrl,
          categories,
        }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message);
      }

      onSuccess && onSuccess();
    } catch (error: any) {
      errorHelper(error.message);
    }
  }
);

export const handleUpdateLecture = createAsyncThunk(
  "update/lecture",
  async (option: UpdateLecture, thunkApi) => {
    const {
      id,
      title,
      description,
      price,
      discount_price,
      isPremium,
      assetUrl,
      categories,
      onSuccess,
    } = option;
    try {
      const response = await fetch(`${config.apiUrl}/lectures/${id}`, {
        method: "PUT",
        headers: headerOptions,
        body: JSON.stringify({
          title,
          description,
          price,
          discount_price,
          isPremium,
          assetUrl,
          categories,
        }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message);
      }

      onSuccess && onSuccess();
    } catch (error: any) {
      errorHelper(error.message);
    }
  }
);

export const handleDeleteLecture = createAsyncThunk(
  "delete/lecture",
  async (option: DeleteLecture, thunkApi) => {
    const { id, onSuccess } = option;
    try {
      const response = await fetch(`${config.apiUrl}/lectures/${id}`, {
        method: "DELETE",
        headers: headerOptions,
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message);
      }
      onSuccess && onSuccess();
    } catch (error: any) {
      errorHelper(error.message);
    }
  }
);

export const lectureSlice = createSlice({
  name: "lectureSlice",
  initialState,
  reducers: {
    setLecture: (state, action) => {
      state.items = action.payload;
    },
    setData: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const { setLecture, setData } = lectureSlice.actions;
export default lectureSlice.reducer;
