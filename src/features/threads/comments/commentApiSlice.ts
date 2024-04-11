import { CONFIG } from "@/lib/config"
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const commentApiSlice = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: CONFIG.API_URL,
   
  }),
  reducerPath: "commentApi",
  tagTypes: ["Threads"],
  endpoints: build => ({
    getComments: build.query({
      query: threadId => `threads/${threadId}/comments`,
      providesTags: ["Threads"],
    }),
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
  }),
})

export const {
  useGetCommentsQuery,
  useAddCommentMutation,
} = commentApiSlice
