export interface User {
  id: string
  name: string
  email: string
  avatar: string
}

export interface Owner extends User {}
export interface ApiResponse<T> {
  status: string
  message: string
  error?: {
   status: number
   data:{
    status: string
    message: string
    data: any
   }
  }
  data: T
}
export interface AuthApiResponse extends ApiResponse<{ user: User }> {}


export interface LoginRequest {
  email: string
  password: string
}

export interface Thread {
  id: string
  title: string
  body: string
  category: string
  createdAt: string
  ownerId: string
  totalComments: number
  upVotesBy: string[]
  downVotesBy: any[]
  comments: Comment[]
}

export interface Comment {
  id: string
  content: string
  createdAt: string
  owner: Owner
  upVotesBy: any[]
  downVotesBy: any[]
}


export interface LoginResponse extends ApiResponse<LoginData> {}

export interface LoginData {
  data: {
    token: string
  }
}
