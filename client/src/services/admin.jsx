// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { logout, setCredentials } from "../features/authSlice";
import { useLogoutMutation } from "./auth";

const limit = import.meta.env.VITE_LIMIT;

const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_BACKEND_URL,
  credentials: "include",
});

const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);
  if (result.error && result.error.status === 401) {
    // try to get a new token
    const refreshResult = await baseQuery(
      "/user/refreshAccessToken",
      api,
      extraOptions
    );

    if (refreshResult.data) {
      // store the new token
      api.dispatch(setCredentials(refreshResult.data.data));
      // retry the original query with new access token
      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(logout());
      const [logoutUser] = useLogoutMutation();
      logoutUser();
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
      query: (queryParams) => {
        const { page, gender, search, sortField, sortOrder } = queryParams;
        return {
          url: "/admin/users",
          method: "GET",
          params: { page, gender, search, sortField, sortOrder },
        };
      },
      providesTags: ["getAllUsers"],
    }),
    addUser: builder.mutation({
      query: (user) => ({
        url: "/admin/users/addUser",
        method: "POST",
        body: user,
      }),
      invalidatesTags: ["getAllUsers"],
    }),
    userDetail: builder.query({
      query: (id) => {
        return {
          url: `/admin/users/${id}`,
          method: "GET",
        };
      },
    }),
    updateUser: builder.mutation({
      query: (userDetail) => {
        return {
          url: `/admin/updateUser/${userDetail._id}`,
          method: "PATCH",
          body: userDetail,
        };
      },
      invalidatesTags: ["getAllUsers"],
    }),
    deleteUser: builder.mutation({
      query: (id) => {
        return {
          url: `/admin/deleteUser/${id}`,
          method: "DELETE",
        };
      },
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
      query: (queryParams) => {
       const { page, sortField, sortOrder, search, priority, status } = queryParams;
        return {
          url: "/admin/projects",
          method: "GET",
          params: { page, sortField, sortOrder, search, priority, status },
        };
      },
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
export const {
  useGetAllUsersQuery,
  useUserDetailQuery,
  useAddUserMutation,
  useDeleteUserMutation,
  useAddProjectMutation,
  useGetAllProjectsQuery,
  useDeleteProjectMutation,
  useUpdateUserMutation,
} = adminApi;
