
import { createAppSlice } from "@/app/createAppSlice";
import { CONFIG } from "@/lib/config";

export interface CommentSliceState {
  upvoteCount: number
  downvoteCount: number
  status: "idle" | "loading" | "failed"
}

const initialState: CommentSliceState = {
  upvoteCount: 0,
  downvoteCount: 0,
  status: "idle",
}

export const commentSlice = createAppSlice({
  name: "comment",
  initialState,
  reducers: create => ({
    upvoteCommentAsync: create.asyncThunk(
      async ({
        threadId,
        commentId,
      }: {
        threadId: string
        commentId: string
      }) => {
        const response = await fetch(
          CONFIG.API_URL + `/threads/${threadId}/comments/${commentId}/up-vote`,
          {
            method: "POST",
            headers: {
              authorization: `Bearer ${localStorage.getItem("token")}` || "",
            },
          },
        )
        return response.json()

      },
      {
        pending: state => {
          state.status = "loading"
        },
        fulfilled: (state, action) => {
          console.log(action.payload.upvoteCount)
          state.status = "idle"
          // state.upvoteCount += 1
          if (action.payload.status === "success") {
            state.upvoteCount += 1
            state.downvoteCount -= 1
          }
        },
        rejected: state => {
          state.status = "failed"
        },
      },
    ),
    downvoteCommentAsync: create.asyncThunk(
      async ({
        threadId,
        commentId,
      }: {
        threadId: string
        commentId: string
      }) => {
        const response = await fetch(
          CONFIG.API_URL +
            `/threads/${threadId}/comments/${commentId}/down-vote`,
          {
            method: "POST",
            headers: {
              authorization: `Bearer ${localStorage.getItem("token")}` || "",
            },
          },
        )
        return response.json()
      },
      {
        pending: state => {
          state.status = "loading"
        },
        fulfilled: (state, action) => {
          state.status = "idle"
          state.downvoteCount += 1
          state.upvoteCount -= 1
        },
        rejected: state => {
          state.status = "failed"
        },
      },
    ),
    neutralizeVoteCommentAsync: create.asyncThunk(
      async ({
        threadId,
        commentId,
      }: {
        threadId: string
        commentId: string
      }) => {
        const response = await fetch(
          CONFIG.API_URL +
            `/threads/${threadId}/comments/${commentId}/neutral-vote`,
          {
            method: "POST",
            headers: {
              authorization: `Bearer ${localStorage.getItem("token")}` || "",
            },
          },
        )
        return response.json()
      },
      {
        pending: state => {
          state.status = "loading"
        },
        fulfilled: (state, action) => {
          state.status = "idle"
          state.upvoteCount = action.payload.upvoteCount
          state.downvoteCount = action.payload.downvoteCount
        },
        rejected: state => {
          state.status = "failed"
        },
      },
    ),
  }),
  selectors: {
    selectUpvoteCount: comment => comment.upvoteCount,
    selectDownvoteCount: comment => comment.downvoteCount,
    selectCommentStatus: comment => comment.status,
  },
})

export const {
  upvoteCommentAsync,
  downvoteCommentAsync,
  neutralizeVoteCommentAsync,
} = commentSlice.actions

export const { selectUpvoteCount, selectDownvoteCount, selectCommentStatus } =
  commentSlice.selectors




