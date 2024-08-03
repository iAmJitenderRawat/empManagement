// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: `${import.meta.env.VITE_BASE_URL}`,
  credentials: "include",
});

// Define a service using a base URL and expected endpoints
export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery,
  tagTypes: ["getCurrentUser"],
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: "/user/login",
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: ["getCurrentUser"],
    }),
    register: builder.mutation({
      query: (credentials) => ({
        url: "/user/register",
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: ["getCurrentUser"],
    }),
    logout: builder.mutation({
      query: () => ({
        url: "/user/logout",
        method: "POST",
      }),
      invalidatesTags: ["getCurrentUser"],
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useRegisterMutation,
  useLoginMutation,
  useLogoutMutation,
} = authApi;
