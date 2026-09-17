import { create } from "domain";
import { tagTypes } from "../tagTypes";
import { baseApi } from "./baseApi";

const usersApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getAllUsers: build.query({
      query: (params) => ({
        url: "/admin/users",
        method: "GET",
        params,
      }),
      providesTags: [tagTypes.users],
    }),
    userBlock: build.mutation({
      query: (id) => ({
        url: `/admin/users/${id}/status`,
        method: "PATCH",
        body: { status: "BLOCKED" },
      }),
      invalidatesTags: [tagTypes.users],
    }),
    userUnBlock: build.mutation({
      query: (id) => ({
        url: `/admin/users/${id}/status`,
        method: "PATCH",
        body: { status: "ACTIVE" },
      }),
      invalidatesTags: [tagTypes.users],
    }),
  }),
});

export const {
  useGetAllUsersQuery,
  useUserBlockMutation,
  useUserUnBlockMutation,
} = usersApi;
