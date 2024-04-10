import { CONFIG } from "@/lib/config"
import type { Thread } from "@/types/thread"
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

interface ApiResponse<T> {
  status: string
  message: string
  data: T
}

export interface ThreadsApiResponse
  extends ApiResponse<{ threads: Thread[] }> {}

export interface ThreadDetailsApiResponse
  extends ApiResponse<{ detailThread: Thread }> {}

export const threadsApiSlice = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: CONFIG.API_URL }),
  reducerPath: "threadsApi",
  tagTypes: ["Threads"],
  endpoints: build => ({
    getThreads: build.query<ThreadsApiResponse, void>({
      query: () => "threads",
      providesTags: ["Threads"],
    }),
    getThreadDetails: build.query<ThreadDetailsApiResponse, string>({
      query: id => `threads/${id}`,
      providesTags: ["Threads"],
    }),
  }),
})

export const { useGetThreadsQuery, useGetThreadDetailsQuery } = threadsApiSlice
