import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { useParams } from 'react-router-dom'

type Props = {}

const DetailPage = (props: Props) => {
  const { id } = useParams()

  return (
    <div className='space-y-10'>
      <Card>
        <CardHeader>
          sa
        </CardHeader>
      </Card>

      <Card>
        <CardHeader>
          {id}
        </CardHeader>
        <CardContent>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae, quidem
        </CardContent>
      </Card>
    </div>
  )
}

export default DetailPage