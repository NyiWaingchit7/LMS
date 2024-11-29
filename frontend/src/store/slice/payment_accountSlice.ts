import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { errorHelper } from "../../utils/errorHelper";
import {
  CreatePaymentAccount,
  DeletePaymentAccount,
  payment_accountData,
  PaymentAccountSlice,
  UpdatePaymentAccount,
} from "../../types/payment_account";
import toast from "react-hot-toast";
import { Payload } from "../../types/auth";
import { fetchFunction } from "../../utils/useFetchFunction";

const initialState: PaymentAccountSlice = {
  items: [],
  links: [],
  data: payment_accountData,
  isLoading: false,
  error: null,
};

export const handleGetPaymentAccount = createAsyncThunk(
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
export const handleShowPaymentAccount = createAsyncThunk(
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
export const handleCreatePaymentAccount = createAsyncThunk(
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

export const handleUpdatePaymentAccount = createAsyncThunk(
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

export const handleDeletePaymentAccount = createAsyncThunk(
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
  },
});

export const {
  setPaymentAccount,
  setPaymentAccountData,
  setPaymentAccountError,
  setPaymentAccountLinks,
} = paymentAccountSlice.actions;
export default paymentAccountSlice.reducer;
