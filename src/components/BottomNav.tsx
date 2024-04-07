import { Edit, HomeIcon, LogOut } from 'lucide-react'
import { MdOutlineLeaderboard } from 'react-icons/md'
import { Link } from 'react-router-dom'
import ActionTooltip from './ActionTooltip'

type Props = {}

const BottomNav = (props: Props) => {
  return (
    <nav className='border w-full fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900  '>
      <div className='max-w-screen-md mx-auto  px-4 sm:px-6 lg:px-8 py-5'>
        <div className='flex justify-between text-2xl px-4'>
          <ActionTooltip label='Home'>
            <Link to='/' className='flex flex-col items-center'>

              <HomeIcon className='' />
              <span className='text-sm'>Home</span>

            </Link>
          </ActionTooltip>
          <ActionTooltip label='Write'>
            <Link to='/write' className='flex flex-col items-center' >
              <Edit />
              <span className='text-sm'>Write</span>
            </Link>
          </ActionTooltip>
          <ActionTooltip label='Leaderboard'>
            <Link to='/leaderboard' className='flex flex-col items-center'>
              <MdOutlineLeaderboard />
              <span className='text-sm'>Ranking</span>
            </Link>
          </ActionTooltip>
          <ActionTooltip label='Log out'>
            <div className='flex flex-col items-center'>
              <LogOut />

              <span className='text-sm'>Log out</span>
            </div>


          </ActionTooltip>
        </div>
      </div>
    </nav>
  )
}

export default BottomNav