import ActionTooltip from '@/components/ActionTooltip'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { formatTimeAgo } from '@/lib/utils'
import type { Thread as ThreadType } from '@/types/thread'
import { ThumbsDown, ThumbsUp } from 'lucide-react'
import { Link } from 'react-router-dom'

interface ThreadProps {
  threadData: ThreadType
}

const Thread = ({ threadData }: ThreadProps) => {


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
            By <span className="font-bold">{'s'}</span> {formatTimeAgo(threadData.createdAt)}
          </span>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div dangerouslySetInnerHTML={{ __html: threadData.body }}
        />
        
      </CardContent>
      <CardFooter className="flex gap-2">
        <ActionTooltip label='Like'>
          <Button variant="outline"  className='rounded-xl flex gap-2'>
            <ThumbsUp className='w-4' />
            <span>
              {threadData.upVotesBy.length}
            </span>
          </Button>
        </ActionTooltip>
        <ActionTooltip label='Dislike'>
          <Button variant="outline"  className='rounded-xl flex gap-2'>
            <ThumbsDown className='w-4' />
            <span>
              {threadData.downVotesBy.length}
            </span>
          </Button>
        </ActionTooltip>
      </CardFooter>
    </Card>
  )
}

export default Thread