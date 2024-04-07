import React from 'react'
import { useParams } from 'react-router-dom'

type Props = {}

const DetailPage = (props: Props) => {
  const { id } = useParams()

  console.log(id)
  return (
    <div>DetailPage</div>
  )
}

export default DetailPage