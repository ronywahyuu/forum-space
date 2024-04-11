import { Edit, HomeIcon, LogIn, LogOut } from 'lucide-react'
import { MdOutlineLeaderboard } from 'react-icons/md'
import { Link } from 'react-router-dom'
import ActionTooltip from './ActionTooltip'
import { useAuth } from '@/features/auth/useAuth'
import { useGetCurrentUserQuery } from '@/features/auth/authApiSlice'

type Props = {}

const BottomNav = (props: Props) => {
  const { data: currentUser } = useGetCurrentUserQuery()
  const {logout} = useAuth()

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
          {currentUser ? (
            <ActionTooltip label='Log out'>

              <div className='flex flex-col items-center cursor-pointer' onClick={()=>logout()}>
                <LogOut />

                <span className='text-sm'>Log out</span>
              </div>


            </ActionTooltip>

          ) : (
            <ActionTooltip label='Log in'>

              <div className='flex flex-col items-center'>
                {/* <LogOut /> */}
                <Link to='/login'>
                  <div className='flex flex-col items-center'>
                    <LogIn />

                    <span className='text-sm'>Login</span>
                  </div>
                </Link>

              </div>


            </ActionTooltip>
          )}
        </div>
      </div>
    </nav>
  )
}

export default BottomNav