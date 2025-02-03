import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { errorHelper } from "@/utils/errorHelper";
import {
  CreatePaymentAccount,
  DeletePaymentAccount,
  payment_accountData,
  PaymentAccountSlice,
  UpdatePaymentAccount,
} from "@/types/payment_account";
import toast from "react-hot-toast";
import { Payload } from "@/types/auth";
import { fetchFunction } from "@/utils/useFetchFunction";

const initialState: PaymentAccountSlice = {
  items: [],
  links: [],
  data: payment_accountData,
  isLoading: false,
  error: null,
  banks: [],
};
export const createPaymentAccount = createAsyncThunk(
  "get/account-banks",
  async (_, thunkApi) => {
    try {
      const { data, response } = await fetchFunction({
        url: "payment-accounts/create",
      });
      if (!response.ok) {
        throw new Error(data.message);
      }
      thunkApi.dispatch(setBank(data.banks));
    } catch (error) {
      console.log(error);
    }
  }
);
export const getPaymentAccount = createAsyncThunk(
  "get/payment-account",
  async ({ page = 1, searchKey = "" }: Payload, thunkApi) => {
    try {
      const params = {
        page: page.toString(),
        searchKey: searchKey || "",
      };
      const queryString = new URLSearchParams(params).toString();
      const { data, response } = await fetchFunction({
        url: `payment-accounts?${queryString}`,
      });
      if (!response.ok) {
        throw new Error(data.message);
      }

      thunkApi.dispatch(setPaymentAccount(data.data.data));
      thunkApi.dispatch(setPaymentAccountLinks(data.data.links));
    } catch (error: any) {
      errorHelper(error.message);
    }
  }
);
export const showPaymentAccount = createAsyncThunk(
  "show/payment-account",
  async (id: number, thunkApi) => {
    try {
      const { response, data } = await fetchFunction({
        url: `payment-accounts/${id}`,
      });
      if (!response.ok) {
        throw new Error(data.message);
      }

      thunkApi.dispatch(setPaymentAccountData(data.paymentAccount));
    } catch (error: any) {
      toast.error(`${error.message}`, {
        duration: 5000,
      });
      errorHelper(error.message);
    }
  }
);
export const storePaymentAccount = createAsyncThunk(
  "creat/payment-account",
  async (option: CreatePaymentAccount, thunkApi) => {
    const { name, phone_number, payment_bank_id, onSuccess } = option;
    try {
      const { data, response } = await fetchFunction({
        url: "payment-accounts",
        method: "POST",
        body: JSON.stringify({
          name,
          phone_number,
          payment_bank_id,
        }),
      });
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

export const updatePaymentAccount = createAsyncThunk(
  "update/payment-account",
  async (option: UpdatePaymentAccount, thunkApi) => {
    const { id, name, phone_number, payment_bank_id, onSuccess } = option;
    try {
      const { data, response } = await fetchFunction({
        url: `payment-accounts/${id}`,
        method: "PUT",
        body: JSON.stringify({
          name,
          phone_number,
          payment_bank_id,
        }),
      });
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

export const deletePaymentAccount = createAsyncThunk(
  "delete/payment-account",
  async (option: DeletePaymentAccount) => {
    const { id, onSuccess } = option;
    try {
      const { data, response } = await fetchFunction({
        url: `payment-accounts/${id}`,
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
    setBank: (state, action) => {
      state.banks = action.payload;
    },
  },
});

export const {
  setPaymentAccount,
  setPaymentAccountData,
  setPaymentAccountError,
  setPaymentAccountLinks,
  setBank,
} = paymentAccountSlice.actions;
export default paymentAccountSlice.reducer;
