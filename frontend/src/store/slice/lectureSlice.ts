import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { errorHelper } from "@/utils/errorHelper";
import {
  CreateLecture,
  DeleteLecture,
  lectureData,
  LectureSlice,
  UpdateLecture,
} from "@/types/lecture";
import toast from "react-hot-toast";
import { Payload } from "@/types/auth";
import { fetchFunction } from "@/utils/useFetchFunction";
const initialState: LectureSlice = {
  items: [],
  links: [],
  data: lectureData,
  isLoading: false,
  error: null,
  categories: [],
};

export const createLecture = createAsyncThunk(
  "get/create-lecture",
  async (_, thunkApi) => {
    try {
      const { data, response } = await fetchFunction({
        url: "lectures/create",
      });
      if (!response) {
        toast.error(data.message);
      }
      thunkApi.dispatch(setLectureCategory(data.categories));
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  }
);

export const getLecture = createAsyncThunk(
  "get/lecture",
  async ({ page = 1, searchKey = "" }: Payload, thunkApi) => {
    try {
      const params = {
        page: page.toString(),
        searchKey: searchKey || "",
      };
      const queryString = new URLSearchParams(params).toString();

      const { data, response } = await fetchFunction({
        url: `lectures?${queryString}`,
      });

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
export const showLecture = createAsyncThunk(
  "show/lecture",
  async (id: number, thunkApi) => {
    try {
      const { response, data } = await fetchFunction({ url: `lectures/${id}` });
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
export const storeLecture = createAsyncThunk(
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
      const { response, data } = await fetchFunction({
        url: "lectures",
        method: "POST",
        body: JSON.stringify({
          title,
          description,
          price: isPremium ? price : undefined,
          discount_price: isPremium ? discount_price : undefined,
          isPremium,
          assetUrl,
          categories,
        }),
      });
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

export const updateLecture = createAsyncThunk(
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
      const { response, data } = await fetchFunction({
        url: `lectures/${id}`,
        method: "PUT",
        body: JSON.stringify({
          title,
          description,
          price: isPremium ? price : undefined,
          discount_price: isPremium ? discount_price : undefined,
          isPremium,
          assetUrl,
          categories,
        }),
      });
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

export const deleteLecture = createAsyncThunk(
  "delete/lecture",
  async (option: DeleteLecture) => {
    const { id, onSuccess } = option;
    try {
      const { response, data } = await fetchFunction({
        url: `lectures/${id}`,
        method: "DELETE",
      });
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
    setLectureCategory: (state, action) => {
      state.categories = action.payload;
    },
  },
});

export const {
  setLecture,
  setLectureData,
  setLectureError,
  setLectureLink,
  setLectureCategory,
} = lectureSlice.actions;
export default lectureSlice.reducer;
