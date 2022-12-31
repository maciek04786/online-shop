import { useState } from 'react'
import { useCollection } from '../../hooks/useCollection'
import ItemList from './ItemList'

// styles & bootstrap
import "./Home.css"
import { Container, Form } from 'react-bootstrap'

export default function Home() {
  const [query, setQuery] = useState("")
  const {documents, collError } = useCollection("items")

  const items = documents ? documents.filter((item) => {
    return item.name.toLowerCase().match(query.toLowerCase())
  }) : null

  return (
    <div>
      <Container fluid className="mb-4 header">
        <h1 className="heading">sellAnything.com</h1>
      </Container>
      <Container className="my-5 search-bar">
        <Form className="d-flex">
          <Form.Control
            type="search"
            placeholder="Search"
            className="me-2"
            onChange={(e) => setQuery(e.target.value)}
          />
        </Form>
      </Container>
      {collError && <div>{collError}</div>}
      {items && <ItemList items={items} />}
    </div>
  )
}