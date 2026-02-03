import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { FeedDescriptions, Feeds } from '../../types/Types'
import { apiDomain } from '../../apiDomain/ApiDomain'

export const FeedsApi = createApi({
  reducerPath: 'FeedsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: apiDomain,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as any).authSlice?.token;
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    }
  }),
  tagTypes: ['feed', 'feedDesc'],
  endpoints: (builder) => ({

    // ================= VEHICLES =================

    //get all feeds
    getAllfeeds: builder.query<Feeds[], void>({
      query: () => '/feeds',
      providesTags: ['feed'],
    }),


    
    // get feed by id (DETAILS VIEW)
    getfeedById: builder.query<FeedDescriptions, number>({
      query: (feed_id) => `/feeds/${feed_id}`,
      providesTags: ["feed", "feedDesc"],
    }),


//add a feed
    addfeed: builder.mutation<{ message: string }, Omit<Feeds, 'feed_id'>>({
      query: (newFeed) => ({
        url: '/feeds',
        method: 'POST',
        body: newFeed,
      }),
      invalidatesTags: ['feed'],
    }),


//update feed
    updatefeed: builder.mutation<
      { message: string },
      { feed_id: number } & Partial<Feeds>
    >({
      query: ({ feed_id, ...updatedItem }) => ({
        url: `/feeds/${feed_id}`,
        method: 'PUT',
        body: updatedItem,
      }),
      invalidatesTags: ['feed'],
    }),


    //delete a feed
    deletefeed: builder.mutation<{ message: string }, number>({
      query: (feed_id) => ({
        url: `/feeds/${feed_id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['feed'],
    }),

    filterFeeds: builder.query({
  query: (params) => ({
    url: "/feeds/filter",
    params
  })
}),


    // ================= FEED DESCRIPTION =================

    getAllFeedDescs: builder.query<FeedDescriptions[], void>({
      query: () => '/feedDesc',
      providesTags: ['feedDesc'],
    }),

    addFeedDesc: builder.mutation<{ message: string }, FeedDescriptions>({
      query: (newDesc) => ({
        url: '/feedDesc',
        method: 'POST',
        body: newDesc,
      }),
      invalidatesTags: ['feedDesc'],
    }),
  }),
})

// ✅ Auto-generated hooks
export const {
  useGetAllfeedsQuery,
  useGetfeedByIdQuery,
  useAddfeedMutation,
  useUpdatefeedMutation,
  useDeletefeedMutation,

  useGetAllFeedDescsQuery,
  useAddFeedDescMutation
} =FeedsApi
