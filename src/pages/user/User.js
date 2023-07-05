import { useState, useEffect } from 'react'
import { useCollection } from '../../hooks/useCollection'
import { useParams } from 'react-router-dom'

// components
import ItemList from '../home/ItemList'
import { Container } from 'react-bootstrap'

export default function User() {
  const { id } = useParams()
  const { documents, collError } = useCollection("items")
  const [userItems, setUserItems] = useState([])

  // fetch items sold by user
  useEffect(() => {
    if (documents) {
      const items = documents.filter((item) => item.sellerID === id)
      setUserItems(items)
    }
  }, [documents, id])

  return (
    <div>
      <h1 className="m-5">My Items</h1>
      <Container fluid>
        {collError && <div className="error">{collError}</div>}
        {documents && <ItemList items={userItems} />}
      </Container>
    </div>
  )
}
