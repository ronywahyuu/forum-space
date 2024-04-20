import type { Comment as CommentType } from "@/types/thread"
import Comment from "./Comment"

interface CommentListProps {
  comments: CommentType[]
}

const CommentList = ({ comments }: CommentListProps) => {
  return (
    <div className="mb-20 space-y-3">
      {
        comments.map((comment) => (
          <Comment key={comment.id} comment={comment} />
        ))
      }
    </div>
  )
}

export default CommentList