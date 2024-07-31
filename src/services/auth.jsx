// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { REHYDRATE } from "redux-persist";

function isHydrateAction(action) {
  return action.type === REHYDRATE;
}

const baseQuery = fetchBaseQuery({
  baseUrl: `${import.meta.env.VITE_BASE_URL}/user`,
  credentials: "include",
});

const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);
console.log(result)
  if (result.error && result.error.status === 401) {
    // try to get a new token
    const refreshResult = await baseQuery("/refreshAccessToken", api, extraOptions);
console.log(refreshResult)
    if (refreshResult.data) {
      // store the new token
      api.dispatch(
        authApi.util.updateQueryData("refreshToken", undefined, (draft) => {
          draft.accessToken = refreshResult.data.accessToken;
        })
      );
      // retry the original query with new access token
      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(logout());
    }
  }

  return result;
};

// Define a service using a base URL and expected endpoints
export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: baseQueryWithReauth,
  extractRehydrationInfo(action, { reducerPath }) {
    if (isHydrateAction(action)) {
      // when persisting the api reducer
      if (action.key === "key used with redux-persist") {
        return action.payload;
      }

      // When persisting the root reducer
      return action.payload[authApi.reducerPath];
    }
  },
  endpoints: (builder) => ({
    getCurrentUser: builder.query({
      query: (token) => ({
        url: "/getCurrentUser",
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
    login: builder.mutation({
      query: (credentials) => ({
        url: "/login",
        method: "POST",
        body: credentials,
      }),
    }),
    register: builder.mutation({
      query: (credentials) => ({
        url: "/register",
        method: "POST",
        body: credentials,
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: "/logout",
        method: "POST",
      }),
    }),
    //refresh access-token
    refreshAccessToken: builder.query({
      query: () => ({
        url: "refreshAccessToken",
        method: "POST",
      }),
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useGetCurrentUserQuery,
  useRegisterMutation,
  useLoginMutation,
  useLogoutMutation,
  useLazyRefreshAccessTokenQuery,
} = authApi;
