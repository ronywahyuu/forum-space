import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import type { Comment as CommentType } from "@/types/thread"

interface CommentProps {
  comment: CommentType
}
const Comment = ({ comment }: CommentProps) => {
  // console.log(comment)
  return (
    <Card>
      <CardHeader className="">
        <div className="flex items-center gap-2">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>

          <div>
            <span className='text-2x'>Rony</span>
            <div className='flex items-center'>
              <span className='text-gray-500'>{
                new Date().toLocaleDateString()
              }</span>
            </div>
          </div>

        </div>
      </CardHeader>

      <CardContent>
        <div className='flex flex-col gap-2'>
          <span className='font-bold'>
            Rony
          </span>
          <div dangerouslySetInnerHTML={{ __html: comment.content }} />

        </div>
      </CardContent>
    </Card>
  )
}

export default Comment