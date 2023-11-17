import { useParams } from 'react-router-dom'

// Make Router here


const CustomerItem = () => {
  const { id } = useParams()

  return (
    <div>{id}</div>
  )
}

export default CustomerItem
