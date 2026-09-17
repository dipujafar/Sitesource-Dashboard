import { tagTypes } from "../tagTypes";
import { baseApi } from "./baseApi";

const dashboardApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getDashboardStat: builder.query({
      query: () => ({
        url: "/admin/stats",
        method: "GET",
      }),
      providesTags: [tagTypes.dashboard],
    }),
  }),
});

export const { useGetDashboardStatQuery } = dashboardApi;
