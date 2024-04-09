import ActionTooltip from '@/components/ActionTooltip'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import CommmentForm from '@/features/threads/comments/CommentForm'
import CommentList from '@/features/threads/comments/CommentList'
import { useGetThreadDetailsQuery } from '@/features/threads/threadsApiSlice'
import { ThumbsDown, ThumbsUp, TimerIcon } from 'lucide-react'
import { useParams } from 'react-router-dom'

type Props = {}

const DetailPage = (props: Props) => {
  const { id } = useParams()
  const { data, isFetching, isSuccess } = useGetThreadDetailsQuery(id as string)


  if (isFetching) return <p>Loading...</p>
  const threadData = data?.data.detailThread
  const comments = threadData?.comments


  if (isSuccess) {
    return (
      <div className='flex flex-col gap-5'>
        <Card>
          <CardHeader className=''>
            <div className='flex items-center gap-3'>

              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <div className='font-medium  flex flex-col'>
                <span className='text-2x'>Rony</span>
                <div className='flex items-center'>
                  <TimerIcon className='w-4 h-4 text-gray-500' />
                  <span className='text-gray-500'>{
                    new Date().toLocaleDateString()
                  }</span>

                </div>
              </div>
            </div>
          </CardHeader>
        </Card>

        <Card>
          <Badge variant='outline' className='m-5 mb-0'>React</Badge>
          <CardHeader className='text-2xl font-bold mt-0'>
            {threadData?.title}
          </CardHeader>
          <CardContent >
            <div dangerouslySetInnerHTML={{ __html: threadData?.body as string }} />

          </CardContent>

          <CardFooter className="flex gap-2">
            <ActionTooltip label='Like'>
              <Button variant="outline" className='rounded-xl flex gap-2'>
                <ThumbsUp className='w-4' />
                <span>
                  3
                  {/* {threadData.upVotesBy.length} */}
                </span>
              </Button>
            </ActionTooltip>
            <ActionTooltip label='Dislike'>
              <Button variant="outline" className='rounded-xl flex gap-2'>
                <ThumbsDown className='w-4' />
                <span>
                  3
                  {/* {threadData.downVotesBy.length} */}
                </span>
              </Button>
            </ActionTooltip>
          </CardFooter>
        </Card>

        <CommmentForm />
        <CommentList comments={comments ?? []} />
      </div>
    )
  }
}

export default DetailPage