import { useParams } from 'react-router-dom'
import { useDocument } from "../../hooks/useDocument"

// styles & bootstrap
import { Container } from 'react-bootstrap'
import ItemDetails from './ItemDetails'

export default function Item() {
  const { id } = useParams()
  const { document, error } = useDocument("items", id)

  return (
    <Container>
      {error && <div>{error}</div>}
      {document && (
        <ItemDetails item={document} />
      )}
    </Container>
  )
}
