import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { errorHelper } from "@/utils/errorHelper";
import toast from "react-hot-toast";
import {
  CreatePage,
  DeletePage,
  pageData,
  PageSlice,
  UpdatePage,
} from "@/types/page";
import { Payload } from "@/types/auth";
import { fetchFunction } from "@/utils/useFetchFunction";
const initialState: PageSlice = {
  items: [],
  links: [],
  data: pageData,
  isLoading: false,
  error: null,
};

export const getPage = createAsyncThunk(
  "get/page",
  async ({ page = 1, searchKey = "" }: Payload, thunkApi) => {
    try {
      const params = {
        page: page.toString(),
        searchKey: searchKey || "",
      };
      const queryString = new URLSearchParams(params).toString();
      const { data, response } = await fetchFunction({
        url: `pages?${queryString}`,
      });
      if (!response.ok) {
        throw new Error(data.message);
      }

      thunkApi.dispatch(setPage(data.data.data));
      thunkApi.dispatch(setPageLink(data.data.links));
    } catch (error: any) {
      errorHelper(error.message);
    }
  }
);
export const showPage = createAsyncThunk(
  "show/page",
  async (id: number, thunkApi) => {
    try {
      const { data, response } = await fetchFunction({ url: `pages/${id}` });
      if (!response.ok) {
        throw new Error(data.message);
      }

      thunkApi.dispatch(setPageData(data.page));
    } catch (error: any) {
      toast.error(`${error.message}`, {
        duration: 5000,
      });
      errorHelper(error.message);
    }
  }
);
export const storePage = createAsyncThunk(
  "creat/page",
  async (option: CreatePage, thunkApi) => {
    const { title, content, onSuccess } = option;
    try {
      const { data, response } = await fetchFunction({
        url: "pages",
        method: "POST",
        body: JSON.stringify({
          title,
          content,
        }),
      });
      if (!response.ok) {
        thunkApi.dispatch(setPageError(data.errors));

        throw new Error(data);
      }

      onSuccess && onSuccess();
    } catch (error: any) {
      errorHelper(error);
    }
  }
);

export const updatePage = createAsyncThunk(
  "update/page",
  async (option: UpdatePage, thunkApi) => {
    const { id, title, content, onSuccess } = option;
    try {
      const { data, response } = await fetchFunction({
        url: `pages/${id}`,
        method: "PUT",
        body: JSON.stringify({
          title,
          content,
        }),
      });
      if (!response.ok) {
        thunkApi.dispatch(setPageError(data.errors));
        throw new Error(data);
      }

      onSuccess && onSuccess();
    } catch (error: any) {
      errorHelper(error);
    }
  }
);

export const deletePage = createAsyncThunk(
  "delete/page",
  async (option: DeletePage) => {
    const { id, onSuccess } = option;
    try {
      const { response, data } = await fetchFunction({
        url: `pages/${id}`,
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
    setPage: (state, action) => {
      state.items = action.payload;
    },
    setPageData: (state, action) => {
      state.data = action.payload;
    },
    setPageError: (state, action) => {
      state.error = action.payload;
    },
    setPageLink: (state, action) => {
      state.links = action.payload;
    },
  },
});

export const { setPage, setPageData, setPageError, setPageLink } =
  lectureSlice.actions;
export default lectureSlice.reducer;
