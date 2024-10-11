import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { errorHelper } from "../../utils/errorHelper";
import { config } from "../../utils/config";
import { headerOptions } from "../../utils/requestOption";
import {
  CreatePaymentAccount,
  DeletePaymentAccount,
  payment_accountData,
  PaymentAccountSlice,
  UpdatePaymentAccount,
} from "../../types/payment_account";

const initialState: PaymentAccountSlice = {
  items: [],
  links: [],
  data: payment_accountData,
  isLoading: false,
  error: null,
};

export const handleGetPaymentAccount = createAsyncThunk(
  "get/payment-account",
  async (page: string | number, thunkApi) => {
    try {
      const response = await fetch(
        `${config.apiUrl}/payment-accounts?page=${page}`,
        {
          method: "GET",
          headers: headerOptions(),
        }
      );
      const { data } = await response.json();
      if (!response.ok) {
        throw new Error(data.message);
      }

      thunkApi.dispatch(setPaymentAccount(data.data));
      thunkApi.dispatch(setPaymentAccountLinks(data.links));
    } catch (error: any) {
      errorHelper(error.message);
    }
  }
);
export const handleShowPaymentAccount = createAsyncThunk(
  "show/payment-account",
  async (id: number, thunkApi) => {
    try {
      const response = await fetch(`${config.apiUrl}/payment-accounts/${id}`, {
        method: "GET",
        headers: headerOptions(),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message);
      }

      thunkApi.dispatch(setPaymentAccountData(data.paymentAccount));
    } catch (error: any) {
      errorHelper(error.message);
    }
  }
);
export const handleCreatePaymentAccount = createAsyncThunk(
  "creat/payment-account",
  async (option: CreatePaymentAccount, thunkApi) => {
    const { name, phone_number, payment_bank_id, onSuccess } = option;
    try {
      const response = await fetch(`${config.apiUrl}/payment-accounts`, {
        method: "POST",
        headers: headerOptions(),
        body: JSON.stringify({
          name,
          phone_number,
          payment_bank_id,
        }),
      });
      const data = await response.json();
      if (!response.ok) {
        thunkApi.dispatch(setPaymentAccountError(data.errors));
        throw new Error(data.message);
      }

      onSuccess && onSuccess();
    } catch (error: any) {
      errorHelper(error.message);
    }
  }
);

export const handleUpdatePaymentAccount = createAsyncThunk(
  "update/payment-account",
  async (option: UpdatePaymentAccount, thunkApi) => {
    const { id, name, phone_number, payment_bank_id, onSuccess } = option;
    try {
      const response = await fetch(`${config.apiUrl}/payment-accounts/${id}`, {
        method: "PUT",
        headers: headerOptions(),
        body: JSON.stringify({
          name,
          phone_number,
          payment_bank_id,
        }),
      });
      const data = await response.json();
      if (!response.ok) {
        thunkApi.dispatch(setPaymentAccountError(data.errors));
        throw new Error(data.message);
      }

      onSuccess && onSuccess();
    } catch (error: any) {
      errorHelper(error.message);
    }
  }
);

export const handleDeletePaymentAccount = createAsyncThunk(
  "delete/payment-account",
  async (option: DeletePaymentAccount, thunkApi) => {
    const { id, onSuccess } = option;
    try {
      const response = await fetch(`${config.apiUrl}/payment-accounts/${id}`, {
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

export const paymentAccountSlice = createSlice({
  name: "paymentAccountSlice",
  initialState,
  reducers: {
    setPaymentAccount: (state, action) => {
      state.items = action.payload;
    },
    setPaymentAccountData: (state, action) => {
      state.data = action.payload;
    },
    setPaymentAccountError: (state, action) => {
      state.error = action.payload;
    },
    setPaymentAccountLinks: (state, action) => {
      state.links = action.payload;
    },
  },
});

export const {
  setPaymentAccount,
  setPaymentAccountData,
  setPaymentAccountError,
  setPaymentAccountLinks,
} = paymentAccountSlice.actions;
export default paymentAccountSlice.reducer;
