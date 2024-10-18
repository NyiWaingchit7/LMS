import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  categoryData,
  CategorySlice,
  CreateCategory,
  DeleteCategory,
  UpdateCategory,
} from "../../types/category";
import { errorHelper } from "../../utils/errorHelper";
import { config } from "../../utils/config";
import { headerOptions } from "../../utils/requestOption";
import toast from "react-hot-toast";
import { Payload } from "../../types/auth";
const initialState: CategorySlice = {
  items: [],
  links: [],
  data: categoryData,
  isLoading: false,
  error: null,
};

export const handleGetCategory = createAsyncThunk<any, Payload>(
  "get/category",
  async ({ page = 1, searchKey = "" }, thunkApi) => {
    try {
      const response = await fetch(
        `${config.apiUrl}/categories?page=${page}&searchKey=${searchKey}`,
        {
          method: "GET",
          headers: headerOptions(),
        }
      );
      const { data, query } = await response.json();
      if (!response.ok) {
        throw new Error(data.message);
      }

      thunkApi.dispatch(setCategory(data.data));
      console.log(query);

      thunkApi.dispatch(setLinks(data.links));
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
        headers: headerOptions(),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message);
      }

      thunkApi.dispatch(setCategoryData(data.category));
    } catch (error: any) {
      toast.error(`${error.message}`, {
        duration: 5000,
      });
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
        headers: headerOptions(),
        body: JSON.stringify({ name, assetUrl }),
      });
      const data = await response.json();
      if (!response.ok) {
        thunkApi.dispatch(setCategoryError(data.errors));
        throw Error(data);
      }

      onSuccess && onSuccess();
    } catch (error: any) {
      errorHelper(error);
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
        headers: headerOptions(),
        body: JSON.stringify({ name, assetUrl }),
      });
      const data = await response.json();
      if (!response.ok) {
        thunkApi.dispatch(setCategoryError(data.errors));

        throw new Error(data);
      }

      onSuccess && onSuccess();
    } catch (error: any) {
      errorHelper(error);
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

export const categorySlice = createSlice({
  name: "categorySlice",
  initialState,
  reducers: {
    setCategory: (state, action) => {
      state.items = action.payload;
    },
    setCategoryData: (state, action) => {
      state.data = action.payload;
    },
    setCategoryError: (state, action) => {
      state.error = action.payload;
    },
    setLinks: (state, action) => {
      state.links = action.payload;
    },
    // setCategoryQuery: (state, action) => {
    //   state.query = action.payload;
    // },
  },
});

export const { setCategory, setCategoryData, setCategoryError, setLinks } =
  categorySlice.actions;
export default categorySlice.reducer;
