import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Link } from 'react-router-dom'

type Props = {}

const Login = (props: Props) => {
  return (
    <section className="w-96 px-5 md:px-0">
      <Card className=''>
        <CardHeader className='text-center'>
          <CardTitle>Sign in</CardTitle>
          <CardDescription>
            Let's get started
          </CardDescription>
        </CardHeader>
        <CardContent className='space-y-3'>
          <Input type="email" placeholder="Email" />

          <Input type="password" placeholder="Password" />
        </CardContent>
        <CardFooter className='w-full flex flex-col gap-3'>
          <Button variant="primary" className='w-full'>Sign in</Button>

          <CardDescription className='text-center'>
            Don't have an account? <Link to="/register" className='underline'>Sign up</Link>
          </CardDescription>

          {/* Go Back Home */}
          <Link to="/" className="text-center text-blue-500">
            Go back home
          </Link>
        </CardFooter>
      </Card>
    </section>
  )
}

export default Login