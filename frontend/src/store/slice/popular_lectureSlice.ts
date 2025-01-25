import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { errorHelper } from "@/utils/errorHelper";

import toast from "react-hot-toast";
import { Payload } from "@/types/auth";
import { fetchFunction } from "@/utils/useFetchFunction";
import {
  CreatePopularLecture,
  DeletePopularLecture,
  PopularLectureSlice,
  UpdatePopularLecture,
} from "@/types/popular_lecture";
const initialState: PopularLectureSlice = {
  items: [],
  links: [],
  isLoading: false,
  error: null,
  lectures: [],
  popularLecture: null,
};

export const getlCreateLectures = createAsyncThunk(
  "get/create-lecture",
  async (_, thunkApi) => {
    try {
      const { data, response } = await fetchFunction({
        url: "popular-lectures/create",
      });
      if (!response) {
        toast.error(data.message);
      }
      thunkApi.dispatch(setLecturesCreate(data.lectures));
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  }
);

export const handleGetPopularLecture = createAsyncThunk(
  "get/lecture",
  async ({ page = 1, searchKey = "" }: Payload, thunkApi) => {
    try {
      const params = {
        page: page.toString(),
        searchKey: searchKey || "",
      };
      const queryString = new URLSearchParams(params).toString();

      const { data, response } = await fetchFunction({
        url: `popular-lectures?${queryString}`,
      });

      if (!response.ok) {
        throw new Error(data.message);
      }

      thunkApi.dispatch(setPopularLecture(data.data.data));
      thunkApi.dispatch(setPopularLectureLink(data.data.links));
    } catch (error: any) {
      errorHelper(error.message);
    }
  }
);
export const handleShowPoppularLecture = createAsyncThunk(
  "show/lecture",
  async (id: number, thunkApi) => {
    try {
      const { response, data } = await fetchFunction({
        url: `popular-lectures/${id}`,
      });
      if (!response.ok) {
        throw new Error(data.message);
      }

      thunkApi.dispatch(setPopularLectureData(data.data));
    } catch (error: any) {
      toast.error(`${error.message}`, {
        duration: 5000,
      });
      errorHelper(error.message);
    }
  }
);
export const handleCreatePopularLecture = createAsyncThunk(
  "creat/lecture",
  async (option: CreatePopularLecture, thunkApi) => {
    const { title, lectureId, onSuccess } = option;
    try {
      const { response, data } = await fetchFunction({
        url: "popular-lectures",
        method: "POST",
        body: JSON.stringify({
          title,
          lectureId,
        }),
      });
      if (!response.ok) {
        thunkApi.dispatch(setPopularLectureError(data.errors));
        throw new Error(data);
      }

      onSuccess && onSuccess();
    } catch (error: any) {
      errorHelper(error);
    }
  }
);

export const handleUpdatePopularLecture = createAsyncThunk(
  "update/lecture",
  async (option: UpdatePopularLecture, thunkApi) => {
    const { id, title, lectureId, onSuccess } = option;
    try {
      const { response, data } = await fetchFunction({
        url: `popular-lectures/${id}`,
        method: "PUT",
        body: JSON.stringify({
          title,
          lectureId,
        }),
      });
      if (!response.ok) {
        thunkApi.dispatch(setPopularLectureError(data.errors));
        throw new Error(data);
      }

      onSuccess && onSuccess();
    } catch (error: any) {
      errorHelper(error);
    }
  }
);

export const handleDeletePopularLecture = createAsyncThunk(
  "delete/lecture",
  async (option: DeletePopularLecture) => {
    const { id, onSuccess } = option;
    try {
      const { response, data } = await fetchFunction({
        url: `popular-lectures/${id}`,
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

export const popularLectureSlice = createSlice({
  name: "popularLectureSlice",
  initialState,
  reducers: {
    setPopularLecture: (state, action) => {
      state.items = action.payload;
    },
    setPopularLectureData: (state, action) => {
      state.popularLecture = action.payload;
    },

    setPopularLectureError: (state, action) => {
      state.error = action.payload;
    },
    setPopularLectureLink: (state, action) => {
      state.links = action.payload;
    },
    setLecturesCreate: (state, action) => {
      state.lectures = action.payload;
    },
  },
});

export const {
  setPopularLecture,
  setPopularLectureError,
  setPopularLectureLink,
  setLecturesCreate,
  setPopularLectureData,
} = popularLectureSlice.actions;
export default popularLectureSlice.reducer;
