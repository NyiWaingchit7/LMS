import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  CategorySlice,
  CreateCategory,
  DeleteCategory,
  UpdateCategory,
} from "../../types/category";
import { errorHelper } from "../../utils/errorHelper";
import { config } from "../../utils/config";
import { headerOptions } from "../../utils/requestOption";
const initialState: CategorySlice = {
  items: [],
  data: {
    id: undefined,
    name: "",
    assetUrl: "",
  },
  isLoading: false,
  error: null,
};

const accessToken = localStorage.getItem("accessToken");

export const handleGetCategory = createAsyncThunk(
  "get/category",
  async (option, thunkApi) => {
    try {
      const response = await fetch(`${config.apiUrl}/categories`, {
        method: "GET",
        headers: headerOptions,
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message);
      }

      thunkApi.dispatch(setCategory(data.categories));
    } catch (error: any) {
      errorHelper(error.message);
    }
  }
);
export const handleShowCategory = createAsyncThunk(
  "show/category",
  async (id: number, thunkApi) => {
    try {
      const response = await fetch(`${config.apiUrl}/categories/${id}`, {
        method: "GET",
        headers: headerOptions,
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message);
      }

      thunkApi.dispatch(setData(data.category));
    } catch (error: any) {
      errorHelper(error.message);
    }
  }
);
export const handleCreateCategory = createAsyncThunk(
  "creat/category",
  async (option: CreateCategory, thunkApi) => {
    const { name, assetUrl, onSuccess } = option;
    try {
      const response = await fetch(`${config.apiUrl}/categories`, {
        method: "POST",
        headers: headerOptions,
        body: JSON.stringify({ name, assetUrl }),
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

export const handleUpdateCategory = createAsyncThunk(
  "update/category",
  async (option: UpdateCategory, thunkApi) => {
    const { id, name, assetUrl, onSuccess } = option;
    try {
      const response = await fetch(`${config.apiUrl}/categories/${id}`, {
        method: "PUT",
        headers: headerOptions,
        body: JSON.stringify({ name, assetUrl }),
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

export const handleDeletCategory = createAsyncThunk(
  "delete/category",
  async (option: DeleteCategory, thunkApi) => {
    const { id, onSuccess } = option;
    try {
      const response = await fetch(`${config.apiUrl}/categories/${id}`, {
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

export const categorySlice = createSlice({
  name: "categorySlice",
  initialState,
  reducers: {
    setCategory: (state, action) => {
      state.items = action.payload;
    },
    setData: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const { setCategory, setData } = categorySlice.actions;
export default categorySlice.reducer;
