import Comment from "./Comment"

type Props = {}

const CommentList = (props: Props) => {
  return (
    <div className="mb-20 space-y-3">
      <Comment/>
      <Comment/>
      <Comment/>
      <Comment/>
      <Comment/>
      <Comment/>
      <Comment/>
    </div>
  )
}

export default CommentList