import { tagTypes } from "../tagTypes";
import { baseApi } from "./baseApi";

const supportsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getSupports: builder.query({
      query: (params) => ({
        url: "/admin/supports",
        method: "GET",
        params,
      }),
      providesTags: [tagTypes.supports],
    }),
  }),
});

export const { useGetSupportsQuery } = supportsApi;
