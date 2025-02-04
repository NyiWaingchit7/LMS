import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { errorHelper } from "@/utils/errorHelper";
import toast from "react-hot-toast";
import { Payload } from "@/types/auth";
import { fetchFunction } from "@/utils/useFetchFunction";
import {
  CreateTagLine,
  DeleteTagLine,
  tagLineData,
  TagLineSlice,
  UpdateTagLine,
} from "@/types/tagline";
const initialState: TagLineSlice = {
  items: [],
  links: [],
  data: tagLineData,
  isLoading: false,
  error: null,
};

export const getTagLine = createAsyncThunk(
  "get/category",
  async ({ page = 1, searchKey = "" }: Payload, thunkApi) => {
    try {
      const params = {
        page: page.toString(),
        searchKey: searchKey || "",
      };
      const queryString = new URLSearchParams(params).toString();
      const { data, response } = await fetchFunction({
        url: `tag-lines?${queryString}`,
      });

      if (!response.ok) {
        throw new Error(data.data.message);
      }

      thunkApi.dispatch(setTagLine(data.data.data));

      thunkApi.dispatch(setLinks(data.data.links));
    } catch (error: any) {
      errorHelper(error.message);
    }
  }
);
export const showTagLine = createAsyncThunk(
  "show/tagline",
  async (id: number, thunkApi) => {
    try {
      const { response, data } = await fetchFunction({
        url: `tag-lines/${id}`,
      });
      if (!response.ok) {
        throw new Error(data.message);
      }

      thunkApi.dispatch(setTagLineData(data.tagLine));
    } catch (error: any) {
      toast.error(`${error.message}`, {
        duration: 5000,
      });
      errorHelper(error.message);
    }
  }
);
export const storeTagLine = createAsyncThunk(
  "creat/tagline",
  async (option: CreateTagLine, thunkApi) => {
    const { title, description, onSuccess } = option;
    try {
      const { response, data } = await fetchFunction({
        url: "tag-lines",
        method: "POST",
        body: JSON.stringify({ title, description }),
      });
      if (!response.ok) {
        thunkApi.dispatch(setTagLineError(data.errors));
        throw Error(data);
      }

      onSuccess && onSuccess();
    } catch (error: any) {
      errorHelper(error);
    }
  }
);

export const updateTagLine = createAsyncThunk(
  "update/TagLine",
  async (option: UpdateTagLine, thunkApi) => {
    const { id, title, description, onSuccess } = option;
    try {
      const { response, data } = await fetchFunction({
        url: `tag-lines/${id}`,
        method: "PUT",
        body: JSON.stringify({ title, description }),
      });
      if (!response.ok) {
        thunkApi.dispatch(setTagLineError(data.errors));

        throw new Error(data);
      }

      onSuccess && onSuccess();
    } catch (error: any) {
      errorHelper(error);
    }
  }
);

export const deletTagLine = createAsyncThunk(
  "delete/tagline",
  async (option: DeleteTagLine) => {
    const { id, onSuccess } = option;
    try {
      const { data, response } = await fetchFunction({
        url: `tag-lines/${id}`,
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

export const categorySlice = createSlice({
  name: "categorySlice",
  initialState,
  reducers: {
    setTagLine: (state, action) => {
      state.items = action.payload;
    },
    setTagLineData: (state, action) => {
      state.data = action.payload;
    },
    setTagLineError: (state, action) => {
      state.error = action.payload;
    },
    setLinks: (state, action) => {
      state.links = action.payload;
    },
    // setTagLineQuery: (state, action) => {
    //   state.query = action.payload;
    // },
  },
});

export const { setTagLine, setTagLineData, setTagLineError, setLinks } =
  categorySlice.actions;
export default categorySlice.reducer;
