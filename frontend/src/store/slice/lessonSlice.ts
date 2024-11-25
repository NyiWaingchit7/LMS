import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { errorHelper } from "../../utils/errorHelper";
import { config } from "../../utils/config";
import { headerOptions } from "../../utils/requestOption";
import {
  CreateLesson,
  DeleteLesson,
  lessonData,
  LessonSlice,
  UpdateLesson,
} from "../../types/lesson";
import toast from "react-hot-toast";
import { Payload } from "../../types/auth";

const initialState: LessonSlice = {
  items: [],
  links: [],
  data: lessonData,
  isLoading: false,
  error: null,
};

export const handleGetLesson = createAsyncThunk(
  "get/lesson",
  async ({ page = 1, searchKey = "" }: Payload, thunkApi) => {
    try {
      const response = await fetch(
        `${config.apiUrl}/lessons?page=${page}&searchKey=${searchKey}`,
        {
          method: "GET",
          headers: headerOptions(),
        }
      );
      const { data } = await response.json();
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
export const handleShowLesson = createAsyncThunk(
  "show/lesson",
  async (id: number, thunkApi) => {
    try {
      const response = await fetch(`${config.apiUrl}/lessons/${id}`, {
        method: "GET",
        headers: headerOptions(),
      });
      const data = await response.json();
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
export const handleCreateLesson = createAsyncThunk(
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
      const response = await fetch(`${config.apiUrl}/lessons`, {
        method: "POST",
        headers: headerOptions(),
        body: JSON.stringify({
          title,
          description,
          content,
          assetImage,
          assetVideo,
          lectureId,
        }),
      });
      const data = await response.json();
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

export const handleUpdateLesson = createAsyncThunk(
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
      const response = await fetch(`${config.apiUrl}/lessons/${id}`, {
        method: "PUT",
        headers: headerOptions(),
        body: JSON.stringify({
          title,
          description,
          content,
          assetImage,
          assetVideo,
          lectureId,
        }),
      });
      const data = await response.json();
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

export const handleDeleteLesson = createAsyncThunk(
  "delete/lesson",
  async (option: DeleteLesson) => {
    const { id, onSuccess } = option;
    try {
      const response = await fetch(`${config.apiUrl}/lessons/${id}`, {
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
  },
});

export const { setLesson, setLessonData, setLessonError, setLessonLink } =
  lessonSlice.actions;
export default lessonSlice.reducer;
