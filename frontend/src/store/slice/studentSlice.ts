import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { errorHelper } from "../../utils/errorHelper";
import { config } from "../../utils/config";
import { headerOptions } from "../../utils/requestOption";
import {
  CreateStudent,
  DeletStudent,
  studentData,
  StudentSlice,
  UpdateStudent,
} from "../../types/student";
const initialState: StudentSlice = {
  items: [],
  data: studentData,
  isLoading: false,
  error: null,
};

export const handleGetStudent = createAsyncThunk(
  "get/student",
  async (option, thunkApi) => {
    try {
      const response = await fetch(`${config.apiUrl}/students`, {
        method: "GET",
        headers: headerOptions(),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message);
      }

      thunkApi.dispatch(setStudent(data.students));
    } catch (error: any) {
      errorHelper(error.message);
    }
  }
);
export const handleShowStudent = createAsyncThunk(
  "show/student",
  async (id: number, thunkApi) => {
    try {
      const response = await fetch(`${config.apiUrl}/students/${id}`, {
        method: "GET",
        headers: headerOptions(),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message);
      }

      thunkApi.dispatch(setStudentData(data.student));
    } catch (error: any) {
      errorHelper(error.message);
    }
  }
);
export const handleCreateStudent = createAsyncThunk(
  "creat/category",
  async (option: CreateStudent, thunkApi) => {
    const { name, email, password, phone, assetUrl, onSuccess } = option;
    try {
      const response = await fetch(`${config.apiUrl}/students`, {
        method: "POST",
        headers: headerOptions(),
        body: JSON.stringify({ name, email, password, phone, assetUrl }),
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

export const handleUpdateStudent = createAsyncThunk(
  "update/category",
  async (option: UpdateStudent, thunkApi) => {
    const { id, name, email, password, phone, assetUrl, onSuccess } = option;
    try {
      const response = await fetch(`${config.apiUrl}/students/${id}`, {
        method: "PUT",
        headers: headerOptions(),
        body: JSON.stringify({ name, email, password, phone, assetUrl }),
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

export const handleDeletStudent = createAsyncThunk(
  "delete/student",
  async (option: DeletStudent, thunkApi) => {
    const { id, onSuccess } = option;
    try {
      const response = await fetch(`${config.apiUrl}/students/${id}`, {
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

export const studentSlice = createSlice({
  name: "studentSlice",
  initialState,
  reducers: {
    setStudent: (state, action) => {
      state.items = action.payload;
    },
    setStudentData: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const { setStudent, setStudentData } = studentSlice.actions;
export default studentSlice.reducer;
