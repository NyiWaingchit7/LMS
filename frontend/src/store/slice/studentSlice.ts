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
import toast from "react-hot-toast";
import { Payload } from "../../types/auth";
const initialState: StudentSlice = {
  items: [],
  links: [],
  data: studentData,
  isLoading: false,
  error: null,
};

export const handleGetStudent = createAsyncThunk(
  "get/student",
  async ({ page = 1, searchKey = "" }: Payload, thunkApi) => {
    try {
      const response = await fetch(
        `${config.apiUrl}/students?page=${page}&searchKey=${searchKey}`,
        {
          method: "GET",
          headers: headerOptions(),
        }
      );
      const { data } = await response.json();
      if (!response.ok) {
        throw new Error(data.message);
      }

      thunkApi.dispatch(setStudent(data.data));
      thunkApi.dispatch(setStudentLink(data.links));
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
      toast.error(`${error.message}`, {
        duration: 5000,
      });
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
        thunkApi.dispatch(setStudentError(data.errors));
        throw new Error(data);
      }

      onSuccess && onSuccess();
    } catch (error: any) {
      errorHelper(error);
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
        thunkApi.dispatch(setStudentError(data.errors));
        throw new Error(data);
      }

      onSuccess && onSuccess();
    } catch (error: any) {
      toast.error(`${error.message}`, {
        duration: 5000,
      });
      errorHelper(error);
    }
  }
);

export const handleDeletStudent = createAsyncThunk(
  "delete/student",
  async (option: DeletStudent) => {
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
      state.data = { ...action.payload, purchase: action.payload.Purchase };
    },
    setStudentError: (state, action) => {
      state.error = action.payload;
    },
    setStudentLink: (state, action) => {
      state.links = action.payload;
    },
  },
});

export const { setStudent, setStudentData, setStudentError, setStudentLink } =
  studentSlice.actions;
export default studentSlice.reducer;
