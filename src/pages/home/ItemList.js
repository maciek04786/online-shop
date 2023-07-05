import React from 'react'
import { useNavigate } from 'react-router-dom'

// styles & bootstrap
import "./ItemList.css"
import { Card, Container, Row, Col } from 'react-bootstrap'

export default function ItemList({ items }) {
  const navigate = useNavigate()

  return (
    <Container className="item-list">
      {!items && <p>No items to show</p>}
      <Row xs={1} sm={3} md={4} lg={5} className="g-4">
        {items && (items.map((item) => (
          <Col key={item.id} className="mx-3">
            <Card
              onClick={() => navigate(`/item/${item.id}`)}
              border="light"
              className="item-card"
            >
              <Card.Body>
                <Card.Title as="h6" className="mb-3"><strong>{item.name}</strong></Card.Title>
                <p><strong>Price:</strong> <i>£{item.price}</i></p>
                <p><strong>Condition:</strong> <i>{item.condition}</i></p>
                <Card.Img className="mt-1" variant="bottom" src={item.photosURL[0]} />
              </Card.Body>
            </Card>
          </Col>
        )))}
      </Row>
    </Container>
  )
}
