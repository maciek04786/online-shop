import { useState, useEffect } from 'react'
import { useCollection } from '../../hooks/useCollection'
import { useDocument } from '../../hooks/useDocument'
import { useParams } from 'react-router-dom'

// styles && bootstrap
import { Row, Col } from 'react-bootstrap'

// components
import ItemList from '../home/ItemList'
import Notifications from '../../components/Notifications'

export default function User() {
  const { id } = useParams()
  const { documents, collError } = useCollection("items")
  const { document, docError } = useDocument("users", id)
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
      <Row>
        <Col sm={8}>
        <h1 className="m-5">Your Items</h1>
          {collError && <div className="error">{collError}</div>}
          {documents && <ItemList items={userItems} />}
        </Col>
        <Col sm={4}>
          {docError && <div className="error">{docError}</div>}
          {document && <Notifications messages={document.notifications} />}
        </Col>
      </Row>
    </div>
  )
}
