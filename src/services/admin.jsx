// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { logout } from "../features/authSlice";

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
  tagTypes: ["getAllUsers", "getAllProjects"],
  endpoints: (builder) => ({
    getAllUsers: builder.query({
      query: (token) => ({
        url: "/admin/getAllUsers",
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      providesTags: ["getAllUsers"],
    }),
    deleteUser: builder.mutation({
      query: () => ({
        url: "/admin/deleteUser",
        method: "DELETE",
      }),
      invalidatesTags: ["getAllUsers"],
    }),
    addProject: builder.mutation({
      query: (project) => ({
        url: "/admin/addProject",
        method: "POST",
        body: project,
      }),
      invalidatesTags: ["getAllProjects"],
    }),
    getAllProjects: builder.query({
      query: (token) => ({
        url: "/admin/getAllProjects",
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      providesTags: ["getAllProjects"],
    }),
    deleteProject: builder.mutation({
      query: () => ({
        url: "/admin/deleteProject",
        method: "DELETE",
      }),
      invalidatesTags: ["getAllProjects"],
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {useGetAllUsersQuery,useDeleteUserMutation,useAddProjectMutation,useGetAllProjectsQuery,useDeleteProjectMutation} = adminApi;
