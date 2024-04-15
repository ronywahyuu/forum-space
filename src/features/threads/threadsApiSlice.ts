import { CONFIG } from "@/lib/config"
import type { Thread } from "@/types/thread"
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

interface ApiResponse<T> {
  status: string
  message: string
  data: T
}

interface ThreadRequest {
  title: string
  body: string
  category?: string
}

export interface ThreadsApiResponse
  extends ApiResponse<{ threads: Thread[] }> {}

export interface ThreadDetailsApiResponse
  extends ApiResponse<{ detailThread: Thread }> {}

export const threadsApiSlice = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: CONFIG.API_URL,
  }),
  reducerPath: "threadsApi",
  tagTypes: ["Threads"],
  endpoints: build => ({
    /**
     * THREADS ENDPOINTS
     */
    getThreads: build.query<ThreadsApiResponse, void>({
      query: () => "threads",
      providesTags: ["Threads"],
    }),
    getThreadDetails: build.query<ThreadDetailsApiResponse, string>({
      query: id => `threads/${id}`,
      providesTags: (result, error, id) => [{ type: "Threads", id }],
    }),
    addThread: build.mutation<Thread, ThreadRequest>({
      query: ({ body, title, category }) => {
        const token = localStorage.getItem("token")
        return {
          url: "threads",
          method: "POST",
          body: { title, body, category },
          headers: token ? { authorization: `Bearer ${token}` } : {},
        }
      },
      invalidatesTags: ["Threads"],
    }),

    /**
     * COMMENTS ENDPOINTS
     */
    addComment: build.mutation({
      query: ({ threadId, content }) => {
        const token = localStorage.getItem("token")
        return {
          url: `threads/${threadId}/comments`,
          method: "POST",
          body: { content },
          headers: token ? { authorization: `Bearer ${token}` } : {},
        }
      },
      invalidatesTags: (result, error, { threadId }) => [
        { type: "Threads", id: threadId },
      ],
    }),

    /**
     * VOTES ENDPOINTS
     *  */
    upvoteThread: build.mutation({
      query: ({ threadId }) => {
        const token = localStorage.getItem("token")
        return {
          url: `threads/${threadId}/up-vote`,
          method: "POST",
          headers: token ? { authorization: `Bearer ${token}` } : {},
        }
      },
      async onQueryStarted({ id, ...patch }, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          threadsApiSlice.util.updateQueryData('getThreads', id, (draft) => {
            Object.assign(draft, patch)
          })
        )
        try {
          await queryFulfilled
        } catch {
          patchResult.undo()

          /**
           * Alternatively, on failure you can invalidate the corresponding cache tags
           * to trigger a re-fetch:
           * dispatch(api.util.invalidateTags(['Post']))
           */
        }
      
      },
      // invalidatesTags: (result, error, { threadId }) => [
      //   { type: "Threads", id: threadId },
      // ],
      invalidatesTags: ["Threads"]
    }),

    downvoteThread: build.mutation({
      query: ({ threadId, vote }) => {
        const token = localStorage.getItem("token")
        return {
          url: `threads/${threadId}/down-vote`,
          method: "POST",
          body: { vote },
          headers: token ? { authorization: `Bearer ${token}` } : {},
        }
      },
      // invalidatesTags: (result, error, { threadId }) => [
      //   { type: "Threads", id: threadId },
      // ],
      invalidatesTags: ["Threads"],
    }),
    neutralizeThreadVote: build.mutation({
      query: ({ threadId }) => {
        const token = localStorage.getItem("token")
        return {
          url: `threads/${threadId}/neutral-vote`,
          method: "POST",
          headers: token ? { authorization: `Bearer ${token}` } : {},
        }
      },
      // invalidatesTags: (result, error, { threadId }) => [
      //   { type: "Threads", id: threadId },
      // ],
      invalidatesTags: ["Threads"],
    }),


    
  }),
})

export const {
  useGetThreadsQuery,
  useGetThreadDetailsQuery,
  useAddThreadMutation,
  useAddCommentMutation,
  useUpvoteThreadMutation,
  useDownvoteThreadMutation,
  useNeutralizeThreadVoteMutation,

} = threadsApiSlice
