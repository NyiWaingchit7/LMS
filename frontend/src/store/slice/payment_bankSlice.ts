import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { errorHelper } from "@/utils/errorHelper";
import {
  CreatePaymentBank,
  DeletePaymentBank,
  paymentBankData,
  PaymentBankSlice,
  UpdatePaymentBank,
} from "@/types/payment_bank";
import toast from "react-hot-toast";
import { Payload } from "@/types/auth";
import { fetchFunction } from "@/utils/useFetchFunction";
const initialState: PaymentBankSlice = {
  items: [],
  links: [],
  data: paymentBankData,
  isLoading: false,
  error: null,
};

export const getPaymentBank = createAsyncThunk(
  "get/payment-bank",
  async ({ page = 1, searchKey = "" }: Payload, thunkApi) => {
    try {
      const params = {
        page: page.toString(),
        searchKey: searchKey || "",
      };
      const queryString = new URLSearchParams(params).toString();
      const { data, response } = await fetchFunction({
        url: `payment-banks?${queryString}`,
      });

      if (!response.ok) {
        throw new Error(data.message);
      }

      thunkApi.dispatch(setPaymentBank(data.data));
      thunkApi.dispatch(setPaymentBankLink(data.links));
    } catch (error: any) {
      errorHelper(error.message);
    }
  }
);
export const showPaymentBank = createAsyncThunk(
  "show/payment-bank",
  async (id: number, thunkApi) => {
    try {
      const { data, response } = await fetchFunction({
        url: `payment-banks/${id}`,
      });
      if (!response.ok) {
        throw new Error(data.message);
      }

      thunkApi.dispatch(setPaymentBankData(data.paymentBank));
    } catch (error: any) {
      toast.error(`${error.message}`, {
        duration: 5000,
      });
      errorHelper(error.message);
    }
  }
);
export const storePaymentBank = createAsyncThunk(
  "creat/payment-bank",
  async (option: CreatePaymentBank, thunkApi) => {
    const { name, assetUrl, onSuccess } = option;
    try {
      const { data, response } = await fetchFunction({
        url: "payment-banks",
        method: "POST",
        body: JSON.stringify({ name, assetUrl }),
      });
      if (!response.ok) {
        thunkApi.dispatch(setPaymentBankError(data.errors));
        throw new Error(data);
      }

      onSuccess && onSuccess();
    } catch (error: any) {
      errorHelper(error);
    }
  }
);

export const updatePaymentBank = createAsyncThunk(
  "update/payment-bank",
  async (option: UpdatePaymentBank, thunkApi) => {
    const { id, name, assetUrl, onSuccess } = option;
    try {
      const { response, data } = await fetchFunction({
        url: `payment-banks/${id}`,
        method: "PUT",
        body: JSON.stringify({ name, assetUrl }),
      });
      if (!response.ok) {
        thunkApi.dispatch(setPaymentBankError(data.errors));

        throw new Error(data);
      }

      onSuccess && onSuccess();
    } catch (error: any) {
      errorHelper(error);
    }
  }
);

export const deletePaymentBank = createAsyncThunk(
  "delete/payment-bank",
  async (option: DeletePaymentBank) => {
    const { id, onSuccess } = option;
    try {
      const { data, response } = await fetchFunction({
        url: `payment-banks/${id}`,
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

export const paymentBankSlice = createSlice({
  name: "paymentBankSlice",
  initialState,
  reducers: {
    setPaymentBank: (state, action) => {
      state.items = action.payload;
    },
    setPaymentBankData: (state, action) => {
      state.data = action.payload;
    },
    setPaymentBankError: (state, action) => {
      state.error = action.payload;
    },
    setPaymentBankLink: (state, action) => {
      state.links = action.payload;
    },
  },
});

export const {
  setPaymentBank,
  setPaymentBankData,
  setPaymentBankError,
  setPaymentBankLink,
} = paymentBankSlice.actions;
export default paymentBankSlice.reducer;
