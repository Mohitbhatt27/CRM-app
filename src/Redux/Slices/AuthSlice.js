import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import axiosInstance from "../../config/axiosInstance";

const initialState = {
  role: localStorage.getItem("role") || "",
  data: JSON.parse(localStorage.getItem("data")) || undefined,
  token: localStorage.getItem("token") || "",
  isLoggedIn: localStorage.getItem("isLoggedIn") || false,
};

export const login = createAsyncThunk("/auth/login", async (data) => {
  try {
    const response = await axiosInstance.post("auth/signin", data);
    return response;
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
