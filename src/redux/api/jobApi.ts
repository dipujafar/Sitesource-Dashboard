import { baseApi } from "./baseApi";

const jobApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getJobs: builder.query({
      query: (params) => ({
        url: "/admin/jobs",
        method: "GET",
        params,
      }),
    }),
    deleteJob: builder.mutation({
      query: (id) => ({
        url: `/admin/jobs/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const { useGetJobsQuery, useDeleteJobMutation } = jobApi;
