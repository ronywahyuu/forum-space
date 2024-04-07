import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Link } from 'react-router-dom'

type Props = {}

const Register = (props: Props) => {
  return (
    <section className="w-96 px-5 md:px-0">
      <Card className=''>
        <CardHeader className='text-center'>
          <CardTitle>Register</CardTitle>
          <CardDescription>
            Fill in the form to create an account
          </CardDescription>
        </CardHeader>
        <CardContent className='space-y-3'>
          <Input type="text" placeholder="Name" />

          <Input type="email" placeholder="Email" />

          <div className='flex items-center gap-2'>
            <Input type="password" placeholder="Password" />
            <Input type="password" placeholder="Confirm Password" />

          </div>
        </CardContent>
        <CardFooter className='w-full flex flex-col gap-3'>
          <Button variant="primary" className='w-full'>Sign in</Button>

          <CardDescription className='text-center'>
            Already have an account? <Link to="/login" className='underline'>Sign in</Link>
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

export default Register