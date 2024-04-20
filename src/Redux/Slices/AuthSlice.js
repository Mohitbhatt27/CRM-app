import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";

import axiosInstance from "../../config/axiosInstance";

const initialState = {
  role: localStorage.getItem("role") || "",
  data: JSON.parse(localStorage.getItem("data")) || undefined,
  token: localStorage.getItem("token") || "",
  isLoggedIn: localStorage.getItem("isLoggedIn") || false,
};

export const login = createAsyncThunk("/auth/login", async (data) => {
  try {
    const response = axiosInstance.post("auth/signin", data);
    toast.promise(response, {
      loading: "Submitting form",
      success: "Successfully signed in",
      error: "Something went wrong, try again",
    });
    return await response;
  } catch (error) {
    console.log(error);
  }
});

export const signup = createAsyncThunk("auth/signup", async (data) => {
  try {
    const response = axiosInstance.post("auth/signup", data);
    toast.promise(response, {
      loading: "Submitting form",
      success: "Successfully signed up",
      error: "Something went wrong, try again",
    });
    return await response;
  } catch (error) {
    console.log(error);
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state, action) => {
      if (!action.payload) return;

      state.role = action.payload.data?.userData?.userType;
      state.data = action.payload.data?.userData;
      state.token = action.payload.data?.token;
      state.isLoggedIn = action.payload.data?.token != undefined;

      localStorage.setItem("role", action.payload.data?.userData?.userType);
      localStorage.setItem(
        "data",
        JSON.stringify(action.payload.data?.userData)
      );
      localStorage.setItem("token", action.payload.data?.token);
      localStorage.setItem(
        "isLoggedIn",
        action.payload.data?.token != undefined
      );
    });
  },
});

export default authSlice.reducer;
