import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
// import type { ProductsApiResponse } from "./types"
export interface Product {
  id: number
  title: string
  description: string
  price: number
  discountPercentage: number
  rating: number
  stock: number
  brand: string
  category: string
  thumbnail: string
  images: string[]
}

export interface ProductsApiResponse {
  products: Product[]
  total: number
  skip: number
  limit: number
}

export const productsApiSlice = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: "https://dummyjson.com/products" }),
  reducerPath: "productsApi",
  tagTypes: ["Products"],
  endpoints: build => ({
    getProducts: build.query<
      ProductsApiResponse,
      void
    >({
      // query: (limit = 0) => `?limit=${limit}`,
      // query: ({ skip = 0, limit = 5 }) => `?skip=${skip}&limit=${limit}`,
      query: () => "",
      //   providesTags: (result, error, id) => [{ type: "Products", id }],
      // providesTags: (result, error, { skip = 0, limit = 5 }) => [
      //   { type: "Products", id: skip, limit },
      // ],
      providesTags: ["Products"],
    }),
    addProduct: build.mutation<void, { title: string }>({
      query: ({ title }) => ({
        url: "/add",
        method: "POST",
        body: { title },
      }),
      invalidatesTags: [{ type: "Products" }],
      // invalidatesTags: [{ type: "Products", id: 0, limit: 5 }],
    }),
  }),
})

export const { useGetProductsQuery  } = productsApiSlice
