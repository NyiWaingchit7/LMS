import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { errorHelper } from "@/utils/errorHelper";
import {
  CreateLesson,
  DeleteLesson,
  lessonData,
  LessonSlice,
  UpdateLesson,
} from "@/types/lesson";
import toast from "react-hot-toast";
import { Payload } from "@/types/auth";
import { fetchFunction } from "@/utils/useFetchFunction";

const initialState: LessonSlice = {
  items: [],
  links: [],
  data: lessonData,
  isLoading: false,
  error: null,
  lectures: [],
};

export const createLesson = createAsyncThunk(
  "get/create-lesson",
  async (_, thunkApi) => {
    try {
      const { data, response } = await fetchFunction({ url: "lessons/create" });
      if (!response.ok) {
        throw new Error(data.message);
      }
      thunkApi.dispatch(setLectureLesson(data.lectures));
    } catch (error) {
      console.log(error);
    }
  }
);

export const getLesson = createAsyncThunk(
  "get/lesson",
  async ({ page = 1, searchKey = "" }: Payload, thunkApi) => {
    try {
      const params = {
        page: page.toString(),
        searchKey: searchKey || "",
      };
      const queryString = new URLSearchParams(params).toString();
      const { data, response } = await fetchFunction({
        url: `lessons?${queryString}`,
      });
      if (!response.ok) {
        throw new Error(data.message);
      }

      thunkApi.dispatch(setLesson(data.data));
      thunkApi.dispatch(setLessonLink(data.links));
    } catch (error: any) {
      errorHelper(error.message);
    }
  }
);
export const showLesson = createAsyncThunk(
  "show/lesson",
  async (id: number, thunkApi) => {
    try {
      const { data, response } = await fetchFunction({ url: `lessons/${id}` });
      if (!response.ok) {
        throw new Error(data.message);
      }

      thunkApi.dispatch(setLessonData(data.lesson));
    } catch (error: any) {
      toast.error(`${error.message}`, {
        duration: 5000,
      });
      errorHelper(error.message);
    }
  }
);
export const storeLesson = createAsyncThunk(
  "creat/lesson",
  async (option: CreateLesson, thunkApi) => {
    const {
      title,
      description,
      content,
      assetImage,
      assetVideo,
      lectureId,
      onSuccess,
    } = option;
    try {
      const { data, response } = await fetchFunction({
        url: "lessons",
        method: "POST",
        body: JSON.stringify({
          title,
          description,
          content,
          assetImage,
          assetVideo,
          lectureId,
        }),
      });
      if (!response.ok) {
        thunkApi.dispatch(setLessonError(data.errors));

        throw new Error(data);
      }

      onSuccess && onSuccess();
    } catch (error: any) {
      errorHelper(error);
    }
  }
);

export const updateLesson = createAsyncThunk(
  "update/lesson",
  async (option: UpdateLesson, thunkApi) => {
    const {
      id,
      title,
      description,
      content,
      assetImage,
      assetVideo,
      lectureId,
      onSuccess,
    } = option;
    try {
      const { data, response } = await fetchFunction({
        url: `lessons/${id}`,
        method: "PUT",
        body: JSON.stringify({
          title,
          description,
          content,
          assetImage,
          assetVideo,
          lectureId,
        }),
      });
      if (!response.ok) {
        thunkApi.dispatch(setLessonError(data.errors));

        throw new Error(data);
      }

      onSuccess && onSuccess();
    } catch (error: any) {
      errorHelper(error);
    }
  }
);

export const deleteLesson = createAsyncThunk(
  "delete/lesson",
  async (option: DeleteLesson) => {
    const { id, onSuccess } = option;
    try {
      const { response, data } = await fetchFunction({
        url: `lessons/${id}`,
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

export const lessonSlice = createSlice({
  name: "lessonSlice",
  initialState,
  reducers: {
    setLesson: (state, action) => {
      state.items = action.payload;
    },
    setLessonData: (state, action) => {
      state.data = action.payload;
    },
    setLessonError: (state, action) => {
      state.error = action.payload;
    },
    setLessonLink: (state, action) => {
      state.links = action.payload;
    },
    setLectureLesson: (state, action) => {
      state.lectures = action.payload;
    },
  },
});

export const {
  setLesson,
  setLessonData,
  setLessonError,
  setLessonLink,
  setLectureLesson,
} = lessonSlice.actions;
export default lessonSlice.reducer;
