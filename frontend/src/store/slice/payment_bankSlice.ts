import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { errorHelper } from "../../utils/errorHelper";
import { config } from "../../utils/config";
import { headerOptions } from "../../utils/requestOption";
import {
  CreatePaymentBank,
  DeletePaymentBank,
  paymentBankData,
  PaymentBankSlice,
  UpdatePaymentBank,
} from "../../types/payment_bank";
import toast from "react-hot-toast";
const initialState: PaymentBankSlice = {
  items: [],
  links: [],
  data: paymentBankData,
  isLoading: false,
  error: null,
};

export const handleGetPaymentBank = createAsyncThunk(
  "get/payment-bank",
  async (page: string | number, thunkApi) => {
    try {
      const response = await fetch(
        `${config.apiUrl}/payment-banks?page=${page}`,
        {
          method: "GET",
          headers: headerOptions(),
        }
      );
      const { data } = await response.json();
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
export const handleShowPaymentBank = createAsyncThunk(
  "show/payment-bank",
  async (id: number, thunkApi) => {
    try {
      const response = await fetch(`${config.apiUrl}/payment-banks/${id}`, {
        method: "GET",
        headers: headerOptions(),
      });
      const data = await response.json();
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
export const handleCreatePaymentBank = createAsyncThunk(
  "creat/payment-bank",
  async (option: CreatePaymentBank, thunkApi) => {
    const { name, assetUrl, onSuccess } = option;
    try {
      const response = await fetch(`${config.apiUrl}/payment-banks`, {
        method: "POST",
        headers: headerOptions(),
        body: JSON.stringify({ name, assetUrl }),
      });
      const data = await response.json();
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

export const handleUpdatePaymentBank = createAsyncThunk(
  "update/payment-bank",
  async (option: UpdatePaymentBank, thunkApi) => {
    const { id, name, assetUrl, onSuccess } = option;
    try {
      const response = await fetch(`${config.apiUrl}/payment-banks/${id}`, {
        method: "PUT",
        headers: headerOptions(),
        body: JSON.stringify({ name, assetUrl }),
      });
      const data = await response.json();
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

export const handleDeletPaymentBank = createAsyncThunk(
  "delete/payment-bank",
  async (option: DeletePaymentBank, thunkApi) => {
    const { id, onSuccess } = option;
    try {
      const response = await fetch(`${config.apiUrl}/payment-banks/${id}`, {
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
