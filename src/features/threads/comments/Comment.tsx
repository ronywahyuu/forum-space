import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import type { Comment as CommentType } from "@/types/thread"
import { formatTimeAgo } from "@/lib/utils"
interface CommentProps {
  comment: CommentType
}
const Comment = ({ comment }: CommentProps) => {
  return (
    <Card>
      <CardHeader className="">
        <div className="flex items-center gap-2">
          <Avatar>
            <AvatarImage src={comment.owner.avatar} alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>

          <div>
            <span className='text-2x'>{comment.owner.name}</span>
            <div className='flex items-center'>
              <span className='text-gray-500'>{
                formatTimeAgo(comment.createdAt)
              }</span>
            </div>
          </div>

        </div>
      </CardHeader>

      <CardContent>
        <div className='flex flex-col gap-2'>
         
          <div dangerouslySetInnerHTML={{ __html: comment.content }} />

        </div>
      </CardContent>
    </Card>
  )
}

export default Comment