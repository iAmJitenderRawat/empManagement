// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { logout, setCredentials } from "../features/authSlice";

const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_BASE_URL,
  credentials: "include",
});

const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);
  console.log(result);
  if (result.error && result.error.status === 401) {
    // try to get a new token
    const refreshResult = await baseQuery(
      "/user/refreshAccessToken",
      api,
      extraOptions
    );
    console.log(refreshResult, "baseQueryWithReauth");
    if (refreshResult.data) {
      // store the new token
      api.dispatch(
        api.dispatch(setCredentials(refreshResult.data.data))
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
export const profileApi = createApi({
  reducerPath: "profileApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["avatar", "getCurrentUser"],
  endpoints: (builder) => ({
    getCurrentUser: builder.query({
      query: (token) => ({
        url: "/user/getCurrentUser",
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      providesTags: ["getCurrentUser","avatar"],
    }),
    //refresh access-token
    refreshAccessToken: builder.query({
      query: () => ({
        url: "/user/refreshAccessToken",
        method: "GET",
      }),
    }),
    uploadAvatar: builder.mutation({
      query: (file) => {
        const formData = new FormData();
        formData.append("avatar", file);
        console.log("formData", formData);
        return {
          url: "/user/uploadAvatar",
          method: "PATCH",
          body: formData,
        };
      },
      invalidatesTags: ["avatar"],
    }),
    updateUser: builder.mutation({
      query: (userDetail) => {
        return {
          url: "/user/updateUser",
          method: "PATCH",
          body: userDetail,
        };
      },
      invalidatesTags: ["avatar"],
    }),
    changePassword: builder.mutation({
      query: (passwords) => {
        return {
          url: "/user/changePassword",
          method: "POST",
          body: passwords,
        };
      },
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useUploadAvatarMutation, useUpdateUserMutation, useChangePasswordMutation, useGetCurrentUserQuery, useLazyGetCurrentUserQuery } = profileApi;
