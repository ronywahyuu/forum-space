import Post from './Thread'
import { Badge } from '@/components/ui/badge'
import type { Thread } from '@/types/thread'
import { useGetThreadsQuery } from './threadsApiSlice'

type Props = {}

const ThreadList = (props: Props) => {
  const {data: threads, isFetching: isFetchingThreads} = useGetThreadsQuery()

  if( isFetchingThreads) return <p>Loading...</p>

  const threadsData: Thread[] = threads?.data.threads || []
    
  console.log(threadsData)

  return (
    <>
      <h1 className='text-3xl font-bold mb-5'>Threads</h1>
      <div className='mb-3'>

        <span className='text-xl font-bold'>
          Filter by category <span className='text-gray-500'>(6)</span>
        </span>

        <div className='flex gap-2 mt-4 text-base'>
          <Badge variant='outline' >All</Badge>
          <Badge variant='outline'>React</Badge>
          <Badge variant='outline'>Vue</Badge>
        </div>
      </div>


      <ul className='space-y-2 mb-20'>
        {
          threadsData.map((thread) => (
            <Post key={thread.id} threadData={thread}/>
          ))        
        }
      </ul>
    </>
  )
}

export default ThreadList