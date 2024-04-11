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
      query: ({ threadId, vote }) => {
        const token = localStorage.getItem("token")
        return {
          url: `threads/${threadId}/votes`,
          method: "POST",
          body: { vote },
          headers: token ? { authorization: `Bearer ${token}` } : {},
        }
      },
      invalidatesTags: (result, error, { threadId }) => [
        { type: "Threads", id: threadId },
      ],
    }),

    downvoteThread: build.mutation({
      query: ({ threadId, vote }) => {
        const token = localStorage.getItem("token")
        return {
          url: `threads/${threadId}/votes`,
          method: "POST",
          body: { vote },
          headers: token ? { authorization: `Bearer ${token}` } : {},
        }
      },
      invalidatesTags: (result, error, { threadId }) => [
        { type: "Threads", id: threadId },
      ],
    }),
    // neutralizeThreadVote: build.mutation({}),


    
  }),
})

export const {
  useGetThreadsQuery,
  useGetThreadDetailsQuery,
  useAddThreadMutation,
  useAddCommentMutation,
  useUpvoteThreadMutation,
  useDownvoteThreadMutation,
  // useNeutralizeThreadVoteMutation,

} = threadsApiSlice
