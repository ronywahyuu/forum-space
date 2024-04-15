import { CONFIG } from "@/lib/config"
import type { LoginResponse, RegisterResponse } from "@/types/global"
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

interface AuthApiResponse {
  status: string
  message: string
  data: {
    user: User
    users?: User[]
  }
}

interface User {
  id: string
  name: string
  email: string
  avatar: string
}

interface LoginRequest {
  email: string
  password: string
}

interface RegisterRequest {
  name: string
  email: string
  password: string
}

export const authApiSlice = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: CONFIG.API_URL,
    prepareHeaders: (headers, { getState }) => {
      // Use Redux state to get the token, replace `token` with your actual token path
      // const token = (getState() as any).auth.token;
      const token = localStorage.getItem("token");
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  reducerPath: "authApi",
  tagTypes: ["Auth"],
  endpoints: build => ({
    getCurrentUser: build.query<AuthApiResponse, void>({
      query: () => "users/me",
      providesTags: ["Auth"],
    }),
    getAllUsers: build.query<AuthApiResponse, void>({
      query: () => "users",
      providesTags: ["Auth"],
    }),
    login: build.mutation<LoginResponse, LoginRequest>({
      query: ({ email, password }) => ({
        url: "login",
        method: "POST",
        body: { email, password },
      }),
      invalidatesTags: ["Auth"],
    }),
    register: build.mutation<RegisterResponse, RegisterRequest>({
      query: ({ name, email, password }) => ({
        url: "register",
        method: "POST",
        body: { name, email, password },
      }),
      invalidatesTags: ["Auth"],
    
    }),
  }),
})

export const { useGetCurrentUserQuery, useGetAllUsersQuery, useLoginMutation, useRegisterMutation } =
  authApiSlice
