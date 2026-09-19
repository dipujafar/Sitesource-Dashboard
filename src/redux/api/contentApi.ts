import { tagTypes } from "../tagTypes";
import { baseApi } from "./baseApi";

const contentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getContent: builder.query({
      query: () => ({
        url: "/legal",
        method: "GET",
      }),
      providesTags: [tagTypes.content],
    }),
    updateContent: builder.mutation({
      query: (data) => ({
        url: "/legal",
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: [tagTypes.content],
    }),
  }),
});

export const { useGetContentQuery, useUpdateContentMutation } = contentApi;
