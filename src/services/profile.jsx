// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: `${import.meta.env.VITE_BASE_URL}/user`,
  credentials: "include",
});

const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);
  console.log(result);
  if (result.error && result.error.status === 401) {
    // try to get a new token
    const refreshResult = await baseQuery(
      "/refreshAccessToken",
      api,
      extraOptions
    );
    console.log(refreshResult);
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
export const profileApi = createApi({
  reducerPath: "profileApi",
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    uploadAvatar: builder.mutation({
      query: (file) => {
        const formData = new FormData();
        formData.append("avatar", file);
        console.log('formData', formData)
        return {
          url: "/uploadAvatar",
          method: "PATCH",
          body: formData,
        };
      },
    }),
    updateUser: builder.mutation({
      query: (userDetail) => {
        return {
          url: "/updateUser",
          method: "PATCH",
          body: userDetail,
        };
      },
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useUploadAvatarMutation, useUpdateUserMutation } = profileApi;
