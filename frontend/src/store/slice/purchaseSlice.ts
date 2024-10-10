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
const initialState: PurchaseSlice = {
  items: [],
  data: purchaseData,
  isLoading: false,
  error: null,
};

export const handleGetPurchase = createAsyncThunk(
  "get/purchase",
  async (option, thunkApi) => {
    try {
      const response = await fetch(`${config.apiUrl}/purchases`, {
        method: "GET",
        headers: headerOptions(),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message);
      }

      thunkApi.dispatch(setPurchase(data.purchases));
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
      errorHelper(error.message);
    }
  }
);
export const handleCreatePurchase = createAsyncThunk(
  "creat/purchase",
  async (option: CreatePurchase, thunkApi) => {
    const { studentId, lectureId, payment_assetUrl, onSuccess } = option;
    try {
      const response = await fetch(`${config.apiUrl}/purchases`, {
        method: "POST",
        headers: headerOptions(),
        body: JSON.stringify({
          studentId,
          lectureId,
          payment_assetUrl: payment_assetUrl,
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
  async (option: UpdatePurchase, thunkApi) => {
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

      onSuccess && onSuccess();
    } catch (error: any) {
      errorHelper(error.message);
    }
  }
);

export const handleDeletPurchase = createAsyncThunk(
  "delete/purchase",
  async (option: DeletePurchase, thunkApi) => {
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
  },
});

export const { setPurchase, setPurchaseData, setPurchaseError } =
  purchaseSlice.actions;
export default purchaseSlice.reducer;
