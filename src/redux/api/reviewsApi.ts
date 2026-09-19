import { tagTypes } from "../tagTypes";
import { baseApi } from "./baseApi";

const reviewsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getReviews: builder.query({
      query: (params) => ({
        url: "/admin/reviews",
        method: "GET",
        params,
      }),
      providesTags: [tagTypes.reviews],
    }),
    deleteReview: builder.mutation({
      query: (id) => ({
        url: `/admin/reviews/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.reviews],
    }),
  }),
});

export const { useGetReviewsQuery, useDeleteReviewMutation } = reviewsApi;
