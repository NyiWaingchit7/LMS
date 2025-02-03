import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { errorHelper } from "@/utils/errorHelper";
import {
  CreatePurchase,
  DeletePurchase,
  purchaseData,
  PurchaseSlice,
  UpdatePurchase,
} from "@/types/purchase";
import toast from "react-hot-toast";
import { Payload } from "@/types/auth";
import { fetchFunction } from "@/utils/useFetchFunction";
const initialState: PurchaseSlice = {
  items: [],
  links: [],
  data: purchaseData,
  isLoading: false,
  error: null,
  students: [],
  lectures: [],
};
export const createPurchase = createAsyncThunk(
  "get/create-purchase",
  async (_, thunkApi) => {
    try {
      const { data, response } = await fetchFunction({
        url: "purchases/create",
      });
      if (!response.ok) {
        throw new Error(data.message);
      }
      thunkApi.dispatch(setPurchaseStudent(data.students));
      thunkApi.dispatch(setPurchaseLecture(data.lectures));
    } catch (error) {
      console.log(error);
    }
  }
);
export const getPurchase = createAsyncThunk(
  "get/purchase",
  async ({ page = 1, searchKey = "" }: Payload, thunkApi) => {
    try {
      const params = {
        page: page.toString(),
        searchKey: searchKey || "",
      };
      const queryString = new URLSearchParams(params).toString();
      const { data, response } = await fetchFunction({
        url: `purchases?${queryString}`,
      });
      if (!response.ok) {
        throw new Error(data.message);
      }

      thunkApi.dispatch(setPurchase(data.data.data));
      thunkApi.dispatch(setPurchaseLink(data.data.links));
    } catch (error: any) {
      errorHelper(error.message);
    }
  }
);
export const showPurchase = createAsyncThunk(
  "show/purchase",
  async (id: number, thunkApi) => {
    try {
      const { data, response } = await fetchFunction({
        url: `purchases/${id}`,
      });
      if (!response.ok) {
        throw new Error(data.message);
      }

      thunkApi.dispatch(setPurchaseData(data.purchase));
    } catch (error: any) {
      toast.error(`${error.message}`, {
        duration: 5000,
      });
      errorHelper(error.message);
    }
  }
);
export const storePurchase = createAsyncThunk(
  "creat/purchase",
  async (option: CreatePurchase, thunkApi) => {
    const { studentId, lectureId, payment_assetUrl, onSuccess, total_price } =
      option;
    try {
      const { data, response } = await fetchFunction({
        url: "purchases",
        method: "POST",
        body: JSON.stringify({
          studentId,
          lectureId,
          payment_assetUrl: payment_assetUrl,
          total_price,
        }),
      });
      if (!response.ok) {
        thunkApi.dispatch(setPurchaseError(data.errors));
        throw new Error(data.message);
      }

      onSuccess && onSuccess();
    } catch (error: any) {
      errorHelper(error.message);
    }
  }
);

export const updatePurchase = createAsyncThunk(
  "update/purchase",
  async (option: UpdatePurchase) => {
    const { id, payment_status, onSuccess } = option;
    try {
      const { data, response } = await fetchFunction({
        url: `purchases/${id}`,
        method: "PUT",
        body: JSON.stringify({ payment_status }),
      });
      if (!response.ok) {
        throw new Error(data.message);
      }

      onSuccess && onSuccess(data.purchase);
    } catch (error: any) {
      toast.error(`${error.message}`, {
        duration: 5000,
      });
      errorHelper(error.message);
    }
  }
);

export const deletPurchase = createAsyncThunk(
  "delete/purchase",
  async (option: DeletePurchase) => {
    const { id, onSuccess } = option;
    try {
      const { data, response } = await fetchFunction({
        url: `purchases/${id}`,
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error(data.message);
      }
      onSuccess && onSuccess();
    } catch (error: any) {
      errorHelper(error.message);
    }
  }
);

export const purchaseSlice = createSlice({
  name: "purchaseSlice",
  initialState,
  reducers: {
    setPurchase: (state, action) => {
      state.items = action.payload;
    },
    setPurchaseData: (state, action) => {
      state.data = action.payload;
    },
    setPurchaseError: (state, action) => {
      state.error = action.payload;
    },
    setPurchaseLink: (state, action) => {
      state.links = action.payload;
    },
    setPurchaseStudent: (state, action) => {
      state.students = action.payload;
    },
    setPurchaseLecture: (state, action) => {
      state.lectures = action.payload;
    },
  },
});

export const {
  setPurchase,
  setPurchaseData,
  setPurchaseError,
  setPurchaseLink,
  setPurchaseLecture,
  setPurchaseStudent,
} = purchaseSlice.actions;
export default purchaseSlice.reducer;
