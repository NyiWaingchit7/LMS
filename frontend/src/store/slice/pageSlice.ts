import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { errorHelper } from "../../utils/errorHelper";
import { config } from "../../utils/config";
import { headerOptions } from "../../utils/requestOption";
import toast from "react-hot-toast";
import {
  CreatePage,
  DeletePage,
  pageData,
  PageSlice,
  UpdatePage,
} from "../../types/page";
import { Payload } from "../../types/auth";
const initialState: PageSlice = {
  items: [],
  links: [],
  data: pageData,
  isLoading: false,
  error: null,
};

export const handleGetPage = createAsyncThunk(
  "get/page",
  async ({ page = 1, searchKey = "" }: Payload, thunkApi) => {
    try {
      const response = await fetch(
        `${config.apiUrl}/pages?page=${page}&searchKey=${searchKey}`,
        {
          method: "GET",
          headers: headerOptions(),
        }
      );
      const { data } = await response.json();
      if (!response.ok) {
        throw new Error(data.message);
      }

      thunkApi.dispatch(setPage(data.data));
      thunkApi.dispatch(setPageLink(data.links));
    } catch (error: any) {
      errorHelper(error.message);
    }
  }
);
export const handleShowPage = createAsyncThunk(
  "show/page",
  async (id: number, thunkApi) => {
    try {
      const response = await fetch(`${config.apiUrl}/pages/${id}`, {
        method: "GET",
        headers: headerOptions(),
      });
      const data = await response.json();
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
export const handleCreatePage = createAsyncThunk(
  "creat/page",
  async (option: CreatePage, thunkApi) => {
    const { title, content, onSuccess } = option;
    try {
      const response = await fetch(`${config.apiUrl}/pages`, {
        method: "POST",
        headers: headerOptions(),
        body: JSON.stringify({
          title,
          content,
        }),
      });
      const data = await response.json();
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

export const handleUpdatePage = createAsyncThunk(
  "update/page",
  async (option: UpdatePage, thunkApi) => {
    const { id, title, content, onSuccess } = option;
    try {
      const response = await fetch(`${config.apiUrl}/pages/${id}`, {
        method: "PUT",
        headers: headerOptions(),
        body: JSON.stringify({
          title,
          content,
        }),
      });
      const data = await response.json();
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

export const handleDeletePage = createAsyncThunk(
  "delete/page",
  async (option: DeletePage, thunkApi) => {
    const { id, onSuccess } = option;
    try {
      const response = await fetch(`${config.apiUrl}/pages/${id}`, {
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
