import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  categoryData,
  CategorySlice,
  CreateCategory,
  DeleteCategory,
  UpdateCategory,
} from "@/types/category";
import toast from "react-hot-toast";
import { Payload } from "@/types/auth";
import { fetchFunction } from "@/utils/useFetchFunction";
import { errorHelper } from "@/utils/errorHelper";
const initialState: CategorySlice = {
  items: [],
  links: [],
  data: categoryData,
  isLoading: false,
  error: null,
};

export const handleGetCategory = createAsyncThunk(
  "get/category",
  async ({ page = 1, searchKey = "" }: Payload, thunkApi) => {
    try {
      const params = {
        page: page.toString(),
        searchKey: searchKey || "",
      };
      const queryString = new URLSearchParams(params).toString();
      const { data, response } = await fetchFunction({
        url: `categories?${queryString}`,
      });

      if (!response.ok) {
        throw new Error(data.data.message);
      }

      thunkApi.dispatch(setCategory(data.data.data));

      thunkApi.dispatch(setLinks(data.data.links));
    } catch (error: any) {
      errorHelper(error.message);
    }
  }
);
export const handleShowCategory = createAsyncThunk(
  "show/category",
  async (id: number, thunkApi) => {
    try {
      const { response, data } = await fetchFunction({
        url: `categories/${id}`,
      });
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
      const { response, data } = await fetchFunction({
        url: "categories",
        method: "POST",
        body: JSON.stringify({ name, assetUrl }),
      });
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
      const { response, data } = await fetchFunction({
        url: `categories/${id}`,
        method: "PUT",
        body: JSON.stringify({ name, assetUrl }),
      });
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
  async (option: DeleteCategory) => {
    const { id, onSuccess } = option;
    try {
      const { data, response } = await fetchFunction({
        url: `categories/${id}`,
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
