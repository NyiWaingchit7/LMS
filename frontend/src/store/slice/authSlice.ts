import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { LoginOption, LoginSlice } from "@/types/auth";
import toast from "react-hot-toast";
import { errorHelper } from "@/utils/errorHelper";
import { fetchFunction } from "@/utils/useFetchFunction";

const initialState: LoginSlice = {
  items: [],
  accessToken: "",
  isLoading: false,
  error: null,
};

export const handleLogin = createAsyncThunk(
  "login/user",
  async (option: LoginOption, thunkApi) => {
    const { email, password, onSuccess } = option;
    try {
      // const response = await fetch(`${config.apiUrl}/auth/log-in`, {
      //   method: "POST",
      //   headers: { "content-type": "application/json" },
      //   body: JSON.stringify({ email, password }),
      // });
      // const data = await response.json();
      const { response, data } = await fetchFunction({
        url: "auth/log-in",
        method: "POST",
        body: JSON.stringify({ email, password }),
      });
      if (!response.ok) {
        toast.error(data.message);
        throw new Error(data.message);
      }
      thunkApi.dispatch(setUser(data.user));
      thunkApi.dispatch(setToken(data.token));
      localStorage.setItem("accessToken", data.token);
      onSuccess && onSuccess();
    } catch (error: any) {
      errorHelper(error.message);
    }
  }
);

const authSlice = createSlice({
  name: "auth/slice",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.items = action.payload;
    },
    setToken: (state, action) => {
      state.items = action.payload;
    },
  },
});

export const { setUser, setToken } = authSlice.actions;
export default authSlice.reducer;
