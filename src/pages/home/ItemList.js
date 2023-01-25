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
      <Row xs={2} md={3} lg={4} xl={5} xxl={6} className="g-4">
        {items && (items.map((item) => (
          <Col key={item.id}>
            <Card
              onClick={() => navigate(`/item/${item.id}`)}
              border="light"
              className="item-card"
            >
              <Card.Body>
                <Card.Title as="h6" className="mb-3"><strong>{item.name}</strong></Card.Title>
                <p>Price: £{item.price}</p>
                <p>Condition: {item.condition}</p>
                <Card.Img className="mt-2" variant="bottom" src={item.photosURL[0]} />
              </Card.Body>
            </Card>
          </Col>
        )))}
      </Row>
    </Container>
  )
}
