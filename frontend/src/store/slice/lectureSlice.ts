import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { errorHelper } from "../../utils/errorHelper";
import { config } from "../../utils/config";
import { headerOptions } from "../../utils/requestOption";
import {
  CreateLecture,
  DeleteLecture,
  lectureData,
  LectureSlice,
  UpdateLecture,
} from "../../types/lecture";
import toast from "react-hot-toast";
const initialState: LectureSlice = {
  items: [],
  links: [],
  data: lectureData,
  isLoading: false,
  error: null,
};

export const handleGetLecture = createAsyncThunk(
  "get/lecture",
  async (page: string | number, thunkApi) => {
    try {
      const response = await fetch(`${config.apiUrl}/lectures?page=${page}`, {
        method: "GET",
        headers: headerOptions(),
      });
      const { data } = await response.json();
      if (!response.ok) {
        throw new Error(data.message);
      }

      thunkApi.dispatch(setLecture(data.data));
      thunkApi.dispatch(setLectureLink(data.links));
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
        headers: headerOptions(),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message);
      }

      thunkApi.dispatch(setLectureData(data.lecture));
    } catch (error: any) {
      toast.error(`${error.message}`, {
        duration: 5000,
      });
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
        headers: headerOptions(),
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
        thunkApi.dispatch(setLectureError(data.errors));

        throw new Error(data);
      }

      onSuccess && onSuccess();
    } catch (error: any) {
      errorHelper(error);
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
        headers: headerOptions(),
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
        thunkApi.dispatch(setLectureError(data.errors));
        throw new Error(data);
      }

      onSuccess && onSuccess();
    } catch (error: any) {
      errorHelper(error);
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
        headers: headerOptions(),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message);
      }
      onSuccess && onSuccess();
    } catch (error: any) {
      toast.error(`${error.message}`, {
        duration: 5000,
      });
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
    setLectureData: (state, action) => {
      state.data = action.payload;
    },
    setLectureError: (state, action) => {
      state.error = action.payload;
    },
    setLectureLink: (state, action) => {
      state.links = action.payload;
    },
  },
});

export const { setLecture, setLectureData, setLectureError, setLectureLink } =
  lectureSlice.actions;
export default lectureSlice.reducer;
