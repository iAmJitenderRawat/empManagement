// features/authSlice.js
import { createSlice } from "@reduxjs/toolkit";
//redux-persist
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web and AsyncStorage for react
import { persistReducer } from "redux-persist";

const initialState = {
  accessToken: null,
  currentUser: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, { payload }) => {
      state.accessToken = payload?.accessToken;
      state.currentUser = payload?.user;
    },
    logout: (state) => {
      state.accessToken = null;
      state.currentUser = null;
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;
