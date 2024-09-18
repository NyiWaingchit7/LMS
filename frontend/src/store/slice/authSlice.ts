import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { LoginOption, LoginSlice } from "../../types/auth";
import { config } from "../../utils/config";

const initialState: LoginSlice = {
  items: [],
  isLoading: false,
  error: null,
};

export const handleLogin = createAsyncThunk(
  "login/user",
  async (option: LoginOption, thunkApi) => {
    const { email, password, onSuccess, onError } = option;
    try {
      const response = await fetch(`${config.apiUrl}/auth/log-in`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      }
      thunkApi.dispatch(setUser(data.user));
      localStorage.setItem("accessToken", data.token);
      onSuccess && onSuccess();
    } catch (error: any) {
      onError && onError(error.message);
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
  },
});

export const { setUser } = authSlice.actions;
export default authSlice.reducer;
