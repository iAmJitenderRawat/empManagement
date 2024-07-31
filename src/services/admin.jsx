// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: `${import.meta.env.VITE_BASE_URL}/admin`,
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
export const adminApi = createApi({
  reducerPath: "adminApi",
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    getAllUsers: builder.query({
      query: (token) => ({
        url: "/getAllUsers",
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
    deleteUser: builder.mutation({
      query: () => ({
        url: "/deleteUser",
        method: "DELETE",
      }),
    }),
    addProject: builder.mutation({
      query: (project) => ({
        url: "/addProject",
        method: "POST",
        body: project,
      }),
    }),
    getAllProjects: builder.query({
      query: (token) => ({
        url: "/getAllProjects",
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
    deleteProject: builder.mutation({
      query: () => ({
        url: "/deleteProject",
        method: "DELETE",
      }),
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {useGetAllUsersQuery,useDeleteUserMutation,useAddProjectMutation,useGetAllProjectsQuery,useDeleteProjectMutation} = adminApi;
