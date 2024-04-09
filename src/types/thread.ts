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

export interface Owner {
  id: string
  name: string
  avatar: string
}
