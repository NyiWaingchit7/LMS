import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { errorHelper } from "../../utils/errorHelper";
import { config } from "../../utils/config";
import { headerOptions } from "../../utils/requestOption";
import {
  CreatePurchase,
  DeletePurchase,
  purchaseData,
  PurchaseSlice,
  UpdatePurchase,
} from "../../types/purchase";
import toast from "react-hot-toast";
import { Payload } from "../../types/auth";
const initialState: PurchaseSlice = {
  items: [],
  links: [],
  data: purchaseData,
  isLoading: false,
  error: null,
};

export const handleGetPurchase = createAsyncThunk(
  "get/purchase",
  async ({ page = 1, searchKey = "" }: Payload, thunkApi) => {
    try {
      const response = await fetch(
        `${config.apiUrl}/purchases?page=${page}&searchKey=${searchKey}`,
        {
          method: "GET",
          headers: headerOptions(),
        }
      );
      const { data } = await response.json();
      if (!response.ok) {
        throw new Error(data.message);
      }

      thunkApi.dispatch(setPurchase(data.data));
      thunkApi.dispatch(setPurchaseLink(data.links));
    } catch (error: any) {
      errorHelper(error.message);
    }
  }
);
export const handleShowPurchase = createAsyncThunk(
  "show/purchase",
  async (id: number, thunkApi) => {
    try {
      const response = await fetch(`${config.apiUrl}/purchases/${id}`, {
        method: "GET",
        headers: headerOptions(),
      });
      const data = await response.json();
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
export const handleCreatePurchase = createAsyncThunk(
  "creat/purchase",
  async (option: CreatePurchase, thunkApi) => {
    const { studentId, lectureId, payment_assetUrl, onSuccess, total_price } =
      option;
    try {
      const response = await fetch(`${config.apiUrl}/purchases`, {
        method: "POST",
        headers: headerOptions(),
        body: JSON.stringify({
          studentId,
          lectureId,
          payment_assetUrl: payment_assetUrl,
          total_price,
        }),
      });
      const data = await response.json();
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

export const handleUpdatePurchase = createAsyncThunk(
  "update/purchase",
  async (option: UpdatePurchase) => {
    const { id, payment_status, onSuccess } = option;
    try {
      const response = await fetch(`${config.apiUrl}/purchases/${id}`, {
        method: "PUT",
        headers: headerOptions(),
        body: JSON.stringify({ payment_status }),
      });
      const data = await response.json();
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

export const handleDeletPurchase = createAsyncThunk(
  "delete/purchase",
  async (option: DeletePurchase) => {
    const { id, onSuccess } = option;
    try {
      const response = await fetch(`${config.apiUrl}/purchases/${id}`, {
        method: "DELETE",
        headers: headerOptions(),
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
  },
});

export const {
  setPurchase,
  setPurchaseData,
  setPurchaseError,
  setPurchaseLink,
} = purchaseSlice.actions;
export default purchaseSlice.reducer;
