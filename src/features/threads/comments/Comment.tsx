import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardHeader } from "@/components/ui/card"

type Props = {}

const Comment = (props: Props) => {
  return (
    <Card>
      <CardHeader>
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </CardHeader>
    </Card>
  )
}

export default Comment