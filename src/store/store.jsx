import { configureStore } from "@reduxjs/toolkit";
// Or from '@reduxjs/toolkit/query/react'
import { setupListeners } from "@reduxjs/toolkit/query";
import authReducer from "../features/authSlice";
import { authApi } from "../services/auth";
import { profileApi } from "../services/profile";
import { adminApi } from "../services/admin";

export const store = configureStore({
  reducer: {
    // Add the generated reducer as a specific top-level slice
    auth: authReducer,
    [authApi.reducerPath]: authApi.reducer,
    [profileApi.reducerPath]: profileApi.reducer,
    [adminApi.reducerPath]: adminApi.reducer,
  },
  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat([authApi.middleware, profileApi.middleware, adminApi.middleware])
});

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
setupListeners(store.dispatch);