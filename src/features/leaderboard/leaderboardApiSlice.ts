import { CONFIG } from "@/lib/config";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface LeaderboardApiResponse {
  status: string;
  message: string;
  data: {
    leaderboards: Leaderboard[]
  }
}  

export interface Leaderboard {
  user: User
  score: number
}

interface User {
  id: string
  name: string
  email: string
  avatar: string
}

export const leaderboardApiSlice = createApi({
  baseQuery: fetchBaseQuery({baseUrl: CONFIG.API_URL}),
  reducerPath: "leaderboardApi",
  tagTypes: ["Leaderboard"],
  endpoints: build => ({
    getLeaderboard: build.query<LeaderboardApiResponse, void>({
      query: () => "leaderboards",
      providesTags: ["Leaderboard"],
    }),
  }),
});

export const { useGetLeaderboardQuery } = leaderboardApiSlice;
