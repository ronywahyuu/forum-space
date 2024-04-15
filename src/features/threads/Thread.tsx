import ActionTooltip from '@/components/ActionTooltip'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { formatTimeAgo } from '@/lib/utils'
import type { Thread as ThreadType } from '@/types/thread'
import { Link, useNavigate } from 'react-router-dom'
import { useDownvoteThreadMutation, useNeutralizeThreadVoteMutation, useUpvoteThreadMutation } from './threadsApiSlice'
import { BiSolidLike, BiLike, BiSolidDislike, BiDislike } from "react-icons/bi";
import { useGetAllUsersQuery, useGetCurrentUserQuery } from '../auth/authApiSlice'
import { MessageCircleMore } from 'lucide-react'

interface ThreadProps {
  threadData: ThreadType
}

const Thread = ({ threadData }: ThreadProps) => {
  const [upvoteThread] = useUpvoteThreadMutation()
  const [neutralizeVote] = useNeutralizeThreadVoteMutation()
  const [downvoteThread] = useDownvoteThreadMutation()
  const { data, isFetching } = useGetCurrentUserQuery()
  const { data: users } = useGetAllUsersQuery()

  const currentUserId = !isFetching ? data?.data.user.id : null
  const isUpvotedByCurrentUser = threadData.upVotesBy.includes(currentUserId as string)
  const isDownvotedByCurrentUser = threadData.downVotesBy.includes(currentUserId as string)

  const threadOwner = users?.data.users?.find(user => user.id === threadData.ownerId)
  const navigate = useNavigate()

  const handleUpVote = async (id: string) => {
    if (!currentUserId) {
      navigate('/login')
      return
    }
    await upvoteThread({ threadId: id })
  }

  const handleDownVote = async (id: string) => {
    if (!currentUserId) {
      navigate('/login')
      return
    }
    await downvoteThread({ threadId: id })
  }

  const handleNeutralizeVote = async () => {
    if (!currentUserId) {
      navigate('/login')
      return
    }
    await neutralizeVote({ threadId: threadData.id })

  }

  // console.log('current user', data)

  return (
    <Card className="w-full rounded-xl">
      <CardHeader>
        <CardTitle className='flex items-center'>
          <Link to={`/threads/${threadData.id}`}>

            {threadData.title}
          </Link>
          <Badge variant="outline" className="ml-2">
            {threadData.category}
          </Badge>
        </CardTitle>
        <CardDescription>
          <span>
            By <span className="font-bold">{threadOwner?.name}</span> {formatTimeAgo(threadData.createdAt)}
          </span>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div dangerouslySetInnerHTML={{ __html: threadData.body }}
        />

      </CardContent>
      <CardFooter className="flex gap-2">
        {
          isUpvotedByCurrentUser ? (
            <ActionTooltip label='Remove Like'>
              <Button variant="outline" className='rounded-xl flex gap-2' onClick={handleNeutralizeVote}>
                <BiSolidLike className='w-4' />
                <span>
                  {threadData.upVotesBy.length}
                </span>
              </Button>
            </ActionTooltip>
          ) : (
            <ActionTooltip label='Like'>
              <Button variant="outline" className='rounded-xl flex gap-2' onClick={() => handleUpVote(threadData.id)}>
                <BiLike className='w-4' />
                <span>
                  {threadData.upVotesBy.length}
                </span>
              </Button>
            </ActionTooltip>
          )
        }
        {
          isDownvotedByCurrentUser ? (
            <ActionTooltip label='Remove Dislike'>
              <Button variant="outline" className='rounded-xl flex gap-2' onClick={handleNeutralizeVote}>
                <BiSolidDislike className='w-4' />
                <span>
                  {threadData.downVotesBy.length}
                </span>
              </Button>
            </ActionTooltip>
          ) : (
            <ActionTooltip label='Dislike'>
              <Button variant="outline" className='rounded-xl flex gap-2' onClick={() => handleDownVote(threadData.id)}>
                <BiDislike className='w-4' />
                <span>
                  {threadData.downVotesBy.length}
                </span>
              </Button>
            </ActionTooltip>
          )
        }
        <Button variant="outline" className='rounded-xl flex gap-2'
          onClick={()=>navigate(`/threads/${threadData.id}`)}
         >
          <MessageCircleMore className='w-4' />
          <span>
            {threadData.totalComments}
          </span>
        </Button>
      </CardFooter>
    </Card>
  )
}

export default Thread